import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, message } from "antd";
import { CameraOutlined } from "@ant-design/icons";
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
            const MODEL_URL =  '/models';
    
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
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleSave}>
                    Save
                </Button>,
            ]}
            centered
        >
            <div className='display-flex justify-content-center'>
            <video ref={videoRef} autoPlay muted height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} />
                <canvas ref={canvasRef} className='position-absolute' />
            </div>
            <span>{initializing ? 'Initializing...' : 'Ready'}</span>


            <div style={{ textAlign: "center" }}>
                <Button
                    type="primary"
                    icon={<CameraOutlined />}
                    onClick={handleCapture}
                    style={{ marginBottom: "20px" }}
                    disabled={initializing}
                >
                    Capture Facial Features
                </Button>
            </div>
        </Modal>
    );
};

export default FaceRegister;