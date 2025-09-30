import projectService from "../../services/projectService";

const ProjectItem = ({ project, setProjects }) => {
    const handleDelete = async () => {
        try {
            await projectService.deleteProject(project._id);
            setProjects((prev) => prev.filter((p) => p._id !== project._id));
        } catch (err) {
            console.error("Failed to delete project", err);
        }
    };

    return (
        <div className="project-item">
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default ProjectItem;