import React, { useCallback, memo } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Transaction } from '../types';
import { useAppDispatch } from '../../../app/hooks';
import { deleteTransaction } from '../transactionsSlice';
import DOMPurify from 'dompurify';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (id: number) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = memo(({ transaction, onEdit }) => {
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) {
      dispatch(deleteTransaction(transaction.id));
    }
  }, [dispatch, transaction.id]);

  const handleEdit = useCallback(() => {
    onEdit(transaction.id);
  }, [onEdit, transaction.id]);

  // Sécurité XSS
  const sanitizedDescription = DOMPurify.sanitize(transaction.description);

  return (
    <Card sx={{ mb: 2, position: 'relative' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <Typography 
              variant="body1" 
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }} 
            />
            <Typography variant="body2" color="text.secondary">
              {new Date(transaction.date).toLocaleDateString()}
            </Typography>
          </div>
          <Box>
            <Typography 
              variant="h6" 
              color={transaction.type === 'income' ? 'success.main' : 'error.main'}
            >
              {transaction.amount} €
            </Typography>
            <Typography variant="caption" display="block">
              {transaction.category}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', right: 8, top: 8 }}>
          <IconButton 
            aria-label="edit" 
            onClick={handleEdit}
            size="small"
            sx={{ color: 'primary.main' }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton 
            aria-label="delete" 
            onClick={handleDelete}
            size="small"
            sx={{ color: 'error.main' }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
});

export default TransactionItem;