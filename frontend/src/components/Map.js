import React from "react";

function Map({ location }) {
  // Construct the Google Maps embed URL
  location = location || "";
  const hasText = (str) => /[a-zA-Z]/.test(str);
  if (hasText(location)) {
    location = location.replace(/\s+/g, "+");
  }
  return (
    <div className="map-placeholder">
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDld1a-h_ycXj5JgS1UByALCb8Hsu1mzZE&q=${location}`}
        width="350"
        height="500"
        style={{ border: "0", borderRadius: "30px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
