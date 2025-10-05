import { useState } from "react";
import DOMPurify from "dompurify";
import Input from "../common/Input";
import Button from "../common/Button";
import taskService from "../../services/taskService";

/**
 * TaskForm Component
 * Standalone form for creating tasks.
 */
const TaskForm = ({ projectId, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectId) return;

    setLoading(true);
    try {
      const payload = {
        title: DOMPurify.sanitize(formData.title.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
        status: DOMPurify.sanitize(formData.status.trim()),
      };
      const newTask = await taskService.createTask(projectId, payload);
      onAdd && onAdd(newTask);
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
      <Input
        as="select"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
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