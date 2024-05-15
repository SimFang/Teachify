import {useEffect, useState} from 'react'

export default function PassButton({setSomething, text,otherFunc}) {
const [nextClicked, setNextClicked] = useState(false);

useEffect(()=>{
    if(nextClicked){
        setTimeout(()=>{
            setSomething(true)
            otherFunc("")
        },300)
    }
},[nextClicked])
  return (
    <div className="PassButton">
            <div onClick={()=>{setNextClicked(true)}} className={nextClicked ? "PassButtonNext":""}>
                <div  >
                <h4>{text}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M3 19h18a1.002 1.002 0 0 0 .823-1.569l-9-13c-.373-.539-1.271-.539-1.645 0l-9 13A.999.999 0 0 0 3 19"/></svg>
                </div>
            </div>
        </div>
  )
}
