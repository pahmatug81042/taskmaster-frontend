import { useState } from "react";
import projectService from "../../services/projectService";

const ProjectItem = ({ project, setProjects }) => {
    // Local state for edit mode
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Save updates to backend
    const handleUpdate = async () => {
        try {
            const updated = await projectService.updateProject(project._id, formData);
            setProjects((prev) => 
                prev.map((p) => (p._id === project._id ? updated : p))
            );
            setIsEditing(false); // exit edit mode
        } catch (err) {
            console.error("Failed to update project", err);
        }
    };

    // Delete project
    const handleDelete = async () => {
        try {
            await projectService.deleteProject(project._id);
            setProjects((prev) => prev.filter((p) => p._id !== project._id));
        } catch (err) {
            console.error("Failed to delete project", err);
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
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
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