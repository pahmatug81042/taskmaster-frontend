import { useState } from "react";
import DOMPurify from "dompurify";
import projectService from "../../services/projectService";

/**
 * ProjectItem Component
 * Standalone project card with edit/delete functionality.
 */
const ProjectItem = ({ project, isSelected, onSelect, onUpdate, onDelete }) => {
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
      const payload = {
        name: DOMPurify.sanitize(formData.name.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
      };
      const updatedProject = await projectService.updateProject(
        project._id,
        payload
      );
      onUpdate && onUpdate(updatedProject);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await projectService.deleteProject(project._id);
      onDelete && onDelete(project._id);
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  return (
    <div
      className={`project-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect && onSelect(project._id)}
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
    </div>
  );
};

export default ProjectItem;