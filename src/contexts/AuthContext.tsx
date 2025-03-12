
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const initialUser: User | null = null;

const AuthContext = createContext<AuthContextType>({
  user: initialUser,
  isAuthenticated: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user in localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('vidify_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    // This is a mock implementation - would use actual auth in production
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email,
      avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/40/40`,
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('vidify_user', JSON.stringify(mockUser));
  };

  const register = (name: string, email: string, password: string) => {
    // This is a mock implementation - would use actual auth in production
    const newUser = {
      id: '1',
      name,
      email,
      avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/40/40`,
    };
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('vidify_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('vidify_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
