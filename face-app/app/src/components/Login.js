import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import './Login.css';

const Login = ({ closeModal }) => {
    const [username, setUsername] = useState('');
    const [initializing, setInitializing] = useState(true);
    const [scanning, setScanning] = useState(false);
    const [message, setMessage] = useState('Initializing...');
    const [error, setError] = useState('Blink twice to login...');
    const [loginSuccess, setLoginSuccess] = useState(false);
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
                setMessage("Ready to Scan")
                setScanning(true);
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

    const detectTexture = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);
        const imageData = ctx.getImageData(0, 0, videoWidth, videoHeight);
        const pixels = imageData.data;
    
        let laplacianSum = 0;
        let totalPixels = pixels.length / 4; // RGBA format
    
        for (let i = 0; i < pixels.length - 4; i += 4) {
            let gray = 0.299 * pixels[i] + 0.587 * pixels[i + 1] + 0.114 * pixels[i + 2];
            let nextGray = 0.299 * pixels[i + 4] + 0.587 * pixels[i + 5] + 0.114 * pixels[i + 6];
            laplacianSum += Math.pow(gray - nextGray, 2);
        }
    
        let variance = laplacianSum / totalPixels;
        console.log("Texture Variance:", variance);
    
        return variance < 100; // Threshold for detecting real texture
    };

    const checkLiveness = async () => {
        let initialDetection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
    
        if (!initialDetection) {
            setError("No face detected! Please try again.");
            return false;
        }
    
        const initialX = initialDetection.landmarks._positions[0].x;
    
        setError("Please turn your head slightly to the right.");
    
        let secondDetection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
    
        if (!secondDetection) {
            setError("Face lost! Please stay in frame.");
            return false;
        }
    
        const secondX = secondDetection.landmarks._positions[0].x;
    
        if (Math.abs(secondX - initialX) < 10) { // Require a significant horizontal movement
            setError("Liveness test failed! Please turn your head.");
            return false;
        }
    
        return true; // Passed liveness check
    };

    const detectBlinking = async () => {
        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor();
    
        if (!detection) return false; // No face detected
    
        const landmarks = detection.landmarks;
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
    
        const eyeAspectRatio = (eye) => {
            const vertical1 = Math.hypot(eye[1].y - eye[5].y, eye[1].x - eye[5].x);
            const vertical2 = Math.hypot(eye[2].y - eye[4].y, eye[2].x - eye[4].x);
            const horizontal = Math.hypot(eye[0].y - eye[3].y, eye[0].x - eye[3].x);
            return (vertical1 + vertical2) / (2.0 * horizontal);
        };
    
        const leftEAR = eyeAspectRatio(leftEye);
        const rightEAR = eyeAspectRatio(rightEye);
        const ear = (leftEAR + rightEAR) / 2.0;
    
        // EAR threshold for blinking
        const EAR_THRESHOLD = 0.28;

        console.log(`Left EAR: ${leftEAR}, Right EAR: ${rightEAR}, Average EAR: ${ear}`);

        return ear < EAR_THRESHOLD; // If EAR is low, the user blinked
    };
    
    const checkBlinkLiveness = async () => {
        let blinkCount = 0;
        const REQUIRED_BLINKS = 2; // Number of blinks required to pass the liveness test
        const MAX_ATTEMPTS = 20; // Maximum number of attempts to detect blinks
        const DELAY_BETWEEN_CHECKS = 200; // Delay between each check in milliseconds
    
        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            if (await detectBlinking()) {
                blinkCount++;
                if (blinkCount >= REQUIRED_BLINKS) {
                    return true; // User blinked enough times -> real human
                }
            }
            await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_CHECKS)); // Wait before checking again
        }
    
//        setError("Liveness test failed! Please blink to prove you are real.");
//        await new Promise(resolve => setTimeout(resolve, 1500));
        return false;
    };        

    const handleLogin = async () => {

        while (!loginSuccess) {
            console.log("calling handleLogin...");

            if (!detectTexture()) {
                console.log("Spoofing detected! Possible screen replay attack.");
                setError("Spoofing detected! Please use a real face.");
                await new Promise(resolve => setTimeout(resolve, 2000));
                continue;
            }            

            if (!(await checkBlinkLiveness())) {
                console.log("Liveness check failed. Retrying...");
                setError("Liveness test failed! Please blink to prove you are real.");
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retrying
                continue; // Skip the rest of the loop and retry
            }

            const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withFaceDescriptor();

            if (detection) {
                const facialFeatures = Array.from(detection.descriptor);

                console.log("Facial features:", facialFeatures);

                try {
                    const response = await axios.post('http://localhost:8080/api/login', {
                        facialFeatures
                    }, {
                        headers: { 'Content-Type': 'application/json' }
                    });

                    console.log("Login successful:", response.data);
                    setError("Login successful!" + response.data)
                    setLoginSuccess(true);
                    setTimeout(() => setScanning(false), 2000); // Small delay to force re-render            
                    alert("Login successful!" + response.data);
                    return;
                    
                } catch (error) {
                    console.error("Login failed:", error);
                    setError("Invalid credentials. Please try again.");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    }
            } else {
                console.error("No face detected");
                setError("No face detected, please try again.");
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }
    };

    useEffect(() => {
        if (!initializing && scanning && !loginSuccess) {
            handleLogin(); // Run login automatically once models are loaded
        }
    }, [initializing, scanning]); // Runs whenever `initializing` changes

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Login</h2>
                <div className="video-container">
                <div className='display-flex justify-content-center position-relative'>
                <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                    <canvas ref={canvasRef} className='position-absolute' />
                    {!initializing && !loginSuccess && <div className="scanning-overlay"></div>}
                </div>
                </div>
                <div><span>{message}</span></div>
                <div><span>{error}</span></div>
                <button onClick={handleLogin} disabled={initializing}>Login</button>
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default Login;
