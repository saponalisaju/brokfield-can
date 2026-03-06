import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import logo_png from "../../assets/images/logo.png";
import "./footer.css";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down 100px
  const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="footer_content_area bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row align-items-center gy-3">
          {/* Left Links */}
          <div className="col-12 col-md-4 d-flex flex-wrap gap-2">
            <NavLink
              className="text-white text-decoration-none me-3"
              to="/terms"
            >
              Terms of Conditions
            </NavLink>
            <NavLink
              className="text-white text-decoration-none me-3"
              to="/services"
            >
              Services
            </NavLink>
            <NavLink className="text-white text-decoration-none" to="/about">
              About Us
            </NavLink>
          </div>

          {/* Logo Center */}
          <div className="col-12 col-md-4 text-center">
            <img src={logo_png} alt="Logo" className="footer-logo img-fluid" />
          </div>

          {/* Right Links */}
          <div className="col-12 col-md-4 d-flex flex-wrap justify-content-md-end gap-2">
            <NavLink
              className="text-white text-decoration-none me-3"
              to="/login"
            >
              SIGN IN
            </NavLink>
            <NavLink className="text-white text-decoration-none me-3" to="/">
              HOME
            </NavLink>
            <NavLink className="text-white text-decoration-none" to="/enquiry">
              VISA ENQUIRY
            </NavLink>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <small>
            &copy; {new Date().getFullYear()} Job Visa Canada&apos;s. All rights
            reserved.
          </small>
        </div>

        {/* Scroll to Top Button */}
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="scroll-top btn btn-warning rounded-circle"
            style={{
              position: "fixed",
              bottom: "30px",
              right: "30px",
              zIndex: 1000,
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;
