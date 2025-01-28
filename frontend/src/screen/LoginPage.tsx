import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Envoyer les données de connexion au backend
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        navigate('/home'); // Redirige vers la page d'accueil après la connexion
      } else {
        alert('Identifiants incorrects');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 3, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Connexion
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mot de passe"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Se connecter
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage
