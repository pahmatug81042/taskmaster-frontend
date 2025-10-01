import { useState } from "react";
import projectService from "../../services/projectService";
import TaskList from "../Task/TaskList";

const ProjectItem = ({ project, setProjects }) => {
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
            const updated = await projectService.updateProject(project._id, formData);
            setProjects((prev) => 
                prev.map((p) => (p._id === project._id ? updated : p))
            );
            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update project", error);
        }
    };

    const handleDelete = async () => {
        try {
            await projectService.deleteProject(project._id);
            setProjects((prev) => prev.filter((p) => p._id !== project._id));
        } catch (error) {
            console.error("Failed to delete project", error);
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

            {/* TaskList Integration */}
            <TaskList projectId={project._id} />
        </div>
    );
};

export default ProjectItem;