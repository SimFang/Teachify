import {useContext,React} from "react"
import Lesson from './Lesson'
import Exercise from './Exercise'
import MainContext from './CourseContext'

export default function Response() {
  const response = useContext(MainContext)
  return (
    <>
    {response && response.map((item, index) => (
      <div key={index}>
        {item.type === 'lesson' ? (
          <>
          <div className="line"><div></div></div>
          <Lesson key={index} data={item} />
          
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
