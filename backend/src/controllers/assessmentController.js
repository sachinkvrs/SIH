// backend/src/controllers/assessmentController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { calculateReadinessScore } = require("../services/readinessService");
const { calculateSkillGaps } = require("../services/skillGapService");

/**
 * Get all available assessments
 */
async function getAllAssessments(req, res) {
  try {
    const assessments = await prisma.assessment.findMany({
      include: {
        skill: true,
        _count: { select: { questions: true } }
      }
    });

    return success(res, assessments);
  } catch (err) {
    console.error("getAllAssessments error:", err);
    return error(res, "Failed to fetch assessments.", 500);
  }
}

/**
 * Get assessment details with questions
 */
async function getAssessmentById(req, res) {
  try {
    const { id } = req.params;
    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        skill: true,
        questions: true
      }
    });

    if (!assessment) {
      return error(res, "Assessment not found.", 404);
    }

    return success(res, assessment);
  } catch (err) {
    console.error("getAssessmentById error:", err);
    return error(res, "Failed to fetch assessment details.", 500);
  }
}

/**
 * Submit assessment answers and update student skills, gaps, readiness, and notification
 */
async function submitAssessment(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required to take an assessment.", 400);
    }

    const { id } = req.params;
    const { answers } = req.body; // Array of { questionId, selectedOptionIndex }

    const assessment = await prisma.assessment.findUnique({
      where: { id },
      include: {
        skill: true,
        questions: true
      }
    });

    if (!assessment) {
      return error(res, "Assessment not found.", 404);
    }

    // 1. Calculate score & percentage
    let correctCount = 0;
    const totalQuestions = assessment.questions.length || 1;

    assessment.questions.forEach((q) => {
      const userAns = answers?.find((a) => a.questionId === q.id);
      if (userAns && userAns.selectedOptionIndex === q.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = Number(((correctCount / totalQuestions) * 100).toFixed(1));

    // 2. Save AssessmentResult
    const result = await prisma.assessmentResult.create({
      data: {
        studentId: req.studentProfile.id,
        assessmentId: assessment.id,
        score: correctCount,
        percentage
      }
    });

    // 3. Update or upsert student's skill level and verification status
    const verifiedLevel = Math.max(50, Math.min(95, Math.round(percentage)));
    await prisma.studentSkill.upsert({
      where: {
        studentId_skillId: {
          studentId: req.studentProfile.id,
          skillId: assessment.skillId
        }
      },
      update: {
        verifiedLevel,
        currentLevel: verifiedLevel,
        verificationStatus: percentage >= 70 ? "VERIFIED" : "PENDING",
        source: "ASSESSMENT"
      },
      create: {
        studentId: req.studentProfile.id,
        skillId: assessment.skillId,
        verifiedLevel,
        currentLevel: verifiedLevel,
        verificationStatus: percentage >= 70 ? "VERIFIED" : "PENDING",
        source: "ASSESSMENT"
      }
    });

    // 4. Recalculate readiness
    const [allSkills, allResults, allProgress, career] = await Promise.all([
      prisma.studentSkill.findMany({ where: { studentId: req.studentProfile.id }, include: { skill: true } }),
      prisma.assessmentResult.findMany({ where: { studentId: req.studentProfile.id } }),
      prisma.learningProgress.findMany({ where: { studentId: req.studentProfile.id } }),
      prisma.career.findFirst({
        where: { title: { contains: req.studentProfile.careerGoal || "Data", mode: "insensitive" } },
        include: { careerSkills: { include: { skill: true } } }
      })
    ]);

    const gaps = career ? calculateSkillGaps(allSkills, career.careerSkills) : [];
    const readinessData = calculateReadinessScore({
      assessmentResults: allResults,
      studentSkills: allSkills,
      learningProgress: allProgress,
      careerGaps: gaps,
      projectsCount: 2
    });

    await prisma.studentProfile.update({
      where: { id: req.studentProfile.id },
      data: { readinessScore: readinessData.readinessScore }
    });

    // 5. Create Notification
    await prisma.notification.create({
      data: {
        userId: req.user.id,
        title: `Assessment Completed: ${assessment.title} 🎯`,
        message: `You scored ${correctCount}/${totalQuestions} (${percentage}%). Your verified ${assessment.skill.name} level is now ${verifiedLevel}%.`,
        type: "ASSESSMENT"
      }
    });

    return success(res, {
      result,
      score: correctCount,
      totalQuestions,
      percentage,
      verifiedLevel,
      newReadinessScore: readinessData.readinessScore,
      skill: assessment.skill.name
    }, "Assessment submitted and skill profile updated successfully.");
  } catch (err) {
    console.error("submitAssessment error:", err);
    return error(res, "Failed to submit assessment.", 500);
  }
}

/**
 * Get assessment results for current student
 */
async function getStudentResults(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const results = await prisma.assessmentResult.findMany({
      where: { studentId: req.studentProfile.id },
      include: {
        assessment: { include: { skill: true } }
      },
      orderBy: { completedAt: "desc" }
    });

    return success(res, results);
  } catch (err) {
    console.error("getStudentResults error:", err);
    return error(res, "Failed to fetch assessment results.", 500);
  }
}

module.exports = {
  getAllAssessments,
  getAssessmentById,
  submitAssessment,
  getStudentResults
};
