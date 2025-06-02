// Prometheus metrics middleware for StudyBlocks
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: '/monitoring/metrics',
  promClient: {
    collectDefaultMetrics: {
      timeout: 5000,
    },
  },
});
module.exports = metricsMiddleware;
