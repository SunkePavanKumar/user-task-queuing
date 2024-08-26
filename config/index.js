require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    REDIS_URL : process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    RATE_LIMIT : {
        POINTS : parseInt(process.env.RATE_LIMIT_POINTS, 10) || 20,
        DURATION : parseInt(process.env.RATE_LIMIT_DURATION, 10) || 60
    }

}