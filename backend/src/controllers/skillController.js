// backend/src/controllers/skillController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Get all skills in catalogue
 */
async function getAllSkills(req, res) {
  try {
    const { category, search } = req.query;
    const where = {};

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const skills = await prisma.skill.findMany({
      where,
      orderBy: { name: "asc" }
    });

    return success(res, skills);
  } catch (err) {
    console.error("getAllSkills error:", err);
    return error(res, "Failed to fetch skills catalogue.", 500);
  }
}

/**
 * Get skill by ID
 */
async function getSkillById(req, res) {
  try {
    const { id } = req.params;
    const skill = await prisma.skill.findUnique({
      where: { id },
      include: {
        careerSkills: { include: { career: true } },
        learningResources: true
      }
    });

    if (!skill) {
      return error(res, "Skill not found.", 404);
    }

    return success(res, skill);
  } catch (err) {
    console.error("getSkillById error:", err);
    return error(res, "Failed to fetch skill.", 500);
  }
}

/**
 * Add a skill to student's profile
 */
async function addStudentSkill(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { skillId, currentLevel = 50, source = "SELF" } = req.body;
    if (!skillId) {
      return error(res, "skillId is required.", 400);
    }

    const existing = await prisma.studentSkill.findUnique({
      where: {
        studentId_skillId: {
          studentId: req.studentProfile.id,
          skillId
        }
      }
    });

    if (existing) {
      return error(res, "Skill already exists on student profile. Use PUT to update.", 409);
    }

    const studentSkill = await prisma.studentSkill.create({
      data: {
        studentId: req.studentProfile.id,
        skillId,
        currentLevel,
        source
      },
      include: { skill: true }
    });

    return success(res, studentSkill, "Skill added to profile successfully.", 201);
  } catch (err) {
    console.error("addStudentSkill error:", err);
    return error(res, "Failed to add student skill.", 500);
  }
}

/**
 * Update a specific skill on student profile
 */
async function updateStudentSkill(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { skillId } = req.params;
    const { currentLevel, verifiedLevel, verificationStatus, source } = req.body;

    const updated = await prisma.studentSkill.update({
      where: {
        studentId_skillId: {
          studentId: req.studentProfile.id,
          skillId
        }
      },
      data: {
        currentLevel,
        verifiedLevel,
        verificationStatus,
        source
      },
      include: { skill: true }
    });

    return success(res, updated, "Student skill updated successfully.");
  } catch (err) {
    console.error("updateStudentSkill error:", err);
    return error(res, "Failed to update student skill.", 500);
  }
}

/**
 * Delete a skill from student profile
 */
async function deleteStudentSkill(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { skillId } = req.params;

    await prisma.studentSkill.delete({
      where: {
        studentId_skillId: {
          studentId: req.studentProfile.id,
          skillId
        }
      }
    });

    return success(res, {}, "Skill removed from profile.");
  } catch (err) {
    console.error("deleteStudentSkill error:", err);
    return error(res, "Failed to delete student skill.", 500);
  }
}

module.exports = {
  getAllSkills,
  getSkillById,
  addStudentSkill,
  updateStudentSkill,
  deleteStudentSkill
};
