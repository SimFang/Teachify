import {useContext,React} from "react"
import Lesson from './Lesson'
import Exercise from './Exercise'
import MainContext from './CourseContext'

export default function Response({selectedLanguage}) {
  const response = useContext(MainContext)
  return (
    <>
    {response && response.map((item, index) => (
      <div key={index}>
        {item.type === 'lesson' ? (
          <>
          <div className="line"><div></div></div>
          <Lesson key={index} data={item} selectedLanguage = {selectedLanguage}/>
          
          </>
        ):""}
        {item.type === "exercise" ? (
        <Exercise key={index} data={item} />
        ):''}
      </div>
    ))}
    </>
  )
}
