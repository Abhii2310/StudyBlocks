const { createLogger, transports, format } = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}
// Custom transport to ensure logs directory always exists before every write
class SafeFileTransport extends transports.File {
  log(info, callback) {
    const logsDir = path.dirname(this.filename);
    try {
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
    } catch (err) {
      // Log to console if we can't create the directory
      console.error('Failed to ensure logs directory:', err);
    }
    super.log(info, callback);
  }
}

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new SafeFileTransport({ filename: path.join(__dirname, 'logs', 'app.log') }),
    new transports.Console()
  ]
});
module.exports = logger;
