// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('authToken');

  // If the token exists, render the element; otherwise, redirect to the login page
  return token ? element : <Navigate to="/LogIn" replace />;
};

export default ProtectedRoute;
