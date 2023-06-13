const express = require("express");
const cors = require("cors");
const path = require("path");
const { mongoconnect } = require("./db");
const filter = require("./Middleware/Middleware");
const app = express();
const axios = require("axios");
app.use(cors());
const port = process.env.PORT ||  5000;
//endpoints setting

// const mongoose = require("mongoose");
mongoconnect();
app.use(express.json());

//use of middlewares

// app.use((res, req, next) => {
//   console.log("HTTP Method - " + req.method + ", URL -" + req.URL);
//   next();
// });

//as the response send by controller in form of string so we convert it in form of json

// app.use("/users", userRouter);
// app.use("/visitor", visitor);
app.use("/api/auth", require("./Routes/auth"));
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

app.listen(port, () => console.log(`Server started on port ${port}`));

// export 'app'
module.exports = app;
