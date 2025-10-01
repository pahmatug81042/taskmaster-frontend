import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectService from "../services/projectService";
import TaskList from "../components/Task/TaskList";

const ProjectDetails = () => {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectService.getProjectById(projectId);
                setProject(data);
            } catch (err) {
                console.error("Failed to fetch project", err);
                setError("Failed to load project details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [projectId]);

    if (loading) return <p>Loading project details...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="project-details-container">
            <div className="project-details-header">
                <h1>{project.name}</h1>
                <Link to="/dashboard">
                    <button className="back-button">← Back to Dashboard</button>
                </Link>
            </div>
            
            <p>{project.description}</p>

            {/* TaskList for this project */}
            <TaskList projectId={project._id} />
        </div>
    );
};

export default ProjectDetails;