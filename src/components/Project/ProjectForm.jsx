import { useState } from "react";
import projectService from "../../services/projectService";

const ProjectForm = ({ setProjects }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newProject = await projectService.createProject(formData);
            setProjects((prev) => [...prev, newProject]);
            setFormData({ name: "", description: "" });
        } catch (error) {
            console.error("Failed tp create project", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Project Name"
                required
            />
            <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
            />
            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Add Project"}
            </button>
        </form>
    );
};

export default ProjectForm;