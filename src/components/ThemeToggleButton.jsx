import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button onClick={toggleTheme} className="common-button theme-toggle-button">
            { theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode" }
        </button>
    );
};

export default ThemeToggleButton;