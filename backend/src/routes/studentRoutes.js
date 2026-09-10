// backend/src/routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/me", requireAuth, studentController.getProfile);
router.put("/me", requireAuth, studentController.updateProfile);
router.get("/me/skills", requireAuth, studentController.getSkills);
router.put("/me/skills", requireAuth, studentController.updateSkills);
router.get("/me/readiness", requireAuth, studentController.getReadiness);
router.get("/me/activity", requireAuth, studentController.getActivity);
router.get("/me/notifications", requireAuth, studentController.getNotifications);

module.exports = router;
