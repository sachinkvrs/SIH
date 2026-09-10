// backend/src/config/env.js
const dotenv = require("dotenv");
const path = require("path");

// Load .env from backend root
dotenv.config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/skillbridge?schema=public",
  JWT_SECRET: process.env.JWT_SECRET || "skillbridge_super_secret_jwt_key_sih_2026_production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d"
};
