import { useState } from "react";
import DOMPurify from "dompurify"; // For sanitizing task input
import taskService from "../../services/taskService";

/**
 * TaskItem Component
 * Displays an individual task with edit/delete functionality.
 * Uses DOMPurify for sanitizing both editable fields and displayed content.
 */
const TaskItem = ({ task, projectId, setTasks }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description,
        status: task.status,
    });

    // Handle safe input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Securely update the task
    const handleUpdate = async () => {
        try {
            const sanitizedData = {
                title: DOMPurify.sanitize(formData.title.trim()),
                description: DOMPurify.sanitize(formData.description.trim()),
                status: DOMPurify.sanitize(formData.status.trim()),
            };

            const updated = await taskService.updateTask(projectId, task._id, sanitizedData);

            // Update state with sanitized task
            setTasks((prev) => 
                prev.map((t) => (t._id === task._id ? updated : t))
            );

            setIsEditing(false);
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    // Delete task safely
    const handleDelete = async () => {
        try {
            await taskService.deleteTask(projectId, task._id);
            setTasks((prev) => prev.filter((t) => t._id !== task._id));
        } catch (error) {
            console.error("Failed to delete task:", error);
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
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    <div className="edit-actions">
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    {/* Render sanitized task content safely */}
                    <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.title) }} />
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.description) }} />
                    <p>Status: {DOMPurify.sanitize(task.status)}</p>

                    <div className="edit-actions">
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskItem;