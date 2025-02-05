import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import './Register.css';

const Register = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [initializing, setInitializing] = useState(false);

    const videoHeight = 480;
    const videoWidth = 640;

    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = process.env.PUBLIC_URL + '/models';
    
            setInitializing(true);
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]).then (startVideo);
            console.log("Face models loaded");
        };
        loadModels();    
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam:", err));
    };

    const handleVideoOnPlay = () => {
        setInterval(async () => {
            if (initializing) {
                setInitializing(false);
            }
            canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
            const displaySize = { width: videoWidth, height: videoHeight };
            faceapi.matchDimensions(canvasRef.current, displaySize);
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
            canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
            faceapi.draw.drawDetections(canvasRef.current, detections);
            faceapi.draw.drawFaceLandmarks(canvasRef.current, detections);
            faceapi.draw.drawFaceExpressions(canvasRef.current, detections);
        }, 100);
    };

    const handleCapture = async () => {
        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptor();

        if (detection) {
            const facialFeatures = Array.from(detection.descriptor);

            try {
                const response = await axios.post('http://localhost:8080/api/register', {
                    username,
                    password,
                    facialFeatures
                });
                alert("Face data saved successfully!");
            } catch (error) {
                alert("Failed to save face data.");
            }
        } else {
            alert("No face detected, please try again.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Register</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <div className='display-flex justify-content-center'>
                <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                    <canvas ref={canvasRef} className='position-absolute' />
                </div>
                <span>{initializing ? 'Initializing...' : 'Ready'}</span>

                <button onClick={handleCapture} disabled={initializing}>Capture</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Register;
