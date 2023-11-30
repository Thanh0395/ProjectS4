import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRoles = localStorage.getItem('roles').toLowerCase();
  const isAllow = allowedRoles.some(role => userRoles.includes(role));
  const [showToast, setShowToast] = useState(false);
  const [isTokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (!token) {
        setTokenValid(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
          setShowToast(true);
        }
      } catch (error) {
        setTokenValid(false);
      }
    };

    checkTokenValidity();
  }, [token]);

  if(!isTokenValid){
    return (
      <ToastContainer position="middle-center">
          <Toast show={showToast} onClose={() => setShowToast(false)} bg="warning">
            <Toast.Header>
              <strong className="me-auto">Token Expired</strong>
            </Toast.Header>
            <Toast.Body>Your session has expired. Please log in again.</Toast.Body>
          </Toast>
        </ToastContainer>
    );
  }
  // Check ROLE
  if (isTokenValid && isAllow) {
    return (
      <>
        {children}
      </>
    );
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default ProtectedRoute;
