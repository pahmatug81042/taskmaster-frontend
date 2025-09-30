import { apiClient } from "../utils/apiClient";

// Get all tasks for a specific project
export const getTasks = async (projectId) => {
    return apiClient.get(`/projects/${projectId}/tasks`);
};

// Create a new task under a project
export const createTask = async (projectId, taskData) => {
    return apiClient.post(`/projects/${projectId}/tasks`, taskData);
};

// Get a single task by ID
export const getTaskById = async (projectId, taskId) => {
    return apiClient.get(`/projects/${projectId}/tasks/${taskId}`);
};

// Update a task
export const updateTask = async (projectId, taskId, taskData) => {
    return apiClient.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
};

// Delete a task
export const deleteTask = async (projectId, taskId) => {
    return apiClient.delete(`/projects/${projectId}/tasks/${taskId}`);
};