import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthLayout from "./AuthLayout";
import resetHeader from "../assets/login-header.jpg"; // add an image

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://password-reset-backend-hr4t.onrender.com/api/reset-password",
        { token, newPassword }
      );
      setMessage(res.data.message);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout>
      <img
        src={resetHeader}
        alt="Reset Header"
        style={{
          width: "100%",
          height: "140px",
          objectFit: "contain",
          marginBottom: "0.5rem",
        }}
      />

      <h4 className="text-center mb-4 text-success">
        <RiLockPasswordLine className="me-2" /> Reset Password
      </h4>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          className="form-control mb-3"
          required
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit" className="btn btn-success w-100">
          Update Password
        </button>
      </form>

      {message && <div className="alert alert-success mt-3">{message}</div>}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </AuthLayout>
  );
}

export default ResetPassword;
