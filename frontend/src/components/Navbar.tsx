import React from 'react';
import { Link } from 'react-router-dom'; // Lien utilisé pour la navigation avec react-router

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#282c34', padding: '1rem' }}>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: '20px' }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            Accueil
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/login" style={{ color: '#fff', textDecoration: 'none' }}>
            Se connecter
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>
            Tableau de bord
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/budget" style={{ color: '#fff', textDecoration: 'none' }}>
            Budget
          </Link>
        </li>
        <li style={{ marginRight: '20px' }}>
          <Link to="/transactions" style={{ color: '#fff', textDecoration: 'none' }}>
            Transactions
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
