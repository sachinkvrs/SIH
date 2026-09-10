// backend/src/services/readinessService.js
// Explainable weighted Industry Readiness Engine

/**
 * Calculates student industry readiness score and granular breakdown
 * 
 * Weights:
 * - Assessment Performance: 30%
 * - Verified Skills: 25%
 * - Learning Progress: 20%
 * - Projects: 15%
 * - Career Alignment: 10%
 */
function calculateReadinessScore({
  assessmentResults = [],
  studentSkills = [],
  learningProgress = [],
  careerGaps = [],
  projectsCount = 1,
  studentProfile = null
} = {}) {
  if (studentProfile && studentProfile.projectsCount !== undefined) {
    projectsCount = studentProfile.projectsCount;
  }
  // 1. Assessment Performance (30%)
  let assessmentScore = 75; // Baseline fallback
  if (assessmentResults.length > 0) {
    const sumPct = assessmentResults.reduce((sum, r) => sum + (r.percentage || (r.score / 15) * 100), 0);
    assessmentScore = Math.round(sumPct / assessmentResults.length);
  }

  // 2. Verified Skills (25%)
  let verifiedScore = 70;
  if (studentSkills.length > 0) {
    const verified = studentSkills.filter((s) => s.verificationStatus === "VERIFIED" || s.verifiedLevel > 0);
    if (verified.length > 0) {
      const sumVerified = verified.reduce((sum, s) => sum + (s.verifiedLevel || s.currentLevel || 70), 0);
      verifiedScore = Math.round(sumVerified / verified.length);
    }
  }

  // 3. Learning Progress (20%)
  let progressScore = 70;
  if (learningProgress.length > 0) {
    const sumProgress = learningProgress.reduce((sum, p) => {
      const prog = p.progress !== undefined ? p.progress : (p.completed ? 1 : 0.5);
      return sum + (typeof prog === "number" ? (prog <= 1 ? prog * 100 : prog) : 70);
    }, 0);
    progressScore = Math.round(sumProgress / learningProgress.length);
  }

  // 4. Projects (15%)
  // Based on verified project count and complexity
  const projectScore = Math.min(100, Math.max(50, 60 + projectsCount * 12));

  // 5. Career Alignment (10%)
  // Inversely proportional to average skill gaps
  let careerAlignmentScore = 85;
  if (careerGaps.length > 0) {
    const avgGap = careerGaps.reduce((sum, g) => sum + g.gap, 0) / careerGaps.length;
    careerAlignmentScore = Math.max(40, Math.min(100, Math.round(100 - avgGap * 1.2)));
  }

  // Calculate Weighted Total
  const readinessTotal = Math.round(
    (assessmentScore * 0.30) +
    (verifiedScore * 0.25) +
    (progressScore * 0.20) +
    (projectScore * 0.15) +
    (careerAlignmentScore * 0.10)
  );

  const clampedReadiness = Math.min(99, Math.max(45, readinessTotal));

  let readinessStatus = "Developing";
  if (clampedReadiness >= 80) {
    readinessStatus = "Industry Ready";
  } else if (clampedReadiness >= 65) {
    readinessStatus = "Near Ready";
  }

  return {
    readinessScore: clampedReadiness,
    readinessStatus,
    readinessLevel: readinessStatus,
    breakdown: {
      assessment: assessmentScore,
      verifiedSkills: verifiedScore,
      learningProgress: progressScore,
      projects: projectScore,
      careerAlignment: careerAlignmentScore
    },
    pillars: {
      assessment: assessmentScore,
      verifiedSkills: verifiedScore,
      learningProgress: progressScore,
      projects: projectScore,
      careerAlignment: careerAlignmentScore
    }
  };
}

module.exports = {
  calculateReadinessScore,
  calculateStudentReadiness: calculateReadinessScore
};
