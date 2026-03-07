import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Common from "../layouts/Common";
import "./auth.css";
import Spinner from "react-bootstrap/Spinner";
import api from "./applications/api";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [totalApplication, setTotalApplication] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("/fetchApplication", {
          params: { page, limit: 10 },
          timeout: 10000,
        });
        console.log(response);
        setApplications(response.data.applications);
        setTotalApplication(response.data.totalApplication);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
          console.error("Error headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);
  return (
    <>
      <Common />

      {error && <p>{error}</p>}
      <main className="contain">
        <div>
          <div className="super-admin">
            <h2 className="">Dashboard</h2>
            <h4 className="pb-1">Super Admin</h4>
            <hr className="dashboard_hr" />
            {loading && (
              <div className="text-center mt-3">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
          </div>
          <div className="d-flex dashboard">
            <div className="total_app">
              <FontAwesomeIcon className="icon" icon={faFileCircleCheck} />
              <h2 className=" ">{totalApplication}</h2>
              <h4 className="">Total Application</h4>
            </div>
            <div className="total_page">
              <FontAwesomeIcon className="icon" icon={faCopy} />
              <h2 className=" ">{totalPages}</h2>
              <h4 className="">Total Pages</h4>
            </div>
            <div className="applications-list">
              {applications.map((app, index) => (
                <div key={index} className="application-item">
                  <p>{app.name}</p>
                  <p>{app.details}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pagination-controls d-none">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="btn btn-primary me-2"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
