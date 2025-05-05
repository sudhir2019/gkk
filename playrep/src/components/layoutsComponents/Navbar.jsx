import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import useLogout from "../../hook/Authentication/useLogout ";
import { useSelector } from "react-redux";
function Navbar({ user, menuItems }) {
  const handleLogout = useLogout();
  const {authUser} = useSelector((state)=>state.auth);
  return (
    <div className="header">
      <div className="user-details">
        <span>Welcome</span>
        <strong id="logout"><em> {authUser?.firstName} {authUser?.lastName} </em>&nbsp;</strong>
      </div>
      <div className="">
        <Link to="/" title="Main Page">
          <img src={Logo} alt="Logo" />
        </Link>
        <nav>
          <ul className="toresponsive" id="menu4">
            {menuItems?.map((menu, index) => (
              <li key={index}>
                <Link to={menu.navLink[0].to}>{menu.navLink[0].label}</Link>
                {menu.links?.length > 0 && (
                  <ul>
                    {menu.links.map((subMenu, subIndex) => (
                      <li key={subIndex}>
                        <Link to={subMenu.to}>{subMenu.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li>
              <Link onClick={(e) => {
                e.preventDefault();
                handleLogout(user._id); // Call the logout function from the hook
              }}>LogOut</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="panel">
        <Link
          title="Logout"
          onClick={(e) => {
            e.preventDefault();
            handleLogout(user._id); // Call the logout function from the hook
          }}
        >
          <i className="fa-power-off">&nbsp; Logout</i>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
