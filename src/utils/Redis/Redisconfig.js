import { createClient } from 'redis';


const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const redisClient = createClient({ 
    url: redisUrl,
    socket: {
        tls: redisUrl.startsWith('rediss://'),
        rejectUnauthorized: false 
    }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    try { 
        await redisClient.connect();
        console.log('✅ Connected to Redis successfully');
    } catch (error) {
        console.error('❌ Could not connect to Redis', error);
    }
};

export { connectRedis, redisClient };