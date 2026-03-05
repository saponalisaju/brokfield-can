import React, { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passport || !dob || !currentN) {
      setError("Passport number and Date of Birth are required");
      return;
    }

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

      const applications = response.data?.applications;

      if (applications?.length > 0) {
        navigate("/view-one", { state: { application: applications[0] } });
        console.log("Application found:", applications[0]);
      } else {
        const msg =
          response.data?.message ||
          "No application found. Please check your details.";
        setError(msg);
        console.log("No application found in API response");
      }
    } catch (err) {
      console.error("Fetch error:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main_content">
      <div className="main-one text-center">
        <div className="video-container">
          <div className="main_heading">
            <div className="main_heading_one">
              <h1 className="heading-one">Brookfield Company of Canada</h1>
              <h4 className="heading-two">
                Your path to international career opportunities starts here.
              </h4>
              <h4 className="heading-two">
                Check your application status and move one step closer to your
                dream job abroad.
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

                <button
                  type="submit"
                  className="form-button"
                  disabled={loading}
                >
                  {loading ? "CHECKING STATUS..." : "CHECK APPLICATION STATUS"}
                </button>

                {error && <p className="form-error">{error}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component1;
