import React, { useState, useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// Mise à jour de l'interface Transaction pour que l'id soit une chaîne
export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  type: 'income' | 'expense';
}

interface CategoryAnalysis {
  category: string;
  totalAmount: number;
  percentage: number;
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// Composant pour le tableau réutilisable
const DataTable = ({ data }: { data: CategoryAnalysis[] }) => (
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">Catégorie</TableCell>
          <TableCell align="left">Montant</TableCell>
          <TableCell align="left">% du Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ category, totalAmount, percentage }) => (
          <TableRow key={category}>
            <TableCell>{category}</TableCell>
            <TableCell>{totalAmount.toFixed(2)} €</TableCell>
            <TableCell>{percentage.toFixed(1)}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

const ExpenseCategorization = () => {
  // Utilisation de useSelector pour obtenir les transactions depuis le store
  const allTransactions = useSelector((state: RootState) => state.transactions.transactions);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categoryAnalysis = useMemo(() => {
    const expenses = allTransactions.filter(t => t.type === 'expense');
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categories = expenses.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = {
          category: transaction.category,
          totalAmount: 0,
          transactions: [],
        };
      }
      acc[transaction.category].totalAmount += transaction.amount;
      acc[transaction.category].transactions.push(transaction);
      return acc;
    }, {} as Record<string, Omit<CategoryAnalysis, 'percentage'>>);

    return Object.values(categories)
      .map(cat => ({
        ...cat,
        percentage: (cat.totalAmount / totalExpenses) * 100,
      }))
      .sort((a, b) => b.totalAmount - a.totalAmount);
  }, [allTransactions]);

  const chartData = categoryAnalysis.map(({ category, totalAmount }) => ({
    name: category,
    value: totalAmount,
  }));

  return (
    <div>
      <Card>
        <CardHeader>
          <Typography variant="h6" className="flex items-center gap-2">
            <RechartsPieChart className="h-5 w-5" />
            Analyse des Dépenses par Catégorie
          </Typography>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) => 
                      `${name} (${(percent * 100).toFixed(1)}%)`
                    }
                    onClick={(_, index) => setSelectedCategory(categoryAnalysis[index].category)}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <DataTable data={categoryAnalysis} />
          </div>
        </CardContent>
      </Card>

      {selectedCategory && (
        <Card>
          <CardHeader>
            <Typography variant="h6" className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Détails de la catégorie : {selectedCategory}
            </Typography>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Description</TableCell>
                      <TableCell align="left">Montant</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {categoryAnalysis
                      .find(cat => cat.category === selectedCategory)
                      ?.transactions.map(transaction => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.amount.toFixed(2)} €</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ExpenseCategorization;
