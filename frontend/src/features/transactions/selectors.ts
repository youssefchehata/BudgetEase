// src/features/transactions/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const selectTransactionsState = (state: RootState) => state.transactions;

export const selectAllTransactions = createSelector(
  [selectTransactionsState],
  (transactionsState) => transactionsState.transactions
);

export const selectTotalIncome = createSelector(
  [selectAllTransactions],
  (transactions) => transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)
);

export const selectTotalExpense = createSelector(
  [selectAllTransactions],
  (transactions) => transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)
);

export const selectBalance = createSelector(
  [selectTotalIncome, selectTotalExpense],
  (income, expense) => income - expense
);

export const selectRecentTransactions = createSelector(
  [selectAllTransactions],
  (transactions) => transactions.slice(0, 5)
);