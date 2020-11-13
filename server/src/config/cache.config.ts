import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
  ttl: process.env.CACHE_TTL || 5,
  maxItems: process.env.CACHE_MAX || 10,
  host: process.env.CACHE_HOST || 'localhost',
  port: process.env.CACHE_PORT || 6379,
  db: process.env.CACHE_DB || 13,
  uri: process.env.REDISCLOUD_URL
}));