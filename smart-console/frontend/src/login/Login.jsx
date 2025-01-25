import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import companyLogo from '../assets/images/smartPOS.png'; // Import the logo

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

function Login() {
  const [pinCode, setPinCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = (value) => {
    if (value === 'backspace') {
      setPinCode((prev) => prev.slice(0, -1));
    } else if (value === 'enter') {
      handleLogin();
    } else if (value === 'clear') {
      setPinCode('');
    } else {
      setPinCode((prev) => (prev.length < 6 ? prev + value : prev));
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Sending login request...');
      const response = await axios.post('/api/auth/login', { pinCode });
      console.log('Login response:', response.data);

      const { username, token, role } = response.data;
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      console.log('LocalStorage set:', { username, token, role });

      setMessage('Login successful!');

      // Trigger a storage event to notify other tabs/windows
      window.dispatchEvent(new Event('storage'));

      // Redirect to home page
      navigate('/');

    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid credentials');
    }
  };

  return (
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
            width: '600px', // Increased width to accommodate two panes
            backgroundColor: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden', // Ensure rounded corners for child elements
          }}
        >
          {/* Left Pane - Logo and Version */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start', // Align content to the top
              alignItems: 'center',
              backgroundColor: '#007bff', // Blue background
              padding: '20px',
              color: '#fff', // White text
            }}
          >
            <img
              src={companyLogo}
              alt="SMARTConsole Logo"
              style={{ 
                width: '80%', // Logo takes up 80% of the left pane width
                height: '75%', // Logo occupies 3/4 of the left pane height
                objectFit: 'contain', // Ensure the logo scales properly
                marginBottom: '20px',
              }}
            />
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>SMARTConsole</h1>
            <p style={{ fontSize: '14px', color: '#e0e0e0' }}>Ver 1.0.0</p>
          </div>

          {/* Right Pane - Login Form */}
          <div
            style={{
              flex: 1,
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '20px' }}>
              <i className="fas fa-user" style={{ marginRight: '10px', color: '#007bff' }}></i>
              Login
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '15px 0' }}>
              {/* Numeric Keypad Layout */}
              {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  onClick={() => handleButtonClick(num.toString())}
                  style={{
                    padding: '10px',
                    fontSize: '14px',
                    width: '100%',
                    height: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => handleButtonClick('clear')}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                Clear
              </button>
              <button
                onClick={() => handleButtonClick('0')}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                0
              </button>
              <button
                onClick={() => handleButtonClick('backspace')}
                style={{
                  padding: '10px',
                  fontSize: '14px',
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
              >
                ←
              </button>
              <button
                onClick={() => handleButtonClick('enter')}
                style={{
                  gridColumn: '1 / -1',
                  padding: '10px',
                  fontSize: '14px',
                  width: '100%',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s, box-shadow 0.3s',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#005bb5')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
              >
                Enter
              </button>
            </div>
            <div>
              <input
                type="password"
                placeholder="PIN"
                value={pinCode}
                readOnly
                style={{
                  width: '150px',
                  padding: '5px',
                  marginBottom: '10px',
                  fontSize: '14px',
                  textAlign: 'center',
                  margin: '0 auto',
                  display: 'block',
                  border: '1px solid #ccc', // Ensure the border is visible
                  borderRadius: '4px', // Optional: Add rounded corners
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
                }}
              />
            </div>
            <p style={{ color: message === 'Invalid credentials' ? 'red' : 'black' }}>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;