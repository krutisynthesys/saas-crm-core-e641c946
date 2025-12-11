import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUsers, User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('crm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo credentials check
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('crm_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return { success: true };
    }
    
    // Allow any email with demo123 password for demo purposes
    if (password === 'demo123') {
      const demoUser: User = {
        id: 'demo',
        name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        role: 'sales-rep',
        avatar: email.substring(0, 2).toUpperCase(),
        department: 'Sales',
        performance: {
          leadsAssigned: 25,
          dealsWon: 5,
          revenue: 150000,
          tasksCompleted: 45,
        },
      };
      setUser(demoUser);
      localStorage.setItem('crm_user', JSON.stringify(demoUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password. Use "demo123" as password.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crm_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
