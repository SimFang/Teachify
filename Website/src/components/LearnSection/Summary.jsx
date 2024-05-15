import React, { useState, useContext } from 'react';
import MainContext from './CourseContext';

export default function Summary({}) {
  const response = useContext(MainContext)
  const exampleValue = [];
  response.forEach(theme => {
    exampleValue.push(theme.title)
  });  

  
  const [selectedItems, setSelectedItems] = useState([]);
  // handle scroll into view
  
 
  const ScrollIntoView = (id) => {
      const targetElement = document.getElementById(id);
  
      // Scroll the target element into view based on the provided ID
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
  };

  // handle the selection of summary 
  const handleItemClick = (item) => {
    ScrollIntoView(item)
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      } else {
        return [item];
      }
    });
  };

  // render the summary section depending on topics 
  return (
    <div id='summary' className=''>
      {exampleValue.map((el) => {
        const isSelected = selectedItems.includes(el);
        return (
          <div
            key={el}
            className={`${isSelected ? 'selectedSummary' : ''}`}
            onClick={() => {handleItemClick(el)}}
          >
            {el}
          </div>
        );
      })}
    </div>
  );
}
