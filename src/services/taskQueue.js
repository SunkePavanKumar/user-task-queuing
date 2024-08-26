const Queue = require('bull');
const { REDIS_URL } = require('../../config');
const logger = require('../utils/logger');

const taskQueue = new Queue('taskQueue', REDIS_URL);

taskQueue.process(async (job, done) => {
    const { user_id } = job.data;
    const timestamp = Date.now();

    console.log(`${user_id}-task completed at-${timestamp}`);
    logger.logTaskCompletion(user_id, timestamp);
    done();
});

const addTask = (data) => {
    taskQueue.add(data);
};

module.exports = { addTask };
