import {react, useContext, useState} from 'react'
import ExerciseContext from './ExerciseContext'



export default function Question() {
    const response = useContext(ExerciseContext)
    const [showAnswer, setShowAnswer] = useState(false)
    const [hint, setHint] = useState("")
    const handleButtonClick = () => {
        setShowAnswer(old => !old);
      };
    function handleShowHint(e){
        const Hint = e.target.getAttribute('data-hint');
        setHint(Hint)
    }
    function hideHint(){
        setHint("")
    }

  return (
    <>
    <div className='trainQuestion'>
        <h1>{"Exercice : "+response.title}</h1>
        {response.content.map((question, index)=> {
            return (
                <>
                <div key={index} className='question'>
                    <div >
                    <h3>{question[0]}</h3>
                        {showAnswer && <p>{question[1]}</p>}
                    </div>
                <button onClick={handleShowHint} data-hint ={question[2]}>HINT</button>
                </div>
                </>
            )
        })}
        {<div id="hint" className={`${hint != ""?"active":"inactive"}`}>
            {hint}
            <button className='button' onClick={hideHint}>Hide Hint</button>
        </div>}
        <button className='button' onClick={handleButtonClick}>
            Show answers
        </button>
    </div>
    </> 
  )
}
