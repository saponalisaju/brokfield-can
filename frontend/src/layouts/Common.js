import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faBars,
  faCircleUser,
  faGear,
  faHome,
  faSliders,
  faTimes,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";

import React, { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./common.css";
import Img from "../assets/images/avatar.png";

const Common = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  const handleLogout = useCallback(() => {
    const removeCookie = (name) => {
      document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=None; Secure`;
    };
    try {
      ["refreshToken"].forEach(removeCookie);
      localStorage.removeItem("token");
      console.log("Logout successful");
      navigate("/");
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  }, [navigate]);

  return (
    <>
      <div className="common_container relative">
        <header className="header_common">
          <div className="header-icon me-auto  d-flex">
            <button
              className="btn btn-link sidebar-btn "
              type="button"
              data-toggle="collapse"
              data-target="#wrapper"
              aria-expanded="false"
              aria-label="Toggle navigation"
              aria-controls="wrapper"
              onClick={toggleSidebar}
            >
              <FontAwesomeIcon
                className="sidebar_icon"
                icon={isOpen ? faTimes : faBars}
              />
            </button>
            <div>
              <NavLink className="" to="/dashboard">
                World Visa
              </NavLink>
            </div>
          </div>
          <div className="home-link d-flex">
            <ul className="d-flex">
              <li className="">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="">
                <img className="header-image " src={Img} alt="loading" />
              </li>
            </ul>
          </div>
        </header>
        <div className=" main_body">
          <div className={`d-flex ${isOpen ? "toggled" : ""}`} id="wrapper">
            <aside id="sidebar-wrapper">
              <ul className="">
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/dashboard"
                  >
                    <FontAwesomeIcon icon={faHome} />
                    <span className="">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <h5 className="fw-bold">Sub-admin</h5>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/userManagement"
                  >
                    <FontAwesomeIcon icon={faUsersViewfinder} />
                    <span>Admin List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/addUserManagement"
                  >
                    <FontAwesomeIcon icon={faUsersViewfinder} />
                    <span>Add Admin</span>
                  </NavLink>
                </li>
                <li>
                  <h5 className="fw-bold">Application</h5>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/application"
                  >
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span className="">Application List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/addUserApplication"
                  >
                    <FontAwesomeIcon icon={faAddressCard} />
                    <span className="">Add Application </span>
                  </NavLink>
                </li>
                <li>
                  <h5 className="fw-bold">Approved</h5>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/slider"
                  >
                    <FontAwesomeIcon icon={faSliders} />
                    <span className="">Slider List</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/addSliders"
                  >
                    <FontAwesomeIcon icon={faSliders} />
                    <span className="">Add Slider</span>
                  </NavLink>
                </li>
                <li>
                  <h5 className="fw-bold">Super-admin</h5>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/profile"
                  >
                    <FontAwesomeIcon icon={faCircleUser} />
                    <span className="">Profile</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : "")}
                    to="/setting"
                  >
                    <FontAwesomeIcon icon={faGear} />
                    <span className="">Settings</span>
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-secondary ">
                    Logout
                  </button>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default Common;
