const express = require('express');
const Consultancy = require('../models/Consultancy');
const auth = require('../middleware/auth');

const router = express.Router();

// Book Consultancy
router.post('/', auth, async (req, res) => {
  try {
    const { type, scheduledDate, topics, notes } = req.body;
    
    const consultancy = new Consultancy({
      user: req.user.id,
      type,
      scheduledDate,
      topics,
      notes,
      cost: type === 'on-site' ? 500 : 0
    });

    await consultancy.save();
    res.json(consultancy);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get User Consultancies
router.get('/my-consultancies', auth, async (req, res) => {
  try {
    const consultancies = await Consultancy.find({ user: req.user.id })
      .sort({ scheduledDate: -1 });
    res.json(consultancies);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;