// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from '../../app/store';
import type { User } from './types';
import api from '../../api/mockApi';

interface AuthState {
  user: Omit<User, 'password'> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<Omit<User, 'password'>>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<Omit<User, 'password'>>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerStart,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure
} = authSlice.actions;

// Thunk actions
export const login = (credentials: { email: string; password: string }): AppThunk => async (dispatch) => {
  try {
    dispatch(loginStart());
    const user = await api.login(credentials);
    dispatch(loginSuccess(user));
   // window.location.href = "/"; // Navigate to HomeScreen
  } catch (error) {
    dispatch(loginFailure(error instanceof Error ? error.message : 'Login failed'));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  try {
    await api.logout();
    dispatch(logoutSuccess());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Logout failed';
    dispatch(loginFailure(message));
  }
};

export const register =
  (userData: User): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(registerStart());
      const user = await api.register(userData);
      dispatch(loginSuccess(user));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      dispatch(registerFailure(message));
    }
  };

export const updateProfile =
  (userData: User): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(updateProfileStart());

      const updatedUser = await api.updateUser(userData) as User;

      dispatch(updateProfileSuccess(updatedUser));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Update failed';
      dispatch(updateProfileFailure(message));
    }
  };

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;

export default authSlice.reducer;