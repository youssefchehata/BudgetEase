
import { useSelector, useDispatch } from "react-redux";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
import { Link,  } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import {

  deleteTransaction,

} from "../features/transactions/transactionsSlice";
import { selectAllTransactions } from "../features/transactions/selectors";


// ---------------- Transactions List Component ----------------
const TransactionsList = () => {
  const transactions = useSelector(selectAllTransactions);
  const dispatch = useDispatch();

  const columns = [
    { field: "description", headerName: "Description", flex: 1 },
    { field: "amount", headerName: "Montant (€)", flex: 0.5 },
    { field: "category", headerName: "Catégorie", flex: 0.5 },
    { field: "type", headerName: "Type", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.8 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      renderCell: (params) => (
        <Box>
          <Button
            size="small"
            component={Link}
            to={`/edit-transaction/${params.row.id}`}
          >
            Modifier
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => dispatch(deleteTransaction(params.row.id))}
          >
            Supprimer
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Toutes les Transactions
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          component={Link}
          to="/add-transaction"
          color="primary"
        >
          Ajouter une Transaction
        </Button>
      </Box>
      <Paper sx={{ p: 3 }}>
        <DataGrid
          rows={transactions}
          columns={columns}
          autoHeight
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
        />
      </Paper>
    </Container>
  );
};

export default TransactionsList;