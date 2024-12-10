import React from 'react';

function VideoFeed({ videoLink }) {
 return (
    <div className="video-feed">
      <video style={{borderRadius:"30px"}} src={videoLink} width="1000" height="500" controls />
    </div>
 );
}

export default VideoFeed;
