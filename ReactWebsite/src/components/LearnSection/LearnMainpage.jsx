import {React, useState} from 'react'
import Lesson from './Lesson'
import Exercise from './Exercise'
import Response from './Response'
import Loading from '../Loading'
import Summary from './Summary'
import MainContext from './CourseContext'
import Test from './Test'

import { Icon } from '@iconify/react';
import { Link } from "react-router-dom"

export default function LearnMainpage() {
    const [request,setRequest] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [headerData, setHeaderData] = useState("")
    const [selectedLanguage, setSelectedLanguage] = useState('english'); // Langue anglaise sélectionnée par défaut
    const [settingsOn, setSettingsOn] = useState(false)

    function handleInputChange(e){
        setRequest(e.target.value)
    }
    const handleLanguageChange = (event) => {
      setSelectedLanguage(event.target.value);
      // Ici vous pouvez ajouter la logique pour changer la langue dans votre application
    };
    
    // send data to backend ( POST : request ) && update response ( response = "answer from backend")
     async function requestCourse(){
      const response = await fetch('http://localhost:5000/api/course', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: request, selectedLanguage : selectedLanguage }),
        });
      const responseData = await response.json();
      setLoading(false)
      setResponse(responseData);
      return(responseData)
    };
    async function requestCourseHeader(){
      const response = await fetch('http://localhost:5000/api/courseHeader', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: request, selectedLanguage : selectedLanguage }),
        });
      const responseData = await response.json();
      setHeaderData(responseData)
    } 

    // when form submitted : send request 
    async function handleSubmit(){
        setLoading(true)
        requestCourseHeader()
        const APIresponse = (await requestCourse())
        if(check(APIresponse) == false){
          console.log("Incorrect API answer, passing a new request...")
          const APISecondResponse = (await requestCourse())
          if(check(APISecondResponse == false)) {
            console.log("test not passed")
          } 
        }
    }

    function check(APIresponse){
      if(Array.isArray(APIresponse[0].content[0]) && Array.isArray(APIresponse[2].content[0]) && APIresponse[0].content[0][1] && APIresponse[2].content[0][1] ) return true
      return false
    }

  return (
    <>
    
    <div className='spaced'>

    {/*Render the creation section only when request succeed*/}
    {!response && <div id="learnformula">
    <h1>CREEZ VOTRE PROGRAMME <span className='blue7'>PERSONNALISE</span></h1>
    <label className='label'>
        < input type="text" className="input" placeholder='Saississez votre sujet' value={request} onChange={handleInputChange} />
        <button type='submit' className='button' onClick={handleSubmit}>GENERATE</button>
        <div className="settingsIcon" onClick={()=>{setSettingsOn(old => !old)}}>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.013 2.475T12.05 15.5"/></svg>
        </div>
    </label>
    {settingsOn ? 
    <div className="settings">
    <label>
    <p>LANGUE</p>
    <select id="language-select" value={selectedLanguage} onChange={handleLanguageChange}>
        <option value="english">English</option>
        <option value="français">Français</option>
        <option value="espagnol">Español</option>
        {/* Ajoutez d'autres langues ici */}
      </select>
    </label>
    </div>
    :""
    }
    </div>}
    
    {loading && <Loading text = {"Writing"}/>}
    
    {/*Render the course section only when request succeed*/}
    <MainContext.Provider value = {response}>    
    {response && !loading && (<>
      <div id='learnCourse'>
      <div id="learnCourseHeader">
        <h1>{request}</h1>
        <p>{headerData[1]}</p>
        <p className='quote'>{headerData[2]}</p>
        <img src={Array.isArray(headerData[0])?headerData[0][0]:""} alt="illustration of the topic" />
      </div>
      <h1 style={{textAlign:"center"}}>Sommaire</h1>
      <Summary/> 
      <Response selectedLanguage = {selectedLanguage}/>
      </div>
    </>)}
    </MainContext.Provider> 
    </div>
    </>
  )
}
