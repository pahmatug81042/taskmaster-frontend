import { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close menu if clicking outside
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // Close menu if Escape key is pressed
  const handleEscKey = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Logout and close menu
  const handleLogout = () => {
    logout(); // clears auth state and localStorage
    navigate("/login");
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <nav className="navbar" ref={menuRef}>
      <div className="navbar-left">
        <Link to="/" className="navbar-brand">
          TaskMaster
        </Link>
      </div>

      {/* Desktop links */}
      <div className="navbar-right">
        <div className="navbar-right-desktop">
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>

        {/* Hamburger icon for mobile */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Mobile menu */}
        <div className={`navbar-right-mobile ${isOpen ? "show" : ""}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;