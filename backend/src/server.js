// backend/src/server.js
const app = require("./app");
const { PORT, NODE_ENV } = require("./config/env");
const prisma = require("./config/db");

const server = app.listen(PORT, () => {
  console.log(`
  ======================================================
  🚀 SkillBridge Intelligence API Engine is Running!
  ======================================================
  • Environment : ${NODE_ENV}
  • Port        : ${PORT}
  • URL         : http://localhost:${PORT}
  • Health      : http://localhost:${PORT}/api/health
  • Ready for requests!
  ======================================================
  `);
});

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Shutting down SkillBridge API server gracefully...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Database connection closed.");
      process.exit(0);
    } catch (err) {
      console.error("Error during database disconnect:", err);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
