import React, { useState } from "react";
import SpeedDisplay from "./components/SpeedDisplay";
import CaptureButton from "./components/CaptureButton";
import CarsInvolvedButton from "./components/CarsInvolvedButton";
import VideoAndMapComponent from "./components/VideoAndMapComponent";
import Modal from "./components/Modal";

const App = () => {
  const [speed, setSpeed] = useState(0);
  const [impact, setImpact] = useState("");
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [video, setVideo] = useState(null);
  const [url, setUrl] = useState("");

  const handleClick = (isVisible) => {
    setModalIsVisible(isVisible);
  };

  const handleCapture = () => {
    console.log("Capture frame");
  };

  const handleDetect = () => {
    console.log("Detect number plate");
  };

  const handleCarsInvolved = () => {
    console.log("Display cars involved");
  };

  const handleVideoUpload = (event) => {
    const uploadedVideo = event.target.files[0];
    setVideo(uploadedVideo);
    console.log("Video uploaded:", uploadedVideo);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (video && url) {
      const formData = new FormData();
      formData.append("video", video);
      formData.append("locationUrl", url);

      try {
        const response = await fetch("http://localhost:3001/upload-video", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("Uploaded Video Details:", data.videoDetails);
        alert("Video and location uploaded successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.log("Video or location URL is missing.");
    }
  };
  const handleurlchange = (event) => {
    setUrl(event.target.value);
  };
  const onBackdropClick = () => {
    setModalIsVisible(false);
  };
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(success);
    let latitude = 0;
    let longitude = 0;
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      setUrl(latitude.toString() + "," + longitude.toString());
      console.log(url);
      // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
  }

  return (
    <div className="App">
      <h1>SafetyNet DashBoard</h1>
      <VideoAndMapComponent />
      <SpeedDisplay speed={speed} />
      <CaptureButton onCapture={handleCapture} />
      <CarsInvolvedButton onCarsInvolved={handleCarsInvolved} />
      <button onClick={() => setModalIsVisible(true)} className="upload-button">
        Upload accident video
      </button>
      {modalIsVisible && (
        <Modal onBackdropClick={onBackdropClick}>
          <h3>Upload Video</h3>
          <form onSubmit={handleSubmit}>
            <input
              required
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
            />
            <br />
            <div className="locationoptions">
              <div>
                <label htmlFor="landmark">Enter nearest landmark</label>
                <br />
                <input onChange={handleurlchange} name="landmark" type="text" />
              </div>
              <div className="dividerContainer">
                <div className="divider" />
                <p>OR</p>
                <div className="divider" />
              </div>
            </div>

            <button
              onClick={getCurrentLocation}
              className="currLocation-button"
              type="button"
            >
              Use Current Location
            </button>
            <button className="submit-button" type="submit">
              Submit
            </button>
          </form>
          <button
            className="close-button"
            onClick={() => setModalIsVisible(false)}
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default App;
