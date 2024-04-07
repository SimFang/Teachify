import {react, useContext, useState} from 'react'
import ExerciseContext from './ExerciseContext'



export default function Question() {
    const response = useContext(ExerciseContext)
    const [showAnswer, setShowAnswer] = useState(false)
    const [hint, setHint] = useState("");
    const [shownHintIndex, setShownHintIndex] = useState("")    
    const handleButtonClick = () => {
        setShowAnswer(old => !old);
      };
    function handleShowHint(e, index) {
        console.log(e, index)
        setShownHintIndex(index)
        let Hint = e.target.getAttribute('data-hint');
        setHint(Hint);
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
                    <button onClick={(e)=>{handleShowHint(e, index)}} data-hint={question[3]}>HINT</button>
                                {hint && shownHintIndex == index ?<div id='hintContainer'><div id="hint" className={`${hint != "" ? "active" : "inactive"}`}>
                                    {hint}
                                    <button className='button' onClick={hideHint}>Hide</button>
                                </div></div>:""}
                </div>
                </>
            )
        })}
        
        <button className='button' onClick={handleButtonClick}>
            Show answers
        </button>
    </div>
    </> 
  )
}
