
import React, { useState, createContext, useContext, ReactNode } from 'react';
import { User, Role } from '../types';

// Mock users
const MOCK_USERS: User[] = [
  { id: 'user-001', email: 'contractor@example.com', role: Role.CONTRACTOR, companyName: 'Reliable Construction' },
  { id: 'user-002', email: 'admin@example.com', role: Role.ADMIN },
];

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert('User not found.');
    }
  };

  const logout = () => {
    setUser(null);
  };

  // FIX: Replaced JSX with React.createElement as JSX is not supported in .ts files by default.
  // This was causing multiple parsing errors.
  return React.createElement(AuthContext.Provider, { value: { user, login, logout } }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
