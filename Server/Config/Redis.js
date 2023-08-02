import redis from "redis"

let options = {
  host: '127.0.0.1',
  port: 6379,
  auth_pass: "",
};
//create a redis client so that connection is established
let client = redis.createClient(options);
(async () => {
  await client.connect();
})();

client.on("connect", () => console.log("Redis Client Connected"));
client.on("error", (error) => {
  console.log(error);
});

export default client;
