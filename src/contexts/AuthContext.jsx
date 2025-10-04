/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import * as authService from "../services/authService";
import apiClient from "../utils/apiClient";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const u = localStorage.getItem("user");
            return u ? JSON.parse(u) : null;
        } catch {
            return null;
        }
    });

    const [token, setToken] = useState(() => {
        try {
            return localStorage.getItem("token") || null;
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    // Login wrapper: saves token + user via authService
    const login = async (credentials) => {
        const data = await authService.login(credentials);
        if (data?.token) {
            setToken(data.token);
            if (data.user) setUser(data.user);
        }
        return data;
    };

    // Register user
    const register = async (userData) => {
        return await authService.register(userData);
    };

    // Logout wrapper
    const logout = () => {
        authService.logout();
        setToken(null);
        setUser(null);
        // also clear axios auth header (apiClient reads localStorage, but we can remove any lingering header)
        if (apiClient.defaults.headers) {
            delete apiClient.defaults.headers.common?.Authorization;
        }
    };
    
    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};