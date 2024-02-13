import {React, useState} from 'react'
import Lesson from './Lesson'
import Exercise from './Exercise'
import Response from './Response'
import Loading from '../Loading'
import Summary from './Summary'
import MainContext from './CourseContext'

import { Icon } from '@iconify/react';

export default function LearnMainpage() {
    const [request,setRequest] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    function handleInputChange(e){
        setRequest(e.target.value)
    }
    
    // send data to backend ( POST : request ) && update response ( response = "answer from backend")
     async function requestCourse(){
      const response = await fetch('http://localhost:5000/api/course', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: request }),
        });
      const responseData = await response.json();
      setLoading(false)
      setResponse(responseData);
    };

    // test function, replacing backend call by a standard value 
    async function prototyperequestCourse(){
      setTimeout(()=>{
        setLoading(false)
        setResponse([{
          type : "lesson",
          title : "La conjuguaison",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },{
          type : "lesson",
          title : "La grammaire",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          type : "lesson",
          title : "Le vocabulaire",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
          type : "lesson",
          title : "Les expressions",
          content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      ])
      },3000)
    }

    // when form submitted : send request 
    async function handleSubmit(){
        setLoading(true)
        requestCourse() 
    }

  return (
    <>
    
    <div className='spaced'>
    <div id="learnformula">
    <h1>CREEZ VOTRE PROGRAMME <span className='blue7'>PERSONNALISE</span></h1>
    <label className='label'>
        < input type="text" className="input" placeholder='Saississez votre sujet' value={request} onChange={handleInputChange} />
        <button type='submit' className='button' onClick={handleSubmit}>GENERATE</button>
    </label>
    </div>
    
    {loading && <Loading/>}
    
    {/*Render the course section only when request succeed*/}
     <MainContext.Provider value = {response}>    
    {response && !loading && (<>
      <div id='learnCourse'>
      <h1 style={{textAlign:"center"}}>Sommaire</h1>
      <Summary/> 
      <Response/>
      </div>
    </>)}
    </MainContext.Provider> 
    </div>
    </>
  )
}
