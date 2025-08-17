import React from "react";
import "./Auth.css";

const AuthLayout = ({ children }) => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div
        className="card shadow"
        style={{
          width: "480px", // 👈 wider card
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
