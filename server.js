"use strict";
// Dependencies
const path = require("path");
const express = require("express");
const cors = require("cors");
const peopleRoute = require("./routes/people");
const planetsRoute = require("./routes/planets");
// modules

// Retrieve values from config
// dotenv.config({ path: "./config/config.env" });

// initialize app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/people", peopleRoute);
app.use("/planets", planetsRoute);

app.get("/", (req, res) => {
  res.send("grow api");
});
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
