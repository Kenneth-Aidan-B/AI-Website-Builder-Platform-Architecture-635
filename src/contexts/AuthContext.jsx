import React, { createContext, useContext, useState, useEffect } from 'react';
import { xanoClient } from '../config/xano';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const token = localStorage.getItem('xano_token');
      
      if (!token) {
        setLoading(false);
        return;
      }

      // Verify token and get user data
      const userData = await xanoClient.getCurrentUser();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear invalid token
      localStorage.removeItem('xano_token');
      xanoClient.removeToken();
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    try {
      const userData = await xanoClient.signup(email, password);
      setCurrentUser(userData);
      toast.success('Account created successfully! You received 2M free Builder Tokens.');
      return userData;
    } catch (error) {
      toast.error(error.message || 'Failed to create account');
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await xanoClient.login(email, password);
      setCurrentUser(userData);
      toast.success('Logged in successfully!');
      return userData;
    } catch (error) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await xanoClient.logout();
      setCurrentUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to logout');
      throw error;
    }
  };

  const hasPermission = (permission) => {
    if (!currentUser) return false;
    if (currentUser.isAdmin) return true;
    return currentUser.permissions?.includes(permission) || false;
  };

  const isAdmin = () => {
    return currentUser?.isAdmin || false;
  };

  const isSuperAdmin = () => {
    return currentUser?.isAdmin || false; // Adjust based on your Xano user roles
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
    hasPermission,
    isAdmin: isAdmin(),
    isSuperAdmin: isSuperAdmin(),
    userRole: currentUser?.isAdmin ? 'admin' : 'user',
    userPermissions: currentUser?.permissions || []
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};