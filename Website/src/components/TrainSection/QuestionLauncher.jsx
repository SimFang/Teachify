import React, { useState, useEffect} from 'react'
import NewQuestion from './NewQuestion';
import QuestionResultPage from './QuestionResultPage';
import Loading from '../Loading';
import storeExercise from '../AuthenticationSection/func/storeExercise';

export default function QuestionLauncher({data, setEnd, settings}) {
    const [submit, setSubmit] = useState("")
    const [correction, setCorrection] = useState("")
    const [loading, setLoading] = useState(false)
    const [lastSettings, setLastSettings] = useState('')

    useEffect(() => {
      // REQUEST CORRECTION
      const requestCorrection = async () => {
        if (submit) {
          setLoading(true)
          try {
            const response = await fetch('http://127.0.0.1:5000/api/getcorrection', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ input: submit, question: data[1], context: data[0], level : settings[1], language : settings[0] }),
            });
            const correctionData = await response.json(); 
            setCorrection(correctionData);
          } catch (error) {
            console.error('Error fetching correction:', error);
          }
          setLoading(false)
        }
      };
    
      requestCorrection();
    }, [submit]);

    useEffect(()=>{
      const storeInDb = async () => {
          await storeExercise(settings[2] == "Theme"?settings[3]:null, settings[2], settings[3], "Question", data, correction, null, settings[0], settings[1])
      }
      if(correction){
        storeInDb()
      }
    },[correction])

    useEffect(() => {
      if (correction.length == 4) {
        const element = document.querySelector('.QuestionResultPage');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, [correction]);
  return (
    <>
        
        {!correction?<NewQuestion data = {data} setSubmit={setSubmit}/>:""}        
        {correction ?<QuestionResultPage correction={correction} setEnd={setEnd} setCorrection={setCorrection}/>:""}
        {loading && <Loading text = {"Correction en cours"}/>}
    </>
  )
}
