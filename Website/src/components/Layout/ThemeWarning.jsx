import { useState } from "react"
import React from 'react'

export default function ThemeWarning() {
    const [warningOn, setWarningOn] = useState(false)
  return (
    <>
    {
        warningOn ? <>
        <div className='warningBackground' onClick={()=>{
            setWarningOn(false)
        }}></div>
        <div className="backgroundColorWarning" onClick={()=>{
            setWarningOn(false)
        }}>
            
            <div><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                <path fill="currentColor" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m0 13V2a6 6 0 1 1 0 12" />
            </svg></div>
            <svg className='closeButton' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" color='white' viewBox="0 0 24 24">
                <path fill="currentColor" d="M18.36 19.78L12 13.41l-6.36 6.37l-1.42-1.42L10.59 12L4.22 5.64l1.42-1.42L12 10.59l6.36-6.36l1.41 1.41L13.41 12l6.36 6.36z" />
            </svg>
            <h1>Attention</h1>
            <p>Si vous utilisez le mode sombre, certains éléments peuvent ne pas s'afficher correctement. Nous vous recommandons de passer en mode clair pour une expérience optimale.</p>
        </div>
        </>:""
    }
    </>
  )
}
