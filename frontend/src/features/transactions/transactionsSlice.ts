import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import transactionsData from "../../data/transactions.json";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface TransactionsState {
  transactions: Transaction[];
}

const initialState: TransactionsState = {
  transactions: transactionsData.transactions as Transaction[],
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (t) => t.id === action.payload.id
      );
      if (index !== -1) state.transactions[index] = action.payload;
    },
    deleteTransaction: (state, action: PayloadAction<number>) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
  },
});

// Selector for retrieving all transactions
export const selectTransactions = (state: { transactions: TransactionsState }) =>
  state.transactions.transactions;

// Selector for retrieving a single transaction by ID
export const selectTransactionById = (
  state: { transactions: TransactionsState },
  id: string | undefined
) => state.transactions.transactions.find((t) => t.id === Number(id));

export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionsSlice.actions;

export default transactionsSlice.reducer;
