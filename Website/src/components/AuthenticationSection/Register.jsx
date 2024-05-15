import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import register from './func/register';

function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState("")
  const [email, setEmail] = useState("")
  const [warningMessage, setWarningMessage] = useState("")

  const handleSecondPasswordChange=(e)=>{
    setSecondPassword(e.target.value)
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const checkEntry = () => {
    if (!email || !username || !password || !secondPassword) {
      setWarningMessage("Merci de remplir toutes les entrées.");
      return false;
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setWarningMessage("Adresse email invalide.");
      return false;
    }
  
    // Validate username length
    if (username.length < 3) {
      setWarningMessage("Nom d'utilisateur doit contenir au moins 3 caractères.");
      return false;
    }
    if(password !== secondPassword){
      setWarningMessage("Les deux mots de passe ne correspondent pas")
      return false
    }
    // Validate password length and complexity
    if (password.length < 6) {
      setWarningMessage("Mot de passe doit contenir au moins 6 caractères.");
      return false;
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!passwordRegex.test(password)) {
      setWarningMessage("Mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.");
      return false;
    }
  
    // All criteria passed
    return true;
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!checkEntry()) return
    await register(email, password, username)
    navigate("/login")
};

return (
  <div className='ConnexionSection'>
    <div className="ConnexionSectionCoverImg"></div>
    <div className="ConnexionSectionForm">
    <h1>S'inscrire</h1>
    <form onSubmit={handleSubmit}>
        <div className='ConnexionSectionInput'>
        <input
          className='fullInput'
          type="text"
          value={username}
          placeholder='identifiant'
          onChange={handleUsernameChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="none" stroke="white" stroke-linejoin="round" stroke-width="4"><path stroke-linecap="round" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20" clip-rule="evenodd"/><path fill="white" d="M24 23a5 5 0 1 0 0-10a5 5 0 0 0 0 10Z"/><path stroke-linecap="round" d="M10.022 38.332C10.366 33.121 14.702 29 20 29h8c5.291 0 9.623 4.11 9.977 9.311"/></g></svg>          
        </div>

        <div className='ConnexionSectionInput'>
        <input
          className='fullInput'
          type="text"
          value={email}
          placeholder='email'
          onChange={handleEmailChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="white"><path d="M22 7.535V17a3 3 0 0 1-2.824 2.995L19 20H5a3 3 0 0 1-2.995-2.824L2 17V7.535l9.445 6.297l.116.066a1 1 0 0 0 .878 0l.116-.066z"/><path d="M19 4c1.08 0 2.027.57 2.555 1.427L12 11.797l-9.555-6.37a3 3 0 0 1 2.354-1.42L5 4z"/></g></svg>        
        </div>

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
        <div className='ConnexionSectionInput'>
        <input
          className='fullInput'
          type="password"
          value={secondPassword}
          placeholder='Confirmer votre mot de passe'
          onChange={handleSecondPasswordChange}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6z"/></svg>
        </div>
        <div className={"ConnexionSectionWarningMessage " + (warningMessage?"ConnexionSectionWarningMessageOn":"ConnexionSectionWarningMessageOff")}>
          <p>
            {warningMessage}
          </p>
        </div>
        <button type="submit">S'inscrire</button>
        <a href="/login"><h4>Déjà un compte ? <span>Se connecter</span></h4></a>
    </form>
    </div>
  </div>
);
}

export default Register;