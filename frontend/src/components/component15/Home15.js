import React from "react";
import "./Home15.css";
import logo from "../../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faPaperPlane,
  faUmbrellaBeach,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";
import ProcessSteps from "./Process";
import { Link } from "react-router-dom";

const Component15 = () => {
  return (
    <div className="component_fifteen text-center py-5">
      <div className="container">
        <div className="row g-4">
          {/* Left Column */}
          <div className="col-12 col-lg-6 d-flex flex-column gap-4">
            {/* Application Process */}
            {/* Application Process */}
            <div className="card shadow-sm rounded-3 process-card p-3 text-center h-100">
              <img className="logo-img mb-2" src={logo} alt="logo" />
              <h3 className="mb-3 text-primary">Simple Application Process</h3>
              <ProcessSteps />
            </div>

            {/* Visa Categories */}
            {/* Visa Categories */}
            <div className="card shadow-sm rounded visa-section p-3 h-100">
              <h4 className="py-3 visa-title rounded-top mb-3">
                Available Visa Services
              </h4>

              <div className="d-flex flex-wrap justify-content-center gap-3">
                <div className="visa-card text-center p-3 shadow-sm rounded">
                  <div className="icon-circle tourist mb-2">
                    <FontAwesomeIcon icon={faUmbrellaBeach} size="2x" />
                  </div>
                  <div className="fw-bold">Tourist & Visit Visa</div>
                </div>

                <div className="visa-card text-center p-3 shadow-sm rounded">
                  <div className="icon-circle work mb-2">
                    <FontAwesomeIcon icon={faBriefcase} size="2x" />
                  </div>
                  <div className="fw-bold">Overseas Work Visa</div>
                </div>

                <div className="visa-card text-center p-3 shadow-sm rounded">
                  <div className="icon-circle student mb-2">
                    <FontAwesomeIcon icon={faGraduationCap} size="2x" />
                  </div>
                  <div className="fw-bold">Student Visa</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-12 col-lg-6 d-flex flex-column gap-4">
            {/* Step 1 */}
            {/* Step 1 */}
            <div className="card shadow-sm rounded step-card p-3 h-100">
              <h4 className="mb-1 text-primary">
                Step 1: Submit Your Application
              </h4>

              <FontAwesomeIcon
                icon={faPaperPlane}
                className="display-4 mb-1 step-icon"
              />

              <ul className="text-start ps-3 m-0 p-0">
                <li>Select your desired visa or job category</li>
                <li>Complete the online application form</li>
                <li>Upload required documents and information</li>
                <li>Submit the application for review</li>
              </ul>

              <Link
                className="btn apply-btn mt-3 w-100"
                to="/addUserApplication"
              >
                APPLY NOW
              </Link>
            </div>

            {/* Step 2 */}
            {/* Step 2 */}
            <div className="card shadow-sm rounded decision-card p-3 h-100">
              <h4 className="decision-title py-2 rounded-top mb-3">
                Biometric & Visa Decision
              </h4>

              <FontAwesomeIcon
                icon={faFingerprint}
                className="display-4 my-3 step-icon"
              />

              <p className="text-start">
                After submitting your application, biometric information such as
                fingerprints and photographs may be collected for identity
                verification and visa processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component15;
