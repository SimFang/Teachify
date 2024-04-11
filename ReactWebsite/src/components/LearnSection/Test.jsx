import React, { useEffect, useState } from 'react';

function App() {
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(()=>{
    console.log(selectedWord)
  },[selectedWord])

  const handleSelect = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText !== '') {
      setSelectedWord(selectedText);
    } else {
      setSelectedWord(null);
    }
  };

  const handleClick = () => {
    if (selectedWord) {
      // Perform actions when a word is selected
      console.log(`${selectedWord} selected`);
    }
  };

  return (
    <div className="App" onSelect={handleSelect}>
      <p onClick={handleClick}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  );
}

export default App;