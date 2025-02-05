import React, { useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';

function App() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div>
            <h1>Facial Auth</h1>
            <button onClick={() => setIsRegisterOpen(true)}>Register</button>
            <button onClick={() => setIsLoginOpen(true)}>Login</button>

            {isRegisterOpen && <Register closeModal={() => setIsRegisterOpen(false)} />}
            {isLoginOpen && <Login closeModal={() => setIsLoginOpen(false)} />}
        </div>
    );
}

export default App;
