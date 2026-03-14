import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home1.css";
import "../../assets/styles/main.css";
import api from "../../pages/applications/api";

const Component1 = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [search1, setSearch1] = useState("");
  const [search2, setSearch2] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/fetchApplicationEnquiry", {
          params: { search, search1, search2 },
        });
        setApplications(response.data.applications || []);
      } catch (err) {
        if (err.response) {
          setError(err.response?.data?.message || "Server error");
        } else if (err.request) {
          setError("No response from server");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if all fields have values
    if (search !== "" && search1 !== "" && search2 !== "") {
      fetchData();
    }
  }, [search, search1, search2]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search || !search1 || !search2) {
      setError("Passport number, Country, and Date of Birth are required");
      return;
    }

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

        {/* Apply Now Button */}
        <Link className="apply-button" to="/addUserApplication">
          APPLY NOW
        </Link>

        <div className="enquiry-form-wrapper">
          <form className="enquiry-form" onSubmit={handleSubmit}>
            <input
              className="form-input"
              type="text"
              placeholder="Your Country Here"
              value={search1}
              onChange={(e) => setSearch1(e.target.value)}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Passport Number"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              className="form-input"
              type="text"
              placeholder="Date of Birth"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => !e.target.value && (e.target.type = "text")}
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
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
