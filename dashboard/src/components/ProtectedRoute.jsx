// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const admin = localStorage.getItem("admin");
  
  return admin ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;