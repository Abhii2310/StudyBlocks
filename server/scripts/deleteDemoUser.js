// Script to delete the demo user for a clean re-seed
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/studyblocks';

async function del() {
  await mongoose.connect(MONGODB_URI);
  const res = await User.deleteMany({ email: 'demo4@studyblocks.com' });
  console.log('Deleted demo4@studyblocks.com:', res.deletedCount);
  await mongoose.disconnect();
}

del().catch(e => { console.error(e); process.exit(1); });
