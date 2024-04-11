import React, { useEffect, useState  } from 'react';
import { Link, useLocation, useNavigate  } from 'react-router-dom';
import {Icon} from "@iconify/react"
import PageTransitioner from './PageTransitioner';



export default function Header() {
  const { pathname } = useLocation();
  const [changingPage, setChangingPage] = useState(false);
  const [hamburgerMenuOn, setHamburgerMenuOn] = useState(false)
  const navigate = useNavigate();
  

  useEffect(() => {
    // add loading page 
    // Remove "headerUnderline" class from all elements
    document.querySelectorAll('li').forEach(element => {
      element.classList.remove('headerUnderline');
    });
    const array = pathname.split("/");
    let elementId;
    switch (array[1]) {
      case "learn":
        elementId = 'headerElementLearn';
        break;
      case "train":
        elementId = 'headerElementTrain';
        break;
      case "gethelp":
        elementId = "headerElementGetHelp";
        break;
      default : 
        elementId = "headerElementHome";

    }
    const element = document.getElementById(elementId);
    if (element) {
      element.classList.add("headerUnderline");
    }
  }, [pathname]);

  const handlePageChanging = (direction) => {
    // Set state to indicate that page changing is in progress
    setChangingPage(true);
    
    // Delay the URL change by 1 second (1000 milliseconds)
    setTimeout(() => {
      navigate(direction)
      // Reset the state after navigation
      setChangingPage(false);
    }, 500);
  };

  return (
    <>
    <div id='header'>
      
      <div id='logoSection'>
        <svg width="35" height="35" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.3542 22.6042L29.8958 17.8646L30.8437 17.9375C31.2569 17.9861 31.5792 18.1562 31.8106 18.4479C32.042 18.7396 32.1572 19.0555 32.1562 19.3958C32.1562 19.5903 32.1198 19.7847 32.0469 19.9792C31.974 20.1736 31.8403 20.3437 31.6458 20.4896L27.8542 23.8073L28.9844 28.7292C29.0087 28.7778 29.0208 28.8327 29.0208 28.894V29.0573C29.0208 29.4705 28.875 29.8171 28.5833 30.0971C28.2917 30.3771 27.9514 30.5166 27.5625 30.5156C27.441 30.5156 27.3136 30.4971 27.1804 30.4602C27.0472 30.4233 26.9194 30.3688 26.7969 30.2969L26.0312 29.8229L24.3542 22.6042ZM20.9271 11.9583L19.3958 8.38541L19.7239 7.58333C19.8455 7.29166 20.0336 7.06659 20.2883 6.90812C20.543 6.74965 20.8046 6.6709 21.0729 6.67187C21.3403 6.67187 21.6018 6.74479 21.8575 6.89062C22.1132 7.03645 22.3013 7.2552 22.4219 7.54687L24.4271 12.2865L20.9271 11.9583ZM7.07291 28.7292L8.67708 21.8385L3.3177 17.2083C3.12326 17.0625 2.99541 16.8924 2.93416 16.6979C2.87291 16.5035 2.84277 16.309 2.84374 16.1146C2.84374 15.7743 2.95944 15.4583 3.19083 15.1667C3.42221 14.875 3.74402 14.7049 4.15624 14.6562L11.2292 14.0365L13.9635 7.54687C14.0851 7.2552 14.2737 7.03645 14.5294 6.89062C14.7851 6.74479 15.0461 6.67187 15.3125 6.67187C15.5799 6.67187 15.8409 6.74479 16.0956 6.89062C16.3503 7.03645 16.539 7.2552 16.6615 7.54687L19.3958 14.0365L26.4687 14.6562C26.8819 14.7049 27.2042 14.875 27.4356 15.1667C27.667 15.4583 27.7822 15.7743 27.7812 16.1146C27.7812 16.309 27.7506 16.5035 27.6894 16.6979C27.6281 16.8924 27.5008 17.0625 27.3073 17.2083L21.9479 21.8385L23.5521 28.7292C23.5764 28.8021 23.5885 28.9115 23.5885 29.0573C23.5885 29.4705 23.4427 29.8171 23.151 30.0971C22.8594 30.3771 22.5191 30.5166 22.1302 30.5156C22.0573 30.5156 21.8021 30.4427 21.3646 30.2969L15.3125 26.651L9.26041 30.2969C9.13888 30.3698 9.01152 30.4247 8.87833 30.4617C8.74513 30.4986 8.61728 30.5166 8.49478 30.5156C8.05728 30.5156 7.68055 30.3392 7.36458 29.9862C7.0486 29.6333 6.95138 29.2143 7.07291 28.7292Z" fill="#2C3038"/>
        </svg>
        <Link onClick={()=>{handlePageChanging("/")}}><h2>TEACHIFY</h2></Link>
      </div>
      <div>
        <ul>
          <Link ><li id='headerElementHome' onClick={()=>{handlePageChanging("/")}} >Découvrir</li></Link>
          <Link><li id='headerElementLearn' onClick={()=>{handlePageChanging("/learn")}}>Apprendre</li></Link>
          <Link><li id='headerElementTrain' onClick={()=>{handlePageChanging("/train")}}>S'entrainer</li></Link>
          <Link><li id='headerElementGetHelp' onClick={()=>{handlePageChanging("/gethelp")}}>Etre aidé</li></Link>
        </ul>
      </div>
      <div onClick={()=>{
        setHamburgerMenuOn(old => !old)
      }}>
      {!hamburgerMenuOn?<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/></svg>
        :<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20 20L4 4m16 0L4 20"/></svg>}
      </div>
    </div>
    {hamburgerMenuOn?<div id='hamburgerMenu'>
      
        <ul>
          <Link onClick={()=>{setHamburgerMenuOn(false)}}><li id='headerElementHome' onClick={()=>{handlePageChanging("/")}} >Découvrir</li></Link>
          <Link onClick={()=>{setHamburgerMenuOn(false)}}><li id='headerElementLearn' onClick={()=>{handlePageChanging("/learn")}}>Apprendre</li></Link>
          <Link onClick={()=>{setHamburgerMenuOn(false)}}><li id='headerElementTrain' onClick={()=>{handlePageChanging("/train")}}>S'entrainer</li></Link>
          <Link onClick={()=>{setHamburgerMenuOn(false)}}><li id='headerElementGetHelp' onClick={()=>{handlePageChanging("/gethelp")}}>Etre aidé</li></Link>
        </ul>
      
      </div>:""}
    </>
  );
}

