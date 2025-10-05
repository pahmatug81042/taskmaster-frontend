/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import * as taskService from "../services/taskService";
import { useAuth } from "./AuthContext";
import { useProjects } from "./ProjectContext";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { projects } = useProjects();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  // Automatically set the current project to the first project (or null)
  useEffect(() => {
    if (projects.length > 0) {
      setCurrentProjectId(projects[0]._id);
    } else {
      setCurrentProjectId(null);
      setTasks([]);
    }
  }, [projects]);

  // Fetch tasks for the selected project
  const fetchTasks = useCallback(
    async (projectId = currentProjectId) => {
      if (!isAuthenticated || !projectId) {
        setTasks([]);
        return;
      }

      setLoading(true);
      try {
        const data = await taskService.getTasks(projectId);
        setTasks(data || []);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, currentProjectId]
  );

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks, currentProjectId]);

  const addTask = async (taskData) => {
    if (!currentProjectId) return null;
    const newTask = await taskService.createTask(currentProjectId, taskData);
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  };

  const updateTask = async (taskId, updates) => {
    if (!currentProjectId) return null;
    const updated = await taskService.updateTask(
      currentProjectId,
      taskId,
      updates
    );
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updated : t)));
    return updated;
  };

  const deleteTask = async (taskId) => {
    if (!currentProjectId) return;
    await taskService.deleteTask(currentProjectId, taskId);
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
  };

  const value = {
    tasks,
    loading,
    currentProjectId,
    setCurrentProjectId,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};