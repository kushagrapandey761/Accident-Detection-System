import React, { useState, useEffect } from 'react';
import VideoFeed from './VideoFeed';
import Map from './Map';
import axios from 'axios';

function VideoAndMapComponent() {
 const [style, setStyle] = useState("#808080");
 const [videos, setVideos] = useState([]);
 const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

 useEffect(() => {
    const getVideos = async () => {
      try {
        const result = await axios.get('http://localhost:3001/api/videos');
        setVideos(result.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    getVideos();
 }, []); 

 const changeVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    setCurrentVideoIndex(nextIndex);
 };

 const currentVideo = videos[currentVideoIndex];

 return (
    <div>
      <VideoFeed videoLink={currentVideo?.video_link} />
      <Map location={currentVideo?.location_link} />
      <img onClick={changeVideo} className='arrow' style={{height:"100px",width:"50px"}} src="arrow-point-to-right.png"></img>
    </div>
 );
}

export default VideoAndMapComponent;
