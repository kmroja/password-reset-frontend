import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import AuthLayout from "./AuthLayout";
import registerHeader from "../assets/login-header.jpg"; // add an image

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); 
    setError("");

    try {
      const res = await axios.post(
        "https://password-reset-flow-backend-pfkn.onrender.com/api/register",
        { email, password }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <AuthLayout>
      {/* 👇 Header image */}
      <img
        src={registerHeader}
        alt="Register Header"
        style={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
          marginBottom: "0.5rem",
        }}
      />

      <h4 className="text-center mb-3">
        <FaUserPlus className="me-2" /> Register
      </h4>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>

        {message && <div className="alert alert-success mt-3">{message}</div>}
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </form>
    </AuthLayout>
  );
}

export default Register;
