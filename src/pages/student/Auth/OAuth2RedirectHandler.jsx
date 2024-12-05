import LoadingScreen from '@/components/LoadingScreen';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = ({ onLogin }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            onLogin(token);
            navigate('/');
        } else if (error) {
            navigate('/student-auth', { state: { error } });
        }
    }, [navigate, onLogin]);

    return (
      <LoadingScreen />
    );
};

export default OAuth2RedirectHandler;