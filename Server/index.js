import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "path";
import http from "http";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import mongoconnect from "./db.js";
import filter from "./Middleware/Middleware.js";
import question from "./Routes/Questions.js";
import user from "./Routes/auth.js"; 
import xss from 'xss';
import socketManager from "./SocketManager.js";
import { createServer } from "http"; // Use createServer from http module
import { Server } from "socket.io"; // Use Server from socket.io module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app); // Create server using http's createServer
app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
]);
app.use(express.json());
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socketManager);

const sanitizeString = (str) => {
  return xss(str);
};

const connections = {};
const messages = {};
const timeOnline = {};

io.on("connection", (socket) => {
  socket.on("join-call", (path) => {
    if (connections[path] === undefined) {
      connections[path] = [];
    }
    connections[path].push(socket.id);

    timeOnline[socket.id] = new Date();

    for (let a = 0; a < connections[path].length; ++a) {
      io.to(connections[path][a]).emit(
        "user-joined",
        socket.id,
        connections[path]
      );
    }

    if (messages[path] !== undefined) {
      for (let a = 0; a < messages[path].length; ++a) {
        io.to(socket.id).emit(
          "chat-message",
          messages[path][a]["data"],
          messages[path][a]["sender"],
          messages[path][a]["socket-id-sender"]
        );
      }
    }

    console.log(path, connections[path]);
  });

  socket.on("signal", (toId, message) => {
    io.to(toId).emit("signal", socket.id, message);
  });

  socket.on("chat-message", (data, sender) => {
    data = sanitizeString(data);
    sender = sanitizeString(sender);

    var key;
    var ok = false;
    for (const [k, v] of Object.entries(connections)) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;
          ok = true;
        }
      }
    }

    if (ok === true) {
      if (messages[key] === undefined) {
        messages[key] = [];
      }
      messages[key].push({
        sender: sender,
        data: data,
        "socket-id-sender": socket.id,
      });
      console.log("message", key, ":", sender, data);

      for (let a = 0; a < connections[key].length; ++a) {
        io.to(connections[key][a]).emit(
          "chat-message",
          data,
          sender,
          socket.id
        );
      }
    }
  });

  socket.on("disconnect", () => {
    var diffTime = Math.abs(timeOnline[socket.id] - new Date());
    var key;
    for (const [k, v] of JSON.parse(
      JSON.stringify(Object.entries(connections))
    )) {
      for (let a = 0; a < v.length; ++a) {
        if (v[a] === socket.id) {
          key = k;

          for (let a = 0; a < connections[key].length; ++a) {
            io.to(connections[key][a]).emit("user-left", socket.id);
          }

          var index = connections[key].indexOf(socket.id);
          connections[key].splice(index, 1);

          console.log(key, socket.id, Math.ceil(diffTime / 1000));

          if (connections[key].length === 0) {
            delete connections[key];
          }
        }
      }
    }
  });
});



// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   const currentDir = new URL(".", import.meta.url);
//   app.use(express.static(path.join(currentDir, "client/build")));

//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(currentDir, "client/build", "index.html"));
//   });
// }
// Serve static files (including media files) from the 'client/build' directory
// Use import.meta.url to get the current module's URL
// const currentDir = new URL('.', import.meta.url).pathname;

// Serve static files (including media files) from the 'client/build' directory
// app.use(express.static(path.join(__dirname, 'client')));

// Handle React routing (only if the requested file is not found in 'client/build')
// app.get('*', function (req, res) {
//   res.sendFile();
// });


//endpoints setting

// const mongoose = require("mongoose");
mongoconnect();

//use of middlewares

// app.use((res, req, next) => {
//   console.log("HTTP Method - " + req.method + ", URL -" + req.URL);
//   next();
// });

//as the response send by controller in form of string so we convert it in form of json

// app.use("/users", userRouter);
// app.use("/visitor", visitor);
// app.get("/:id", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });
app.use("/api/question", question);
app.use("/api/auth", user);
// app.use('/api',Meet)
app.get("/", (req, res) => {
  res.send("hello");
});

// "mongodb+srv://aniket22:aniket123456@cluster0.aug4tch.mongodb.net/microtask2?retryWrites=true&w=majority"

// mongoose.connect("mongodb://localhost:27017/mt56", () => {
//   console.log("Connected to MongoDB");
// });

// app.listen(3000, () => {
//   console.log("started");
// });

server.listen(port, () => console.log(`Server started on port ${port}`));

// export 'app'
