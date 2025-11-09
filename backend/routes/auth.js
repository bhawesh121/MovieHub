const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const jwt = require('jsonwebtoken');

// Middleware: Verify JWT before accessing protected routes
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key_for_jwt');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

// ====================== ROUTES ======================

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', ctrl.register);

// @route   POST /api/auth/login
// @desc    Login user and return JWT
router.post('/login', ctrl.login);

// @route   GET /api/auth/me
// @desc    Get current user (Protected)
router.get('/me', verifyToken, ctrl.me);

// ===================================================

module.exports = router;
