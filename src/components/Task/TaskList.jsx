/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import DOMPurify from "dompurify"; // For safe rendering
import taskService from "../../services/taskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

/**
 * TaskList Component
 * Handles fetching, rendering, and sanitizing task data for a given project.
 * Protects against injected or tampered task payloads.
 */
const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);

    // Fetch all tasks for a project
    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks(projectId);
            // Sanitize all fetched data before rendering
            const sanitizedTasks = data.map((task) => ({
                ...task,
                title: DOMPurify.sanitize(task.title),
                description: DOMPurify.sanitize(task.description),
                status: DOMPurify.sanitize(task.status),
            }));
            setTasks(sanitizedTasks);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    return (
        <div className="task-list">
            <h3>Tasks</h3>
            <TaskForm projectId={projectId} setTasks={setTasks} />
            {tasks.length === 0 ? (
                <p>No tasks found for this project yet.</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem 
                        key={task._id}
                        task={task}
                        projectId={projectId}
                        setTasks={setTasks}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;