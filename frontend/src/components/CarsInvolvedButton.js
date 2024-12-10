// src/components/CarsInvolvedButton.js
import React from 'react';

const CarsInvolvedButton = ({ onDetect }) => {
  const [style,setstyle] = React.useState("#EAD8C0");
   const [text,settext] = React.useState("#a86b10");
   function handleMouseOut()
   {
      setstyle("#EAD8C0");
      settext("#a86b10");
   }
   function handleMouseOver()
   {
      setstyle("#D1BB9E");
      settext("#a86b10");
   }
 return (
   <button className="cars-involved-button" style={{backgroundColor: style,color:text}} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={onDetect}>
     Detect Cars Involved
   </button>
 );
};

export default CarsInvolvedButton;
