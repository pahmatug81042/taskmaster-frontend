import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Wait until AuthContext finishes checking cookies
  if (loading) {
    return <p>Loading authentication...</p>;
  }

  // If no valid user after loading, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the protected component
  return children;
};

export default ProtectedRoute;