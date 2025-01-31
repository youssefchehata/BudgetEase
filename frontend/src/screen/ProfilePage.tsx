// src/pages/ProfilePage.tsx
import { useFormik } from 'formik';
import { Button, TextField, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateProfile } from '../features/auth/authSlice';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user?.username || '',
      email: user?.email || ''
    },
    onSubmit: (values) => {
      if (user) {
        dispatch(updateProfile({ ...user, ...values }));
      }
    }
  });

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profil Utilisateur
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Nom d'utilisateur"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          margin="normal"
        />
        <Button 
          type="submit" 
          variant="contained" 
          sx={{ mt: 2 }}
          disabled={!formik.dirty}
        >
          Mettre à jour
        </Button>
      </form>
    </Box>
  );
};

export default ProfilePage;