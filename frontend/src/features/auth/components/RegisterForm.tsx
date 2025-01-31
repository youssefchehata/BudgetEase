// src/features/auth/components/RegisterForm.tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box,  } from '@mui/material';

import { register } from '../authSlice';
import { useAppDispatch } from '../../../app/hooks';

const validationSchema = Yup.object({
  username: Yup.string().required('Requis'),
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().min(8, 'Minimum 8 caractères').required('Requis'),
  role: Yup.string().oneOf(['admin', 'user', 'client']).required('Requis')
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { 
      username: '', 
      email: '', 
      password: '', 
      role: 'user' 
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        id="username"
        name="username"
        label="Nom d'utilisateur"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Mot de passe"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        select
        id="role"
        name="role"
        label="Rôle"
        value={formik.values.role}
        onChange={formik.handleChange}
        SelectProps={{ native: true }}
        sx={{ mb: 2 }}
      >
        <option value="user">Utilisateur</option>
        <option value="admin">Administrateur</option>
        <option value="client">Client</option>
      </TextField>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        S'inscrire
      </Button>
    </Box>
  );
};

export default RegisterForm;