'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GET_USER } from '@/services/AuthService';
import type { IUser } from '@/types/IUser';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
  totalDecks: number;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  totalDecks: 3
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const [totalDecks, setTotalDecks] = useState(3);

  useEffect(() => {
    GET_USER().then((response) => {
      setIsAuthenticated(response.success);
      if (response.success && response.user) {
        setUser(response.user);
        setTotalDecks(response.user.totalDecks || 3);
      }
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, totalDecks }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 