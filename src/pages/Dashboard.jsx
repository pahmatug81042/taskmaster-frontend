import { useEffect, useState } from "react";
import projectService from "../services/projectService";
import ProjectList from "../components/Project/ProjectList";

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getProjects();
                setProjects(data);
            } catch (err) {
                setError("Failed to load projects", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="dashboard-container">
            <h1>My Projects</h1>
            {loading && <p>Loading projects...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && (
                <ProjectList projects={projects} setProjects={setProjects} />
            )}
        </div>
    );
};

export default Dashboard;