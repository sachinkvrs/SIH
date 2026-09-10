// backend/src/middleware/errorMiddleware.js
const { error } = require("../utils/responseHelper");

function notFoundHandler(req, res, next) {
  return error(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

function errorHandler(err, req, res, next) {
  console.error("Unhandled Application Error:", err);
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";
  return error(res, message, status);
}

module.exports = {
  notFoundHandler,
  errorHandler
};
