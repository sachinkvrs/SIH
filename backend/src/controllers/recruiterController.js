// backend/src/controllers/recruiterController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Search candidates by skills, minimum readiness score, department, institution
 */
async function searchCandidates(req, res) {
  try {
    const { skill, minReadiness, institution, department, search } = req.query;

    const where = {};

    if (institution) {
      where.institution = { contains: institution, mode: "insensitive" };
    }

    if (department) {
      where.department = { contains: department, mode: "insensitive" };
    }

    if (minReadiness) {
      where.readinessScore = { gte: parseFloat(minReadiness) };
    }

    if (search) {
      where.OR = [
        { headline: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } }
      ];
    }

    if (skill) {
      where.skills = {
        some: {
          skill: {
            name: { contains: skill, mode: "insensitive" }
          }
        }
      };
    }

    const candidates = await prisma.studentProfile.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true, avatar: true }
        },
        skills: {
          include: { skill: true }
        },
        passport: true
      },
      orderBy: { readinessScore: "desc" }
    });

    return success(res, candidates);
  } catch (err) {
    console.error("searchCandidates error:", err);
    return error(res, "Failed to search candidates.", 500);
  }
}

/**
 * Get candidate profile detail for recruiters
 */
async function getCandidateProfile(req, res) {
  try {
    const { id } = req.params;

    const candidate = await prisma.studentProfile.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, avatar: true } },
        skills: { include: { skill: true } },
        assessments: {
          include: { assessment: { select: { title: true, type: true } } }
        },
        passport: true
      }
    });

    if (!candidate) {
      return error(res, "Candidate not found.", 404);
    }

    return success(res, candidate);
  } catch (err) {
    console.error("getCandidateProfile error:", err);
    return error(res, "Failed to fetch candidate profile.", 500);
  }
}

/**
 * Get recruiter dashboard analytics
 */
async function getRecruiterOverview(req, res) {
  try {
    const [totalJobs, totalApplications, totalCandidates] = await Promise.all([
      prisma.jobOpportunity.count(),
      prisma.application.count(),
      prisma.studentProfile.count()
    ]);

    const recentApplications = await prisma.application.findMany({
      take: 10,
      include: {
        job: { select: { title: true, company: { select: { name: true } } } },
        student: {
          include: {
            user: { select: { name: true, email: true, avatar: true } }
          }
        }
      },
      orderBy: { appliedAt: "desc" }
    });

    return success(res, {
      stats: {
        totalJobs,
        totalApplications,
        totalCandidates,
        hiringPipelined: recentApplications.filter(a => ["SHORTLISTED", "INTERVIEW", "OFFERED"].includes(a.status)).length
      },
      recentApplications
    });
  } catch (err) {
    console.error("getRecruiterOverview error:", err);
    return error(res, "Failed to fetch recruiter overview.", 500);
  }
}

module.exports = {
  searchCandidates,
  getCandidateProfile,
  getRecruiterOverview
};
