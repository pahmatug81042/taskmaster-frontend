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
    // do not store token on register (backend policy)
    return data;
};

// Login user -> returns { token, ...user }
export const login = async (credentials) => {
    const payload = {
        email: sanitizeString(credentials.email),
        password: credentials.password ? String(credentials.password) : "",
    };

    const data = await apiClient.post("/users/login", payload);

    if (data?.token) {
        // store token as plain string (not JSON-ified), store user object separately
        localStorage.setItem("token", data.token);
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }
    }
    return data;
};

// Logout user -> clear localStorage
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

// Get current user from localStorage
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error(error);
        localStorage.removeItem("user");
        return null;
    }
};