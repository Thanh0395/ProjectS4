import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");
  if (token && allowedRoles.includes(userRole)) {
    return children
  } else {
    return <Navigate to="/authorized" />;
  }
};

export default ProtectedRoute;

// //Use this component to cover the route you want to check user's role
// <ProtectedRoute allowedRoles={['admin', 'user']}>
// </ProtectedRoute>