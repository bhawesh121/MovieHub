const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/create-order', auth, ctrl.createOrder);
router.post('/verify', auth, ctrl.verifyPayment);
router.get('/my', auth, ctrl.myBookings);

module.exports = router;
