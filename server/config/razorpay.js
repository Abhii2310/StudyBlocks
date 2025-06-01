const Razorpay = require("razorpay");


// Ensure Razorpay keys are set for all environments
const keyId = process.env.RAZORPAY_KEY;
const keySecret = process.env.RAZORPAY_SECRET;

if (!keyId || !keySecret) {
  // For local/dev, you can set dummy keys in .env
  console.error('❌ Razorpay keys are missing! Please set RAZORPAY_KEY and RAZORPAY_SECRET in your environment.');
  throw new Error('Razorpay keys missing in environment variables');
}

exports.instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
});