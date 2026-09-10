// src/services/canonicalLearningService.js
// SkillBridge Canonical Learning Progress & Assessment Verification Engine
// Single source of truth for Module Completion, Assessment Results, and Roadmap Progression.

import { getRoleData } from "../data/roleCompetencies.js";
import { ROADMAP_MODULES } from "../data/roadmapData.js";

export const PASSING_SCORE = 70;

export const MODULE_STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED"
};

const STORAGE_KEY = "skillbridge_canonical_learning_progress";
const RESOURCES_STORAGE_KEY = "skillbridge_completed_resources";

/**
 * Default initial module state
 */
export function createDefaultModuleProgress(moduleId) {
  return {
    moduleId,
    status: MODULE_STATUS.NOT_STARTED,
    progressPercent: 0,
    completedResources: [],
    assessmentResult: null, // { score, passed: boolean, attempts: number, lastAttemptAt: number, answers: {} }
    startedAt: null,
    completedAt: null,
    lastActivityAt: null
  };
}

/**
 * Curated question sets for core roadmap modules
 */
const MODULE_SPECIFIC_QUESTIONS = {
  "advanced-sql": [
    {
      id: 1,
      question: "Which window function assigns unique consecutive integers to rows within a partition without any duplicate values?",
      options: [
        { value: "A", label: "ROW_NUMBER()" },
        { value: "B", label: "RANK()" },
        { value: "C", label: "DENSE_RANK()" },
        { value: "D", label: "NTILE()" }
      ],
      correct: "A",
      explanation: "ROW_NUMBER() unconditionally gives unique consecutive integers starting from 1 for each row."
    },
    {
      id: 2,
      question: "What is the primary operational advantage of a Common Table Expression (CTE) over a standard subquery?",
      options: [
        { value: "A", label: "CTEs always execute in parallel across all CPU cores" },
        { value: "B", label: "CTEs improve readability, enable self-reference in recursion, and can be referenced multiple times" },
        { value: "C", label: "CTEs bypass database query planners and disk I/O" },
        { value: "D", label: "CTEs permanently persist in temporary database storage" }
      ],
      correct: "B",
      explanation: "CTEs provide modular query readability, can be referenced multiple times in the main query, and support recursion."
    },
    {
      id: 3,
      question: "When tuning an analytical query on a 50M-row table, which index type is most effective for high-cardinality equality lookups?",
      options: [
        { value: "A", label: "Bitmap Index" },
        { value: "B", label: "B-Tree Index" },
        { value: "C", label: "Full-text Index" },
        { value: "D", label: "Spatial Index" }
      ],
      correct: "B",
      explanation: "B-Tree indexes excel at high-cardinality equality and range searches with logarithmic lookup complexity."
    },
    {
      id: 4,
      question: "Which SQL clause is strictly evaluated AFTER window functions and aggregations in standard execution order?",
      options: [
        { value: "A", label: "WHERE" },
        { value: "B", label: "HAVING" },
        { value: "C", label: "ORDER BY" },
        { value: "D", label: "GROUP BY" }
      ],
      correct: "C",
      explanation: "The execution order is FROM -> WHERE -> GROUP BY -> HAVING -> SELECT/Window Functions -> DISTINCT -> ORDER BY -> LIMIT."
    },
    {
      id: 5,
      question: "What does the LEAD() analytic function return when looking past the final row of a partition if no default value is specified?",
      options: [
        { value: "A", label: "0" },
        { value: "B", label: "NULL" },
        { value: "C", label: "The first value of the partition" },
        { value: "D", label: "Raises a SQL runtime exception" }
      ],
      correct: "B",
      explanation: "LEAD() and LAG() return NULL when reading beyond partition boundaries unless an explicit default is supplied."
    }
  ],
  "sql-fundamentals": [
    {
      id: 1,
      question: "Which clause is used to filter aggregated group results rather than individual rows?",
      options: [
        { value: "A", label: "WHERE" },
        { value: "B", label: "HAVING" },
        { value: "C", label: "ORDER BY" },
        { value: "D", label: "FILTER BY" }
      ],
      correct: "B",
      explanation: "HAVING filters grouped aggregates; WHERE filters raw rows prior to aggregation."
    },
    {
      id: 2,
      question: "Which operator matches patterns with zero or more characters in SQL?",
      options: [
        { value: "A", label: "LIKE '%...%'" },
        { value: "B", label: "IN (...)" },
        { value: "C", label: "BETWEEN ... AND ..." },
        { value: "D", label: "EXISTS" }
      ],
      correct: "A",
      explanation: "The % wildcard represents zero, one, or multiple characters in standard SQL pattern matching."
    },
    {
      id: 3,
      question: "What is the result of an INNER JOIN when keys between two tables do not match?",
      options: [
        { value: "A", label: "Non-matching rows from the left table are filled with NULLs" },
        { value: "B", label: "Non-matching rows are excluded entirely from the output" },
        { value: "C", label: "All combinations are returned as a cross product" },
        { value: "D", label: "The query errors out" }
      ],
      correct: "B",
      explanation: "INNER JOIN only retains records that satisfy the join condition in both tables."
    },
    {
      id: 4,
      question: "Which constraint ensures that all values in a column are completely distinct?",
      options: [
        { value: "A", label: "NOT NULL" },
        { value: "B", label: "UNIQUE" },
        { value: "C", label: "CHECK" },
        { value: "D", label: "DEFAULT" }
      ],
      correct: "B",
      explanation: "The UNIQUE constraint prevents duplicate entries in the specified column."
    },
    {
      id: 5,
      question: "What function counts the number of non-null records in a specific column?",
      options: [
        { value: "A", label: "COUNT(column_name)" },
        { value: "B", label: "SUM(1)" },
        { value: "C", label: "TOTAL(column_name)" },
        { value: "D", label: "ROWS(column_name)" }
      ],
      correct: "A",
      explanation: "COUNT(column_name) ignores NULL rows, while COUNT(*) counts all rows."
    }
  ],
  "power-bi": [
    {
      id: 1,
      question: "In DAX, what is the key difference between CALCULATE() and FILTER()?",
      options: [
        { value: "A", label: "CALCULATE modifies filter context; FILTER evaluates row by row and returns a table" },
        { value: "B", label: "FILTER is used only for measures, CALCULATE only for calculated columns" },
        { value: "C", label: "CALCULATE is deprecated in modern Power BI Desktop" },
        { value: "D", label: "FILTER can only be used with DirectQuery sources" }
      ],
      correct: "A",
      explanation: "CALCULATE evaluates an expression in a modified filter context. FILTER is an iterator returning a filtered table."
    },
    {
      id: 2,
      question: "Which data modeling schema is strongly recommended for Power BI reporting performance?",
      options: [
        { value: "A", label: "Snowflake schema with deep cascading hierarchies" },
        { value: "B", label: "Star schema (Fact tables surrounded by Dimension tables)" },
        { value: "C", label: "Flat single denormalized table with 300 columns" },
        { value: "D", label: "Graph network schema" }
      ],
      correct: "B",
      explanation: "Star schemas optimize the VertiPaq engine memory compression and relationship traversal."
    },
    {
      id: 3,
      question: "What type of relationship should be used when establishing an active calendar connection to sales data?",
      options: [
        { value: "A", label: "One-to-Many (1:*) single directional from Date dimension to Sales fact" },
        { value: "B", label: "Many-to-Many (*:*) bidirectional" },
        { value: "C", label: "Many-to-One (*:1) from Date to Sales" },
        { value: "D", label: "Inactive relationship requiring USERELATIONSHIP always" }
      ],
      correct: "A",
      explanation: "1-to-many single direction preserves standard filter propagation from dimensions to facts."
    },
    {
      id: 4,
      question: "Which DAX function returns the total of a column while clearing all filters applied to that table?",
      options: [
        { value: "A", label: "ALL()" },
        { value: "B", label: "ALLEXCEPT()" },
        { value: "C", label: "REMOVEFILTERS()" },
        { value: "D", label: "KEEPFILTERS()" }
      ],
      correct: "A",
      explanation: "ALL() ignores any filters applied to the specified table or columns."
    },
    {
      id: 5,
      question: "What is Row-Level Security (RLS) in Power BI used for?",
      options: [
        { value: "A", label: "Encrypting dataset files at rest on the local drive" },
        { value: "B", label: "Restricting data access for given users based on DAX filter rules" },
        { value: "C", label: "Controlling visual formatting properties by user role" },
        { value: "D", label: "Preventing users from downloading the .pbix file" }
      ],
      correct: "B",
      explanation: "RLS filters data rows dynamically based on user identity roles configured in DAX."
    }
  ],
  "embedded-c": [
    {
      id: 1,
      question: "What is the purpose of the volatile keyword when declaring a variable in Embedded C?",
      options: [
        { value: "A", label: "It ensures the variable is placed in FLASH memory" },
        { value: "B", label: "It tells the compiler the variable may change unexpectedly (e.g. by hardware or ISR) and prevents optimization" },
        { value: "C", label: "It marks the variable as thread-safe across all cores" },
        { value: "D", label: "It allocates the variable on the call stack instead of heap" }
      ],
      correct: "B",
      explanation: "volatile forces the compiler to re-read the register or memory address on every access rather than caching it in a CPU register."
    },
    {
      id: 2,
      question: "Which bitwise expression sets Bit 4 of an 8-bit register REG without altering other bits?",
      options: [
        { value: "A", label: "REG &= ~(1 << 4);" },
        { value: "B", label: "REG |= (1 << 4);" },
        { value: "C", label: "REG ^= (1 << 4);" },
        { value: "D", label: "REG = (1 << 4);" }
      ],
      correct: "B",
      explanation: "Bitwise OR with a shifted bitmask sets the target bit to 1 while leaving other bits unchanged."
    },
    {
      id: 3,
      question: "Why must interrupt service routines (ISRs) execute as quickly as possible?",
      options: [
        { value: "A", label: "Because the compiler crashes if an ISR exceeds 10 lines of code" },
        { value: "B", label: "To avoid starving other interrupts, missing critical hardware deadlines, and introducing latency" },
        { value: "C", label: "Because registers are automatically freed after 5 microseconds" },
        { value: "D", label: "To reduce microcontroller power dissipation to 0W" }
      ],
      correct: "B",
      explanation: "Protracted ISR execution introduces latency and risks missing subsequent hardware triggers."
    },
    {
      id: 4,
      question: "What is the typical size of stdint.h type uint32_t?",
      options: [
        { value: "A", label: "16 bits" },
        { value: "B", label: "32 bits (4 bytes)" },
        { value: "C", label: "64 bits" },
        { value: "D", label: "Platform-dependent" }
      ],
      correct: "B",
      explanation: "stdint.h guarantees explicit width types; uint32_t is guaranteed to be exactly 32 unsigned bits."
    },
    {
      id: 5,
      question: "Which peripheral bus typically uses two bidirectional open-drain lines with pull-up resistors (SDA and SCL)?",
      options: [
        { value: "A", label: "SPI" },
        { value: "B", label: "UART" },
        { value: "C", label: "I2C" },
        { value: "D", label: "CAN" }
      ],
      correct: "C",
      explanation: "I2C operates with two open-drain lines (SDA and SCL) pulled high by resistors."
    }
  ]
};

/**
 * Fallback questions generator based on module metadata
 */
function generateGenericQuestions(module) {
  const title = module.title || "Module";
  const skills = Array.isArray(module.skills) && module.skills.length > 0 ? module.skills : [title];
  const primarySkill = skills[0] || title;
  const secondarySkill = skills[1] || "industry best practices";

  return [
    {
      id: 1,
      question: `What is the primary industry objective when applying ${primarySkill} in real-world workflows?`,
      options: [
        { value: "A", label: `Standardizing robust, maintainable solutions that satisfy ${secondarySkill} standards` },
        { value: "B", label: "Bypassing domain architecture to minimize development time" },
        { value: "C", label: "Eliminating the need for automated validation and testing" },
        { value: "D", label: "Relying exclusively on unverified third-party scripts" }
      ],
      correct: "A",
      explanation: `${primarySkill} implementations require maintainability, accuracy, and adherence to production standards.`
    },
    {
      id: 2,
      question: `Which core practice ensures high reliability when working with ${primarySkill}?`,
      options: [
        { value: "A", label: "Validating input boundary conditions and handling edge cases systematically" },
        { value: "B", label: "Executing all operations without error catching or logging" },
        { value: "C", label: "Avoiding modular design patterns in favor of single monolithic files" },
        { value: "D", label: "Hardcoding configuration parameters directly in business logic" }
      ],
      correct: "A",
      explanation: "Robust input validation and defensive handling prevent catastrophic runtime exceptions."
    },
    {
      id: 3,
      question: `In a production environment, how should metrics related to ${primarySkill} be evaluated?`,
      options: [
        { value: "A", label: "By measuring verifiable deliverables against documented benchmark criteria" },
        { value: "B", label: "By subjective peer impressions without structured benchmarks" },
        { value: "C", label: "By measuring code length rather than algorithmic efficiency" },
        { value: "D", label: "By skipping verification if the initial prototype compiles" }
      ],
      correct: "A",
      explanation: "Verified industry outcomes are evaluated through objective performance and correctness benchmarks."
    },
    {
      id: 4,
      question: `When collaborating in cross-functional engineering teams, what is essential when documenting ${primarySkill}?`,
      options: [
        { value: "A", label: "Maintaining clear technical specifications, architecture diagrams, and reproduction steps" },
        { value: "B", label: "Leaving code undocumented to protect proprietary implementation details" },
        { value: "C", label: "Documenting only after deployment failures occur" },
        { value: "D", label: "Limiting documentation to oral handover meetings" }
      ],
      correct: "A",
      explanation: "Systematic documentation empowers seamless team handoffs, auditing, and maintenance."
    },
    {
      id: 5,
      question: `What indicates mastery of ${primarySkill} according to SkillBridge Digital Passport standards?`,
      options: [
        { value: "A", label: "Demonstrating verified score >= 70% and successfully applying skills to hands-on projects" },
        { value: "B", label: "Simply skimming study material without completing assessment validation" },
        { value: "C", label: "Copying boilerplates without explaining fundamental principles" },
        { value: "D", label: "Self-reporting proficiency on social media" }
      ],
      correct: "A",
      explanation: "SkillBridge credentials require rigorous assessment validation and practical milestone completion."
    }
  ];
}

/**
 * Retrieve assessment questions for any module
 */
export function getModuleAssessmentQuestions(module, careerGoal = null) {
  if (!module) return [];

  // Check module ID specific questions
  if (MODULE_SPECIFIC_QUESTIONS[module.id]) {
    return MODULE_SPECIFIC_QUESTIONS[module.id];
  }

  // Check if role assessment questions have category match
  if (careerGoal) {
    const roleData = getRoleData(careerGoal);
    if (roleData?.assessmentQuestions?.length > 0) {
      const matched = roleData.assessmentQuestions.filter((q) => {
        const cat = (q.category || "").toLowerCase();
        const title = (module.title || "").toLowerCase();
        const modId = (module.id || "").toLowerCase();
        return cat.includes(title) || title.includes(cat) || modId.includes(cat);
      });
      if (matched.length >= 3) {
        return matched.slice(0, 5);
      }
    }
  }

  // Fallback dynamic generator
  return generateGenericQuestions(module);
}

/**
 * Load all canonical learning progress from localStorage
 */
export function loadCanonicalLearningProgress() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      }
    }
  } catch (e) {
    console.warn("Failed to parse canonical learning progress from localStorage:", e);
  }
  return { ...DEFAULT_INITIAL_LEARNING_PROGRESS };
}

export const DEFAULT_INITIAL_LEARNING_PROGRESS = {
  "sql-fundamentals": {
    moduleId: "sql-fundamentals",
    status: MODULE_STATUS.COMPLETED,
    progressPercent: 100,
    completedResources: ["sql-syntax-cheatsheet", "select-queries-guide", "aggregations-joins-lab"],
    assessmentResult: { score: 85, correctCount: 4, totalQuestions: 5, passed: true, attempts: 1, lastAttemptAt: 1725408000000 },
    completedAt: 1725408000000,
    lastActivityAt: 1725408000000
  }
};

/**
 * Save canonical learning progress to localStorage
 */
export function saveCanonicalLearningProgress(progress) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  } catch (e) {
    console.error("Failed to save canonical learning progress to localStorage:", e);
  }
}

/**
 * Load completed resource IDs
 */
export function loadCompletedResourceIds() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(RESOURCES_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    }
  } catch (e) {
    console.warn("Failed to load completed resources:", e);
  }
  return {};
}

/**
 * Save completed resource IDs
 */
export function saveCompletedResourceIds(resourceIds) {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(RESOURCES_STORAGE_KEY, JSON.stringify(resourceIds));
    }
  } catch (e) {
    console.error("Failed to save completed resources:", e);
  }
}

/**
 * Get module progress object safely
 */
export function getModuleProgress(moduleId, canonicalStore = null) {
  const store = canonicalStore || loadCanonicalLearningProgress();
  return store[moduleId] || createDefaultModuleProgress(moduleId);
}

/**
 * Record resource toggle and update module progress percentage
 * - Caps resource progress at 80% until assessment is taken & passed
 * - If module is already COMPLETED, stays at 100%
 */
export function recordResourceToggle(moduleId, resourceId, totalResourcesCount = 1, currentStore = null) {
  const store = { ...(currentStore || loadCanonicalLearningProgress()) };
  const currentMod = store[moduleId] || createDefaultModuleProgress(moduleId);

  const completedResIds = loadCompletedResourceIds();
  const isNowCompleted = !completedResIds[resourceId];
  const updatedCompletedResIds = {
    ...completedResIds,
    [resourceId]: isNowCompleted
  };
  saveCompletedResourceIds(updatedCompletedResIds);

  // Compute how many resources for this module are completed
  const currentCompletedResources = currentMod.completedResources || [];
  let updatedResList;
  if (isNowCompleted) {
    updatedResList = Array.from(new Set([...currentCompletedResources, resourceId]));
  } else {
    updatedResList = currentCompletedResources.filter((id) => id !== resourceId);
  }

  // Calculate new progress percentage
  let newProgressPercent = currentMod.progressPercent;
  let newStatus = currentMod.status;

  if (currentMod.status === MODULE_STATUS.COMPLETED) {
    // Keep 100% if already verified via assessment
    newProgressPercent = 100;
  } else {
    // Up to 80% maximum for study resources
    const safeTotal = Math.max(1, totalResourcesCount);
    const resourceRatio = updatedResList.length / safeTotal;
    newProgressPercent = Math.min(80, Math.round(resourceRatio * 80));

    if (newProgressPercent > 0) {
      newStatus = MODULE_STATUS.IN_PROGRESS;
    } else {
      newStatus = MODULE_STATUS.NOT_STARTED;
    }
  }

  const updatedModule = {
    ...currentMod,
    status: newStatus,
    progressPercent: newProgressPercent,
    completedResources: updatedResList,
    lastActivityAt: Date.now()
  };

  store[moduleId] = updatedModule;
  saveCanonicalLearningProgress(store);

  return {
    updatedModule,
    updatedStore: store,
    completedResourceIds: updatedCompletedResIds
  };
}

/**
 * Record an assessment attempt for a module
 * STRICT VERIFICATION RULES:
 * 1. Score >= 70% -> PASSED -> Status COMPLETED -> 100% progress -> timestamp recorded
 * 2. Score < 70%  -> FAILED -> Status IN_PROGRESS -> progress capped at max 80% -> retry allowed
 */
export function recordAssessmentAttempt(moduleId, answers = {}, questions = [], currentStore = null) {
  const store = { ...(currentStore || loadCanonicalLearningProgress()) };
  const currentMod = store[moduleId] || createDefaultModuleProgress(moduleId);

  const totalQuestions = questions.length || 1;
  let correctCount = 0;

  questions.forEach((q) => {
    const studentAnswer = answers[q.id];
    if (studentAnswer && studentAnswer === q.correct) {
      correctCount += 1;
    }
  });

  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= PASSING_SCORE;

  const previousAttempts = currentMod.assessmentResult?.attempts || 0;
  const attempts = previousAttempts + 1;

  const assessmentResult = {
    score: scorePercent,
    correctCount,
    totalQuestions,
    passed,
    attempts,
    answers,
    lastAttemptAt: Date.now()
  };

  let newStatus;
  let newProgress;
  let completedAt = currentMod.completedAt;

  if (passed) {
    newStatus = MODULE_STATUS.COMPLETED;
    newProgress = 100;
    completedAt = Date.now();
  } else {
    newStatus = MODULE_STATUS.IN_PROGRESS;
    // Cap progress at max 80% (cannot be 100% if failed)
    newProgress = Math.min(80, currentMod.progressPercent || 50);
  }

  const updatedModule = {
    ...currentMod,
    status: newStatus,
    progressPercent: newProgress,
    assessmentResult,
    completedAt,
    lastActivityAt: Date.now()
  };

  store[moduleId] = updatedModule;
  saveCanonicalLearningProgress(store);

  return {
    passed,
    score: scorePercent,
    updatedModule,
    updatedStore: store
  };
}

/**
 * Resolve progress for a module ID with alias and prefix tolerance
 */
export function resolveModuleProgress(moduleId, store) {
  if (!moduleId || !store) return null;
  if (store[moduleId]) return store[moduleId];
  const cleanId = String(moduleId).replace(/^step-/, "").replace(/^gap-/, "");
  if (store[cleanId]) return store[cleanId];
  if (store[`step-${cleanId}`]) return store[`step-${cleanId}`];

  // Common aliases
  const aliasMap = {
    "step-sql-fund": "sql-fundamentals",
    "step-adv-sql": "advanced-sql",
    "step-pbi": "power-bi",
    "step-stats": "industry-assessment",
    "adv-sql": "advanced-sql",
    "sql-fund": "sql-fundamentals",
    "pbi": "power-bi"
  };

  const mappedKey = aliasMap[moduleId] || aliasMap[cleanId];
  if (mappedKey && store[mappedKey]) return store[mappedKey];

  return null;
}

/**
 * Calculate mathematically sound aggregate roadmap progress
 * overallProgress = sum(module.progressPercent) / count(modules)
 */
export function getRoadmapOverallProgress(modulesList = [], learningProgressStore = null) {
  const store = learningProgressStore || loadCanonicalLearningProgress();
  const regularCourses = modulesList.filter((m) => m.id !== "internship-ready");
  const totalCourses = regularCourses.length;

  if (totalCourses === 0) {
    return {
      overallProgress: 0,
      completedCount: 0,
      totalCourses: 0,
      isInternshipReady: false,
      completedModuleIds: {}
    };
  }

  let totalPercentSum = 0;
  let completedCount = 0;
  const completedMap = {};

  regularCourses.forEach((m) => {
    const modProgress = resolveModuleProgress(m.id, store);
    const pct = modProgress?.progressPercent || 0;
    const isComp = modProgress?.status === MODULE_STATUS.COMPLETED || pct === 100;

    totalPercentSum += pct;
    if (isComp) {
      completedCount += 1;
      completedMap[m.id] = true;
    }
  });

  const overallProgress = Math.round(totalPercentSum / totalCourses);
  const isInternshipReady = completedCount === totalCourses;

  return {
    overallProgress: Math.min(100, Math.max(0, overallProgress)),
    completedCount,
    totalCourses,
    isInternshipReady,
    completedModuleIds: completedMap
  };
};
