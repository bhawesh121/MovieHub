const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: String,
  movieTitle: String,
  showtime: String,
  seats: [String],
  amount: Number,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
