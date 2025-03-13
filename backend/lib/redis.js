import Redis from 'ioredis';
const redis =new Redis({
  host: 'localhost',
  port: '6379',
});
await redis.set('foo', 'bar');
export default redis;