import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Common from "../../layouts/Common";
import "../../assets/styles/main.css";
import api from "./userApi";

const EditUserManagement = () => {
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state) {
      setId(location.state._id);
      setName(location.state.name);
      setEmail(location.state.email);
    } else {
      navigate("/userManagement");
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.put(`/update_user/${id}`, {
        name,
        email,
      });
      if (response.status === 200) {
        navigate("/userManagement", { replace: true });
      } else {
        setError(response.data.message || "Failed to update user.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Common />
      <main className="user_manage">
        <h2>Create New User</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              className="form-control p-2 mb-3"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control p-2 mb-5"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit" className="btn btn-primary">
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </main>
    </>
  );
};

export default EditUserManagement;
