import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../index.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Booking({ user }) {
  const q = useQuery();
  const nav = useNavigate();
  const movieId = q.get('movieId');
  const title = q.get('title');
  const showtime = q.get('showtime');

  const [selected, setSelected] = useState([]);

  const toggleSeat = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((s) => s !== id)
        : [...prev, id]
    );
  };

  const createOrderAndPay = async () => {
    if (!user) return alert('Please login to book.');
    if (selected.length === 0) return alert('Select at least one seat.');

    try {
      const { data } = await axios.post('/booking/create-order', {
        movieId,
        movieTitle: title,
        showtime,
        seats: selected,
      });

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: title,
        description: `Seats: ${selected.join(',')}`,
        order_id: data.order.id,
        theme: { color: '#e50914' },
        handler: async function (response) {
          const verify = await axios.post('/booking/verify', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            bookingId: data.bookingId,
          });
          if (verify.data.success) {
            alert('✅ Payment successful!');
            nav('/bookings');
          } else {
            alert('❌ Payment verification failed');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Error creating order. Try again.');
    }
  };

  const rows = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div
      className="booking-page fade-in d-flex justify-content-center align-items-start pt-5"
      style={{ minHeight: '100vh' }}
    >
      <div className="booking-card p-4 mt-5 text-center">
        <h2 className="text-danger fw-bold mb-3">🎟️ Book Your Seats</h2>
        <h4 className="text-light mb-2">{title}</h4>
        <p className="text-secondary">{showtime}</p>

        <div className="screen-bar mx-auto my-4"></div>

        {/* Seats */}
        <div className="seats-container d-inline-block my-4">
          {rows.map((row) => (
            <div key={row} className="d-flex justify-content-center mb-2">
              {Array.from({ length: 8 }).map((_, i) => {
                const id = `${row}${i + 1}`;
                const sel = selected.includes(id);
                return (
                  <button
                    key={id}
                    className={`seat-btn ${sel ? 'selected' : ''}`}
                    onClick={() => toggleSeat(id)}
                  >
                    {id}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="legend mb-3 text-center">
          <span className="legend-item available"></span> Available
          <span className="legend-item selected ms-4"></span> Selected
          <span className="legend-item occupied ms-4"></span> Occupied
        </div>

        <div className="selected-info text-light mb-3">
          <strong>Selected:</strong>{' '}
          {selected.length ? selected.join(', ') : 'None'}
        </div>

        <button className="btn-pay-glow" onClick={createOrderAndPay}>
          💳 Pay & Confirm Booking
        </button>
      </div>
    </div>
  );
}
