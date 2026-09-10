// backend/src/routes/roadmapRoutes.js
const express = require("express");
const router = express.Router();
const roadmapController = require("../controllers/roadmapController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/student/me", requireAuth, roadmapController.getStudentRoadmap);
router.post("/student/me/generate", requireAuth, roadmapController.generateRoadmap);
router.put("/items/:id/progress", requireAuth, roadmapController.updateRoadmapItemStatus);

module.exports = router;
