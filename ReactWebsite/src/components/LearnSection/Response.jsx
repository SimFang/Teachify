import {useContext,React, useState} from "react"
import Lesson from './Lesson'
import Exercise from './Exercise'
import MainContext from './CourseContext'
import CourseBot from "../HelpSection/CourseBot"

export default function Response({selectedLanguage}) {
  const response = useContext(MainContext)
  const [assistantOn, setAssistantOn] = useState(false)
  const [assistantCourse, setAssistantCourse] = useState("")
  return (
    <>
    {response && response.map((item, index) => (
      <div key={index}>
        {item.type === 'lesson' ? (
          <>
          <div className="line"><div></div></div>
          <Lesson key={index} data={item} selectedLanguage = {selectedLanguage} setAssistantCourse = {setAssistantCourse} setAssistantOn = {setAssistantOn}/>
          
          </>
        ):""}
        {item.type === "exercise" ? (
        <Exercise key={index} data={item} />
        ):''}
      </div>
    ))}
     { assistantOn && assistantCourse && <CourseBot data = {assistantCourse} setAssistantOn = {setAssistantOn}/>}
    </>
  )
}
