import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    // Check if user is authenticated
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If all checks pass, render the children (protected routes)
    return <Outlet />;
};

export default ProtectedRoute;
