import DOMPurify from "dompurify";
import ProjectItem from "./ProjectItem";
import { useProjects } from "../../contexts/ProjectContext";
import { useTasks } from "../../contexts/TaskContext";

/**
 * ProjectList Component
 * Renders all user projects from ProjectContext,
 * highlights the selected project, and fetches tasks via TaskContext.
 */
const ProjectList = () => {
  const { projects } = useProjects();
  const { currentProjectId, setCurrentProjectId, fetchTasks } = useTasks();

  if (!projects || projects.length === 0) {
    return <p>No projects found. Start by creating one!</p>;
  }

  const handleSelect = (projectId) => {
    setCurrentProjectId(projectId);
    fetchTasks(projectId); // Fetch tasks for the selected project
  };

  return (
    <div className="project-list">
      {projects.map((project) => {
        const isSelected = project._id === currentProjectId;

        return (
          <div
            key={project._id}
            className={`project-item-wrapper ${isSelected ? "selected" : ""}`}
            onClick={() => handleSelect(project._id)}
            data-name={DOMPurify.sanitize(project.name)}
          >
            <ProjectItem
              project={{
                ...project,
                name: DOMPurify.sanitize(project.name),
                description: DOMPurify.sanitize(project.description),
              }}
              isSelected={isSelected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;