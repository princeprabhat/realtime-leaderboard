import Redis from "ioredis";
import config from "./config.js";

const redis = new Redis(config.redis.url, {
    tls: true,
});

redis.on('connect', () => console.info('Redis connected'));
redis.on('error', (err) => console.error('Redis error:', err));

export default redis;