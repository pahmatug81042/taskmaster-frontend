import { apiClient } from "../utils/apiClient";

// Register new user
export const register = async (userData) => {
    const response = await apiClient.post("/users/register", userData);
    return response;
};

// Login user -> returns JWT + user info
export const login = async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);
    if (response.token) {
        // persist token in localStorage
        localStorage.setItem("token", JSON.stringify(response.token));
        localStorage.setItem("user", JSON.stringify(response));
    }
    return response;
};

// Logout user -> clear localStorage
export const logout = () => {
    localStorage.removeItem("token");
};

// Get current user from localStorage
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};