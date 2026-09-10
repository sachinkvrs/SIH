// backend/src/routes/careerRoutes.js
const express = require("express");
const router = express.Router();
const careerController = require("../controllers/careerController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/", careerController.getAllCareers);
router.get("/:id", careerController.getCareerById);
router.get("/student/recommendations", requireAuth, careerController.getCareerRecommendations);
router.get("/student/skill-gaps", requireAuth, careerController.getStudentSkillGaps);

module.exports = router;
