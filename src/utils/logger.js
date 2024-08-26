// src/utils/logger.js
const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../../logs', 'task.log');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: logFilePath }),
    ],
});

const logTaskCompletion = (user_id, timestamp) => {
    logger.info({ user_id, timestamp });
};

module.exports = { logTaskCompletion };
