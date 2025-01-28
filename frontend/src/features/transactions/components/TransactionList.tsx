import React, { memo, useMemo } from 'react';
import { List, Typography } from '@mui/material';
import { Transaction } from '../types';
import TransactionItem from './TransactionItem';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (id: number) => void;
}

const TransactionList: React.FC<TransactionListProps> = memo(({ transactions, onEdit }) => {
  // Virtualization pour les grandes listes
  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <TransactionItem 
        transaction={transactions[index]} 
        onEdit={onEdit} 
      />
    </div>
  );

  // Tri mémoïsé
  const sortedTransactions = useMemo(() => 
    [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ), 
    [transactions]
  );

  return transactions.length > 0 ? (
    <List sx={{ width: '100%' }}>
      <FixedSizeList
        height={600}
        width="100%"
        itemSize={100}
        itemCount={sortedTransactions.length}
        overscanCount={5}
      >
        {Row}
      </FixedSizeList>
    </List>
  ) : (
    <Typography variant="body1" align="center" sx={{ mt: 4 }}>
      Aucune transaction trouvée
    </Typography>
  );
});

export default TransactionList;