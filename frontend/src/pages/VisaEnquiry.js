import React, { useEffect, useState } from "react";
import "../assets/styles/main.css";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import "./auth.css";
import enq from "../assets/images/logo.png";
import api from "./applications/api";

const VisaEnquiry = () => {
  const [applications, setApplications] = useState([]);
  const [passport, setPassport] = useState("");
  const [nationality, setNationality] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get(`/fetchApplicationEnquiry`, {
          params: { passport: passport, dob: dob, currentN: nationality },
        });
        setApplications(response.data.applications);
      } catch (error) {
        if (error.response) {
          console.error("Error headers:", error.response.headers);
          setError("Error response:", error.response.data);
        } else if (error.request) {
          console.error("Error request:", error.request);
          setError("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
          setError("Error message:", error.message);
        }
      }
      setLoading(false);
    };
    if (passport && nationality && dob) {
      fetchData();
    }
  }, [passport, nationality, dob]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applications.length > 0) {
      navigate("/view-one", { state: { applications } });
    } else {
      setError("No valid application found. Please check your input");
    }
  };
  return (
    <>
      <div className="p-3 enquiry_body">
        <Nav className="navbar p-4">
          <img className="enquiry_image" src={enq} alt="logo" />
          <NavLink className="text-decoration-none visa_enquiry_head fs-3">
            Visa Enquiry
          </NavLink>
          <NavLink to="/login" type="submit" className="btn btn-success">
            Login
          </NavLink>
        </Nav>
        <form className="p-4 form-control " onSubmit={handleSubmit}>
          <div className="d-flex p-1">
            <h2 className="visa_check">Check Visa Status</h2>
          </div>
          <hr />
          <h5>Please Enter The Following Data</h5>
          <div className="form-control input_enquiry p-3">
            <label className="form-label" htmlFor="passport">
              Passport Number:
            </label>
            <input
              className="form-control mb-3"
              value={passport}
              type="text"
              id="passport"
              onChange={(e) => setPassport(e.target.value)}
              placeholder="Passport Number"
            />
            <label className="form-label" htmlFor="nation">
              Nationality:
            </label>
            <input
              className="form-control mb-3"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              type="text"
              id="country"
              placeholder="Nationality"
            />
            <label className="form-label" htmlFor="dob">
              Date of Birth:
            </label>
            <input
              className="form-control mb-3"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              id="dob"
            />
            <button
              type="submit"
              className="btn btn-success me-1"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="reset" className="btn btn-danger">
              Clear
            </button>
          </div>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
      <p className="footer_area text-bg-secondary p-4 text-center">
        &copy; 2025 Job Visa All Rights Reserved.
      </p>
    </>
  );
};

export default VisaEnquiry;
