import { Navigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const ProtectedRoute = ({ isAuthenticated, role, requiredRole, children }) => {
  // Show loading until the authentication state is resolved
  if (isAuthenticated === null) {
    return <LoadingScreen/>; // You can replace this with a more sophisticated loading screen if needed
  }

  // If not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/student-auth" replace />;
  }

  // If the user doesn't have the required role, redirect to home or another page
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If everything is fine, render the children (the protected route)
  return children;
};

export default ProtectedRoute;
