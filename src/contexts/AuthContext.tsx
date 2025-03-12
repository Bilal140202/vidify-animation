
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a type for the user
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Create a type for the context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthDialogOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsAuthDialogOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const openAuthDialog = () => {
    setIsAuthDialogOpen(true);
  };

  const closeAuthDialog = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthDialogOpen,
        login,
        logout,
        openAuthDialog,
        closeAuthDialog,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
