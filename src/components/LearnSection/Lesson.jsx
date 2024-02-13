import React from 'react'

export default function Lesson({data}) {
  return (
    <div id={data.title}>
        <h1>{data.title}</h1>
        <h3>{data.type}</h3>
        <p>{data.content}</p>
        <button className='button'>Generate exercise</button>
    </div>
  )
}
