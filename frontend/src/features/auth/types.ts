
export interface User {
    id: number;
    username: string;
    email: string;
    password?: string;
    role: 'admin' | 'user' | 'client';
    createdAt: string;
  }
  
    export
  interface AuthState {
    user: (Omit<User, 'password'> & { role: 'admin' | 'user' | 'client' }) | null;
    loading: boolean;
    error: string | null;
  }