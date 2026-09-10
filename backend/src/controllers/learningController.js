// backend/src/controllers/learningController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { calculateReadinessScore } = require("../services/readinessService");
const { calculateSkillGaps } = require("../services/skillGapService");

/**
 * Get student's learning progress across resources
 */
async function getStudentLearning(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const progress = await prisma.learningProgress.findMany({
      where: { studentId: req.studentProfile.id },
      include: {
        resource: { include: { skill: true } }
      },
      orderBy: { updatedAt: "desc" }
    });

    return success(res, progress);
  } catch (err) {
    console.error("getStudentLearning error:", err);
    return error(res, "Failed to fetch learning progress.", 500);
  }
}

/**
 * Start learning a resource
 */
async function startResource(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { resourceId } = req.params;

    const record = await prisma.learningProgress.upsert({
      where: {
        studentId_resourceId: {
          studentId: req.studentProfile.id,
          resourceId
        }
      },
      update: {
        progress: 0.1
      },
      create: {
        studentId: req.studentProfile.id,
        resourceId,
        progress: 0.1,
        completed: false
      },
      include: { resource: true }
    });

    return success(res, record, "Resource study started.");
  } catch (err) {
    console.error("startResource error:", err);
    return error(res, "Failed to start learning resource.", 500);
  }
}

/**
 * Update learning progress percentage for a resource
 */
async function updateProgress(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { resourceId } = req.params;
    const { progress } = req.body; // 0.0 to 1.0

    if (progress === undefined || progress < 0 || progress > 1) {
      return error(res, "Valid progress between 0.0 and 1.0 is required.", 400);
    }

    const isDone = progress >= 1.0;

    const record = await prisma.learningProgress.upsert({
      where: {
        studentId_resourceId: {
          studentId: req.studentProfile.id,
          resourceId
        }
      },
      update: {
        progress,
        completed: isDone,
        completedAt: isDone ? new Date() : undefined
      },
      create: {
        studentId: req.studentProfile.id,
        resourceId,
        progress,
        completed: isDone,
        completedAt: isDone ? new Date() : undefined
      },
      include: { resource: { include: { skill: true } } }
    });

    return success(res, record, "Progress updated successfully.");
  } catch (err) {
    console.error("updateProgress error:", err);
    return error(res, "Failed to update learning progress.", 500);
  }
}

/**
 * Mark a learning resource as 100% complete
 */
async function completeResource(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { resourceId } = req.params;

    const record = await prisma.learningProgress.upsert({
      where: {
        studentId_resourceId: {
          studentId: req.studentProfile.id,
          resourceId
        }
      },
      update: {
        progress: 1.0,
        completed: true,
        completedAt: new Date()
      },
      create: {
        studentId: req.studentProfile.id,
        resourceId,
        progress: 1.0,
        completed: true,
        completedAt: new Date()
      },
      include: { resource: { include: { skill: true } } }
    });

    // 1. Recalculate readiness
    const studentId = req.studentProfile.id;
    const [allSkills, allResults, allProgress, career] = await Promise.all([
      prisma.studentSkill.findMany({ where: { studentId }, include: { skill: true } }),
      prisma.assessmentResult.findMany({ where: { studentId } }),
      prisma.learningProgress.findMany({ where: { studentId } }),
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
      where: { id: studentId },
      data: { readinessScore: readinessData.readinessScore }
    });

    // 2. Create Notification
    await prisma.notification.create({
      data: {
        userId: req.user.id,
        title: `Resource Completed: ${record.resource.title} 🎓`,
        message: `You completed the module. Your readiness score is now ${readinessData.readinessScore}%.`,
        type: "LEARNING"
      }
    });

    return success(res, {
      record,
      newReadinessScore: readinessData.readinessScore
    }, "Learning resource completed successfully.");
  } catch (err) {
    console.error("completeResource error:", err);
    return error(res, "Failed to complete learning resource.", 500);
  }
}

module.exports = {
  getStudentLearning,
  startResource,
  updateProgress,
  completeResource
};
