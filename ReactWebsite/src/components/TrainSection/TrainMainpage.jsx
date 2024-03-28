import React, { useState, useEffect } from 'react'
import QCM from './QCM'
import Question from './Question'
import ExerciseContext from './ExerciseContext'
import Loading from '../Loading'

export default function TrainMainpage() {

  const [settingsOn, setSettingsOn] = useState(false)

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState("")

  const types = ["Question","QCM"]
  const [exerciseType, setExerciseType] = useState("QCM")

  const inputForms = ["Theme","Cours"]
  const [inputForm, setInputForm] = useState("Theme")

  const difficulties = ["Easy","Medium","Hard","Overwhemingly Difficult"]
  const [difficulty, setDifficulty] = useState("Medium")

  const [selectedLanguage, setSelectedLanguage] = useState('english');

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
          body: JSON.stringify({ subject: input, exerciseType : exerciseType, inputForm : inputForm, language : selectedLanguage, difficulty : difficulty }),
        });
      const responseData = await response.json();
      setLoading(false)
      setResponse(responseData);
      
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
        <div className="settingsIcon" onClick={()=>{setSettingsOn(old => !old)}}>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"/></svg>
        </div>
    </label>
    {settingsOn ?
      <div className="settings">
        <label>
          <p>Type d'entrée</p>
          <select value={inputForm} onChange={(e)=>{setInputForm(e.target.value)}}>
            {inputForms.map(el => {
              return (<option value={el}>{el}</option>)
            })}
          </select>
        </label>

        <label>
          <p>Type d'exo </p>
          <select value={exerciseType} onChange={(e)=>{setExerciseType(e.target.value)}}>
            {types.map(el => {
              return (<option value={el}>{el}</option>)
            })}
          </select>
        </label>

        <label>
          <p>Difficulté</p>
          <select value={difficulty} onChange={(e)=>{setDifficulty(e.target.value)}}>
            {difficulties.map(el => {
              return (<option value={el}>{el}</option>)
            })}
          </select>
        </label>

        <label>
    <p>LANGUE</p>
    <select id="language-select" value={selectedLanguage} onChange={(e)=>{setSelectedLanguage(e.target.value)}}>
        <option value="english">English</option>
        <option value="français">Français</option>
        <option value="espagnol">Español</option>
        {/* Ajoutez d'autres langues ici */}
      </select>
    </label>
      </div>
      : ""  
    }

    </div>
    {loading && <Loading text = {"Writing"}/>}

    <ExerciseContext.Provider value = {response}>
          {Object.keys(response).length !== 0 && response.type === "QCM" && <div id="currentQCM"><QCM/></div>}
          {Object.keys(response).length !== 0 && response.type === "Question" && <div id="currentQuestion"><Question/></div>}
      </ExerciseContext.Provider>
    </div>
    </>
  )
}
