import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
    withCredentials: true, // Allow sending/receiving HttpOnly cookies
});

// Intercept responses to unwrap data consistently
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) {
            // Auth expired - let AuthContext handle logout UI
            console.warn("Session expired or unauthorized.");
        }
        return Promise.reject(error);
    }
);

export default apiClient;