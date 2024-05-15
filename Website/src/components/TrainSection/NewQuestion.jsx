import {React, useState} from 'react'

export default function NewQuestion({data, setSubmit}) {
    const [userInput, setUserInput] = useState("")

    function handleSubmit(){
        setSubmit(old => {
          if(old){
            return false
          } else {
            return userInput
          }
        })
    }
  return (
    <div className="QuestionContainer">

    <div className='Question'> 
        <h3>Répondez à la question</h3>
      <div className='NewQuestionContext'>
        <img src={data[2]} alt="" />
        <p>{data[0]}</p>
      </div>
      <div className="NewQuestionQuestion">
        <p>{data[1]}</p>
      </div>
      <div className="NewQuestionAnswerpart">
        <form>
            <textarea placeholder='Veuillez entrer votre réponse' value={userInput} onChange={((e)=>{setUserInput(e.target.value)})}/>
        </form>

                    <div>
                        <div onClick={handleSubmit}>
                            <h4>SOUMETTRE</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                        </div>
                    </div>
                    
      </div>
    </div>
    </div>
  )
}
