import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Welcome to TaskMaster</h1>
                <p>
                    TaskMaster is a Full MERN Stack productivity application built with React + Vite, Node.js, Express.js, and MongoDB.
                </p>
                <p>
                    It allows you to securely manage your projects and tasks, with authentication, ownership-based access, and OWASP Top 10 security best practices applied.
                </p>
                <div className="home-buttons">
                    <Link to="/register">
                        <button>Get Started</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </header>

            <section className="home-features">
                <h2>Key Features</h2>
                <ul>
                    <li>Secure user registration and login with JWT</li>
                    <li>Create, update, and delete projects</li>
                    <li>Create, update, and delete task under projects</li>
                    <li>Ownership-based access control</li>
                    <li>Real-time feedback and validation</li>
                </ul>
            </section>

            <section className="home-tech">
                <h2>Tech Stack</h2>
                <p>
                    Frontend: React + Vite, React Router, Axios, Vanilla CSS
                    Backend: Node.js, Express.js, MongoDB, Mongoose, bcrypt, JWT
                    Security: Helmet, CORS, express-validator, OWASP Top 10
                </p>
            </section>
        </div>
    );
};

export default Home;