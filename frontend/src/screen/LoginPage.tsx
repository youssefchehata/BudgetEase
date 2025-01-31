import { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../features/auth/components/LoginForm';
import { RootState } from '../app/store';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  // 🔹 Redirige vers le tableau de bord si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user) {
      navigate('/'); // Change '/dashboard' selon ta route cible
    }
  }, [user, navigate]);

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
