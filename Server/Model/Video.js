import redisClient from "../Config/Redis.js";
//id--key signalData--value from controller
export const saveCallId = (key, value) => {
  return new Promise((resolve, reject) => {
    //set is redis method
    //expiry is 1 day --24x60x60==86400
    console.log(value, "ngvgfgjfhtfhgfghjbgjugbtugbtjftfbty");
    try {
       redisClient.SET(key, JSON.stringify(value), "EX", 86400, (err, res) => {
         if (err) {
           console.log(err);
           reject(err);
         }
         //if no error send response
  
         resolve(res);
       });
    } catch (error) {
      console.log(error)
    }
   
  });
};

export const getCallId = (key) => {
  return new Promise((resolve, reject) => {
    redisClient.GET(key, (err, res) => {
      if (err) {
        reject(err);
      }
      //bcoz we stringify earlier so we need to parse it to json too
      resolve(JSON.parse(res));
    });
  });
};
