const express = require("express");
const dotenv = require("dotenv");

//Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} and connect to port ${PORT}`
  )
);
