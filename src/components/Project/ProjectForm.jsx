import { useState } from "react";
import projectService from "../../services/projectService";
import Input from "../common/Input";
import Button from "../common/Button";
import DOMPurify from "dompurify"; // DOMPurify for sanitation

/**
 * ProjectForm Component
 * Allows users to create new projects securely.
 * Automatically sanitizes all user inputs with DOMPurify to prevent XSS attacks.
 */
const ProjectForm = ({ setProjects }) => {
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [loading, setLoading] = useState(false);

    // Handle input changes with safe value updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission securely
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sanitize user input before sending to backend
            const payload = {
                name: DOMPurify.sanitize(formData.name.trim()),
                description: DOMPurify.sanitize(formData.description.trim()),
            };

            const newProject = await projectService.createProject(payload);

            // Update local state with new project
            setProjects((prev) => [...prev, newProject]);

            // Reset form after successful submission
            setFormData({ name: "", description: "" });
        } catch (error) {
            console.error("Failed to create project:", error);
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