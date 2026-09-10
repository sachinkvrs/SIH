// backend/src/routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const jobController = require("../controllers/jobController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Public / student listings
router.get("/recommendations", requireAuth, requireRole("STUDENT"), jobController.getStudentJobRecommendations);
router.get("/", jobController.getAllJobs);
router.get("/:id", jobController.getJobById);

// Recruiter / Admin job management
router.post("/", requireAuth, requireRole("RECRUITER", "ADMIN"), jobController.createJob);
router.put("/:id", requireAuth, requireRole("RECRUITER", "ADMIN"), jobController.updateJob);
router.delete("/:id", requireAuth, requireRole("RECRUITER", "ADMIN"), jobController.deleteJob);

module.exports = router;
