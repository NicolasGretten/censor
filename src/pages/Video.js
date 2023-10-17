import React, {useEffect, useRef, useState} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import {useLocation} from "react-router-dom";
import SideBar from "../components/SideBar";

function Video(props) {
    const location = useLocation();
    console.log('location', location);
    const videoRef = useRef(null);
    const [predictions, setPredictions] = useState([]);
    const [height, setHeight] = useState(360);
    const [width, setWidth] = useState(640);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isInVideoWindow, setIsInVideoWindow] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (isZoomed) {
            const video = videoRef.current;
            const boundingBox = video.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            const zoomFactor = 1.2; // Facteur de zoom
            const zoomAreaDiameter = 20; // Diamètre de la zone à zoomer en pixels

            const offsetX = (x / boundingBox.width - 0.5) * zoomAreaDiameter;
            const offsetY = (y / boundingBox.height - 0.5) * zoomAreaDiameter;

            // video.style.transform = `scale(${zoomFactor}) translate(${offsetX}px, ${offsetY}px)`;
        }
        setMousePosition({ x: e.clientX, y: e.clientY });
    };


    const handleMouseEnter = () => {
        setIsInVideoWindow(true);
    };

    const handleMouseLeave = () => {
        setIsInVideoWindow(false);
        videoRef.current.style.transform = 'none'; // Réinitialise la transformation
    };

    useEffect(() => {

        videoRef.current.src = URL.createObjectURL(location.state.file);
        // async function loadAndDetect(videoElement) {
        //     const model = await cocossd.load();
        //
        //     videoElement.onloadedmetadata = () => {
        //         videoElement.play();
        //         detectObjects(model, videoElement);
        //     };
        // }
        //
        // async function detectObjects(model, videoElement) {
        //     const captureFrame = async () => {
        //         const image = tf.browser.fromPixels(videoElement);
        //         const predictions = await model.detect(image);
        //
        //         setPredictions(predictions);
        //
        //         requestAnimationFrame(captureFrame);
        //     };
        //
        //     captureFrame();
        // }
        //
        // loadAndDetect(videoRef.current);

    }, [location.state.file]);

    return (
        <>
            <SideBar
                isZoomed={isZoomed}
                setIsZoomed={(setIsZoomed)}
                height={height}
                setHeight={setHeight}
                width={width}
                setWidth={setWidth}
            ></SideBar>
            <div className="flex h-screen justify-center items-center relative isolate overflow-hidden bg-gray-900">
                <div
                    onMouseMove={handleMouseMove}
                >
                    <video
                        ref={videoRef}
                        playsInline
                        controls
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        height={height}
                        width={width}
                    />
                    <div
                        className={`${isInVideoWindow && isZoomed ? '' : 'hidden'}`}
                        style={{
                            position: 'absolute',
                            color: 'rgba(255,255,255)',
                            left: (mousePosition.x - 75) + 'px',
                            top: (mousePosition.y - 150) + 'px',
                            width: '150px',
                            height: '150px',
                            backgroundColor: 'transparent', /* Couleur de fond du cercle (blanc) */
                            border: '2px solid #000', /* Bordure de 2px de couleur noire */
                            borderRadius: '50%', /* Pour obtenir une forme de cercle */
                        }}
                    ></div>
                </div>
                {/*{predictions.map((prediction, index) => (*/}
                {/*    prediction.class === 'person' && (*/}
                {/*        <div*/}
                {/*            key={index}*/}
                {/*            style={{*/}
                {/*                position: 'absolute',*/}
                {/*                top: prediction.bbox[1] + window.scrollY, // Convert to absolute position*/}
                {/*                left: prediction.bbox[0] + window.scrollX, // Convert to absolute position*/}
                {/*                width: prediction.bbox[2],*/}
                {/*                height: prediction.bbox[3],*/}
                {/*                backdropFilter: 'blur(35px)',*/}
                {/*                background: 'rgba(0, 0, 0, 0.1)',*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            /!*{`${prediction.class} (${Math.round(prediction.score * 100)}%)`}*!/*/}
                {/*        </div>*/}
                {/*    )*/}
                {/*))}*/}
            </div>
        </>
    );
}

export default Video;