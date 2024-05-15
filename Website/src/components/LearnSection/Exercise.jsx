import React, { useState } from 'react'

export default function Exercise({data}) {
    const [showResponse, setShowResponse] = useState(false)
    function toggleResponse(){
        setShowResponse(current => !current)
    }
    return (
      <div>
          <h1>{data.title}</h1>
          <div className='structure'>
          <div className='structureleft'><p>{data.content}</p></div>
          <div className='structureright'><p className='input nametag'>{data.type}</p></div>
          </div>
          
          <button onClick={toggleResponse}>{showResponse ? "Hide response":"Show response"}</button>
          {showResponse && <p>{data.answer}</p>}
      </div>
    )
  }
  