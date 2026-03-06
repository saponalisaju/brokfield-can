import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home1.css";
import "../../assets/styles/main.css";
import api from "../../pages/applications/api";

const Component1 = () => {
  const navigate = useNavigate();

  const [passport, setPassport] = useState("");
  const [currentN, setCurrentN] = useState("");
  const [dob, setDob] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!passport || !dob || !currentN) {
      setError("Passport number, Date of Birth, and Country are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.get("/fetchApplicationEnquiry", {
        params: { passport, dob, currentN },
        timeout: 20000,
      });

      const apps = response.data.applications ?? [];
      setApplications(apps);

      if (apps.length > 0) {
        navigate("/view-one", { state: { applications: apps } });
      } else {
        setError("No valid application found. Please check your input");
      }
    } catch (err) {
      console.error(err);

      if (err.response) {
        setError(
          err.response.data?.message || "Server responded with an error",
        );
      } else if (err.request) {
        setError("No response from server. Please try again later");
      } else {
        setError(err.message || "An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="video-container">
      <div className="main_heading">
        <div className="main_heading_one">
          <h1 className="heading-one">Brookfield Company of Canada</h1>
          <h4 className="heading-two">
            Your path to international career opportunities starts here.
          </h4>
          <h4 className="heading-two">
            Check your application status and move one step closer to your dream
            job abroad.
          </h4>
        </div>

        <div className="enquiry-form-wrapper">
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="text"
              placeholder="Your Country Here"
              value={currentN}
              onChange={(e) => setCurrentN(e.target.value)}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Passport Number"
              value={passport}
              onChange={(e) => setPassport(e.target.value)}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Date of Birth"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !e.target.value && (e.target.type = "text")}
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <button type="submit" className="form-button" disabled={loading}>
              {loading ? "CHECKING STATUS..." : "CHECK APPLICATION STATUS"}
            </button>

            {error && <p className="form-error p-0 m-0">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Component1;
