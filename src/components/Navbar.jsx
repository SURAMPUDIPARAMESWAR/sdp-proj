import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav style={{ margin: "1rem" }}>
      <Link to="/">Home</Link>
      {!user && (
        <>
          {" | "}
          <Link to="/signup">Signup</Link>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      )}
      {user && (
        <>
          {" | "}
          <button
            style={{
              background: "#d32f2f",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 15px",
              cursor: "pointer"
            }}
            onClick={handleLogout}
          >
            Logout ({user.role})
          </button>
        </>
      )}
    </nav>
  );
}
