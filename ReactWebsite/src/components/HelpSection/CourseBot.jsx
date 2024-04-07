import {useState, React, useEffect} from 'react'

export default function CourseBot({data}) {
    const [chat, setChat] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState("")
    
    useEffect(()=>{
        console.log(response)
        console.log(typeof response)
    },[response])

    async function requestAnswer(){
        const response = await fetch('http://localhost:5000/api/gethelp', {
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
      }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setChat(prev => [...prev, [input, ""]])
        setLoading(true)
        await requestAnswer()
        // keep the QUESTION
        // pass the request, get the ANSWER
       
    };
    const handleInputChange = (event) => {
        setInput(event.target.value);
    };
  return (
    <div id='coursebot' className='spaced'>
      
        {chat.map(exchange => {
            return <div key={exchange[0]+"div"}>
                <p key={exchange[0]} className='rightChat'>{exchange[0]}</p>
                <p key={exchange[1]} className='leftChat'>{exchange[1]}</p>
            </div>
        })}
        <form onSubmit={handleSubmit}>
        <label>
          <input 
            type="text" 
            value={input} 
            onChange={handleInputChange} 
            placeholder="Enter something..."
          />
        </label>
        <button type="submit">Demander</button>
      </form>
    </div>
  )
}
