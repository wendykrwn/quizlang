import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useEffect } from "react";


type TableProps<T> = {
  data: T[];
};

function Table<T extends Record<string, any>>({ data }: TableProps<T>) {
  const columns = Object.keys(data[0]);

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((columnName) => (
            <th key={columnName}>{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((columnName) => (
              <td key={columnName}>{item[columnName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const FlashCards = ({ flashcards }) => {

  useEffect(() => {
    console.log({flashcards})
  }, [flashcards])
  
  return (
    <div>
      <h1>Tous les Flaschards</h1>
      {
        flashcards?.length > 0 && (
          <Table data={flashcards} />
        )
      }
    </div>
  )
}

export default FlashCards

export const getServerSideProps = async ({ }) => {
  
  try {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const flashcards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return {
      props: {
        flashcards
      }
    }
  }
  catch (e) {
    console.log(e)
    return {
      props: {}
    }
  }
}