// src/components/ProtectedRoute.tsx
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { authService } from '../auth/authService';
import { useLocation, Navigate } from 'react-router';

interface ProtectedRouteProps extends PropsWithChildren {} 

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!user && !loading) {
      sessionStorage.setItem('redirectPath', location.pathname);
    }
  }, [user, loading, location]);

  // Don't render anything on server or during hydration
  if (!isClient) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow these routes without authentication
  if (location.pathname === '/callback' || location.pathname === '/login') {
    return <>{children}</>;
  }

  if (!user) {
    authService.login();
    return <div>Redirecting to login...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;