import React from 'react'

export default function Lesson({data, selectedLanguage}) {
  async function sendCourse(theme, e){
    const response = await fetch('http://localhost:5000/api/specificcourse', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: theme, selectedLanguage : selectedLanguage }),
        });
      const responseData = await response.json();
      console.log(responseData.summarized)
      e.target.className =""
      e.target.insertAdjacentHTML('afterend', "<p>"+responseData.course+"</p><p><strong>💡"+responseData.summarized+"💡</strong></p>")
      const newH2 = document.createElement('h2');
      newH2.innerHTML = theme;
      e.target.replaceWith(newH2)
    }
  return (
    <div id={data.title}>
        <h1>{data.title}</h1>
        {
          data.content[0][0] == "["?eval(data.content[0]).map(el => data.index == 0 ? <div key={el}><p onClick={(e)=>{sendCourse(el, e)}} className='button' key={el+"text"}>{el}</p></div>:<p key={el}>{el}</p>)
          
          
          
          :<p>{data.content[0]}</p>
        }
        {data.content[0][0] == "["?"":<p><strong>{"💡 "+data.content[1]+" 💡"}</strong></p>}
        <button className='button'>Generate exercise </button>
    </div>
  )
}
