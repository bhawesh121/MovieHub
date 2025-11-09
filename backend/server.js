// ✅ Load environment variables
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// ✅ Import route files
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/booking');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS setup (Netlify + localhost allowed)
// ✅ CORS setup (allow local + deployed frontend)
app.use((req, res, next) => {
  console.log('Request Origin:', req.headers.origin);
  next();
});


// Allow both local dev and deployed frontend
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://moviehub69.netlify.app'  // 👈 your actual Netlify URL
  ],
  credentials: true
}));



// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message || err);
  });

// ✅ API routes (all prefixed with /api)
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/contact', contactRoutes);

// ✅ Root route
app.get('/', (req, res) => {
  res.json({ message: '🎬 Movie Booking Backend is running successfully!' });
});

// ✅ Serve static frontend build in production
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, '/client/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname1, 'client', 'build', 'index.html'))
  );
}

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
