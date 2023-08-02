// const io = require("./index").io;

// module.exports = (socket) => {
//   try {
//     console.log("Connected");
//     socket.on("code", (data, callback) => {
//       socket.broadcast.emit("code", data);
//     });
//   } catch (ex) {
//     console.log(ex.message);
//   }
// };
// socketManager.js
// const socketManager = (socket) => {
//   try {
//     console.log("Connected");
//     socket.on("code", (data, callback) => {
//       socket.broadcast.emit("code", data);
//     });
//   } catch (ex) {
//     console.log(ex.message);
//   }
// };

// export default socketManager;

const socketManager = (socket) => {
  try {
    console.log("Connected");
    socket.on("code", (data, callback) => {
      // Broadcast the "code" event to all connected clients
      io.emit("code", data); // Use io.emit instead of socket.broadcast.emit
    });
  } catch (ex) {
    console.log(ex.message);
  }
};

export default socketManager;


