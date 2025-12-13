// ==================== src/context/AuthContext.jsx ====================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/api';
import { trackUserRegistration, trackActiveUser, trackUserLogout, startActivityMonitoring } from '../services/tracking';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      
      // Track as active user
      localStorage.setItem('current_user_id', userData.id);
      trackActiveUser(userData.id);
    }
    setLoading(false);
    
    // Start activity monitoring
    startActivityMonitoring();
  }, []);

  // Keep user active while they're on the site
  useEffect(() => {
    if (!user) return;

    // Track activity every 30 seconds
    const interval = setInterval(() => {
      trackActiveUser(user.id);
    }, 30000);

    // Track activity on user interaction
    const handleActivity = () => {
      trackActiveUser(user.id);
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [user]);

  const login = async (email, password) => {
    try {
      const userData = await apiLogin(email, password);
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      localStorage.setItem('current_user_id', userData.id);
      
      setUser(userData);
      
      // Track as active user
      trackActiveUser(userData.id);
      
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
      
      // Track user registration (this will increment totalUsers)
      trackUserRegistration(userData.id, {
        name,
        email,
        role: userData.role
      });
      
      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (user) {
        // Track user logout
        trackUserLogout(user.id);
      }
      
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
