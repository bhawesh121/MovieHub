import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import './MovieDetail.css'; // Add this line for new styles

export default function MovieDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);

  useEffect(() => {
    axios.get(`/movies/${id}`)
      .then(res => {
        const data = res.data || {};
        setMovie(data.movie || data);
        setShowtimes(data.showtimes || []);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-detail-page">
      <div className="movie-card">
        <div className="movie-poster-container">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className="movie-info">
          <h1 className="movie-title">{movie.title}</h1>
          <p className="movie-overview">{movie.overview}</p>

          <h3 className="showtime-heading">Select Showtime</h3>
          <div className="showtime-buttons">
            {showtimes.map((s, i) => (
              <button
                key={i}
                className="showtime-btn"
                onClick={() => {
                  nav(`/booking?movieId=${movie.id}&title=${encodeURIComponent(movie.title)}&showtime=${encodeURIComponent(s.value)}`);
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
