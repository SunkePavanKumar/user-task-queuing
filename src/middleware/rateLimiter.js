// src/middleware/rateLimiter.js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const Redis = require('ioredis');
const { REDIS_URL, RATE_LIMIT } = require('../../config');

const redisClient = new Redis(REDIS_URL);

const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'task_rate_limiter',
    points: RATE_LIMIT.POINTS, // 20 tasks per minute
    duration: RATE_LIMIT.DURATION, // Per 60 seconds
    execEvenly: true, // Distribute requests evenly
    blockDuration: 1, // Block for 1 second if rate limit exceeded
});

const rateLimiterMiddleware = (req, res, next) => {
    const { user_id } = req.body;

    rateLimiter.consume(user_id)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ message: 'Rate limit exceeded, try again later' });
        });
};

module.exports = { rateLimiter: rateLimiterMiddleware };
