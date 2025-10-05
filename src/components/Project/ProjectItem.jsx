import { useState } from "react";
import DOMPurify from "dompurify";
import { useProjects } from "../../contexts/ProjectContext";
import { useTasks } from "../../contexts/TaskContext";
import TaskList from "../Task/TaskList";

/**
 * ProjectItem Component
 * Fully context-driven: updates projects and tasks via ProjectContext and TaskContext.
 */
const ProjectItem = ({ project, isSelected }) => {
  const { updateProject, deleteProject } = useProjects();
  const { setCurrentProjectId, fetchTasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const sanitizedData = {
        name: DOMPurify.sanitize(formData.name.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
      };

      await updateProject(project._id, sanitizedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProject(project._id);

      if (isSelected) {
        setCurrentProjectId(null);
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleSelect = () => {
    setCurrentProjectId(project._id);
    fetchTasks(project._id);
  };

  return (
    <div
      className={`project-item ${isSelected ? "selected" : ""}`}
      onClick={handleSelect}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Project Name"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(project.name),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(project.description),
            }}
          />
          <div className="edit-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}

      {isSelected && <TaskList />}
    </div>
  );
};

export default ProjectItem;