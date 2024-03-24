import { useState, useEffect} from 'react';
import React from 'react'
import { ColorRing } from 'react-loader-spinner'
export default function Loading({text}) {
  const quotes = [
    ["The only way to do great work is to love what you do.", "Steve Jobs"],
    ["Success is not final, failure is not fatal: It is the courage to continue that counts.", "Winston Churchill"],
    ["Education is the most powerful weapon which you can use to change the world.", "Nelson Mandela"],
    ["Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.", "Steve Jobs"],
    ["Don't watch the clock; do what it does. Keep going.", "Sam Levenson"],
    ["The only place where success comes before work is in the dictionary.", "Vidal Sassoon"],
    ["The expert in everything was once a beginner.", "Helen Hayes"],
    ["Success is stumbling from failure to failure with no loss of enthusiasm.", "Winston Churchill"],
    ["Education is not the filling of a pail, but the lighting of a fire.", "William Butler Yeats"],
    ["The only limit to our realization of tomorrow will be our doubts of today.", "Franklin D. Roosevelt"],
    ["Opportunities don't happen. You create them.", "Chris Grosser"],
    ["The beautiful thing about learning is that no one can take it away from you.", "B.B. King"],
    ["Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", "Roy T. Bennett"],
    ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ["Success is not just about making money. It's about making a difference.", "Unknown"],
    ["Believe you can and you're halfway there.", "Theodore Roosevelt"]
]

  useEffect(() => {
    // Update the quote every 7 seconds
    const intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }, 9000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [quotes]);
  const [quote, setQuote] = useState(quotes[0])

  return (
    <div id='loading'>
      <div className="img"></div>
      <div className='loadingText'>
      <h1>{text}</h1>
      <div className="point"></div>
      <div className="point"></div>
      <div className="point"></div>
      </div>
      <p className='quote'>{quote[0]}</p>
      <strong>{quote[1]}</strong>
    </div>
  )
}

