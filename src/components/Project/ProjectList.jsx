import DOMPurify from "dompurify"; // Import DOMPurify for safe rendering
import ProjectItem from "./ProjectItem";

/**
 * ProjectList Component
 * Renders all user projects safely and prevents any XSS risks
 * by sanitizing project names before rendering.
 */
const ProjectList = ({ projects, setProjects }) => {
    if (!projects || projects.length === 0) {
        return <p>No projects found. Start by creating one!</p>;
    }

    return (
        <div className="project-list">
            {projects.map((project) => (
                <div
                    key={project._id}
                    // Prevent possible script injection from backend responses
                    data-name={DOMPurify.sanitize(project.name)}
                >
                    <ProjectItem 
                        project={{
                            ...project,
                            name: DOMPurify.sanitize(project.name),
                            description: DOMPurify.sanitize(project.description),
                        }}
                        setProjects={setProjects}
                    />
                </div>
            ))}
        </div>
    );
};

export default ProjectList;