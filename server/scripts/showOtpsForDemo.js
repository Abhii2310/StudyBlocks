// scripts/showOtpsForDemo.js
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load both env files robustly
const envPaths = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../.env.test')
];
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
  }
}

const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
if (!mongoUri) {
  console.error('[ERROR] No MongoDB URI found in environment variables (.env or .env.test).');
  process.exit(1);
}

const OTP = require('../models/OTP');

async function showOtps() {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const otps = await OTP.find({ email: 'demo2@studyblocks.com' }).sort({ createdAt: -1 }).limit(5);
  if (!otps.length) {
    console.log('[INFO] No OTPs found for demo2@studyblocks.com');
  } else {
    console.log('Latest OTPs for demo2@studyblocks.com:');
    otps.forEach(otp => {
      console.log(JSON.stringify({
        otp: otp.otp,
        createdAt: otp.createdAt,
        _id: otp._id
      }, null, 2));
    });
  }
  await mongoose.connection.close();
}
showOtps();
