import {React , useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import Loading from '../Loading';

import { SpinnerDotted } from 'spinners-react';
import LessonQuestion from './LessonQuestion';

export default function Lesson({data, selectedLanguage, setAssistantCourse, setAssistantOn}) {
  const [generatedCourses, setGeneratedCourses] = useState([])
  const [loadingCourse, setLoadingCourse] = useState([]);
  const [loading, setLoading] = useState(false)
  

  async function sendCourse(theme, e){
    setGeneratedCourses(prev => [...prev, theme])
    const response = await fetch('http://127.0.0.1:5000/api/specificcourse', {
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
      button.textContent = 'Générer un exercice';
      button.onclick = function(e) {
          handleExerciseGeneration(responseData.course, selectedLanguage,e);
      };

      // Create the SVG element
      const handleSvgClick = () => {
        setAssistantOn(assistantOn => !assistantOn);
        setAssistantCourse(responseData.course)
      };
    
      const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.addEventListener("click", handleSvgClick);
      svgElement.setAttribute("class", `callAssistantButton `);
      svgElement.setAttribute("data-course",responseData.course)
      // Create the path element
      const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathElement.setAttribute("fill", "currentColor");
      pathElement.setAttribute("d", "M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3l3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-5.12 10.88L12 17l-1.88-4.12L6 11l4.12-1.88L12 5l1.88 4.12L18 11z");
      
      // Append the path to the SVG element
      svgElement.appendChild(pathElement);

      // Append all elements to the div
      div.appendChild(paragraph1);
      div.appendChild(paragraph2);
      div.appendChild(button);
      div.appendChild(svgElement)

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
    const response = await fetch('http://127.0.0.1:5000/api/exercise', {
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
    <>
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
    </>
  )
}