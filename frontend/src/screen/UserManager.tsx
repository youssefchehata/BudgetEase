import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DataGrid, 
  GridColDef, 
  GridActionsCellItem,
  GridRowParams,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarExport
} from '@mui/x-data-grid';
import { 
  Avatar, 
  LinearProgress, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Select, 
  MenuItem, 
  Snackbar, 
  Alert,
  Stack,
  Typography
} from '@mui/material';
import { Edit, Delete, Person } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectCurrentUser } from '../features/auth/authSlice';
import { fetchUsers, updateUserRole, deleteUser } from '../features/users/usersSlice';
import { theme } from '../components/UI/theme';

// Utiliser 'User' défini dans mockApi.ts
import { User } from '../../api/mockApi'; 

interface SnackbarState {
  open: boolean;
  message: string;
  severity: 'success' | 'error';
}

const UserManager = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const { users, status, error } = useAppSelector(state => state.users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);  // Utiliser 'User' ici
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [snackbar, setSnackbar] = useState<SnackbarState>({ 
    open: false, 
    message: '',
    severity: 'success'
  });

  // Fetch users on mount
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Memoized columns configuration
  const columns = useMemo((): GridColDef[] => [
    { 
      field: 'avatar', 
      headerName: '', 
      width: 60,
      renderCell: () => (
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
          <Person />
        </Avatar>
      )
    },
    { 
      field: 'username', 
      headerName: 'Name', 
      flex: 1,
      minWidth: 200,
      renderCell: ({ row }) => (
        <Stack>
          <Typography variant="body1" fontWeight={500}>
            {row.username}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {row.email}
          </Typography>
        </Stack>
      )
    },
    { 
      field: 'role', 
      headerName: 'Role', 
      flex: 1,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={
            value === 'admin' ? 'error' : 
            value === 'client' ? 'warning' : 'primary'
          }
          variant="outlined"
          sx={{ 
            borderRadius: '8px',
            textTransform: 'capitalize',
            borderWidth: '2px'
          }}
        />
      )
    },
    { 
      field: 'createdAt', 
      headerName: 'Member Since', 
      flex: 1,
      valueFormatter: ({ value }) => new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      field: 'actions',
      type: 'actions',
      width: 120,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<Edit />}
          label="Edit"
          onClick={() => handleEditClick(row)}
          showInMenu
          disabled={!isAdmin}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          label="Delete"
          onClick={() => handleDeleteClick(row)}
          showInMenu
          disabled={!isAdmin}
        />,
      ],
    },
  ], []);

  // Derived values
  const isAdmin = currentUser?.role === 'admin';
  const isLoading = status === 'loading';

  // Action handlers
  const handleEditClick = useCallback((user: User) => {  // Utiliser 'User' ici
    setSelectedUser(user);
    setOpenEdit(true);
  }, []);

  const handleDeleteClick = useCallback((user: User) => {  // Utiliser 'User' ici
    setSelectedUser(user);
    setOpenDelete(true);
  }, []);

  const handleRoleUpdate = useCallback(async (newRole: User['role']) => {  // Utiliser 'User' ici
    if (!selectedUser) return;

    try {
      await dispatch(updateUserRole({ 
        userId: selectedUser.id, 
        newRole 
      })).unwrap();
      
      setSnackbar({
        open: true,
        message: `${selectedUser.username}'s role updated successfully!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Failed to update role: ${err instanceof Error ? err.message : 'Unknown error'}`,
        severity: 'error'
      });
    } finally {
      setOpenEdit(false);
    }
  }, [dispatch, selectedUser]);

  const handleUserDelete = useCallback(async () => {
    if (!selectedUser) return;

    try {
      await dispatch(deleteUser(selectedUser.id)).unwrap();
      setSnackbar({
        open: true,
        message: `${selectedUser.username} deleted successfully!`,
        severity: 'success'
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: `Deletion failed: ${err instanceof Error ? err.message : 'Unknown error'}`,
        severity: 'error'
      });
    } finally {
      setOpenDelete(false);
    }
  }, [dispatch, selectedUser]);

  // Custom toolbar component
  const CustomToolbar = useMemo(() => (
    function ToolbarComponent() {
      return (
        <GridToolbarContainer sx={{ p: 2, justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2}>
            <GridToolbarFilterButton variant="outlined" />
            <GridToolbarExport variant="outlined" />
          </Stack>
          <Typography variant="subtitle1" color="text.secondary">
            Total Users: {users.length}
          </Typography>
        </GridToolbarContainer>
      );
    }
  ), [users.length]);

  return (
    <div style={{ height: 'calc(100vh - 200px)', width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        slots={{
          toolbar: CustomToolbar,

        }}
        loading={isLoading}
        sx={{
          borderRadius: 4,
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: theme.palette.background.paper,
            borderRadius: 4,
          },
          '& .MuiDataGrid-virtualScroller': {
            bgcolor: theme.palette.background.default,
          },
        }}
        disableRowSelectionOnClick
      />

      {/* Edit Role Dialog */}
      <Dialog 
        open={openEdit} 
        onClose={() => setOpenEdit(false)}
        fullWidth 
        maxWidth="xs"
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
              <Person />
            </Avatar>
            <Typography variant="h6">
              Edit {selectedUser?.username}
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Select
            value={selectedUser?.role || 'user'}
            onChange={(e) => handleRoleUpdate(e.target.value as User['role'])}
            fullWidth
            sx={{ mt: 2 }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => handleRoleUpdate(selectedUser?.role || 'user')}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDelete} 
        onClose={() => setOpenDelete(false)}
        fullWidth 
        maxWidth="xs"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUser?.username}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={handleUserDelete}
          >
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: 4,
            boxShadow: theme.shadows[3],
            alignItems: 'center'
          }}
        >
          <Typography variant="body1">
            {snackbar.message}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UserManager;
