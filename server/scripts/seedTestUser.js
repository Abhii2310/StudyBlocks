// Script to seed a test user for Cypress E2E tests
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studyblocks';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const email = 'testuser@example.com';
  const password = 'password123';
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({
      firstName: 'Test',
      lastName: 'User',
      email,
      password: await bcrypt.hash(password, 10),
      accountType: 'Student',
      additionalDetails: mongoose.Types.ObjectId(),
      image: 'https://placehold.co/100x100',
    });
    await user.save();
    console.log('Test user created.');
  } else {
    console.log('Test user already exists.');
  }
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
