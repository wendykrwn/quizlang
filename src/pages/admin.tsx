import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";


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
  const handleReset = () => {
    setQuestion("")
    setAnswer("")
  }
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("envoyer")
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
    <div className="center h-screen flashcard-container">
      <div className="flashcard">
        <h1>Ajouter un flashcard</h1>
        <form onSubmit={handleSubmit} className="">
          <input className="input input-text" type="text" value={question} name="question" onChange={handleQuestionChange} />
          <input className="input input-text" type="text" value={answer} name="answer" onChange={handleAnswerChange} />
          <div className="form-buttons">
            <input type="reset" className="btn" onClick={handleReset} />
            <input type="submit" className="btn"/>
          </div>
        </form>
      </div>
    </div>
  )
}



export default Admin