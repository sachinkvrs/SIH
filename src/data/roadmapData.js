// src/data/roadmapData.js
// Centralized Roadmap and Learning Resource Data for SkillBridge

export const ROADMAP_MODULES = [
  {
    id: "sql-fundamentals",
    title: "SQL Fundamentals",
    category: "Data Analytics",
    duration: "2 weeks",
    difficulty: "Beginner",
    skills: ["SQL", "Relational Databases", "Data Filtering", "Table Joins"],
    provider: "GeeksforGeeks & IBM SkillsBuild",
    prerequisiteId: null,
    reason: "Foundational prerequisite required to query enterprise relational databases.",
    description: "Master database schemas, structured query language, SELECT filters, multi-table JOIN operations, GROUP BY, and data aggregations.",
    learningObjectives: [
      "Understand relational database structure, primary keys, and foreign keys.",
      "Write multi-table INNER, LEFT, RIGHT, and FULL OUTER JOINs.",
      "Aggregate metrics using COUNT, SUM, AVG, MIN, MAX with GROUP BY and HAVING clauses.",
      "Filter complex queries using WHERE, LIKE, IN, BETWEEN, and CASE WHEN statements."
    ],
    resources: {
      learn: [
        {
          id: "res-sql-gfg",
          title: "SQL Tutorial for Beginners — Complete Guide",
          provider: "GeeksforGeeks",
          type: "Article / Documentation",
          time: "45 min read",
          difficulty: "Beginner",
          url: "https://www.geeksforgeeks.org/sql-tutorial/",
          description: "Comprehensive step-by-step documentation covering SQL syntax, DDL, DML, and relational operators."
        },
        {
          id: "res-sql-ibm",
          title: "Relational Database & SQL Essentials",
          provider: "IBM SkillsBuild",
          type: "Course / Interactive Lab",
          time: "3 hours",
          difficulty: "Beginner",
          url: "https://skillsbuild.org/",
          description: "Hands-on guided module on DB2 and cloud relational database administration."
        },
        {
          id: "res-sql-ms",
          title: "Query Data with Transact-SQL",
          provider: "Microsoft Learn",
          type: "Learning Path",
          time: "2.5 hours",
          difficulty: "Beginner",
          url: "https://learn.microsoft.com/en-us/training/paths/query-data-transact-sql/",
          description: "Official Microsoft Learn modules on sorting, filtering, and joining tables in SQL Server."
        }
      ],
      practice: [
        {
          id: "prac-sql-basic",
          title: "Basic Select and Join Queries Practice",
          provider: "HackerRank & LeetCode SQL",
          type: "Coding Practice",
          problemsCount: 15,
          time: "2 hours",
          url: "https://www.hackerrank.com/domains/sql",
          description: "Solve 15 essential query problems involving multi-table joins and aggregations."
        },
        {
          id: "prac-sql-kaggle",
          title: "Intro to SQL: Interactive BigQuery Exercises",
          provider: "Kaggle Learn",
          type: "Interactive Notebook",
          time: "90 min",
          url: "https://www.kaggle.com/learn/intro-to-sql",
          description: "Hands-on SQL practice with real-world public open datasets."
        }
      ],
      build: [
        {
          id: "proj-sql-basic",
          title: "Basic Sales Database Analysis",
          type: "Guided Mini Project",
          time: "4–6 hours",
          description: "Design a relational schema for an e-commerce store with Customer, Orders, and Products tables. Write analytical queries to identify top-spending customers, monthly revenue trends, and inventory levels.",
          deliverables: ["SQL Schema script (.sql)", "Analytical queries with business insights", "Summary markdown report"]
        }
      ],
      assess: [
        {
          id: "quiz-sql-fund",
          title: "SQL Fundamentals Diagnostic Quiz",
          questionsCount: 15,
          passingScore: "75%",
          time: "25 min",
          description: "Proctored SkillBridge check covering joins, groupings, and order of query execution."
        }
      ]
    }
  },

  {
    id: "advanced-sql",
    title: "Advanced SQL",
    category: "Data Analytics",
    duration: "3 weeks",
    difficulty: "Intermediate",
    skills: ["Window Functions", "CTEs", "Subqueries", "Indexing", "Query Optimization"],
    provider: "GeeksforGeeks & Microsoft Learn",
    prerequisiteId: "sql-fundamentals",
    reason: "SQL is currently your highest-priority skill gap (15% gap) for the Data Analyst role.",
    description: "Master analytical window functions (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG), Common Table Expressions (CTEs), execution plans, B-tree indexing, and query tuning for enterprise scale.",
    learningObjectives: [
      "Implement partitioned window functions for rolling averages and running totals.",
      "Construct recursive and multi-step Common Table Expressions (CTEs) for clean modular logic.",
      "Analyze query execution plans and create optimal indexes to prevent full table scans.",
      "Write stored procedures, views, and parameterized triggers."
    ],
    resources: {
      learn: [
        {
          id: "res-adv-gfg",
          title: "Advanced SQL Queries & Window Functions",
          provider: "GeeksforGeeks",
          type: "Article / Documentation",
          time: "1 hour read",
          difficulty: "Intermediate",
          url: "https://www.geeksforgeeks.org/sql-window-function/",
          description: "Detailed code examples of ROW_NUMBER(), NTILE(), LEAD/LAG, and framing clauses."
        },
        {
          id: "res-adv-ms",
          title: "Optimize Query Performance in Azure SQL / SQL Server",
          provider: "Microsoft Learn",
          type: "Learning Path",
          time: "3.5 hours",
          difficulty: "Intermediate",
          url: "https://learn.microsoft.com/en-us/training/modules/optimize-query-performance-sql-server/",
          description: "Index architecture, statistics, fragmentation, and execution plan bottleneck diagnosis."
        },
        {
          id: "res-adv-ibm",
          title: "Advanced Data Manipulation Techniques",
          provider: "IBM SkillsBuild",
          type: "Interactive Lab",
          time: "2 hours",
          difficulty: "Intermediate",
          url: "https://skillsbuild.org/",
          description: "Working with nested queries, temporary tables, and stored functions."
        }
      ],
      practice: [
        {
          id: "prac-adv-sql",
          title: "Advanced SQL Window Function & CTE Challenges",
          provider: "LeetCode & Mode Analytics",
          type: "Coding Practice",
          problemsCount: 12,
          time: "3 hours",
          url: "https://leetcode.com/problemset/database/",
          description: "Tackle medium and hard database challenges testing salary percentiles, consecutive logins, and active user retention."
        },
        {
          id: "prac-adv-kaggle",
          title: "Advanced SQL on Kaggle BigQuery",
          provider: "Kaggle Learn",
          type: "Interactive Notebook",
          time: "2 hours",
          url: "https://www.kaggle.com/learn/advanced-sql",
          description: "Practice analytic functions and join optimization on real GitHub archive datasets."
        }
      ],
      build: [
        {
          id: "proj-adv-ecommerce",
          title: "E-Commerce Customer Retention & Cohort Analytics",
          type: "Mini Project",
          time: "6–8 hours",
          description: "Write SQL scripts using Window Functions and CTEs on an e-commerce transactions dataset to calculate monthly customer retention cohorts, churn velocity, and lifetime customer value (LTV).",
          deliverables: ["Cohort analysis SQL script", "Query execution plan comparison before/after indexing", "Executive summary presentation"]
        }
      ],
      assess: [
        {
          id: "quiz-adv-sql",
          title: "Advanced SQL Diagnostic Assessment",
          questionsCount: 20,
          passingScore: "80%",
          time: "30 min",
          description: "Evaluates your proficiency in CTEs, complex subqueries, and window partition indexing."
        }
      ]
    }
  },

  {
    id: "power-bi",
    title: "Power BI Fundamentals & DAX",
    category: "Business Intelligence",
    duration: "4 weeks",
    difficulty: "Intermediate",
    skills: ["Power BI", "DAX", "Data Modeling", "Power Query", "Interactive Dashboards"],
    provider: "Microsoft Learn",
    prerequisiteId: "advanced-sql",
    reason: "Required by 88% of Data Analyst employers to transform raw queries into executive dashboards.",
    description: "Learn automated ETL in Power Query, dimensional Star-schema data modeling, Data Analysis Expressions (DAX) measures, drill-through reports, and role-based access control.",
    learningObjectives: [
      "Import, cleanse, and transform unstructured datasets using Power Query M language.",
      "Design Star and Snowflake dimensional models with active and inactive relationships.",
      "Write advanced DAX measures utilizing CALCULATE, FILTER, ALL, and time intelligence functions.",
      "Publish interactive cloud dashboards with dynamic slicers, KPIs, and drill-through pages."
    ],
    resources: {
      learn: [
        {
          id: "res-pbi-ms-1",
          title: "Get Started with Microsoft Power BI",
          provider: "Microsoft Learn",
          type: "Official Learning Path",
          time: "4 hours",
          difficulty: "Beginner to Intermediate",
          url: "https://learn.microsoft.com/en-us/training/paths/get-started-power-bi/",
          description: "Official PL-300 curriculum covering desktop fundamentals, data cleaning, and visualization components."
        },
        {
          id: "res-pbi-dax-ms",
          title: "Create Measures by Using DAX in Power BI",
          provider: "Microsoft Learn",
          type: "Interactive Module",
          time: "3.5 hours",
          difficulty: "Intermediate",
          url: "https://learn.microsoft.com/en-us/training/modules/dax-power-bi-create-measures/",
          description: "Learn evaluation context, row vs filter context, and time-intelligence aggregations (YTD, MTD, YoY growth)."
        },
        {
          id: "res-pbi-gfg",
          title: "Power BI Architecture and Data Modeling",
          provider: "GeeksforGeeks",
          type: "Documentation",
          time: "40 min read",
          difficulty: "Intermediate",
          url: "https://www.geeksforgeeks.org/power-bi-tutorial/",
          description: "Visual explanation of cardinality (1-to-many, many-to-many) and cross-filter directions."
        }
      ],
      practice: [
        {
          id: "prac-pbi-lab",
          title: "Hands-on Power BI Desktop Lab Exercises",
          provider: "Microsoft Learn Labs",
          type: "Virtual Sandbox",
          time: "3 hours",
          url: "https://learn.microsoft.com/en-us/training/paths/model-power-bi/",
          description: "Connect to live CSV and SQL sources to build custom calendar tables and DAX measures."
        }
      ],
      build: [
        {
          id: "proj-pbi-sales",
          title: "Executive Sales & Operational Performance Dashboard",
          type: "Capstone Mini Project",
          time: "8–10 hours",
          description: "Construct a multi-page interactive Power BI dashboard tracking revenue, product margin, regional territory performance, and quarterly growth using custom DAX KPIs.",
          deliverables: ["Published Power BI (.pbix) file", "Data model diagram screenshot", "Loom / video demo walkthrough"]
        }
      ],
      assess: [
        {
          id: "quiz-pbi-check",
          title: "Power BI & DAX Competency Check",
          questionsCount: 15,
          passingScore: "75%",
          time: "20 min",
          description: "Tests understanding of DAX calculate filters, relationship directions, and data transformation."
        }
      ]
    }
  },

  {
    id: "data-analytics-project",
    title: "End-to-End Analytics Capstone Project",
    category: "Portfolio Projects",
    duration: "4 weeks",
    difficulty: "Advanced",
    skills: ["Python", "SQL", "Data Cleaning", "Data Visualization", "Executive Presentation"],
    provider: "Kaggle & IBM SkillsBuild",
    prerequisiteId: "power-bi",
    reason: "Provides tangible GitHub portfolio proof to showcase to recruiter hiring managers.",
    description: "Conduct an end-to-end data analytics study on an enterprise dataset: ingest raw records, clean data via Python Pandas, run complex SQL aggregations, build executive dashboards, and extract commercial recommendations.",
    learningObjectives: [
      "Select and scope a business problem with well-defined metrics.",
      "Perform automated Exploratory Data Analysis (EDA) and data cleansing.",
      "Generate actionable business insights backed by quantitative significance.",
      "Document project in a public GitHub repository with reproducible code and findings."
    ],
    resources: {
      learn: [
        {
          id: "res-cap-kaggle",
          title: "Finding and Working with Open Business Datasets",
          provider: "Kaggle",
          type: "Dataset Hub & Kernels",
          time: "1.5 hours",
          difficulty: "Intermediate",
          url: "https://www.kaggle.com/datasets",
          description: "Browse curated industry datasets (retail, fintech, healthcare, SaaS customer logs)."
        },
        {
          id: "res-cap-ibm",
          title: "Data Storytelling & Executive Presentations",
          provider: "IBM SkillsBuild",
          type: "Guided Course",
          time: "2 hours",
          difficulty: "Intermediate",
          url: "https://skillsbuild.org/",
          description: "How to translate data charts into business strategy recommendations for executives."
        }
      ],
      practice: [
        {
          id: "prac-cap-stages",
          title: "6-Stage Guided Project Methodology",
          provider: "SkillBridge Project Lab",
          type: "Workflow Guide",
          time: "Self-paced",
          description: "Follow the 6 stages: 1. Dataset Selection → 2. Cleaning → 3. SQL Queries → 4. Visualizations → 5. Key Insights → 6. Final Slide Deck."
        }
      ],
      build: [
        {
          id: "proj-cap-final",
          title: "Complete End-to-End Analytics Portfolio Project",
          type: "Portfolio Capstone",
          time: "15–20 hours",
          description: "Submit a complete GitHub repository containing clean Jupyter notebooks, SQL scripts, interactive dashboard links, and an executive PDF presentation.",
          deliverables: ["GitHub Repository URL", "Interactive Dashboard URL (Power BI / Streamlit)", "Executive summary slide deck (PDF)"]
        }
      ],
      assess: [
        {
          id: "quiz-cap-review",
          title: "Peer & Mentor Portfolio Evaluation",
          questionsCount: 1,
          passingScore: "Approved",
          time: "1 day review",
          description: "SkillBridge partner mentors evaluate code quality, analytical depth, and business presentation."
        }
      ]
    }
  },

  {
    id: "industry-assessment",
    title: "Industry Assessment & Interview Readiness",
    category: "Assessment & Certification",
    duration: "1 week",
    difficulty: "Assessment",
    skills: ["Technical Interviewing", "SQL Live Coding", "Aptitude", "Business Case Studies"],
    provider: "SkillBridge & Industry Partners",
    prerequisiteId: "data-analytics-project",
    reason: "Final proctored verification required to fast-track candidates to partner hiring rounds.",
    description: "Prepare for and take the comprehensive proctored Industry Readiness Assessment evaluated by partner recruiters. Includes live coding tests, behavioral scenarios, and resume review.",
    learningObjectives: [
      "Clear proctored multi-choice and live query assessments with 80%+ benchmark.",
      "Articulate technical decisions and trade-offs during live interview case studies.",
      "Validate verified credential tags for your Digital Skill Passport."
    ],
    resources: {
      learn: [
        {
          id: "res-prep-nptel",
          title: "Effective Technical Communication & Interview Skills",
          provider: "NPTEL / SWAYAM",
          type: "Video Lectures",
          time: "3 hours",
          difficulty: "Intermediate",
          url: "https://swayam.gov.in/",
          description: "Premier academic lecture series on technical communication and workplace interviews."
        },
        {
          id: "res-prep-gfg",
          title: "Data Analyst Interview Questions & Solutions",
          provider: "GeeksforGeeks",
          type: "Interview Guide",
          time: "2 hours",
          difficulty: "Intermediate",
          url: "https://www.geeksforgeeks.org/data-analyst-interview-questions/",
          description: "Top 50 frequently asked SQL, statistics, and business problem-solving questions."
        }
      ],
      practice: [
        {
          id: "prac-mock-interview",
          title: "Mock Technical Interview Sandbox",
          provider: "SkillBridge Practice Arena",
          type: "Timed Test",
          time: "45 min",
          description: "Simulate a live 45-minute technical screen with 3 query problems and 1 business scenario."
        }
      ],
      build: [
        {
          id: "proj-resume-prep",
          title: "ATS-Optimized Verified Resume & Portfolio Audit",
          type: "Career Deliverable",
          time: "2 hours",
          description: "Generate verified credential link from your Digital Skill Passport and attach to your ATS resume.",
          deliverables: ["Updated 1-page ATS Resume", "Digital Skill Passport Verification Link"]
        }
      ],
      assess: [
        {
          id: "quiz-final-assessment",
          title: "Official Proctored Industry Assessment",
          questionsCount: 35,
          passingScore: "80%",
          time: "60 min",
          description: "Official credential assessment evaluated across SQL, statistics, business logic, and visualization."
        }
      ]
    }
  },

  {
    id: "internship-ready",
    title: "Internship Ready",
    category: "Milestone Target",
    duration: "Target Achieved",
    difficulty: "Milestone",
    skills: ["Direct Hiring Fast-Track", "Verified Candidate Pool", "Employer Referrals"],
    provider: "SkillBridge Placement Cell",
    prerequisiteId: "industry-assessment",
    reason: "Achieved once all prerequisite courses, capstone projects, and proctored assessments are completed.",
    description: "Congratulations! You have completed all validated milestones on your roadmap. Your verified Digital Skill Passport is active, boosting your candidacy to 90%+ match across partner employer job postings.",
    learningObjectives: [
      "Access high-affinity recruiter direct application queues.",
      "Share cryptographically verifiable Digital Skill Passport with employers.",
      "Fast-track through Round 1 resume screening."
    ],
    resources: {
      learn: [],
      practice: [],
      build: [],
      assess: []
    }
  }
];

// Academic Domain Resource Recommendations
export const ACADEMIC_DOMAINS_DATA = {
  "cs_it": {
    domainName: "Computer Science & IT",
    providers: ["IBM SkillsBuild", "GeeksforGeeks", "Microsoft Learn", "Kaggle", "NPTEL", "SWAYAM"],
    paths: [
      { name: "Data Analytics & BI", topSkills: ["Python", "SQL", "Power BI", "Statistics"] },
      { name: "Full-Stack Web Engineering", topSkills: ["JavaScript", "React", "Node.js", "Docker"] },
      { name: "AI & Machine Learning", topSkills: ["Python", "PyTorch", "Scikit-Learn", "FastAPI"] },
      { name: "Cloud & DevOps", topSkills: ["Linux", "AWS / Azure", "Kubernetes", "Git"] }
    ]
  },
  "ece": {
    domainName: "Electronics & Communication Engineering (ECE)",
    providers: ["NPTEL", "SWAYAM", "Texas Instruments", "All About Circuits", "MathWorks"],
    paths: [
      {
        name: "Embedded Systems & IoT",
        topSkills: ["Digital Electronics", "Microcontrollers", "Embedded C", "IoT Protocols", "PCB Design"],
        sampleProject: "ESP32-based IoT Environmental Monitoring System"
      }
    ]
  },
  "eee": {
    domainName: "Electrical & Electronics Engineering (EEE)",
    providers: ["NPTEL", "SWAYAM", "MathWorks", "All About Circuits"],
    paths: [
      {
        name: "Power Systems & Renewable Energy",
        topSkills: ["Circuit Analysis", "Electrical Machines", "Power Electronics", "MATLAB / Simulink"],
        sampleProject: "Solar Energy Monitoring and Power Optimization System"
      }
    ]
  },
  "mechanical": {
    domainName: "Mechanical Engineering",
    providers: ["NPTEL", "SWAYAM", "Autodesk Learn", "Siemens Learning", "MathWorks"],
    paths: [
      {
        name: "CAD, CAM & CAE Simulation",
        topSkills: ["Engineering Mechanics", "AutoCAD", "SolidWorks", "FEA / CFD Simulation", "Manufacturing Automation"],
        sampleProject: "CAD-based Mechanical Component Design and Stress Simulation"
      }
    ]
  },
  "civil": {
    domainName: "Civil Engineering",
    providers: ["NPTEL", "SWAYAM", "Autodesk Learn", "BIM Central"],
    paths: [
      {
        name: "Structural Analysis & BIM",
        topSkills: ["Engineering Drawing", "Structural Analysis (STAAD Pro)", "AutoCAD", "BIM (Revit)", "Quantity Surveying"],
        sampleProject: "Multi-Storey Earthquake-Resilient RCC Frame Design in STAAD.Pro"
      }
    ]
  },
  "management": {
    domainName: "Management & Commerce",
    providers: ["NPTEL", "SWAYAM", "IBM SkillsBuild", "Microsoft Learn"],
    paths: [
      {
        name: "Business Intelligence & Financial Modeling",
        topSkills: ["Advanced Excel", "Financial Modeling", "Business Analytics", "Communication", "Power BI"],
        sampleProject: "Valuation Model & Risk Sensitivity Analysis for SaaS Ventures"
      }
    ]
  }
};
