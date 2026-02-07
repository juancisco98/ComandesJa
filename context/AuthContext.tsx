import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<{ success: boolean; error?: any }>;
  logout: () => void;
  // switchRole deprecated
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);

    // For Dev/Demo buttons that don't pass password, we might need a workaround or disable them?
    // For now, if no password, we fail or handle specific demo accounts if needed?
    // Expect password for real auth.
    if (!password) {
      setIsLoading(false);
      console.error("Password required for login");
      return false;
    }

    const { user: loggedUser, error } = await authService.login(email, password);

    if (loggedUser && !error) {
      setUser(loggedUser);
      setIsLoading(false);
      return true;
    }

    console.error(error);
    setIsLoading(false);
    return false;
  };

  const register = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true);

    const { user: newUser, error } = await authService.register(email, password, name, role);

    if (newUser && !error) {
      setUser(newUser);
      setIsLoading(false);
      return { success: true };
    } else {
      console.error("Registration error:", error);
      setIsLoading(false);
      return { success: false, error };
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  // switchRole deprecated/removed for real auth
  const switchRole = (newRole: UserRole) => {
    // No-op or log warning
    console.warn("switchRole is not supported with Supabase auth");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};