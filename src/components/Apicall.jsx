import { useEffect, useState } from 'react';

function Apicall() {
  const [inputValue, setInputValue] = useState('');
  const [APIresponse, setAPIresponse] = useState('');
  const [chatGPTanswer, setChatGPTanswer] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  function encodeCoordinates(coordinatesString) {
    const [latitude, longitude] = coordinatesString.split(',');
    const encodedLatitude = encodeURIComponent(latitude);
    const encodedLongitude = encodeURIComponent(longitude);

    return `${encodedLatitude}%2C${encodedLongitude}`;
  }

  async function CallAPI() {
    const url =
      'https://weatherapi-com.p.rapidapi.com/current.json?q=' +
      encodeCoordinates(inputValue);
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '6135ee019bmsh79cdc5fbdc6dcfcp1b2c6fjsn31fe6bbef032',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const finalResponse = JSON.parse(result);
      console.log(finalResponse);
      setAPIresponse(finalResponse);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendRequestOPENAI() {
    const response = await fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subject: "" }),
    });
    const responseData = await response.json();
    console.log(responseData)
    setChatGPTanswer(responseData)
  }

  return (
    <>
      <label>
        Enter coordinates:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          CallAPI();
        }}
      >
        Click
      </button>
      {APIresponse && (
        <div>
          <h1>{APIresponse.location.name}</h1>
          <h3>{APIresponse.current.temp_c + '°C'}</h3>
          <img
            src={APIresponse.current.condition.icon}
            alt={APIresponse.current.condition.text}
          />
        </div>
      )}

      <h1>ChatGPT AI Call</h1>
      <button onClick={sendRequestOPENAI}>GET THE REQUEST</button>
      {chatGPTanswer && <h3>Request succesful ! : check console</h3>}
    </>
  );
}

export default Apicall;
