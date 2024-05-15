import React, { useState, useEffect} from 'react'
import NewQCM from './NewQCM'
import QCMResultPage from './QCMResultPage';

export default function QCMLauncher({data, setResponse, settings}) {
    const [nextClicked, setNextClicked] = useState(false);
    const [score, setScore] = useState(0)
    const [currentQuestion, setCurrentQuestion]=useState(0)

    useEffect(()=>{
        if(nextClicked){
            setTimeout(()=>{
                setCurrentQuestion(old => old + 1)
                setNextClicked(false)
            },200)
        }
    },[nextClicked])

    function passQuestion(index){
        if(index !== currentQuestion) return "QCMoff";
    }

  return (
    <>
    {currentQuestion >= data.length?
    <div> 
        <QCMResultPage score={score+"/"+data.length} setResponse = {setResponse} data = {data} settings ={settings}/>
    </div>:""    
    }

    {
        data.map((question, index) => {
            return <div key={index+"NewQCM"}className={passQuestion(index)}>
                <NewQCM data = {question} nextClicked = {nextClicked} setNextClicked={setNextClicked} score={score + "/" + data.length} setScore={setScore}/>
            </div>
        })
        

    }
    </>
  )
}
