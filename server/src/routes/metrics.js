const express = require('express');
const router = express.Router();
const client = require('prom-client');

// Create a registry and register default metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Metrics endpoint
router.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    const metrics = await register.metrics();
    res.end(metrics);
  } catch (error) {
    res.status(500).end(error);
  }
});

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'up' });
});

module.exports = router;
