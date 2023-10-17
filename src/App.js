// import React, { useEffect, useRef, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import * as cocossd from '@tensorflow-models/coco-ssd';
//
// function App() {
//   const videoRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const [predictions, setPredictions] = useState([]);
//
//   useEffect(() => {
//     async function loadAndDetect(videoElement) {
//       const model = await cocossd.load();
//
//       videoElement.onloadedmetadata = () => {
//         videoElement.play();
//         detectObjects(model, videoElement);
//       };
//     }
//
//     async function detectObjects(model, videoElement) {
//       const captureFrame = async () => {
//         const image = tf.browser.fromPixels(videoElement);
//         const predictions = await model.detect(image);
//
//         setPredictions(predictions);
//
//         requestAnimationFrame(captureFrame);
//       };
//
//       captureFrame();
//     }
//
//     loadAndDetect(videoRef.current);
//
//   }, []);
//
//   // Function to handle video upload
//   const handleFileUpload = () => {
//     const file = fileInputRef.current.files[0];
//     const videoUrl = URL.createObjectURL(file);
//     videoRef.current.src = videoUrl;
//   };
//
//   return (
//       <div className="bg-gray-300 h-screen relative">
//         <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             controls
//         />
//         {predictions.map((prediction, index) => (
//             prediction.class === 'person' && (
//                 <div
//                     key={index}
//                     style={{
//                       position: 'absolute',
//                       top: prediction.bbox[1] + window.scrollY, // Convert to absolute position
//                       left: prediction.bbox[0] + window.scrollX, // Convert to absolute position
//                       width: prediction.bbox[2],
//                       height: prediction.bbox[3],
//                       backdropFilter: 'blur(35px)',
//                       background: 'rgba(0, 0, 0, 0.1)',
//                     }}
//                 >
//                   {/*{`${prediction.class} (${Math.round(prediction.score * 100)}%)`}*/}
//                 </div>
//             )
//         ))}
//         <input
//             type="file"
//             accept="video/*"
//             ref={fileInputRef}
//             onChange={handleFileUpload}
//         />
//       </div>
//   );
// }
//
// export default App;



// import React, { useEffect, useRef } from "react";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";
//
// function App() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//
//   useEffect(() => {
//     const setupCamera = async () => {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         try {
//           const stream = await navigator.mediaDevices.getUserMedia({
//             audio: false,
//             video: {
//               facingMode: "user",
//             },
//           });
//           videoRef.current.srcObject = stream;
//           await new Promise((resolve) => {
//             videoRef.current.onloadedmetadata = () => {
//               resolve();
//             };
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       }
//     };
//
//     const detectFrame = async (model) => {
//       try {
//         const predictions = await model.detect(videoRef.current);
//         renderPredictions(predictions);
//         requestAnimationFrame(() => detectFrame(model));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//
//     const renderPredictions = (predictions) => {
//       const ctx = canvasRef.current.getContext("2d");
//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
//       const font = "16px sans-serif";
//       ctx.font = font;
//       ctx.textBaseline = "top";
//       predictions.forEach((prediction) => {
//         const x = prediction.bbox[0];
//         const y = prediction.bbox[1];
//         const width = prediction.bbox[2];
//         const height = prediction.bbox[3];
//         ctx.strokeStyle = "#00FFFF";
//         ctx.lineWidth = 4;
//         ctx.strokeRect(x, y, width, height);
//         ctx.fillStyle = "#00FFFF";
//         const textWidth = ctx.measureText(prediction.class).width;
//         const textHeight = parseInt(font, 10);
//         ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
//       });
//
//       predictions.forEach((prediction) => {
//         const x = prediction.bbox[0];
//         const y = prediction.bbox[1];
//         ctx.fillStyle = "#000000";
//         ctx.fillText(prediction.class, x, y);
//       });
//     };
//
//     const runDetection = async () => {
//       const model = await cocoSsd.load();
//       if (videoRef.current) {
//         await detectFrame(model);
//       }
//     };
//
//     setupCamera();
//     runDetection();
//   }, []);
//
//   return (
//       <div>
//         <video
//             className="size"
//             autoPlay
//             playsInline
//             muted
//             ref={videoRef}
//             width="600"
//             height="500"
//         />
//         <canvas className="size" ref={canvasRef} width="600" height="500" />
//       </div>
//   );
// }
//
// export default App;

// import React, {useEffect, useRef, useState} from "react";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import "@tensorflow/tfjs";
//
// function App() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const inputRef = useRef(null);
//   const [input, setInput] = useState(false)
//
//   useEffect(() => {
//     const runDetection = async () => {
//       const model = await cocoSsd.load();
//       const video = videoRef.current;
//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");
//
//       const detectFrame = async () => {
//         try {
//           const predictions = await model.detect(video);
//           renderPredictions(predictions);
//           requestAnimationFrame(detectFrame);
//         } catch (error) {
//           console.error(error);
//         }
//       };
//
//       const renderPredictions = (predictions) => {
//         const videoWidth = video.videoWidth;
//         const videoHeight = video.videoHeight;
//         canvas.width = videoWidth;
//         canvas.height = videoHeight;
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//
//         predictions.forEach((prediction) => {
//           if (prediction.class === "person") {
//             console.log(prediction.score);
//             const [x, y, width, height] = prediction.bbox;
//             ctx.rect(x, y, width, height);
//             ctx.fillStyle = "rgba(0,0,0, 1)";
//             ctx.fill();
//
//             const scaledX = x * videoWidth;
//             const scaledY = y * videoHeight;
//             const scaledWidth = width * videoWidth;
//             const scaledHeight = height * videoHeight;
//
//             ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);
//           }
//         });
//       };
//
//       detectFrame();
//     };
//
//     runDetection();
//   }, [input]);
//
//   const handleVideoInput = (e) => {
//     const selectedVideo = e.target.files[0];
//     if (selectedVideo) {
//       videoRef.current.src = URL.createObjectURL(selectedVideo);
//       videoRef.current.play();
//     }
//     setInput(true)
//   };
//
//   return (
//       <div>
//         <input type="file" accept="video/*" onChange={handleVideoInput} ref={inputRef} />
//         <video
//             className="size"
//             autoPlay
//             playsInline
//             ref={videoRef}
//             muted
//             width="600"
//             height="500"
//             controls
//         />
//         <canvas className="size" ref={canvasRef} width="600" height="500"/>
//       </div>
//   );
// }
//
// export default App;



import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Video from "./pages/Video";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
      <>
        <Router>
            <NavBar></NavBar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route path="/video" element={<Video />} />
              <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />}/>
          </Routes>
        </Router>
      </>
  );
}

export default App;
