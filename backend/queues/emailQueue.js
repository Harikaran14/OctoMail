const { Queue } = require("bullmq");
const redisConnection = require("../config/redis");

const emailQueue= new Queue("email-processing",{
    connection: redisConnection
});

module.exports=emailQueue;

