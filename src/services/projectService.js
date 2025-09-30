import { apiClient } from "../utils/apiClient";

export const getProjects = async () => {
    return apiClient.get("/projects");
};

export const createProject = async (projectData) => {
    return apiClient.post("/projects", projectData);
};

export const getProjectById = async (projectId) => {
    return apiClient.get(`/projects/${projectId}`);
};

// Update a project
export const updateProject = async (projectId, projectData) => {
    return apiClient.put(`/projects/${projectId}`, projectData);
};

// Delete a project
export const deleteProject = async (projectId) => {
    return apiClient.delete(`/projects/${projectId}`);
};