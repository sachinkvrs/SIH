// backend/src/routes/healthRoutes.js
const express = require("express");
const router = express.Router();
const prisma = require("../config/db");

router.get("/", async (req, res) => {
  let dbStatus = "disconnected";
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = "connected";
  } catch (err) {
    dbStatus = "error: " + (err.message || "database unavailable");
  }

  res.status(200).json({
    status: "healthy",
    service: "SkillBridge API Engine",
    version: "1.0.0",
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
