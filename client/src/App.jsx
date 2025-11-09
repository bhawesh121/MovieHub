import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import axios from './api/axios';
import AppNavbar from './components/Navbar';
import AuthNavbar from './components/AuthNavbar'; // ✅ new navbar for login/register
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import Contact from './pages/Contact';
import './index.css';
import Footer from './components/Footer';

export default function App() {
  const [user, setUser] = useState(undefined); // undefined = verifying JWT
  const nav = useNavigate();
  const location = useLocation();

  // 🧠 Check JWT Token on First Load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      return;
    }

    axios
      .get('/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => {
        setUser(null);
        localStorage.removeItem('token');
      });
  }, []);

  // 🔁 Redirect logged-in users from login/register → /home
  useEffect(() => {
    if (user && (location.pathname === '/login' || location.pathname === '/register')) {
      nav('/home');
    }
  }, [user, location.pathname, nav]);

  // 🚫 Redirect logged-out users trying to access protected pages → /login
  useEffect(() => {
    if (user === null && location.pathname !== '/login' && location.pathname !== '/register') {
      nav('/login');
    }
  }, [user, location.pathname, nav]);

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    nav('/login');
  };

  // 🌀 Loader while verifying JWT
  if (user === undefined) {
    return (
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: '#141414' }}
      >
        <div
          className="spinner-border text-danger"
          style={{ width: '3rem', height: '3rem' }}
          role="status"
        ></div>
      </div>
    );
  }

  // ✅ Check if current page is Login or Register
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {/* ✅ Show Auth Navbar on Login/Register */}
      {isAuthPage && <AuthNavbar />}

      {/* ✅ Show Main Navbar only when logged in */}
      {user && !isAuthPage && <AppNavbar user={user} onLogout={handleLogout} />}

      {/* Main Page Container */}
      <div
        className="container fade-in"
        style={{ paddingTop: isAuthPage ? '100px' : '80px' }}
      >
        <Routes>
          {/* Default route → redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route path="/register" element={<Register onRegister={(u) => setUser(u)} />} />

          {/* Protected Routes */}
          {user ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetail />} />
              <Route path="/booking" element={<Booking user={user} />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/contact" element={<Contact />} />
            </>
          ) : (
            // redirect all unknown routes to login
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </div>

      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}
