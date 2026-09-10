// backend/src/controllers/jobController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { matchStudentToJob } = require("../services/jobMatchingService");

/**
 * Get all jobs with optional filters
 */
async function getAllJobs(req, res) {
  try {
    const { type, location, search } = req.query;
    const where = {};

    if (type && type !== "All") {
      where.jobType = { equals: type, mode: "insensitive" };
    }
    if (location) {
      where.location = { contains: location, mode: "insensitive" };
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { company: { name: { contains: search, mode: "insensitive" } } },
        { description: { contains: search, mode: "insensitive" } }
      ];
    }

    const jobs = await prisma.jobOpportunity.findMany({
      where,
      include: {
        company: true,
        jobSkills: { include: { skill: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return success(res, jobs);
  } catch (err) {
    console.error("getAllJobs error:", err);
    return error(res, "Failed to fetch job opportunities.", 500);
  }
}

/**
 * Get job by ID
 */
async function getJobById(req, res) {
  try {
    const { id } = req.params;
    const job = await prisma.jobOpportunity.findUnique({
      where: { id },
      include: {
        company: true,
        jobSkills: { include: { skill: true } }
      }
    });

    if (!job) {
      return error(res, "Job opportunity not found.", 404);
    }

    return success(res, job);
  } catch (err) {
    console.error("getJobById error:", err);
    return error(res, "Failed to fetch job opportunity.", 500);
  }
}

/**
 * Create a new job opportunity (Recruiter / Admin)
 */
async function createJob(req, res) {
  try {
    const {
      companyId,
      companyName,
      title,
      description,
      location = "Hybrid",
      jobType = "Internship",
      experience = "0-1 Years",
      salary = "Competitive Stipend",
      skills = [] // Array of { skillId, requiredLevel, importance }
    } = req.body;

    if (!title) {
      return error(res, "Job title is required.", 400);
    }

    let targetCompanyId = companyId;
    if (!targetCompanyId && companyName) {
      let comp = await prisma.company.findUnique({ where: { name: companyName } });
      if (!comp) {
        comp = await prisma.company.create({
          data: { name: companyName, location }
        });
      }
      targetCompanyId = comp.id;
    }

    if (!targetCompanyId) {
      const defaultComp = await prisma.company.findFirst();
      targetCompanyId = defaultComp ? defaultComp.id : (await prisma.company.create({ data: { name: "Partner Recruiter" } })).id;
    }

    const job = await prisma.jobOpportunity.create({
      data: {
        companyId: targetCompanyId,
        title,
        description,
        location,
        jobType,
        experience,
        salary
      },
      include: { company: true }
    });

    // Add job skills if provided
    if (Array.isArray(skills) && skills.length > 0) {
      for (const s of skills) {
        if (s.skillId) {
          await prisma.jobSkill.create({
            data: {
              jobId: job.id,
              skillId: s.skillId,
              requiredLevel: s.requiredLevel || 75,
              importance: s.importance || 3
            }
          });
        }
      }
    }

    return success(res, job, "Job opportunity posted successfully.", 201);
  } catch (err) {
    console.error("createJob error:", err);
    return error(res, "Failed to post job opportunity.", 500);
  }
}

/**
 * Update job opportunity
 */
async function updateJob(req, res) {
  try {
    const { id } = req.params;
    const { title, description, location, jobType, experience, salary } = req.body;

    const job = await prisma.jobOpportunity.update({
      where: { id },
      data: {
        title,
        description,
        location,
        jobType,
        experience,
        salary
      },
      include: { company: true }
    });

    return success(res, job, "Job opportunity updated successfully.");
  } catch (err) {
    console.error("updateJob error:", err);
    return error(res, "Failed to update job opportunity.", 500);
  }
}

/**
 * Delete job opportunity
 */
async function deleteJob(req, res) {
  try {
    const { id } = req.params;
    await prisma.jobOpportunity.delete({ where: { id } });
    return success(res, {}, "Job opportunity deleted successfully.");
  } catch (err) {
    console.error("deleteJob error:", err);
    return error(res, "Failed to delete job opportunity.", 500);
  }
}

/**
 * Get personalized job matches for student with explainable breakdown
 */
async function getStudentJobRecommendations(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const [jobs, studentSkills] = await Promise.all([
      prisma.jobOpportunity.findMany({
        include: {
          company: true,
          jobSkills: { include: { skill: true } }
        }
      }),
      prisma.studentSkill.findMany({
        where: { studentId: req.studentProfile.id },
        include: { skill: true }
      })
    ]);

    const matches = jobs.map((job) => {
      const matchResult = matchStudentToJob({
        studentProfile: req.studentProfile,
        studentSkills,
        job
      });

      return {
        ...job,
        matchScore: matchResult.matchPercentage,
        skillMatch: matchResult.skillMatch,
        educationMatch: matchResult.educationMatch,
        experienceMatch: matchResult.experienceMatch,
        interestMatch: matchResult.interestMatch,
        explanation: matchResult.explanation
      };
    });

    matches.sort((a, b) => b.matchScore - a.matchScore);

    return success(res, matches);
  } catch (err) {
    console.error("getStudentJobRecommendations error:", err);
    return error(res, "Failed to compute job recommendations.", 500);
  }
}

module.exports = {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getStudentJobRecommendations
};
