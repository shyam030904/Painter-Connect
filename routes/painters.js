const express = require('express');
const Painter = require('../models/Painter');
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

const router = express.Router();

// Get All Approved Painters
router.get('/', async (req, res) => {
  try {
    const { city, servicePackage } = req.query;
    let query = { isApproved: true, isAvailable: true };
    
    if (city) query['location.city'] = new RegExp(city, 'i');
    
    const painters = await Painter.find(query)
      .select('-password')
      .sort({ rating: -1 });
    
    res.json(painters);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Painter Profile
router.get('/:id', async (req, res) => {
  try {
    const painter = await Painter.findById(req.params.id)
      .select('-password')
      .populate('reviews.user', 'name');
    
    if (!painter) return res.status(404).json({ msg: 'Painter not found' });
    
    res.json(painter);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get Painter Bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ painter: req.user.id })
      .populate('user', 'name phone address')
      .sort({ scheduledDate: 1 });
    
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;