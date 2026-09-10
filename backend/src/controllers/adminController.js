// backend/src/controllers/adminController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Get comprehensive platform statistics for Admin
 */
async function getAdminStats(req, res) {
  try {
    const [
      totalUsers,
      totalStudents,
      totalSkills,
      totalCareers,
      totalJobs,
      totalApplications,
      totalAssessments,
      totalPassports
    ] = await Promise.all([
      prisma.user.count(),
      prisma.studentProfile.count(),
      prisma.skill.count(),
      prisma.career.count(),
      prisma.jobOpportunity.count(),
      prisma.application.count(),
      prisma.assessment.count(),
      prisma.skillPassport.count()
    ]);

    const usersByRole = await prisma.user.groupBy({
      by: ["role"],
      _count: { role: true }
    });

    const recentUsers = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return success(res, {
      totals: {
        totalUsers,
        totalStudents,
        totalSkills,
        totalCareers,
        totalJobs,
        totalApplications,
        totalAssessments,
        totalPassports
      },
      roleDistribution: usersByRole,
      recentUsers
    });
  } catch (err) {
    console.error("getAdminStats error:", err);
    return error(res, "Failed to fetch platform metrics.", 500);
  }
}

/**
 * List all users (admin only)
 */
async function getAllUsers(req, res) {
  try {
    const { role, search } = req.query;
    const where = {};

    if (role) where.role = role;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } }
      ];
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        avatar: true,
        createdAt: true,
        updatedAt: true,
        studentProfile: {
          select: { id: true, institution: true, department: true, readinessScore: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return success(res, users);
  } catch (err) {
    console.error("getAllUsers error:", err);
    return error(res, "Failed to fetch users.", 500);
  }
}

/**
 * Update user role or account status
 */
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { role, name } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(role && { role }),
        ...(name && { name })
      },
      select: { id: true, name: true, email: true, role: true }
    });

    return success(res, user, "User updated successfully.");
  } catch (err) {
    console.error("updateUser error:", err);
    return error(res, "Failed to update user.", 500);
  }
}

module.exports = {
  getAdminStats,
  getAllUsers,
  updateUser
};
