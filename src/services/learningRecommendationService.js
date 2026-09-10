// src/services/learningRecommendationService.js
// Model D: Learning Recommendation & Dynamic Course Resource Service
// Integrates synthetic ML dataset: learning_resources.csv & learning_interactions.csv

import { ML_LEARNING_RESOURCES, DEFAULT_STUDENT_INTERACTIONS } from "../data/mlDataset/learningResourcesData.js";

const STORAGE_KEY_INTERACTIONS = "skillbridge_learning_interactions";

/**
 * Dynamically build skill-to-module mapping from all roles.
 * Falls back to Data Analyst mapping for generic content.
 */
export const MODULE_SKILL_MAP = {
  // Data Analyst / CS/IT
  "sql-fundamentals": ["SQL", "Relational Databases", "Data Filtering", "Database"],
  "advanced-sql": ["SQL", "Window Functions", "CTEs", "Query Optimization", "Advanced SQL"],
  "power-bi": ["Power BI", "Data Visualization", "Excel", "DAX", "Business Intelligence", "Tableau"],
  "data-analytics-project": ["Python", "Pandas", "NumPy", "Statistics", "Data Visualization", "EDA"],
  "industry-assessment": ["Problem Solving", "Communication", "Statistics", "Project Management"],
  "internship-ready": ["Communication", "Problem Solving", "Project Management", "Teamwork"],
  // ECE / Embedded
  "embedded-c": ["Embedded C", "C Programming", "Microcontrollers", "Firmware"],
  "microcontrollers": ["Microcontrollers", "Arduino", "STM32", "AVR", "PIC", "Embedded Systems"],
  "rtos": ["RTOS", "FreeRTOS", "Real-Time Systems", "Embedded Linux"],
  "iot-protocols": ["IoT", "MQTT", "BLE", "Wi-Fi", "Zigbee", "IoT Protocols"],
  "pcb-design": ["PCB Design", "KiCad", "Altium", "Circuit Design", "Schematic"],
  // EEE / Power
  "circuit-analysis": ["Circuit Analysis", "Electrical Fundamentals", "Ohm's Law", "KVL", "KCL"],
  "power-electronics": ["Power Electronics", "SMPS", "Inverters", "Converters", "MOSFETs"],
  "electrical-machines": ["Electrical Machines", "Motors", "Generators", "Transformers"],
  "matlab-simulink": ["MATLAB", "Simulink", "MathWorks", "Control Systems"],
  "load-flow": ["Load Flow", "Power Systems", "Grid Analysis", "ETAP"],
  // Mechanical
  "cad-design": ["AutoCAD", "SolidWorks", "CATIA", "CAD", "3D Modeling"],
  "fea-cfd": ["FEA", "CFD", "ANSYS", "Structural Analysis", "Fluid Dynamics"],
  "manufacturing": ["Manufacturing", "CNC", "CAM", "GD&T", "Production"],
  // Civil
  "structural-analysis": ["Structural Analysis", "STAAD Pro", "ETABS", "RCC Design"],
  "bim": ["BIM", "Revit", "Autodesk", "Building Information Modeling"],
  "autocad-civil": ["AutoCAD", "Civil Engineering", "Engineering Drawing"],
  // Management / Commerce
  "financial-modeling": ["Financial Modeling", "DCF", "Valuation", "Excel", "Finance"],
  "business-analytics": ["Business Analytics", "Data Analysis", "Excel", "Power BI", "Business Intelligence"],
  "requirements-engineering": ["Requirements Engineering", "BPMN", "Use Cases", "Stakeholder Analysis"],
};

/**
 * Reverse mapping from a skill to its primary roadmap step ID across domains
 */
export const SKILL_TO_MODULE_MAP = {
  // SQL/Data
  "SQL": "advanced-sql",
  "Relational Databases": "sql-fundamentals",
  "Power BI": "power-bi",
  "Data Visualization": "power-bi",
  "Tableau": "power-bi",
  "Excel": "power-bi",
  "Python": "data-analytics-project",
  "Pandas": "data-analytics-project",
  "NumPy": "data-analytics-project",
  "Statistics": "data-analytics-project",
  "Machine Learning": "data-analytics-project",
  "Problem Solving": "industry-assessment",
  "Communication": "industry-assessment",
  "Project Management": "industry-assessment",
  // ECE
  "Embedded C": "embedded-c",
  "C Programming": "embedded-c",
  "Microcontrollers": "microcontrollers",
  "Arduino": "microcontrollers",
  "STM32": "microcontrollers",
  "RTOS": "rtos",
  "FreeRTOS": "rtos",
  "IoT": "iot-protocols",
  "PCB Design": "pcb-design",
  "KiCad": "pcb-design",
  // EEE
  "Circuit Analysis": "circuit-analysis",
  "Power Electronics": "power-electronics",
  "Electrical Machines": "electrical-machines",
  "MATLAB": "matlab-simulink",
  "Simulink": "matlab-simulink",
  "Power Systems": "load-flow",
  "Load Flow": "load-flow",
  // Mechanical
  "AutoCAD": "cad-design",
  "SolidWorks": "cad-design",
  "CATIA": "cad-design",
  "FEA": "fea-cfd",
  "ANSYS": "fea-cfd",
  "CFD": "fea-cfd",
  "Manufacturing": "manufacturing",
  "CNC": "manufacturing",
  // Civil
  "Structural Analysis": "structural-analysis",
  "STAAD Pro": "structural-analysis",
  "ETABS": "structural-analysis",
  "BIM": "bim",
  "Revit": "bim",
  // Management/Commerce
  "Financial Modeling": "financial-modeling",
  "DCF": "financial-modeling",
  "Business Analytics": "business-analytics",
  "Requirements Engineering": "requirements-engineering",
  "BPMN": "requirements-engineering",
  // Software / Cloud
  "Docker": "data-analytics-project",
  "Kubernetes": "data-analytics-project",
  "Git": "data-analytics-project",
  "Linux": "data-analytics-project",
  "Cloud": "data-analytics-project",
  "AWS": "data-analytics-project",
  "JavaScript": "data-analytics-project",
  "React": "data-analytics-project",
  "Node.js": "data-analytics-project",
  "Cybersecurity": "industry-assessment"
};

/**
 * Load student interaction history from localStorage or defaults
 */
export function getStoredInteractions() {
  if (typeof window === "undefined") return DEFAULT_STUDENT_INTERACTIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_INTERACTIONS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Error loading learning interactions:", e);
  }
  return DEFAULT_STUDENT_INTERACTIONS;
}

/**
 * Save interaction update (progress / rating) for a resource
 */
export function recordResourceInteraction(resourceId, progress, rating = null) {
  const interactions = getStoredInteractions();
  const current = interactions[String(resourceId)] || { progress: 0, rating: null };

  const updated = {
    ...interactions,
    [String(resourceId)]: {
      progress: progress !== undefined ? progress : current.progress,
      rating: rating !== null ? rating : current.rating,
      lastUpdated: Date.now()
    }
  };

  try {
    localStorage.setItem(STORAGE_KEY_INTERACTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving interaction:", e);
  }

  return updated;
}

/**
 * Get all ML dataset resources matching a roadmap module
 */
export function getResourcesForModule(moduleId) {
  const targetSkills = MODULE_SKILL_MAP[moduleId] || ["SQL", "Data Visualization", "Python"];
  const interactions = getStoredInteractions();

  // Filter resources whose skill matches any target skill (case-insensitive substring)
  const matched = ML_LEARNING_RESOURCES.filter((res) =>
    targetSkills.some(
      (skill) =>
        res.skill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(res.skill.toLowerCase())
    )
  ).map((res) => {
    const interaction = interactions[String(res.id)] || { progress: res.initialProgress || 0, rating: res.initialRating };
    return {
      ...res,
      userProgress: interaction.progress || 0,
      userRating: interaction.rating || null,
      isCompleted: (interaction.progress || 0) >= 1.0
    };
  });

  // Categorize into the 4 pedagogical pillars
  const learn = matched.filter((r) => r.type === "COURSE" || r.type === "VIDEO" || r.type === "ARTICLE");
  const practice = matched.filter((r) => r.type === "QUIZ" || r.type === "ARTICLE");
  const build = matched.filter((r) => r.type === "PROJECT");
  const assess = matched.filter((r) => r.type === "QUIZ");

  return {
    all: matched,
    totalCount: matched.length,
    learn,
    practice,
    build,
    assess
  };
}

/**
 * MODEL D: Learning Recommendation Engine
 * Computes content-based & skill-gap affinity ranking for the student
 * 
 * Formula:
 * Score = (Gap Priority Weight * 40%) + (Difficulty Fit * 20%) + (Peer Rating * 25%) + (Completion Popularity * 15%)
 */
export function getModelDRecommendations({
  careerGoal = "Data Analyst",
  skillGaps = [],
  currentSkills = [],
  limit = 4
}) {
  const interactions = getStoredInteractions();

  // Extract gap priority map
  const gapMap = {};
  if (Array.isArray(skillGaps)) {
    skillGaps.forEach((g) => {
      const name = g.name || g.skill || "";
      gapMap[name.toLowerCase()] = {
        priority: g.priority || "MEDIUM",
        gap: g.gap || 15,
        targetModuleId: g.roadmapStepId ? (SKILL_TO_MODULE_MAP[name] || g.roadmapStepId.replace(/^step-/, "")) : (SKILL_TO_MODULE_MAP[name] || "industry-assessment")
      };
    });
  }

  // Default fallback gaps if empty — use generic learning rather than Data Analyst SQL defaults
  if (Object.keys(gapMap).length === 0) {
    gapMap["communication"] = { priority: "MEDIUM", gap: 15, targetModuleId: "industry-assessment" };
    gapMap["problem solving"] = { priority: "MEDIUM", gap: 10, targetModuleId: "industry-assessment" };
  }

  const scored = ML_LEARNING_RESOURCES.map((res) => {
    const resSkillLower = res.skill.toLowerCase();
    const interaction = interactions[String(res.id)] || { progress: res.initialProgress || 0, rating: res.initialRating };

    // 1. Gap Affinity (0 - 40 points)
    let gapScore = 10;
    let matchingGap = null;
    for (const [gapKey, gapInfo] of Object.entries(gapMap)) {
      if (resSkillLower.includes(gapKey) || gapKey.includes(resSkillLower)) {
        matchingGap = { name: gapKey, ...gapInfo };
        if (gapInfo.priority === "HIGH") {
          gapScore = 40;
        } else if (gapInfo.priority === "MEDIUM") {
          gapScore = 28;
        } else {
          gapScore = 18;
        }
        break;
      }
    }

    // 2. Difficulty Fit (0 - 20 points)
    let difficultyScore = 15;
    if (res.difficulty === "Intermediate") {
      difficultyScore = 20; // Sweet spot for gap closing
    } else if (res.difficulty === "Beginner") {
      difficultyScore = 18;
    } else {
      difficultyScore = 14;
    }

    // 3. Peer Rating (0 - 25 points) from learning_interactions.csv
    const ratingScore = Math.min(25, (res.rating / 5) * 25);

    // 4. Completion Rate Popularity (0 - 15 points)
    const completionScore = Math.min(15, (res.completionRate / 100) * 15);

    // Total raw score (0-100)
    let totalScore = Math.round(gapScore + difficultyScore + ratingScore + completionScore);
    totalScore = Math.min(99, Math.max(65, totalScore));

    // Determine target roadmap module
    const targetModuleId = matchingGap?.targetModuleId || SKILL_TO_MODULE_MAP[res.skill] || "industry-assessment";

    // Generate Explainable AI rationale
    let rationale = "";
    let badgeText = "";
    if (matchingGap && matchingGap.priority === "HIGH") {
      badgeText = "High Priority Gap";
      rationale = `Directly bridges your ${matchingGap.name.toUpperCase()} gap (${matchingGap.gap}% gap). Rated ★${res.rating} by ${res.learnersCount} students.`;
    } else if (matchingGap) {
      badgeText = "Skill Alignment";
      rationale = `Strengthens required ${matchingGap.name} competency. Rated ★${res.rating} by ${res.learnersCount} peers.`;
    } else {
      badgeText = "Top Community Rated";
      rationale = `Highly rated ${res.type.toLowerCase()} (★${res.rating}/5) for ${res.skill} learners.`;
    }

    return {
      ...res,
      matchScore: totalScore,
      badgeText,
      rationale,
      targetModuleId,
      userProgress: interaction.progress || 0,
      userRating: interaction.rating || null,
      isCompleted: (interaction.progress || 0) >= 1.0
    };
  });

  // Sort by matchScore descending, then rating descending
  scored.sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating);

  return scored.slice(0, limit);
}
