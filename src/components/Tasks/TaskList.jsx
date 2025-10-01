/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import taskService from "../../services/taskService";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = ({ projectId }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getTasks(projectId);
            setTasks(data);
        } catch (error) {
            console.error("Failed to fetch tasks", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    return (
        <div className="task-list">
            <h3>Tasks</h3>
            <TaskForm projectId={projectId} setTasks={setTasks} />
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} projectId={projectId} setTasks={setTasks} />
            ))}
        </div>
    );
};

export default TaskList;