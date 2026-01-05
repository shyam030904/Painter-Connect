const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  painter: { type: mongoose.Schema.Types.ObjectId, ref: 'Painter', required: true },
  propertyType: { 
    type: String, 
    enum: ['1BHK', '2BHK', 'furnished', 'semi-furnished', 'wooden-surfaces'],
    required: true 
  },
  servicePackage: { 
    type: String, 
    enum: ['economy', 'premium', 'luxury', 'super-luxury'],
    required: true 
  },
  area: { type: Number, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  scheduledDate: { type: Date, required: true },
  estimatedCost: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'in-progress', 'completed', 'cancelled'],
    default: 'pending' 
  },
  aiPreviewImages: [String],
  specialRequirements: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);