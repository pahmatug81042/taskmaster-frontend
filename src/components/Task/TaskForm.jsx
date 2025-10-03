import { useState } from "react";
import taskService from "../../services/taskService";
import Input from "../common/Input";
import Button from "../common/Button";

const TaskForm = ({ projectId, setTasks }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "To Do",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = await taskService.createTask(projectId, formData);
            setTasks((prev) => [...prev, newTask]);
            setFormData({ title: "", description: "", status: "To Do" });
        } catch (error) {
            console.error("Failed to create task", error);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
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
            <Button>Add Task</Button>
        </form>
    );
};

export default TaskForm;