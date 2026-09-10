// backend/src/utils/responseHelper.js

/**
 * Standardized success JSON response
 */
function success(res, data = {}, message = null, statusCode = 200) {
  const response = {
    success: true,
    data
  };
  if (message) {
    response.message = message;
  }
  return res.status(statusCode).json(response);
}

/**
 * Standardized error JSON response
 */
function error(res, message = "Something went wrong", statusCode = 500, errors = null) {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
}

module.exports = {
  success,
  error
};
