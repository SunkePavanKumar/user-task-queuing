const winston = require('winston');
const fs = require('fs');
const path = require('path');

// Define log file paths
const logDirPath = path.join(__dirname, '../../logs');
const logFilePath = path.join(logDirPath, 'task.log');
const errorLogFilePath = path.join(logDirPath, 'error.log');

// Ensure the logs directory exists
if (!fs.existsSync(logDirPath)) {
    fs.mkdirSync(logDirPath, { recursive: true });
}

// Create winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: logFilePath, level: 'info' }),
        new winston.transports.File({ filename: errorLogFilePath, level: 'error' }),
    ],
});

// Function to log task completion
function logTaskCompletion(user_id) {
    const logMessage = `${user_id}-task completed at-${new Date().toISOString()}`;
    logger.info(logMessage);
}

// Function to log errors
const logError = (error) => {
    logger.error(error);
};

module.exports = { logTaskCompletion, logError };
