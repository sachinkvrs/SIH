// backend/src/controllers/studentController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { calculateReadinessScore } = require("../services/readinessService");
const { calculateSkillGaps } = require("../services/skillGapService");

/**
 * Get current student profile
 */
async function getProfile(req, res) {
  try {
    const student = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
      include: {
        user: { select: { name: true, email: true, role: true } },
        skills: { include: { skill: true } }
      }
    });

    if (!student) {
      return error(res, "Student profile not found.", 404);
    }

    return success(res, student);
  } catch (err) {
    console.error("getProfile error:", err);
    return error(res, "Failed to fetch student profile.", 500);
  }
}

/**
 * Update current student profile
 */
async function updateProfile(req, res) {
  try {
    const {
      name,
      college,
      degree,
      branch,
      graduationYear,
      careerGoal,
      bio,
      location,
      avatarUrl
    } = req.body;

    // Update user name if provided
    if (name) {
      await prisma.user.update({
        where: { id: req.user.id },
        data: { name }
      });
    }

    const updated = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: {
        college,
        degree,
        branch,
        graduationYear,
        careerGoal,
        bio,
        location,
        avatarUrl
      },
      include: {
        user: { select: { name: true, email: true, role: true } }
      }
    });

    return success(res, updated, "Profile updated successfully.");
  } catch (err) {
    console.error("updateProfile error:", err);
    return error(res, "Failed to update profile.", 500);
  }
}

/**
 * Get student skills list
 */
async function getSkills(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const skills = await prisma.studentSkill.findMany({
      where: { studentId: req.studentProfile.id },
      include: { skill: true },
      orderBy: { currentLevel: "desc" }
    });

    return success(res, skills);
  } catch (err) {
    console.error("getSkills error:", err);
    return error(res, "Failed to fetch student skills.", 500);
  }
}

/**
 * Bulk update student skills
 */
async function updateSkills(req, res) {
  try {
    const { skills } = req.body; // Array of { skillId, currentLevel, verifiedLevel, status }
    if (!Array.isArray(skills)) {
      return error(res, "Skills array is required.", 400);
    }

    for (const item of skills) {
      if (item.skillId) {
        await prisma.studentSkill.upsert({
          where: {
            studentId_skillId: {
              studentId: req.studentProfile.id,
              skillId: item.skillId
            }
          },
          update: {
            currentLevel: item.currentLevel !== undefined ? item.currentLevel : 50,
            verifiedLevel: item.verifiedLevel !== undefined ? item.verifiedLevel : 0,
            verificationStatus: item.status || "UNVERIFIED"
          },
          create: {
            studentId: req.studentProfile.id,
            skillId: item.skillId,
            currentLevel: item.currentLevel !== undefined ? item.currentLevel : 50,
            verifiedLevel: item.verifiedLevel !== undefined ? item.verifiedLevel : 0,
            verificationStatus: item.status || "UNVERIFIED"
          }
        });
      }
    }

    const updated = await prisma.studentSkill.findMany({
      where: { studentId: req.studentProfile.id },
      include: { skill: true }
    });

    return success(res, updated, "Skills updated successfully.");
  } catch (err) {
    console.error("updateSkills error:", err);
    return error(res, "Failed to update skills.", 500);
  }
}

/**
 * Get dynamic readiness calculation
 */
async function getReadiness(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const studentId = req.studentProfile.id;

    const [studentSkills, assessmentResults, learningProgress, career] = await Promise.all([
      prisma.studentSkill.findMany({ where: { studentId }, include: { skill: true } }),
      prisma.assessmentResult.findMany({ where: { studentId } }),
      prisma.learningProgress.findMany({ where: { studentId } }),
      prisma.career.findFirst({
        where: { title: { contains: req.studentProfile.careerGoal || "Data", mode: "insensitive" } },
        include: { careerSkills: { include: { skill: true } } }
      })
    ]);

    const gaps = career ? calculateSkillGaps(studentSkills, career.careerSkills) : [];

    const readinessData = calculateReadinessScore({
      assessmentResults,
      studentSkills,
      learningProgress,
      careerGaps: gaps,
      projectsCount: 2
    });

    // Update readiness score in profile
    await prisma.studentProfile.update({
      where: { id: studentId },
      data: { readinessScore: readinessData.readinessScore }
    });

    return success(res, readinessData);
  } catch (err) {
    console.error("getReadiness error:", err);
    return error(res, "Failed to calculate readiness.", 500);
  }
}

/**
 * Get student activity history
 */
async function getActivity(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const studentId = req.studentProfile.id;

    // Collate activities from applications, assessment results, and learning progress
    const [applications, assessments, learning] = await Promise.all([
      prisma.application.findMany({
        where: { studentId },
        include: { job: { include: { company: true } } },
        orderBy: { appliedAt: "desc" },
        take: 5
      }),
      prisma.assessmentResult.findMany({
        where: { studentId },
        include: { assessment: { include: { skill: true } } },
        orderBy: { completedAt: "desc" },
        take: 5
      }),
      prisma.learningProgress.findMany({
        where: { studentId, completed: true },
        include: { resource: true },
        orderBy: { updatedAt: "desc" },
        take: 5
      })
    ]);

    const activities = [];

    applications.forEach((app) => {
      activities.push({
        id: `act-app-${app.id}`,
        type: "Application",
        title: `Applied for ${app.job.title} at ${app.job.company.name}`,
        time: app.appliedAt,
        status: app.status,
        meta: `Status: ${app.status}`
      });
    });

    assessments.forEach((ass) => {
      activities.push({
        id: `act-ass-${ass.id}`,
        type: "Assessment",
        title: `Completed ${ass.assessment.title}`,
        time: ass.completedAt,
        score: `${ass.percentage}%`,
        meta: `Score: ${ass.percentage}%`
      });
    });

    learning.forEach((lr) => {
      activities.push({
        id: `act-lr-${lr.id}`,
        type: "Learning",
        title: `Completed course: ${lr.resource.title}`,
        time: lr.updatedAt,
        meta: "Verified Milestone"
      });
    });

    activities.sort((a, b) => new Date(b.time) - new Date(a.time));

    return success(res, activities);
  } catch (err) {
    console.error("getActivity error:", err);
    return error(res, "Failed to fetch student activity.", 500);
  }
}

/**
 * Get student notifications
 */
async function getNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" }
    });

    return success(res, notifications);
  } catch (err) {
    console.error("getNotifications error:", err);
    return error(res, "Failed to fetch notifications.", 500);
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getSkills,
  updateSkills,
  getReadiness,
  getActivity,
  getNotifications
};
