import apiClient from "../utils/apiClient";
import { sanitizeString } from "../utils/sanitize";

const createTask = (projectId, taskData) => {
    const payload = {
        title: sanitizeString(taskData.title),
        description: sanitizeString(taskData.description || ""),
        status: sanitizeString(taskData.status || "To Do"),
        priority: taskData.priority ? sanitizeString(taskData.priority) : undefined,
    };
    return apiClient.post(`/projects/${encodeURIComponent(projectId)}/tasks`, payload);
};

const getTasks = async (projectId) => {
    return apiClient.get(`/projects/${encodeURIComponent(projectId)}/tasks`);
};

const getTaskById = async (projectId, taskId) => {
    return apiClient.get(
        `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`
    );
};

const updateTask = async (projectId, taskId, taskData) => {
    const payload = {
        title: sanitizeString(taskData.title),
        description: sanitizeString(taskData.description || ""),
        status: sanitizeString(taskData.status || ""),
        priority: taskData.priority ? sanitizeString(taskData.priority) : undefined,
    };
    return apiClient.put(
        `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`, payload
    );
};

const deleteTask = async (projectId, taskId) => {
    return apiClient.delete(
        `/projects/${encodeURIComponent(projectId)}/tasks/${encodeURIComponent(taskId)}`
    );
};

export default {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};