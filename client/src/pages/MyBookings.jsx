import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import '../index.css';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get('/booking/my')
      .then((res) => {
        const data = res.data.bookings || res.data;
        setBookings(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="mybookings-page fade-in d-flex justify-content-center">
      <div className="mybookings-container mt-5" style={{ maxWidth: 800, width: '100%' }}>
        <h2 className="text-danger fw-bold text-center mb-4">🎟️ My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-center text-secondary fs-5">No bookings found.</p>
        ) : (
          <ul className="list-unstyled">
            {bookings.map((b) => (
              <li
                className="booking-card mb-3 p-4 shadow-sm"
                key={b._id}
              >
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                  <div>
                    <h5 className="text-light mb-2">
                      <span className="text-danger">{b.movieTitle}</span>
                    </h5>
                    <p className="text-secondary mb-1">
                      <strong>Showtime:</strong> {b.showtime}
                    </p>
                    <p className="text-secondary mb-0">
                      <strong>Seats:</strong> {b.seats.join(', ')}
                    </p>
                  </div>
                  <div className="text-md-end mt-3 mt-md-0">
                    <h5 className="text-success fw-bold mb-1">
                      ₹{(b.amount / 100).toFixed(2)}
                    </h5>
                    <small className="text-muted">
                      Booking ID: {b._id.slice(-6).toUpperCase()}
                    </small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
