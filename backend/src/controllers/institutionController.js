// backend/src/controllers/institutionController.js
const prisma = require("../config/db");
const { success, error } = require("../utils/responseHelper");

/**
 * Get institutional overview & aggregate skill intelligence
 */
async function getInstitutionAnalytics(req, res) {
  try {
    const { institution } = req.query;

    const where = {};
    if (institution) {
      where.institution = { contains: institution, mode: "insensitive" };
    }

    // Fetch all students for this institution
    const students = await prisma.studentProfile.findMany({
      where,
      include: {
        skills: { include: { skill: true } },
        assessments: true,
        applications: true
      }
    });

    const totalStudents = students.length;
    if (totalStudents === 0) {
      return success(res, {
        totalStudents: 0,
        averageReadiness: 0,
        departmentBreakdown: [],
        topSkills: [],
        criticalSkillGaps: [],
        placementMetrics: { totalApplications: 0, offers: 0 }
      });
    }

    // Calculate average readiness
    const sumReadiness = students.reduce((acc, s) => acc + (s.readinessScore || 0), 0);
    const averageReadiness = Math.round(sumReadiness / totalStudents);

    // Department breakdown
    const deptMap = {};
    students.forEach((s) => {
      const dept = s.department || "General";
      if (!deptMap[dept]) {
        deptMap[dept] = { count: 0, totalScore: 0 };
      }
      deptMap[dept].count += 1;
      deptMap[dept].totalScore += s.readinessScore || 0;
    });

    const departmentBreakdown = Object.entries(deptMap).map(([dept, data]) => ({
      department: dept,
      studentCount: data.count,
      avgReadiness: Math.round(data.totalScore / data.count)
    }));

    // Aggregate skill frequencies and verified rates
    const skillCount = {};
    let totalApplications = 0;
    let totalOffers = 0;

    students.forEach((s) => {
      s.skills.forEach((sk) => {
        const name = sk.skill.name;
        if (!skillCount[name]) {
          skillCount[name] = { name, count: 0, verified: 0, avgLevel: 0, totalLevel: 0 };
        }
        skillCount[name].count += 1;
        if (sk.verified) skillCount[name].verified += 1;
        skillCount[name].totalLevel += sk.level;
      });

      if (s.applications) {
        totalApplications += s.applications.length;
        totalOffers += s.applications.filter(a => a.status === "OFFERED").length;
      }
    });

    const topSkills = Object.values(skillCount)
      .map(s => ({
        ...s,
        avgLevel: Number((s.totalLevel / s.count).toFixed(1)),
        penetrationRate: Math.round((s.count / totalStudents) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Identify curriculum gap areas (in-demand skills with low student adoption)
    const allMarketSkills = await prisma.jobSkill.groupBy({
      by: ["skillId"],
      _count: { skillId: true },
      orderBy: { _count: { skillId: "desc" } },
      take: 15
    });

    const marketSkillDetails = await prisma.skill.findMany({
      where: { id: { in: allMarketSkills.map(m => m.skillId) } }
    });

    const criticalSkillGaps = marketSkillDetails.map(sk => {
      const studentAdoption = skillCount[sk.name]?.count || 0;
      const adoptionPercent = Math.round((studentAdoption / totalStudents) * 100);
      return {
        skill: sk.name,
        category: sk.category,
        studentAdoptionPercent: adoptionPercent,
        gapSeverity: adoptionPercent < 30 ? "HIGH" : adoptionPercent < 60 ? "MEDIUM" : "LOW"
      };
    }).sort((a, b) => a.studentAdoptionPercent - b.studentAdoptionPercent);

    return success(res, {
      totalStudents,
      averageReadiness,
      departmentBreakdown,
      topSkills,
      criticalSkillGaps,
      placementMetrics: {
        totalApplications,
        offers: totalOffers,
        offerRate: totalApplications > 0 ? Math.round((totalOffers / totalApplications) * 100) : 0
      }
    });
  } catch (err) {
    console.error("getInstitutionAnalytics error:", err);
    return error(res, "Failed to compute institutional analytics.", 500);
  }
}

module.exports = {
  getInstitutionAnalytics
};
