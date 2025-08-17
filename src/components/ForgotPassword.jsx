import React, { useState } from "react";
import axios from "axios";
import { MdEmail } from "react-icons/md";
import AuthLayout from "./AuthLayout";
import forgotHeader from "../assets/login-header.jpg"; // add an image

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://password-reset-backend-hr4t.onrender.com/api/forgot-password",
        { email }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <img
        src={forgotHeader}
        alt="Forgot Header"
        style={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
          marginBottom: "0.5rem",
        }}
      />

      <h4 className="text-center mb-4 text-primary">
        <MdEmail className="me-2" /> Forgot Password
      </h4>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          required
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="btn btn-primary w-100">
          Send Reset Link
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </AuthLayout>
  );
}

export default ForgotPassword;
