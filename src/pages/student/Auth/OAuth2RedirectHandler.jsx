import LoadingScreen from '@/components/LoadingScreen';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OAuth2RedirectHandler = ({ onLogin }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Get the error or token from URL parameters
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            onLogin(token);
            navigate('/', { replace: true });
        } else if (error) {
            // Navigate to login page with the decoded error message
            const decodedError = decodeURIComponent(error);
            navigate('/student-auth', { 
                replace: true,
                state: { 
                    error: decodedError,
                    fromOAuth: true // Flag to indicate this is from OAuth
                }
            });
        } else {
            // Handle unexpected state
            navigate('/student-auth', {
                replace: true,
                state: { 
                    error: 'Authentication failed. Please try again.',
                    fromOAuth: true
                }
            });
        }
    }, [navigate, onLogin, location]);

    return <LoadingScreen />;
};

export default OAuth2RedirectHandler;