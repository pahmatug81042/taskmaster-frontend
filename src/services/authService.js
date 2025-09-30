import { apiClient } from "../utils/apiClient";

export const register = async (userData) => {
    return apiClient.post("/users/register", userData);
};

export const login = async (userData) => {
    return apiClient.post("/users/login", userData);
};