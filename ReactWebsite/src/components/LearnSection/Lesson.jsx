import {React , useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import Loading from '../Loading';

import { SpinnerDotted } from 'spinners-react';
import LessonQuestion from './LessonQuestion';

export default function Lesson({data, selectedLanguage}) {
  const [generatedCourses, setGeneratedCourses] = useState([])
  const [loadingCourse, setLoadingCourse] = useState([]);
  const [loading, setLoading] = useState(false)

  async function sendCourse(theme, e){
    setGeneratedCourses(prev => [...prev, theme])
    const response = await fetch('http://localhost:5000/api/specificcourse', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subject: theme, selectedLanguage : selectedLanguage }),
        });
      const responseData = await response.json();
      console.log(responseData.summarized)
      e.target.className =""

      // Create div element
      var div = document.createElement('div');
      div.className = 'slideDown';

      // Create first paragraph element
      var paragraph1 = document.createElement('p');
      paragraph1.textContent = responseData.course;

      // Create second paragraph element with strong element inside
      var paragraph2 = document.createElement('p');
      var strong = document.createElement('strong');
      strong.textContent = '💡' + responseData.summarized + '💡';
      paragraph2.appendChild(strong);

      // Create button element
      var button = document.createElement('button');
      button.className = 'button';
      button.textContent = 'Generate exercise';
      button.onclick = function(e) {
          handleExerciseGeneration(responseData.course, selectedLanguage,e);
      };

      // Append all elements to the div
      div.appendChild(paragraph1);
      div.appendChild(paragraph2);
      div.appendChild(button);

      // Insert the div after the target element
      e.target.parentNode.insertBefore(div, e.target.nextSibling);      
      const newH2 = document.createElement('h2');
      newH2.innerHTML = theme;
      e.target.replaceWith(newH2)
      setLoadingCourse(prevLoading => prevLoading.filter(item => item !== theme));    
    }
    console.log(data.content[0])

  async function handleExerciseGeneration(course, language,e) {
    setLoading(true)
    const response = await fetch('http://localhost:5000/api/exercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: course[0],
          exerciseType: 'QCM',
          inputForm: 'Cours',
          language: language,
          difficulty : "Medium"
        }),
      });
      const responseData = await response.json();    
      // Create a container element to hold the QuestionPart component
    
      // Append the container next to the div button
      const questionPartContainer = document.createElement('div');
      ReactDOM.render(<LessonQuestion data={responseData} />, questionPartContainer);
      e.target.parentNode.insertBefore(questionPartContainer, e.target.nextSibling);
      setLoading(false)
    }
  return (
    <div className='course'>
      
        <h1 id={data.title}>{data.title}</h1>
        {
          // first part of the lesson ( Points )
        }
        {
          data.index === 0 ? (
            <div className='courseList'>
              {data.content[0].map(el => (
                <div key={el} className={`${generatedCourses.includes(el) ? "smallcourse" : ""} ${loadingCourse.includes(el) ? "loadingbutton" : ""} ${el}`}>
                  <p onClick={(e) => { sendCourse(el, e); setLoadingCourse(prevLoading => [...prevLoading, el]); }} key={el + "text"}>{loadingCourse.includes(el) ? <div id='spinnerCoursegeneration'><SpinnerDotted color='white' /></div> : el.replace(/"/g, '')}</p>
                </div>

              ))}
            </div>
          ) : null
        }
        {
          // second part of the lesson ( How to learn more )
        }
        {
          data.index === 1 ?  <p>{data.content[0]}</p> :""
        }
        {
          // third part of the lesson ( External Resources )
        }
        { 
          data.index === 2 ? 
            eval(data.content[0]).map(el => (
              el.includes("https")?<a href={el.replace(/'/g, '').replace(/"/g, '')} target='_blank'><div className='courseList'><p className='smallcourse'><strong>{el.replace("https://","").replace(/"/g, '')}</strong></p></div></a>
              :<p><strong>{el}</strong></p>
            ))
          :""
        }
               

        {
          // below is the summary of the lesson 
        }
        <p><strong>{"💡 "+data.content[1]+" 💡"}</strong></p>
       
        {loading? <Loading text = {"Writing your exercise"}/>:""}
    </div>

        
  )
}