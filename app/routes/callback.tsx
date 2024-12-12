import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { authService } from '../auth/authService';

const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleCallback = async () => {
      try {
        if (location.search.includes('code=')) {
          const user = await authService.handleCallback();
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
            sessionStorage.removeItem('redirectPath');
            navigate(redirectPath);
          }
        }
      } catch (error) {
        console.error('Callback handling failed:', error);
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, location]);

  return <div>Processing authentication...</div>;
};

export default AuthCallback;