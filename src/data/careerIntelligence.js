// src/data/careerIntelligence.js
// Central Career Intelligence Store for SkillBridge Platform

export const CAREER_GOALS = [
  "Data Analyst",
  "Data Scientist",
  "Software Developer",
  "ML Engineer",
  "Business Analyst",
  "Cybersecurity Analyst",
  "UI/UX Designer",
  "Embedded Systems Engineer",
  "Power Systems Engineer",
  "Mechanical Design Engineer",
  "BIM & Structural Engineer"
];

export const CAREER_INTELLIGENCE_DATA = {
  "Data Analyst": {
    roleName: "Data Analyst",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    readinessScore: 82,
    scoreDelta: "+5% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 86, desc: "SQL, Python data manipulation & statistical analysis" },
      { name: "Tools & Technologies", score: 74, desc: "Power BI, Excel Power Query, Tableau, Git" },
      { name: "Communication", score: 82, desc: "Data storytelling, business stakeholder reporting" },
      { name: "Projects", score: 78, desc: "End-to-end exploratory data analysis & dashboarding" },
      { name: "Certifications", score: 90, desc: "Verified SQL & Python assessments on SkillBridge" }
    ],
    readinessSummary: "You have strong foundational SQL & Python skills. Bridging the 30% gap in Power BI DAX modeling will push your readiness to 92%.",
    
    // Skill Gaps
    skillGaps: [
      {
        id: "gap-sql",
        name: "SQL",
        current: 65,
        required: 80,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Advanced SQL Queries & Window Functions",
        duration: "2 weeks",
        roadmapStepId: "step-adv-sql"
      },
      {
        id: "gap-pbi",
        name: "Power BI",
        current: 45,
        required: 75,
        gap: 30,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Power BI Desktop & DAX Modeling",
        duration: "3 weeks",
        roadmapStepId: "step-pbi"
      },
      {
        id: "gap-stats",
        name: "Statistics",
        current: 70,
        required: 80,
        gap: 10,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200",
        recommendedAction: "Statistical Inference & Hypothesis Testing",
        duration: "1 week",
        roadmapStepId: "step-stats"
      },
      {
        id: "gap-python",
        name: "Python",
        current: 85,
        required: 85,
        gap: 0,
        priority: "LOW",
        status: "Strong",
        gapColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
        recommendedAction: "Proficiency verified. Maintain via practice.",
        duration: "Completed",
        roadmapStepId: "step-py-fund"
      }
    ],

    // Connected Roadmap
    roadmap: [
      {
        id: "step-sql-fund",
        title: "SQL Fundamentals",
        skill: "SQL Querying",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Basic queries, multi-table JOINs, filtering, aggregations and grouping.",
        reason: "Core prerequisite for enterprise relational database analysis."
      },
      {
        id: "step-adv-sql",
        title: "Advanced SQL",
        skill: "Advanced SQL & CTEs",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 65,
        desc: "Window functions, Common Table Expressions (CTEs), subqueries and query optimization.",
        reason: "SQL is currently your highest-priority skill gap (15% gap) for the Data Analyst role."
      },
      {
        id: "step-pbi",
        title: "Power BI Fundamentals & DAX",
        skill: "Business Intelligence",
        duration: "4 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 25,
        desc: "Data modeling, Star schema, calculated columns, DAX measures and executive dashboards.",
        reason: "Required by 88% of Data Analyst employers to visualize metrics."
      },
      {
        id: "step-stats",
        title: "Statistical Data Analysis",
        skill: "Applied Statistics",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Hypothesis testing, probability distributions, A/B test analysis and regression.",
        reason: "Bridges your 10% statistics gap to build defensible business insights."
      },
      {
        id: "step-project",
        title: "End-to-End Analytics Capstone",
        skill: "Applied Data Storytelling",
        duration: "4 weeks • Capstone Project",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Comprehensive e-commerce analytics project with ETL pipeline and executive presentation deck.",
        reason: "Provides portfolio proof for interview fast-tracking."
      },
      {
        id: "step-ready",
        title: "Internship Ready Certification",
        skill: "Interview & Portfolio Review",
        duration: "Verified Credential",
        difficulty: "Milestone",
        status: "target",
        progress: 0,
        desc: "Proctored SkillBridge technical assessment and verified Digital Skill Passport issue.",
        reason: "Guarantees direct referral to partner employers."
      }
    ],

    // Next Best Actions
    nextBestActions: [
      {
        id: "action-1",
        title: "Complete SQL Assessment",
        category: "Skill Assessment",
        reason: "High-priority skill gap (15% gap). Achieving 80% boosts your readiness to 86%.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      },
      {
        id: "action-2",
        title: "Continue Advanced SQL Module",
        category: "Learning Roadmap",
        reason: "You are on Module 2 of 6. 35% remaining to unlock Power BI DAX.",
        actionText: "Continue Learning",
        targetScreen: "roadmap",
        priority: "Recommended",
        priorityColor: "bg-blue-100 text-blue-700 border-blue-200"
      },
      {
        id: "action-3",
        title: "Apply for Data Analyst Intern at ABC Tech",
        category: "Opportunity Match",
        reason: "88% profile match with your verified Python and SQL profile.",
        actionText: "View Opportunity",
        targetScreen: "opportunities",
        priority: "Opportunity",
        priorityColor: "bg-emerald-100 text-emerald-700 border-emerald-200"
      }
    ],

    // Explainable Opportunities (Categorized: Internships, Jobs, Startups, Government)
    opportunities: [
      {
        id: "opp-1",
        category: "Internship",
        role: "Data Analyst Intern",
        company: "ABC Technologies",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹25,000 / month",
        experience: "Fresher / College Students",
        source: "LinkedIn",
        deadline: "15 Oct 2026",
        matchPercentage: 88,
        potentialMatchPercentage: 94,
        logoBg: "bg-blue-600 text-white",
        tags: ["Python", "SQL", "Power BI", "Excel"],
        matchingSkills: [
          { skill: "Python", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "SQL", studentScore: 65, requiredScore: 70, status: "Near Target" },
          { skill: "Excel", studentScore: 80, requiredScore: 70, status: "Met" },
          { skill: "Communication", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Power BI", studentScore: 45, requiredScore: 70, gap: 25, impact: "+6% match boost" }
        ],
        recommendation: "Complete the Power BI module in your roadmap to increase this match to 94%."
      },
      {
        id: "opp-2",
        category: "Job",
        role: "Junior BI Analyst",
        company: "TechCorp Global",
        location: "Hybrid (Bangalore)",
        duration: "Full-Time",
        stipend: "₹4.5 – 6.0 LPA",
        experience: "0–1 Years Experience",
        source: "Naukri",
        deadline: "22 Oct 2026",
        matchPercentage: 80,
        potentialMatchPercentage: 90,
        logoBg: "bg-emerald-600 text-white",
        tags: ["SQL", "Tableau", "Statistics", "Reporting"],
        matchingSkills: [
          { skill: "SQL", studentScore: 65, requiredScore: 65, status: "Met" },
          { skill: "Statistics", studentScore: 70, requiredScore: 70, status: "Met" },
          { skill: "Communication", studentScore: 80, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Tableau", studentScore: 40, requiredScore: 65, gap: 25, impact: "+10% match boost" }
        ],
        recommendation: "Add Tableau visualization project from the Recommendations tab to qualify."
      },
      {
        id: "opp-3",
        category: "Startup",
        role: "Founding Data Analyst Intern",
        company: "NeuralPulse AI (YC W25)",
        location: "Bangalore / Remote",
        duration: "4 Months (PPO Offered)",
        stipend: "₹30,000 / month + Equity",
        experience: "Early-Stage Venture",
        source: "Wellfound",
        deadline: "10 Oct 2026",
        matchPercentage: 92,
        potentialMatchPercentage: 96,
        logoBg: "bg-purple-600 text-white",
        tags: ["Python", "SQL", "FastAPI", "Pandas"],
        matchingSkills: [
          { skill: "Python", studentScore: 85, requiredScore: 80, status: "Met" },
          { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" },
          { skill: "Problem Solving", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "FastAPI / API Integration", studentScore: 50, requiredScore: 65, gap: 15, impact: "+4% match boost" }
        ],
        recommendation: "Early-stage fast moving startup with direct mentorship under founding team."
      },
      {
        id: "opp-4",
        category: "Government",
        role: "Young Professional / Data Research Associate",
        company: "NITI Aayog & National Informatics Centre (NIC)",
        location: "New Delhi / Hybrid",
        duration: "1 Year Contract (Renewable)",
        stipend: "₹60,000 / month consolidated",
        experience: "B.Tech / MCA with min 60% aggregate",
        source: "Official Government Portal",
        deadline: "30 Nov 2026",
        isDemoGov: true,
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-amber-600 text-white",
        tags: ["Public Policy Analytics", "SQL", "Excel", "Data Governance"],
        matchingSkills: [
          { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" },
          { skill: "Excel", studentScore: 80, requiredScore: 75, status: "Met" },
          { skill: "Communication", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Government Schema Standards", studentScore: 40, requiredScore: 60, gap: 20, impact: "+8% match boost" }
        ],
        recommendation: "Structured demo opportunity modeled after official government Young Professional guidelines."
      }
    ],

    // Before vs After Skill Progress
    skillProgressHistory: [
      { skill: "Python", before: 68, current: 85, delta: 17, verified: true },
      { skill: "SQL", before: 48, current: 65, delta: 17, verified: true },
      { skill: "Power BI", before: 30, current: 45, delta: 15, verified: false },
      { skill: "Statistics", before: 55, current: 70, delta: 15, verified: true },
      { skill: "Excel", before: 65, current: 80, delta: 15, verified: true }
    ],
    readinessProgressHistory: {
      before: 64,
      current: 82,
      delta: 18,
      duration: "Past 60 days"
    }
  },

  "Data Scientist": {
    roleName: "Data Scientist",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    readinessScore: 74,
    scoreDelta: "+4% from last month",
    readinessStatus: "Approaching Readiness",
    readinessBreakdown: [
      { name: "Technical Skills", score: 80, desc: "Python, Scikit-learn, Pandas, Linear Algebra" },
      { name: "Tools & Technologies", score: 68, desc: "Jupyter, MLflow, Docker, Git" },
      { name: "Communication", score: 78, desc: "Explaining ML models to non-technical leaders" },
      { name: "Projects", score: 70, desc: "Predictive modeling and feature engineering" },
      { name: "Certifications", score: 75, desc: "SkillBridge Machine Learning diagnostic verified" }
    ],
    readinessSummary: "Strong statistical programming foundation. High-priority focus needed on Deep Learning and MLOps deployment.",
    skillGaps: [
      {
        id: "gap-ml",
        name: "Machine Learning Algorithms",
        current: 68,
        required: 85,
        gap: 17,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Advanced Ensemble Models & Hyperparameter Tuning",
        duration: "3 weeks",
        roadmapStepId: "step-adv-ml"
      },
      {
        id: "gap-stats-ds",
        name: "Applied Statistics & Probability",
        current: 70,
        required: 85,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Bayesian Statistics & A/B Testing at Scale",
        duration: "2 weeks",
        roadmapStepId: "step-stats-ds"
      },
      {
        id: "gap-dl",
        name: "Deep Learning (PyTorch)",
        current: 50,
        required: 75,
        gap: 25,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200",
        recommendedAction: "Neural Networks & Computer Vision with PyTorch",
        duration: "4 weeks",
        roadmapStepId: "step-dl"
      },
      {
        id: "gap-py-ds",
        name: "Python for Data Science",
        current: 85,
        required: 85,
        gap: 0,
        priority: "LOW",
        status: "Strong",
        gapColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
        recommendedAction: "Proficiency verified.",
        duration: "Completed",
        roadmapStepId: "step-py-fund"
      }
    ],
    roadmap: [
      {
        id: "step-py-fund",
        title: "Python & Scientific Libraries",
        skill: "NumPy & Pandas",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Vectorized computations, data wrangling and exploratory analysis.",
        reason: "Core foundation for algorithmic modeling."
      },
      {
        id: "step-adv-ml",
        title: "Applied Machine Learning & Tuning",
        skill: "Scikit-Learn & XGBoost",
        duration: "4 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 55,
        desc: "Ensemble learning, cross-validation, feature importance and leakage prevention.",
        reason: "ML algorithms is your highest-priority gap (17% gap) for Data Scientist."
      },
      {
        id: "step-stats-ds",
        title: "Statistical Experimentation & A/B Testing",
        skill: "Inference & Testing",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 10,
        desc: "Design of experiments, power calculation, sample sizing and multi-armed bandits.",
        reason: "Critical for validating data science production experiments."
      },
      {
        id: "step-dl",
        title: "Deep Learning with PyTorch",
        skill: "Neural Networks",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Feedforward networks, CNNs, embeddings and transfer learning.",
        reason: "Essential for modern AI and NLP/Vision roles."
      },
      {
        id: "step-ready",
        title: "Data Science Capstone & Defence",
        skill: "Model Deployment & Presentation",
        duration: "Verified Credential",
        difficulty: "Milestone",
        status: "target",
        progress: 0,
        desc: "Production model serving via FastAPI with live Streamlit demo interface.",
        reason: "Showcases full lifecycle engineering."
      }
    ],
    nextBestActions: [
      {
        id: "action-ds-1",
        title: "Take Scikit-learn Skill Assessment",
        category: "Skill Assessment",
        reason: "Verifying your Machine Learning score will increase readiness by +6%.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      },
      {
        id: "action-ds-2",
        title: "Continue Applied Machine Learning",
        category: "Learning Roadmap",
        reason: "Currently on Step 2 of 5. Finish cross-validation module.",
        actionText: "Continue Learning",
        targetScreen: "roadmap",
        priority: "Recommended",
        priorityColor: "bg-blue-100 text-blue-700 border-blue-200"
      },
      {
        id: "action-ds-3",
        title: "Review ML Research Intern at InnovateAI",
        category: "Opportunity Match",
        reason: "82% profile match with your verified Python & statistics foundation.",
        actionText: "View Opportunity",
        targetScreen: "opportunities",
        priority: "Opportunity",
        priorityColor: "bg-emerald-100 text-emerald-700 border-emerald-200"
      }
    ],
    opportunities: [
      {
        id: "opp-ds-1",
        role: "Data Science Intern",
        company: "Cognitive Insights AI",
        location: "Bangalore (Hybrid)",
        duration: "6 Months",
        stipend: "₹35,000 / month",
        matchPercentage: 81,
        potentialMatchPercentage: 93,
        logoBg: "bg-purple-600 text-white",
        tags: ["Python", "Scikit-Learn", "Statistics", "SQL"],
        matchingSkills: [
          { skill: "Python", studentScore: 85, requiredScore: 80, status: "Met" },
          { skill: "Statistics", studentScore: 70, requiredScore: 75, status: "Near Target" },
          { skill: "SQL", studentScore: 65, requiredScore: 65, status: "Met" }
        ],
        missingSkills: [
          { skill: "Machine Learning Tuning", studentScore: 60, requiredScore: 80, gap: 20, impact: "+12% match boost" }
        ],
        recommendation: "Complete Step 2 of your roadmap to qualify for direct shortlist."
      }
    ],
    skillProgressHistory: [
      { skill: "Python", before: 68, current: 85, delta: 17, verified: true },
      { skill: "Machine Learning", before: 45, current: 68, delta: 23, verified: true },
      { skill: "Statistics", before: 50, current: 70, delta: 20, verified: true }
    ],
    readinessProgressHistory: {
      before: 58,
      current: 74,
      delta: 16,
      duration: "Past 60 days"
    }
  },

  "Software Developer": {
    roleName: "Software Developer",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    readinessScore: 79,
    scoreDelta: "+6% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 82, desc: "Data Structures, Algorithms, JavaScript, Python" },
      { name: "Tools & Technologies", score: 80, desc: "Git, Linux, Docker, VS Code, REST APIs" },
      { name: "Communication", score: 76, desc: "Code documentation, PR reviews, agile standups" },
      { name: "Projects", score: 82, desc: "Full-stack web applications with authentication" },
      { name: "Certifications", score: 75, desc: "Algorithm diagnostic assessment verified" }
    ],
    readinessSummary: "Good grasp of full-stack web and backend principles. Prioritize System Design fundamentals to unlock tier-1 tech interviews.",
    skillGaps: [
      {
        id: "gap-dsa",
        name: "Data Structures & Algorithms",
        current: 70,
        required: 85,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Trees, Graphs & Dynamic Programming Mastery",
        duration: "4 weeks",
        roadmapStepId: "step-dsa"
      },
      {
        id: "gap-sys",
        name: "System Design & Databases",
        current: 60,
        required: 75,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Scalable Microservices & Caching Strategies",
        duration: "3 weeks",
        roadmapStepId: "step-sys"
      }
    ],
    roadmap: [
      {
        id: "step-git",
        title: "Clean Code & Version Control",
        skill: "Git & Clean Architecture",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Git workflow, conventional commits, linting and unit testing.",
        reason: "Baseline hygiene for professional software engineering."
      },
      {
        id: "step-dsa",
        title: "Advanced Data Structures & Algorithms",
        skill: "DSA & Problem Solving",
        duration: "4 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 60,
        desc: "Binary trees, dynamic programming, backtracking, time/space complexity analysis.",
        reason: "DSA is your #1 gap for clearing software engineering coding rounds."
      },
      {
        id: "step-sys",
        title: "Backend Architecture & RESTful APIs",
        skill: "System Design & APIs",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 20,
        desc: "API rate limiting, JWT authentication, database indexing and redis caching.",
        reason: "Required for robust backend service development."
      }
    ],
    nextBestActions: [
      {
        id: "action-sd-1",
        title: "Complete DSA Coding Assessment",
        category: "Skill Assessment",
        reason: "Demonstrate LeetCode-style algorithmic competency to recruiter mentors.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      },
      {
        id: "action-sd-2",
        title: "Continue Advanced DSA Module",
        category: "Learning Roadmap",
        reason: "Module 2 is 60% complete. Solve Dynamic Programming problems.",
        actionText: "Continue Learning",
        targetScreen: "roadmap",
        priority: "Recommended",
        priorityColor: "bg-blue-100 text-blue-700 border-blue-200"
      }
    ],
    opportunities: [
      {
        id: "opp-sd-1",
        role: "Software Developer Intern",
        company: "Accenture",
        location: "Hyderabad (Hybrid)",
        duration: "6 Months",
        stipend: "₹32,000 / month",
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-purple-600 text-white",
        tags: ["JavaScript", "Python", "REST APIs", "Git"],
        matchingSkills: [
          { skill: "JavaScript", studentScore: 78, requiredScore: 75, status: "Met" },
          { skill: "Git", studentScore: 80, requiredScore: 70, status: "Met" },
          { skill: "Python", studentScore: 85, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "System Architecture", studentScore: 60, requiredScore: 75, gap: 15, impact: "+8% match boost" }
        ],
        recommendation: "Build a microservice project to unlock fast-tracked interviews."
      }
    ],
    skillProgressHistory: [
      { skill: "JavaScript", before: 60, current: 78, delta: 18, verified: true },
      { skill: "Data Structures", before: 45, current: 70, delta: 25, verified: true },
      { skill: "Git", before: 65, current: 80, delta: 15, verified: true }
    ],
    readinessProgressHistory: {
      before: 61,
      current: 79,
      delta: 18,
      duration: "Past 60 days"
    }
  },

  "ML Engineer": {
    roleName: "ML Engineer",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    readinessScore: 76,
    scoreDelta: "+7% from last month",
    readinessStatus: "Approaching Readiness",
    readinessBreakdown: [
      { name: "Technical Skills", score: 84, desc: "Python, PyTorch, Model Optimization, Vector Databases" },
      { name: "Tools & Technologies", score: 72, desc: "Docker, Kubernetes, MLflow, ONNX, Weights&Biases" },
      { name: "Communication", score: 75, desc: "ML system documentation, latency & throughput benchmarking" },
      { name: "Projects", score: 74, desc: "LLM fine-tuning, RAG pipelines and API serving" },
      { name: "Certifications", score: 75, desc: "SkillBridge AI diagnostic assessment verified" }
    ],
    readinessSummary: "Exceptional Python and ML foundational logic. Bridging containerization (Docker/K8s) and MLOps deployment will push you over 88%.",
    skillGaps: [
      {
        id: "gap-mlops",
        name: "MLOps & Model Deployment",
        current: 55,
        required: 80,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Docker, FastAPI & Triton Inference Server",
        duration: "3 weeks",
        roadmapStepId: "step-mlops"
      },
      {
        id: "gap-rag",
        name: "LLM Pipelines & RAG",
        current: 65,
        required: 80,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "LangChain, LlamaIndex & Vector Database Embeddings",
        duration: "2 weeks",
        roadmapStepId: "step-rag"
      }
    ],
    roadmap: [
      {
        id: "step-ml-core",
        title: "Core Machine Learning Pipelines",
        skill: "ML Fundamentals",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "completed",
        progress: 100,
        desc: "Feature pipelines, cross-validation, model serializing and evaluation metrics.",
        reason: "Core foundation of reliable machine learning models."
      },
      {
        id: "step-mlops",
        title: "MLOps, Docker & Serving",
        skill: "Production MLOps",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 50,
        desc: "Containerizing ML models, serving endpoints with FastAPI, monitoring latency.",
        reason: "MLOps is your #1 priority gap (25% gap) for ML Engineer roles."
      },
      {
        id: "step-rag",
        title: "Retrieval-Augmented Generation (RAG)",
        skill: "LLM Engineering",
        duration: "3 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 15,
        desc: "Chunking strategies, semantic search with ChromaDB/Pinecone and reranking.",
        reason: "High-demand modern generative AI competency."
      }
    ],
    nextBestActions: [
      {
        id: "action-ml-1",
        title: "Take MLOps Diagnostic Assessment",
        category: "Skill Assessment",
        reason: "Evaluating containerization will validate production engineering ability.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      },
      {
        id: "action-ml-2",
        title: "Continue Docker & Model Serving",
        category: "Learning Roadmap",
        reason: "50% finished with FastAPI deployment module.",
        actionText: "Continue Learning",
        targetScreen: "roadmap",
        priority: "Recommended",
        priorityColor: "bg-blue-100 text-blue-700 border-blue-200"
      }
    ],
    opportunities: [
      {
        id: "opp-ml-1",
        role: "ML Research & Ops Intern",
        company: "InnovateAI Labs",
        location: "On-site (Bangalore)",
        duration: "6 Months",
        stipend: "₹40,000 / month",
        matchPercentage: 82,
        potentialMatchPercentage: 92,
        logoBg: "bg-rose-600 text-white",
        tags: ["Python", "PyTorch", "Docker", "FastAPI"],
        matchingSkills: [
          { skill: "Python", studentScore: 85, requiredScore: 80, status: "Met" },
          { skill: "PyTorch", studentScore: 72, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Docker & MLOps", studentScore: 55, requiredScore: 75, gap: 20, impact: "+10% match boost" }
        ],
        recommendation: "Complete the Docker serving module to increase match to 92%."
      }
    ],
    skillProgressHistory: [
      { skill: "Python", before: 68, current: 85, delta: 17, verified: true },
      { skill: "PyTorch", before: 50, current: 72, delta: 22, verified: true },
      { skill: "MLOps", before: 35, current: 55, delta: 20, verified: false }
    ],
    readinessProgressHistory: {
      before: 59,
      current: 76,
      delta: 17,
      duration: "Past 60 days"
    }
  },

  "Business Analyst": {
    roleName: "Business Analyst",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    readinessScore: 80,
    scoreDelta: "+4% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 78, desc: "Excel modeling, SQL queries, requirements documentation" },
      { name: "Tools & Technologies", score: 82, desc: "Jira, Confluence, Visio, Power BI" },
      { name: "Communication", score: 88, desc: "Stakeholder elicitation, BRD creation, presentations" },
      { name: "Projects", score: 76, desc: "Business process re-engineering and cost-benefit analysis" },
      { name: "Certifications", score: 78, desc: "SkillBridge Business Analysis assessment verified" }
    ],
    readinessSummary: "Strong presentation and process mapping fundamentals. Focus on advanced SQL aggregations and financial modeling.",
    skillGaps: [
      {
        id: "gap-brd",
        name: "Agile Epics & User Stories",
        current: 72,
        required: 85,
        gap: 13,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200",
        recommendedAction: "Writing Acceptance Criteria & Jira Sprint Management",
        duration: "2 weeks",
        roadmapStepId: "step-brd"
      }
    ],
    roadmap: [
      {
        id: "step-ba-fund",
        title: "Requirement Elicitation & Process Mapping",
        skill: "Business Process Mapping",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "BPMN diagrams, SWOT analysis and stakeholder interviews.",
        reason: "Core foundation of business systems analysis."
      },
      {
        id: "step-brd",
        title: "Agile User Stories & Product Backlog",
        skill: "Agile Methodologies",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 60,
        desc: "Epics, acceptance criteria, story estimation, Jira board administration.",
        reason: "Directly bridges your 13% agile documentation gap."
      }
    ],
    nextBestActions: [
      {
        id: "action-ba-1",
        title: "Complete Business Analyst Assessment",
        category: "Skill Assessment",
        reason: "Validate business process modeling competencies for enterprise recruiters.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-ba-1",
        role: "Business Analyst Intern",
        company: "TechCorp Global",
        location: "Hybrid (Mumbai)",
        duration: "3 Months",
        stipend: "₹24,000 / month",
        matchPercentage: 85,
        potentialMatchPercentage: 92,
        logoBg: "bg-amber-600 text-white",
        tags: ["Excel", "SQL", "Communication", "Agile"],
        matchingSkills: [
          { skill: "Excel", studentScore: 80, requiredScore: 70, status: "Met" },
          { skill: "Communication", studentScore: 88, requiredScore: 75, status: "Met" },
          { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" }
        ],
        missingSkills: [
          { skill: "Agile Documentation", studentScore: 70, requiredScore: 80, gap: 10, impact: "+7% match boost" }
        ],
        recommendation: "Complete sprint planning exercise to qualify."
      }
    ],
    skillProgressHistory: [
      { skill: "Communication", before: 72, current: 88, delta: 16, verified: true },
      { skill: "Excel Modeling", before: 62, current: 80, delta: 18, verified: true }
    ],
    readinessProgressHistory: {
      before: 66,
      current: 80,
      delta: 14,
      duration: "Past 60 days"
    }
  },

  "Cybersecurity Analyst": {
    roleName: "Cybersecurity Analyst",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    readinessScore: 72,
    scoreDelta: "+5% from last month",
    readinessStatus: "Approaching Readiness",
    readinessBreakdown: [
      { name: "Technical Skills", score: 75, desc: "Network protocols, Linux command line, Wireshark, Python" },
      { name: "Tools & Technologies", score: 70, desc: "Splunk, Nmap, Metasploit, Burp Suite, Snort" },
      { name: "Communication", score: 74, desc: "Incident reporting and compliance audit logs" },
      { name: "Projects", score: 70, desc: "Threat hunting lab and vulnerability penetration test report" },
      { name: "Certifications", score: 72, desc: "SkillBridge Cyber Defense diagnostic verified" }
    ],
    readinessSummary: "Solid network and operating systems foundation. Prioritize SIEM log parsing and SOC triage procedures.",
    skillGaps: [
      {
        id: "gap-siem",
        name: "SIEM & SOC Log Analysis",
        current: 55,
        required: 80,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Splunk Query Language & Security Incident Handling",
        duration: "3 weeks",
        roadmapStepId: "step-siem"
      }
    ],
    roadmap: [
      {
        id: "step-net-sec",
        title: "Network Security & Packet Inspection",
        skill: "Networking & Protocols",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "TCP/IP model, packet capture with Wireshark, port scanning and firewall rules.",
        reason: "Core foundation for investigating network anomalies."
      },
      {
        id: "step-siem",
        title: "SIEM Threat Hunting & Incident Response",
        skill: "SOC & Log Analysis",
        duration: "4 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 40,
        desc: "Configuring Splunk alerts, investigating brute force attacks and creating audit reports.",
        reason: "Highest-priority gap (25% gap) for entry-level SOC roles."
      }
    ],
    nextBestActions: [
      {
        id: "action-sec-1",
        title: "Complete Network Security Assessment",
        category: "Skill Assessment",
        reason: "Verify your Wireshark and network security proficiency.",
        actionText: "Start Assessment",
        targetScreen: "skill_assessment",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-sec-1",
        role: "SOC Analyst Intern",
        company: "SecureNet Defense",
        location: "Pune (On-site)",
        duration: "6 Months",
        stipend: "₹30,000 / month",
        matchPercentage: 78,
        potentialMatchPercentage: 90,
        logoBg: "bg-slate-800 text-white",
        tags: ["Networking", "Linux", "Splunk", "Python"],
        matchingSkills: [
          { skill: "Linux", studentScore: 78, requiredScore: 70, status: "Met" },
          { skill: "Networking", studentScore: 75, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "SIEM Analysis", studentScore: 55, requiredScore: 75, gap: 20, impact: "+12% match boost" }
        ],
        recommendation: "Finish the Splunk module to qualify for technical round."
      }
    ],
    skillProgressHistory: [
      { skill: "Linux", before: 55, current: 78, delta: 23, verified: true },
      { skill: "Networking", before: 60, current: 75, delta: 15, verified: true }
    ],
    readinessProgressHistory: {
      before: 56,
      current: 72,
      delta: 16,
      duration: "Past 60 days"
    }
  },

  "UI/UX Designer": {
    roleName: "UI/UX Designer",
    badgeColor: "bg-pink-50 text-pink-700 border-pink-200",
    readinessScore: 78,
    scoreDelta: "+6% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 80, desc: "Visual design, typography, spacing systems, layout grids" },
      { name: "Tools & Technologies", score: 84, desc: "Figma, FigJam, Adobe XD, Design Systems" },
      { name: "Communication", score: 82, desc: "Design rationale critique, user interview moderation" },
      { name: "Projects", score: 75, desc: "2 published case studies on Behance/Figma community" },
      { name: "Certifications", score: 70, desc: "SkillBridge UX Design diagnostic verified" }
    ],
    readinessSummary: "Strong Figma wireframing and prototyping capabilities. Bridge usability testing and micro-interactions to reach 90%.",
    skillGaps: [
      {
        id: "gap-ux-research",
        name: "Usability Testing & User Research",
        current: 60,
        required: 80,
        gap: 20,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Heuristic Evaluations & Quantitative Usability Tests",
        duration: "2 weeks",
        roadmapStepId: "step-ux-research"
      }
    ],
    roadmap: [
      {
        id: "step-figma-mastery",
        title: "Figma Auto-Layout & Design Tokens",
        skill: "Visual UI Design",
        duration: "2 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Component variants, auto-layout, interactive prototypes and responsive grids.",
        reason: "Industry standard tool for high-fidelity UI creation."
      },
      {
        id: "step-ux-research",
        title: "User Research & Usability Testing",
        skill: "UX Research",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 45,
        desc: "Conducting think-aloud tests, affinity mapping, wireframe validation.",
        reason: "Highest-priority gap (20% gap) for UI/UX product roles."
      }
    ],
    nextBestActions: [
      {
        id: "action-ux-1",
        title: "Publish Case Study Usability Test",
        category: "Portfolio Project",
        reason: "Validates empirical user research for hiring managers.",
        actionText: "Open Figma Project",
        targetScreen: "roadmap",
        priority: "High Priority",
        priorityColor: "bg-pink-100 text-pink-700 border-pink-200"
      }
    ],
    opportunities: [
      {
        id: "opp-ux-1",
        role: "Product Design Intern",
        company: "CraftedUX Studio",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹25,000 / month",
        matchPercentage: 82,
        potentialMatchPercentage: 92,
        logoBg: "bg-pink-600 text-white",
        tags: ["Figma", "User Research", "Prototyping", "Design Systems"],
        matchingSkills: [
          { skill: "Figma", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Visual Design", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "User Research", studentScore: 60, requiredScore: 75, gap: 15, impact: "+10% match boost" }
        ],
        recommendation: "Add usability test evidence to your portfolio to unlock 92% match."
      }
    ],
    skillProgressHistory: [
      { skill: "Figma", before: 62, current: 85, delta: 23, verified: true },
      { skill: "Visual Design", before: 60, current: 80, delta: 20, verified: true }
    ],
    readinessProgressHistory: {
      before: 62,
      current: 78,
      delta: 16,
      duration: "Past 60 days"
    }
  },
  "Embedded Systems Engineer": {
    roleName: "Embedded Systems Engineer",
    badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    readinessScore: 78,
    scoreDelta: "+6% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 82, desc: "Embedded C, ARM Cortex Microcontrollers & RTOS" },
      { name: "Hardware & Protocols", score: 76, desc: "UART, SPI, I2C, CAN Bus & Logic Analyzers" },
      { name: "Firmware Development", score: 80, desc: "Device drivers, timers, interrupts & low power modes" },
      { name: "Hardware Projects", score: 74, desc: "IoT sensor node & brushless motor control firmware" },
      { name: "Certifications", score: 80, desc: "Verified Texas Instruments & NPTEL certifications" }
    ],
    readinessSummary: "Strong firmware fundamentals in Embedded C. Mastering FreeRTOS task scheduling will boost readiness to 88%.",
    skillGaps: [
      {
        id: "gap-rtos",
        name: "FreeRTOS & Multi-threading",
        current: 50,
        required: 75,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Real-Time Operating Systems for Embedded Systems",
        duration: "3 weeks",
        roadmapStepId: "step-rtos"
      },
      {
        id: "gap-pcb",
        name: "KiCAD & High-Speed PCB Design",
        current: 55,
        required: 70,
        gap: 15,
        priority: "MEDIUM",
        status: "In Progress",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200",
        recommendedAction: "Schematic Capture & PCB Layout Essentials",
        duration: "2 weeks",
        roadmapStepId: "step-pcb"
      }
    ],
    nextBestActions: [
      {
        id: "action-ece-1",
        title: "Complete FreeRTOS Queue & Semaphore Module",
        category: "Learning Roadmap",
        reason: "Highest-priority gap (25% gap) required for automotive and IoT firmware roles.",
        actionText: "Open RTOS Module",
        targetScreen: "roadmap",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-ece-1",
        category: "Internship",
        role: "Embedded Firmware Intern",
        company: "Texas Instruments Partner Labs",
        location: "Bangalore",
        duration: "6 Months",
        stipend: "₹35,000 / month",
        experience: "Students / Pre-Final Year",
        source: "LinkedIn",
        deadline: "20 Oct 2026",
        matchPercentage: 86,
        potentialMatchPercentage: 94,
        logoBg: "bg-red-600 text-white",
        tags: ["Embedded C", "ARM Cortex", "UART", "FreeRTOS"],
        matchingSkills: [
          { skill: "Embedded C", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Microcontrollers", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "FreeRTOS", studentScore: 50, requiredScore: 75, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Complete FreeRTOS task scheduling module to unlock 94% match."
      },
      {
        id: "opp-ece-2",
        category: "Job",
        role: "Junior IoT Systems Engineer",
        company: "Bosch Mobility Solutions",
        location: "Coimbatore / Hybrid",
        duration: "Full-Time",
        stipend: "₹5.5 – 7.2 LPA",
        experience: "0–1 Years",
        source: "Naukri",
        deadline: "12 Nov 2026",
        matchPercentage: 80,
        potentialMatchPercentage: 89,
        logoBg: "bg-blue-700 text-white",
        tags: ["CAN Bus", "STM32", "C++", "Sensors"],
        matchingSkills: [
          { skill: "C Programming", studentScore: 85, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "CAN Protocol", studentScore: 45, requiredScore: 70, gap: 25, impact: "+9% match boost" }
        ],
        recommendation: "Review Automotive CAN Bus communication standard."
      }
    ],
    skillProgressHistory: [
      { skill: "Embedded C", before: 65, current: 85, delta: 20, verified: true },
      { skill: "ARM Architecture", before: 50, current: 75, delta: 25, verified: true }
    ],
    readinessProgressHistory: { before: 58, current: 78, delta: 20, duration: "Past 60 days" }
  },
  "Power Systems Engineer": {
    roleName: "Power Systems Engineer",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    readinessScore: 76,
    scoreDelta: "+4% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 80, desc: "Circuit theory, electrical machines & power transmission" },
      { name: "Simulation & Tools", score: 72, desc: "MATLAB/Simulink, PSCAD, ETAP grid analysis" },
      { name: "Power Electronics", score: 78, desc: "Inverters, converters & renewable energy integration" },
      { name: "Projects", score: 74, desc: "Solar microgrid power distribution simulation" },
      { name: "Certifications", score: 76, desc: "Verified NPTEL & SWAYAM Power Systems credentials" }
    ],
    readinessSummary: "Strong circuit and electrical machinery foundation. Mastering MATLAB/Simulink grid transient modeling boosts readiness to 86%.",
    skillGaps: [
      {
        id: "gap-matlab",
        name: "MATLAB/Simulink Grid Modeling",
        current: 48,
        required: 75,
        gap: 27,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Simulink for Renewable Power System Dynamics",
        duration: "3 weeks",
        roadmapStepId: "step-matlab"
      }
    ],
    nextBestActions: [
      {
        id: "action-eee-1",
        title: "Complete Simulink Grid Stabilization Lab",
        category: "Learning Roadmap",
        reason: "Critical skill gap for smart grid and renewable transmission engineering.",
        actionText: "Open Simulink Lab",
        targetScreen: "roadmap",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-eee-1",
        category: "Internship",
        role: "Smart Grid Analytics Intern",
        company: "Schneider Electric Innovation Hub",
        location: "Bangalore",
        duration: "6 Months",
        stipend: "₹30,000 / month",
        experience: "Students / Recent Graduates",
        source: "LinkedIn",
        deadline: "25 Oct 2026",
        matchPercentage: 82,
        potentialMatchPercentage: 91,
        logoBg: "bg-emerald-600 text-white",
        tags: ["Power Systems", "MATLAB", "Microgrids", "SCADA"],
        matchingSkills: [
          { skill: "Power Systems", studentScore: 80, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "MATLAB/Simulink", studentScore: 48, requiredScore: 75, gap: 27, impact: "+9% match boost" }
        ],
        recommendation: "Complete renewable grid modeling lab to qualify."
      }
    ],
    skillProgressHistory: [
      { skill: "Circuit Analysis", before: 60, current: 80, delta: 20, verified: true },
      { skill: "Electrical Machines", before: 55, current: 78, delta: 23, verified: true }
    ],
    readinessProgressHistory: { before: 56, current: 76, delta: 20, duration: "Past 60 days" }
  },
  "Mechanical Design Engineer": {
    roleName: "Mechanical Design Engineer",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    readinessScore: 79,
    scoreDelta: "+5% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 84, desc: "Engineering mechanics, thermodynamics & GD&T" },
      { name: "CAD/CAM Tools", score: 80, desc: "SolidWorks, Autodesk Fusion 360 & Siemens NX" },
      { name: "FEA Simulation", score: 70, desc: "ANSYS structural & thermal stress simulation" },
      { name: "Manufacturing Projects", score: 78, desc: "CNC fabrication & 3D printed mechanical assembly" },
      { name: "Certifications", score: 82, desc: "Verified CSWA / Autodesk certified user credentials" }
    ],
    readinessSummary: "Proficient in 3D CAD modeling and GD&T drafting. Strengthening FEA stress analysis pushes readiness to 88%.",
    skillGaps: [
      {
        id: "gap-ansys",
        name: "ANSYS Finite Element Analysis (FEA)",
        current: 50,
        required: 75,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "Structural & Fatigue Analysis with ANSYS Workbench",
        duration: "3 weeks",
        roadmapStepId: "step-ansys"
      }
    ],
    nextBestActions: [
      {
        id: "action-mech-1",
        title: "Complete ANSYS Meshing & Stress Concentration Project",
        category: "Learning Roadmap",
        reason: "Required for aerospace and automotive mechanical design interviews.",
        actionText: "Open FEA Project",
        targetScreen: "roadmap",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-mech-1",
        category: "Internship",
        role: "Product Design Engineering Intern",
        company: "Tata Technologies",
        location: "Pune",
        duration: "6 Months",
        stipend: "₹28,000 / month",
        experience: "Mechanical Undergraduates",
        source: "LinkedIn",
        deadline: "18 Oct 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 93,
        logoBg: "bg-blue-600 text-white",
        tags: ["SolidWorks", "GD&T", "Sheet Metal", "FEA"],
        matchingSkills: [
          { skill: "SolidWorks", studentScore: 82, requiredScore: 70, status: "Met" },
          { skill: "GD&T", studentScore: 78, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "ANSYS FEA", studentScore: 50, requiredScore: 75, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Submit FEA case study analysis to boost match to 93%."
      }
    ],
    skillProgressHistory: [
      { skill: "SolidWorks 3D", before: 62, current: 84, delta: 22, verified: true },
      { skill: "GD&T Standards", before: 52, current: 78, delta: 26, verified: true }
    ],
    readinessProgressHistory: { before: 59, current: 79, delta: 20, duration: "Past 60 days" }
  },
  "BIM & Structural Engineer": {
    roleName: "BIM & Structural Engineer",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-300",
    readinessScore: 75,
    scoreDelta: "+5% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Technical Skills", score: 80, desc: "Structural analysis, RCC design & IS code standards" },
      { name: "BIM & CAD Tools", score: 76, desc: "Autodesk Revit, AutoCAD Civil 3D & Navisworks" },
      { name: "Structural Design Tools", score: 68, desc: "STAAD.Pro & ETABS building seismic analysis" },
      { name: "Infrastructure Projects", score: 74, desc: "Multi-story residential RCC frame design & estimation" },
      { name: "Certifications", score: 78, desc: "Autodesk Revit Certified User & NPTEL Structural Analysis" }
    ],
    readinessSummary: "Solid understanding of structural drafting in Revit. Deepening STAAD.Pro seismic frame modeling brings readiness to 86%.",
    skillGaps: [
      {
        id: "gap-staad",
        name: "STAAD.Pro Seismic & Wind Load Analysis",
        current: 46,
        required: 75,
        gap: 29,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200",
        recommendedAction: "STAAD.Pro Multi-Story Building Design under IS 1893",
        duration: "3 weeks",
        roadmapStepId: "step-staad"
      }
    ],
    nextBestActions: [
      {
        id: "action-civ-1",
        title: "Complete STAAD.Pro 5-Story RCC Frame Analysis",
        category: "Learning Roadmap",
        reason: "Key qualification requirement for structural consultancy design roles.",
        actionText: "Open STAAD Lab",
        targetScreen: "roadmap",
        priority: "High Priority",
        priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
      }
    ],
    opportunities: [
      {
        id: "opp-civ-1",
        category: "Internship",
        role: "BIM Modeling Intern",
        company: "L&T Construction Technology Center",
        location: "Chennai",
        duration: "6 Months",
        stipend: "₹26,000 / month",
        experience: "Civil Undergraduates",
        source: "LinkedIn",
        deadline: "28 Oct 2026",
        matchPercentage: 81,
        potentialMatchPercentage: 90,
        logoBg: "bg-yellow-600 text-white",
        tags: ["Revit", "BIM", "AutoCAD", "Navisworks"],
        matchingSkills: [
          { skill: "Autodesk Revit", studentScore: 80, requiredScore: 70, status: "Met" },
          { skill: "AutoCAD", studentScore: 82, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "STAAD.Pro", studentScore: 46, requiredScore: 75, gap: 29, impact: "+9% match boost" }
        ],
        recommendation: "Submit structural BIM clash detection portfolio piece."
      }
    ],
    skillProgressHistory: [
      { skill: "AutoCAD Civil", before: 65, current: 82, delta: 17, verified: true },
      { skill: "Revit Modeling", before: 55, current: 80, delta: 25, verified: true }
    ],
    readinessProgressHistory: { before: 55, current: 75, delta: 20, duration: "Past 60 days" }
  }
};

// AI Knowledge Base responses based on student context
export const getAIContextualResponse = (prompt, roleName, careerData) => {
  const p = prompt.toLowerCase();

  if (p.includes("what should i learn next") || p.includes("learn next")) {
    const topGap = careerData.skillGaps[0];
    const secondGap = careerData.skillGaps[1] || careerData.skillGaps[0];
    return {
      text: `Based on your **${roleName}** career goal, your highest-priority gaps are **${topGap.name}** (${topGap.gap}% gap) and **${secondGap.name}** (${secondGap.gap}% gap).\n\nRecommended order:\n1. **${topGap.recommendedAction}** (${topGap.duration})\n2. **${secondGap.recommendedAction}** (${secondGap.duration})\n3. Capstone Analytics Project\n\nCompleting these modules will improve your industry readiness from **${careerData.readinessScore}%** to **${careerData.readinessScore + 10}%**.`,
      actionText: "View Learning Roadmap",
      actionTarget: "roadmap"
    };
  }

  if (p.includes("why is my readiness score") || p.includes("readiness score")) {
    const breakdownList = careerData.readinessBreakdown.map(b => `• **${b.name}**: ${b.score}% (${b.desc})`).join("\n");
    return {
      text: `Your overall **${careerData.readinessScore}% Industry Readiness** for **${roleName}** is computed from 5 weighted pillars:\n\n${breakdownList}\n\n${careerData.readinessSummary}`,
      actionText: "View Skill Gap Analysis",
      actionTarget: "skill_gap"
    };
  }

  if (p.includes("improve my") && p.includes("match")) {
    const opp = careerData.opportunities[0];
    const missing = opp?.missingSkills[0];
    return {
      text: `Your current match for **${opp?.role}** at **${opp?.company}** is **${opp?.matchPercentage}%**.\n\nTo raise it to **${opp?.potentialMatchPercentage}%**, close the gap in **${missing?.skill}** (current: ${missing?.studentScore}%, required: ${missing?.requiredScore}%). ${opp?.recommendation}`,
      actionText: "Explore Opportunities",
      actionTarget: "opportunities"
    };
  }

  if (p.includes("what skills am i missing") || p.includes("skills am i missing") || p.includes("missing")) {
    const gapList = careerData.skillGaps.filter(g => g.gap > 0).map(g => `• **${g.name}**: Current ${g.current}%, Required ${g.required}% (-${g.gap}% gap, Priority: ${g.priority})`).join("\n");
    return {
      text: `For your target role **${roleName}**, you currently have **${careerData.skillGaps.filter(g => g.gap > 0).length} priority skill gaps**:\n\n${gapList}\n\nAll recommended learning modules have been queued into your Career Roadmap.`,
      actionText: "Review My Skills",
      actionTarget: "my_skills"
    };
  }

  if (p.includes("which internship") || p.includes("internship should i apply")) {
    const opp = careerData.opportunities[0];
    return {
      text: `We recommend applying for **${opp?.role}** at **${opp?.company}** (${opp?.location}).\n\n• **Match Score**: ${opp?.matchPercentage}%\n• **Stipend**: ${opp?.stipend}\n• **Why you match**: Your verified ${opp?.matchingSkills.map(s => s.skill).join(", ")} competency exceeds hiring thresholds.\n• **Potential**: Finishes at ${opp?.potentialMatchPercentage}% once your roadmap module is completed.`,
      actionText: "View Internship Details",
      actionTarget: "opportunities"
    };
  }

  // Generic intelligent fallback
  return {
    text: `As your SkillBridge career guide for **${roleName}**, I recommend focusing on closing your **${careerData.skillGaps[0]?.name}** gap first. You are currently **${careerData.readinessScore}% industry ready**, which makes you a strong candidate for ${careerData.opportunities.length} open opportunities!`,
    actionText: "Go to Dashboard",
    actionTarget: "student_dashboard"
  };
};
