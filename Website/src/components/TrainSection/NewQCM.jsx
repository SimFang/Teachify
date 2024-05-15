import React, { useState, useEffect } from 'react'
import QCM from './QCM'
import Question from './Question'
import ExerciseContext from './ExerciseContext'
import Loading from '../Loading'

export default function NewQCM({data, nextClicked, setNextClicked, score, setScore}) {
    const [showAnswer, setShowAnswer] = useState(false)
    const [answer, setAnswer] = useState(data.answer)
    const [selectedAnswer, setSelectedAnswer] = useState(false)
    const [hint, setHint] = useState(false)

    function handleClick(choice){
        setHint(false)
        setSelectedAnswer(choice)
        setShowAnswer(true)
        if(choice == data.answer){
            setScore(old => old+1)
        }
    }
  return (
    <>
    <div className="QCM">
      <div className='QCMintrosection'>
      <svg onClick={()=>{!selectedAnswer?setHint(true):""}} className={hint?"QCMhintbulbon":""} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 1024 1024"><path fill="currentColor" d="M632 888H392c-4.4 0-8 3.6-8 8v32c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-32c0-4.4-3.6-8-8-8M512 64c-181.1 0-328 146.9-328 328c0 121.4 66 227.4 164 284.1V792c0 17.7 14.3 32 32 32h264c17.7 0 32-14.3 32-32V676.1c98-56.7 164-162.7 164-284.1c0-181.1-146.9-328-328-328m127.9 549.8L604 634.6V752H420V634.6l-35.9-20.8C305.4 568.3 256 484.5 256 392c0-141.4 114.6-256 256-256s256 114.6 256 256c0 92.5-49.4 176.3-128.1 221.8"/></svg>
      <h3>{"Cochez la bonne réponse"} : {answer&&selectedAnswer?<span style={{ fontFamily: 'InterBold' }}>{answer}</span>:""}</h3>
        <div className="score">{score}</div>
      </div>
      <h1>{data.question}</h1>
      <div className='QCMquestionpart'>
          {data.choices.map((choice, index) => {
            if(index == 0 || index == 1){
                return <div key={choice+index} className={`QCMcorrectanswerdiv ${selectedAnswer && selectedAnswer !== choice ? "QCMhidechoice" : ""} ${selectedAnswer && selectedAnswer === choice && selectedAnswer !== answer ? "QCMshowwrongchoice" : "" } ${selectedAnswer && selectedAnswer === choice && selectedAnswer == answer ? "QCMshowgoodchoice" : "" } `}
                        onClick={()=>{handleClick(choice)}}>
                        <p></p>
                        <h3>{choice}</h3>
                        {selectedAnswer == choice ? <h2 className={selectedAnswer === answer?"QCMshowanswer":"QCMshowwronganswer"}>{choice == answer ? "Correct":"Incorrecte"}</h2>:""}
                    </div>
            }
          })}    
      </div>
      <div className='QCMquestionpart'>
          {data.choices.map((choice, index) => {
            if(index == 2 || index == 3){
                return <div key={choice+index} className={`QCMcorrectanswerdiv ${selectedAnswer && selectedAnswer !== choice ? "QCMhidechoice" : ""} ${selectedAnswer && selectedAnswer === choice && selectedAnswer !== answer ? "QCMshowwrongchoice" : "" } ${selectedAnswer && selectedAnswer === choice && selectedAnswer == answer ? "QCMshowgoodchoice" : "" } `}
                        onClick={()=>{handleClick(choice)}}>
                        <p></p>
                        <h3>{choice}</h3>
                        {selectedAnswer == choice ? <h2 className={selectedAnswer === answer?"QCMshowanswer":"QCMshowwronganswer"}>{choice == answer ? "Correct":"Incorrecte"}</h2>:""}
                    </div>
            }
          })}    
      </div>
      <p className={hint?"QCMhintOn":"QCMhintOff"}>
        {data.Hint}
        </p>
      {selectedAnswer ? 
        <div className="QCManswerpart">
            <p>
                {data.indication}
            </p>
            <div>
                <div onClick={()=>{setNextClicked(true)}} className={nextClicked ? "QCMnext":""}>
                <h4>CONTINUER</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                </div>
            </div>
        </div>
      :""}
    </div>
    </>
  )
}
