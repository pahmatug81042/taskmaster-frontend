import { useState } from "react";
import taskService from "../../services/taskService";

const TaskItem = ({ task, projectId, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            const updated = await taskService.updateTask(projectId, task._id, formData);
            setTasks((prev) => prev.map((t) => (t._id === task._id ? updated : t)));
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update task", err);
        }
    };

    const handleDelete = async () => {
        try {
            await taskService.deleteTask(projectId, task._id);
            setTasks((prev) => prev.filter((t) => t._id !== task._id));
        } catch (err) {
            console.error("Failed to delete task", err);
        }
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <>
                    <input 
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Task Title"
                    />
                    <textarea 
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Task Description"
                    />
                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </>
            ) : (
                <>
                    <h4>{task.title}</h4>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
    );
};

export default TaskItem;