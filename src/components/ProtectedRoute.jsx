import { Navigate } from "react-router-dom";

// This assumes you store the token in localStorage
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    // If no token, redirect to login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, render the protected component
    return children;
};

export default ProtectedRoute;