import React from 'react'

export default function PageTransitioner({changingPage}) {
  return (
    <div className={`pageTransitioner ${changingPage ? 'pageTransitionerSlideIn' : 'pageTransitionerSlideOut'}`}> 
    
    </div>
        
  )
}
