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

// Login user - backend sets HttpOnly cookie
export const login = async (credentials) => {
    const payload = {
        email: sanitizeString(credentials.email),
        password: credentials.password ? String(credentials.password) : "",
    };

    await apiClient.post("/users/login", payload);
    // Login succeeds if HTTP status is 200; we don't rely on returned body

    // Fetch current user after login
    const user = await getCurrentUserFromServer();
    if (user) localStorage.setItem("user", JSON.stringify(user));

    return user;
};

// Logout user - clears HttpOnly cookie on backend
export const logout = async () => {
    try {
        await apiClient.post("/users/logout");
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

// Fetch current user from backend
export const getCurrentUserFromServer = async () => {
    try {
        const user = await apiClient.get("/users/me"); // your backend must return user info
        return user;
    } catch {
        return null;
    }
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentUserFromServer,
};