import { useState } from "react";
import taskService from "../../services/taskService";
import Input from "../common/Input";
import Button from "../common/Button";
import DOMPurify from "dompurify"; // DOMPurify for sanitation

/**
 * TaskForm Component
 * Handles creating new tasks securely within a project.
 * Uses DOMPurify to sanitize all user input, preventing XSS injection.
 */
const TaskForm = ({ projectId, setTasks }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "To Do",
    });
    const [loading, setLoading] = useState(false);

    // Handle input change safely
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Secure submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Sanitize all user input fields
            const payload = {
                title: DOMPurify.sanitize(formData.title.trim()),
                description: DOMPurify.sanitize(formData.description.trim()),
                status: DOMPurify.sanitize(formData.status.trim()),
            };

            const newTask = await taskService.createTask(projectId, payload);

            // Update UI optimistically
            setTasks((prev) => [...prev, newTask]);

            // Reset form fields
            setFormData({ title: "", description: "", status: "To Do" });
        } catch (error) {
            console.error("Failed to create task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit} noValidate>
            <Input 
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Task Title"
                required
            />
            <Input 
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task Description"
                required
            />
            <Input as="select" name="status" value={formData.status} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </Input>
            <Button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Add Task"}
            </Button>
        </form>
    );
};

export default TaskForm;