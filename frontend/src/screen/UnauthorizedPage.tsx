// src/screen/UnauthorizedPage.tsx
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => (
  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <Typography variant="h4" gutterBottom>
      Accès non autorisé
    </Typography>
    <Typography variant="body1" paragraph>
      Vous n'avez pas les permissions nécessaires pour accéder à cette page.
    </Typography>
    <Button variant="contained" component={Link} to="/">
      Retour à l'accueil
    </Button>
  </div>
);

export default UnauthorizedPage;