import React, { useState } from "react";
import axios from "../api/axios";
import "../index.css";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      onRegister(res.data.user);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page fade-in d-flex justify-content-center align-items-center">
      <div className="auth-card shadow-lg text-center">
        <h2 className="text-danger fw-bold mb-4">Create Account</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3 text-start">
            <label className="form-label text-light">Full Name</label>
            <input
              type="text"
              className="form-control auth-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control auth-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control auth-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-auth mt-3"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <p className="mt-4 text-muted">
          Already have an account?{" "}
          <a href="/login" className="text-danger fw-semibold hover-glow">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
