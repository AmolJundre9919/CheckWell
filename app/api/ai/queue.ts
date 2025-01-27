import Queue from 'bull';
import { Redis } from '@upstash/redis';

export const websiteQueue = new Queue('website-generation', {
  redis: process.env.UPSTASH_REDIS_URL!
});

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!
});