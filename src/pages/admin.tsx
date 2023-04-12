import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ChangeEvent, useState } from "react";


const Admin = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuestion(value)
  }
  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswer(value)
  }
  const addAda = async () => {
    if (question && answer) {
      try {
        const docRef = await addDoc(collection(db, "questions"), {
          question: question,
          answer: answer
        });
        console.log("Document written with ID: ", docRef.id);
        setAnswer("")
        setQuestion("")
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }

  return (
    <div>
      Ajouter un flashcard
      <div>
        <div>
          <input type="text" value={question} name="question" onChange={handleQuestionChange} />
        </div>
        <div>
          <input type="text" value={answer} name="answer" onChange={handleAnswerChange} />
        </div>
        <div>
          <button onClick={addAda}>Ajouter</button>
        </div>
      </div>
    </div>
  )
}

export default Admin