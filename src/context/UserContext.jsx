/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem("token");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Persist user to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("token", JSON.stringify(user));
        } else {
            localStorage.removeItem("token");
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};