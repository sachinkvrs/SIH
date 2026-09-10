// backend/src/routes/assessmentRoutes.js
const express = require("express");
const router = express.Router();
const assessmentController = require("../controllers/assessmentController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", assessmentController.getAllAssessments);
router.get("/:id", assessmentController.getAssessmentById);
router.post("/:id/submit", requireAuth, assessmentController.submitAssessment);
router.get("/student/results", requireAuth, assessmentController.getStudentResults);

module.exports = router;
