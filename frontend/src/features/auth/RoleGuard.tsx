// src/components/Auth/RoleGuard.tsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import Loading from '../../components/UI/Loading';


interface Props {
  allowedRoles: string[];
}

const RoleGuard = ({ allowedRoles }: Props) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <Loading fullScreen />; // Ajout d'un état de chargement
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />; // Utilisation de Outlet au lieu de children
};

export default RoleGuard;