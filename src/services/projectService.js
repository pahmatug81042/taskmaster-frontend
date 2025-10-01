import { apiClient } from "../utils/apiClient";

// Create new project
export const createProject = async (projectData) => {
    return apiClient.post("/projects", projectData, { auth: true });
};

// Get all projects for logged-in user
export const getProjects = async () => {
    return apiClient.get("/projects", { auth: true });
};

// Get single project by ID
export const getProjectById = async (projectId) => {
    return apiClient.get(`/projects/${projectId}`, { auth: true });
};

// Update project
export const updateProject = async (projectId, projectData) => {
    return apiClient.put(`/projects/${projectId}`, projectData, { auth: true });
};

// Delete project
export const deleteProject = async (projectId) => {
    return apiClient.delete(`/projects/${projectId}`, { auth: true });
};