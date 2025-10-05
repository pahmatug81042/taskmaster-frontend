import DOMPurify from "dompurify";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { useTasks } from "../../contexts/TaskContext";

/**
 * TaskList Component
 * Uses TaskContext to display tasks for the selected project.
 * Tasks update automatically when added, edited, or deleted.
 */
const TaskList = () => {
  const { tasks, currentProjectId } = useTasks();

  if (!currentProjectId) {
    return <p>Please select a project to view its tasks.</p>;
  }

  return (
    <div className="task-list">
      <h3>Tasks</h3>
      <TaskForm projectId={currentProjectId} />
      {tasks.length === 0 ? (
        <p>No tasks found for this project yet.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={{
              ...task,
              title: DOMPurify.sanitize(task.title),
              description: DOMPurify.sanitize(task.description),
              status: DOMPurify.sanitize(task.status),
            }}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;