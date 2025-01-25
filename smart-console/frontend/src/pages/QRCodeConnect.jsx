import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Replace with your server's URL
    const serverUrl = 'http://192.168.68.118:8081';

    // Generate QR code and display it in the canvas
    QRCode.toCanvas(
      canvasRef.current,
      serverUrl,
      {
        width: 300, // Increase the size of the QR code (3x larger)
      },
      (error) => {
        if (error) {
          console.error('Error generating QR code:', error);
        }
      }
    );
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Scan to Connect to Local Server</h1>
      <canvas ref={canvasRef} style={styles.canvas} />
    </div>
  );
};

export default QRCodeGenerator;

// CSS styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Full viewport height
    textAlign: 'center',
    backgroundColor: '#f0f0f0', // Optional: Add a background color
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  canvas: {
    border: '1px solid #ccc', // Optional: Add a border around the QR code
  },
};