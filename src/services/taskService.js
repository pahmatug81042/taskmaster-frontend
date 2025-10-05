import apiClient from "../utils/apiClient";
import DOMPurify from "dompurify";

// Ensure cookies are sent with requests
apiClient.defaults.withCredentials = true;

const createTask = async (projectId, taskData) => {
    const payload = {
        title: DOMPurify.sanitize(taskData.title?.trim() || ""),
        description: DOMPurify.sanitize(taskData.description?.trim() || ""),
        status: DOMPurify.sanitize(taskData.status?.trim() || "To Do"),
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
        title: DOMPurify.sanitize(taskData.title?.trim() || ""),
        description: DOMPurify.sanitize(taskData.description?.trim() || ""),
        status: DOMPurify.sanitize(taskData.status?.trim() || ""),
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