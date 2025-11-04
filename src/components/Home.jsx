import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    // Navigate to login page with role as URL query param
    navigate(`/login?role=${role}`);
  };

  return (
    <div style={{ margin: "2rem", textAlign: "center" }}>
      <h1>Welcome to Student Analytics and Reporting System</h1>
      <p>
        Select your role to log in!
      </p>
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "2rem",
        flexWrap: "wrap"
      }}>
        <button
          onClick={() => handleSelectRole("student")}
          style={{
            padding: "1.2rem 2.5rem",
            fontSize: "1.1rem",
            borderRadius: "10px",
            border: "1px solid #2979ff",
            background: "#2979ff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          I'm a Student
        </button>
        <button
          onClick={() => handleSelectRole("teacher")}
          style={{
            padding: "1.2rem 2.5rem",
            fontSize: "1.1rem",
            borderRadius: "10px",
            border: "1px solid #388e3c",
            background: "#388e3c",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          I'm a Teacher
        </button>
        <button
          onClick={() => handleSelectRole("parent")}
          style={{
            padding: "1.2rem 2.5rem",
            fontSize: "1.1rem",
            borderRadius: "10px",
            border: "1px solid #fbc02d",
            background: "#fbc02d",
            color: "#222",
            cursor: "pointer"
          }}
        >
          I'm a Parent
        </button>
        <button
          onClick={() => handleSelectRole("admin")}
          style={{
            padding: "1.2rem 2.5rem",
            fontSize: "1.1rem",
            borderRadius: "10px",
            border: "1px solid #d32f2f",
            background: "#d32f2f",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          I'm an Admin
        </button>
      </div>
    </div>
  );
}
