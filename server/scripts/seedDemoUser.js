// Script to seed a universal demo user for local login
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studyblocks';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const email = 'demo4@studyblocks.com';
  const password = 'demopassword';
  let user = await User.findOne({ email });
  if (!user) {
    // Create profile for additionalDetails
    const profile = await Profile.create({
      gender: 'Other',
      dateOfBirth: '2000-01-01',
      about: 'Universal demo user',
      contactNumber: 9876543210
    });
    user = new User({
      firstName: 'Demo',
      lastName: 'User',
      email,
      password: await bcrypt.hash(password, 10),
      accountType: 'Student',
      additionalDetails: profile._id,
      image: 'https://placehold.co/100x100',
      approved: true,
      active: true
    });
    await user.save();
    console.log('Demo user created.');
  } else {
    console.log('Demo user already exists.');
  }
  await mongoose.disconnect();
}

seed().catch(e => { console.error(e); process.exit(1); });
