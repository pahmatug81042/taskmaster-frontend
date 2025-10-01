/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from "react";
import * as projectService from "../services/projectService";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
    const { token } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch projects on mount (if logged in)
    useEffect(() => {
        if (token) {
            fetchProjects();
        } else {
            setProjects([]);
        }
    }, [token]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const data = await projectService.getProjects();
            setProjects(data);            
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const addProject = async (projectData) => {
        const newProject = await projectService.createProject(projectData);
        setProjects((prev) => [...prev, newProject]);
    };

    const updateProject = async (id, updates) => {
        const updated = await projectService.updateProject(id, updates);
        setProjects((prev) => 
            prev.map((proj) => (proj._id === id ? updated : proj))
        );
    };

    const deleteProject = async (id) => {
        await projectService.deleteProject(id);
        setProjects((prev) => prev.filter((proj) => proj._id !== id));
    };

    const value = {
        projects,
        loading,
        fetchProjects,
        addProject,
        updateProject,
        deleteProject,
    };

    return (
        <ProjectContext.Provider value={value}>
            {children}
        </ProjectContext.Provider>
    );
};