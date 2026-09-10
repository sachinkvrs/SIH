// backend/src/services/roadmapService.js
// Dynamic Personalized Career Roadmap Engine

const prisma = require("../config/db");
const { calculateSkillGaps } = require("./skillGapService");

/**
 * Generates or regenerates a personalized roadmap for a student based on career goal and skill gaps
 * @param {String} studentId StudentProfile id
 * @param {String} careerGoal Target career title
 */
async function generateStudentRoadmap(studentId, careerGoal = "Data Analyst") {
  // 1. Locate the Career
  let career = await prisma.career.findFirst({
    where: { title: { contains: careerGoal, mode: "insensitive" } },
    include: {
      careerSkills: {
        include: { skill: true }
      }
    }
  });

  if (!career) {
    career = await prisma.career.findFirst({
      include: {
        careerSkills: {
          include: { skill: true }
        }
      }
    });
  }

  if (!career) {
    throw new Error("No career found to generate roadmap.");
  }

  // 2. Fetch student skills
  const studentSkills = await prisma.studentSkill.findMany({
    where: { studentId },
    include: { skill: true }
  });

  // 3. Calculate skill gaps
  const gaps = calculateSkillGaps(studentSkills, career.careerSkills);

  // 4. Fetch available learning resources
  const resources = await prisma.learningResource.findMany({
    include: { skill: true }
  });

  // 5. Create or find existing roadmap
  let roadmap = await prisma.roadmap.findFirst({
    where: { studentId, careerId: career.id }
  });

  if (roadmap) {
    // Clear old items to regenerate cleanly
    await prisma.roadmapItem.deleteMany({
      where: { roadmapId: roadmap.id }
    });
  } else {
    roadmap = await prisma.roadmap.create({
      data: {
        studentId,
        careerId: career.id,
        title: `${career.title} Mastery Roadmap`
      }
    });
  }

  // 6. Generate sequential roadmap items
  // First item is IN_PROGRESS, others UPCOMING or LOCKED
  const itemsToCreate = [];
  let order = 1;

  for (const gap of gaps) {
    // Find best resource matching the gap skill
    const matchingResource = resources.find(
      (r) => r.skillId === gap.skillId || r.skill?.name.toLowerCase() === gap.skill.toLowerCase()
    );

    const status = order === 1 ? "IN_PROGRESS" : order === 2 ? "UPCOMING" : "LOCKED";

    itemsToCreate.push({
      roadmapId: roadmap.id,
      skillId: gap.skillId,
      resourceId: matchingResource ? matchingResource.id : null,
      order,
      status,
      priority: gap.priority
    });

    order++;
  }

  if (itemsToCreate.length > 0) {
    await prisma.roadmapItem.createMany({
      data: itemsToCreate
    });
  }

  // Return complete roadmap with relations
  return prisma.roadmap.findUnique({
    where: { id: roadmap.id },
    include: {
      career: true,
      items: {
        orderBy: { order: "asc" },
        include: {
          skill: true,
          resource: true
        }
      }
    }
  });
}

module.exports = {
  generateStudentRoadmap
};
