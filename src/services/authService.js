import { apiClient } from "../utils/apiClient";

// Register new user
export const register = async (userData) => {
    const response = await apiClient.post("/users/register", userData);
    return response;
};

// Login user -> returns JWT + user info
export const login = async (credentials) => {
    const response = await apiClient.post("/users/login", credentials);

    // API expected to return { token, user }
    if (response.data?.token) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
};

// Logout user -> clear localStorage
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Get current user from localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};