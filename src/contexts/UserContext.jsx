/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user: authUser, isAuthenticated } = useAuth();
    const [user, setUser] = useState(authUser);

    useEffect(() => {
        setUser(authUser);
    }, [authUser]);

    const value = {
        user,
        isAuthenticated,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};