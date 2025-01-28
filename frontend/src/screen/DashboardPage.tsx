import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Container, Typography, Grid, Paper } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { selectTransactions } from "../features/transactions/transactionsSlice";

const DashboardPage = () => {
  // Fetch transactions from Redux store
  const transactions = useSelector(selectTransactions);

  // Calculate financial data
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [transactions]);

  // Prepare data for PieChart
  const chartData = [
    { name: "Revenus", value: totalIncome },
    { name: "Dépenses", value: totalExpense },
  ];

  const colors = ["#82ca9d", "#d97b7b"]; // Green for income, red for expenses

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Financier
      </Typography>

      <Grid container spacing={3}>
        {/* Graphique des Finances */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Répartition des Finances
            </Typography>
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Résumé des Transactions */}
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Résumé des Transactions
            </Typography>
            <Typography variant="body1">
              Revenus totaux: {totalIncome.toLocaleString()} €
            </Typography>
            <Typography variant="body1">
              Dépenses totales: {totalExpense.toLocaleString()} €
            </Typography>
            <Typography variant="h6" color={balance >= 0 ? "primary" : "error"}>
              Solde actuel: {balance.toLocaleString()} €
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
