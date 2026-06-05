const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const syncQueue = new Queue("gmail-sync",{
    connection: redisConnection
});

module.exports= syncQueue;