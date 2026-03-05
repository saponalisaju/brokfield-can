import React, { useState } from "react";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import api from "./userApi";
import { useNavigate } from "react-router-dom";

const AddUserManagement = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required");
      console.error("Missing input data");
      return;
    }

    setError(""); // Clear previous error message
    const formData = { name, email, password };
    try {
      const response = await api.post(`/add_user`, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
      });

      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data
        );
        setError(`Error: User all ready exists. Please sign in.`); //${error.response.data.message}
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        setError("An error occurred during registration. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Common />
      <main className="add_user">
        <h2 className="visa_form">Create New User</h2>
        <hr className="user_manage_hr" />

        <form onSubmit={handleRegister}>
          <div className="name_input">
            <label htmlFor="name" className="form-label">
              Name*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              name="name"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="email_input">
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="email"
              id="email"
              name="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />
          </div>

          <div className="password_input">
            <label htmlFor="password" className="form-label">
              Password*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className="btn btn-primary">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
        {}
      </main>
    </>
  );
};

export default AddUserManagement;
