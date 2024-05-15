
import React, {setTimeout} from 'react'
import {Icon} from "@iconify/react"
import { Link } from 'react-router-dom'

function Mainpage(){

 


    return (
        <>
            <div id='introsection' className='spaced'>
            <h1>Apprendre, Appliquer, <span className='blue7'>Assimiler</span></h1>
            
                <Link to={"/train"}><div >
                <div className="octagonTag">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em"  height="1em" viewBox="0 0 24 24">
                    <path fill="white" d="m16.7 15.5l3.8-3.25l.65.05q.425.05.663.35t.237.65q0 .2-.075.4t-.275.35l-2.6 2.275l.775 3.375q.025.05.025.113v.112q0 .425-.3.713t-.7.287q-.125 0-.262-.038t-.263-.112l-.525-.325zm-2.35-7.3L13.3 5.75l.225-.55q.125-.3.387-.463t.538-.162q.275 0 .538.15t.387.45l1.375 3.25zm-9.5 11.5l1.1-4.725L2.275 11.8q-.2-.15-.262-.35t-.063-.4q0-.35.238-.65t.662-.35l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15q.275 0 .538.15t.387.45l1.875 4.45l4.85.425q.425.05.663.35t.237.65q0 .2-.062.4t-.263.35l-3.675 3.175l1.1 4.725q.025.075.025.225q0 .425-.3.713t-.7.287q-.075 0-.525-.15l-4.15-2.5l-4.15 2.5q-.125.075-.262.113t-.263.037q-.45 0-.775-.363t-.2-.862" />
                    </svg>
                </div>
                <ul>
                </ul>
                </div>
                </Link>
                
            </div>
            <div id="videointrosection">
                <div>
                    <h1>Apprendre de la meilleur des manières avec l’IA</h1>
                    <p>Votre assistant personnel en direct, pour réaliser un apprentissage <strong>personalisé</strong> et <strong>engageant</strong></p>

                </div>
                    <video id="videoPlayer" controls>
                        <source src="./src/assets/VideoForWebsite.mp4" type="video/mp4" />
                    </video>
                    {/* Add additional <source> elements for other video formats if needed */}
                   
            </div>
            
        </>
    )
}

export default Mainpage
