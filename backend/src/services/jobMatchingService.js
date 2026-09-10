// backend/src/services/jobMatchingService.js
// Explainable Job Matching Engine

/**
 * Calculates match percentage and detailed explainability breakdown between student and a job opening
 * 
 * Weights:
 * - Skill Match: 50%
 * - Education: 15%
 * - Experience: 10%
 * - Career Interest: 15%
 * - Learning Alignment: 10%
 */
function matchStudentToJob({ studentProfile, studentSkills = [], job }) {
  const studentSkillMap = {};
  studentSkills.forEach((ss) => {
    const name = (ss.skill?.name || ss.name || "").toLowerCase();
    const effective = ss.verificationStatus === "VERIFIED" && ss.verifiedLevel > 0
      ? ss.verifiedLevel
      : ss.currentLevel || 0;
    studentSkillMap[name] = effective;
  });

  const jobReqs = job.jobSkills || [];
  let totalSkillScore = 0;
  let totalWeight = 0;
  const explanation = [];

  jobReqs.forEach((js) => {
    const skillName = js.skill?.name || "Skill";
    const studentLvl = studentSkillMap[skillName.toLowerCase()] || 0;
    const requiredLvl = js.requiredLevel || 75;
    const importance = js.importance || 3;

    const ratio = Math.min(100, Math.round((studentLvl / requiredLvl) * 100));
    totalSkillScore += ratio * importance;
    totalWeight += importance;

    if (studentLvl >= requiredLvl) {
      explanation.push(`Verified strong ${skillName} (${studentLvl}% / ${requiredLvl}% required)`);
    } else if (studentLvl >= requiredLvl * 0.75) {
      explanation.push(`${skillName} is slightly below recruiter benchmark (${studentLvl}% vs ${requiredLvl}%)`);
    } else {
      explanation.push(`${skillName} is an active priority skill gap (${studentLvl}% vs ${requiredLvl}%)`);
    }
  });

  const skillMatch = totalWeight > 0 ? Math.round(totalSkillScore / totalWeight) : 75;

  // Education Match (15%)
  const educationMatch = studentProfile?.degree ? 95 : 80;

  // Experience Match (10%)
  const jobExp = (job.experience || "").toLowerCase();
  const experienceMatch = jobExp.includes("fresher") || jobExp.includes("0-") || jobExp.includes("entry") ? 90 : 75;

  // Career Interest Match (15%)
  const jobTitle = (job.title || "").toLowerCase();
  const target = (studentProfile?.targetCareer || studentProfile?.careerGoal || "Software").toLowerCase();
  const isInterestMatch = jobTitle.includes(target) || target.includes(jobTitle);
  const interestMatch = isInterestMatch ? 95 : 75;

  // Learning Alignment (10%)
  const learningAlignment = skillMatch >= 80 ? 90 : 75;

  // Weighted Match Calculation
  const overall = Math.round(
    (skillMatch * 0.50) +
    (educationMatch * 0.15) +
    (experienceMatch * 0.10) +
    (interestMatch * 0.15) +
    (learningAlignment * 0.10)
  );

  const matchPercentage = Math.min(99, Math.max(50, overall));

  if (explanation.length === 0) {
    explanation.push("Good overall foundational fit with opening requirements.");
  }

  return {
    jobId: job.id,
    matchPercentage,
    skillMatch,
    educationMatch,
    experienceMatch,
    interestMatch,
    learningAlignment,
    explanation
  };
}

module.exports = {
  matchStudentToJob
};
