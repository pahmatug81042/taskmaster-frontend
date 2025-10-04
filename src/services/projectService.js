import apiClient from "../utils/apiClient";
import { sanitizeString } from "../utils/sanitize";

export const createProject = async (projectData) => {
    const payload = {
        name: sanitizeString(projectData.name),
        description: sanitizeString(projectData.description || ""),
    };
    return apiClient.post("/projects", payload);
};

export const getProjects = async () => {
    return apiClient.get("/projects");
};

export const getProjectById = async (projectId) => {
    return apiClient.get(`/projects/${encodeURIComponent(projectId)}`);
};

export const updateProject = async (projectId, projectData) => {
    const payload = {
        name: sanitizeString(projectData.name),
        description: sanitizeString(projectData.description || ""),
    };
    return apiClient.put(`/projects/${encodeURIComponent(projectId)}`, payload);
};

export const deleteProject = async (projectId) => {
    return apiClient.delete(`/projects/${encodeURIComponent(projectId)}`);
};

export default {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
};