// backend/src/controllers/passportController.js
const crypto = require("crypto");
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");
const { calculateStudentReadiness } = require("../services/readinessService");

/**
 * Get current student's passport
 */
async function getMyPassport(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    let passport = await prisma.skillPassport.findUnique({
      where: { studentId: req.studentProfile.id },
      include: {
        student: {
          include: {
            user: { select: { id: true, name: true, email: true, avatar: true } },
            skills: { include: { skill: true } }
          }
        }
      }
    });

    // If passport doesn't exist yet, generate one automatically
    if (!passport) {
      passport = await createOrUpdatePassport(req.studentProfile.id);
    }

    return success(res, passport);
  } catch (err) {
    console.error("getMyPassport error:", err);
    return error(res, "Failed to fetch skill passport.", 500);
  }
}

/**
 * Generate or re-generate digital skill passport
 */
async function generatePassport(req, res) {
  try {
    if (!req.studentProfile) {
      return error(res, "Student profile required.", 400);
    }

    const passport = await createOrUpdatePassport(req.studentProfile.id);
    return success(res, passport, "Skill passport generated / refreshed successfully.");
  } catch (err) {
    console.error("generatePassport error:", err);
    return error(res, "Failed to generate skill passport.", 500);
  }
}

/**
 * Helper to build/update passport record
 */
async function createOrUpdatePassport(studentId) {
  const student = await prisma.studentProfile.findUnique({
    where: { id: studentId },
    include: {
      user: { select: { id: true, name: true, email: true, avatar: true } },
      skills: { include: { skill: true } },
      assessments: true,
      learningProgress: true
    }
  });

  if (!student) {
    throw new Error("Student not found.");
  }

  // Calculate dynamic readiness score
  const readiness = calculateStudentReadiness({
    studentProfile: student,
    studentSkills: student.skills,
    assessmentResults: student.assessments,
    learningProgress: student.learningProgress
  });

  const credentialId = `SB-${student.user.name.substring(0, 3).toUpperCase()}-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  
  const verifiedSkills = student.skills
    .filter(s => s.verified || s.level >= 3)
    .map(s => ({
      id: s.skillId,
      name: s.skill.name,
      category: s.skill.category,
      level: s.level,
      verified: s.verified
    }));

  const snapshot = {
    studentName: student.user.name,
    institution: student.institution || "SkillBridge Partner University",
    department: student.department || "Computer Science",
    verifiedSkillsCount: verifiedSkills.length,
    verifiedSkills,
    readinessScore: readiness.readinessScore,
    readinessLevel: readiness.readinessLevel,
    pillars: readiness.pillars,
    generatedAt: new Date().toISOString()
  };

  const passport = await prisma.skillPassport.upsert({
    where: { studentId },
    create: {
      studentId,
      credentialId,
      verificationUrl: `/verify/${credentialId}`,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://skillbridge.edu/verify/${credentialId}`,
      status: "ACTIVE",
      verifiedScore: readiness.readinessScore,
      metadata: snapshot
    },
    update: {
      verifiedScore: readiness.readinessScore,
      metadata: snapshot,
      updatedAt: new Date()
    },
    include: {
      student: {
        include: {
          user: { select: { id: true, name: true, email: true, avatar: true } },
          skills: { include: { skill: true } }
        }
      }
    }
  });

  return passport;
}

/**
 * Public Verification Endpoint: verify passport validity by credential ID
 * (Does not leak personal info like email or passwords)
 */
async function verifyPassport(req, res) {
  try {
    const { credentialId } = req.params;

    if (!credentialId) {
      return error(res, "Credential ID is required.", 400);
    }

    const passport = await prisma.skillPassport.findUnique({
      where: { credentialId },
      include: {
        student: {
          include: {
            user: { select: { name: true, avatar: true } }
          }
        }
      }
    });

    if (!passport) {
      return error(res, "Invalid or unverified credential ID.", 404);
    }

    const verificationResult = {
      isValid: passport.status === "ACTIVE",
      status: passport.status,
      credentialId: passport.credentialId,
      issuedAt: passport.issuedAt,
      verifiedScore: passport.verifiedScore,
      studentName: passport.student?.user?.name || "Verified Student",
      institution: passport.student?.institution || "Partner Institution",
      department: passport.student?.department || "Technology",
      snapshot: passport.metadata,
      signature: "DIGITALLY-VERIFIED-SKILLBRIDGE-NETWORK"
    };

    return success(res, verificationResult, "Credential verified successfully.");
  } catch (err) {
    console.error("verifyPassport error:", err);
    return error(res, "Failed to verify credential.", 500);
  }
}

module.exports = {
  getMyPassport,
  generatePassport,
  verifyPassport
};
