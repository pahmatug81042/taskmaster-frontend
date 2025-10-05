import { useEffect } from "react";
import { useProjects } from "../contexts/ProjectContext";
import { useTasks } from "../contexts/TaskContext";
import ProjectList from "../components/Project/ProjectList";
import ProjectForm from "../components/Project/ProjectForm";
import TaskList from "../components/Task/TaskList";

/**
 * Dashboard Component
 * Fully reactive dashboard showing projects and tasks
 * using ProjectContext and TaskContext without local state.
 */
const Dashboard = () => {
  const { projects, loading: projectsLoading, fetchProjects } = useProjects();
  const {
    currentProjectId,
    tasks,
    loading: tasksLoading,
    fetchTasks,
  } = useTasks();

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Fetch tasks whenever the selected project changes
  useEffect(() => {
    if (currentProjectId) {
      fetchTasks(currentProjectId);
    }
  }, [currentProjectId, fetchTasks]);

  return (
    <div className="dashboard-container">
      <h1>My Projects</h1>

      {projectsLoading && <p>Loading Projects...</p>}
      {!projectsLoading && projects.length === 0 && (
        <p>No projects yet. Create one below!</p>
      )}

      {!projectsLoading && projects.length > 0 && <ProjectList />}

      <ProjectForm />

      {currentProjectId && (
        <div className="task-section">
          <h2>Tasks for Selected Project</h2>
          {tasksLoading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;