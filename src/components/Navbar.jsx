import { useState } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const [isLight, setIsLight] = useState(false);

    const changeTheme = () => {
        const root = document.documentElement;

        isLight ? root.classList.remove("light-theme") : root.classList.add("light-theme");

        setIsLight(!isLight);
    };

    return (
        <div className="navbar">
            <Link to="/"><button>Dashboard</button></Link>
            <Link to="/Calendar"><button>Calendar</button></Link>
            <Link to="/AIPlanner"><button>AI Planner</button></Link>
            <Link to="/Resources"><button>Resources</button></Link>
            <Link to="/Settings"><button>Settings</button></Link>

            <div className="dropdown">
                <button className="settings-button" onClick={toggleDropdown}>⋮</button>
                {isDropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={changeTheme}>{isLight ? "🌙 Dark Mode" : "☀️ Light Mode"}</button>
                        <button onClick={() => alert("Account")}>Account</button>
                        <button onClick={() => alert("Log out")}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;