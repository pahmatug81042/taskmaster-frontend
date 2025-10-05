import { useState, useEffect, useCallback } from "react";
import ProjectItem from "./ProjectItem";
import ProjectForm from "./ProjectForm";
import projectService from "../../services/projectService";
import TaskList from "../Task/TaskList";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
      if (data.length > 0 && !selectedId) setSelectedId(data[0]._id);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, [selectedId]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleUpdate = (updatedProject) =>
    setProjects((prev) =>
      prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
    );

  const handleDelete = (deletedId) => {
    setProjects((prev) => prev.filter((p) => p._id !== deletedId));
    if (deletedId === selectedId) setSelectedId(null);
  };

  if (!projects || projects.length === 0) return <p>No projects found.</p>;

  return (
    <div className="project-list">
      {projects.map((project) => (
        <div
          key={project._id}
          className={`project-item-wrapper ${
            project._id === selectedId ? "selected" : ""
          }`}
        >
          <ProjectItem
            project={project}
            isSelected={project._id === selectedId}
            onSelect={() => setSelectedId(project._id)}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />

          {project._id === selectedId && <TaskList projectId={project._id} />}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;