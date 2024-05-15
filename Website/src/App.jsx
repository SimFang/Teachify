import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout/Layout'
import Mainpage from './components/Mainpage'
import LearnMainpage from './components/LearnSection/LearnMainpage'
import TrainMainpage from './components/TrainSection/TrainMainpage'
import GethelpMainpage from './components/HelpSection/GethelpMainpage'
import Login from './components/AuthenticationSection/Login'
import Register from './components/AuthenticationSection/Register'
import AuthenticationMainPage from './components/AuthenticationSection/AuthenticationMainPage'


function App() {

  localStorage.setItem('serverAddress', 'http://127.0.0.1:5000');

  return (
    <>
     <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Mainpage/>}/>
          <Route path='/learn' element={<LearnMainpage/>}/>
          <Route path = "/train" element={<TrainMainpage/>}/>
          <Route path='/gethelp' element={<GethelpMainpage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/me' element={<AuthenticationMainPage/>}></Route>
        </Route>
      </Routes> 
    </>
  )
}



export default App


