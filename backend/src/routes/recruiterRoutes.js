// backend/src/routes/recruiterRoutes.js
const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Recruiter routes
router.use(requireAuth);
router.use(requireRole("RECRUITER", "ADMIN"));

router.get("/overview", recruiterController.getRecruiterOverview);
router.get("/candidates", recruiterController.searchCandidates);
router.get("/candidates/:id", recruiterController.getCandidateProfile);

module.exports = router;
