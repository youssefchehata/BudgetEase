// src/pages/RegisterPage.tsx
import { Box, Typography } from '@mui/material';
import RegisterForm from '../features/auth/components/RegisterForm';

const RegisterPage = () => {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inscription
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;