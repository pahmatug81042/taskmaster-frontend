import { useState } from "react";
import DOMPurify from "dompurify";
import taskService from "../../services/taskService";

/**
 * TaskItem Component
 * Standalone task card with edit/delete functionality.
 */
const TaskItem = ({ task, projectId, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(task);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        title: DOMPurify.sanitize(formData.title.trim()),
        description: DOMPurify.sanitize(formData.description.trim()),
        status: DOMPurify.sanitize(formData.status.trim()),
      };
      const updatedTask = await taskService.updateTask(
        projectId,
        task._id,
        payload
      );
      onUpdate && onUpdate(updatedTask);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await taskService.deleteTask(projectId, task._id);
      onDelete && onDelete(task._id);
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
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <select name="status" value={formData.status} onChange={handleChange}>
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
          <h4
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(task.title) }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(task.description),
            }}
          />
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