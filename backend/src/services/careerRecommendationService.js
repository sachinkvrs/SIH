// backend/src/services/careerRecommendationService.js
// Explainable Career Recommendation Engine

/**
 * Computes career recommendations for a student based on skills, assessments, and required proficiencies
 * @param {Object} params
 * @param {Array} params.studentSkills Student's skill matrix
 * @param {Array} params.careers Available careers with required skills
 * @param {String} params.careerInterest Student's current stated interest
 * @returns {Array} Sorted career recommendations with fit percentage and human-readable explanation
 */
function recommendCareers({ studentSkills = [], careers = [], allCareers = [], careerInterest = "Data Analyst" } = {}) {
  const careerList = (careers && careers.length > 0) ? careers : allCareers;
  const studentSkillMap = {};
  studentSkills.forEach((ss) => {
    const name = (ss.skill?.name || ss.name || "").toLowerCase();
    const effective = ss.verificationStatus === "VERIFIED" && ss.verifiedLevel > 0
      ? ss.verifiedLevel
      : ss.currentLevel || 0;
    studentSkillMap[name] = effective;
  });

  const recommendations = careerList.map((career) => {
    const reqs = career.careerSkills || [];
    let totalWeightedScore = 0;
    let totalWeight = 0;
    const strengths = [];
    const gaps = [];

    reqs.forEach((cs) => {
      const skillName = cs.skill?.name || "Skill";
      const studentLevel = studentSkillMap[skillName.toLowerCase()] || 0;
      const requiredLevel = cs.requiredLevel || 75;
      const importance = cs.importance || 3;

      // Ratio of current to required level capped at 100%
      const matchRatio = Math.min(100, Math.round((studentLevel / requiredLevel) * 100));
      totalWeightedScore += matchRatio * importance;
      totalWeight += importance;

      if (matchRatio >= 85) {
        strengths.push(skillName);
      } else if (matchRatio < 70) {
        gaps.push(skillName);
      }
    });

    let fitScore = totalWeight > 0 ? Math.round(totalWeightedScore / totalWeight) : 70;

    // Career interest boost
    if (careerInterest && career.title.toLowerCase().includes(careerInterest.toLowerCase())) {
      fitScore = Math.min(98, fitScore + 6);
    }

    // Generate explainable rationale
    let explanation = "";
    if (strengths.length > 0 && gaps.length > 0) {
      explanation = `Strong ${strengths.slice(0, 2).join(" and ")} proficiencies. ${gaps.slice(0, 2).join(" and ")} are your primary areas for improvement.`;
    } else if (strengths.length > 0) {
      explanation = `Excellent alignment across ${strengths.slice(0, 3).join(", ")}.`;
    } else if (gaps.length > 0) {
      explanation = `Focus on developing foundational ${gaps.slice(0, 2).join(" and ")} to qualify.`;
    } else {
      explanation = "Solid foundational match with current curriculum competencies.";
    }

    const finalScore = Math.max(50, Math.min(98, fitScore));

    return {
      careerId: career.id,
      title: career.title,
      category: career.category,
      averageSalary: career.averageSalary,
      demandLevel: career.demandLevel,
      fitPercentage: finalScore,
      matchPercentage: finalScore,
      explanation,
      matchedStrengths: strengths,
      primaryGaps: gaps
    };
  });

  recommendations.sort((a, b) => b.fitPercentage - a.fitPercentage);
  return recommendations;
}

module.exports = {
  recommendCareers
};
