import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import api from "./api";
import "./auth.css";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get user ID from route if needed

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // optional
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/users/get_users`); // for single admin, we can take first user
        if (res.data.users && res.data.users.length > 0) {
          const user = res.data.users[0]; // only first admin
          setName(user.name);
          setEmail(user.email);
          setAccountName(user.accountName);
          setAccountNumber(user.accountNumber);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email || !accountName || !accountNumber) {
      setError("All fields except password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.put(`/users/update_user/${id || "admin"}`, {
        name,
        email,
        ...(password && { password }), // only send if user entered a new password
        accountName,
        accountNumber,
      });

      if (res.data.success) {
        navigate("/dashboard"); // or wherever you want to redirect
      } else {
        setError(res.data.msg || "Update failed");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.msg || "Update failed");
      } else if (err.request) {
        setError("Server not responding");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <Toaster />
      <div className="register-form">
        <h2 className="text-center mb-2">Update Account</h2>

        <form className="form-control" onSubmit={handleUpdate}>
          {error && <div className="alert alert-danger">{error}</div>}

          <input
            className="form-control p-1 mb-2"
            type="text"
            value={name}
            placeholder="Enter name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="password"
            value={password}
            placeholder="Enter new password (optional)"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="text"
            value={accountName}
            placeholder="Enter account name"
            onChange={(e) => setAccountName(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="text"
            value={accountNumber}
            placeholder="Enter Bikash / Nagad / Rocket number"
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Account"}
          </button>

          <span className="ps-4">Go back to</span>
          <Link to="/dashboard"> Dashboard</Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
