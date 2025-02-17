"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/services/authService';

interface AuthContextProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isAdmin, setisAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, senha: string) =>  {
    
    try {
      const login = await authenticate(email, senha);
      if (login.auth === false){ 
        console.error('Credências Incorretas');
        setIsAuthenticated(false);
        return false;
      }else if (login.auth === true) {
        setIsAuthenticated(true);
        setisAdmin(login.isAdmin)

        router.push('/usuarios');
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Falha no login:', error);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
