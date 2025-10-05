import apiClient from "../utils/apiClient";
import DOMPurify from "dompurify";

// Ensure cookies are sent with requests
apiClient.defaults.withCredentials = true;

export const createProject = async (projectData) => {
    const payload = {
        name: DOMPurify.sanitize(projectData.name?.trim() || ""),
        description: DOMPurify.sanitize(projectData.description?.trim() || ""),
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
        name: DOMPurify.sanitize(projectData.name?.trim() || ""),
        description: DOMPurify.sanitize(projectData.description?.trim() || ""),
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