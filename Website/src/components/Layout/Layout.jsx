
import React from 'react'
import {Outlet, Link} from "react-router-dom"
import Navbar from './Navbar'
import Header from "./Header"
import Footer from './Footer'
import ThemeWarning from './ThemeWarning'

function Layout(){
    
    return (
        <>
            <Header/> 
            <Navbar/>
            <ThemeWarning/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout
