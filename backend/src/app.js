// backend/src/app.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { CLIENT_URL, NODE_ENV } = require("./config/env");
const { notFoundHandler, errorHandler } = require("./middleware/errorMiddleware");

// Route imports
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const skillRoutes = require("./routes/skillRoutes");
const assessmentRoutes = require("./routes/assessmentRoutes");
const careerRoutes = require("./routes/careerRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const learningRoutes = require("./routes/learningRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const passportRoutes = require("./routes/passportRoutes");
const recruiterRoutes = require("./routes/recruiterRoutes");
const institutionRoutes = require("./routes/institutionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://localhost:5000",
  CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || NODE_ENV === "development") {
      return callback(null, true);
    }
    return callback(null, true); // Dev-friendly fallback
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Request logger
if (NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// Body parsing with support for JSON and urlencoded data (supporting base64 avatars up to 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Root welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the SkillBridge Intelligence Backend API",
    documentation: "/api/health",
    status: "active"
  });
});

// Mount API routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/learning", learningRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/passport", passportRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/institution", institutionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
