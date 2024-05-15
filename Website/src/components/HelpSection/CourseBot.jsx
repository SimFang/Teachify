import {useState, React, useEffect} from 'react'

export default function CourseBot({data, setAssistantOn}) {
    const [chat, setChat] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    const [extendChat, setExtendChat] = useState(false)
    
    async function requestAnswer(){
        const response = await fetch('http://127.0.0.1:5000/api/gethelp', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({course: data, question : input}),
            });
          const responseData = await response.json();
          setLoading(false)   
          setResponse(responseData)
        setChat(old => {
            let newList = [...old]
            newList[newList.length - 1] = [input, responseData];
            return newList
        })
        setInput("")
      }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setChat(prev => [...prev, [input, "..."]])
        setLoading(true)
        await requestAnswer()
        // keep the QUESTION
        // pass the request, get the ANSWER
       
    };
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
  return (
    <div id='coursebot' className={`${extendChat ? 'extendedSizeChat' : 'normalSizeChat'} spaced slideRight`}    >
      <div>
        <div>
        <svg onClick={()=>{
          setExtendChat(old => {return !old})
          
        }} className={extendChat?"rotateExtendButton":""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15"><path fill="currentColor" d="M8.293 2.293a1 1 0 0 1 1.414 0l4.5 4.5a1 1 0 0 1 0 1.414l-4.5 4.5a1 1 0 0 1-1.414-1.414L11 8.5H1.5a1 1 0 0 1 0-2H11L8.293 3.707a1 1 0 0 1 0-1.414"/></svg>
        <svg onClick={()=>{setAssistantOn(false)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="currentColor" d="m24.778 21.42l-5.502-5.503l5.5-5.502l-2.827-2.83l-5.503 5.502l-5.502-5.502l-2.828 2.83l5.5 5.502l-5.5 5.502l2.83 2.828l5.5-5.502l5.5 5.502z"/></svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path fill="currentColor" d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3l3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11z" /></svg>
        </div>
      </div>
        
      <div className="assistantChat">
      {chat.map(exchange => {
            return <div key={exchange[0]+"div"}>
                <p key={exchange[0]} className='rightChat slideUp'>{exchange[0]}</p>
                <p key={exchange[1]} className='leftChat slideUp' >{exchange[1]}</p>
                  </div>
        })}
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            value={input} 
            onChange={handleInputChange} 
            placeholder="Veuillez rentrer votre question..."
          />
        </label>
        <button type="submit">Demander</button>
      </form>
      </div>
        
    </div>
  )
}
