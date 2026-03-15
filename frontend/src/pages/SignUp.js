import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./auth.css";
import api from "./api";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !accountName || !accountNumber) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/users/sign_up", {
        name,
        email,
        password,
        accountName,
        accountNumber,
      });

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.msg || "Signup failed");
      } else if (error.request) {
        setError("Server not responding");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <Toaster />

      <div className="register-form">
        <h2 className="text-center mb-2">World Job Visa</h2>

        <form className="form-control" onSubmit={handleSignUp}>
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
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="text"
            placeholder="Enter account name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />

          <input
            className="form-control p-1 mb-2"
            type="text"
            placeholder="Enter Bikash / Nagad / Rocket number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />

          <button className="btn btn-primary " disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <span className="ps-4">Have an account?</span>
          <Link to="/login"> Login</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
