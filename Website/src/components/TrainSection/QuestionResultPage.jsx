import React, { useState, useEffect } from 'react'
import PassButton from '../Utilities/PassButton';

export default function QuestionResultPage({correction, setEnd, setCorrection}) {

    const [openSection, setOpenSection] = useState([])

    useEffect(() => {
        if(correction){
            const stars = document.querySelectorAll('.QuestionResultPageStarsContainer svg');
            stars.forEach((star, index) => {
                star.style.animationDelay = `${index * 50}ms`;
            });
            const starsPath = document.querySelectorAll('.QuestionResultPageStarsContainer svg path');
            starsPath.forEach((star, index) => {
                star.style.animationDelay = `${index * 50}ms`;
            });
        }
    }, [correction]);
    
  return (
    <div className="QuestionResultPage">
        <div className="QuestionResultPageBanner"></div>
        <h1>FELICITATIONS</h1>
        <div className="QuestionResultPageGrade">
            {correction[0]+"/20"}
        </div>
        <div className="QuestionResultPageStarsContainer">
            <div></div>
            {Array(correction[0]).fill(null).map((_, index) => (
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M9.153 5.408C10.42 3.136 11.053 2 12 2c.947 0 1.58 1.136 2.847 3.408l.328.588c.36.646.54.969.82 1.182c.28.213.63.292 1.33.45l.636.144c2.46.557 3.689.835 3.982 1.776c.292.94-.546 1.921-2.223 3.882l-.434.507c-.476.557-.715.836-.822 1.18c-.107.345-.071.717.001 1.46l.066.677c.253 2.617.38 3.925-.386 4.506c-.766.582-1.918.051-4.22-1.009l-.597-.274c-.654-.302-.981-.452-1.328-.452c-.347 0-.674.15-1.328.452l-.596.274c-2.303 1.06-3.455 1.59-4.22 1.01c-.767-.582-.64-1.89-.387-4.507l.066-.676c.072-.744.108-1.116 0-1.46c-.106-.345-.345-.624-.821-1.18l-.434-.508c-1.677-1.96-2.515-2.941-2.223-3.882c.293-.941 1.523-1.22 3.983-1.776l.636-.144c.699-.158 1.048-.237 1.329-.45c.28-.213.46-.536.82-1.182z"/></svg>
            ))}
        </div>
        <div className='QuestionResultPageContainer'>
        {correction.slice(1, 4).map((item, index) => (
            <>
            <div key={index} onClick={() => setOpenSection([item])} className={openSection.includes(item) ? "QuestionResultPageSectionSelected" : ""}>
            <h2>{index === 0 ? "Remarque global" : index === 1 ? "Points positifs" : "Points à améliorer"}</h2>
            </div>
            <p className={openSection.includes(item) ? "QuestionResultPageSectionOpen" : "QuestionResultPageSectionClosed"}>{item}</p>
            </>
        ))}
    </div>

            <PassButton setSomething ={setEnd} text = {"TERMINER"} otherFunc = {setCorrection}/>
    </div>
  )
}
