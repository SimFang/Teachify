import React, { useState } from 'react'
import Settings from '../Utilities/Settings';

export default function Box({type, setConfirm}) {
    const [boxOpen, setBoxOpen] = useState(false)
    function scroll(path){
        setTimeout(()=>{
        const exerciseBoxOpenElement = document.querySelector(path);
        if (exerciseBoxOpenElement) {
            exerciseBoxOpenElement.scrollIntoView({ behavior: 'smooth' });
        }
        },200)
    }
  return (
    <>

    <div className={'Exercisebox' + (boxOpen ? ' Exerciseboxopen' : '')} onClick={() => { setBoxOpen(true), scroll('.Exerciseboxopen > div > svg') }}>            
        <div className='Exerciseboxsubgsection'>
            <h3>{type}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m9 11l3 3l8-8"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9"/></g></svg>
        </div>
        {boxOpen?<Settings setConfirm={setConfirm}/>:""}
    </div>
    </>

  )
}
