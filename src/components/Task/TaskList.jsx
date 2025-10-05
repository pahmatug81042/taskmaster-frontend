import DOMPurify from "dompurify";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { useTasks } from "../../contexts/TaskContext";

/**
 * TaskList Component
 * Fully context-driven: displays tasks from TaskContext
 * for the currently selected project.
 * Automatically updates when tasks change in context.
 */
const TaskList = () => {
  const { tasks, currentProjectId } = useTasks();

  if (!currentProjectId) {
    return <p>Please select a project to view its tasks.</p>;
  }

  return (
    <div className="task-list">
      <h3>Tasks</h3>
      {/* TaskForm automatically adds tasks to context */}
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