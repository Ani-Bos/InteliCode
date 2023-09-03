import redisClient from "../Config/Redis.js";
//id--key signalData--value from controller
export const saveCallId = (key, value) => {
  return new Promise((resolve, reject) => {
    //set is redis method
    //expiry is 1 day --24x60x60==86400
    console.log(value, "entering into save call id");
    try {
      console.log(value, "entering into save call id in try in video.js");
      console.log("key is " + key);
      console.log("value is " + JSON.stringify(value));
      console.log("redis client is " + redisClient)
      redisClient.SET(key, JSON.stringify(value), "EX", 86400, (err, res) => {
         console.log("key after set is " + key);
         console.log("value after set is " + JSON.stringify(value));
         if (err) {
          //  console.log(err);
           reject(err);
         }
         //if no error send response
         console.log("response is sent" + res);
         resolve(res);
       });
    } catch (error) {
      console.log(error)
    }
  });
};
export const getCallId = (key) => {
  console.log("entering into getcall id")
  return new Promise((resolve, reject) => {
     redisClient.GET(key, (err, res) => {
       if (err) {
         reject(err);
       }
       //bcoz we stringify earlier so we need to parse it to json too
       resolve(JSON.parse(res));
       console.log("parsed json is " + JSON.parse(res));
     });
  });
};
