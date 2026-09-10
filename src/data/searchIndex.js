// src/data/searchIndex.js
// Client-side universal search index for SkillBridge
// Searches across: roles, skills, courses, experiments, domains, opportunities

import { ROLE_COMPETENCIES, DOMAINS_LIST } from "./roleCompetencies.js";
import { CAREER_INTELLIGENCE_DATA, CAREER_GOALS } from "./careerIntelligence.js";
import { LEARNING_RESOURCES_CATALOG } from "./learningResourcesCatalog.js";

/**
 * Build a flat searchable index from all configured data.
 */
function buildSearchIndex() {
  const index = [];

  // 1. Index all career roles
  const allRoles = Object.values(ROLE_COMPETENCIES);
  allRoles.forEach((role) => {
    index.push({
      type: "role",
      title: role.roleName,
      description: `${role.domainName} · ${role.category}`,
      domain: role.domainName,
      domainId: role.domainId,
      tags: [role.roleName, role.domainName, role.category],
      screen: "skill_assessment",
      action: "select_role",
      roleId: role.roleName
    });

    // 2. Index skills from each role's skill gaps
    (role.skillGaps || []).forEach((gap) => {
      if (!index.some((i) => i.type === "skill" && i.title === gap.name)) {
        index.push({
          type: "skill",
          title: gap.name,
          description: `${gap.priority === "HIGH" ? "High Priority" : "Required"} skill for ${role.roleName}`,
          domain: role.domainName,
          domainId: role.domainId,
          tags: [gap.name, role.roleName, role.domainName, "skill gap", "learning"],
          screen: "skill_gap",
          action: "navigate"
        });
      }
    });

    // 3. Index roadmap modules from each role
    (role.roadmap || []).forEach((module) => {
      index.push({
        type: "course",
        title: module.title,
        description: `${role.roleName} roadmap · ${module.duration || ""}`.trim(),
        domain: role.domainName,
        domainId: role.domainId,
        tags: [
          module.title,
          ...(Array.isArray(module.skills) ? module.skills : []),
          role.roleName,
          role.domainName,
          "course",
          "roadmap",
          "learning"
        ],
        screen: "roadmap",
        action: "open_module",
        moduleId: module.id,
        roleId: role.roleName
      });
    });

    // 4. Index hands-on experiments from each role
    (role.handsOnExperiments || []).forEach((exp) => {
      index.push({
        type: "experiment",
        title: exp.title,
        description: exp.industryContext || exp.description || `Hands-on project for ${role.roleName}`,
        domain: role.domainName,
        domainId: role.domainId,
        tags: [
          exp.title,
          role.roleName,
          ...(Array.isArray(exp.tools) ? exp.tools : (typeof exp.tools === "string" ? exp.tools.split(",").map((s) => s.trim()) : [])),
          "experiment",
          "project",
          "hands-on"
        ],
        screen: "skill_gap",
        action: "navigate"
      });
    });

    // 5. Index opportunities from each role
    (role.opportunities || []).forEach((opp) => {
      index.push({
        type: "opportunity",
        title: opp.title || opp.role,
        description: `${opp.company || ""} · ${opp.location || ""} · ${role.roleName}`.replace(/^·|·$/g, "").trim(),
        domain: role.domainName,
        domainId: role.domainId,
        tags: [
          opp.title || opp.role,
          opp.company || "",
          opp.location || "",
          role.roleName,
          "internship",
          "job",
          "opportunity",
          ...(Array.isArray(opp.tags) ? opp.tags : [])
        ],
        screen: "opportunities",
        action: "navigate"
      });
    });
  });

  // 6. Index academic domains
  DOMAINS_LIST.forEach((domain) => {
    index.push({
      type: "domain",
      title: domain.name,
      description: `Academic domain: ${domain.shortName}`,
      domain: domain.name,
      domainId: domain.id,
      tags: [domain.name, domain.shortName, domain.id, "domain", "academic"],
      screen: "skill_assessment",
      action: "navigate"
    });
  });

  // 7. Index all canonical learning resources
  LEARNING_RESOURCES_CATALOG.forEach((res) => {
    index.push({
      type: "resource",
      title: res.title,
      description: `${res.provider} · ${res.type} · ${res.duration}`,
      domain: Array.isArray(res.roleIds) ? res.roleIds.join(", ") : (typeof res.roleIds === "string" ? res.roleIds : "General"),
      domainId: res.domainIds?.[0] || "general",
      tags: [
        res.title,
        res.provider,
        res.type,
        ...(Array.isArray(res.skillIds) ? res.skillIds : []),
        ...(Array.isArray(res.roleIds) ? res.roleIds : []),
        "resource",
        "study",
        "learning"
      ],
      screen: "learning_resource",
      action: "open_resource",
      moduleId: res.moduleIds?.[0],
      resourceId: res.id,
      roleId: res.roleIds?.[0]
    });
  });

  return index;
}

// Type icon/color metadata for search result display
export const SEARCH_TYPE_META = {
  role: { label: "Career Role", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300", icon: "Target" },
  skill: { label: "Skill", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300", icon: "Zap" },
  course: { label: "Course", color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300", icon: "BookOpen" },
  resource: { label: "Resource", color: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300", icon: "FileText" },
  experiment: { label: "Project", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300", icon: "Wrench" },
  opportunity: { label: "Opportunity", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300", icon: "Briefcase" },
  domain: { label: "Domain", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", icon: "Compass" },
};

/**
 * Search across all SkillBridge entities.
 * @param {string} query - Search query string
 * @param {number} limit - Maximum results to return (default 8)
 * @returns {Array} Array of search result objects
 */
export function searchAll(query, limit = 8) {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase().trim();
  const index = buildSearchIndex();

  // Score each item
  const scored = index.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = (item.description || "").toLowerCase();

    // Exact title match: highest score
    if (titleLower === q) score += 100;
    // Title starts with query
    else if (titleLower.startsWith(q)) score += 70;
    // Title contains query
    else if (titleLower.includes(q)) score += 50;
    // Description contains query
    else if (descLower.includes(q)) score += 20;

    // Tag matches
    const tagScore = item.tags.filter((tag) =>
      tag && tag.toLowerCase().includes(q)
    ).length * 15;
    score += tagScore;

    return { ...item, score };
  });

  // Filter out zero-score items, sort by score descending
  const results = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  // Deduplicate by title + type
  const seen = new Set();
  const deduped = results.filter((item) => {
    const key = `${item.type}:${item.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.slice(0, limit);
}

/**
 * Get suggested search queries for empty/idle state
 */
export const SEARCH_SUGGESTIONS = [
  "SQL", "Python", "Power BI",
  "Embedded", "CAD", "VLSI",
  "Power Systems", "Structural", "BIM",
  "React", "Machine Learning", "Financial Modeling",
  "Business Analyst", "Data Analyst", "IoT"
];
