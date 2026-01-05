const express = require('express');
const Booking = require('../models/Booking');
const Painter = require('../models/Painter');
const auth = require('../middleware/auth');

const router = express.Router();

// Create Booking
router.post('/', auth, async (req, res) => {
  try {
    const { painterId, propertyType, servicePackage, area, address, scheduledDate, specialRequirements } = req.body;
    
    const painter = await Painter.findById(painterId);
    if (!painter) return res.status(404).json({ msg: 'Painter not found' });

    const estimatedCost = painter.pricing[servicePackage] * area;

    const booking = new Booking({
      user: req.user.id,
      painter: painterId,
      propertyType,
      servicePackage,
      area,
      address,
      scheduledDate,
      estimatedCost,
      specialRequirements
    });

    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get User Bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('painter', 'name phone rating')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update Booking Status (Painter)
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) return res.status(404).json({ msg: 'Booking not found' });
    
    booking.status = status;
    await booking.save();
    
    res.json(booking);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;