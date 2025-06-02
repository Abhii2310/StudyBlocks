// models/LoginLog.js
const mongoose = require('mongoose');

const loginLogSchema = new mongoose.Schema({
  action: { type: String, enum: ['login', 'signup'], required: true },
  email: { type: String, required: true },
  password: { type: String }, // Only for demo/showcase (never store plaintext passwords in production)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ip: { type: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoginLog', loginLogSchema);
