// src/components/CaptureButton.js
import React from 'react';

const CaptureButton = ({ onCapture }) => {
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
 const handleCapture = () => {

    const video = document.querySelector('.video-feed video');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png');
    
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'captured_frame.png';
    link.click();
 };

 return (
    <button className="capture-button" style={{backgroundColor: style,color:text}} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={handleCapture}>
      Capture Frame
    </button>
 );
};

export default CaptureButton;
