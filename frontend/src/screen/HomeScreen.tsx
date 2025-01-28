// src/components/HomeScreen.tsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {
  selectTotalIncome,
  selectTotalExpense,
  selectBalance,
  selectRecentTransactions
} from '../features/transactions/selectors';
import { RootState } from '../app/store';
import MemoizedCSVLink, { CSVData } from '../components/MemoizedCSVLink';
// Couleurs statiques pour le pie chart
const COLORS = ['#82ca9d', '#d97b7b'];

// Styles MUI optimisés
const styles = {
  paper: { 
    p: 3, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  balance: { color: 'primary.main' },
  income: { color: 'green' },
  expense: { color: 'red' }
};

// Composant mémoïsé pour les transactions
const TransactionItem = React.memo(({ transaction }: { transaction: any }) => (
  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="body1">{transaction.description}</Typography>
    <Typography variant="body2" color={transaction.type === 'expense' ? 'error' : 'success.main'}>
      {transaction.amount} €
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {new Date(transaction.date).toLocaleDateString()}
    </Typography>
  </Paper>
));

const HomeScreen = () => {
  // Sélecteurs Redux optimisés
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);
  const balance = useSelector(selectBalance);
  const recentTransactions = useSelector(selectRecentTransactions);
  const allTransactions = useSelector((state: RootState) => state.transactions.transactions);

  // Mémoïsation des données dérivées
  const pieChartData = useMemo(() => [
    { name: 'Revenus', value: totalIncome },
    { name: 'Dépenses', value: totalExpense },
  ], [totalIncome, totalExpense]);

  const csvData = useMemo((): CSVData[] => 
    allTransactions.map(transaction => ({
      Description: transaction.description,
      Montant: transaction.amount,
      Catégorie: transaction.category,
      Date: new Date(transaction.date).toLocaleDateString(),
      Type: transaction.type === 'income' ? 'Revenu' : 'Dépense'
    })), 
    [allTransactions]
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de bord financier
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Bonjour, <strong>John Doe</strong></Typography>
        <Button variant="contained" color="secondary" component={Link} to="/login">
          Se déconnecter
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Blocs statistiques */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={styles.paper}>
            <Typography variant="h6">Solde actuel</Typography>
            <Typography variant="h4" sx={styles.balance}>
              {balance} €
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={styles.paper}>
            <Typography variant="h6">Revenus Totals</Typography>
            <Typography variant="h4" sx={styles.income}>
              {totalIncome} €
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={styles.paper}>
            <Typography variant="h6">Dépenses Totales</Typography>
            <Typography variant="h4" sx={styles.expense}>
              {totalExpense} €
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Pie Chart optimisé */}
        <Grid item xs={12} sm={6}>
          <Paper sx={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Répartition des Finances
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieChartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Transactions récentes optimisées */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Transactions Récentes
            </Typography>
            <Grid container spacing={2}>
              {recentTransactions.map((transaction) => (
                <Grid item xs={12} sm={6} md={4} key={transaction.id}>
                  <TransactionItem transaction={transaction} />
                </Grid>
              ))}
            </Grid>
            <Button variant="contained" sx={{ mt: 2 }} component={Link} to="/transactions">
              Voir toutes les transactions
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Section export */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Exporter les rapports
        </Typography>
        <MemoizedCSVLink data={csvData} />
      </Box>
    </Container>
  );
};

export default React.memo(HomeScreen);