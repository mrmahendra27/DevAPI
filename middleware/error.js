const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  if (err.name == "CastError") {
    const message = `Resoutrce of id ${err.value} not found!`;
    error = new ErrorResponse(message, 404);
  } else if (err.code == 11000) {
    const message = `Duplicate field value found!`;
    error = new ErrorResponse(message, 400);
  } else if (err.name == "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 422);
  }

  res.status(error.statusCode || 500).json({
    status: false,
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
