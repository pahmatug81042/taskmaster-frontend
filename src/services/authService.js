import apiClient from "../utils/apiClient";
import { sanitizeString } from "../utils/sanitize";

// Register new user
export const register = async (userData) => {
    const payload = {
        username: sanitizeString(userData.username),
        email: sanitizeString(userData.email),
        password: userData.password ? String(userData.password) : "",
    };

    const data = await apiClient.post("/users/register", payload);
    return data;
};

// Login user (backend sets HttpOnly cookie)
export const login = async (credentials) => {
    const payload = {
        email: sanitizeString(credentials.email),
        password: credentials.password ? String(credentials.password) : "",
    };

    const data = await apiClient.post("/users/login", payload);
    if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
};

// Logout user - clears cookie vua backend endpoint
export const logout = async () => {
    try {
        await apiClient.post("/users/logout"); // backend clears cookie
    } catch (error) {
        console.warn("Logout request failed:", error.message);
    } finally {
        localStorage.removeItem("user");
    }
};

// Get current user from localStorage
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        localStorage.removeItem("user");
        return null;
    }
};