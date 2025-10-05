/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import * as authService from "../services/authService";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  // Ensure current user is fetched on mount (for refresh persistence)
  useEffect(() => {
    const fetchUser = async () => {
      const serverUser = await authService.getCurrentUserFromServer();
      if (serverUser) setUser(serverUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const userFromServer = await authService.login(credentials);
    if (userFromServer) setUser(userFromServer);
    return userFromServer;
  };

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};