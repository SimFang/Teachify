import React, { useState, useEffect } from 'react'
import QCM from './QCM'
import Question from './Question'
import ExerciseContext from './ExerciseContext'
import Loading from '../Loading'

export default function TrainMainpage() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState("")

  const types = ["QCM", "Question"]
  const [exerciseType, setExerciseType] = useState("QCM")

  const inputForms = ["Theme","Cours"]
  const [inputForm, setInputForm] = useState("Theme")

  function handleInputChange(e){
    setInput(e.target.value)
  }
  const [response, setResponse] = useState({})
  useEffect(() => {
    console.log('Response changed:', response);
  }, [response]);

  async function requestExercise(){
    const response = await fetch('http://localhost:5000/api/exercise', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: input, exerciseType : exerciseType, inputForm : inputForm }),
        });
      const responseData = await response.json();
      setLoading(false)
      setResponse(responseData);
  }
  async function prototyperequestExercice(){
    // haha a request has been passed
    setResponse(
      {
        type : "Question",
        title : "Geography of the world",
        content : [
          ["What is the capital of Japan?", "Tokyo", "Think about popular cities in Japan."],
          ["Which river is the longest in the world?", "Nile", "Consider major rivers and their lengths."],
          ["In which year did the United States declare its independence?", "1776", "Reflect on historical events during that time."],
          ["What is the currency of Australia?", "Australian Dollar", "Research the currency used in Australia."],
          ["Name the largest desert in the world.", "Antarctica", "Consider unconventional deserts."],
        ]
        
      }
    )
  }
  function handleSubmit(){
    setLoading(true)
    requestExercise()
  }

  return (
    <>
    <div className='spaced'>
    <div id="learnformula">
    <h1>CREEZ VOS PROPRES EXERCICES <span className='blue7'>PERSONNALISE</span></h1>
    <label className='label'>
        <textarea type="text" className={`input ${inputForm === "Cours" ? "courseInput" : ""}`} value={input} onChange={handleInputChange} placeholder={`Saissisez votre ${inputForm}`}/>
        <button type='submit' className='button' onClick={handleSubmit}>GENERATE</button>
    </label>
    </div>
      <div>
        {inputForms.map(form => {
          return (
            <label key={form +"label"}>
            <input type="checkbox" onChange={() => {setInputForm(form)}} checked={inputForm === form} key={form}/> {form}
            </label>
          )
        })}
      </div>
      <div>
        {types.map(type => {
          return (
            <label key={type +"label"}>
            <input type="checkbox" onChange={() => {setExerciseType(type)}} checked={exerciseType === type} key={type}/> {type}
            </label>
          )
        })}
      </div>
    </div>
    
    {loading && <Loading/>}

    <ExerciseContext.Provider value = {response}>
          {Object.keys(response).length !== 0 && response.type === "QCM" && <QCM/>}
          {Object.keys(response).length !== 0 && response.type === "Question" && <Question/>}
      </ExerciseContext.Provider>
    </>
  )
}
