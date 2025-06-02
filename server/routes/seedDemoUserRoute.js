const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// POST /api/seed-demo-user
router.post('/', async (req, res) => {
  try {
    const email = 'demo4@studyblocks.com';
    const password = 'demopassword';
    let user = await User.findOne({ email });
    if (!user) {
      const hash = await bcrypt.hash(password, 10);
      user = await User.create({
        firstName: 'Demo',
        lastName: 'User',
        email,
        password: hash,
        accountType: 'Student',
        approved: true,
        additionalDetails: null,
        image: 'https://placehold.co/100x100',
      });
    }
    res.json({ success: true, message: 'Demo user seeded', user });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Failed to seed demo user', error: e.message });
  }
});

module.exports = router;
