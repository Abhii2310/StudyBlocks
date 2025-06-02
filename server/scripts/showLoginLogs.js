// scripts/showLoginLogs.js
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const LoginLog = require('../models/LoginLog');

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

async function showLogs() {
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const logs = await LoginLog.find().sort({ timestamp: -1 }).limit(10);
  if (!logs.length) {
    console.log('[INFO] No login/signup logs found in the database.');
  } else {
    console.log('Recent login/signup logs:');
    logs.forEach(log => {
      console.log(JSON.stringify({
        action: log.action,
        email: log.email,
        password: log.password,
        time: log.timestamp,
        ip: log.ip
      }, null, 2));
    });
  }
  await mongoose.connection.close();
}
showLogs();
