import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";
import TransactionForm from "../features/transactions/components/TransactionForm";
import {
  addTransaction,
  updateTransaction,
  selectTransactionById,
} from "../features/transactions/transactionsSlice";

const AddEditTransaction = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const transaction = useSelector((state) => selectTransactionById(state, id));

  const handleSubmit = (formData) => {
    if (transaction) {
      dispatch(updateTransaction({ id: transaction.id, ...formData }));
    } else {
      dispatch(addTransaction({ id: Date.now(), ...formData }));
    }
    navigate("/transactions");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 3, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          {transaction ? "Modifier la Transaction" : "Ajouter une Transaction"}
        </Typography>
        <TransactionForm
          initialData={transaction}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
};

export default AddEditTransaction;
