// import React from 'react';
// import { Link } from 'react-router-dom'; // Lien utilisé pour la navigation avec react-router

// const Navbar = () => {
//   return (
//     <nav style={{ backgroundColor: '#282c34', padding: '1rem' }}>
//       <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
//         <li style={{ marginRight: '20px' }}>
//           <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
//             Accueil
//           </Link>
//         </li>
//         <li style={{ marginRight: '20px' }}>
//           <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
//             Se connecter
//           </Link>
//         </li>
//         <li style={{ marginRight: '20px' }}>
//           <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
//             Tableau de bord
//           </Link>
//         </li>
//         <li style={{ marginRight: '20px' }}>
//           <Link to="/budget" style={{ color: '#fff', textDecoration: 'none' }}>
//             Budget
//           </Link>
//         </li>
//         <li style={{ marginRight: '20px' }}>
//           <Link to="/transactions" style={{ color: '#fff', textDecoration: 'none' }}>
//             Transactions
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
// src/components/Layout/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Items communs à tous les utilisateurs connectés
  const commonItems = [
    { label: 'Profil', path: '/profile', roles: ['admin', 'user', 'client'] },
    { label: 'Transactions', path: '/transactions', roles: ['admin', 'user', 'client'] },
  ];

  // Items spécifiques aux rôles
  const adminItems = [
    { label: 'Dashboard Admin', path: '/admin', roles: ['admin'] },
    { label: 'Gestion Utilisateurs', path: '/users', roles: ['admin'] },
  ];

  const userItems = [
    { label: 'Budget', path: '/budget', roles: ['user', 'client'] },
    { label: 'Statistiques', path: '/stats', roles: ['user'] },
  ];

  const clientItems = [
    { label: 'Rapports', path: '/reports', roles: ['client'] },
  ];

  const allItems = [...commonItems, ...adminItems, ...userItems, ...clientItems];

  const filteredItems = allItems.filter(item => 
    user ? item.roles.includes(user.role) : false
  );

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', gap: 2, flexGrow: 1, ml: 3 }}>
      {filteredItems.map((item) => (
        <Button
          key={item.path}
          color="inherit"
          component={Link}
          to={item.path}
          sx={{ 
            fontWeight: item.roles.includes('admin') ? 700 : 400,
            display: item.roles.includes('admin') ? 'block' : 'block'
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderMobileMenu = () => (
    <>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{ ml: 'auto' }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {filteredItems.map((item) => (
          <MenuItem 
            key={item.path} 
            component={Link} 
            to={item.path}
            onClick={handleMenuClose}
          >
            {item.label}
          </MenuItem>
        ))}
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
    </>
  );

  return (
    <AppBar position="static" sx={{ boxShadow: theme.shadows[1] }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ 
            textDecoration: 'none', 
            color: 'inherit',
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem'
          }}
        >
          BUDJET EASE
        </Typography>

        {user ? (
          <>
            {!isMobile && renderDesktopMenu()}
            {isMobile && renderMobileMenu()}
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              {user.role === 'admin' && (
                <Button 
                  color="secondary" 
                  variant="contained"
                  component={Link}
                  to="/admin"
                >
                  Admin
                </Button>
              )}
              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{ 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)'
                  }
                }}
              >
                Déconnexion
              </Button>
            </Box>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              sx={{
                border: '1px solid rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Connexion
            </Button>
            <Button 
              color="secondary" 
              variant="contained" 
              component={Link} 
              to="/register"
            >
              Inscription
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
