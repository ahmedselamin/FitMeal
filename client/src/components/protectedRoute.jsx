import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to landing/login page if not authenticated
        return (
            <Navigate to="/" />
        );
    }

    return children;
};

export default ProtectedRoute;