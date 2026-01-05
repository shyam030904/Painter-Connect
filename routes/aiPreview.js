const express = require('express');
const multer = require('multer');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files allowed'), false);
    }
  }
});

// AI Wall Color Preview
router.post('/preview', auth, upload.single('image'), async (req, res) => {
  try {
    const { colors } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ msg: 'No image uploaded' });
    }

    // Convert image to base64
    const imageBase64 = req.file.buffer.toString('base64');
    
    // Mock AI response (replace with actual AI service)
    const aiResponse = {
      previewUrl: `data:image/jpeg;base64,${imageBase64}`,
      processedColors: JSON.parse(colors || '[]'),
      confidence: 0.95
    };

    res.json(aiResponse);
  } catch (err) {
    res.status(500).json({ msg: 'AI processing error' });
  }
});

// Get Color Palette
router.get('/colors', (req, res) => {
  const colorPalette = [
    { name: 'Classic White', hex: '#FFFFFF', category: 'neutral' },
    { name: 'Warm Beige', hex: '#F5F5DC', category: 'neutral' },
    { name: 'Sky Blue', hex: '#87CEEB', category: 'cool' },
    { name: 'Sage Green', hex: '#9CAF88', category: 'nature' },
    { name: 'Sunset Orange', hex: '#FF8C69', category: 'warm' },
    { name: 'Lavender', hex: '#E6E6FA', category: 'cool' },
    { name: 'Charcoal Gray', hex: '#36454F', category: 'neutral' },
    { name: 'Coral Pink', hex: '#FF7F7F', category: 'warm' }
  ];
  
  res.json(colorPalette);
});

module.exports = router;