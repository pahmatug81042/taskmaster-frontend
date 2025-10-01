/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth();

    // Additional user-related logic could be added here (profile updates, settings, etc.)
    const value = {
        user,
        isAuthenticated,
    };

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
};