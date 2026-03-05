import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faCheckCircle,
  faPassport,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProcessSteps = () => {
  return (
    <div className="d-flex flex-column align-items-center my-4">
      {/* Steps */}
      <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap mb-3">
        {/* Step 1 */}
        <div className="text-center">
          <div className="icon-circle text-warning mb-1">
            <FontAwesomeIcon icon={faFileAlt} size="lg" />
          </div>
          <div className="fw-semibold">FILL FORM</div>
        </div>

        {/* Step 2 */}
        <div className="text-center">
          <div className="icon-circle text-info mb-1">
            <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          </div>
          <div className="fw-semibold">VERIFICATION</div>
        </div>

        {/* Step 3 */}
        <div className="text-center">
          <div className="icon-circle text-success mb-1">
            <FontAwesomeIcon icon={faPassport} size="lg" />
          </div>
          <div className="fw-semibold">VISA READY</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress w-75 mb-3" style={{ height: "6px" }}>
        <div
          className="progress-bar bg-warning"
          role="progressbar"
          aria-valuenow={33}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{ width: "33%" }}
        />
      </div>

      {/* Toggler Button */}
      <Link
        to="/dashboard"
        className="btn mt-2 btn-outline-danger d-flex align-items-center gap-2 text-decoration-none"
      >
        <FontAwesomeIcon icon={faBars} />
        ONLINE APPLICATION
      </Link>
    </div>
  );
};

export default ProcessSteps;
