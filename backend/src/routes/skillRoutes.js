// backend/src/routes/skillRoutes.js
const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skillController");
const { requireAuth } = require("../middleware/authMiddleware");

// Public catalogue routes
router.get("/", skillController.getAllSkills);
router.get("/:id", skillController.getSkillById);

// Student skill modification routes
router.post("/student", requireAuth, skillController.addStudentSkill);
router.put("/student/:skillId", requireAuth, skillController.updateStudentSkill);
router.delete("/student/:skillId", requireAuth, skillController.deleteStudentSkill);

module.exports = router;
