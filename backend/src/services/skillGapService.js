// backend/src/services/skillGapService.js
// Explainable rule-based Skill Gap Engine

/**
 * Calculates skill gaps for a student against a target career's requirements
 * @param {Array} studentSkills Array of StudentSkill objects (with skill, currentLevel, verifiedLevel)
 * @param {Array} careerSkills Array of CareerSkill objects (with skill, requiredLevel, importance)
 * @returns {Array} List of calculated gaps sorted by priority and gap magnitude
 */
function calculateSkillGaps(studentSkills = [], careerSkills = []) {
  // Support both positional arguments and single object argument { studentSkills, careerSkills }
  if (studentSkills && !Array.isArray(studentSkills) && typeof studentSkills === "object") {
    const obj = studentSkills;
    careerSkills = obj.careerSkills || [];
    studentSkills = obj.studentSkills || [];
  }
  studentSkills = Array.isArray(studentSkills) ? studentSkills : [];
  careerSkills = Array.isArray(careerSkills) ? careerSkills : [];

  // Build lookup map for student skills
  const studentSkillMap = {};
  studentSkills.forEach((ss) => {
    const skillName = ss.skill?.name || ss.name || "";
    // Prefer verifiedLevel if verified, else currentLevel
    const effectiveLevel = ss.verificationStatus === "VERIFIED" && ss.verifiedLevel > 0
      ? ss.verifiedLevel
      : ss.currentLevel || 0;

    studentSkillMap[skillName.toLowerCase()] = {
      effectiveLevel,
      currentLevel: ss.currentLevel || 0,
      verifiedLevel: ss.verifiedLevel || 0,
      status: ss.verificationStatus || "UNVERIFIED"
    };
  });

  const gaps = careerSkills.map((cs) => {
    const skillName = cs.skill?.name || cs.name || "Unknown Skill";
    const studentData = studentSkillMap[skillName.toLowerCase()] || {
      effectiveLevel: 0,
      currentLevel: 0,
      verifiedLevel: 0,
      status: "UNVERIFIED"
    };

    const requiredLevel = cs.requiredLevel || 75;
    const currentLevel = studentData.effectiveLevel;
    const gap = Math.max(0, requiredLevel - currentLevel);

    // Explicit Rule-based Priority Assignment:
    // gap >= 30 -> HIGH
    // gap >= 15 -> MEDIUM
    // gap < 15 -> LOW
    let priority = "LOW";
    if (gap >= 30) {
      priority = "HIGH";
    } else if (gap >= 15) {
      priority = "MEDIUM";
    }

    return {
      skillId: cs.skillId || cs.skill?.id,
      skill: skillName,
      category: cs.skill?.category || "Core",
      currentLevel,
      requiredLevel,
      gap,
      priority,
      importance: cs.importance || 3,
      verificationStatus: studentData.status
    };
  });

  // Sort: HIGH priority first, then by largest gap, then by importance
  const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
  gaps.sort((a, b) => {
    if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return b.gap - a.gap || b.importance - a.importance;
  });

  return gaps;
}

module.exports = {
  calculateSkillGaps
};
