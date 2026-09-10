// backend/src/controllers/roadmapController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { generateStudentRoadmap } = require("../services/roadmapService");

/**
 * Get active roadmap for current student
 */
async function getStudentRoadmap(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    let roadmap = await prisma.roadmap.findFirst({
      where: { studentId: req.studentProfile.id },
      include: {
        career: true,
        items: {
          orderBy: { order: "asc" },
          include: {
            skill: true,
            resource: true
          }
        }
      }
    });

    // If no roadmap exists yet, dynamically generate one
    if (!roadmap) {
      roadmap = await generateStudentRoadmap(
        req.studentProfile.id,
        req.studentProfile.careerGoal || "Data Analyst"
      );
    }

    return success(res, roadmap);
  } catch (err) {
    console.error("getStudentRoadmap error:", err);
    return error(res, "Failed to fetch student roadmap.", 500);
  }
}

/**
 * Generate or regenerate personalized roadmap
 */
async function generateRoadmap(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const { careerGoal } = req.body;
    const targetCareer = careerGoal || req.studentProfile.careerGoal || "Data Analyst";

    const roadmap = await generateStudentRoadmap(req.studentProfile.id, targetCareer);

    // Create Notification
    await prisma.notification.create({
      data: {
        userId: req.user.id,
        title: "Personalized Roadmap Generated 🗺️",
        message: `Your learning roadmap for ${targetCareer} has been updated based on your verified skill gaps.`,
        type: "LEARNING"
      }
    });

    return success(res, roadmap, "Roadmap generated successfully.", 201);
  } catch (err) {
    console.error("generateRoadmap error:", err);
    return error(res, "Failed to generate roadmap.", 500);
  }
}

/**
 * Update roadmap item progress / status
 */
async function updateRoadmapItemStatus(req, res) {
  try {
    const { id } = req.params; // roadmapItem id
    const { status } = req.body; // "COMPLETED", "IN_PROGRESS", "UPCOMING"

    if (!["LOCKED", "UPCOMING", "IN_PROGRESS", "COMPLETED"].includes(status)) {
      return error(res, "Invalid roadmap status.", 400);
    }

    const item = await prisma.roadmapItem.update({
      where: { id },
      data: { status },
      include: {
        skill: true,
        roadmap: true
      }
    });

    // If marked completed, unlock the next sequential item in the roadmap
    if (status === "COMPLETED") {
      const nextItem = await prisma.roadmapItem.findFirst({
        where: {
          roadmapId: item.roadmapId,
          order: item.order + 1
        }
      });

      if (nextItem && nextItem.status === "LOCKED") {
        await prisma.roadmapItem.update({
          where: { id: nextItem.id },
          data: { status: "UPCOMING" }
        });
      }

      // Record Notification
      if (req.user) {
        await prisma.notification.create({
          data: {
            userId: req.user.id,
            title: `Roadmap Milestone Completed: ${item.skill.name} ✓`,
            message: `Congratulations! You mastered the competencies for ${item.skill.name}.`,
            type: "LEARNING"
          }
        });
      }
    }

    return success(res, item, "Roadmap item updated successfully.");
  } catch (err) {
    console.error("updateRoadmapItemStatus error:", err);
    return error(res, "Failed to update roadmap item.", 500);
  }
}

module.exports = {
  getStudentRoadmap,
  generateRoadmap,
  updateRoadmapItemStatus
};
