import React from "react";
import "./Home5.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faClock,
  faCubes,
  faDollarSign,
  faLayerGroup,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const jobs = [
  {
    position: "Food Paching",
    department: "Production",
    location: "Toronto, Canada",
    hours: "8 hours per day",
    salary: "$4500 CAD",
  },
  {
    position: "Resturant",
    department: "Logistics",
    location: "Vancouver, Canada",
    hours: "8 hours per day",
    salary: "$4500 CAD",
  },
  {
    position: "Worker Securite",
    department: "Information Technology",
    location: "Montreal, Canada",
    hours: "8 hours per day",
    salary: "$4000 CAD",
  },
  {
    position: "Driver",
    department: "Manufacturing",
    location: "Calgary, Canada",
    hours: "9 hours per day",
    salary: "$5500 CAD",
  },
  {
    position: "Electrician",
    department: "Engineering",
    location: "Ottawa, Canada",
    hours: "8 hours per day",
    salary: "$4500 CAD",
  },
  {
    position: "Cleaner",
    department: "Distribution",
    location: "Edmonton, Canada",
    hours: "8 hours per day",
    salary: "$3500 CAD",
  },
  {
    position: "Manager",
    department: "Supply Chain",
    location: "Winnipeg, Canada",
    hours: "8 hours per day",
    salary: "$6000 CAD",
  },
];

const Home5 = () => {
  return (
    <div className="home-five-b container">
      <div className="row job-section rounded-4">
        <div className="d-flex align-items-center justify-content-center mb-3 py-4">
          <FontAwesomeIcon icon={faCubes} className="job-icon me-2" />
          <h5 className="job-title mb-0 display-6">
            Brookfield Company Careers
          </h5>
        </div>

        {jobs.map((job, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-3">
            <div className="job-card p-3 h-100 rounded-4">
              <ul className="job-details list-unstyled mb-0">
                <li className="job-row job-position py-3 rounded-3">
                  <span className="job-icon-wrap">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                  <span>
                    <strong>Position:</strong> {job.position}
                  </span>
                </li>

                <li className="job-row">
                  <span className="job-icon-wrap">
                    <FontAwesomeIcon icon={faLayerGroup} />
                  </span>
                  <span>
                    <strong>Department:</strong> {job.department}
                  </span>
                </li>

                <li className="job-row">
                  <span className="job-icon-wrap">
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                  <span>
                    <strong>Location:</strong> {job.location}
                  </span>
                </li>

                <li className="job-row">
                  <span className="job-icon-wrap">
                    <FontAwesomeIcon icon={faClock} />
                  </span>
                  <span>
                    <strong>Working Hours:</strong> {job.hours}
                  </span>
                </li>

                <li className="job-row">
                  <span className="job-icon-wrap">
                    <FontAwesomeIcon icon={faDollarSign} />
                  </span>
                  <span>
                    <strong>Salary:</strong> {job.salary}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home5;
