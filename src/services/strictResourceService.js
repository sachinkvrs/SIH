// src/services/strictResourceService.js
// Strict Role-Context Resource Service for SkillBridge
// Guarantees zero cross-role content leakage and strict context filtering.

import { LEARNING_RESOURCES_CATALOG } from "../data/learningResourcesCatalog.js";
import { getRoleData } from "../data/roleCompetencies.js";
import { ROADMAP_MODULES } from "../data/roadmapData.js";

/**
 * Retrieve all modules for a given role from roleCompetencies or roadmapData
 */
export function getAllModulesForRole(roleName = "Data Analyst") {
  const roleData = getRoleData(roleName);
  if (roleData && Array.isArray(roleData.roadmap) && roleData.roadmap.length > 0) {
    return roleData.roadmap;
  }
  // Fallback only if Data Analyst and roadmap missing in roleCompetencies
  if (roleName === "Data Analyst") {
    return ROADMAP_MODULES.filter((m) => m.id !== "internship-ready");
  }
  return [];
}

/**
 * STRICT ROLE AND MODULE RESOURCE RETRIEVAL
 * Enforces the rule: ONLY return resources explicitly mapped to the selected role
 * and current module. NEVER silently substitute another role's content.
 */
export function getResourcesForRoleAndModule({ roleName, moduleId }) {
  if (!roleName) {
    return {
      resources: [],
      activeModule: null,
      allModules: [],
      error: "No target role specified."
    };
  }

  const allModules = getAllModulesForRole(roleName);

  // 1. Resolve active module within the role's curriculum
  let activeModule = null;
  if (moduleId) {
    activeModule = allModules.find(
      (m) => m.id === moduleId || m.id?.toLowerCase() === moduleId.toLowerCase()
    );
  }

  // If moduleId was not specified or not found, select the first milestone of the role
  if (!activeModule && allModules.length > 0) {
    activeModule = allModules[0];
  }

  // 2. Strict Role Filter: Resources MUST have roleIds including this exact roleName
  const roleScopedResources = LEARNING_RESOURCES_CATALOG.filter((res) =>
    Array.isArray(res.roleIds) && res.roleIds.includes(roleName)
  );

  // 3. Strict Module Filter: If an active module is identified, filter by its moduleId
  let moduleScopedResources = [];
  if (activeModule) {
    moduleScopedResources = roleScopedResources.filter(
      (res) => Array.isArray(res.moduleIds) && res.moduleIds.includes(activeModule.id)
    );
  }

  // If active module has no specific module-tagged resources, check if there are role-level resources
  // that match the active module's skill keywords
  if (moduleScopedResources.length === 0 && activeModule) {
    const moduleSkill = (activeModule.skill || activeModule.title || "").toLowerCase();
    moduleScopedResources = roleScopedResources.filter((res) => {
      const hasSkillMatch = Array.isArray(res.skillIds) && res.skillIds.some(
        (s) => moduleSkill.includes(s.toLowerCase()) || s.toLowerCase().includes(moduleSkill)
      );
      return hasSkillMatch;
    });
  }

  return {
    resources: moduleScopedResources,
    activeModule,
    allModules,
    totalRoleResourcesCount: roleScopedResources.length,
    isEmpty: moduleScopedResources.length === 0
  };
}

/**
 * Scoped Resource Hub Search: searches ONLY within the current role's resources
 */
export function searchRoleResources({ roleName, moduleId, query }) {
  if (!query || query.trim().length === 0) {
    return getResourcesForRoleAndModule({ roleName, moduleId }).resources;
  }

  const { resources } = getResourcesForRoleAndModule({ roleName, moduleId });
  const q = query.toLowerCase().trim();

  return resources.filter((res) => {
    return (
      res.title.toLowerCase().includes(q) ||
      res.description.toLowerCase().includes(q) ||
      (Array.isArray(res.skillIds) && res.skillIds.some((s) => s.toLowerCase().includes(q))) ||
      res.provider.toLowerCase().includes(q) ||
      res.type.toLowerCase().includes(q)
    );
  });
}

/**
 * Model D: Ranked recommendations strictly within the selected role
 * Ranks strictly the role-scoped resources according to student's skill gaps
 */
export function getRecommendedRoleResources({ roleName, moduleId, skillGaps = [] }) {
  const { resources } = getResourcesForRoleAndModule({ roleName, moduleId });
  if (resources.length === 0) return [];

  // Map student skill gaps
  const gapMap = {};
  if (Array.isArray(skillGaps)) {
    skillGaps.forEach((g) => {
      const name = (g.name || g.skill || "").toLowerCase();
      gapMap[name] = {
        priority: g.priority || "MEDIUM",
        gap: g.gap || 15
      };
    });
  }

  // Score strictly within role-specific resources
  const scored = resources.map((res) => {
    let score = 50;
    const skills = Array.isArray(res.skillIds) ? res.skillIds : [];

    // Gap priority boost
    for (const s of skills) {
      const sLower = s.toLowerCase();
      for (const [gapKey, gapInfo] of Object.entries(gapMap)) {
        if (sLower.includes(gapKey) || gapKey.includes(sLower)) {
          if (gapInfo.priority === "HIGH") score += 35;
          else if (gapInfo.priority === "MEDIUM") score += 20;
          else score += 10;
          break;
        }
      }
    }

    // Intermediate difficulty is the sweet spot for gap closing
    if (res.difficulty === "Intermediate") score += 10;
    if (res.difficulty === "Beginner") score += 5;

    return { ...res, recommendationScore: score };
  });

  return scored.sort((a, b) => b.recommendationScore - a.recommendationScore);
}
