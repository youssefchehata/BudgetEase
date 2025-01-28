// src/types/models.ts
export interface Transaction {
    id: string;
    amount: number;
    description: string;
    category: string;
    date: string;
    type: 'income' | 'expense';
  }
  
//   export interface User {
//     id: string;
//     username: string;
//     email: string;
//   }
  