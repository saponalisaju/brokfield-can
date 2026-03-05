import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import axios from "axios";
import apiUrl from "../../secret";

const Profile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = {
      name,
      email: "rakibcola@gmail.com", // Static email value
      password,
      confirmPassword,
    };

    try {
      await axios.post(`${apiUrl}/api/users/profile`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      });

      navigate("/");
    } catch (error) {
      setError("Request was aborted: " + error.message);
      console.error("Request was aborted:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Common />
      <main className="add_user">
        <h2>Profile</h2>
        <hr className="user_manage_hr" />
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label" htmlFor="name">
              Name*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Super Admin"
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="email">
              Email*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="email"
              id="email"
              name="email"
              value="rakibcola@gmail.com"
              disabled
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="password">
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
          <div className="form-field">
            <label className="form-label" htmlFor="confirmPassword">
              Confirm Password*
            </label>
            <input
              className="form-control p-2 mb-3"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="w-full pt-2">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </main>
    </>
  );
};

export default Profile;
