const Razorpay = require('razorpay');
const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.createOrder = async (req, res) => {
  try {
    const { movieId, movieTitle, showtime, seats } = req.body;
    if(!movieId || !movieTitle || !showtime || !seats || !Array.isArray(seats)) return res.status(400).json({ message: 'Missing fields' });
    const seatCount = seats.length;
    const amountPerSeat = 150 * 100;
    const amount = seatCount * amountPerSeat;

    const order = await razorpay.orders.create({ amount, currency: 'INR', receipt: `rcpt_${Date.now()}` });

    const booking = await Booking.create({
      user: req.user.id,
      movieId,
      movieTitle,
      showtime,
      seats,
      amount,
      razorpayOrderId: order.id
    });

    res.json({ order, bookingId: booking._id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not create order' });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    const crypto = require('crypto');
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + '|' + razorpay_payment_id)
      .digest('hex');

    if(generated_signature === razorpay_signature){
      const booking = await Booking.findById(bookingId);
      booking.razorpayPaymentId = razorpay_payment_id;
      booking.razorpaySignature = razorpay_signature;
      await booking.save();
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort('-createdAt');
    res.json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ bookings: [] });
  }
};
