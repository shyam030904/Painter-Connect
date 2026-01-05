const mongoose = require('mongoose');

const painterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  experience: { type: Number, required: true },
  skills: [String],
  location: {
    city: String,
    state: String,
    serviceAreas: [String]
  },
  pricing: {
    economy: Number,
    premium: Number,
    luxury: Number,
    superLuxury: Number
  },
  rating: { type: Number, default: 0 },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  isApproved: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
  portfolio: [String],
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
}, { timestamps: true });

module.exports = mongoose.model('Painter', painterSchema);