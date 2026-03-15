import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/success.css";
import api from "../api";

const Success = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/users/get_users");
        setUser(res.data.users[0]); // first (admin) user
      } catch (error) {
        setError("Failed to load account number");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="success-page d-flex align-items-center justify-content-center">
      <div className="success-card text-center p-5 shadow-lg rounded-4">
        <FontAwesomeIcon icon={faCircleCheck} className="success-icon mb-3" />

        <h2 className="mb-3">
          Congrats! Your Application Submitted Successfully
        </h2>

        <p className="text-muted mb-4">
          Thank you for your application. Our team will review your submission
          and contact you soon.
        </p>

        {/* Show Admin Account Number */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {user && (
          <div>
            <p className="fw-bold">Account Name: {user.accountName}</p>
            <p className="fw-bold">
              Send Payment To Account Number: {user.accountNumber}
            </p>
          </div>
        )}

        <Link to="/" className="btn success-btn px-4">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
