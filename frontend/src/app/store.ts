// src/app/store.ts
import { configureStore , ThunkAction, Action} from '@reduxjs/toolkit';
import transactionsReducer from '../features/transactions/transactionsSlice';
import authReducer from '../features/auth/authSlice';
import usersReducer from '../features/users/usersSlice';
// import userProfileReducer from '../features/userProfile/userProfileSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    // Add other reducers here
     auth: authReducer,
     users: usersReducer
     
    // userProfile: userProfileReducer,
    // // Add other slices here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;