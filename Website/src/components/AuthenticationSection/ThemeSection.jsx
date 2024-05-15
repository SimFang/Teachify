import React, { useEffect, useState } from 'react'
import getThemeExercises from './func/getThemeExercises'
import NewQCM from '../TrainSection/NewQCM'
import QuestionLauncher from '../TrainSection/QuestionLauncher'

import ThemeExerciseGenerator from './ThemeExerciseGenerator'
import { useNavigate } from 'react-router-dom'
import NewQuestion from '../TrainSection/NewQuestion'



export default function ThemeSection({theme, setSection}) {
    const navigate = useNavigate()



    const [exercises, setExercises] = useState("")
    const [isLeaving, setLeaving] = useState(false)
    
    // rendering an exercise
    const [exerciseOn, setExerciseOn] = useState("")
    const [currentQuestion, setCurrentQuestion]=useState(0)
    const [nextClicked, setNextClicked] = useState(false);
    const [score, setScore] = useState(0)

    // generating an exercise
    const [generatingExercise, setGeneratingExercise] = useState("")

    useEffect(()=>{
        if(nextClicked){
            setTimeout(()=>{
                if(currentQuestion == exerciseOn.length -1){
                    setExerciseOn("")
                    setNextClicked(false)
                    setCurrentQuestion(0)
                    return
                }
                setCurrentQuestion(old => old + 1)
                setNextClicked(false)
            },200)
        }
    },[nextClicked])

    function passQuestion(index){
        if(index !== currentQuestion) return "QCMoff";
    }

    const showExercise = (index)=> {
        console.log(JSON.parse(exercises[index].content))
        console.log(JSON.parse(exercises[index].content).length)
        if(exercises){
            setExerciseOn(JSON.parse(exercises[index].content))
        } 
    }

    useEffect(()=>{
        const getData = async() => {
            let answer = await getThemeExercises(theme)
            answer = await answer.json()
            if(!answer) return
            setExercises(answer)
        }
        getData()
        if(!exercises){
            navigate("/me")
        }
    },[])

    useEffect(()=>{
        if(isLeaving){
            setTimeout(()=>{
                setSection("")
                setLeaving(false)
            },300)
        }
    },[isLeaving])
  return (
    <div>
        {/* It renders the done QCM */}        
        <div className='PersonalSectionExerciseSticker'>
            {exerciseOn && exerciseOn.length !== 3 && exerciseOn.length!==2 && exerciseOn.map((question, index) => {
                return (
                    <div key={index} className={passQuestion(index)}>
                        <NewQCM 
                            data={question} 
                            nextClicked={nextClicked} 
                            setNextClicked={setNextClicked} 
                            score={`0`} 
                            setScore={setScore}
                        />
                    </div>
                );
            })}
            
            {exerciseOn && exerciseOn.length === 3  && <div key={exerciseOn+"questino"}>
                        <NewQuestion 
                            data={exerciseOn} 
                            setSubmit={setExerciseOn}
                        />
                    </div>}
            {exerciseOn && exerciseOn.length === 2  && <div key={exerciseOn+"questino"}>
                <NewQuestion 
                    data={exerciseOn} 
                    setSubmit={setExerciseOn}
                />
        </div>}    
                
            
        
        {/* It creates the new exo */}
        {generatingExercise ? <ThemeExerciseGenerator setGeneratingExercise={setGeneratingExercise} passedSettings={[exercises[exercises.length - 1].language,exercises[exercises.length - 1].level,exercises[exercises.length - 1].input_type,exercises[exercises.length-1].input]} passedExerciseType={generatingExercise}/>:""}
        </div>
        
        {/*Main page*/}
        {exercises && <div className={"PersonalSection "+(isLeaving?"PersonalSectionIsLeaving":"")}>
                <div className="PersonalSectionHeader">
                <svg onClick={()=>{
                    setLeaving(true)
                }} className='PersonalSectionExitButton' xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 512 512"><path fill="#1b1d22" d="M508.333 32.666C508.333 16.35 494.984 3 478.668 3H29.032C14.348 3 2.333 15.015 2.333 29.699v452.602C2.333 496.985 14.348 509 29.032 509h449.635c16.316 0 29.666-13.35 29.666-29.666z"></path><path fill="#5c5c5c" d="M478.668 488.915H29.032c-14.684 0-26.699-12.015-26.699-26.699v20.085C2.333 496.985 14.348 509 29.032 509h449.635c16.316 0 29.666-13.35 29.666-29.666v-20.085c0 16.316-13.349 29.666-29.665 29.666"></path><path fill="#fff" d="m317.727 256l96.059-96.059c5.488-5.488 5.488-14.385 0-19.872l-41.854-41.854c-5.488-5.488-14.385-5.488-19.872 0L256 194.273l-96.059-96.059c-5.488-5.488-14.385-5.488-19.872 0l-41.854 41.854c-5.488 5.488-5.488 14.385 0 19.872L194.273 256l-96.059 96.059c-5.488 5.488-5.488 14.385 0 19.872l41.854 41.854c5.488 5.488 14.385 5.488 19.872 0L256 317.727l96.059 96.059c5.488 5.488 14.385 5.488 19.872 0l41.854-41.854c5.488-5.488 5.488-14.385 0-19.872z"></path></svg>
                    <img src={exercises[0].illustration} alt="" />
                    <h1>{theme}</h1>
                </div>
                <div className='PersonalSectionContainer'>
                    <div className='PersonalSectionBoxContainer'>
                        {exercises && exercises.map((exercise, index) => {
                            return <div className='PersonalSectionBox' key={exercise + index} onClick={()=>{showExercise(index)}}>
                                {exercise.type==="QCM"?<svg className='PersonalSectionQCMIcon' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"></path><path fill="black" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm11.95 6.796a1 1 0 0 0-1.414-1.415l-4.95 4.95l-2.121-2.121a1 1 0 1 0-1.415 1.414l2.758 2.758a1.1 1.1 0 0 0 1.556 0z"></path></g></svg>:""}
                                {exercise.type==="Question"?<svg className='PersonalSectionQuestionIcon' xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16"><path fill="black" d="M5.933.87a2.89 2.89 0 0 1 4.134 0l.622.638l.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89l.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622l.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01l-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637l-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89l-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622l-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01zM7.002 11a1 1 0 1 0 2 0a1 1 0 0 0-2 0m1.602-2.027c.04-.534.198-.815.846-1.26c.674-.475 1.05-1.09 1.05-1.986c0-1.325-.92-2.227-2.262-2.227c-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64c.272 0 .455-.147.564-.51c.158-.592.525-.915 1.074-.915c.61 0 1.03.446 1.03 1.084c0 .563-.208.885-.822 1.325c-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745c.336 0 .504-.24.554-.627"></path></svg>:""}
                                <h4>{exercise.type}</h4>
                                <h5>{exercise.result+'/20'}</h5>
                                
                            </div>
                        })}
                        <div className="PersonalSectionMore" onClick={()=>{setGeneratingExercise("QCM")}}>
                            <h3>QCM</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"></path></svg>
                        </div>
                        <div className="PersonalSectionMore" onClick={()=>{setGeneratingExercise("Question")}}>
                            <h3>Question</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M17 13h-4v4h-2v-4H7v-2h4V7h2v4h4m2-8H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2"></path></svg>
                        </div>
                    </div>
                    
                    <div className='PersonalSectionGraph'>
                        {/* we will show the progression graph*/}
                    </div>
                </div>
        </div>}
        
    </div>
  )
}
