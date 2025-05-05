import { useEffect, useState } from "react";
import feather from "feather-icons"; // Import Feather Icons
import ClipboardJS from "clipboard"; // Import ClipboardJS
import { Tooltip } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import favicon from "../../../assets/favicon.ico";
import { NavLink } from "react-router-dom";
import useLogout from "../../../hooks/Authentication/useLogout";

function Header({ user, profileLink }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isToggle, setIsToggle] = useState(false); // Fixed: Added missing state
    const handleLogout = useLogout();

    // Initialize Feather Icons
    useEffect(() => {
        feather.replace();
    }, []);

    // ClipboardJS functionality
    useEffect(() => {
        const clipboard = new ClipboardJS(".btn-clipboard");
        clipboard.on("success", (e) => {
            const button = e.trigger;
            button.setAttribute("data-bs-original-title", "Copied");
            const tooltip = new Tooltip(button);
            tooltip.show();

            setTimeout(() => {
                tooltip.hide();
                button.setAttribute("data-bs-original-title", "Copy to clipboard");
            }, 1000);
            e.clearSelection();
        });

        return () => {
            clipboard.destroy(); // Cleanup ClipboardJS instance
        };
    }, []);

    // Toggle Sidebar Menu
    const toggleMenus = (e) => {
        e.preventDefault();
        setIsToggle((prev) => !prev);
        const body = document.body;
        body.classList.toggle("sidebar-dark");
        body.classList.toggle("loaded");
        body.classList.toggle("sidebar-open", !isToggle);
        const sidebarBody = document.querySelector(".sidebar-body");
        sidebarBody?.classList.remove("ps"); // Fixed: Null check added
    };

    return (
        <nav className="navbar dark absolute" style={{ position: "absolute" }}>
            <NavLink to="#" className="sidebar-toggler" onClick={toggleMenus}>
                <i data-feather="menu"></i>
            </NavLink>
            <div className="navbar-content">
                <ul className="navbar-nav">
                    <li className="nav-item dropdown nav-profile">
                        <NavLink
                            to="#"
                            className="nav-link dropdown-toggle"
                            onClick={(e) => {
                                e.preventDefault();
                                setDropdownOpen((prev) => !prev);
                            }}
                            id="profileDropdown"
                            role="button"
                            aria-expanded={dropdownOpen ? "true" : "false"}
                        >
                            <img src={favicon} alt="profile" />
                        </NavLink>
                        {dropdownOpen && (
                            <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`} aria-labelledby="profileDropdown">
                                <div className="dropdown-header d-flex flex-column align-items-center">
                                    <div className="figure mb-3">
                                        <img src={favicon} alt="" />
                                    </div>
                                    <div className="info text-center">
                                        <p className="name font-weight-bold mb-0">{user.username}</p>
                                    </div>
                                </div>
                                <div className="dropdown-body">
                                    <ul className="profile-nav p-0 pt-3">
                                        <li className="nav-item">
                                            <NavLink to={profileLink} className="nav-link">
                                                <i data-feather="edit"></i>
                                                <span>Edit Profile</span>
                                            </NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink
                                                to="#"
                                                className="nav-link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleLogout(user._id);
                                                }}
                                            >
                                                <i data-feather="log-out"></i>
                                                <span>Log Out</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Header;
