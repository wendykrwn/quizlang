import { collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { flashcardsCollection, formatDate } from "../../../lib/constant";

type TableProps<T> = {
  data: T[],
  getFlashcards: Function
};

function Table<T extends Record<string, any>>({ data, getFlashcards }: TableProps<T>) {
  const columns = Object.keys(data[0]);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);


  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleCancelEditClick = () => {
    setEditItem(null);
  };

  const handleSaveClick = async (item) => {
    // TODO: Mettre à jour l'élément dans le tableau
    if (item.id) {
      setEditItem(null);

      const docRef = doc(db, flashcardsCollection, item?.id);
      await updateDoc(docRef, {
        ...item,
        updatedAt: serverTimestamp(),
      });
      getFlashcards()
    }

  };

  const handleDeleteClick = (item) => {
    setDeleteItem(item);
  };

  const handleCancelDeleteClick = () => {
    setDeleteItem(null);
  };

  const handleConfirmDeleteClick = async (item) => {
    if (item?.id) {
      try {
        await deleteDoc(doc(db, flashcardsCollection, item?.id))
        await getFlashcards()
        setDeleteItem(null);
      }
      catch (e) {
        console.error("Error removing document: ", e);
      }
    }
  };

  return (
    <div className="relative">
      <table className="table">
        <thead>
          <tr>
            {columns.map((columnName) => {
              return <th key={columnName}>{columnName}</th>
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {columns.map((columnName) => { 
                if (columnName == 'createdAt' || columnName == 'updatedAt') return <td key={columnName}>{formatDate(item[columnName])}</td>;
                return <td key={columnName}>{item[columnName]}</td>
          })}
              <td className="flex actions">
                {editItem === item ? (
                  <>
                    <button className="btn" onClick={() => handleSaveClick(item)}>Enregistrer</button>
                    <button className="btn" onClick={handleCancelEditClick}>Annuler</button>
                  </>
                ) : (
                  <button className="btn" onClick={() => handleEditClick(item)}>Modifier</button>
                )}
                {deleteItem === item ? (
                  <>
                    <button className="btn" onClick={() => handleConfirmDeleteClick(item)}>Confirmer</button>
                    <button className="btn" onClick={handleCancelDeleteClick}>Annuler</button>
                  </>
                ) : (
                  <button className="btn" onClick={() => handleDeleteClick(item)}>Supprimer</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editItem && (
        <div className="modal-container">
          <div className="modal">
            <h3>Modifier un flashcard</h3>
            <form className="form" onSubmit={() => handleSaveClick(editItem)}>
              {columns.map((columnName) => {
                if (columnName == 'createdAt' || columnName == 'updatedAt'){
                  return null
                }
                return (
                  <label className="form-group" key={columnName}>
                    {columnName}
                    <input
                      type="text"
                      className="input"
                      name={columnName}
                      value={editItem[columnName]}
                      readOnly={columnName == 'id'}
                      onChange={(e) =>
                        setEditItem({
                          ...editItem,
                          [columnName]: e.target.value,
                        })
                      }
                    />
                  </label>
                )
              })}
              <div className="form-buttons">
                <button className="btn" type="submit">Enregistrer</button>
                <button className="btn" onClick={handleCancelEditClick}>Annuler</button>
              </div>
            </form>
            </div>
        </div>
      )}
      {deleteItem && (
        <div className="modal-container">
          <div className="modal">
            <h3>Voulez-vous vraiment supprimer cet élément ?</h3>
            <div className="flex justify-between">
              <button className="btn" onClick={() => handleConfirmDeleteClick(deleteItem)}>Confirmer</button>
              <button className="btn" onClick={handleCancelDeleteClick}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const FlashCards = () => {

  const [flashcards, setFlashcards] = useState<any>();

  const getFlashcards = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, flashcardsCollection));
      const flashcardsSnapshot = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      });
      setFlashcards(flashcardsSnapshot);
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    getFlashcards();
    
    }, [setFlashcards]);


  return (
    <div>
      <h1>Tous les Flaschards</h1>
      {
        flashcards?.length > 0 ? (
          <Table getFlashcards={getFlashcards} data={flashcards} />
        )
        : <div>Loading ...</div>
      }
    </div>
  )
}

export default FlashCards