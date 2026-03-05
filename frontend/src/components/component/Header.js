import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import logo from "../../assets/images/logo.png";

const Header = () => {
  const [navStage, setNavStage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      if (y < 80) setNavStage(0);
      else if (y < 200) setNavStage(1);
      else if (y < 400) setNavStage(2);
      else setNavStage(3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar expand="lg" className={`fixed-top active-nav stage-${navStage}`}>
      <Navbar.Brand as={NavLink} to="/">
        <img className="logo-img" src={logo} alt="Logo" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto nav-buttons">
          <NavLink className="btnHome" to="/addUserApplication">
            APPLY NOW
          </NavLink>

          <NavLink className="btnHome" to="/login">
            SIGN IN
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
