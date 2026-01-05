const mongoose = require('mongoose');

const consultancySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['online', 'on-site'], required: true },
  scheduledDate: { type: Date, required: true },
  duration: { type: Number, default: 60 }, // minutes
  topics: [{
    type: String,
    enum: ['color-combinations', 'paint-types', 'budget-planning', 'surface-preparation']
  }],
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled' 
  },
  notes: String,
  cost: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Consultancy', consultancySchema);