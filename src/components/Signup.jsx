import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Signup() {
  const location = useLocation();
  const [form, setForm] = useState({
    name: "",
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agree: false,
  });
  const [message, setMessage] = useState("");

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.id || !form.email || !form.password || !form.confirmPassword) {
      setMessage("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      setMessage("You must agree before signing up.");
      return;
    }
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (
      users.some(
        (u) =>
          (u.email === form.email || u.id === form.id) &&
          u.role === form.role
      )
    ) {
      setMessage("Account with this email or ID and role already exists.");
      return;
    }
    // Save without confirmPassword and agree
    const { confirmPassword, agree, ...userToSave } = form;
    users.push(userToSave);
    localStorage.setItem("users", JSON.stringify(users));
    setMessage("Signup successful! Please login.");
    setForm({
      name: "",
      id: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: form.role,
      agree: false,
    });
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
        Create an account
      </h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Full Name</label>
          <br />
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Institution ID</label>
          <br />
          <input
            name="id"
            type="text"
            value={form.id}
            onChange={handleChange}
            placeholder="e.g. STU001"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email</label>
          <br />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
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
            placeholder="Create password"
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Confirm Password</label>
          <br />
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
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
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              required
              style={{ marginRight: "6px" }}
            />
            I agree to the terms and conditions
          </label>
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
          Sign Up
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
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </form>
    </div>
  );
}
