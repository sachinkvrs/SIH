// backend/src/middleware/authMiddleware.js
const { verifyToken } = require("../utils/tokenHelper");
const { error } = require("../utils/responseHelper");
const prisma = require("../config/db");

async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return error(res, "Authentication required. Please provide a valid Bearer token.", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);
    if (!decoded || !decoded.userId) {
      return error(res, "Invalid or expired authentication token.", 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        studentProfile: true
      }
    });

    if (!user) {
      return error(res, "User associated with token was not found.", 401);
    }

    // Attach user and student profile to request
    req.user = user;
    req.studentProfile = user.studentProfile || null;

    next();
  } catch (err) {
    console.error("Authentication middleware error:", err);
    return error(res, "Authentication failed.", 500);
  }
}

module.exports = {
  requireAuth
};
