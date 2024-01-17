const ErrorResponse = require("../utils/errorResponse");

const ErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  // Log to console for developer
  console.log(err);

  // Mongoose bad ObjectId error
  if (err.name === "CastError") {
    const message = `Bootcamp not found. Invalid ${err.path}: ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const value = Object.values(err.keyValue)[0];
    const property = Object.keys(err.keyValue)[0];
    const message = `Duplicate field value: {${property}: ${value}}`;
    error = new ErrorResponse(message, 400);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
  // Send response
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

module.exports = ErrorHandler;
