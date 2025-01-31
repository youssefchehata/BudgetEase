import React, { useState, useMemo } from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip as BarTooltip, Legend as BarLegend } from 'recharts';
import { Card, CardContent, CardHeader, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

// Générer une palette de couleurs cohérente
const colors = [
  '#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600', '#4caf50', '#2196f3', '#f44336', '#ff9800',
];

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

const DataTable = ({ data }: { data: CategoryAnalysis[] }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
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
            <TableRow key={category} hover>
              <TableCell>{category}</TableCell>
              <TableCell>{totalAmount.toFixed(2)} €</TableCell>
              <TableCell>{percentage.toFixed(1)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </motion.div>
);

const BarChartComponent = ({ data }: { data: CategoryAnalysis[] }) => {
  const barData = data.map(({ category, totalAmount }) => ({
    name: category,
    totalAmount,
  }));

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#555" />
          <YAxis stroke="#555" />
          <BarTooltip contentStyle={{ backgroundColor: '#222', color: '#fff' }} />
          <BarLegend verticalAlign="top" align="center" />
          <Bar dataKey="totalAmount" fill="url(#colorGradient)" />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#2196f3" stopOpacity={0.8} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

const ExpenseCategorization = () => {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Card>
        <CardHeader>
          <Typography variant="h6" className="flex items-center gap-2">
            Analyse des Dépenses par Catégorie
          </Typography>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <motion.div
              className="h-[400px]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    onClick={(_, index) => setSelectedCategory(categoryAnalysis[index].category)}
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </motion.div>

            <DataTable data={categoryAnalysis} />
          </div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <BarChartComponent data={categoryAnalysis} />
      </motion.div>

      {selectedCategory && (
        <Card>
          <CardHeader>
            <Typography variant="h6" className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Détails de la catégorie : {selectedCategory}
            </Typography>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default ExpenseCategorization;
