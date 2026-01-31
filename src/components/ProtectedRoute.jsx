import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ 
  children, 
  adminOnly = false,
  fallbackPath = '/login',
  forbiddenPath = '/unauthorized'
}) => {
  const location = useLocation();
  const { isAuthenticated, user } = useSelector(state => state.auth || {});
  
  // Handle unauthenticated access
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }
  
  // Handle admin-only route protection
  if (adminOnly && user?.role !== 'admin') {
    console.warn(`Unauthorized access attempt to admin route: ${location.pathname}`);
    return <Navigate to={forbiddenPath} replace />;
  }
  
  return children;
};

export default ProtectedRoute;