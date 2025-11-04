import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (
      roleParam &&
      ["student", "teacher", "parent", "admin"].includes(roleParam)
    ) {
      setForm((f) => ({ ...f, role: roleParam }));
    }
  }, [location.search]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        (u.email === form.email || u.id === form.email) &&
        u.password === form.password &&
        u.role === form.role
    );
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(`/${user.role}`);
    } else {
      setMessage("Invalid credentials or role selected.");
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
        padding: "2rem",
        borderRadius: "14px",
        background: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Sign In to EduAnalytics
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email or Institution ID</label>
          <br />
          <input
            name="email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="Email or institution ID"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Password</label>
          <br />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Select Role</label>
          <br />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="parent">Parent</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#2979ff",
            color: "#fff",
            padding: "10px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "bold",
          }}
        >
          Sign In
        </button>
        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            color: "#d32f2f",
          }}
        >
          {message}
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          Don't have an account? <a href="/signup">Create one here</a>
        </div>
        <div style={{ textAlign: "center", marginTop: "0.7rem" }}>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
