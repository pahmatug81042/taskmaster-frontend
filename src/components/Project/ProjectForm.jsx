import { useState } from "react";
import projectService from "../services/projectService";
import Input from "../common/Input";
import Button from "../common/Button";
import { sanitizeString } from "../../utils/sanitize";

const ProjectForm = ({ setProjects }) => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                name: sanitizeString(formData.name),
                description: sanitizeString(formData.description),
            };
            const newProject = await projectService.createProject(payload);
            setProjects((prev) => [...prev, newProject]);
            setFormData({ name: "", description: "" });
        } catch (error) {
            console.error("Failed to create project", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="project-form" onSubmit={handleSubmit} noValidate>
            <Input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Project Name"
                required
            />
            <Input 
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Project Description"
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Add Project"}
            </Button>
        </form>
    );
};

export default ProjectForm;