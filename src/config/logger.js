const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
    level: 'info',

  format: combine(
    timestamp(),
    printf(info => `${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/errorLogs.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/allLogs.log' })
  ],
});

module.exports = logger;
