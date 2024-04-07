import { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout/Layout'
import Mainpage from './components/Mainpage'
import LearnMainpage from './components/LearnSection/LearnMainpage'
import TrainMainpage from './components/TrainSection/TrainMainpage'
import GethelpMainpage from './components/HelpSection/GethelpMainpage'


function App() {

  return (
    <>
     <Routes>
        <Route path="/" element={<Layout/>} >
          <Route index element={<Mainpage/>}/>
          <Route path='/learn' element={<LearnMainpage/>}/>
          <Route path = "/train" element={<TrainMainpage/>}/>
          <Route path='/gethelp' element={<GethelpMainpage/>}></Route>
        </Route>
      </Routes> 
    </>
  )
}



export default App


