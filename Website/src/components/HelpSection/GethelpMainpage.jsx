import React, { useState, useEffect } from 'react'
import CourseBot from './CourseBot'

export default function GethelpMainpage() {

  const [input, setInput] = useState("")
  const [loading, setLoading] = useState("")

  const [assistantOn, setAssistantOn] = useState(false)

  const inputForms = ["Theme","Cours"]
  const [inputForm, setInputForm] = useState("Cours")

  function handleInputChange(e){
    setInput(e.target.value)
  }
  const [response, setResponse] = useState({})
 
  function handleSubmit(){
    if(input || assistantOn) setAssistantOn(old => !old)
  }

  return (
    <>
    <div className='spaced'>
    <div id="learnformula">
    <h1>FAITES VOUS AIDER PAR NOTRE <span className='blue7'>ASSISTANT</span></h1>
    
    <label className='label'>
        <textarea type="text" className={`input ${inputForm === "Cours" ? "courseInput" : ""}`} value={input} onChange={handleInputChange} placeholder={`Saissisez votre ${inputForm}`}/>
        <button type='submit' className='button' onClick={handleSubmit}>Assist</button>
    </label>
    </div>
    </div>
    { assistantOn && <CourseBot data = {input} setAssistantOn = {setAssistantOn}/>}
    </>
  )
}
