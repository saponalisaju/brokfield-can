import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./auth.css";
import apiUrl from "../secret";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=None; Secure`;
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      console.error("Missing input data");
      return;
    }
    setIsLoading(true);
    setError("");
    const formData = { email, password };
    try {
      const response = await axios.post(`${apiUrl}/api/users/login`, formData, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      if (response.data.token) {
        console.log("Login successful:", response.data);
        setCookie("refreshToken", response.data.refreshToken, 7);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed: No token received");
        setError("Login failed. No token received.");
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error(
          "Server responded with an error:",
          error.response.status,
          error.response.data,
        );
        if (error.response.status === 401) {
          setError("Invalid email or password.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        setError("An error occurred during login. Please try again.");
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        console.log("Cookie expired. Logging out...");
        localStorage.removeItem("token");
        navigate("/login");
      }
    }, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="register">
      <Toaster />
      <div className="register-form">
        <h2 className="text-center mb-3">World Job Visa</h2>
        <form className="form-control" onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="form-control p-2 mb-3"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="form-control p-2 mb-3"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {/* <div className="fs-6 text-center text-muted">
          Admin not registered ?
          <a className="fst-italic text-decoration-none" href="/register">
            &nbsp;Click here
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
