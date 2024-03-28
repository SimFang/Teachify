
import React from 'react'
import {Outlet, Link} from "react-router-dom"
import Navbar from './Navbar'
import Header from "./Header"
import Footer from './Footer'

function Layout(){
    
    return (
        <>
            <Header/> 
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
