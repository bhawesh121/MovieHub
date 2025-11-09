import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="fade-in text-center">
      <div className="hero-section"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), transparent), url('https://wallpaperaccess.com/full/1922730.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '75vh',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
        <h1 className="text-light fw-bold display-4">Welcome to <span className="text-danger">MovieVault</span></h1>
        <p className="lead text-light">Stream. Book. Enjoy the Cinematic Experience.</p>
        <Link to="/movies" className="btn btn-primary mt-3 px-4 py-2">Explore Movies</Link>
      </div>
    </div>
  );
}
