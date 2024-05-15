import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import login from './func/login';
import checkLog from './func/checkLog';

function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverAnswered, setServerAnswer] = useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    const check = () => {
      if(!email || !password){
        return false
      }
      return true
    }

    useEffect(()=>{
      const checkIfLogged  = async() => {
        const answer = await checkLog()
        answer?navigate("/me"):setServerAnswer(true)
      }
      checkIfLogged()

    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!check()) return
        let answer = await login(email, password)
        if(!answer) return
        navigate("/me")
    };
  
  return (
    <>
    {serverAnswered?<div className='ConnexionSection'>
      <div className="ConnexionSectionCoverImg"></div>
      <div className="ConnexionSectionForm">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
          <div className='ConnexionSectionInput'>
          <input
            className='fullInput'
            type="text"
            value={email}
            placeholder='email'
            onChange={handleEmailChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="white" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20" clip-rule="evenodd"/><path fill="white" d="M24 23a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/><path stroke-linecap="round" d="M10.022 38.332C10.366 33.121 14.702 29 20 29h8c5.291 0 9.623 4.11 9.977 9.311"/></g></svg>          </div>
          <div className='ConnexionSectionInput'>
          <input
            className='fullInput'
            type="password"
            value={password}
            placeholder='mot de passe'
            onChange={handlePasswordChange}
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/></svg>
          </div>
          <button type="submit">Se connecter</button>
          <a href="/register"><h4>Pas de compte ? <span>S'inscrire</span></h4></a>

      </form>
      </div>
    </div>:""}
    </>
  );
}

export default LoginForm;