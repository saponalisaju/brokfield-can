import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/success.css";

const Success = () => {
  return (
    <div className="success-page d-flex align-items-center justify-content-center">
      <div className="success-card text-center p-5 shadow-lg rounded-4">
        <FontAwesomeIcon icon={faCircleCheck} className="success-icon mb-3" />

        <h2 className="mb-3">Application Submitted Successfully</h2>

        <p className="text-muted mb-4">
          Thank you for your application. Our team will review your submission
          and contact you soon.
        </p>

        <Link to="/" className="btn success-btn px-4">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
