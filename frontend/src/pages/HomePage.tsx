import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
// import { CSVLink } from 'react-csv';

const HomePage = () => {
  // Données factices (fake data)
  const fakeTransactions = [
    { id: 1, type: 'income', amount: 1000, description: 'Salaire', category: 'Revenus', date: '2025-01-15' },
    { id: 2, type: 'expense', amount: 200, description: 'Courses', category: 'Alimentation', date: '2025-01-16' },
    { id: 3, type: 'expense', amount: 50, description: 'Transport', category: 'Transport', date: '2025-01-17' },
    { id: 4, type: 'expense', amount: 150, description: 'Essence', category: 'Transport', date: '2025-01-18' },
    { id: 5, type: 'income', amount: 500, description: 'Freelance', category: 'Revenus', date: '2025-01-19' },
    { id: 6, type: 'expense', amount: 100, description: 'Restaurant', category: 'Alimentation', date: '2025-01-20' },
    { id: 7, type: 'expense', amount: 300, description: 'Loyer', category: 'Logement', date: '2025-01-21' },
  ];

  // Calcul des revenus, des dépenses et du solde
  const totalIncome = fakeTransactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = fakeTransactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const data = [
    { name: 'Revenus', value: totalIncome },
    { name: 'Dépenses', value: totalExpense },
  ];

  // Transactions récentes (affiche les 5 dernières transactions)
  const recentTransactions = fakeTransactions.slice(0, 5);

  // Logique pour exporter les transactions en CSV
  const csvData = fakeTransactions.map(transaction => ({
    Description: transaction.description,
    Montant: transaction.amount,
    Catégorie: transaction.category,
    Date: new Date(transaction.date).toLocaleDateString(),
    Type: transaction.type === 'income' ? 'Revenu' : 'Dépense'
  }));

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord financier
      </Typography>

      {/* Affichage du profil utilisateur */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Bonjour, <strong>John Doe</strong></Typography>
        <Button variant="contained" color="secondary" component={Link} to="/login">
          Se déconnecter
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Section Résumé financier */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Solde actuel</Typography>
            <Typography variant="h4" color="primary">
              {balance} €
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Revenus Totals</Typography>
            <Typography variant="h4" color="green">
              {totalIncome} €
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6">Dépenses Totales</Typography>
            <Typography variant="h4" color="red">
              {totalExpense} €
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Graphique de répartition des revenus et dépenses */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Répartition des Finances
            </Typography>
            <PieChart width={300} height={300}>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#82ca9d' : '#d97b7b'} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Transactions récentes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transactions Récentes
            </Typography>
            {recentTransactions.length > 0 ? (
              <Grid container spacing={2}>
                {recentTransactions.map((transaction) => (
                  <Grid item xs={12} sm={6} md={4} key={transaction.id}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{transaction.description}</Typography>
                      <Typography variant="body2" color={transaction.type === 'expense' ? 'red' : 'green'}>
                        {transaction.amount} €
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {new Date(transaction.date).toLocaleDateString()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body2">Aucune transaction trouvée.</Typography>
            )}
            <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/transactions">
              Voir toutes les transactions
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Exporter les rapports */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Exporter les rapports
        </Typography>
        {/* <CSVLink data={csvData} filename={"transactions.csv"}>
          <Button variant="contained" color="primary">
            Exporter les transactions
          </Button>
        </CSVLink> */}
      </Box>
    </Container>
  );
};

export default HomePage;
