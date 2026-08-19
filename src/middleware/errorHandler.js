const { notFound: createNotFoundError } = require("../utils/apiError");

const notFound = (req, res, next) => {
  next(
    createNotFoundError(
      `Route not found: ${req.method} ${req.originalUrl}`
    )
  );
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for '${err.path}'`;
  }

  // Mongoose Validation Error
  else if (err.name === "ValidationError") {
    statusCode = 400;
    errors = Object.values(err.errors).map((e) => e.message);
    message = "Validation failed";
  }

  // Duplicate key error
  else if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue || {})[0];

    message = field
      ? `${field} already exists`
      : "Duplicate value found";
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = {
  notFound,
  errorHandler,
};