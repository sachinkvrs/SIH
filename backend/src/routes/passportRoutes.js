// backend/src/routes/passportRoutes.js
const express = require("express");
const router = express.Router();
const passportController = require("../controllers/passportController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

// Public verification endpoint
router.get("/verify/:credentialId", passportController.verifyPassport);

// Authenticated student passport endpoints
router.get("/my", requireAuth, requireRole("STUDENT"), passportController.getMyPassport);
router.get("/", requireAuth, requireRole("STUDENT"), passportController.getMyPassport);
router.post("/generate", requireAuth, requireRole("STUDENT"), passportController.generatePassport);

module.exports = router;
