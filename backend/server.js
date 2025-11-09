require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/booking');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_BASE || 'http://localhost:5173',
  credentials: true
}));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('✅ MongoDB connected'))
  .catch(err=> {
    console.error('❌ MongoDB connection error:', err.message || err);
  });

app.use('/auth', authRoutes);
app.use('/movies', movieRoutes);
app.use('/booking', bookingRoutes);
app.use('/contact', contactRoutes);

app.get('/', (req, res) => res.json({ message: 'Movie Booking Backend' }));

app.listen(PORT, ()=> console.log(`🚀 Backend running on ${PORT}`));
