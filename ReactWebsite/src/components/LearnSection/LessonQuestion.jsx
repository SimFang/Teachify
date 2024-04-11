import { useContext, useEffect, useState } from 'react';

export default function LessonQuestion({data}) {
    const response = data;
    const [hint, setHint] = useState("");
    const [shownHintIndex, setShownHintIndex] = useState("")
    const [checkedAnswers, setCheckedAnswers] = useState(["", "", "", "", ""]);
    const [goodAnswers, setGoodAnswers] = useState([]);
    const [wrongAnswers, setWrongAnswers] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false)

    useEffect(()=>{
        setShowAnswer(false)
        setCheckedAnswers(["","","","",""])
    },[response])

    function handleShowHint(e, index) {
        console.log(e, index)
        setShownHintIndex(index)
        let Hint = e.target.getAttribute('data-hint');
        setHint(Hint);
    }

    function hideHint() {
        setHint("");
    }

    function checkAnswer(event, index, choiceIndex) {
        event.preventDefault()
        setCheckedAnswers(prevState => {
            const newCheckedAnswers = [...prevState]; // Create a copy of the state array
            newCheckedAnswers[index] = `option${choiceIndex + 1}`; // Update the value at the clicked index
            return newCheckedAnswers; // Return the updated state
        });
        if(checkedAnswers[index] == `option${choiceIndex + 1}`){
            setCheckedAnswers(prevState => {
                const newCheckedAnswers = [...prevState]; // Create a copy of the state array
                newCheckedAnswers[index] = ""; // Update the value at the clicked index
                return newCheckedAnswers; // Return the updated state
            });
        }
    }

    function Verify() {
        let choices = checkedAnswers;
        let results = [];
        let good = [];
        let wrong = [];

        response.content.forEach((question, index) => {
            switch (question[2]) {
                case "A":
                    results.push('option1');
                    break;
                case "B":
                    results.push('option2');
                    break;
                case "C":
                    results.push('option3');
                    break;
                case "D":
                    results.push('option4');
                    break;
                default:
                    // Handle default case if needed
                    break;
            }
        });

        choices.map((userChoice, index) => {
            good.push(`${index}${results[index]}`);
            if (choices[index] !== results[index] && choices[index] !== null) {
                wrong.push(`${index}${choices[index]}`);
            }
        });
        console.log(goodAnswers);
        setGoodAnswers(good);
        setWrongAnswers(wrong);
        // Do something with the results array
    }

    return (
        <>
            <div className='trainQuestion'>
                <h1>{"Exercice : " + response.title}</h1>
                {response.content.map((question, index) => {
                    return (
                        <>
                            <div key={index} className='question slideDown'>
                                <div >
                                    <h3>{question[0]}</h3>
                                    {question[1].map((choice, choiceIndex) => (
                                        <div key={choiceIndex} id={'QCMquestion' + (index)}>
                                            <input
                                                onChange={() => { }}
                                                type="checkbox"
                                                id={`option${choiceIndex + 1}`}
                                                name={`option${choiceIndex + 1}`}
                                                checked={checkedAnswers[index] == `option${choiceIndex + 1}`}
                                                onClick={()=>{checkAnswer(event, index, choiceIndex)}} // Add event listener to prevent default behavior
                                            />
                                            <label
                                                htmlFor={`option${choiceIndex + 1}`}
                                                onClick={() => { checkAnswer(event, index, choiceIndex) }}
                                                className={(wrongAnswers.includes(index + `option${choiceIndex + 1}`)  && showAnswer  ? "wrongQCManswer " : "") + (goodAnswers.includes(index + `option${choiceIndex + 1}`) && showAnswer ? "goodQCManswer" : "")}>{choice}</label>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={(e)=>{handleShowHint(e, index)}} data-hint={question[3]}>Indice</button>
                                {hint && shownHintIndex == index ?<div id='hintContainer'><div id="hint" className={`${hint != "" ? "active" : "inactive"}`}>
                                    {hint}
                                    <button className='button' onClick={hideHint}>Cacher</button>
                                </div></div>:""}
                            </div>
                        </>
                    )
                })}
                
                <button className='button' onClick={()=>{
                    Verify()
                    setShowAnswer(old => !old)
                }}>
                    Réponses
                </button>
            </div>
        </>
    )
}
