import React, { useEffect, useState} from 'react'
import Login from './Login'
import Register from './Register'
import { useNavigate } from 'react-router-dom'
import quotes from '../../assets/quotes'

import checkLog from './func/checkLog'
import logOut from './func/logOut'
import storeExercise from './func/storeExercise'
import getUserExercise from './func/getUserExercise'
import ThemeSection from './ThemeSection'
import deleteTheme from './func/deleteTheme'

export default function AuthenticationMainPage() {
    const navigate = useNavigate()

    const [user, setUser] = useState("")
    const [exercises, setExercises] = useState("")
    const [section, setSection] = useState("")
    const [isDeletting, setDeletting] = useState(false)

    const [quote, setQuote] = useState(" It's a small step for man, but a giant leap for mankind")
    // this is only for test, remove it when db provides themes
    const themesFromDb = [{
        theme : "Interaction gravitationelle",
        ids : ["sdmlfkjsdmlkfjsomijef","moisjdflmkjsdmlkfjmsdkfj","mlkjdsfsdjf","dmlkfjsdklfj"],
    },
    {
        theme : "Interaction gravitationelle",
        ids : ["sdmlfkjsdmlkfjsomijef","moisjdflmkjsdmlkfjmsdkfj","mlkjdsfsdjf","dmlkfjsdklfj","moisjdflmkjsdmlkfjmsdkfj","mlkjdsfsdjf","dmlkfjsdklfj","moisjdflmkjsdmlkfjmsdkfj","mlkjdsfsdjf","dmlkfjsdklfj"],
    },
    {
        theme : "Interaction gravitationelle",
        ids : ["sdmlfkjsdmlkfjsomijef","moisjdflmkjsdmlkfjmsdkfj","mlkjdsfsdjf","dmlkfjsdklfj"],
    },
    {
        theme : "Interaction gravitationelle",
        ids : ["mlkjdsfsdjf","dmlkfjsdklfj"],
    }]

    const changeQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]) 
    }

    
    

    useEffect(() => {
        // check if user is logged 
        const checkLogged = async () => {
            let answer = await checkLog()
            if(answer){
                setUser(answer)
                return
            } else {
                setUser("")
                navigate("/login")
                return
            }

        }
        checkLogged();

        // load the boxes
        const getExercises = async()=> {
            let exercises = await getUserExercise()
            if(!exercises) return
            exercises = await exercises.json();
            setExercises(exercises)
            console.log(exercises)
        }
       setTimeout(()=>{
           if(isDeletting){
            setDeletting(false)
           } else {
            getExercises()
           }
       },100)
    }, []);
    
    async function logout(){
        navigate("/")
        logOut()
        setUser("")
    }

    async function handleChangeSection(theme){
        if(isDeletting) {
            setDeletting(false) 
            return
        } else {
            setSection(theme)
        }
    }
    const deleteExerciseFromTheme = async (theme) => {
        console.log("Deleting exercises with theme:", theme);
        setDeletting(true); // Assuming setDeleting is a function to update a state indicating deletion is in progress
        try {
            // Assuming deleteTheme(theme) is a function that handles the deletion on the backend
            await deleteTheme(theme);
            // After successful deletion, update the state to reflect the changes (remove exercises with the specified theme)
            setExercises(prevExercises => prevExercises.filter(exercise => exercise.theme !== theme));
            console.log("Deletion completed successfully");
        } catch (error) {
            console.error("Error deleting exercises:", error);
        } 
    }
    
  
    return (
        <>
        {/* This renders the Theme Section */}
        <div className='ThemeSectionSticker'>
            {section && <ThemeSection theme={section} setSection={setSection}/>}
        </div>


        <div className='PersonalPage'>
            <div className="PersonalPageBanner">
                <div>
                <h1 className='PersonalPageTitle'>Bienvenue, {user.username}</h1>
                </div>
            </div>

            <div className="PersonalPageQuote">
                <div className="PersonalPageQuoteContent">
                <p>{"| "+ quote}</p>
                <div onClick={changeQuote}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M12.005 22.003c-5.523 0-10-4.477-10-10s4.477-10 10-10s10 4.477 10 10s-4.477 10-10 10m-5-13h2v4h2v-4h2l-3-3.5zm10 6h-2v-4h-2v4h-2l3 3.5z"/></svg>
                </div>
                </div>
            </div>
            <div className="PersonalPageBoxContainer">
                <div className="PersonalPageBoxContentContainer">
                {exercises && exercises.map((theme, index) => (
                    <div key={`${theme.theme}-PersonalPageBox-${index}`} className={`PersonalPageBox${theme.ids.length <= 3 ? " PersonalPageSmallBox" : ""}${theme.ids.length > 3 && theme.ids.length < 10 ? " PersonalPageMediumBox" : ""}${theme.ids.length >= 10 ? " PersonalPageBigBox" : ""}`}>
                      
                        <img src={theme.illustration} alt="" onClick={()=>{handleChangeSection(theme.theme)}} />
                        <div onClick={()=>{handleChangeSection(theme.theme)}} key={`${theme.theme}-PersonalPageBoxCover`} className="PersonalPageBoxCover"></div>
                        <p key={`${theme.theme}-p`}><span key={`${theme.theme}-span`}>{theme.theme}</span></p>
                        <p key={`${theme.theme}-p2`}>{theme.ids.length} exos</p>
                        <div className="PersonalSectionBoxDeleteButton" onClick={()=>{deleteExerciseFromTheme(theme.theme)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24"><path fill="black" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z"></path></svg>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <button onClick={async()=>{
                await logout()
            }}>
                Log out
            </button>
            
        </div>
        </>
  )
}
