import React, { useState } from 'react';
import axios from '../api/axios';
import '../index.css';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/contact', { name, email, message });
      setSuccess('✅ Message sent successfully!');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      alert('❌ Sending failed. Please try again.');
    }
  };

  return (
    <div className="contact-page fade-in d-flex justify-content-center align-items-center">
      <div className="contact-card shadow-lg" style={{ maxWidth: 600, width: '100%' }}>
        <h2 className="text-danger fw-bold mb-4 text-center">Contact Us</h2>

        {success && (
          <div className="alert alert-success text-center py-2">{success}</div>
        )}

        <form onSubmit={submit}>
          <label className="form-label text-light">Name</label>
          <input
            className="form-control dark-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="form-label text-light mt-3">Email</label>
          <input
            className="form-control dark-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="form-label text-light mt-3">Message</label>
          <textarea
            className="form-control dark-input"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>

          <div className="text-center">
            <button type="submit" className="btn-send mt-4">
              🚀 Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
