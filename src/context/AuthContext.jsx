import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout } from '../services/api';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Result object with success status
   */
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      // Call API
      const userData = await apiLogin(email, password);
      
      if (!userData) {
        throw new Error('Invalid response from server');
      }

      // Save to state
      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);

      return { 
        success: true, 
        user: userData 
      };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login gagal. Silakan coba lagi.' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register new user
   * @param {string} name - User name
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Result object with success status
   */
  const register = async (name, email, password) => {
    try {
      setLoading(true);

      // Call API
      const userData = await apiRegister(name, email, password);
      
      if (!userData) {
        throw new Error('Invalid response from server');
      }

      // Save to state
      setUser(userData);
      setIsAuthenticated(true);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_KEYS.TOKEN, userData.token);

      return { 
        success: true, 
        user: userData 
      };
    } catch (error) {
      console.error('Register error:', error);
      return { 
        success: false, 
        error: error.message || 'Registrasi gagal. Silakan coba lagi.' 
      };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);

      // Call API (optional, for backend logout)
      await apiLogout();

      // Clear state
      setUser(null);
      setIsAuthenticated(false);

      // Clear localStorage
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);

      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      
      // Force logout even if API call fails
      setUser(null);
      setIsAuthenticated(false);
      localStorage.clear();

      return { success: true };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update user profile
   * @param {Object} updates - User data to update
   */
  const updateUser = (updates) => {
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser));
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error('Update user error:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean}
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user is admin
   * @returns {boolean}
   */
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  /**
   * Check if user is moderator
   * @returns {boolean}
   */
  const isModerator = () => {
    return user?.role === 'moderator';
  };

  /**
   * Get user initials for avatar
   * @returns {string}
   */
  const getUserInitials = () => {
    if (!user?.name) return '?';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const value = {
    // State
    user,
    isAuthenticated,
    loading,

    // Methods
    login,
    register,
    logout,
    updateUser,
    hasRole,
    isAdmin,
    isModerator,
    getUserInitials,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
