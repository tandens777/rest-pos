import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './login/Login';
import FaceLogin from './login/FaceLogin';
import RootLayout from './layouts/RootLayout';
import AllApps from './pages/AllApps';
import Analytics from './pages/Analytics';
import Authentication from './pages/Authentication';
import Build from './pages/Build';
import Settings from './pages/Settings';
import Unit from './pages/Unit';
import Company from './pages/Company';
import QRCodeConnect from './pages/QRCodeConnect';
import Floor from './pages/Floor';
import DeliveryApp from './pages/DeliveryApp';
import Employee from './pages/Employee';
import ChangePin from './pages/ChangePin';
import FoodStation from './pages/FoodStation';
import ItemGroup from './pages/ItemGroup';
import ItemTag from './pages/ItemTag';
import FoodMenu from './pages/FoodMenu';
import Ingredients from './pages/Ingredients';
import PaymentMethod from './pages/PaymentMethod';
import SurchargeDiscount from './pages/SurchargeDiscount';
import StorageLocation from './pages/StorageLocation';

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
      {/* Route for the Login page (no RootLayout) */}
      <Route
        path="/face_login"
        element={isAuthenticated ? <Navigate to="/" /> : <FaceLogin />}
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
                <Route path="/employees" element={<Employee />} />
                <Route path="/authentication" element={<Authentication />} />
                <Route path="/unit-of-measure" element={<Unit />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/floors" element={<Floor />} />
                <Route path="/food-delivery-apps" element={<DeliveryApp />} />
                <Route path="/change-pin" element={<ChangePin />} />
                <Route path="/payment-method" element={<PaymentMethod />} />
                <Route path="/surcharge-discounts" element={<SurchargeDiscount />} />
                <Route path="/build/:bID" element={<Build />} />
                <Route path="/analytics/:aID" element={<Analytics />} />
                <Route path="/food-stations" element={<FoodStation />} />
                <Route path="/item-groups" element={<ItemGroup />} />
                <Route path="/item-tags" element={<ItemTag />} />
                <Route path="/food-menus" element={<FoodMenu />} />
                <Route path="/ingredients" element={<Ingredients />} />
                <Route path="/storage-locations" element={<StorageLocation />} />
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