// src/components/Auth/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
  allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;