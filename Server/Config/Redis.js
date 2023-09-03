import redis from "redis"
import { createClient } from "redis";
let options = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
};
//create a redis redisClient so that connection is established
// let redisClient;
// (async () => {
//   redisClient = redis.createClient(options);
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));
//   await redisClient.connect();
// })();
// let client = redis.createClient(options);

// client.on("error", (error) => {
//   console.log(error);
// });
let redisClient = redis.createClient(options);
(async () => {
  await redisClient.connect();
})();
// let redisClient = redis.createClient(options);
//  redisClient.on("error", (error) => {
//    console.log(error);
//  });
redisClient.on("connect", () => console.log("RedisClient Connected"));
redisClient.on("error", (error) => {
  console.log(error);
});

export default redisClient;
