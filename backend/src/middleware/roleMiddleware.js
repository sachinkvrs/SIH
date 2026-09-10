// backend/src/middleware/roleMiddleware.js
const { error } = require("../utils/responseHelper");

/**
 * Role-based authorization middleware
 * @param  {...string} allowedRoles Roles that have access (e.g. "STUDENT", "RECRUITER", "INSTITUTION", "ADMIN")
 */
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return error(res, "Authentication required.", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return error(
        res,
        `Access denied. Requires one of the following roles: [${allowedRoles.join(", ")}]. Your role is: ${req.user.role}.`,
        403
      );
    }

    next();
  };
}

module.exports = {
  requireRole
};
