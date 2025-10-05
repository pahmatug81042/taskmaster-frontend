import { useState } from "react";
import DOMPurify from "dompurify"; // Sanitize inputs before update
import projectService from "../../services/projectService";
import TaskList from "../Task/TaskList";

/**
 * ProjectItem Component
 * Displays a project with edit/delete options and its related TaskList.
 * Ensures safe editing via DOMPurify to prevent XSS vulnerabilities.
 */
const ProjectItem = ({ project, setProjects }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
    });

    // Handle form input safely
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Securely update the project
    const handleUpdate = async () => {
        try {
            const sanitizedData = {
                name: DOMPurify.sanitize(formData.name.trim()),
                description: DOMPurify.sanitize(formData.description.trim()),
            };

            const updated = await projectService.updateProject(project._id, sanitizedData);

            // Replace project with updated version in state
            setProjects((prev) => 
                prev.map((p) => (p._id === project._id ? updated: p))
            );

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update project:", error);
        }
    };

    // Delete project safely
    const handleDelete = async () => {
        try {
            await projectService.deleteProject(project._id);
            setProjects((prev) => prev.filter((p) => p._id !== project._id));
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <div className="project-item">
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
                    {/* Sanitize display output to prevent script injection */}
                    <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.name) }} />
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.description) }} />
                    <div className="edit-actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}

            {/* Render related task list */}
            <TaskList projectId={project._id} />
        </div>
    );
};

export default ProjectItem;