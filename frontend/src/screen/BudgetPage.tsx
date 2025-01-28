import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Grid } from '@mui/material';

const BudgetPage = () => {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSetGoal = () => {
    // Logique pour ajouter un objectif
    console.log("Nouvel objectif:", goal, amount);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Système de Budgétisation
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Définir un Objectif
            </Typography>
            <TextField
              label="Nom de l'objectif"
              variant="outlined"
              fullWidth
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
            <TextField
              label="Montant de l'objectif"
              variant="outlined"
              fullWidth
              type="number"
              sx={{ mt: 2 }}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button variant="contained" sx={{ mt: 2 }} onClick={handleSetGoal}>
              Définir l'objectif
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BudgetPage;
