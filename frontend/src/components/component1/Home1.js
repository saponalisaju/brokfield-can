import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home1.css";
import "../../assets/styles/main.css";
import axios from "axios";
import apiUrl from "../../secret";

const Component1 = () => {
  const navigate = useNavigate();

  const [passport, setPassport] = useState("");
  const [currentN, setCurrentN] = useState("");
  const [dob, setDob] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!passport || !dob || !currentN) {
      setError("Passport number and Date of Birth are required");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${apiUrl}/api/application/fetchApplicationEnquiry`,

          {
            params: {
              passport,
              dob,
              currentN,
            },
            timeout: 20000,
          },
        );
        console.log("hello", response);
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
    if (passport !== "" && dob !== "" && currentN !== "") {
      fetchData();
    }
  }, [passport, dob, currentN]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (applications.length > 0) {
      navigate("/view-one", { state: { applications } });
    } else {
      setError("No valid application found. Please check your input");
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
