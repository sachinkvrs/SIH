// backend/src/routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// All application routes require authentication
router.use(requireAuth);

// Student routes
router.get("/my", requireRole("STUDENT"), applicationController.getMyApplications);
router.post("/apply", requireRole("STUDENT"), applicationController.applyForJob);
router.post("/:id/withdraw", requireRole("STUDENT"), applicationController.withdrawApplication);

// General viewing (access-controlled in controller)
router.get("/:id", applicationController.getApplicationById);

// Recruiter / Admin status updates
router.patch("/:id/status", requireRole("RECRUITER", "ADMIN"), applicationController.updateApplicationStatus);

module.exports = router;
