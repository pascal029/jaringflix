const Redis = require("ioredis");
const password = process.env.REDIS_PASSWORD;

const redis = new Redis({
  port: 15573, // Redis port
  host: "redis-15573.c277.us-east-1-3.ec2.cloud.redislabs.com", // Redis host
  password: password,
});

module.exports = redis;
