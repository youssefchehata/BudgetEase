// src/features/auth/components/LoginForm.tsx
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, Box, } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { login } from '../authSlice';

const validationSchema = Yup.object({
  email: Yup.string().email('Email invalide').required('Requis'),
  password: Yup.string().required('Requis')
});

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    console.log(values);
    }
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
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
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Se connecter
      </Button>
    </Box>
  );
};

export default LoginForm;