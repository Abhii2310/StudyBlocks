const promBundle = require('express-prom-bundle');
const { collectDefaultMetrics } = require('prom-client');

// Create a metrics middleware
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
  customLabels: { app: 'studyblocks' },
  promClient: {
    collectDefaultMetrics: {
      timeout: 1000,
    },
  },
});

// Start collecting default metrics
collectDefaultMetrics({ prefix: 'studyblocks_' });

module.exports = metricsMiddleware;
