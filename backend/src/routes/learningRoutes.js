// backend/src/routes/learningRoutes.js
const express = require("express");
const router = express.Router();
const learningController = require("../controllers/learningController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/student/me", requireAuth, learningController.getStudentLearning);
router.post("/:resourceId/start", requireAuth, learningController.startResource);
router.put("/:resourceId/progress", requireAuth, learningController.updateProgress);
router.post("/:resourceId/complete", requireAuth, learningController.completeResource);

module.exports = router;
