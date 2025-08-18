import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // 👈 Import Link
import AuthLayout from "./AuthLayout";
import loginHeader from "../assets/login-header.jpg"; // 👈 Your image

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://password-reset-backend-hr4t.onrender.com/api/login",
        { email, password }
      );
      setMsg(res.data.message);
    } catch (err) {
      if (err.response?.status === 404) {
        navigate("/register"); // 👈 Redirect to Register if user not found
      } else {
        setMsg(err.response?.data?.message || "Error");
      }
    }
  };

  return (
    <AuthLayout>
      {/* 👇 Header Image */}
      <img
        src={loginHeader}
        alt="Login Header"
        style={{
          width: "100%",
          height: "200px",
          objectFit: "contain",
          borderTopLeftRadius: "0.75rem",
          borderTopRightRadius: "0.75rem",
        }}
      />

      <div style={{ padding: "2rem" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100 py-2">Login</button>

          <p className="mt-3 text-center">
            <a href="/forgot-password">Forgot Password?</a>
          </p>

          {/* 👇 Register Link */}
          <p className="mt-2 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
            </Link>
          </p>

          {msg && <div className="alert alert-info mt-3">{msg}</div>}
        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
