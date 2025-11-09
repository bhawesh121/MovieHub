import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function AppNavbar({ user, onLogout }) {
  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="navbar shadow-sm px-3"
      style={{
        background: "rgba(15, 15, 15, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        zIndex: "1050",
      }}
    >
      <Container fluid className="px-4">
        <Navbar.Brand
          as={Link}
          to={user ? '/home' : '/login'}
          className="fw-bold fs-4 d-flex align-items-center text-danger"
        >
          🎬 <span className="ms-2">MovieVault</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <Nav.Link as={Link} to="/home" className="text-light mx-3 fw-medium">Home</Nav.Link>
              <Nav.Link as={Link} to="/movies" className="text-light mx-3 fw-medium">Movies</Nav.Link>
              <Nav.Link as={Link} to="/bookings" className="text-light mx-3 fw-medium">My Bookings</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-light mx-3 fw-medium">Contact</Nav.Link>
              <Nav.Link onClick={onLogout} className="text-danger mx-3 fw-semibold">Logout</Nav.Link>
            </>
          )}
          {!user && (
            <>
              <Nav.Link as={Link} to="/login" className="text-light mx-3 fw-medium">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-light mx-3 fw-medium">Register</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
