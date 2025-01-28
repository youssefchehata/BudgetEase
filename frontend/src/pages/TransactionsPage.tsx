import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Button, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const TransactionsPage = () => {
  const [transaction, setTransaction] = useState({ type: '', amount: '', description: '', category: '' });
  const [transactions, setTransactions] = useState([
    // Exemple de transactions initiales
    { id: 1, type: 'income', amount: 1000, description: 'Salaire', category: 'Revenus' },
    { id: 2, type: 'expense', amount: 200, description: 'Courses', category: 'Alimentation' },
  ]);

  const handleAddTransaction = () => {
    setTransactions([
      ...transactions,
      { ...transaction, id: transactions.length + 1 }
    ]);
    setTransaction({ type: '', amount: '', description: '', category: '' }); // Reset form
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Gestion des Transactions
      </Typography>

      <Grid container spacing={3}>
        {/* Formulaire pour ajouter une transaction */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Ajouter une Transaction
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={transaction.type}
                    onChange={(e) => setTransaction({ ...transaction, type: e.target.value })}
                  >
                    <MenuItem value="income">Revenus</MenuItem>
                    <MenuItem value="expense">Dépenses</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Montant"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={transaction.amount}
                  onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  value={transaction.description}
                  onChange={(e) => setTransaction({ ...transaction, description: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Catégorie"
                  variant="outlined"
                  fullWidth
                  value={transaction.category}
                  onChange={(e) => setTransaction({ ...transaction, category: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAddTransaction}>
                  Ajouter Transaction
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Liste des transactions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Liste des Transactions
            </Typography>
            {transactions.map((t) => (
              <Paper key={t.id} sx={{ p: 2, mb: 2 }}>
                <Typography variant="body1">{t.description}</Typography>
                <Typography variant="body2" color={t.type === 'expense' ? 'red' : 'green'}>
                  {t.amount} €
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Catégorie: {t.category}
                </Typography>
              </Paper>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransactionsPage;
