// backend/src/routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAuth } = require("../middleware/authMiddleware");
const { requireRole } = require("../middleware/roleMiddleware");

router.use(requireAuth);
router.use(requireRole("ADMIN"));

router.get("/stats", adminController.getAdminStats);
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.updateUser);

module.exports = router;
