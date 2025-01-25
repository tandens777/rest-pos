import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import RootLayout from './layouts/RootLayout';
import AllApps from './pages/AllApps';
import Analytics from './pages/Analytics';
import Authentication from './pages/Authentication';
import Build from './pages/Build';
import Settings from './pages/Settings';
import Unit from './pages/Unit';
import Company from './pages/Company';
import QRCodeConnect from './pages/QRCodeConnect';

const App = () => {
  // Use state to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Effect to update isAuthenticated when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    // Listen for changes to localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  console.log('Rendering App.jsx');
  console.log('isAuthenticated:', isAuthenticated);

  return (
    <Routes>
      {/* Route for the Login page (no RootLayout) */}
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" /> : <Login />}
      />

      {/* If authenticated, render RootLayout with nested routes */}
      {isAuthenticated ? (
        <Route
          path="/*"
          element={
            <RootLayout>
              <Routes>
                {/*<Route path="/" element={<AllApps />} />*/}
                <Route path="/" element={<QRCodeConnect />} />
                <Route path="/company" element={<Company />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/unit-of-measure" element={<Unit />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/build/:bID" element={<Build />} />
                <Route path="/analytics/:aID" element={<Analytics />} />
              </Routes>
            </RootLayout>
          }
        />
      ) : (
        /* If not authenticated, redirect to Login */
        <Route path="*" element={<Navigate to="/login" />}
        />
      )}
    </Routes>
  );
};

export default App;