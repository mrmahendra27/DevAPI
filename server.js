const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const SERVER = process.env.NODE_ENV;

//Dev logging middleware
if (SERVER == "development") {
  app.use(morgan("dev"));
}

//Load route files
const bootcamp = require("./routes/bootcamp");

//Mount routers
app.use("/api/v1/bootcamp", bootcamp);

//Loading error handling middleware
app.use(errorHandler);

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${SERVER} and connect to port ${PORT}`.yellow.bold
  )
);

//Handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`.cyan.underline.bold);
  server.close(() => process.exit(1));
});
