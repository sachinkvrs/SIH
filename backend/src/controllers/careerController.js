// backend/src/controllers/careerController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { recommendCareers } = require("../services/careerRecommendationService");
const { calculateSkillGaps } = require("../services/skillGapService");

/**
 * Get all careers with required skills
 */
async function getAllCareers(req, res) {
  try {
    const careers = await prisma.career.findMany({
      include: {
        careerSkills: { include: { skill: true } }
      }
    });

    return success(res, careers);
  } catch (err) {
    console.error("getAllCareers error:", err);
    return error(res, "Failed to fetch careers.", 500);
  }
}

/**
 * Get career by ID
 */
async function getCareerById(req, res) {
  try {
    const { id } = req.params;
    const career = await prisma.career.findUnique({
      where: { id },
      include: {
        careerSkills: { include: { skill: true } }
      }
    });

    if (!career) {
      return error(res, "Career not found.", 404);
    }

    return success(res, career);
  } catch (err) {
    console.error("getCareerById error:", err);
    return error(res, "Failed to fetch career.", 500);
  }
}

/**
 * Get career recommendations for current student
 */
async function getCareerRecommendations(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const [studentSkills, careers] = await Promise.all([
      prisma.studentSkill.findMany({
        where: { studentId: req.studentProfile.id },
        include: { skill: true }
      }),
      prisma.career.findMany({
        include: { careerSkills: { include: { skill: true } } }
      })
    ]);

    const recommendations = recommendCareers({
      studentSkills,
      careers,
      careerInterest: req.studentProfile.careerGoal || "Data Analyst"
    });

    return success(res, recommendations);
  } catch (err) {
    console.error("getCareerRecommendations error:", err);
    return error(res, "Failed to compute career recommendations.", 500);
  }
}

/**
 * Get detailed skill gaps for current student against active career goal
 */
async function getStudentSkillGaps(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const careerGoal = req.query.careerGoal || req.studentProfile.careerGoal || "Data Analyst";

    const [studentSkills, career] = await Promise.all([
      prisma.studentSkill.findMany({
        where: { studentId: req.studentProfile.id },
        include: { skill: true }
      }),
      prisma.career.findFirst({
        where: { title: { contains: careerGoal, mode: "insensitive" } },
        include: { careerSkills: { include: { skill: true } } }
      })
    ]);

    if (!career) {
      return error(res, `Target career '${careerGoal}' not found.`, 404);
    }

    const gaps = calculateSkillGaps(studentSkills, career.careerSkills);

    return success(res, {
      career: career.title,
      totalGaps: gaps.filter((g) => g.gap > 0).length,
      highPriorityGapsCount: gaps.filter((g) => g.priority === "HIGH").length,
      gaps
    });
  } catch (err) {
    console.error("getStudentSkillGaps error:", err);
    return error(res, "Failed to compute skill gaps.", 500);
  }
}

module.exports = {
  getAllCareers,
  getCareerById,
  getCareerRecommendations,
  getStudentSkillGaps
};
