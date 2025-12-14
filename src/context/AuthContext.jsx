import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/api';

// Create context
const AuthContext = createContext(null);

// Export useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Save user ID for tracking
      localStorage.setItem('current_user_id', userData.id);
    }
    setLoading(false);
  }, []);

  // Keep user active while they're on the site
  useEffect(() => {
    if (!user) return;

    // Track activity every 30 seconds
    const interval = setInterval(() => {
      // Just update timestamp to keep session alive
      const currentUserId = localStorage.getItem('current_user_id');
      if (currentUserId) {
        localStorage.setItem('last_activity', Date.now().toString());
      }
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [user]);

  const login = async (email, password) => {
    try {
      const userData = await apiLogin(email, password);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      localStorage.setItem('current_user_id', userData.id);
      
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const userData = await apiRegister(name, email, password);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      localStorage.setItem('current_user_id', userData.id);
      
      setUser(userData);
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('current_user_id');
      
      setUser(null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Default export
export default AuthContext;
