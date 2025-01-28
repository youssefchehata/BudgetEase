// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Pour les notifications de toast

// Pages

import LoginPage from './screen/LoginPage';
import DashboardPage from './screen/DashboardPage';
import BudgetPage from './screen/BudgetPage';

// Composants
import Navbar from './components/Navbar';
import HomeScreen from './screen/HomeScreen';
import AddEditTransactionPage from './screen/AddEditTransactionScreen';
import TransactionsList from './screen/TransactionScreen';
import ExpenseCategorization from './screen/ExpenseCategorization';

// Création du thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#00796b', // Exemple de couleur primaire
    },
    secondary: {
      main: '#d32f2f', // Exemple de couleur secondaire
    },
    background: {
      default: '#f4f6f8', // Couleur de fond générale
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const AppRoutes = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applique le thème global de Material UI */}
      <Router>
        {/* Navbar accessible partout */}
        <Navbar />
        
        {/* Routes de l'application */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="ExpenseCategorization" element={<ExpenseCategorization />} />
          <Route path="transactions" element={<TransactionsList />} />
          <Route path="add-transaction" element={<AddEditTransactionPage />} />
          <Route path="edit-transaction/:id" element={<AddEditTransactionPage />} />
          <Route path="/add" element={<AddEditTransactionPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/transactions" element={<TransactionsPage />} /> */}
          <Route path="/budget" element={<BudgetPage />} />
        </Routes>

        {/* Notifications avec react-toastify */}
        <ToastContainer />
      </Router>
    </ThemeProvider>
  );
};




export default AppRoutes;
