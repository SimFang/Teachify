import React from 'react'
import storeExercise from '../AuthenticationSection/func/storeExercise'

export default function QCMResultPage({score, setResponse, data, settings}) {
  console.log(data)
  console.log(settings)

    function finish(e){
        e.target.className = "QCMnext"
        console.log("Storing")
        setTimeout(async()=>{
            await storeExercise(settings[2] == "Theme"?settings[3]:null, settings[2], settings[3], "QCM", data, null, (score[0]/score[2])*20, settings[0], settings[1])
            setResponse("")
        },200)
    }
  return (
    <div className='ExerciseResultPage'>
      <div className='ExerciseResultPageRounddiv'>
        <div></div>
        <div></div>
      </div>
      <div className='ExerciseResultPageAward'>
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><path fill="white" fill-rule="evenodd" d="M12 7a1 1 0 0 1 1-1h22a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1v6a5 5 0 0 1-5 5h-1.683A12.017 12.017 0 0 1 26 27.834V34h6a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H16a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6v-6.166A12.017 12.017 0 0 1 12.683 20H11a5 5 0 0 1-5-5V9a1 1 0 0 1 1-1h5zm24 9v-6h4v5a3 3 0 0 1-3 3h-1zm-24-6H8v5a3 3 0 0 0 3 3h1v-2z" clip-rule="evenodd"/></svg>
        <h3><span>{score[0]}</span>{score[1]+score[2]}</h3>
      </div>
    <div className="ExerciseResultPageSubpage">
        <h1>FELICITATIONS !</h1>
        <div>
                <div onClick={finish} >
                <h4>CONTINUER</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                </div>
        </div>
    </div>
    </div>
  )
}
