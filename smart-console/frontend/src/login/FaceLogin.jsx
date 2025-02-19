import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, message, Typography } from "antd";
import { CameraOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import * as faceapi from 'face-api.js';
import axios from 'axios';
import styles from './FaceLogin.module.css';
import "./FaceLogin.css";
import { useNavigate } from "react-router-dom";

const FaceLogin = () => {
    const [loading, setLoading] = useState(false);
    const [facialFeatures, setFacialFeatures] = useState(null);
    const [initializing, setInitializing] = useState(false);
    const [scanning, setScanning] = useState(false);
    const [message, setMessage] = useState('Initializing...');
    const [error, setError] = useState('Blink twice to login');
    const [loginSuccess, setLoginSuccess] = useState(false);

    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
      };
    
    const videoHeight = 480;
    const videoWidth = 600;

    const videoRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            setInitializing(true);
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]).then(startVideo);
            console.log("Face models loaded");
        };
        loadModels();    
    }, []);

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                } else {
                    console.error("videoRef.current is undefined, retrying...");
                    setTimeout(startVideo, 500);  // Retry after 500ms
                }
            })
            .catch((err) => console.error("Error accessing webcam:", err));
    };

    const handleVideoOnPlay = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
    
        if (!video || !canvas) return;
    
        canvas.width = video.width;
        canvas.height = video.height;
    
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);
    
        setInterval(async () => {
            if (initializing) {
                setInitializing(false);
                setMessage("Ready to Scan")
                setScanning(true);
            }
    
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions();
    
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
    
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
            faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
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
        //console.log("Texture Variance:", variance);
    
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

        //console.log(`Left EAR: ${leftEAR}, Right EAR: ${rightEAR}, Average EAR: ${ear}`);

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
                const facialFeaturesJSON = JSON.stringify(facialFeatures);

                //console.log("Facial features:", facialFeatures);

                try {
                    setLoading(true); // Show spinner
                    //console.log("Sending request body:", facialFeaturesJSON);

                    const response = await axios.post('/api/auth/face_login',  
                        { facialFeatures: facialFeaturesJSON }, 
                        {
                            headers: { 'Content-Type': 'application/json' }
                        });

                    const { username, token, role } = response.data;
                    localStorage.setItem('username', username);
                    localStorage.setItem('token', token);
                    localStorage.setItem('role', role);
              
                    console.log('LocalStorage set:', { username, token, role });
              
                    setMessage('Login successful!');              
                    setLoginSuccess(true);
                    setError("");
                    setTimeout(() => setScanning(false), 2000); // Small delay to force re-render            
                    //alert("successful");

                    // Trigger a storage event to notify other tabs/windows
                    window.dispatchEvent(new Event('storage'));

                    // Redirect to home page
                    navigate('/');
                    
                } catch (error) {
                    console.error("Login failed:", error);
                    setError("Invalid credentials. Please try again.");
                    await new Promise(resolve => setTimeout(resolve, 2000));
                } finally {
                    setLoading(false); // Hide spinner
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


    const onCancel = () => {
        navigate('/login');
    }

    return (
<>
{/* Show loading spinner if data is being fetched */}
{loading ? (    
    <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
) : (            
        <div style={containerStyle}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '400px', // Increased width to accommodate two panes
              backgroundColor: '#fff',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden', // Ensure rounded corners for child elements
            }}
          >
  
          <div
            style={{
              flex: 1,
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <Typography.Title level={4} style={{ textAlign: "center", marginBottom: "15px" }}>
                Facial Recognition Login
            </Typography.Title>


            <div className={styles["display-flex"] + " " + styles["justify-content-center"] + " " + styles["position-relative"]}>
            <div className={styles["video-container"]}>
                <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                <canvas ref={canvasRef} className='position-absolute' />
                {!initializing && !loginSuccess && <div className="scanning-overlay"></div>}
            </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <span style={{ 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: initializing ? "black" : loginSuccess ? "blue" : "red", 
                    display: "inline-block", 
                    padding: "5px", 
                    textTransform: "uppercase" 
                }}>
                    {message}
                </span>                
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <span style={{ 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: "red", 
                    display: "inline-block", 
                    padding: "5px", 
                    textTransform: "uppercase" 
                }}>
                    {error}
                </span>                
            </div>            
            <Button key="login" type="primary" icon={<CameraOutlined />} onClick={handleLogin}>
                    Login
                </Button>,
            <Button key="back" onClick={onCancel} type="primary" danger icon={<ArrowLeftOutlined />}> 
                Cancel
            </Button>
            </div>
            </div>
            </div>
            </div>
    )}
    </>            
    );
};

export default FaceLogin;
