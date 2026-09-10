// backend/src/routes/institutionRoutes.js
const express = require("express");
const router = express.Router();
const institutionController = require("../controllers/institutionController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Institution routes
router.use(requireAuth);
router.use(requireRole("INSTITUTION", "ADMIN"));

router.get("/analytics", institutionController.getInstitutionAnalytics);

module.exports = router;
