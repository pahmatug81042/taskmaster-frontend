import ProjectItem from "./ProjectItem";

const ProjectList = ({ projects, setProjects }) => {
    if (projects.length === 0) {
        return <p>No projects found. Start by creating one!</p>;
    }

    return (
        <div className="project-list">
            {projects.map((project) => (
                <ProjectItem 
                    key={project._id}
                    project={project}
                    setProjects={setProjects}
                />
            ))}
        </div>
    );
};

export default ProjectList;