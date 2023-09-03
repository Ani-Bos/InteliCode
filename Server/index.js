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
import Meet from "./Routes/Meet.js";
import user from "./Routes/auth.js"; 
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
  Meet,
  bodyParser.urlencoded({ extended: false }),
]);
app.use(express.json());
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", socketManager);

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
