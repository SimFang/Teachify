import React, { useState, useEffect } from 'react'

import ExerciseContext from '../TrainSection/ExerciseContext'
import Loading from '../Loading'
import QCMLauncher from "../TrainSection/QCMLauncher"
import QuestionLauncher from "../TrainSection/QuestionLauncher"
import Box from "../TrainSection/Box"
import { useNavigate } from 'react-router-dom'

export default function ThemeExerciseGenerator({passedSettings, passedExerciseType, setGeneratingExercise}) {
    const navigate = useNavigate()

  const exerciseTypes = ["QCM","Question"]

  const [loading, setLoading] = useState("")

  const [settings, setSettings]= useState(["","","",""])
  const [lastSettings, setLastSettings] = useState(["","","",""])
  const [exerciseType, setExerciseType] = useState("")
  const [confirm, setConfirm] = useState(false)

  const [loadExercise, setLoadExercise] = useState(false)

  const [response, setResponse] = useState("")

  const [end, setEnd] = useState(false)

  useEffect(()=>{
    setConfirm(true)
    setSettings([passedSettings[0],passedSettings[1],passedSettings[2],passedSettings[3]])
    setExerciseType(passedExerciseType)
  },[])

  useEffect(()=>{
    if(confirm){
      console.log("asking for a new exercise")
      setLoading(true)

      // pass the request 
      requestExercise()
      setConfirm(false)
      setLoadExercise(true)

      setLastSettings(settings)
      setSettings(["","","",""])
    }
  },[confirm])
  
  useEffect(()=>{
    if(end){
      setGeneratingExercise("")
      setResponse("")
      setEnd(false)
      console.log("exercise ended")
      navigate("/login")
    }
  },[end])


  async function requestExercise(){
    const response = await fetch('http://127.0.0.1:5000/api/basicexercise', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ language: settings[0], exerciseType : exerciseType , level : settings[1], inputType : settings[2], input : settings[3] }),
        });
      const responseData = await response.json();
      console.log("the server answered something")
      console.log(responseData)
      setLoading(false)
      setResponse(responseData);
  }

  return (
    <>
    <div className='spaced'>
    <div id="learnformula">
    <h1>CREEZ VOS PROPRES EXERCICES <span className='blue7'>PERSONNALISE</span></h1>  
    {settings}
    </div>

    <ExerciseContext.Provider value={{ response, settings, setSettings }}>
      <div className='Exerciseboxcontainer'>
      {exerciseTypes.map(exerciseType => {
        return <div className='ExerciseBoxBoxContainer' onClick={()=>{setExerciseType(exerciseType)}}>
                {!confirm?<Box type={exerciseType} setConfirm={setConfirm}/>:""}
              </div>
      })}
      </div>
    </ExerciseContext.Provider>
    </div>

    {loading && <Loading text = {"Writing"}/>}
    {loadExercise && response && exerciseType == "QCM"?<div className=''><QCMLauncher data={response} setResponse = {setResponse} settings={lastSettings}/></div>:""}
    {loadExercise && response && exerciseType == "Question" && !end? <QuestionLauncher data={response} setResponse = {setResponse} setEnd={setEnd} settings={lastSettings}/>:""}
    </>
  )
}
