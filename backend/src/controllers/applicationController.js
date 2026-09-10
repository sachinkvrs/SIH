// backend/src/controllers/applicationController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Submit job application (Student)
 */
async function applyForJob(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required to apply.", 400);
    }

    const { jobId, notes, resumeUrl } = req.body;

    if (!jobId) {
      return error(res, "jobId is required.", 400);
    }

    const job = await prisma.jobOpportunity.findUnique({
      where: { id: jobId },
      include: { company: true }
    });

    if (!job) {
      return error(res, "Job opportunity not found.", 404);
    }

    // Check if already applied
    const existing = await prisma.application.findFirst({
      where: {
        studentId: req.studentProfile.id,
        jobId
      }
    });

    if (existing) {
      return error(res, "You have already applied to this position.", 400);
    }

    const application = await prisma.application.create({
      data: {
        studentId: req.studentProfile.id,
        jobId,
        status: "APPLIED",
        notes: notes || null
      },
      include: {
        job: {
          include: { company: true }
        }
      }
    });

    // Create notification for student
    await prisma.notification.create({
      data: {
        userId: req.user.id,
        title: "Application Submitted",
        message: `Your application for ${job.title} at ${job.company.name} has been received.`,
        type: "JOB"
      }
    }).catch(err => console.error("Notification creation error:", err));

    return success(res, application, "Application submitted successfully.", 201);
  } catch (err) {
    console.error("applyForJob error:", err);
    return error(res, "Failed to submit application.", 500);
  }
}

/**
 * Get current student's applications
 */
async function getMyApplications(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const applications = await prisma.application.findMany({
      where: { studentId: req.studentProfile.id },
      include: {
        job: {
          include: {
            company: true,
            jobSkills: { include: { skill: true } }
          }
        }
      },
      orderBy: { appliedAt: "desc" }
    });

    return success(res, applications);
  } catch (err) {
    console.error("getMyApplications error:", err);
    return error(res, "Failed to fetch applications.", 500);
  }
}

/**
 * Get specific application by ID
 */
async function getApplicationById(req, res) {
  try {
    const { id } = req.params;
    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        job: { include: { company: true } },
        student: { include: { user: true } }
      }
    });

    if (!application) {
      return error(res, "Application not found.", 404);
    }

    // Access check: student owns it or user is recruiter/admin
    const isOwner = req.studentProfile && application.studentId === req.studentProfile.id;
    const isStaff = ["RECRUITER", "ADMIN", "INSTITUTION"].includes(req.user.role);

    if (!isOwner && !isStaff) {
      return error(res, "Access denied to this application.", 403);
    }

    return success(res, application);
  } catch (err) {
    console.error("getApplicationById error:", err);
    return error(res, "Failed to fetch application.", 500);
  }
}

/**
 * Update application status (Recruiter / Admin)
 */
async function updateApplicationStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ["APPLIED", "UNDER_REVIEW", "SHORTLISTED", "INTERVIEW", "OFFERED", "REJECTED", "WITHDRAWN"];
    if (status && !validStatuses.includes(status)) {
      return error(res, `Invalid status. Must be one of: ${validStatuses.join(", ")}`, 400);
    }

    const existing = await prisma.application.findUnique({
      where: { id },
      include: {
        job: { include: { company: true } },
        student: { include: { user: true } }
      }
    });

    if (!existing) {
      return error(res, "Application not found.", 404);
    }

    const updated = await prisma.application.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes })
      },
      include: {
        job: { include: { company: true } },
        student: { include: { user: true } }
      }
    });

    // Notify student about status change
    if (status && status !== existing.status && existing.student?.user?.id) {
      await prisma.notification.create({
        data: {
          userId: existing.student.user.id,
          title: `Application Status Updated: ${status}`,
          message: `Your application status for ${existing.job.title} at ${existing.job.company.name} is now ${status}.`,
          type: "JOB"
        }
      }).catch(err => console.error("Notification creation error:", err));
    }

    return success(res, updated, "Application status updated successfully.");
  } catch (err) {
    console.error("updateApplicationStatus error:", err);
    return error(res, "Failed to update application status.", 500);
  }
}

/**
 * Withdraw application (Student)
 */
async function withdrawApplication(req, res) {
  try {
    const { id } = req.params;

    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const existing = await prisma.application.findFirst({
      where: {
        id,
        studentId: req.studentProfile.id
      }
    });

    if (!existing) {
      return error(res, "Application not found or unauthorized.", 404);
    }

    const updated = await prisma.application.update({
      where: { id },
      data: { status: "WITHDRAWN" }
    });

    return success(res, updated, "Application withdrawn.");
  } catch (err) {
    console.error("withdrawApplication error:", err);
    return error(res, "Failed to withdraw application.", 500);
  }
}

module.exports = {
  applyForJob,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication
};
