import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import taskService from "../../services/taskService";

/**
 * TaskList Component
 * Standalone list of tasks for a given project.
 */
const TaskList = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getTasks(projectId);
      setTasks(data || []);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    if (projectId) fetchTasks();
  }, [projectId]);

  const handleAdd = (newTask) => setTasks((prev) => [...prev, newTask]);
  const handleUpdate = (updatedTask) =>
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  const handleDelete = (deletedId) =>
    setTasks((prev) => prev.filter((t) => t._id !== deletedId));

  if (!projectId) return <p>Select a project to view tasks.</p>;

  return (
    <div className="task-list">
      <TaskForm projectId={projectId} onAdd={handleAdd} />
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            projectId={projectId}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;