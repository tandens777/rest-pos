import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, message } from "antd";
import { CameraOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import * as faceapi from 'face-api.js';
import './FaceRegister.css';

const FaceRegister = ({ visible, onCancel, onSave }) => {
    const [facialFeatures, setFacialFeatures] = useState(null);
    const [initializing, setInitializing] = useState(false);

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
                videoRef.current.srcObject = stream;
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
    
    const handleCapture = async () => {
        const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptor();

        if (detection) {
            const capturedFeatures = Array.from(detection.descriptor);
            setFacialFeatures(capturedFeatures);
            message.success("Facial features captured successfully!");
            handleSave();
        } else {
            message.error("No face detected, please try again.");
        }
    };

    const handleSave = () => {
        if (facialFeatures) {
            onSave(JSON.stringify(facialFeatures));
            onCancel();
        } else {
            message.error("No facial features captured!");
        }
    };

    return (
        <Modal
            title="Register Facial Recognition"
            visible={visible}
            onCancel={onCancel}
            centered
            footer={[
                <Button key="capture" type="primary" icon={<CameraOutlined />} onClick={handleCapture}>
                    Capture Facial Features
                </Button>,
                <Button key="back" onClick={onCancel} type="primary" danger icon={<ArrowLeftOutlined />}> 
                    Cancel
                </Button>
            ]}
            >
            <div className='display-flex justify-content-center position-relative'>
                <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                <canvas ref={canvasRef} className='position-absolute' />
            </div>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <span style={{ 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: initializing ? "black" : "red", 
                    display: "inline-block", 
                    padding: "10px", 
                    textTransform: "uppercase" 
                }}>
                    {initializing ? "Initializing..." : "Ready"}
                </span>
            </div>
        </Modal>
    );
};

export default FaceRegister;
