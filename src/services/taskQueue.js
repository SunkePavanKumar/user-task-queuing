const Queue = require('bull');
const { REDIS_URL } = require('../../config');
const logger = require('../utils/logger');

const taskQueue = new Queue('taskQueue', REDIS_URL);

taskQueue.process(async (job, done) => {
    try {
        const user_id = job.data;
        const timestamp = Date.now();

        if (!user_id) {
            throw new Error('user_id is undefined');
        }

        console.log(`${user_id} - task completed at - ${timestamp}`);
        logger.logTaskCompletion(user_id, timestamp);
        done();  // Mark the job as completed
    } catch (err) {
        done(err);  // Mark the job as failed
    }
});


const addTask = (data) => {
    taskQueue.add(data);
};

taskQueue.on('failed', (job, err) => {
    logger.logError(`Job failed for user ${job.data.user_id}: ${err}`);
});

module.exports = { addTask };
