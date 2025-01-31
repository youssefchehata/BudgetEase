// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, Container, Box, styled } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import DashboardPage from './screen/DashboardPage';
import BudgetPage from './screen/BudgetPage';
import HomeScreen from './screen/HomeScreen';
import AddEditTransactionPage from './screen/AddEditTransactionScreen';
import TransactionsList from './screen/TransactionScreen';
import ExpenseCategorization from './screen/ExpenseCategorization';
import ProfilePage from './screen/ProfilePage';
import LoginPage from './screen/LoginPage';
import RegisterPage from './screen/RegisterPage';
import UnauthorizedPage from './screen/UnauthorizedPage';


// Composants
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ProtectedRoute from './features/auth/ProtectedRoute';
import RoleGuard from './features/auth/RoleGuard';
import UserManager from './screen/UserManager';


// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: { main: '#2D3E50', contrastText: '#FFFFFF' },
    secondary: { main: '#E67E22', light: '#FDEBD0' },
    background: { default: '#F8F9FA', paper: '#FFFFFF' },
    success: { main: '#27AE60' },
    error: { main: '#E74C3C' },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: '2.5rem', fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 8, padding: '8px 20px' } } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' } } },
    MuiAppBar: { styleOverrides: { root: { boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } } },
  },
});

const MainContent = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
  minHeight: 'calc(100vh - 128px)',
}));

const AppLayout = () => {
  const location = useLocation();
  const authPages = ['/login', '/register'];
  const showNavbar = !authPages.includes(location.pathname);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {showNavbar && <Navbar />}

      <MainContent maxWidth="lg" sx={{ mt: showNavbar ? 10 : 0 }}>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomeScreen />} />
            {/* <Route path="/users" element={<UserManager />} /> */}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/transactions" element={<TransactionsList />} />
              <Route path="/add-transaction" element={<AddEditTransactionPage />} />
              <Route path="/edit-transaction/:id" element={<AddEditTransactionPage />} />
              <Route path="/expense-categorization" element={<ExpenseCategorization />} />
              <Route path="/budget" element={<BudgetPage />} />

              {/* Admin Routes */}
            
              

              <Route element={<RoleGuard allowedRoles={['admin']} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/users" element={<UserManager />} />

              </Route>
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </MainContent>

      {showNavbar && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

const AppRoutes = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppLayout />
    </Router>
  </ThemeProvider>
);

export default AppRoutes;