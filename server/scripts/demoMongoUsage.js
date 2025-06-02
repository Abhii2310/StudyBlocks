// Script: demoMongoUsage.js
// Purpose: Demonstrate MongoDB (Mongoose) usage in the StudyBlocks backend

// Script: demoMongoUsage.js
// Purpose: Demonstrate MongoDB (Mongoose) usage in the StudyBlocks backend, and simulate a login log entry

const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Try to load .env from both locations for compatibility
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env.test') });

// Support both MONGODB_URI and MONGODB_URL (for test/dev)
const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
if (!mongoUri) {
  console.error('No MongoDB URI found in environment variables (MONGODB_URI or MONGODB_URL)');
  process.exit(1);
}

// User model (minimal, for demo)
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

// LoginLog model
const loginLogSchema = new mongoose.Schema({
  email: String,
  loginTime: { type: Date, default: Date.now },
  ip: String
});
const LoginLog = mongoose.models.LoginLog || mongoose.model('LoginLog', loginLogSchema);

async function runDemo() {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to MongoDB! Using URI:', mongoUri);

  // 1. Create a demo user
  const demoUser = await User.create({
    firstName: 'Demo',
    lastName: 'User',
    email: `demo${Date.now()}@studyblocks.com`
  });
  console.log('Created user:', demoUser);

  // 2. Simulate a login and log the event
  const loginLog = await LoginLog.create({
    email: demoUser.email,
    ip: '127.0.0.1'
  });
  console.log('Simulated login and logged event:', loginLog);

  // 3. Query all users
  const allUsers = await User.find().limit(5);
  console.log('Sample users in DB:', allUsers);

  // 4. Query recent login logs
  const recentLogs = await LoginLog.find().sort({ loginTime: -1 }).limit(5);
  console.log('Recent login logs:', recentLogs);

  // 5. Clean up (delete the demo user and login log)
  await User.deleteOne({ _id: demoUser._id });
  await LoginLog.deleteOne({ _id: loginLog._id });
  console.log('Deleted demo user and login log.');

  mongoose.connection.close();
}

runDemo().catch(e => { console.error(e); process.exit(1); });
