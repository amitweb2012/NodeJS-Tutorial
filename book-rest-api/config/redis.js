const redis = require('ioredis');
const redisHost = process.env.REDIS_HOST || 'redis';
const redisPort = process.env.REDIS_PORT || 6379;
const client = new redis({
  host: redisHost,
  port: redisPort
});
client.connect().catch((err) => console.error('Redis error:', err));
module.exports = client;