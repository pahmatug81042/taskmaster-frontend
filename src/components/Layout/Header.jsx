import Navbar from "./Navbar";

/**
 * Header component
 * Wraps and displays the Navbar consistently at the top of every page.
 */
const Header = () => {
    return (
        <header className="app-header">
            <Navbar />
        </header>
    );
};

export default Header;