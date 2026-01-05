const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Painter = require('../models/Painter');
const auth = require('../middleware/auth');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword, phone, address });
    await user.save();

    const payload = { user: { id: user.id, role: 'user' } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user: { id: user.id, name, email, role: 'user' } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Register Painter
router.post('/register-painter', async (req, res) => {
  try {
    const { name, email, password, phone, experience, skills, location, pricing } = req.body;
    
    let painter = await Painter.findOne({ email });
    if (painter) return res.status(400).json({ msg: 'Painter already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    painter = new Painter({ 
      name, email, password: hashedPassword, phone, 
      experience, skills, location, pricing 
    });
    await painter.save();

    res.json({ msg: 'Painter registered successfully. Awaiting admin approval.' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;
    
    const Model = userType === 'painter' ? Painter : User;
    const user = await Model.findOne({ email });
    
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    if (userType === 'painter' && !user.isApproved) {
      return res.status(400).json({ msg: 'Account pending approval' });
    }

    const payload = { user: { id: user.id, role: userType || 'user' } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: userType || 'user' 
      } 
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;