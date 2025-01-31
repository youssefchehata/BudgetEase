
// src/pages/AdminDashboard.tsx
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateProfile } from '../features/auth/authSlice';
import { User } from '../features/auth/types';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'username', headerName: 'Nom', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'role', headerName: 'Rôle', width: 130, editable: true },
];

const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.auth);

  const handleRoleChange = (newUser: User) => {
    dispatch(updateProfile(newUser));
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onEditCellPropsChange={(params) => handleRoleChange(params.row as User)}
      />
    </div>
  );
};

export default AdminDashboard;

// import React from 'react';
// import { Typography, Container, Grid, Paper, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../features/auth/authSlice';

// const AdminDashboard = () => {
//     const user = useSelector(selectUser);

//     return (
//         <Container maxWidth="lg">
//             <Typography variant="h4" gutterBottom>
//                 Tableau de bord administrateur
//             </Typography>
//             <Typography variant="subtitle1" gutterBottom>
//                 Bienvenue, {user?.name}
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Paper elevation={3}>
//                         <Box p={3}>
//                             <Typography variant="h6" gutterBottom>
//                                 Gestion des utilisateurs
//                             </Typography>
//                             <Typography>
//                                 Gérez les comptes utilisateurs, les rôles et les permissions.
//                             </Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Paper elevation={3}>
//                         <Box p={3}>
//                             <Typography variant="h6" gutterBottom>
//                                 Statistiques globales
//                             </Typography>
//                             <Typography>
//                                 Visualisez les statistiques d'utilisation de l'application.
//                             </Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Paper elevation={3}>
//                         <Box p={3}>
//                             <Typography variant="h6" gutterBottom>
//                                 Configuration système
//                             </Typography>
//                             <Typography>
//                                 Gérez les paramètres globaux de l'application.
//                             </Typography>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default AdminDashboard;