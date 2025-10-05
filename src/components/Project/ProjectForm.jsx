import { useState } from "react";
import DOMPurify from "dompurify";
import Input from "../common/Input";
import Button from "../common/Button";
import projectService from "../../services/projectService";

/**
 * ProjectForm Component
 * Standalone form for creating a project without context.
 */
const ProjectForm = ({ onAdd }) => {
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
        name: DOMPurify.sanitize(formData.name.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
      };
      const newProject = await projectService.createProject(payload);
      onAdd && onAdd(newProject);
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