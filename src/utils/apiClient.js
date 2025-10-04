import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    timeout: 15000,
});

// Attach token to each request (read from localStorage)
apiClient.interceptors.request.use(
    (config) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                // Token stored as plain string
                config.headers.Authorization = `Bearer ${token}`;
            }
            // Force JSON content-type for application/json requests
            if (!config.headers["Content-Type"] && config.data) {
                config.headers["Content-Type"] = "application/json";
            }
        } catch (error) {
            // Swallows errors from localStorage access
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor: return response.data consistently,
// handle 401 by clearing localStorage and optimally reloading.
apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) {
            // clear local auth state on unauthorized
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // avoid auto-navigation here = let contexts/pages decide
        }
        return Promise.reject(error);
    }
);

export default apiClient;