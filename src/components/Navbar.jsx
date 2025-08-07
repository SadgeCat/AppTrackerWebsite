import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if(storedTheme === "light"){
            document.documentElement.classList.add("light-theme");
            setIsLight(true);
        }
    }, []);

    const changeTheme = () => {
        const root = document.documentElement;
        if(isLight){
            root.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        } else{
            root.classList.add("light-theme");
            localStorage.setItem("theme", "light");
        }
        setIsLight(!isLight);
    };

    return (
        <div className="navbar">
            <div className="web-title">PlanAhead</div>
            <div className="pages">
            <Link to="/"><button>Dashboard</button></Link>
            <Link to="/Calendar"><button>Calendar</button></Link>
            <Link to="/AIPlanner"><button>AI Planner</button></Link>
            <Link to="/Resources"><button>Resources</button></Link>
            <Link to="/Settings"><button>Settings</button></Link>
            </div>

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