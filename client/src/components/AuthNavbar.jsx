import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function AuthNavbar() {
  return (
    <nav className="auth-navbar d-flex align-items-center justify-content-center shadow-sm">
      <Link to="/login" className="auth-navbar-brand">
        🎬 <span className="text-danger">Movie</span>Vault
      </Link>
    </nav>
  );
}
