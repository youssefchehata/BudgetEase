// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/mockApi';
import type { RootState } from '../../app/store';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'client';
  createdAt: string;
}

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
};

// Thunks
export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await api.getUsers();
  return response.data;
});

export const updateUserRole = createAsyncThunk(
  'users/updateRole',
  async ({ userId, newRole }: { userId: number; newRole: User['role'] }) => {
    const updatedUser = await api.updateUser({ id: userId, role: newRole });
    return updatedUser;
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId: number) => {
    await api.deleteUser(userId);
    return userId;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      
      // Update User Role
      .addCase(updateUserRole.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserRole.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.status = 'succeeded';
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update role';
      })
      
      // Delete User
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.users = state.users.filter(user => user.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete user';
      });
  }
});

// Selectors
export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;