// src/components/MemoizedCSVLink.tsx
import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from '@mui/material';

export interface CSVData {
  Description: string;
  Montant: number;
  Catégorie: string;
  Date: string;
  Type: string;
}

interface Props {
  data: CSVData[];
}

const MemoizedCSVLink: React.FC<Props> = React.memo(({ data }) => (
  <CSVLink 
    data={data} 
    filename="transactions.csv" 
    style={{ textDecoration: 'none' }}
  >
    <Button variant="contained" color="primary">
      Exporter les transactions
    </Button>
  </CSVLink>
));

export default MemoizedCSVLink;