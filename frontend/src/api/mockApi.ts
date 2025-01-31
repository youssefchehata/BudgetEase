// src/api/mockApi.ts export 
export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user' | 'client';
    createdAt: string;
  }
  
  interface PaginationParams {
    page: number;
    pageSize: number;
  }
  
  interface FilterParams {
    role?: 'admin' | 'user' | 'client';
    searchQuery?: string;
  }
  
  interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
  }
  
  // Clone initial array to avoid mutations
  let mockUsers: User[] = [
    {
      id: 1,
      username: "admin",
      email: "admin@123",
      password: "admin123",
      role: "admin",
      createdAt: "2023-08-20",
    },
    {
      id: 2,
      username: "user1",
      email: "user@example.com",
      password: "user123",
      role: "user",
      createdAt: "2023-08-20",
    },
    {
      id: 3,
      username: "client1",
      email: "client@example.com",
      password: "client123",
      role: "client",
      createdAt: "2023-08-20",
    },
  ];
  
  const mockApi = {
    // Auth methods
    login: async (credentials: { email: string; password: string }): Promise<Omit<User, 'password'>> => {
      const user = mockUsers.find(u => u.email === credentials.email && u.password === credentials.password);
      if (!user) throw new Error("Invalid credentials");
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    },
  
    logout: async (): Promise<boolean> => {
      return true;
    },
  
    register: async (userData: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
      const exists = mockUsers.some(u => u.email === userData.email);
      if (exists) throw new Error("User already exists");
      
      const newUser: User = {
        ...userData,
        id: mockUsers.length + 1,
        createdAt: new Date().toISOString()
      };
      
      mockUsers.push(newUser);
      return newUser;
    },
  
    // User management methods
    getUsers: async (params?: PaginationParams & FilterParams): Promise<PaginatedResponse<Omit<User, 'password'>>> => {
      // Filtering
      let filteredUsers = mockUsers;
      
      if (params?.role) {
        filteredUsers = filteredUsers.filter(u => u.role === params.role);
      }
      
      if (params?.searchQuery) {
        const searchLower = params.searchQuery.toLowerCase();
        filteredUsers = filteredUsers.filter(u => 
          u.username.toLowerCase().includes(searchLower) ||
          u.email.toLowerCase().includes(searchLower)
        );
      }
  
      // Pagination
      const page = params?.page || 1;
      const pageSize = params?.pageSize || 10;
      const startIndex = (page - 1) * pageSize;
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);
  
      // Remove passwords from response
      const usersWithoutPassword = paginatedUsers.map(({ password, ...user }) => user);
  
      return {
        data: usersWithoutPassword,
        total: filteredUsers.length,
        page,
        pageSize
      };
    },
  
    updateUser: async (userData: Partial<User> & { id: number }): Promise<Omit<User, 'password'>> => {
      const index = mockUsers.findIndex(u => u.id === userData.id);
      if (index === -1) throw new Error("User not found");
      
      const updatedUser = { ...mockUsers[index], ...userData };
      mockUsers[index] = updatedUser;
      
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    },
  
    deleteUser: async (userId: number): Promise<void> => {
      mockUsers = mockUsers.filter(u => u.id !== userId);
    }
  };
  
  export type MockApi = typeof mockApi;
  export default mockApi;