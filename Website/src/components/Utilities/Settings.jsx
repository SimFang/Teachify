import React, {useContext, useEffect, useState} from 'react'
import ExerciseContext from "../TrainSection/ExerciseContext"


export default function Settings({setConfirm}) {
    const { response, settings, setSettings } = useContext(ExerciseContext);
    const languages = ["English", "French","Spanish","Chinese"]
    const levels = ["Kindergarten", "Elementary School","High School", "University"]
    const inputTypes = ["Theme","Course"]

    const [selectedLanguage, setSelectedLanguage] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("")
    const [input, setInput] = useState("")
    const [selectedInputType, setSelectedInputType] = useState("")

    const [settingsPage, setSettingsPage] = useState(0)

  return (
    <>
    <div className='Exercisesettings'>
        {settingsPage == 0?
            <>
            <h1>LANGUE</h1>
            <div className={'Exercisesettingschoices'}>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[0] = languages[0]
                    setSettings(NewSettings)
                    setSelectedLanguage(languages[0])
                }} className={(selectedLanguage == languages[0]?"Exercisesettingschoiceselected":"")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 72 72"><path fill="#1e50a0" d="M5 17h62v38H5z"/><path fill="#fff" d="M40 28.856V32h10.181L67 21.691V17h-7.654z"/><path fill="#d22f27" d="M67 17h-3.827L40 31.203V32h3.482L67 17.586z"/><path fill="#fff" d="M59.347 55H67v-4.692L50.182 40H40v3.143z"/><path fill="#d22f27" d="M67 55v-2.347L46.355 40h-4.787l24.474 15z"/><path fill="#fff" d="M32 43.144V40H21.819L5 50.309V55h7.654z"/><path fill="#d22f27" d="M5 55h3.827L32 40.797V40h-3.482L5 54.414z"/><path fill="#fff" d="M12.653 17H5v4.692L21.818 32H32v-3.143z"/><path fill="#d22f27" d="M5 17v2.347L25.646 32h4.786L5.958 17z"/><path fill="#fff" d="M5 31h62v10H5z"/><path fill="#fff" d="M31 17h10v38H31z"/><path fill="#d22f27" d="M5 33h62v6H5z"/><path fill="#d22f27" d="M33 17h6v38h-6z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 17h62v38H5z"/></svg>               
                    <p>English</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[0] = languages[1]
                    setSettings(NewSettings)
                    setSelectedLanguage(languages[1])
                    }} className={(selectedLanguage == languages[1]?"Exercisesettingschoiceselected":"")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 72 72"><path fill="#fff" d="M5 17h62v38H5z"/><path fill="#1e50a0" d="M5 17h21v38H5z"/><path fill="#d22f27" d="M46 17h21v38H46z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"/></svg>
                    <p>Français</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[0] = languages[2]
                    setSettings(NewSettings)
                    setSelectedLanguage(languages[2])
                    }} className={(selectedLanguage == languages[2]?"Exercisesettingschoiceselected":"")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 72 72"><path fill="#f1b31c" d="M5 17h62v38H5z"/><path fill="#d22f27" d="M23 33v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7M5 17h62v9H5zm0 29h62v9H5z"/><path fill="#f1b31c" d="M19 33h4v4h-4z"/><circle cx="19" cy="37" r="1.5" fill="#6a462f"/><path fill="none" stroke="#6a462f" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M27 33v9m-16-9v9m4-12a8.6 8.6 0 0 1 4-1m4 1a8.6 8.6 0 0 0-4-1m-4 4h8m0 0v7a2.006 2.006 0 0 1-2 2h-4a2.006 2.006 0 0 1-2-2v-7m-5 9h2m14 0h2"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"/></svg>
                    <p>Español</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[0] = languages[3]
                    setSettings(NewSettings)
                    setSelectedLanguage(languages[3])
                    }} className={(selectedLanguage == languages[3]?"Exercisesettingschoiceselected":"")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 72 72"><path fill="#d22f27" d="M5 17h62v38H5z"/><circle cx="24" cy="34" r="1.75" fill="#f1b31c"/><circle cx="24" cy="24" r="1.75" fill="#f1b31c"/><circle cx="28" cy="31" r="1.75" fill="#f1b31c"/><circle cx="28" cy="26" r="1.75" fill="#f1b31c"/><path fill="#f1b31c" stroke="#f1b31c" strokeLinecap="round" strokeLinejoin="round" d="m13.528 32.445l2.472-8l2.473 8L12 27.5h8z"/><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 17h62v38H5z"/></svg>
                    <p>中文</p>
                </div>
            </div>

            <div className={"Exercisesettingspassbutton" + (selectedLanguage?" Exercisesettingspassbuttonon":" Exercisesettingspassbuttonoff")} onClick={()=>{
                if(selectedLanguage)setSettingsPage(old => old+1)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><path fill="#2196f3" d="M17.1 5L14 8.1L29.9 24L14 39.9l3.1 3.1L36 24z"/></svg>
            </div>
            </>
        :""}

    {settingsPage == 1?
            <>
            <h1>NIVEAU</h1>
            <div className={'Exercisesettingschoices'}>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[1] = levels[0]
                    setSettings(NewSettings)
                    setSelectedLevel(levels[0])
                }} className={(selectedLevel == levels[0]?"Exercisesettingschoiceselected":"")}>
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M15.75 19.13c-.83 0-1.5-.84-1.5-1.88c0-1.03.67-1.87 1.5-1.87s1.5.84 1.5 1.87c0 1.04-.67 1.88-1.5 1.88M12 11.25c-1.24 0-2.25-.84-2.25-1.87c0-1.04 1.01-1.88 2.25-1.88s2.25.84 2.25 1.88c0 1.03-1.01 1.87-2.25 1.87m-3.75 7.88c-.83 0-1.5-.84-1.5-1.88c0-1.03.67-1.87 1.5-1.87s1.5.84 1.5 1.87c0 1.04-.67 1.88-1.5 1.88M12 8.25c.41 0 .75.34.75.75s-.34.75-.75.75s-.75-.34-.75-.75s.34-.75.75-.75M18.75 12c-.32 0-.63.07-.91.2c-.48-.61-1.13-1.13-1.91-1.53c.57-.8.91-1.77.91-2.82v-.06c1.09-.23 1.91-1.2 1.91-2.37c0-1.33-1.09-2.42-2.42-2.42c-.69 0-1.33.29-1.75.75a4.81 4.81 0 0 0-5.16 0C9 3.29 8.36 3 7.67 3C6.34 3 5.25 4.09 5.25 5.42c0 1.16.82 2.13 1.9 2.37v.06c0 1.05.35 2.03.91 2.82c-.77.4-1.42.92-1.9 1.53A2.24 2.24 0 0 0 3 14.25c0 1.25 1 2.25 2.25 2.25h.06c-.04.24-.06.5-.06.75c0 2.07 1.34 3.75 3 3.75c1.01 0 1.9-.63 2.45-1.59c.42.06.85.09 1.3.09s.88-.03 1.3-.09c.55.96 1.44 1.59 2.45 1.59c1.66 0 3-1.68 3-3.75c0-.25-.02-.51-.06-.75h.06c1.25 0 2.25-1 2.25-2.25S20 12 18.75 12"/></svg>                    <p>Elementaire</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[1] = levels[1]
                    setSettings(NewSettings)
                    setSelectedLevel(levels[1])
                    }} className={(selectedLevel == levels[1]?"Exercisesettingschoiceselected":"")}>
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 26 26"><path fill="black" d="M9.875 0a1 1 0 0 0-.406.156S8.204.952 6.844 1.813c-1.36.86-2.873 1.808-3.219 2a1 1 0 0 0-.063.03C2.306 4.618 2.045 5.884 2 6.594c-.003.033 0 .06 0 .095c-.011.266 0 .437 0 .437v13.063C2 22.087 4.213 23 6.313 23c.7 0 1.4-.113 2-.313c.4-.2.687-.6.687-1v-10.5c0-2.3.5-3.38 2-4.28c.4-.2 4.594-3.095 4.594-3.095c.2-.2.406-.606.406-.906v-.094c0-.4-.2-.706-.5-.906c-.3-.2-.7-.2-1 0c-.1.1-6.2 4.207-7.5 4.907c-1.3.8-2.513.993-2.813.593c-.093-.093-.174-.378-.187-.656v-.063c.001-.272.071-.784.625-1.125c.562-.313 1.957-1.204 3.313-2.062c.573-.363.644-.402 1.093-.688A1 1 0 0 0 11 2.5V1a1 1 0 0 0-1.125-1m8 3.5a1 1 0 0 0-.438.188s-5.034 3.387-5.906 3.968a1 1 0 0 0-.031.032c-.724.543-1.153 1.189-1.344 1.78A3.264 3.264 0 0 0 10 10.5v.313a1 1 0 0 0 0 .093V23c0 1.9 2.188 3 4.188 3c.9 0 1.712-.194 2.312-.594c1.2-.7 7-5.218 7-5.218c.3-.2.5-.482.5-.782v-13c0-.5-.194-.8-.594-1c-.3-.2-.793-.106-1.093.094c-1.6 1.2-5.907 4.588-6.907 5.188c-1.4.8-2.719 1-3.219.5c-.2-.2-.187-.388-.187-.688c.006-.172.025-.32.063-.438c.056-.174.17-.388.593-.718c.02-.016.01-.015.031-.031c.723-.483 2.934-1.99 4.376-2.97A1 1 0 0 0 19 6V4.5a1 1 0 0 0-1.125-1M22 10.813v2l-5 3.874v-2z"/></svg>                    <p>Collège</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[1] = levels[2]
                    setSettings(NewSettings)
                    setSelectedLevel(levels[2])
                    }} className={(selectedLevel == levels[2]?"Exercisesettingschoiceselected":"")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="m11.4 18.161l7.396-7.396a10.289 10.289 0 0 1-3.326-2.234a10.29 10.29 0 0 1-2.235-3.327L5.839 12.6c-.577.577-.866.866-1.114 1.184a6.556 6.556 0 0 0-.749 1.211c-.173.364-.302.752-.56 1.526l-1.362 4.083a1.06 1.06 0 0 0 1.342 1.342l4.083-1.362c.775-.258 1.162-.387 1.526-.56c.43-.205.836-.456 1.211-.749c.318-.248.607-.537 1.184-1.114m9.448-9.448a3.932 3.932 0 0 0-5.561-5.561l-.887.887l.038.111a8.754 8.754 0 0 0 2.092 3.32a8.754 8.754 0 0 0 3.431 2.13z"/></svg>                    <p>Lycée</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[1] = levels[3]
                    setSettings(NewSettings)
                    setSelectedLevel(levels[3])
                    }} className={(selectedLevel == levels[3]?"Exercisesettingschoiceselected":"")}>
<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"><path fill="black" d="M496 128v16a8 8 0 0 1-8 8h-24v12c0 6.627-5.373 12-12 12H60c-6.627 0-12-5.373-12-12v-12H24a8 8 0 0 1-8-8v-16a8 8 0 0 1 4.941-7.392l232-88a7.996 7.996 0 0 1 6.118 0l232 88A8 8 0 0 1 496 128m-24 304H40c-13.255 0-24 10.745-24 24v16a8 8 0 0 0 8 8h464a8 8 0 0 0 8-8v-16c0-13.255-10.745-24-24-24M96 192v192H60c-6.627 0-12 5.373-12 12v20h416v-20c0-6.627-5.373-12-12-12h-36V192h-64v192h-64V192h-64v192h-64V192z"/></svg>                    <p>Université/Pro</p>
                </div>
            </div>

            <div className={"Exercisesettingspassbutton" + (selectedLevel?" Exercisesettingspassbuttonon":" Exercisesettingspassbuttonoff")} onClick={()=>{
                if(selectedLevel)setSettingsPage(old => old+1)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><path fill="#2196f3" d="M17.1 5L14 8.1L29.9 24L14 39.9l3.1 3.1L36 24z"/></svg>
            </div>
            </>
        :""}

{settingsPage == 2?
            <>
            <h1>SUJET</h1>
            <div className={'Exercisesettingschoices'}>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[2] = inputTypes[0]
                    setSettings(NewSettings)
                    setSelectedInputType(inputTypes[0])
                }} className={(selectedInputType == inputTypes[0]?"Exercisesettingschoiceselected":"")+ (selectedInputType && selectedInputType !== inputTypes[0]?" Exercisesettingschoicenotselected":"")}>
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="black" d="M11 13.5v8H3v-8zM12 2l5.5 9h-11zm5.5 11c2.5 0 4.5 2 4.5 4.5S20 22 17.5 22S13 20 13 17.5s2-4.5 4.5-4.5"/></svg><p>Thème</p>
                </div>
                <div onClick={(e)=>{
                    let NewSettings = settings
                    NewSettings[2] = inputTypes[1]
                    setSettings(NewSettings)
                    setSelectedInputType(inputTypes[1])
                    }} className={(selectedInputType == inputTypes[1]?"Exercisesettingschoiceselected":"")+ (selectedInputType && selectedInputType !== inputTypes[1]?" Exercisesettingschoicenotselected":"")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 14 14"><path fill="black" fillRule="evenodd" d="M12.402 8.976H7.259a2.278 2.278 0 0 0-.193-4.547h-1.68A3.095 3.095 0 0 0 4.609 0h7.793a1.35 1.35 0 0 1 1.348 1.35v6.279c0 .744-.604 1.348-1.348 1.348ZM2.898 4.431a1.848 1.848 0 1 0 0-3.695a1.848 1.848 0 0 0 0 3.695m5.195 2.276c0-.568-.46-1.028-1.027-1.028H2.899a2.649 2.649 0 0 0-2.65 2.65v1.205c0 .532.432.963.964.963h.172l.282 2.61A1 1 0 0 0 2.66 14h.502a1 1 0 0 0 .99-.862l.753-5.404h2.16c.567 0 1.027-.46 1.027-1.027Z" clipRule="evenodd"/></svg><p>Cours</p>
                </div>
                {selectedInputType?
                    <form className="Exercisesettingsthemeinput">
                        <textarea placeholder='Veuillez rentrer votre Thème/Cours' value={input} onChange={(e)=>{setInput(e.target.value)}}/>
                    </form>
                :""}
            </div>
            <div className={"Exercisesettingsplaybutton" + (input?" Exercisesettingsplaybuttonon":" Exercisesettingsplaybuttonoff")} onClick={()=>{
                if(input){
                    setConfirm(true)
                    let NewSettings = settings
                    NewSettings[3] = input
                    setSettings(NewSettings)
                }
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643z" clipRule="evenodd"/></svg>
            </div>
            </>
        :""}
        
    </div>
    </>
  )
}
