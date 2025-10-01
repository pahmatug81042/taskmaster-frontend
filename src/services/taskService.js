import { apiClient } from "../utils/apiClient";

// Create task under a project
const createTask = async (projectId, taskData) => {
    return apiClient.post(`/projects/${projectId}/tasks`, taskData, { auth: true });
};

// Get all tasks for a project
const getTasks = async (projectId) => {
    return apiClient.get(`/projects/${projectId}/tasks`, { auth: true });
};

// Get single task by ID
const getTaskById = async (projectId, taskId) => {
    return apiClient.get(`/projects/${projectId}/tasks/${taskId}`, { auth: true });
};

// Update task
const updateTask = async (projectId, taskId, taskData) => {
    return apiClient.put(`/projects/${projectId}/tasks/${taskId}`, taskData, { auth: true });
};

// Delete task
const deleteTask = async (projectId, taskId) => {
    return apiClient.delete(`/projects/${projectId}/tasks/${taskId}`, { auth: true });
};

export default {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};