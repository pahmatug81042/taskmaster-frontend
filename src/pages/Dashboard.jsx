import { useState, useEffect, useCallback } from "react";
import ProjectList from "../components/Project/ProjectList";
import ProjectForm from "../components/Project/ProjectForm";
import projectService from "../services/projectService";

/**
 * Dashboard Component
 * Standalone dashboard managing projects and tasks without context.
 */
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all projects
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await projectService.getProjects();
      setProjects(data || []);
      if (data && data.length > 0 && !selectedId) setSelectedId(data[0]._id);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Handlers for project CRUD
  const handleAddProject = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setSelectedId(newProject._id); // auto-select newly added project
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );
  };

  const handleDeleteProject = (deletedId) => {
    setProjects((prev) => prev.filter((p) => p._id !== deletedId));
    if (deletedId === selectedId) setSelectedId(null);
  };

  return (
    <div className="dashboard-container">
      <h1>My Projects</h1>

      {loading && <p>Loading Projects...</p>}
      {!loading && projects.length === 0 && (
        <p>No projects yet. Create one below!</p>
      )}

      {!loading && projects.length > 0 && (
        <ProjectList
          projects={projects}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onUpdate={handleUpdateProject}
          onDelete={handleDeleteProject}
        />
      )}

      <ProjectForm onAdd={handleAddProject} />
    </div>
  );
};

export default Dashboard;