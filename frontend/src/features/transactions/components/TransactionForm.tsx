import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  InputLabel, 
  FormControl, 
  SelectChangeEvent,
  Alert
} from '@mui/material';
import { Transaction } from '../types';
import DOMPurify from 'dompurify';

interface TransactionFormProps {
  initialData?: Transaction;
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  error?: string;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  initialData, 
  onSubmit,
  error 
}) => {
  const [formData, setFormData] = useState<Omit<Transaction, 'id'>>({
    type: 'expense',
    amount: 0,
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    if (formData.amount <= 0) {
      newErrors.amount = 'Le montant doit être positif';
    }
    
    const cleanDescription = DOMPurify.sanitize(formData.description);
    if (cleanDescription.length < 3) {
      newErrors.description = 'La description doit contenir au moins 3 caractères';
    }

    if (!formData.category) {
      newErrors.category = 'La catégorie est obligatoire';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Sanitize all inputs
      const sanitizedData = {
        ...formData,
        description: DOMPurify.sanitize(formData.description),
        category: DOMPurify.sanitize(formData.category)
      };
      
      onSubmit(sanitizedData);
    }
  }, [formData, onSubmit, validateForm]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      const { name, value } = e.target;
      
      // Validation en temps réel
      if (name === 'amount') {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue)) {
          setFormData(prev => ({ ...prev, [name]: numericValue }));
        }
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }

      // Clear error when user starts typing
      setErrors(prev => ({ ...prev, [name]: '' }));
    },
    []
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <FormControl fullWidth margin="normal">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="income">Revenu</MenuItem>
          <MenuItem value="expense">Dépense</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        margin="normal"
        label="Montant"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        error={!!errors.amount}
        helperText={errors.amount}
        inputProps={{ min: 0, step: 0.01 }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        inputProps={{ maxLength: 100 }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Catégorie"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={!!errors.category}
        helperText={errors.category}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          sx={{ minWidth: 120 }}
        >
          {initialData ? 'Mettre à jour' : 'Créer'}
        </Button>
      </Box>
    </Box>
  );
};

export default React.memo(TransactionForm);