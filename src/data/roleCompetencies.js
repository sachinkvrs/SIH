// src/data/roleCompetencies.js
// Universal Role Competency and Domain Intelligence Engine for SkillBridge

export const DOMAINS_LIST = [
  { id: "cs_it", name: "Computer Science & IT", shortName: "CSE / IT", icon: "Code", color: "blue" },
  { id: "ece", name: "Electronics & Communication", shortName: "ECE", icon: "Cpu", color: "purple" },
  { id: "eee", name: "Electrical & Electronics", shortName: "EEE", icon: "Zap", color: "amber" },
  { id: "mech", name: "Mechanical Engineering", shortName: "Mechanical", icon: "Wrench", color: "rose" },
  { id: "civil", name: "Civil Engineering", shortName: "Civil", icon: "Building2", color: "emerald" },
  { id: "mgmt", name: "Management & Business", shortName: "Management", icon: "Briefcase", color: "indigo" },
  { id: "comm", name: "Commerce & Finance", shortName: "Commerce", icon: "TrendingUp", color: "cyan" }
];

export const ROLE_CATEGORIES = [
  "Technology & AI",
  "Cloud & Infrastructure",
  "Core Engineering & Hardware",
  "Management & Finance"
];

export const ROLE_COMPETENCIES = {
  // ==========================================
  // 1. DATA ANALYST (CSE / IT) - CANONICAL
  // ==========================================
  "Data Analyst": {
    roleName: "Data Analyst",
    domainId: "cs_it",
    domainName: "Computer Science & IT",
    category: "Technology & AI",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
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
    skillGaps: [
      {
        id: "gap-sql",
        name: "SQL",
        current: 65,
        required: 80,
        gap: 15,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
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
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
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
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
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
        gapColor: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-900/50",
        recommendedAction: "Proficiency verified. Maintain via practice.",
        duration: "Completed",
        roadmapStepId: "step-sql-fund"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "SQL Fundamentals",
        difficulty: "Beginner",
        question: "Which SQL clause is used to filter group summary results after an aggregation function has been applied?",
        description: "Select the correct ANSI-standard SQL keyword for conditional aggregation.",
        options: [
          { value: "WHERE", label: "WHERE — Filters individual rows prior to grouping" },
          { value: "HAVING", label: "HAVING — Filters aggregated row groups created by GROUP BY" },
          { value: "ORDER BY", label: "ORDER BY — Sorts output in ascending or descending sequence" },
          { value: "GROUP FILTER", label: "GROUP FILTER — Non-standard proprietary keyword" }
        ],
        correct: "HAVING",
        explanation: "HAVING filters aggregated groups, whereas WHERE filters individual records before aggregation."
      },
      {
        id: 2,
        category: "SQL Joins",
        difficulty: "Intermediate",
        question: "What will a FULL OUTER JOIN return when executed between two tables?",
        description: "Identify how non-matching foreign and primary key records are evaluated.",
        options: [
          { value: "A", label: "Only matching rows present in both the left and right tables" },
          { value: "B", label: "All rows from the left table, with nulls for non-matching right table columns" },
          { value: "C", label: "All rows from both tables, filling with NULL where join conditions do not match" },
          { value: "D", label: "A Cartesian product of all rows regardless of join predicates" }
        ],
        correct: "C",
        explanation: "FULL OUTER JOIN retains all records from both datasets, pairing unmatched rows with NULL attributes."
      },
      {
        id: 3,
        category: "Advanced SQL",
        difficulty: "Intermediate",
        question: "How do Common Table Expressions (CTEs) defined using the WITH clause improve complex querying?",
        description: "Evaluate readability, recursiveness, and temporary table optimization.",
        options: [
          { value: "A", label: "They physically index the underlying disk storage permanently" },
          { value: "B", label: "They provide modular, readable named subquery blocks that can be referenced or recursive" },
          { value: "C", label: "They automatically disable ACID compliance for faster throughput" },
          { value: "D", label: "They convert relational tables directly into unstructured JSON files" }
        ],
        correct: "B",
        explanation: "CTEs create named temporary result sets that enhance readability and enable recursive queries."
      },
      {
        id: 4,
        category: "Advanced SQL",
        difficulty: "Advanced",
        question: "Which Window Function assigns rank without gaps when two rows have identical tie values?",
        description: "Distinguish between RANK(), DENSE_RANK(), and ROW_NUMBER().",
        options: [
          { value: "A", label: "ROW_NUMBER() — Guarantees unique sequential integers regardless of ties" },
          { value: "B", label: "RANK() — Leaves gaps in ranking sequence after ties (e.g., 1, 2, 2, 4)" },
          { value: "C", label: "DENSE_RANK() — Assigns consecutive ranks without skipped numbers (e.g., 1, 2, 2, 3)" },
          { value: "D", label: "NTILE() — Divides rows into specified buckets" }
        ],
        correct: "C",
        explanation: "DENSE_RANK maintains consecutive rank values even after ties occur."
      },
      {
        id: 5,
        category: "Python Data Manipulation",
        difficulty: "Beginner",
        question: "In Pandas, what is the primary difference between df.loc[] and df.iloc[]?",
        description: "Analyze indexer syntax for series and dataframe slicing.",
        options: [
          { value: "A", label: "df.loc is label-based selection, whereas df.iloc is integer position-based" },
          { value: "B", label: "df.loc only works on columns, while df.iloc only works on rows" },
          { value: "C", label: "df.iloc requires SQL syntax, while df.loc uses standard Python" },
          { value: "D", label: "There is no difference; they are interchangeable aliases" }
        ],
        correct: "A",
        explanation: "loc searches by explicit label indices, while iloc indexes strictly by 0-based integer positions."
      },
      {
        id: 6,
        category: "Python Data Manipulation",
        difficulty: "Intermediate",
        question: "Which Pandas method is best suited to pivot wide categorical columns into long tidy key-value format?",
        description: "Selecting transformation routines for normalized data pipelines.",
        options: [
          { value: "A", label: "pd.concat() with axis=1" },
          { value: "B", label: "pd.melt() — Unpivots DataFrame from wide to long format" },
          { value: "C", label: "df.to_records()" },
          { value: "D", label: "df.fillna() with method='ffill'" }
        ],
        correct: "B",
        explanation: "pd.melt() unpivots wide columns into normalized identifier and value columns."
      },
      {
        id: 7,
        category: "Business Intelligence (Power BI)",
        difficulty: "Intermediate",
        question: "In Power BI DAX, what is the fundamental purpose of the CALCULATE() function?",
        description: "Understanding filter context modification in tabular analytical models.",
        options: [
          { value: "A", label: "It merely sums numerical columns similar to basic arithmetic" },
          { value: "B", label: "It evaluates an expression under modified, newly injected filter contexts" },
          { value: "C", label: "It imports external CSV files into Power Query" },
          { value: "D", label: "It renders bar charts directly inside canvas visuals" }
        ],
        correct: "B",
        explanation: "CALCULATE modifies or overrides the existing filter context when evaluating a measure."
      },
      {
        id: 8,
        category: "Business Intelligence (Power BI)",
        difficulty: "Intermediate",
        question: "What distinguishes Star Schema from Snowflake Schema in analytical data warehouse modeling?",
        description: "Evaluating dimension normalization and query join performance.",
        options: [
          { value: "A", label: "Star Schema denormalizes dimensions into single tables; Snowflake normalizes dimensions" },
          { value: "B", label: "Star Schema does not support numerical measure calculations" },
          { value: "C", label: "Snowflake Schema eliminates fact tables completely" },
          { value: "D", label: "Star Schema is strictly reserved for NoSQL graph databases" }
        ],
        correct: "A",
        explanation: "Star schema features de-normalized dimensions for faster analytical joins; Snowflake splits dimensions into normalized sub-tables."
      },
      {
        id: 9,
        category: "Statistics & EDA",
        difficulty: "Intermediate",
        question: "When analyzing right-skewed business revenue data, which measure of central tendency is most representative?",
        description: "Assessing sensitivity to extreme positive revenue outliers.",
        options: [
          { value: "A", label: "Arithmetic Mean — heavily pulled upwards by massive outlier transactions" },
          { value: "B", label: "Median — robust against extreme tail values, reflects 50th percentile" },
          { value: "C", label: "Standard Deviation" },
          { value: "D", label: "Kurtosis" }
        ],
        correct: "B",
        explanation: "Median is robust against extreme positive skewness and outliers."
      },
      {
        id: 10,
        category: "Statistics & EDA",
        difficulty: "Intermediate",
        question: "What does a p-value less than 0.05 signify in an A/B hypothesis test?",
        description: "Interpreting standard alpha rejection thresholds.",
        options: [
          { value: "A", label: "The test is invalid and must be repeated" },
          { value: "B", label: "There is less than a 5% probability of observing the result under the null hypothesis" },
          { value: "C", label: "The null hypothesis has been 100% proven mathematically true" },
          { value: "D", label: "The sample size was too small to draw inference" }
        ],
        correct: "B",
        explanation: "p < 0.05 indicates statistical significance to reject the null hypothesis at the 5% alpha level."
      },
      {
        id: 11,
        category: "Data Cleansing",
        difficulty: "Beginner",
        question: "Which technique is recommended to impute missing numeric values in normal distributions without introducing bias?",
        description: "Data preparation best practices.",
        options: [
          { value: "A", label: "Drop all rows with any missing value indiscriminately" },
          { value: "B", label: "Impute with mean or median depending on skewness" },
          { value: "C", label: "Fill missing cells with negative infinity" },
          { value: "D", label: "Convert numeric columns to plain string tokens" }
        ],
        correct: "B",
        explanation: "Mean/median imputation preserves distributional central tendency for moderate missingness."
      },
      {
        id: 12,
        category: "Data Storytelling",
        difficulty: "Beginner",
        question: "Which chart is most effective for demonstrating part-to-whole categorical contributions exceeding 7 categories?",
        description: "Visual communication principles.",
        options: [
          { value: "A", label: "Pie Chart with 15 thin slices" },
          { value: "B", label: "Horizontal Bar Chart ordered by descending magnitude" },
          { value: "C", label: "3D Bubble Scatter Plot" },
          { value: "D", label: "Radar Spider Chart" }
        ],
        correct: "B",
        explanation: "Horizontal bar charts allow clear label reading and rapid length comparison for many categories."
      },
      {
        id: 13,
        category: "Data Modeling",
        difficulty: "Advanced",
        question: "In dimensional modeling, what is a Slowly Changing Dimension (SCD Type 2)?",
        description: "Historical data preservation in analytics warehouses.",
        options: [
          { value: "A", label: "It overwrites the old value directly without tracking history" },
          { value: "B", label: "It creates a new record row with start/end validity timestamps to preserve full history" },
          { value: "C", label: "It creates a new column for every historical change" },
          { value: "D", label: "It purges the dimension record entirely" }
        ],
        correct: "B",
        explanation: "SCD Type 2 maintains historical accuracy by inserting new rows with effective date ranges."
      },
      {
        id: 14,
        category: "Cloud Data Warehousing",
        difficulty: "Intermediate",
        question: "Why do modern analytical warehouses like Snowflake and BigQuery utilize columnar storage instead of row-based storage?",
        description: "Evaluating analytical read performance and storage compression.",
        options: [
          { value: "A", label: "Columnar storage compresses repeated column values and reads only queried attributes" },
          { value: "B", label: "Columnar storage is optimized for rapid single-row OLTP transaction inserts" },
          { value: "C", label: "Row-based storage requires no disk space" },
          { value: "D", label: "Columnar storage eliminates the need for SQL queries" }
        ],
        correct: "A",
        explanation: "Columnar formats drastically reduce I/O by reading only required columns with high compression."
      },
      {
        id: 15,
        category: "Ethics & Governance",
        difficulty: "Intermediate",
        question: "Under data privacy frameworks (e.g., GDPR / DPDP), what is 'pseudonymization'?",
        description: "Compliance and security for enterprise analytics.",
        options: [
          { value: "A", label: "Deleting all database backups permanently" },
          { value: "B", label: "Replacing identifiable fields with artificial identifiers so data cannot be attributed without separate key" },
          { value: "C", label: "Exposing student email addresses publicly" },
          { value: "D", label: "Running queries without WHERE clauses" }
        ],
        correct: "B",
        explanation: "Pseudonymization dissociates personal identifiers using cryptographic hashes or synthetic tokens."
      }
    ],
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
        reason: "Core foundation for querying relational databases.",
        prerequisiteId: null
      },
      {
        id: "step-adv-sql",
        title: "Advanced SQL & Query Optimization",
        skill: "Window Functions & CTEs",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 45,
        desc: "Window functions, Common Table Expressions, indexing, performance tuning.",
        reason: "Identified 15% gap in complex queries on your diagnostic assessment.",
        prerequisiteId: "step-sql-fund"
      },
      {
        id: "step-pbi",
        title: "Power BI Desktop & DAX Modeling",
        skill: "Data Modeling & DAX",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Star schema modeling, DAX measures, interactive reporting, drill-downs.",
        reason: "Highest gap (30%) identified for Data Analyst industry readiness.",
        prerequisiteId: "step-adv-sql"
      },
      {
        id: "step-stats",
        title: "Statistical Analysis & A/B Testing",
        skill: "Applied Statistics",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Hypothesis testing, regression analysis, correlation vs causation.",
        reason: "Closes 10% gap in statistical inference for business decisions.",
        prerequisiteId: "step-pbi"
      },
      {
        id: "step-capstone",
        title: "End-to-End Enterprise Analytics Capstone",
        skill: "Full Pipeline Integration",
        duration: "3 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Design an executive sales & customer churn dashboard from raw PostgreSQL warehouse.",
        reason: "Verifies holistic readiness for industry placement with verified passport credentials.",
        prerequisiteId: "step-stats"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-da-1",
        title: "E-Commerce Customer Churn & Cohort Analysis",
        domain: "Computer Science & IT",
        industryContext: "Used in Retail & FinTech (Flipkart, Swiggy) to reduce customer churn and calculate 90-day Customer Lifetime Value (LTV).",
        tools: "PostgreSQL, Python (Pandas/Seaborn), Power BI",
        deliverables: "Cohort retention heatmaps, DAX measure model, executive insights deck",
        difficulty: "Intermediate"
      },
      {
        id: "exp-da-2",
        title: "Real-Time Supply Chain KPI Executive Dashboard",
        domain: "Computer Science & IT",
        industryContext: "Deployed across Logistics & Manufacturing (Amazon, Delhivery) to monitor delivery SLA breaches in real-time.",
        tools: "SQL Server, Power Query, Star Schema, Power BI Service",
        deliverables: "Star schema data warehouse, automated ETL pipeline script, interactive Power BI report",
        difficulty: "Advanced"
      }
    ],
    opportunities: [
      {
        id: "opp-da-1",
        category: "Internship",
        role: "Data Analyst Intern",
        company: "ABC Technologies",
        location: "Remote / Hybrid",
        duration: "3 Months",
        stipend: "₹25,000 / month",
        experience: "Fresher / College Students",
        source: "SkillBridge Direct",
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
        recommendation: "Complete the Power BI module in your roadmap to boost your match to 94%."
      },
      {
        id: "opp-da-2",
        category: "Job",
        role: "Junior BI Analyst",
        company: "TechCorp Global",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹4.5 – 6.0 LPA",
        experience: "0–1 Years",
        source: "Partner Network",
        deadline: "22 Oct 2026",
        matchPercentage: 80,
        potentialMatchPercentage: 90,
        logoBg: "bg-emerald-600 text-white",
        tags: ["SQL", "Tableau", "Statistics", "Reporting"],
        matchingSkills: [
          { skill: "SQL", studentScore: 65, requiredScore: 65, status: "Met" },
          { skill: "Statistics", studentScore: 70, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Tableau", studentScore: 40, requiredScore: 65, gap: 25, impact: "+10% match boost" }
        ],
        recommendation: "Add Tableau visualization project from Recommendations to qualify."
      },
      {
        id: "opp-da-3",
        category: "Startup",
        role: "Founding Data & Growth Analyst",
        company: "FinFlow Analytics (Y-Combinator W25)",
        location: "Bangalore / Remote",
        duration: "Full-Time",
        stipend: "₹6.0 – 9.0 LPA + 0.25% ESOP",
        experience: "Freshers with verified projects",
        source: "SkillBridge Startup Network",
        deadline: "30 Oct 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-purple-600 text-white",
        tags: ["SQL", "Growth Metrics", "Python", "Product Analytics"],
        matchingSkills: [
          { skill: "SQL", studentScore: 65, requiredScore: 65, status: "Met" },
          { skill: "Python", studentScore: 85, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Product Analytics", studentScore: 50, requiredScore: 75, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Review cohort retention metrics to prepare for startup founder interview."
      },
      {
        id: "opp-da-4",
        category: "Government",
        role: "Data Intelligence Officer (Grade B)",
        company: "National Informatics Centre (NIC / Govt of India)",
        location: "New Delhi",
        duration: "Permanent Govt Cadre",
        stipend: "Level 7 Pay Matrix (₹44,900 – ₹1,42,400)",
        experience: "B.Tech / MCA with verified credentials",
        source: "Govt Recruitment Portal",
        deadline: "10 Nov 2026",
        matchPercentage: 79,
        potentialMatchPercentage: 89,
        logoBg: "bg-amber-600 text-white",
        tags: ["SQL", "Relational DB", "Govt Data Standards", "Python"],
        matchingSkills: [
          { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" },
          { skill: "Python", studentScore: 85, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Cybersecurity & Data Privacy", studentScore: 40, requiredScore: 70, gap: 30, impact: "+10% match boost" }
        ],
        recommendation: "Take the Govt Information Security assessment module on SkillBridge."
      }
    ]
  },

  // ==========================================
  // 2. SOFTWARE ENGINEER (CSE / IT)
  // ==========================================
  "Software Engineer": {
    roleName: "Software Engineer",
    domainId: "cs_it",
    domainName: "Computer Science & IT",
    category: "Technology & AI",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    readinessScore: 78,
    scoreDelta: "+4% from last month",
    readinessStatus: "Approaching Target",
    readinessBreakdown: [
      { name: "Core CS & DSA", score: 82, desc: "Algorithms, Trees, Graphs, Dynamic Programming" },
      { name: "Full-Stack Dev", score: 76, desc: "React, Node.js, REST APIs, TypeScript" },
      { name: "System Design", score: 65, desc: "Caching, microservices, load balancing, DB scaling" },
      { name: "Engineering Practices", score: 84, desc: "Git workflow, CI/CD, unit testing, Docker" },
      { name: "Certifications", score: 85, desc: "SkillBridge Verified DSA & Backend credentials" }
    ],
    readinessSummary: "Solid algorithmic problem-solving and full-stack building skills. Deepening system design and asynchronous microservice architecture will raise readiness to 90%+.",
    skillGaps: [
      {
        id: "gap-sys-design",
        name: "System Design & Scalability",
        current: 55,
        required: 80,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "High-level design of URL shortener, rate limiter, and message queues",
        duration: "3 weeks",
        roadmapStepId: "step-swe-sys"
      },
      {
        id: "gap-docker",
        name: "Docker & Containerization",
        current: 60,
        required: 75,
        gap: 15,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "Multi-stage Dockerfiles & Docker Compose microservice clusters",
        duration: "2 weeks",
        roadmapStepId: "step-swe-docker"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Data Structures",
        difficulty: "Intermediate",
        question: "What is the worst-case time complexity of searching in a standard Binary Search Tree without rebalancing?",
        description: "Evaluate degenerate tree structures.",
        options: [
          { value: "A", label: "O(1) constant time" },
          { value: "B", label: "O(log N) logarithmic time" },
          { value: "C", label: "O(N) linear time when the tree degenerates into a linked list" },
          { value: "D", label: "O(N log N)" }
        ],
        correct: "C",
        explanation: "Without self-balancing (like AVL or Red-Black), skewed insertions cause the tree to degenerate into a linked list of height N."
      },
      {
        id: 2,
        category: "Algorithms",
        difficulty: "Intermediate",
        question: "Which algorithm guarantees finding the shortest path in an unweighted graph with optimal O(V + E) time?",
        description: "Graph traversal fundamentals.",
        options: [
          { value: "A", label: "Depth-First Search (DFS)" },
          { value: "B", label: "Breadth-First Search (BFS)" },
          { value: "C", label: "Floyd-Warshall Algorithm" },
          { value: "D", label: "Bellman-Ford Algorithm" }
        ],
        correct: "B",
        explanation: "BFS explores layer by layer, naturally discovering the shortest path in unweighted graphs in O(V + E)."
      },
      {
        id: 3,
        category: "Backend Architecture",
        difficulty: "Intermediate",
        question: "What does the 'Idempotency' property of an HTTP method guarantee?",
        description: "RESTful API protocol standards.",
        options: [
          { value: "A", label: "The request runs in zero milliseconds" },
          { value: "B", label: "Executing the same request multiple times leaves the server in the exact same state as executing it once" },
          { value: "C", label: "The method is strictly read-only and cannot alter databases" },
          { value: "D", label: "The request cannot be cached by intermediate proxies" }
        ],
        correct: "B",
        explanation: "Methods like GET, PUT, and DELETE are idempotent because repeating the request produces identical side effects."
      },
      {
        id: 4,
        category: "Database Systems",
        difficulty: "Advanced",
        question: "Under the CAP Theorem, what must a distributed database trade off during an active network partition (P)?",
        description: "Distributed systems consistency vs availability.",
        options: [
          { value: "A", label: "Security vs Reliability" },
          { value: "B", label: "Consistency (CP) vs Availability (AP)" },
          { value: "C", label: "Latency vs Storage Space" },
          { value: "D", label: "Throughput vs Encryption" }
        ],
        correct: "B",
        explanation: "When a network partition occurs, a distributed system must choose between returning consistent data (CP) or remaining available (AP)."
      },
      {
        id: 5,
        category: "Operating Systems",
        difficulty: "Intermediate",
        question: "What is the primary operational difference between a Process and a Thread in modern operating systems?",
        description: "Concurrency and memory management.",
        options: [
          { value: "A", label: "Processes share the same virtual address space; threads have isolated address spaces" },
          { value: "B", label: "Threads within the same process share code, data, and open files, but possess private stacks and registers" },
          { value: "C", label: "Threads cannot be scheduled by the CPU" },
          { value: "D", label: "Processes execute sequentially while threads cannot run concurrently" }
        ],
        correct: "B",
        explanation: "Threads of a process share the same memory space but maintain individual call stacks and program counters."
      },
      {
        id: 6,
        category: "Web Development",
        difficulty: "Intermediate",
        question: "In React, why should array indices NOT be used as the 'key' prop when rendering lists whose items can be reordered or filtered?",
        description: "Virtual DOM reconciliation optimization.",
        options: [
          { value: "A", label: "React will throw a fatal syntax compiler error" },
          { value: "B", label: "It confuses the reconciliation diffing algorithm, leading to state bugs and unnecessary re-renders" },
          { value: "C", label: "Keys must always be integers starting from 1" },
          { value: "D", label: "Indices prevent CSS styling from applying" }
        ],
        correct: "B",
        explanation: "Index keys mislead React's reconciler during additions/deletions, causing child component state to attach to incorrect elements."
      },
      {
        id: 7,
        category: "System Design",
        difficulty: "Advanced",
        question: "Which caching eviction policy removes the item that has not been accessed for the longest duration?",
        description: "High-performance memory caching.",
        options: [
          { value: "A", label: "FIFO (First In, First Out)" },
          { value: "B", label: "LFU (Least Frequently Used)" },
          { value: "C", label: "LRU (Least Recently Used)" },
          { value: "D", label: "Random Replacement" }
        ],
        correct: "C",
        explanation: "LRU tracks access order and evicts keys with the oldest last-access timestamp."
      },
      {
        id: 8,
        category: "Cloud & DevOps",
        difficulty: "Intermediate",
        question: "What is the primary benefit of multi-stage builds in a Dockerfile?",
        description: "Container image optimization.",
        options: [
          { value: "A", label: "It enables Docker to run without a Linux kernel" },
          { value: "B", label: "It leaves bulky build tools and SDKs in intermediate layers, resulting in lightweight, secure production images" },
          { value: "C", label: "It automatically hosts the container in Kubernetes" },
          { value: "D", label: "It makes Docker containers run faster than bare metal" }
        ],
        correct: "B",
        explanation: "Multi-stage builds copy only compiled production artifacts to the final minimal base image."
      },
      {
        id: 9,
        category: "Networking",
        difficulty: "Intermediate",
        question: "What happens during the TCP Three-Way Handshake before data transmission begins?",
        description: "Transport layer connection establishment.",
        options: [
          { value: "A", label: "SYN -> SYN-ACK -> ACK" },
          { value: "B", label: "PING -> PONG -> ACK" },
          { value: "C", label: "CONNECT -> ACCEPT -> READY" },
          { value: "D", label: "GET -> 200 OK -> FIN" }
        ],
        correct: "A",
        explanation: "Client sends SYN, server responds with SYN-ACK, client acknowledges with ACK to establish full-duplex transmission."
      },
      {
        id: 10,
        category: "Design Patterns",
        difficulty: "Intermediate",
        question: "Which software design pattern provides a single point of access to a unified interface for a complex subsystem?",
        description: "Architectural design patterns.",
        options: [
          { value: "A", label: "Singleton Pattern" },
          { value: "B", label: "Facade Pattern" },
          { value: "C", label: "Observer Pattern" },
          { value: "D", label: "Strategy Pattern" }
        ],
        correct: "B",
        explanation: "Facade provides a simplified high-level interface that hides the complexity of underlying sub-systems."
      },
      {
        id: 11,
        category: "Security",
        difficulty: "Intermediate",
        question: "How should passwords ALWAYS be stored in a modern web database?",
        description: "Authentication and credential storage.",
        options: [
          { value: "A", label: "Encrypted with symmetric AES-256 with key in code" },
          { value: "B", label: "Hashed using a salted, computationally slow algorithm like bcrypt or Argon2" },
          { value: "C", label: "Hashed with basic MD5 or SHA-1" },
          { value: "D", label: "Plain text encoded in Base64" }
        ],
        correct: "B",
        explanation: "bcrypt and Argon2 incorporate adaptive work factors and salt to defend against rainbow tables and GPU brute-force."
      },
      {
        id: 12,
        category: "Version Control",
        difficulty: "Beginner",
        question: "What does 'git rebase' do compared to 'git merge'?",
        description: "Collaborative Git workflows.",
        options: [
          { value: "A", label: "Rebase rewrites commit history by moving changes onto the tip of another branch linearly; merge creates a merge commit" },
          { value: "B", label: "Rebase deletes all commits permanently" },
          { value: "C", label: "Merge only works on remote repositories" },
          { value: "D", label: "Rebase transfers code into Subversion" }
        ],
        correct: "A",
        explanation: "Rebase replays branch commits onto a new base commit, creating a clean linear timeline without merge commits."
      },
      {
        id: 13,
        category: "API Design",
        difficulty: "Intermediate",
        question: "What is the primary advantage of GraphQL over traditional REST APIs for mobile applications?",
        description: "Client-driven data querying.",
        options: [
          { value: "A", label: "GraphQL requires no backend server" },
          { value: "B", label: "Clients can request exactly the data fields they need, preventing over-fetching and under-fetching" },
          { value: "C", label: "GraphQL replaces relational databases" },
          { value: "D", label: "GraphQL queries bypass HTTPS encryption" }
        ],
        correct: "B",
        explanation: "GraphQL allows mobile clients to fetch specific nested payloads in a single round-trip."
      },
      {
        id: 14,
        category: "Testing",
        difficulty: "Beginner",
        question: "In Test-Driven Development (TDD), what is the correct sequence of the cycle?",
        description: "Software quality methodologies.",
        options: [
          { value: "A", label: "Red (Write failing test) -> Green (Write minimal passing code) -> Refactor" },
          { value: "B", label: "Write code -> Deploy -> Fix bugs in production" },
          { value: "C", label: "Refactor -> Green -> Red" },
          { value: "D", label: "Unit test -> Integration test -> Delete tests" }
        ],
        correct: "A",
        explanation: "The classic TDD cycle starts with a failing test (Red), implements minimal code to pass (Green), then refactors."
      },
      {
        id: 15,
        category: "Concurrency",
        difficulty: "Advanced",
        question: "What is a Race Condition in multithreaded programming?",
        description: "Shared state synchronization.",
        options: [
          { value: "A", label: "When one thread runs faster than another without issue" },
          { value: "B", label: "When multiple threads concurrently read and write shared data without synchronization, making output dependent on timing" },
          { value: "C", label: "When a thread enters an infinite while loop" },
          { value: "D", label: "When memory runs out on the server" }
        ],
        correct: "B",
        explanation: "Race conditions arise when concurrent threads modify shared state without mutual exclusion or atomic locking."
      }
    ],
    roadmap: [
      {
        id: "step-swe-dsa",
        title: "Advanced Data Structures & Graph Algorithms",
        skill: "DSA & Problem Solving",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "completed",
        progress: 100,
        desc: "Trees, heaps, graph traversals, and dynamic programming patterns on LeetCode.",
        reason: "Core foundation for passing Tier-1 tech interviews.",
        prerequisiteId: null
      },
      {
        id: "step-swe-backend",
        title: "High-Performance Backend & Database Architecture",
        skill: "Node.js / Express & PostgreSQL",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 60,
        desc: "RESTful APIs, ACID transactions, Prisma ORM, indexing, and connection pooling.",
        reason: "Essential for building production-grade services.",
        prerequisiteId: "step-swe-dsa"
      },
      {
        id: "step-swe-docker",
        title: "Containerization & Microservices with Docker",
        skill: "Docker & CI/CD",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Multi-stage builds, Docker Compose, GitHub Actions, and container networking.",
        reason: "Closes 15% gap in deployment engineering.",
        prerequisiteId: "step-swe-backend"
      },
      {
        id: "step-swe-sys",
        title: "Scalable Distributed System Design",
        skill: "System Design & Caching",
        duration: "3 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Redis caching, message brokers (Kafka/RabbitMQ), load balancing, and horizontal scaling.",
        reason: "Highest gap (25%) identified for senior developer qualification.",
        prerequisiteId: "step-swe-docker"
      },
      {
        id: "step-swe-capstone",
        title: "Production Distributed Microservices Capstone",
        skill: "End-to-End Distributed App",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Build an event-driven e-commerce ordering engine handling 1,000 req/sec with Redis & PostgreSQL.",
        reason: "Industry portfolio piece verified on your Digital Skill Passport.",
        prerequisiteId: "step-swe-sys"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-swe-1",
        title: "Distributed Rate Limiter with Redis Token Bucket",
        domain: "Computer Science & IT",
        industryContext: "Critical infrastructure in API gateways (Stripe, Cloudflare) protecting services from DDoS and abusive scraping.",
        tools: "Node.js / Go, Redis Lua scripts, Docker, k6 load testing",
        deliverables: "Token bucket rate limiting middleware, benchmark latency report, Docker compose cluster",
        difficulty: "Advanced"
      },
      {
        id: "exp-swe-2",
        title: "Event-Driven Notification Engine with Message Queues",
        domain: "Computer Science & IT",
        industryContext: "Used in Uber and Zomato to dispatch real-time SMS, email, and push notifications reliably without dropping jobs.",
        tools: "Express.js, RabbitMQ / Kafka, Redis, WebSockets",
        deliverables: "Worker pool consumer architecture, dead-letter queue handler, integration test suite",
        difficulty: "Advanced"
      }
    ],
    opportunities: [
      {
        id: "opp-swe-1",
        category: "Internship",
        role: "Software Engineering Intern",
        company: "Zeta Global",
        location: "Bangalore / Hybrid",
        duration: "6 Months",
        stipend: "₹40,000 / month",
        experience: "Pre-final / Final Year B.Tech",
        source: "SkillBridge Direct",
        deadline: "20 Oct 2026",
        matchPercentage: 86,
        potentialMatchPercentage: 95,
        logoBg: "bg-indigo-600 text-white",
        tags: ["DSA", "Node.js", "PostgreSQL", "Docker"],
        matchingSkills: [
          { skill: "DSA", studentScore: 82, requiredScore: 75, status: "Met" },
          { skill: "Node.js", studentScore: 76, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "System Design", studentScore: 55, requiredScore: 75, gap: 20, impact: "+9% match boost" }
        ],
        recommendation: "Review Redis caching and message queues in your roadmap."
      },
      {
        id: "opp-swe-2",
        category: "Job",
        role: "Associate Software Engineer",
        company: "Infosys Wingspan",
        location: "Pune / Hyderabad",
        duration: "Full-Time",
        stipend: "₹5.5 – 8.0 LPA",
        experience: "0–1 Years Experience",
        source: "Campus Hiring Partner",
        deadline: "28 Oct 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 91,
        logoBg: "bg-blue-700 text-white",
        tags: ["React", "Java / Node", "SQL", "Git"],
        matchingSkills: [
          { skill: "Git", studentScore: 84, requiredScore: 70, status: "Met" },
          { skill: "Core CS", studentScore: 82, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Docker", studentScore: 60, requiredScore: 75, gap: 15, impact: "+8% match boost" }
        ],
        recommendation: "Complete the Docker microservice module to fast-track interview."
      },
      {
        id: "opp-swe-3",
        category: "Startup",
        role: "Full-Stack Software Engineer (Early Stage)",
        company: "Postman-backed DevTool Startup",
        location: "Bangalore / Remote",
        duration: "Full-Time",
        stipend: "₹8.0 – 12.0 LPA + Equity",
        experience: "Strong GitHub & Project Portfolio",
        source: "SkillBridge Startup Network",
        deadline: "05 Nov 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 94,
        logoBg: "bg-emerald-600 text-white",
        tags: ["TypeScript", "Next.js", "Docker", "REST API"],
        matchingSkills: [
          { skill: "Full-Stack Dev", studentScore: 76, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Distributed Caching", studentScore: 55, requiredScore: 75, gap: 20, impact: "+9% match boost" }
        ],
        recommendation: "Publish your Redis rate limiter project to showcase production architecture."
      },
      {
        id: "opp-swe-4",
        category: "Government",
        role: "Scientist / Engineer 'SC' (Computer Science)",
        company: "ISRO / Dept of Space (Govt of India)",
        location: "ISRO Telemetry & Tracking (ISTRAC), Bangalore",
        duration: "Gazetted Officer Cadre",
        stipend: "Level 10 Pay Matrix (₹56,100 + DA + HRA)",
        experience: "B.Tech CSE with minimum 65% aggregate",
        source: "ISRO Centralized Recruitment Board",
        deadline: "15 Nov 2026",
        matchPercentage: 81,
        potentialMatchPercentage: 90,
        logoBg: "bg-amber-600 text-white",
        tags: ["Algorithms", "OS", "Computer Networks", "C/C++"],
        matchingSkills: [
          { skill: "Core CS & DSA", studentScore: 82, requiredScore: 75, status: "Met" },
          { skill: "Operating Systems", studentScore: 75, requiredScore: 70, status: "Met" }
        ],
        missingSkills: [
          { skill: "Real-Time Systems", studentScore: 50, requiredScore: 70, gap: 20, impact: "+9% match boost" }
        ],
        recommendation: "Review RTOS scheduling and IPC protocols."
      }
    ]
  },

  // ==========================================
  // 3. EMBEDDED SYSTEMS ENGINEER (ECE)
  // ==========================================
  "Embedded Systems Engineer": {
    roleName: "Embedded Systems Engineer",
    domainId: "ece",
    domainName: "Electronics & Communication",
    category: "Core Engineering & Hardware",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    readinessScore: 80,
    scoreDelta: "+6% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Embedded C & Assembly", score: 85, desc: "Bitwise manipulation, memory mapped I/O, bare metal drivers" },
      { name: "Microcontrollers", score: 82, desc: "ARM Cortex-M (STM32), ESP32, Timers, Interrupts, DMA" },
      { name: "Communication Protocols", score: 78, desc: "UART, SPI, I2C, CAN Bus protocol decoders" },
      { name: "Real-Time OS (RTOS)", score: 68, desc: "FreeRTOS tasks, semaphores, queues, priority inversion" },
      { name: "Hardware Debugging", score: 86, desc: "Logic analyzer, oscilloscope, JTAG/SWD debugging" }
    ],
    readinessSummary: "Strong microcontrollers and hardware communication fundamentals. Deepening FreeRTOS task synchronization and CAN bus telemetry will boost readiness to 92%.",
    skillGaps: [
      {
        id: "gap-rtos",
        name: "FreeRTOS & Concurrency",
        current: 58,
        required: 80,
        gap: 22,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "Preemptive multitasking, Mutexes, and Message Queues in FreeRTOS",
        duration: "3 weeks",
        roadmapStepId: "step-emb-rtos"
      },
      {
        id: "gap-can",
        name: "Automotive CAN Bus Protocol",
        current: 55,
        required: 75,
        gap: 20,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "Controller Area Network (CAN 2.0B) message framing and transceiver interfacing",
        duration: "2 weeks",
        roadmapStepId: "step-emb-can"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Embedded C",
        difficulty: "Intermediate",
        question: "Why is the 'volatile' keyword critical when declaring hardware memory-mapped register pointers in C?",
        description: "Compiler optimization and hardware registers.",
        options: [
          { value: "A", label: "It allocates memory directly inside the MCU's cache" },
          { value: "B", label: "It tells the compiler that the register value can change asynchronously outside program control, preventing caching" },
          { value: "C", label: "It accelerates program execution by storing variables in general registers" },
          { value: "D", label: "It encrypts variable contents in flash memory" }
        ],
        correct: "B",
        explanation: "volatile informs the compiler optimizer not to cache the register value in a CPU register because hardware can modify it anytime."
      },
      {
        id: 2,
        category: "Microcontroller Architecture",
        difficulty: "Intermediate",
        question: "In an ARM Cortex-M processor, what is the role of the Nested Vectored Interrupt Controller (NVIC)?",
        description: "Hardware interrupt latency and prioritization.",
        options: [
          { value: "A", label: "It serves as the main high-speed system oscillator" },
          { value: "B", label: "It provides low-latency, deterministic hardware interrupt handling with configurable priority levels" },
          { value: "C", label: "It manages external SDRAM refresh timing" },
          { value: "D", label: "It converts analog signals to pulse-width modulation" }
        ],
        correct: "B",
        explanation: "The NVIC in ARM Cortex-M handles hardware interrupt vectoring, nesting, and tail-chaining deterministically."
      },
      {
        id: 3,
        category: "Communication Protocols",
        difficulty: "Intermediate",
        question: "Which serial communication protocol uses two bidirectional open-drain lines pulled up with external resistors (SDA and SCL)?",
        description: "Synchronous serial bus architectures.",
        options: [
          { value: "A", label: "SPI (Serial Peripheral Interface)" },
          { value: "B", label: "UART (Universal Asynchronous Receiver-Transmitter)" },
          { value: "C", label: "I2C (Inter-Integrated Circuit)" },
          { value: "D", label: "RS-485" }
        ],
        correct: "C",
        explanation: "I2C uses SDA (Serial Data) and SCL (Serial Clock) with pull-up resistors in open-drain configurations."
      },
      {
        id: 4,
        category: "Real-Time OS (RTOS)",
        difficulty: "Advanced",
        question: "What is 'Priority Inversion' in a preemptive RTOS, and how does Priority Inheritance solve it?",
        description: "Task scheduling and mutex contention.",
        options: [
          { value: "A", label: "When low priority tasks starve high priority tasks because a medium priority task preempts a low task holding a shared resource; solved by temporarily elevating the low task's priority" },
          { value: "B", label: "When the MCU runs out of heap memory during malloc" },
          { value: "C", label: "When tasks are executed in strict round-robin order" },
          { value: "D", label: "When clock frequency drops below minimum operating voltage" }
        ],
        correct: "A",
        explanation: "Priority inheritance temporarily boosts the priority of a low-priority task holding a mutex needed by a high-priority task, preventing unbounded delay."
      },
      {
        id: 5,
        category: "Peripherals & Timers",
        difficulty: "Beginner",
        question: "What is Pulse Width Modulation (PWM) primarily used for in microcontroller applications?",
        description: "Digital control of analog hardware.",
        options: [
          { value: "A", label: "Compressing firmware binary files" },
          { value: "B", label: "Simulating variable analog voltage to control motor speed, LED brightness, or power converters" },
          { value: "C", label: "Erasing flash memory sectors" },
          { value: "D", label: "Connecting to Wi-Fi access points" }
        ],
        correct: "B",
        explanation: "PWM rapidly toggles a digital output pin to create an effective average analog voltage proportional to duty cycle."
      },
      {
        id: 6,
        category: "Direct Memory Access (DMA)",
        difficulty: "Intermediate",
        question: "Why is Direct Memory Access (DMA) preferred over polling or interrupts for high-speed sensor streams?",
        description: "CPU offloading in embedded systems.",
        options: [
          { value: "A", label: "DMA transfers data directly between peripherals and memory without CPU intervention, freeing CPU cycles" },
          { value: "B", label: "DMA reduces hardware circuit board size" },
          { value: "C", label: "DMA converts C code into assembly" },
          { value: "D", label: "DMA eliminates the need for battery power" }
        ],
        correct: "A",
        explanation: "DMA offloads block data transfers from the CPU, allowing the processor to continue execution or sleep."
      },
      {
        id: 7,
        category: "Automotive Protocols",
        difficulty: "Intermediate",
        question: "In Controller Area Network (CAN) bus communication, how is bus contention resolved between multiple transmitting nodes?",
        description: "Bitwise arbitration and dominant/recessive bits.",
        options: [
          { value: "A", label: "Master node polls each slave sequentially" },
          { value: "B", label: "Non-destructive bitwise arbitration based on message identifier priority (dominant '0' bits overwrite recessive '1' bits)" },
          { value: "C", label: "Nodes transmit randomly and back off like Ethernet CSMA/CD" },
          { value: "D", label: "Nodes wait for a token ring packet" }
        ],
        correct: "B",
        explanation: "CAN bus uses bitwise arbitration where the lowest identifier numerical value (dominant '0') wins without message corruption."
      },
      {
        id: 8,
        category: "Hardware Debugging",
        difficulty: "Intermediate",
        question: "What physical signals are used by standard ARM Serial Wire Debug (SWD) for in-circuit programming and debugging?",
        description: "JTAG and SWD hardware debug interfaces.",
        options: [
          { value: "A", label: "TX and RX only" },
          { value: "B", label: "SWCLK (Clock) and SWDIO (Bidirectional Data)" },
          { value: "C", label: "MOSI, MISO, SCK, and CS" },
          { value: "D", label: "CAN_H and CAN_L" }
        ],
        correct: "B",
        explanation: "ARM SWD uses two pins: SWCLK and SWDIO, reducing pin count compared to 4-pin JTAG."
      },
      {
        id: 9,
        category: "Memory Management",
        difficulty: "Advanced",
        question: "Why is dynamic memory allocation (`malloc`/`free`) frequently forbidden or strictly restricted in safety-critical embedded firmware (e.g. MISRA C)?",
        description: "Heap fragmentation and determinism.",
        options: [
          { value: "A", label: "Compilers do not implement malloc in C" },
          { value: "B", label: "Heap fragmentation can lead to unpredictable allocation failures and non-deterministic latency" },
          { value: "C", label: "RAM memory cannot store pointers" },
          { value: "D", label: "Dynamic memory increases CPU clock jitter" }
        ],
        correct: "B",
        explanation: "Heap fragmentation can cause malloc to fail unpredictably in long-running safety-critical automotive/aerospace firmware."
      },
      {
        id: 10,
        category: "Power Management",
        difficulty: "Intermediate",
        question: "What hardware mechanism is commonly used to wake an ultra-low-power MCU from Deep Sleep mode?",
        description: "Battery-operated IoT device design.",
        options: [
          { value: "A", label: "An external GPIO edge interrupt or low-power Real-Time Clock (RTC) timer alarm" },
          { value: "B", label: "Continuous polling in a while(1) loop" },
          { value: "C", label: "Increasing system core voltage" },
          { value: "D", label: "Overclocking the main PLL" }
        ],
        correct: "A",
        explanation: "Deep sleep shuts down high-speed clocks; waking relies on external GPIO pin transitions or ultra-low-power RTC alarms."
      },
      {
        id: 11,
        category: "Embedded C",
        difficulty: "Intermediate",
        question: "What does the bitwise expression `REG |= (1 << 5);` accomplish on a microcontroller register?",
        description: "Bit manipulation in driver development.",
        options: [
          { value: "A", label: "Clears bit 5 to 0" },
          { value: "B", label: "Sets bit 5 to 1 without altering any other bits" },
          { value: "C", label: "Toggles all bits in the register" },
          { value: "D", label: "Shifts the entire register 5 positions right" }
        ],
        correct: "B",
        explanation: "The bitwise OR with mask (1 << 5) sets bit 5 high while keeping all other bits unchanged."
      },
      {
        id: 12,
        category: "Sensors & ADC",
        difficulty: "Intermediate",
        question: "What is the quantization resolution of a 12-bit Analog-to-Digital Converter (ADC) operating at 3.3V reference?",
        description: "Analog signal digitization.",
        options: [
          { value: "A", label: "3.3V / 256 = ~12.89 mV" },
          { value: "B", label: "3.3V / 4096 = ~0.806 mV per LSB step" },
          { value: "C", label: "3.3V / 1024 = ~3.22 mV" },
          { value: "D", label: "3.3V / 65536 = ~0.05 mV" }
        ],
        correct: "B",
        explanation: "12-bit ADC has 2^12 = 4096 discrete quantization steps, yielding ~0.806 mV per step."
      },
      {
        id: 13,
        category: "Bootloader & Firmware",
        difficulty: "Advanced",
        question: "How does an Over-The-Air (OTA) dual-bank flash bootloader ensure firmware update safety against power loss?",
        description: "Failsafe firmware upgrades.",
        options: [
          { value: "A", label: "It downloads code into RAM and never writes to flash" },
          { value: "B", label: "It writes new firmware into a secondary inactive flash bank; only after CRC validation is the boot pointer switched" },
          { value: "C", label: "It requires manual button reset during flash burn" },
          { value: "D", label: "It disables the watchdog timer permanently" }
        ],
        correct: "B",
        explanation: "A dual-bank bootloader verifies new firmware integrity before updating the boot vector, ensuring fallback if interrupted."
      },
      {
        id: 14,
        category: "Watchdog Timer",
        difficulty: "Beginner",
        question: "What is the primary function of an Independent Watchdog (IWDG) timer in an embedded system?",
        description: "System reliability and fault tolerance.",
        options: [
          { value: "A", label: "To measure external ambient temperature" },
          { value: "B", label: "To reset the microcontroller automatically if the software crashes or hangs in an infinite loop" },
          { value: "C", label: "To synchronize real-time clock timestamps" },
          { value: "D", label: "To count total system uptime hours" }
        ],
        correct: "B",
        explanation: "The watchdog resets the MCU if the firmware fails to periodically 'kick/feed' it before its countdown expires."
      },
      {
        id: 15,
        category: "PCB & Signal Integrity",
        difficulty: "Intermediate",
        question: "Why should bypass / decoupling capacitors (e.g. 100nF) be placed as close as possible to microcontroller VDD/VSS pins?",
        description: "High-frequency noise filtering on hardware layouts.",
        options: [
          { value: "A", label: "To reduce trace inductance and provide instantaneous charge during fast CMOS switching transients" },
          { value: "B", label: "To protect the MCU against reverse battery polarity" },
          { value: "C", label: "To act as backup batteries for long-term power outages" },
          { value: "D", label: "To increase system operating temperature" }
        ],
        correct: "A",
        explanation: "Proximity minimizes PCB trace parasitic inductance, suppressing power rail voltage dips during digital switching."
      }
    ],
    roadmap: [
      {
        id: "step-emb-fund",
        title: "Embedded C & Bare-Metal Driver Architecture",
        skill: "Embedded C & Registers",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Pointers, memory mapped registers, bit manipulation, and bare-metal GPIO/UART drivers.",
        reason: "Core foundation for writing firmwares on ARM microcontrollers.",
        prerequisiteId: null
      },
      {
        id: "step-emb-arm",
        title: "ARM Cortex-M Architecture & Timers",
        skill: "STM32 & NVIC Interrupts",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 50,
        desc: "NVIC interrupts, hardware timers, PWM generation, and DMA data transfer.",
        reason: "Industry standard microcontroller architecture across automotive and IoT.",
        prerequisiteId: "step-emb-fund"
      },
      {
        id: "step-emb-rtos",
        title: "FreeRTOS Kernel & Multitasking",
        skill: "FreeRTOS Tasks & Mutexes",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Task scheduling, semaphores, message queues, software timers, and priority inheritance.",
        reason: "Highest identified skill gap (22%) for embedded industry roles.",
        prerequisiteId: "step-emb-arm"
      },
      {
        id: "step-emb-can",
        title: "Automotive CAN Bus & Diagnostics",
        skill: "CAN 2.0B Protocol",
        duration: "2 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "CAN bus transceivers, message arbitration, error frames, and OBD-II diagnostics.",
        reason: "Closes 20% gap in automotive electronics qualification.",
        prerequisiteId: "step-emb-rtos"
      },
      {
        id: "step-emb-capstone",
        title: "Industrial Telemetry & RTOS Controller Capstone",
        skill: "Full Hardware/Firmware Integration",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Build a FreeRTOS-powered vehicle telemetry unit transmitting sensor data over CAN bus with SD card blackbox logging.",
        reason: "Verified hardware project credential for premier tier-1 engineering placement.",
        prerequisiteId: "step-emb-can"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-ece-1",
        title: "Automotive CAN Bus Telemetry Logger",
        domain: "Electronics & Communication",
        industryContext: "Deployed in Electric Vehicles (Tata Motors, Ather, Tesla) to capture drivetrain telemetry and battery pack cell voltages.",
        tools: "STM32 Nucleo / ESP32, MCP2515 CAN controller, Logic Analyzer, Saleae Logic",
        deliverables: "Firmware source code (.c/.h), CAN bus packet capture log, PCB schematic in KiCAD",
        difficulty: "Advanced"
      },
      {
        id: "exp-ece-2",
        title: "Deterministic FreeRTOS Sensor Hub with DMA",
        domain: "Electronics & Communication",
        industryContext: "Used in industrial robotics (Bosch, ABB) for sub-millisecond sensor acquisition without CPU stall.",
        tools: "ARM Cortex-M4, I2C/SPI IMU sensor, FreeRTOS, Segger SystemView",
        deliverables: "RTOS task trace profiling report, DMA circular buffer driver, jitter benchmark",
        difficulty: "Intermediate"
      }
    ],
    opportunities: [
      {
        id: "opp-ece-1",
        category: "Internship",
        role: "Embedded Firmware Engineer Intern",
        company: "Bosch Global Software Technologies",
        location: "Bangalore / Coimbatore",
        duration: "6 Months",
        stipend: "₹35,000 / month",
        experience: "Pre-final / Final Year ECE/EEE",
        source: "SkillBridge Direct",
        deadline: "25 Oct 2026",
        matchPercentage: 87,
        potentialMatchPercentage: 96,
        logoBg: "bg-red-600 text-white",
        tags: ["Embedded C", "STM32", "CAN Bus", "FreeRTOS"],
        matchingSkills: [
          { skill: "Embedded C", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Microcontrollers", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "FreeRTOS", studentScore: 58, requiredScore: 75, gap: 17, impact: "+9% match boost" }
        ],
        recommendation: "Complete FreeRTOS task scheduling module to unlock interview fast-track."
      },
      {
        id: "opp-ece-2",
        category: "Job",
        role: "Junior Firmware Engineer",
        company: "Qualcomm India",
        location: "Hyderabad",
        duration: "Full-Time",
        stipend: "₹9.5 – 14.0 LPA",
        experience: "0–1 Years / Freshers",
        source: "SkillBridge Core Partner",
        deadline: "02 Nov 2026",
        matchPercentage: 81,
        potentialMatchPercentage: 92,
        logoBg: "bg-blue-800 text-white",
        tags: ["ARM Cortex-M", "C/C++", "Device Drivers", "UART/SPI"],
        matchingSkills: [
          { skill: "Embedded C", studentScore: 85, requiredScore: 80, status: "Met" },
          { skill: "Communication Protocols", studentScore: 78, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "RTOS Kernel Internals", studentScore: 58, requiredScore: 80, gap: 22, impact: "+11% match boost" }
        ],
        recommendation: "Demonstrate FreeRTOS project with logic analyzer screenshots on your Skill Passport."
      },
      {
        id: "opp-ece-3",
        category: "Startup",
        role: "Embedded & IoT Hardware Engineer",
        company: "Ather Energy Hardware Labs",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹7.0 – 10.5 LPA",
        experience: "Freshers with hands-on microcontroller projects",
        source: "SkillBridge EV Network",
        deadline: "12 Nov 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 94,
        logoBg: "bg-emerald-600 text-white",
        tags: ["CAN Bus", "Battery Management", "C/C++", "KiCAD"],
        matchingSkills: [
          { skill: "Microcontrollers", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "CAN Bus Protocol", studentScore: 55, requiredScore: 75, gap: 20, impact: "+10% match boost" }
        ],
        recommendation: "Finish the CAN bus automotive telemetry project in roadmap."
      },
      {
        id: "opp-ece-4",
        category: "Government",
        role: "Scientist / Engineer 'SC' (Electronics)",
        company: "DRDO / Defence Avionics Research (DARE)",
        location: "Bangalore",
        duration: "Gazetted Officer Cadre",
        stipend: "Level 10 Pay Matrix (₹56,100 + DA + HRA)",
        experience: "B.Tech ECE with minimum 65% aggregate",
        source: "RAC DRDO Recruitment",
        deadline: "20 Nov 2026",
        matchPercentage: 82,
        potentialMatchPercentage: 91,
        logoBg: "bg-amber-600 text-white",
        tags: ["Digital Electronics", "Microprocessors", "Signal Processing", "C"],
        matchingSkills: [
          { skill: "Embedded C", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Hardware Debugging", studentScore: 86, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Avionics Communication Standards", studentScore: 45, requiredScore: 70, gap: 25, impact: "+9% match boost" }
        ],
        recommendation: "Review MIL-STD-1553 and ARINC-429 avionics bus standards."
      }
    ]
  },

  // ==========================================
  // 4. POWER SYSTEMS ENGINEER (EEE)
  // ==========================================
  "Power Systems Engineer": {
    roleName: "Power Systems Engineer",
    domainId: "eee",
    domainName: "Electrical & Electronics",
    category: "Core Engineering & Hardware",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    readinessScore: 79,
    scoreDelta: "+5% from last month",
    readinessStatus: "Approaching Target",
    readinessBreakdown: [
      { name: "Power Grid & Transmission", score: 84, desc: "Load flow analysis, Gauss-Seidel, Newton-Raphson, fault analysis" },
      { name: "Power Electronics", score: 80, desc: "Inverters, DC-DC converters, MPPT algorithms, PWM switching" },
      { name: "Simulation Tools", score: 72, desc: "MATLAB/Simulink, PSCAD, ETAP grid simulation" },
      { name: "Renewable & EV Integration", score: 68, desc: "Solar PV microgrids, wind generation, battery energy storage" },
      { name: "Protective Relaying", score: 82, desc: "Numerical relays, differential protection, overcurrent coordination" }
    ],
    readinessSummary: "Strong theoretical electrical machines and power transmission knowledge. Expanding MATLAB/Simulink grid modeling and ETAP short-circuit simulation will achieve 90%+ readiness.",
    skillGaps: [
      {
        id: "gap-etap",
        name: "ETAP & Power Grid Simulation",
        current: 55,
        required: 80,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "ETAP Load Flow, Short Circuit, and Relay Coordination Modeling",
        duration: "3 weeks",
        roadmapStepId: "step-eee-etap"
      },
      {
        id: "gap-mppt",
        name: "Solar MPPT & Inverter Controls",
        current: 60,
        required: 75,
        gap: 15,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "MATLAB Simulink Perturb & Observe MPPT and grid-tied inverter design",
        duration: "2 weeks",
        roadmapStepId: "step-eee-solar"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Power Transmission",
        difficulty: "Intermediate",
        question: "In numerical load flow studies, which iterative method exhibits quadratic convergence near the solution?",
        description: "Power system analysis mathematical methods.",
        options: [
          { value: "A", label: "Gauss-Seidel Method — exhibits slow linear convergence" },
          { value: "B", label: "Newton-Raphson Method — exhibits fast quadratic convergence using Jacobian matrix" },
          { value: "C", label: "Euler's Method" },
          { value: "D", label: "Runge-Kutta 4th Order" }
        ],
        correct: "B",
        explanation: "Newton-Raphson achieves quadratic convergence using the Jacobian matrix, making it standard for large power networks."
      },
      {
        id: 2,
        category: "Power Electronics",
        difficulty: "Intermediate",
        question: "What is the primary function of Maximum Power Point Tracking (MPPT) algorithms in solar photovoltaic systems?",
        description: "Renewable energy power conversion.",
        options: [
          { value: "A", label: "To mechanically rotate solar panels towards the sun" },
          { value: "B", label: "To dynamically adjust the converter duty cycle so the PV array operates at its peak electrical power output" },
          { value: "C", label: "To convert alternating current into direct current" },
          { value: "D", label: "To disconnect the array during cloud cover" }
        ],
        correct: "B",
        explanation: "MPPT continuously tracks the non-linear I-V curve to extract maximum possible wattage under varying irradiance and temperature."
      },
      {
        id: 3,
        category: "Grid Protection",
        difficulty: "Intermediate",
        question: "Which protection scheme is primarily used for power transformers to detect internal winding faults based on Kirchhoff's current law?",
        description: "Protective relaying fundamentals.",
        options: [
          { value: "A", label: "Differential Protection (Percentage Biased Differential Relay)" },
          { value: "B", label: "Simple Overcurrent Relay" },
          { value: "C", label: "Under-frequency relay" },
          { value: "D", label: "Reverse power relay" }
        ],
        correct: "A",
        explanation: "Differential protection compares currents entering and leaving the protected zone; any discrepancy triggers an immediate trip."
      },
      {
        id: 4,
        category: "Electrical Machines",
        difficulty: "Beginner",
        question: "Why do 3-phase induction motors draw 5 to 7 times their full-load current during direct-on-line (DOL) startup?",
        description: "Motor starting transients.",
        options: [
          { value: "A", label: "Because rotor slip is s = 1 at standstill, making the rotor appear as a short-circuited secondary" },
          { value: "B", label: "Because the power factor is near 1.0" },
          { value: "C", label: "Because the stator winding resistance is infinite" },
          { value: "D", label: "Because the mechanical load is decoupled" }
        ],
        correct: "A",
        explanation: "At standstill slip is 1; with zero back-EMF, the rotor acts like a shorted transformer secondary causing high inrush current."
      },
      {
        id: 5,
        category: "Transmission Phenomena",
        difficulty: "Intermediate",
        question: "What is the Ferranti Effect observed on long, lightly loaded extra-high-voltage (EHV) transmission lines?",
        description: "Line capacitance and voltage profiles.",
        options: [
          { value: "A", label: "The receiving end voltage becomes higher than the sending end voltage due to line charging capacitance" },
          { value: "B", label: "The line conductor melts from high resistance" },
          { value: "C", label: "Frequency drops to zero at the receiving substation" },
          { value: "D", label: "Corona discharge ceases entirely" }
        ],
        correct: "A",
        explanation: "The charging current drawn by line shunt capacitance through series inductance causes receiving-end voltage rise."
      },
      {
        id: 6,
        category: "Smart Grid & SCADA",
        difficulty: "Intermediate",
        question: "What communication protocol is globally standardized under IEC 61850 for high-speed substation automation GOOSE messaging?",
        description: "Modern smart grid telecontrol.",
        options: [
          { value: "A", label: "IEC 61850 GOOSE (Generic Object Oriented Substation Events) over Ethernet layer 2" },
          { value: "B", label: "Standard HTTP REST API" },
          { value: "C", label: "Bluetooth Low Energy" },
          { value: "D", label: "Modbus RTU over RS-232" }
        ],
        correct: "A",
        explanation: "IEC 61850 GOOSE bypasses IP stack to transmit trip commands in under 4ms directly over Ethernet multicast."
      },
      {
        id: 7,
        category: "Power Factor Correction",
        difficulty: "Beginner",
        question: "Why do electrical utilities impose penalties on industrial consumers operating with low lagging power factors?",
        description: "Reactive power management.",
        options: [
          { value: "A", label: "Low power factor increases line current, causing higher I²R transmission losses and equipment overloading" },
          { value: "B", label: "It lowers the operating frequency of the national grid" },
          { value: "C", label: "It causes generators to spin in reverse" },
          { value: "D", label: "It discharges substation battery banks" }
        ],
        correct: "A",
        explanation: "Lagging reactive demand demands higher current for the same real power, escalating thermal line losses and voltage drop."
      },
      {
        id: 8,
        category: "High Voltage Engineering",
        difficulty: "Intermediate",
        question: "What causes Corona Discharge on high-voltage transmission lines, and how is it mitigated?",
        description: "Dielectric breakdown of air.",
        options: [
          { value: "A", label: "Ionization of air when electrostatic field gradient exceeds ~30 kV/cm; mitigated by bundled conductors and larger diameter" },
          { value: "B", label: "Lightning strikes hitting the tower ground wire" },
          { value: "C", label: "Water contamination inside circuit breakers" },
          { value: "D", label: "Over-lubrication of generator bearings" }
        ],
        correct: "A",
        explanation: "When surface electric field intensity exceeds air breakdown strength, ionization causes hiss and glow; bundled conductors reduce surface gradient."
      },
      {
        id: 9,
        category: "Power Electronics",
        difficulty: "Intermediate",
        question: "In a 3-phase full-bridge voltage source inverter (VSI), what is Space Vector PWM (SVPWM) preferred over sinusoidal PWM?",
        description: "Advanced inverter modulation.",
        options: [
          { value: "A", label: "SVPWM increases DC bus voltage utilization by ~15.5% and yields lower harmonic distortion" },
          { value: "B", label: "SVPWM requires no digital microcontrollers" },
          { value: "C", label: "SVPWM eliminates switching losses to 0%" },
          { value: "D", label: "SVPWM only works with lead-acid batteries" }
        ],
        correct: "A",
        explanation: "Space Vector PWM provides superior DC bus utilization (1/√3 higher) with reduced total harmonic distortion."
      },
      {
        id: 10,
        category: "Fault Analysis",
        difficulty: "Advanced",
        question: "Which type of power system fault produces the highest fault current in solidly grounded electrical grids?",
        description: "Symmetrical components and unsymmetrical faults.",
        options: [
          { value: "A", label: "Single Line-to-Ground (SLG) fault" },
          { value: "B", label: "Line-to-Line (L-L) fault" },
          { value: "C", label: "Double Line-to-Ground (L-L-G) fault" },
          { value: "D", label: "Open conductor fault" }
        ],
        correct: "A",
        explanation: "In solidly grounded systems with low zero-sequence impedance, SLG fault currents frequently exceed 3-phase symmetrical fault currents."
      },
      {
        id: 11,
        category: "Electric Vehicles",
        difficulty: "Intermediate",
        question: "Why are Permanent Magnet Synchronous Motors (PMSM) widely chosen for electric vehicle traction over induction motors?",
        description: "EV powertrain engineering.",
        options: [
          { value: "A", label: "Higher power density, superior efficiency across wide torque-speed envelopes, and compact size" },
          { value: "B", label: "They operate directly on 50Hz AC without electronic inverters" },
          { value: "C", label: "They contain zero magnets" },
          { value: "D", label: "They never generate heat" }
        ],
        correct: "A",
        explanation: "PMSMs deliver superior torque density and efficiency, maximizing battery vehicle range."
      },
      {
        id: 12,
        category: "Circuit Breakers",
        difficulty: "Intermediate",
        question: "What insulating medium is most widely used in modern extra-high-voltage (EHV) substation circuit breakers for arc quenching?",
        description: "Switchgear and substation technology.",
        options: [
          { value: "A", label: "Sulfur Hexafluoride (SF6) gas" },
          { value: "B", label: "Mineral transformer oil" },
          { value: "C", label: "Compressed ambient air" },
          { value: "D", label: "Distilled water" }
        ],
        correct: "A",
        explanation: "SF6 has extraordinary electronegative dielectric strength and rapid thermal arc extinguishing properties."
      },
      {
        id: 13,
        category: "Grid Stability",
        difficulty: "Advanced",
        question: "What does the Equal Area Criterion determine in single-machine infinite-bus (SMIB) power system analysis?",
        description: "Transient rotor angle stability.",
        options: [
          { value: "A", label: "Transient stability during and following a severe fault based on accelerating vs decelerating power areas" },
          { value: "B", label: "Substation copper grounding grid surface area" },
          { value: "C", label: "Solar panel square meter roof footprint" },
          { value: "D", label: "Transmission tower span length" }
        ],
        correct: "A",
        explanation: "The Equal Area Criterion determines whether the decelerating area can absorb the kinetic energy gained during acceleration to maintain synchronism."
      },
      {
        id: 14,
        category: "Battery Energy Storage",
        difficulty: "Intermediate",
        question: "What is the primary role of a Battery Management System (BMS) in grid-scale or EV battery packs?",
        description: "Electrochemical energy storage safety.",
        options: [
          { value: "A", label: "State-of-charge (SOC) estimation, cell voltage balancing, temperature monitoring, and overcurrent protection" },
          { value: "B", label: "Generating AC electricity directly without inverters" },
          { value: "C", label: "Increasing the battery weight" },
          { value: "D", label: "Replacing copper cables with wireless power" }
        ],
        correct: "A",
        explanation: "BMS monitors cell temperatures, state of charge, balances cell voltages, and isolates the pack during thermal runaway threats."
      },
      {
        id: 15,
        category: "Renewable Integration",
        difficulty: "Intermediate",
        question: "What is 'Duck Curve' phenomenon encountered by power grid operators with high penetration of solar generation?",
        description: "Daily net load profiles and ramping.",
        options: [
          { value: "A", label: "Deep midday drop in net thermal generation load followed by a steep evening ramp when solar drops as demand peaks" },
          { value: "B", label: "Bird migration interference with wind turbines" },
          { value: "C", label: "Seasonal hydroelectric reservoir flooding" },
          { value: "D", label: "Overvoltage during morning lightning storms" }
        ],
        correct: "A",
        explanation: "Midday solar suppresses net demand, followed by an aggressive ramp requirement for thermal/peaker plants as evening demand peaks."
      }
    ],
    roadmap: [
      {
        id: "step-eee-fund",
        title: "Transmission Line & Load Flow Modeling",
        skill: "Power System Analysis",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Admittance matrix (Y-bus), Gauss-Seidel, Newton-Raphson, and symmetric fault calculations.",
        reason: "Core foundation of electrical power transmission engineering.",
        prerequisiteId: null
      },
      {
        id: "step-eee-etap",
        title: "Substation Design & ETAP Simulation",
        skill: "ETAP Grid Simulation",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 40,
        desc: "Single line diagram design, short circuit calculations (IEC 60909), and relay coordination curves.",
        reason: "Highest gap (25%) identified for power engineering consultancy roles.",
        prerequisiteId: "step-eee-fund"
      },
      {
        id: "step-eee-solar",
        title: "Renewable Energy & Solar Inverter Controls",
        skill: "MATLAB / Simulink MPPT",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "PV array modeling, Perturb & Observe MPPT, Space Vector PWM inverter, and LCL filter design.",
        reason: "Closes 15% gap in renewable grid integration.",
        prerequisiteId: "step-eee-etap"
      },
      {
        id: "step-eee-protection",
        title: "Microprocessor Numerical Protection Relaying",
        skill: "Substation Automation",
        duration: "2 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Overcurrent, distance (Mho), differential protection, and IEC 61850 substation standards.",
        reason: "Required for utility transmission operator roles.",
        prerequisiteId: "step-eee-solar"
      },
      {
        id: "step-eee-capstone",
        title: "Grid-Connected Hybrid Solar-Battery Microgrid Capstone",
        skill: "Comprehensive System Design",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Simulate a 1 MW industrial microgrid with solar PV, battery storage, and seamless islanding control in MATLAB/Simulink.",
        reason: "Verified capstone credential for power PSU and renewable EPC placements.",
        prerequisiteId: "step-eee-protection"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-eee-1",
        title: "1MW Solar-Battery Microgrid Inverter Simulation in MATLAB",
        domain: "Electrical & Electronics",
        industryContext: "Designed by Tata Power Solar and Adani Green to stabilize renewable output on distribution feeders.",
        tools: "MATLAB / Simulink, Simscape Electrical, MPPT Control Blocks",
        deliverables: "Simulink model (.slx), voltage THD harmonic analysis report, islanding transition waveform",
        difficulty: "Advanced"
      },
      {
        id: "exp-eee-2",
        title: "Substation Protection Coordination & Short-Circuit Analysis in ETAP",
        domain: "Electrical & Electronics",
        industryContext: "Standard workflow in EPC consulting (Schneider, L&T Electrical) to prevent catastrophic transformer arc-flashes.",
        tools: "ETAP 20.0, IEEE 1584 Arc Flash Standards, Overcurrent Relay Library",
        deliverables: "ETAP project file, Time-Current Characteristic (TCC) curve graph, Arc-flash risk assessment",
        difficulty: "Intermediate"
      }
    ],
    opportunities: [
      {
        id: "opp-eee-1",
        category: "Internship",
        role: "Power Systems Simulation Intern",
        company: "Schneider Electric R&D",
        location: "Bangalore",
        duration: "6 Months",
        stipend: "₹30,000 / month",
        experience: "Pre-final / Final Year EEE",
        source: "SkillBridge Direct",
        deadline: "22 Oct 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 94,
        logoBg: "bg-emerald-700 text-white",
        tags: ["ETAP", "MATLAB", "Power Electronics", "Relays"],
        matchingSkills: [
          { skill: "Power Grid", studentScore: 84, requiredScore: 75, status: "Met" },
          { skill: "Power Electronics", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "ETAP Modeling", studentScore: 55, requiredScore: 75, gap: 20, impact: "+9% match boost" }
        ],
        recommendation: "Complete the ETAP substation short-circuit module in your roadmap."
      },
      {
        id: "opp-eee-2",
        category: "Job",
        role: "Graduate Engineer Trainee (Electrical)",
        company: "L&T Construction (Power Transmission & Distribution)",
        location: "Chennai / Pan-India",
        duration: "Full-Time",
        stipend: "₹6.0 – 8.5 LPA",
        experience: "Freshers / 2026 Batch",
        source: "Campus Hiring Partner",
        deadline: "30 Oct 2026",
        matchPercentage: 82,
        potentialMatchPercentage: 91,
        logoBg: "bg-blue-900 text-white",
        tags: ["Substations", "Switchgear", "Load Flow", "Protection"],
        matchingSkills: [
          { skill: "Power Grid & Transmission", studentScore: 84, requiredScore: 75, status: "Met" },
          { skill: "Protective Relaying", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "ETAP Simulation", studentScore: 55, requiredScore: 75, gap: 20, impact: "+9% match boost" }
        ],
        recommendation: "Submit your ETAP relay coordination report on your Skill Passport."
      },
      {
        id: "opp-eee-3",
        category: "Startup",
        role: "EV Powertrain & BMS Validation Engineer",
        company: "Exponent Energy (Fast-Charging EV)",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹7.5 – 11.0 LPA",
        experience: "Freshers with battery/inverter simulation experience",
        source: "SkillBridge EV Network",
        deadline: "08 Nov 2026",
        matchPercentage: 80,
        potentialMatchPercentage: 93,
        logoBg: "bg-amber-600 text-white",
        tags: ["Battery Management", "Simulink", "Power Converters", "CAN"],
        matchingSkills: [
          { skill: "Power Electronics", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "BMS State Estimation", studentScore: 50, requiredScore: 75, gap: 25, impact: "+13% match boost" }
        ],
        recommendation: "Review Kalman filter SoC estimation in the EV module."
      },
      {
        id: "opp-eee-4",
        category: "Government",
        role: "Executive Trainee (Electrical)",
        company: "Power Grid Corporation of India (POWERGRID) / NTPC",
        location: "Gurugram / Substation Sites",
        duration: "Maharatna PSU Cadre",
        stipend: "E-2 Grade (₹50,000 – ₹1,60,000 + Perquisites)",
        experience: "B.Tech Electrical with valid GATE / SkillBridge Score",
        source: "National PSU Recruitment",
        deadline: "18 Nov 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-blue-800 text-white",
        tags: ["Power Systems", "EHV Transmission", "Electrical Machines", "Protection"],
        matchingSkills: [
          { skill: "Power Grid & Transmission", studentScore: 84, requiredScore: 75, status: "Met" },
          { skill: "Protective Relaying", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "HVDC & FACTS Controllers", studentScore: 50, requiredScore: 70, gap: 20, impact: "+8% match boost" }
        ],
        recommendation: "Take the High Voltage Direct Current (HVDC) module."
      }
    ]
  },

  // ==========================================
  // 5. MECHANICAL DESIGN ENGINEER (MECHANICAL)
  // ==========================================
  "Mechanical Design Engineer": {
    roleName: "Mechanical Design Engineer",
    domainId: "mech",
    domainName: "Mechanical Engineering",
    category: "Core Engineering & Hardware",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
    readinessScore: 81,
    scoreDelta: "+5% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "3D CAD Modeling", score: 88, desc: "Parametric solid & surface modeling in SolidWorks, CATIA" },
      { name: "Finite Element Analysis (FEA)", score: 72, desc: "Structural stress, modal, thermal analysis in ANSYS" },
      { name: "GD&T & Drafting", score: 85, desc: "ASME Y14.5 Geometric Dimensioning & Tolerancing, fit tolerances" },
      { name: "Manufacturing Processes", score: 80, desc: "DFM / DFA, CNC machining, injection molding, sheet metal" },
      { name: "Materials Engineering", score: 78, desc: "Stress-strain curves, fatigue limits, alloy selection" }
    ],
    readinessSummary: "Exceptional 3D parametric CAD modeling and GD&T drafting precision. Deepening non-linear ANSYS FEA stress simulation will elevate readiness to 92%.",
    skillGaps: [
      {
        id: "gap-ansys",
        name: "ANSYS FEA Structural Simulation",
        current: 56,
        required: 80,
        gap: 24,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "ANSYS Mechanical mesh convergence, von Mises stress, and fatigue life analysis",
        duration: "3 weeks",
        roadmapStepId: "step-mech-ansys"
      },
      {
        id: "gap-dfm",
        name: "Design for Manufacturing (DFM/DFA)",
        current: 65,
        required: 80,
        gap: 15,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "Draft angles, wall thickness consistency for plastic injection molding and die casting",
        duration: "2 weeks",
        roadmapStepId: "step-mech-dfm"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Geometric Dimensioning & Tolerancing (GD&T)",
        difficulty: "Intermediate",
        question: "In ASME Y14.5 standards, what does the True Position tolerance with Maximum Material Condition (MMC) symbol Ⓜ allow?",
        description: "Inspection and tolerance stack-up analysis.",
        options: [
          { value: "A", label: "Bonus tolerance: as the manufactured hole departs from MMC towards LMC, the positional tolerance increases proportionally" },
          { value: "B", label: "The hole must be drilled with zero tolerance strictly" },
          { value: "C", label: "The part must be manufactured from carbon steel exclusively" },
          { value: "D", label: "The surface finish must be polished to mirror sheen" }
        ],
        correct: "A",
        explanation: "MMC modifier grants bonus tolerance equal to the departure from maximum material size, lowering manufacturing reject rates."
      },
      {
        id: 2,
        category: "Finite Element Analysis (FEA)",
        difficulty: "Intermediate",
        question: "Why is 'von Mises equivalent stress' widely compared against yield strength for ductile metals under multiaxial loading?",
        description: "Failure theories in mechanics of materials.",
        options: [
          { value: "A", label: "It is based on Maximum Distortion Energy theory, which accurately predicts yielding in ductile materials" },
          { value: "B", label: "It measures the temperature increase inside the metal" },
          { value: "C", label: "It calculates brittle fracture in ceramics only" },
          { value: "D", label: "It eliminates the need for safety factors" }
        ],
        correct: "A",
        explanation: "Von Mises distortion energy criterion accurately models yielding in ductile metals subjected to complex multi-axial tension/shear."
      },
      {
        id: 3,
        category: "Manufacturing Processes",
        difficulty: "Intermediate",
        question: "Why must plastic injection-molded parts incorporate consistent wall thickness and draft angles (1°–3°)?",
        description: "Design for Injection Molding (DFM).",
        options: [
          { value: "A", label: "Consistent walls prevent differential shrinkage sink marks, while draft angles allow clean part ejection from mold cavities" },
          { value: "B", label: "To make the plastic transparent" },
          { value: "C", label: "To increase part weight" },
          { value: "D", label: "To enable painting without primer" }
        ],
        correct: "A",
        explanation: "Uniform thickness avoids cooling sink marks/warpage; draft angles prevent frictional binding during mold opening."
      },
      {
        id: 4,
        category: "Materials & Fatigue",
        difficulty: "Intermediate",
        question: "What is the 'Endurance Limit' (Fatigue Limit) of ferrous metals on an S-N curve?",
        description: "Dynamic fatigue life analysis.",
        options: [
          { value: "A", label: "The stress level below which the material can endure infinite cyclic load reversals without fatigue failure" },
          { value: "B", label: "The ultimate tensile strength at 1000°C" },
          { value: "C", label: "The load required to fracture the part on the first impact" },
          { value: "D", label: "The point where the material melts" }
        ],
        correct: "A",
        explanation: "Ferrous steels exhibit a distinct horizontal plateau on the S-N curve; stresses below this limit cause no fatigue failure."
      },
      {
        id: 5,
        category: "CAD Modeling",
        difficulty: "Beginner",
        question: "In parametric 3D CAD (e.g. SolidWorks), what is the best practice for sketch constraints before applying 3D features?",
        description: "Parametric stability.",
        options: [
          { value: "A", label: "Leave sketches blue and unconstrained for maximum flexibility" },
          { value: "B", label: "Ensure all sketches are fully defined (black) using geometric relations and explicit dimensions" },
          { value: "C", label: "Never use centerlines or symmetry" },
          { value: "D", label: "Delete sketch dimensions before extruding" }
        ],
        correct: "B",
        explanation: "Fully defined sketches prevent accidental geometry distortion when downstream model dimensions are modified."
      },
      {
        id: 6,
        category: "Sheet Metal Design",
        difficulty: "Intermediate",
        question: "What is the 'K-factor' in sheet metal bending calculations?",
        description: "Bend allowance and neutral axis shift.",
        options: [
          { value: "A", label: "The ratio of the neutral axis depth to the material sheet thickness (t)" },
          { value: "B", label: "The electrical conductivity of aluminum" },
          { value: "C", label: "The angle of the press brake punch" },
          { value: "D", label: "The cost per kilogram of sheet steel" }
        ],
        correct: "A",
        explanation: "K-factor represents neutral axis displacement inside the bend, essential for calculating accurate flat pattern blank lengths."
      },
      {
        id: 7,
        category: "FEA Mesh Convergence",
        difficulty: "Advanced",
        question: "How does an FEA engineer verify 'Mesh Convergence' in ANSYS structural simulation?",
        description: "Simulation credibility and numerical accuracy.",
        options: [
          { value: "A", label: "Systematically refine the mesh element size until critical stress results change by less than an acceptable threshold (e.g. <3%)" },
          { value: "B", label: "Run the simulation with only 1 massive tetrahedral element" },
          { value: "C", label: "Change the material from steel to rubber" },
          { value: "D", label: "Double the external applied load" }
        ],
        correct: "A",
        explanation: "Mesh convergence demonstrates that discretization error is negligible and numerical stresses have stabilized."
      },
      {
        id: 8,
        category: "Machine Design",
        difficulty: "Intermediate",
        question: "Why is a deep groove ball bearing poorly suited for heavy axial thrust loads compared to a tapered roller bearing?",
        description: "Bearing selection and contact mechanics.",
        options: [
          { value: "A", label: "Deep groove ball bearings have point contact and small contact angles, while tapered rollers have line contact angled for high radial and thrust loads" },
          { value: "B", label: "Ball bearings cannot rotate faster than 100 RPM" },
          { value: "C", label: "Tapered rollers are made of plastic" },
          { value: "D", label: "Ball bearings do not accept oil lubrication" }
        ],
        correct: "A",
        explanation: "Point contact balls carry limited thrust; angled roller line contacts distribute heavy combined radial and axial thrust loads efficiently."
      },
      {
        id: 9,
        category: "Thermodynamics & Heat Transfer",
        difficulty: "Intermediate",
        question: "Which mode of heat transfer governs thermal dissipation across external heatsink fins in an automotive ECU enclosure?",
        description: "Convective heat transfer.",
        options: [
          { value: "A", label: "Thermal conduction through fin metal combined with natural/forced convection into ambient air" },
          { value: "B", label: "Nuclear radiation" },
          { value: "C", label: "Chemical reaction" },
          { value: "D", label: "Electromagnetic induction" }
        ],
        correct: "A",
        explanation: "Heat conducts through the solid aluminum heatsink and dissipates into fluid air via boundary layer convection."
      },
      {
        id: 10,
        category: "Fasteners & Bolted Joints",
        difficulty: "Intermediate",
        question: "What is the primary mechanism that prevents a preloaded bolted joint from loosening under cyclic shear vibrations?",
        description: "Bolted joint clamp force.",
        options: [
          { value: "A", label: "Bolt preload (tension) generating sufficient frictional clamp force between mating flanges" },
          { value: "B", label: "Gluing the bolt with thread tape only" },
          { value: "C", label: "Using bolts that are loose by hand" },
          { value: "D", label: "Painting the bolt head" }
        ],
        correct: "A",
        explanation: "Tightening torque creates bolt elongation preload; the resulting clamping force resists interface slip under shear."
      },
      {
        id: 11,
        category: "Stress Concentrations",
        difficulty: "Beginner",
        question: "Why should sharp internal 90° corners on machined shafts ALWAYS be replaced with generous fillet radii?",
        description: "Stress concentration factor (Kt).",
        options: [
          { value: "A", label: "Sharp corners induce extreme stress concentration factors (Kt), drastically reducing fatigue life and initiating cracks" },
          { value: "B", label: "Sharp corners make the shaft too light" },
          { value: "C", label: "CNC tools cannot physically cut sharp internal corners" },
          { value: "D", label: "Sharp corners cause corrosion" }
        ],
        correct: "A",
        explanation: "Fillets smooth stress flow lines, drastically lowering stress concentration factor Kt and preventing fatigue crack initiation."
      },
      {
        id: 12,
        category: "Mechanisms & Linkages",
        difficulty: "Intermediate",
        question: "According to Grashof's Criterion for a planar 4-bar linkage, what condition guarantees at least one link can fully rotate 360°?",
        description: "Kinematic mechanism synthesis.",
        options: [
          { value: "A", label: "s + l <= p + q (where s is shortest link, l is longest link, p and q are intermediate links)" },
          { value: "B", label: "All four links must have identical lengths" },
          { value: "C", label: "The shortest link must be anchored to ground strictly" },
          { value: "D", label: "The sum of all angles must be 180°" }
        ],
        correct: "A",
        explanation: "Grashof's theorem states continuous relative motion occurs if shortest link plus longest link is less than or equal to the sum of the remaining two."
      },
      {
        id: 13,
        category: "Welding & Metallurgy",
        difficulty: "Intermediate",
        question: "What is the 'Heat Affected Zone' (HAZ) in fusion welded steel assemblies?",
        description: "Metallurgical phase transformations.",
        options: [
          { value: "A", label: "The base metal region adjacent to the weld pool that did not melt, but experienced microstructure and property changes from thermal cycles" },
          { value: "B", label: "The electrode filler rod material" },
          { value: "C", label: "The protective shielding gas cloud" },
          { value: "D", label: "The outer painted chassis surface" }
        ],
        correct: "A",
        explanation: "HAZ experiences grain growth and tempering/hardening without melting, often making it susceptible to hydrogen cracking or embrittlement."
      },
      {
        id: 14,
        category: "Additive Manufacturing",
        difficulty: "Intermediate",
        question: "What is the primary design consideration regarding build orientation in Metal Powder Bed Fusion (DMLS) 3D printing?",
        description: "Design for Additive Manufacturing (DFAM).",
        options: [
          { value: "A", label: "Minimizing overhangs exceeding 45° to reduce support structures and residual thermal stress warpage" },
          { value: "B", label: "Printing parts upside down always" },
          { value: "C", label: "Using wooden support blocks" },
          { value: "D", label: "Printing at room temperature without lasers" }
        ],
        correct: "A",
        explanation: "Surfaces beyond 45° require support structures; orientation affects thermal dissipation, post-machining, and anisotropic tensile strength."
      },
      {
        id: 15,
        category: "Tribology & Lubrication",
        difficulty: "Intermediate",
        question: "On the Stribeck Curve, which lubrication regime provides complete fluid film separation between sliding surfaces with minimal wear?",
        description: "Hydrodynamic bearing lubrication.",
        options: [
          { value: "A", label: "Hydrodynamic (Full Film) Lubrication" },
          { value: "B", label: "Boundary Lubrication (metal-to-metal asperities contact)" },
          { value: "C", label: "Dry Friction" },
          { value: "D", label: "Zero-viscosity regime" }
        ],
        correct: "A",
        explanation: "In hydrodynamic lubrication, fluid hydrodynamic pressure lifts mating surfaces apart, eliminating metal-to-metal asperity contact."
      }
    ],
    roadmap: [
      {
        id: "step-mech-cad",
        title: "Parametric 3D CAD & Assembly Design",
        skill: "SolidWorks & GD&T",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Complex solid modeling, sheet metal, ASME Y14.5 GD&T drafting, and mechanical motion simulation.",
        reason: "Core prerequisite for mechanical product engineering.",
        prerequisiteId: null
      },
      {
        id: "step-mech-ansys",
        title: "Finite Element Analysis (FEA) in ANSYS",
        skill: "ANSYS Mechanical",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 45,
        desc: "Static structural, mesh convergence, contact pairs, von Mises stress, and modal vibration analysis.",
        reason: "Highest skill gap (24%) identified for tier-1 automotive/aerospace design.",
        prerequisiteId: "step-mech-cad"
      },
      {
        id: "step-mech-dfm",
        title: "Design for Manufacturing & Assembly (DFM/DFA)",
        skill: "Tooling & Injection Molding",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Plastic injection molding design, die casting, CNC machining tool clearance, and cost reduction.",
        reason: "Closes 15% gap in production tooling readiness.",
        prerequisiteId: "step-mech-ansys"
      },
      {
        id: "step-mech-fatigue",
        title: "Fatigue Analysis & Durability Optimization",
        skill: "Life Cycle & Thermal",
        duration: "2 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "High-cycle fatigue, S-N curve modeling, Miner's cumulative damage rule, and thermal heat sink analysis.",
        reason: "Ensures safety-critical mechanical reliability.",
        prerequisiteId: "step-mech-dfm"
      },
      {
        id: "step-mech-capstone",
        title: "Automotive Suspension Knuckle Design & Optimization Capstone",
        skill: "Full Design-to-Simulation Package",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Model a lightweight forged aluminum steering knuckle in SolidWorks, conduct topology optimization in ANSYS, and generate ASME-standard manufacturing drawings.",
        reason: "Verified portfolio deliverable for automotive OEM hiring managers.",
        prerequisiteId: "step-mech-fatigue"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-mech-1",
        title: "Automotive Steering Knuckle Topology Optimization & FEA",
        domain: "Mechanical Engineering",
        industryContext: "Employed in automotive OEM chassis teams (Mahindra, Tata Motors, Porsche) to reduce unsprung mass while sustaining 3G bump braking loads.",
        tools: "SolidWorks, ANSYS Mechanical / Workbench, Topology Optimization module",
        deliverables: "FEA stress report, 25% mass-reduced CAD model (.step), 2D GD&T manufacturing drawing",
        difficulty: "Advanced"
      },
      {
        id: "exp-mech-2",
        title: "High-Volume Plastic Enclosure DFM & Moldflow Simulation",
        domain: "Mechanical Engineering",
        industryContext: "Standard consumer electronics design at Apple, Dyson, and boAt to eliminate weld lines and sinking.",
        tools: "SolidWorks Plastics / Moldflow, DFM Advisor, Injection Tooling specs",
        deliverables: "Moldflow fill time & air trap report, draft angle analysis, parting line CAD export",
        difficulty: "Intermediate"
      }
    ],
    opportunities: [
      {
        id: "opp-mech-1",
        category: "Internship",
        role: "CAD / FEA Mechanical Engineering Intern",
        company: "Collins Aerospace / Raytheon",
        location: "Bangalore",
        duration: "6 Months",
        stipend: "₹32,000 / month",
        experience: "Pre-final / Final Year Mechanical",
        source: "SkillBridge Direct",
        deadline: "24 Oct 2026",
        matchPercentage: 86,
        potentialMatchPercentage: 95,
        logoBg: "bg-blue-800 text-white",
        tags: ["SolidWorks", "ANSYS", "GD&T", "Materials"],
        matchingSkills: [
          { skill: "3D CAD Modeling", studentScore: 88, requiredScore: 80, status: "Met" },
          { skill: "GD&T & Drafting", studentScore: 85, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "ANSYS Structural", studentScore: 56, requiredScore: 75, gap: 19, impact: "+9% match boost" }
        ],
        recommendation: "Complete the ANSYS mesh convergence milestone in your roadmap."
      },
      {
        id: "opp-mech-2",
        category: "Job",
        role: "Junior Mechanical Design Engineer",
        company: "Tata Motors Passenger Vehicles",
        location: "Pune",
        duration: "Full-Time",
        stipend: "₹5.8 – 8.0 LPA",
        experience: "0–1 Years / Freshers",
        source: "Automotive Campus Network",
        deadline: "04 Nov 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 92,
        logoBg: "bg-blue-900 text-white",
        tags: ["CATIA", "DFM", "Chassis Design", "Sheet Metal"],
        matchingSkills: [
          { skill: "3D CAD Modeling", studentScore: 88, requiredScore: 80, status: "Met" },
          { skill: "Manufacturing Processes", studentScore: 80, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "FEA Durability Analysis", studentScore: 56, requiredScore: 75, gap: 19, impact: "+9% match boost" }
        ],
        recommendation: "Attach steering knuckle FEA deliverable to your Digital Skill Passport."
      },
      {
        id: "opp-mech-3",
        category: "Startup",
        role: "Product Mechanical Design Engineer",
        company: "Ultraviolette Automotive (Electric Superbikes)",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹7.0 – 10.0 LPA",
        experience: "Portfolio of custom mechanical fabrication / CAD",
        source: "SkillBridge Startup Network",
        deadline: "10 Nov 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 94,
        logoBg: "bg-slate-900 text-white",
        tags: ["Chassis Modeling", "SolidWorks", "ANSYS", "CNC Tooling"],
        matchingSkills: [
          { skill: "3D CAD Modeling", studentScore: 88, requiredScore: 80, status: "Met" }
        ],
        missingSkills: [
          { skill: "Non-linear FEA", studentScore: 56, requiredScore: 75, gap: 19, impact: "+9% match boost" }
        ],
        recommendation: "Showcase motorcycle swingarm or chassis FEA project."
      },
      {
        id: "opp-mech-4",
        category: "Government",
        role: "Scientist / Engineer 'SC' (Mechanical)",
        company: "Bhabha Atomic Research Centre (BARC) / ISRO VSSC",
        location: "Trivandrum / Mumbai",
        duration: "Gazetted Officer Cadre",
        stipend: "Level 10 Pay Matrix (₹56,100 + Allowances)",
        experience: "B.Tech Mechanical with 65%+ aggregate",
        source: "BARC Central Recruitment",
        deadline: "22 Nov 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 91,
        logoBg: "bg-amber-600 text-white",
        tags: ["Thermodynamics", "Machine Design", "Strength of Materials", "FEA"],
        matchingSkills: [
          { skill: "3D CAD Modeling", studentScore: 88, requiredScore: 75, status: "Met" },
          { skill: "Materials Engineering", studentScore: 78, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Thermal Stress & Pressure Vessels", studentScore: 50, requiredScore: 75, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Review ASME Boiler and Pressure Vessel Code (BPVC) standards."
      }
    ]
  },

  // ==========================================
  // 6. STRUCTURAL & BIM ENGINEER (CIVIL)
  // ==========================================
  "Structural Engineer": {
    roleName: "Structural Engineer",
    domainId: "civil",
    domainName: "Civil Engineering",
    category: "Core Engineering & Hardware",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    readinessScore: 80,
    scoreDelta: "+4% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Structural Analysis & Design", score: 85, desc: "RCC & Steel design per IS 456 / IS 800, limit state method" },
      { name: "ETABS & STAAD.Pro", score: 74, desc: "Multi-story building modeling, seismic & wind analysis" },
      { name: "BIM & Revit", score: 68, desc: "3D structural modeling, clash detection in Autodesk Revit" },
      { name: "Geotechnical & Foundations", score: 82, desc: "Bearing capacity, isolated & raft foundations, settlement" },
      { name: "Codes & Detailing", score: 86, desc: "SP 34 reinforcement detailing, IS 1893 seismic ductility" }
    ],
    readinessSummary: "Solid foundation in limit state RCC design and code compliance. Strengthening 3D BIM clash coordination and ETABS seismic response spectrum analysis will reach 91% readiness.",
    skillGaps: [
      {
        id: "gap-etabs-civil",
        name: "ETABS High-Rise Seismic Analysis",
        current: 58,
        required: 80,
        gap: 22,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "IS 1893:2016 Response Spectrum analysis and shear wall design in ETABS",
        duration: "3 weeks",
        roadmapStepId: "step-civ-etabs"
      },
      {
        id: "gap-revit-bim",
        name: "Autodesk Revit Structural BIM",
        current: 50,
        required: 75,
        gap: 25,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "3D parametric structural modeling and Navisworks clash coordination",
        duration: "3 weeks",
        roadmapStepId: "step-civ-bim"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "RCC Design (IS 456)",
        difficulty: "Intermediate",
        question: "Under IS 456:2000 limit state design of reinforced concrete beams, why is an under-reinforced section strictly mandated over an over-reinforced section?",
        description: "Ductility and warning before catastrophic collapse.",
        options: [
          { value: "A", label: "Steel yields first, providing ductile deflection and visible warning cracks before concrete crushes; over-reinforced concrete crushes suddenly without warning" },
          { value: "B", label: "Under-reinforced beams require zero steel reinforcement" },
          { value: "C", label: "Over-reinforced beams are prohibited by cement manufacturers" },
          { value: "D", label: "Under-reinforced beams cannot support roofs" }
        ],
        correct: "A",
        explanation: "In under-reinforced sections steel reaches yield stress first, exhibiting visible tensile cracks and ductile deformation prior to ultimate failure."
      },
      {
        id: 2,
        category: "Seismic Engineering (IS 1893)",
        difficulty: "Intermediate",
        question: "In seismic design of multi-story buildings per IS 1893:2016, what is the 'Soft Storey' irregularity, and why is it dangerous?",
        description: "Storey stiffness and collapse vulnerability.",
        options: [
          { value: "A", label: "A storey whose lateral stiffness is less than 70% of the storey above, concentrating severe plastic shear demand and triggering collapse (e.g. open ground parking stilts)" },
          { value: "B", label: "A storey constructed using timber or gypsum walls" },
          { value: "C", label: "A penthouse roof terrace" },
          { value: "D", label: "A floor with carpet flooring" }
        ],
        correct: "A",
        explanation: "Stilt ground floors without infill masonry concentrate seismic drift and shear, causing disastrous pancake storey collapses if not heavily reinforced."
      },
      {
        id: 3,
        category: "Building Information Modeling (BIM)",
        difficulty: "Intermediate",
        question: "What is the primary function of Autodesk Navisworks in modern multi-disciplinary BIM construction workflows?",
        description: "Clash detection and 4D schedule simulation.",
        options: [
          { value: "A", label: "Automated clash detection between architectural, structural, and MEP 3D models before physical construction begins" },
          { value: "B", label: "Designing concrete mix proportions" },
          { value: "C", label: "Operating excavator machinery remotely" },
          { value: "D", label: "Calculating land survey GPS coordinates" }
        ],
        correct: "A",
        explanation: "Navisworks aggregates models from Revit, Civil 3D, and MEP to identify spatial interferences (clashes) digitally prior to site pouring."
      },
      {
        id: 4,
        category: "Structural Steel (IS 800)",
        difficulty: "Intermediate",
        question: "In structural steel design per IS 800:2007, what is 'Lateral Torsional Buckling' (LTB) of an unbraced flexural I-beam?",
        description: "Beam stability under major axis bending.",
        options: [
          { value: "A", label: "Simultaneous lateral deflection and twisting of the compression flange when compression exceeds critical buckling stress without adequate lateral bracing" },
          { value: "B", label: "Corrosion of the bottom flange" },
          { value: "C", label: "Shear failure of connection bolts" },
          { value: "D", label: "Thermal expansion of the web plate" }
        ],
        correct: "A",
        explanation: "Compression flanges behave like slender columns; without lateral support, they buckle sideways and twist the beam section."
      },
      {
        id: 5,
        category: "Geotechnical Foundations",
        difficulty: "Intermediate",
        question: "Under Terzaghi's bearing capacity theory, when is a Raft (Mat) Foundation preferred over isolated spread footings?",
        description: "Foundation engineering for low-bearing soils.",
        options: [
          { value: "A", label: "When soil allowable bearing capacity is low and individual isolated footing footprints exceed 50% of the total building plan area" },
          { value: "B", label: "When constructing single-story garden sheds" },
          { value: "C", label: "When soil is solid granite rock" },
          { value: "D", label: "When groundwater table is permanently zero" }
        ],
        correct: "A",
        explanation: "When footings cover >50% of building footprint, combining into a single thick reinforced mat reduces differential settlement and distributes heavy column loads."
      },
      {
        id: 6,
        category: "ETABS Modeling",
        difficulty: "Intermediate",
        question: "Why are concrete slab floors commonly modeled as 'Rigid Diaphragms' in ETABS building models?",
        description: "Lateral load distribution across frames.",
        options: [
          { value: "A", label: "It assumes infinite in-plane stiffness, distributing lateral wind and earthquake forces to vertical shear walls and columns proportional to their stiffness" },
          { value: "B", label: "It makes the building weigh zero kilograms" },
          { value: "C", label: "It removes all columns from the model" },
          { value: "D", label: "It replaces reinforced concrete with glass" }
        ],
        correct: "A",
        explanation: "Rigid diaphragms prevent in-plane slab deformation, distributing horizontal shears to vertical lateral force-resisting elements based on relative rigidity."
      },
      {
        id: 7,
        category: "Concrete Technology",
        difficulty: "Beginner",
        question: "What is the primary risk of adding excessive water to a concrete mix on-site without adding additional cement (high Water-Cement ratio)?",
        description: "Concrete compressive strength and durability.",
        options: [
          { value: "A", label: "Drastic reduction in 28-day compressive strength, increased porosity, and severe drying shrinkage cracking" },
          { value: "B", label: "Concrete sets instantly within 5 seconds" },
          { value: "C", label: "Steel rebar dissolves inside the water" },
          { value: "D", label: "The color turns completely yellow" }
        ],
        correct: "A",
        explanation: "According to Abram's Law, compressive strength is inversely proportional to water-cement ratio; excess water creates capillary voids that weaken concrete."
      },
      {
        id: 8,
        category: "Prestressed Concrete",
        difficulty: "Intermediate",
        question: "What is the fundamental engineering principle behind Post-Tensioned (PT) concrete slabs?",
        description: "High-strength tendons and crack control.",
        options: [
          { value: "A", label: "Tensioning high-strength steel strands after concrete reaches strength introduces pre-compression that cancels out service tensile flexural stresses" },
          { value: "B", label: "Heating the concrete with steam boilers permanently" },
          { value: "C", label: "Using hollow plastic pipes instead of aggregate" },
          { value: "D", label: "Eliminating columns completely from buildings" }
        ],
        correct: "A",
        explanation: "PT pre-compresses bottom tension zones, enabling thinner floor slabs, longer column-free spans, and zero service deflection cracking."
      },
      {
        id: 9,
        category: "Surveying & GIS",
        difficulty: "Beginner",
        question: "What is the primary advantage of Total Station surveying compared to traditional transit theodolites?",
        description: "Electronic distance and angle measurement.",
        options: [
          { value: "A", label: "Electronic Distance Meter (EDM) measures slope distance, horizontal angles, and automatically computes 3D coordinates (X, Y, Z) digitally" },
          { value: "B", label: "Total station does not require a tripod" },
          { value: "C", label: "Total station only works indoors" },
          { value: "D", label: "Total station eliminates gravity" }
        ],
        correct: "A",
        explanation: "A Total Station integrates an electronic theodolite, infrared EDM, and microprocessor data logger for instantaneous 3D topographic surveying."
      },
      {
        id: 10,
        category: "Transportation Engineering",
        difficulty: "Intermediate",
        question: "Why is 'Superelevation' (banking) provided on horizontal highway curves per Indian Roads Congress (IRC)?",
        description: "Vehicle dynamics and centrifugal force.",
        options: [
          { value: "A", label: "To counteract centrifugal force pushing turning vehicles outward, preventing skidding and overturning" },
          { value: "B", label: "To make highways look aesthetically curved" },
          { value: "C", label: "To slow vehicles down to zero speed" },
          { value: "D", label: "To store rainwater in the center" }
        ],
        correct: "A",
        explanation: "Superelevation tilts the outer road edge higher than the inner edge, utilizing gravity component to counteract outward centrifugal force."
      },
      {
        id: 11,
        category: "Hydrology & Water Resources",
        difficulty: "Intermediate",
        question: "In the Rational Formula Q = C * I * A for storm runoff estimation, what does coefficient 'C' represent?",
        description: "Hydraulic drain sizing.",
        options: [
          { value: "A", label: "Runoff coefficient depending on catchment surface impermeability (e.g. 0.9 for asphalt, 0.2 for grass lawns)" },
          { value: "B", label: "Speed of light constant" },
          { value: "C", label: "Cost of stormwater concrete pipes" },
          { value: "D", label: "Pipe diameter in inches" }
        ],
        correct: "A",
        explanation: "C is the dimensionless runoff coefficient indicating the fraction of rainfall converted into surface runoff based on ground cover."
      },
      {
        id: 12,
        category: "Environmental Engineering",
        difficulty: "Intermediate",
        question: "What does Biochemical Oxygen Demand (BOD5) quantify in sewage treatment plant wastewater analysis?",
        description: "Water pollution assessment.",
        options: [
          { value: "A", label: "The amount of dissolved oxygen consumed by aerobic microorganisms to decompose organic matter over 5 days at 20°C" },
          { value: "B", label: "The total volume of plastic debris" },
          { value: "C", label: "The temperature of the incoming wastewater" },
          { value: "D", label: "The acidity pH value strictly" }
        ],
        correct: "A",
        explanation: "BOD5 measures biodegradable organic pollution concentration; higher BOD indicates heavier water contamination."
      },
      {
        id: 13,
        category: "Construction Management",
        difficulty: "Intermediate",
        question: "In Critical Path Method (CPM) project scheduling, what is the definition of the 'Critical Path'?",
        description: "Project management and delay prevention.",
        options: [
          { value: "A", label: "The longest sequence of dependent activities having zero total float; any delay on this path directly delays project completion" },
          { value: "B", label: "The safest walking path for laborers on site" },
          { value: "C", label: "The cheapest path to purchase steel" },
          { value: "D", label: "The shortest path through the job site" }
        ],
        correct: "A",
        explanation: "The critical path dictates minimum total project duration; tasks on it have zero slack and must not be delayed."
      },
      {
        id: 14,
        category: "Retaining Structures",
        difficulty: "Intermediate",
        question: "Under Rankine's earth pressure theory, how does 'Passive Earth Pressure' differ from 'Active Earth Pressure'?",
        description: "Soil mechanics and retaining wall stability.",
        options: [
          { value: "A", label: "Passive pressure occurs when the wall moves toward the backfill compressing it (highest value); active occurs as the wall moves away (lowest value)" },
          { value: "B", label: "Active pressure only occurs in sandy soil" },
          { value: "C", label: "Passive pressure is always zero" },
          { value: "D", label: "There is no physical difference" }
        ],
        correct: "A",
        explanation: "Active pressure develops when retaining wall moves outward allowing soil expansion; passive pressure resists when wall is pushed against soil mass."
      },
      {
        id: 15,
        category: "BIM Dimensions",
        difficulty: "Beginner",
        question: "In Building Information Modeling (BIM) terminology, what does '5D BIM' add to the 3D geometry and 4D time schedule?",
        description: "Modern digital project delivery.",
        options: [
          { value: "A", label: "Cost estimation, quantity take-offs (BOQ), and budget tracking integrated with the model components" },
          { value: "B", label: "Virtual reality glasses for workers" },
          { value: "C", label: "5-dimensional holographic projections" },
          { value: "D", label: "Building temperature sensing only" }
        ],
        correct: "A",
        explanation: "3D is spatial geometry; 4D links construction schedule; 5D integrates real-time cost estimation and quantity take-offs."
      }
    ],
    roadmap: [
      {
        id: "step-civ-rcc",
        title: "Reinforced Concrete & Steel Design (IS Codes)",
        skill: "IS 456 & IS 800 Design",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Limit state design of beams, slabs, columns, footings, and structural steel trusses.",
        reason: "Core foundation of structural civil engineering.",
        prerequisiteId: null
      },
      {
        id: "step-civ-etabs",
        title: "Multi-Storey Structural Analysis in ETABS",
        skill: "ETABS 3D Analysis",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 40,
        desc: "3D frame modeling, gravity load distribution, wind analysis, and IS 1893 response spectrum seismic design.",
        reason: "Highest skill gap (22%) for structural consultancy hiring.",
        prerequisiteId: "step-civ-rcc"
      },
      {
        id: "step-civ-bim",
        title: "Autodesk Revit Structural BIM & Detailing",
        skill: "Revit BIM & Detailing",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "3D parametric structural modeling, rebar schedules, and Navisworks clash coordination.",
        reason: "Closes 25% gap in modern digital engineering office practice.",
        prerequisiteId: "step-civ-etabs"
      },
      {
        id: "step-civ-foundation",
        title: "Advanced Deep Foundations & Geotechnics",
        skill: "Piles & Raft Design",
        duration: "2 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Bored cast-in-situ pile groups, pile caps, raft foundation settlement, and retaining walls in SAFE.",
        reason: "Crucial for infrastructure and high-rise structural engineers.",
        prerequisiteId: "step-civ-bim"
      },
      {
        id: "step-civ-capstone",
        title: "G+15 Commercial Tower Structural & BIM Package Capstone",
        skill: "Complete Building Design Package",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Analyze and design a G+15 commercial tower with dual frame-shear wall system in ETABS, generate BIM structural model in Revit, and produce structural bar bending schedules.",
        reason: "Verified capstone credential for premier civil structural placements.",
        prerequisiteId: "step-civ-foundation"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-civ-1",
        title: "G+15 Commercial Building Seismic Analysis in ETABS",
        domain: "Civil Engineering",
        industryContext: "Standard workflow at L&T Construction, Tata Consulting Engineers (TCE), and WSP for high-rise earthquake engineering in Seismic Zone IV.",
        tools: "CSI ETABS, IS 1893:2016, Response Spectrum Analysis, IS 13920 Ductile Detailing",
        deliverables: "ETABS model (.edb), modal mass participation report, story drift and shear wall reinforcement schedule",
        difficulty: "Advanced"
      },
      {
        id: "exp-civ-2",
        title: "Multi-Disciplinary BIM Clash Detection in Revit & Navisworks",
        domain: "Civil Engineering",
        industryContext: "Deployed across Metro Rail and Airport projects (L&T Metro, Shapoorji Pallonji) to eliminate spatial conflicts before pouring.",
        tools: "Autodesk Revit Structure, Autodesk Navisworks Manage",
        deliverables: "Revit structural model (.rvt), Navisworks clash matrix report (.html), resolved clash viewpoints",
        difficulty: "Intermediate"
      }
    ],
    opportunities: [
      {
        id: "opp-civ-1",
        category: "Internship",
        role: "Structural & BIM Engineering Intern",
        company: "WSP India Structural Center of Excellence",
        location: "Noida / Bangalore",
        duration: "6 Months",
        stipend: "₹28,000 / month",
        experience: "Pre-final / Final Year Civil",
        source: "SkillBridge Direct",
        deadline: "25 Oct 2026",
        matchPercentage: 86,
        potentialMatchPercentage: 95,
        logoBg: "bg-red-700 text-white",
        tags: ["ETABS", "Revit", "IS Codes", "Concrete"],
        matchingSkills: [
          { skill: "Structural Analysis & Design", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Codes & Detailing", studentScore: 86, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "ETABS Seismic Modeling", studentScore: 58, requiredScore: 75, gap: 17, impact: "+9% match boost" }
        ],
        recommendation: "Complete the ETABS seismic response spectrum module in your roadmap."
      },
      {
        id: "opp-civ-2",
        category: "Job",
        role: "Graduate Engineer Trainee (Civil Structures)",
        company: "L&T Heavy Civil Infrastructure",
        location: "Mumbai / Project Sites",
        duration: "Full-Time",
        stipend: "₹6.0 – 8.0 LPA",
        experience: "Freshers / 2026 Batch",
        source: "Campus Hiring Partner",
        deadline: "02 Nov 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 92,
        logoBg: "bg-blue-900 text-white",
        tags: ["ETABS", "STAAD.Pro", "RCC Design", "Site Execution"],
        matchingSkills: [
          { skill: "Structural Analysis & Design", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Geotechnical Foundations", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Revit BIM Clash Detection", studentScore: 50, requiredScore: 75, gap: 25, impact: "+9% match boost" }
        ],
        recommendation: "Submit your G+15 ETABS structural design package on Skill Passport."
      },
      {
        id: "opp-civ-3",
        category: "Startup",
        role: "BIM Specialist & Computational Designer",
        company: "Modulus Housing (Prefabricated Smart Structures)",
        location: "Chennai",
        duration: "Full-Time",
        stipend: "₹6.5 – 9.0 LPA",
        experience: "Freshers with demonstrated 3D Revit models",
        source: "SkillBridge Startup Network",
        deadline: "14 Nov 2026",
        matchPercentage: 82,
        potentialMatchPercentage: 93,
        logoBg: "bg-emerald-600 text-white",
        tags: ["Revit", "BIM 5D", "Prefab Concrete", "Navisworks"],
        matchingSkills: [
          { skill: "Codes & Detailing", studentScore: 86, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Revit BIM Modeling", studentScore: 50, requiredScore: 75, gap: 25, impact: "+11% match boost" }
        ],
        recommendation: "Publish your multi-disciplinary BIM clash model."
      },
      {
        id: "opp-civ-4",
        category: "Government",
        role: "Assistant Executive Engineer (Civil)",
        company: "Central Public Works Department (CPWD) / NHAI",
        location: "Pan-India",
        duration: "Central Engineering Services (UPSC ESE / GATE)",
        stipend: "Level 10 Pay Matrix (₹56,100 + DA + HRA)",
        experience: "B.Tech Civil with valid GATE / ESE Rank",
        source: "UPSC / Govt Recruitment",
        deadline: "25 Nov 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-amber-600 text-white",
        tags: ["RCC", "Steel Structures", "Soil Mechanics", "Highway Engineering"],
        matchingSkills: [
          { skill: "Structural Analysis & Design", studentScore: 85, requiredScore: 75, status: "Met" },
          { skill: "Geotechnical & Foundations", studentScore: 82, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Bridge Design & IRC Standards", studentScore: 45, requiredScore: 70, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Review IRC 112 concrete bridge design standards."
      }
    ]
  },

  // ==========================================
  // 7. BUSINESS ANALYST (MANAGEMENT)
  // ==========================================
  "Business Analyst": {
    roleName: "Business Analyst",
    domainId: "mgmt",
    domainName: "Management & Business",
    category: "Management & Finance",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    readinessScore: 83,
    scoreDelta: "+6% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Requirements Engineering", score: 88, desc: "BRD, FRD, user stories, acceptance criteria, wireframing" },
      { name: "Data & BI Analytics", score: 80, desc: "SQL queries, Power BI / Tableau dashboards, KPI definition" },
      { name: "Process Modeling", score: 84, desc: "BPMN 2.0 workflows, value stream mapping, gap analysis" },
      { name: "Agile & Product Delivery", score: 86, desc: "Scrum ceremonies, sprint backlog, Jira, product roadmapping" },
      { name: "Financial & Business Acumen", score: 76, desc: "ROI calculation, business cases, stakeholder presentations" }
    ],
    readinessSummary: "Outstanding requirements documentation, Jira sprint backlog management, and BPMN workflow modeling. Expanding advanced SQL analytics and financial business cases will boost readiness to 93%.",
    skillGaps: [
      {
        id: "gap-sql-ba",
        name: "SQL for Business Analytics",
        current: 60,
        required: 80,
        gap: 20,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "Complex multi-table joins, subqueries, and window aggregations for KPI extraction",
        duration: "2 weeks",
        roadmapStepId: "step-ba-sql"
      },
      {
        id: "gap-fin-case",
        name: "Financial Modeling & ROI Analysis",
        current: 62,
        required: 75,
        gap: 13,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "Cost-benefit analysis, discounted cash flow (DCF), and ROI justification models in Excel",
        duration: "2 weeks",
        roadmapStepId: "step-ba-roi"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Requirements Engineering",
        difficulty: "Intermediate",
        question: "What is the key distinction between a Business Requirements Document (BRD) and a Functional Requirements Document (FRD)?",
        description: "Software specification artifacts.",
        options: [
          { value: "A", label: "BRD defines high-level business goals and problem statements ('What' and 'Why'); FRD details technical system behaviors and workflows ('How')" },
          { value: "B", label: "BRD is only written for hardware products; FRD is for mobile apps" },
          { value: "C", label: "BRD is written by developers; FRD is written by investors" },
          { value: "D", label: "There is no difference; they are synonymous terms" }
        ],
        correct: "A",
        explanation: "BRD captures stakeholder goals and ROI; FRD translates them into precise system functions for developers and QA."
      },
      {
        id: 2,
        category: "Agile Methodologies",
        difficulty: "Beginner",
        question: "In Scrum, what are the three criteria of the INVEST framework for writing high-quality Agile User Stories?",
        description: "Agile backlog grooming best practices.",
        options: [
          { value: "A", label: "Independent, Negotiable, Valuable, Estimable, Small, Testable" },
          { value: "B", label: "Immediate, Non-negotiable, Validated, Expensive, Specific, Timed" },
          { value: "C", label: "Internal, Networked, Visual, Electronic, Secure, Trained" },
          { value: "D", label: "Iterative, Numerical, Verified, Extensible, Systematic, Tracked" }
        ],
        correct: "A",
        explanation: "INVEST provides guidelines for creating self-contained, estimable, and deliverable sprint backlog user stories."
      },
      {
        id: 3,
        category: "Process Modeling",
        difficulty: "Intermediate",
        question: "In Business Process Model and Notation (BPMN 2.0), what does a diamond-shaped Gateway symbol represent?",
        description: "Workflow decision logic.",
        options: [
          { value: "A", label: "A branching point or merge point controlling divergence and convergence of sequence flows based on conditions" },
          { value: "B", label: "A document PDF file attachment" },
          { value: "C", label: "The end of the entire company operations" },
          { value: "D", label: "A manual database backup" }
        ],
        correct: "A",
        explanation: "Gateways direct workflow paths based on decision conditions (exclusive XOR, parallel AND, or inclusive OR)."
      },
      {
        id: 4,
        category: "Data Analysis",
        difficulty: "Intermediate",
        question: "Which KPI directly measures how many customer accounts cancel their subscription within a given billing period?",
        description: "SaaS business intelligence metrics.",
        options: [
          { value: "A", label: "Customer Churn Rate" },
          { value: "B", label: "Customer Acquisition Cost (CAC)" },
          { value: "C", label: "Net Promoter Score (NPS)" },
          { value: "D", label: "Return on Ad Spend (ROAS)" }
        ],
        correct: "A",
        explanation: "Churn rate equals lost customers divided by total starting customers, representing subscription attrition."
      },
      {
        id: 5,
        category: "Stakeholder Management",
        difficulty: "Intermediate",
        question: "In a RACI Matrix for project governance, what does 'A' stand for, and how many individuals should hold this role per task?",
        description: "Responsibility assignment matrix.",
        options: [
          { value: "A", label: "Accountable — Exactly ONE person who has ultimate ownership and decision authority" },
          { value: "B", label: "Advisor — Anyone who wants to give feedback" },
          { value: "C", label: "Assistant — All junior team members" },
          { value: "D", label: "Auditor — Only external government inspectors" }
        ],
        correct: "A",
        explanation: "Accountable is the singular individual with veto and sign-off authority; having multiple accountables creates diffusion of ownership."
      },
      {
        id: 6,
        category: "Financial Feasibility",
        difficulty: "Intermediate",
        question: "What does Net Present Value (NPV) calculate when evaluating an enterprise digital transformation business case?",
        description: "Capital budgeting and investment appraisal.",
        options: [
          { value: "A", label: "The sum of all projected discounted cash inflows minus the initial project investment cost at a defined discount rate" },
          { value: "B", label: "The total sales revenue without deducting costs" },
          { value: "C", label: "The physical weight of enterprise servers" },
          { value: "D", label: "The number of hours worked by software engineers" }
        ],
        correct: "A",
        explanation: "NPV discounts future expected cash returns to present value; NPV > 0 indicates a value-accretive investment."
      },
      {
        id: 7,
        category: "Root Cause Analysis",
        difficulty: "Beginner",
        question: "Which structured visual tool is commonly known as the 'Ishikawa' or 'Fishbone' diagram in Six Sigma quality analysis?",
        description: "Problem diagnosis methodologies.",
        options: [
          { value: "A", label: "Cause-and-Effect Diagram categorizing potential problem causes into People, Process, Technology, and Environment" },
          { value: "B", label: "A Gantt Chart showing project deadlines" },
          { value: "C", label: "A scatter plot of customer ages" },
          { value: "D", label: "An organization hierarchy chart" }
        ],
        correct: "A",
        explanation: "Fishbone diagrams visually map potential root causes contributing to an operational defect across standard categories."
      },
      {
        id: 8,
        category: "User Experience & Wireframing",
        difficulty: "Beginner",
        question: "Why does a Business Analyst create Low-Fidelity wireframes before UI designers develop high-fidelity mockups?",
        description: "Iterative product discovery.",
        options: [
          { value: "A", label: "To validate information architecture, page flow, and functional requirements with stakeholders without getting distracted by visual colors and typography" },
          { value: "B", label: "Because high-fidelity mockups cannot be displayed on computers" },
          { value: "C", label: "To save ink on office printers" },
          { value: "D", label: "Because wireframes replace database code" }
        ],
        correct: "A",
        explanation: "Low-fi wireframes align stakeholders on layout, hierarchy, and business logic without subjective aesthetic debates."
      },
      {
        id: 9,
        category: "Change Management",
        difficulty: "Intermediate",
        question: "According to the ADKAR Change Management Model, what does the first letter 'A' represent when rolling out enterprise ERP software?",
        description: "Organizational adoption strategies.",
        options: [
          { value: "A", label: "Awareness of the business need for change" },
          { value: "B", label: "Automation of all human jobs" },
          { value: "C", label: "Approval from government agencies" },
          { value: "D", label: "Archiving old computer hard drives" }
        ],
        correct: "A",
        explanation: "ADKAR stands for Awareness, Desire, Knowledge, Ability, and Reinforcement; employees must first understand why change is needed."
      },
      {
        id: 10,
        category: "Testing & Validation",
        difficulty: "Intermediate",
        question: "What is User Acceptance Testing (UAT), and who is primarily responsible for signing off on it?",
        description: "Product release gatekeeping.",
        options: [
          { value: "A", label: "Formal verification by actual business end-users to validate that the software meets real-world business requirements prior to production release" },
          { value: "B", label: "Automated unit testing written by junior developers" },
          { value: "C", label: "Server stress testing under 100,000 requests" },
          { value: "D", label: "Checking the spelling on the login button" }
        ],
        correct: "A",
        explanation: "UAT ensures the system satisfies business workflows and contract specifications; business stakeholders provide final sign-off."
      },
      {
        id: 11,
        category: "SQL Analytics",
        difficulty: "Intermediate",
        question: "Which SQL command computes total revenue per regional division where total division revenue exceeds ₹5,00,000?",
        description: "Aggregation and filtering queries.",
        options: [
          { value: "A", label: "SELECT region, SUM(revenue) FROM sales GROUP BY region HAVING SUM(revenue) > 500000;" },
          { value: "B", label: "SELECT region, SUM(revenue) FROM sales WHERE SUM(revenue) > 500000;" },
          { value: "C", label: "SELECT region FROM sales FILTER 500000;" },
          { value: "D", label: "SELECT * FROM sales ORDER BY 500000;" }
        ],
        correct: "A",
        explanation: "Aggregated results created by GROUP BY must be filtered using HAVING, not WHERE."
      },
      {
        id: 12,
        category: "Prioritization Frameworks",
        difficulty: "Intermediate",
        question: "In the MoSCoW prioritization technique for scope management, what does 'W' stand for?",
        description: "Scope control in Agile sprints.",
        options: [
          { value: "A", label: "Won't have this time (agreed out-of-scope for the immediate release, but deferred for future iterations)" },
          { value: "B", label: "Worst possible feature" },
          { value: "C", label: "Wait until next year" },
          { value: "D", label: "Wrong requirements" }
        ],
        correct: "A",
        explanation: "MoSCoW classifies requirements into Must have, Should have, Could have, and Won't have (this release)."
      },
      {
        id: 13,
        category: "SWOT & Strategy",
        difficulty: "Beginner",
        question: "In a corporate SWOT Analysis, what distinguishes Strengths/Weaknesses from Opportunities/Threats?",
        description: "Strategic analysis fundamentals.",
        options: [
          { value: "A", label: "Strengths and Weaknesses are internal organizational factors; Opportunities and Threats are external market factors" },
          { value: "B", label: "Strengths are financial; Opportunities are technological only" },
          { value: "C", label: "Weaknesses cannot be fixed" },
          { value: "D", label: "Threats only come from natural disasters" }
        ],
        correct: "A",
        explanation: "SWOT divides internal capabilities (Strengths/Weaknesses) from external macroeconomic and competitor dynamics (Opportunities/Threats)."
      },
      {
        id: 14,
        category: "Data Warehousing & BI",
        difficulty: "Intermediate",
        question: "What is an operational KPI dashboard's primary objective compared to an analytical exploratory report?",
        description: "Business dashboard design.",
        options: [
          { value: "A", label: "Provide instantaneous at-a-glance visibility into live operational health, active alerts, and immediate threshold breaches" },
          { value: "B", label: "Store raw data files for 20 years" },
          { value: "C", label: "Run complex machine learning scripts" },
          { value: "D", label: "Print 500-page PDF documents daily" }
        ],
        correct: "A",
        explanation: "Operational dashboards deliver rapid situational awareness and actionable alerts, while analytical dashboards facilitate deep historical diagnosis."
      },
      {
        id: 15,
        category: "Ethics & Compliance",
        difficulty: "Intermediate",
        question: "Why must a Business Analyst conduct a Data Privacy Impact Assessment (DPIA) when specifying new customer onboarding flows?",
        description: "Regulatory governance and compliance.",
        options: [
          { value: "A", label: "To identify and mitigate personal data exposure risks in accordance with privacy laws (e.g. DPDP / GDPR)" },
          { value: "B", label: "To increase company advertising revenue" },
          { value: "C", label: "To delay product launch intentionally" },
          { value: "D", label: "To reduce server electrical power consumption" }
        ],
        correct: "A",
        explanation: "DPIAs systematically evaluate and mitigate privacy risks to ensure compliant processing of sensitive user data."
      }
    ],
    roadmap: [
      {
        id: "step-ba-req",
        title: "Requirements Engineering & Agile User Stories",
        skill: "BRD, FRD & Jira Backlog",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "Stakeholder interviewing, BRD/FRD drafting, INVEST user stories, acceptance criteria, and Jira backlog grooming.",
        reason: "Core foundation of business analysis practice.",
        prerequisiteId: null
      },
      {
        id: "step-ba-bpmn",
        title: "Business Process Modeling & BPMN 2.0 Workflows",
        skill: "BPMN 2.0 & Gap Analysis",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 50,
        desc: "As-Is vs To-Be process mapping, swimlanes, gateway decision logic, and value stream optimization.",
        reason: "Essential for business transformation and operations redesign.",
        prerequisiteId: "step-ba-req"
      },
      {
        id: "step-ba-sql",
        title: "SQL & Relational Analytics for Business Insights",
        skill: "SQL Querying & KPIs",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Writing analytical queries, multi-table joins, aggregations, and data validation against databases.",
        reason: "Highest skill gap (20%) identified for tech business analyst roles.",
        prerequisiteId: "step-ba-bpmn"
      },
      {
        id: "step-ba-roi",
        title: "Financial Modeling, DCF & Business Case Valuation",
        skill: "ROI & Cost-Benefit Models",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Excel DCF valuation, capital budgeting, NPV calculation, and executive stakeholder pitches.",
        reason: "Closes 13% gap in executive business acumen.",
        prerequisiteId: "step-ba-sql"
      },
      {
        id: "step-ba-capstone",
        title: "FinTech Digital Transformation BRD & Product Package Capstone",
        skill: "Full Product & BA Portfolio",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Draft an end-to-end digital onboarding BRD with BPMN workflows, wireframes, SQL schema definitions, and a 3-year financial ROI business case.",
        reason: "Verified portfolio piece credentialed on your Digital Skill Passport for consulting firms.",
        prerequisiteId: "step-ba-roi"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-mgmt-1",
        title: "Omnichannel Retail Digital Transformation BRD & BPMN Package",
        domain: "Management & Business",
        industryContext: "Standard deliverable at McKinsey, Deloitte, and Accenture Strategy to modernize legacy brick-and-mortar retail workflows.",
        tools: "Lucidchart (BPMN 2.0), Jira, Balsamiq, Confluence",
        deliverables: "Comprehensive BRD document, As-Is vs To-Be BPMN swimlane map, 15 Jira user stories with acceptance criteria",
        difficulty: "Intermediate"
      },
      {
        id: "exp-mgmt-2",
        title: "SaaS Product Churn Diagnosis & Executive BI Deck",
        domain: "Management & Business",
        industryContext: "Conducted by product strategy teams at Zoho and Razorpay to uncover cohort drop-offs and prioritize engineering roadmaps.",
        tools: "Power BI / Tableau, Excel Financial Model, SQL",
        deliverables: "Executive KPI dashboard, cohort retention analysis, 10-slide strategy pitch deck",
        difficulty: "Advanced"
      }
    ],
    opportunities: [
      {
        id: "opp-mgmt-1",
        category: "Internship",
        role: "Business Analyst Intern",
        company: "Deloitte India Consulting",
        location: "Hyderabad / Bangalore",
        duration: "6 Months",
        stipend: "₹35,000 / month",
        experience: "Pre-final / Final Year MBA or B.Tech",
        source: "SkillBridge Direct",
        deadline: "22 Oct 2026",
        matchPercentage: 88,
        potentialMatchPercentage: 96,
        logoBg: "bg-slate-900 text-white",
        tags: ["BRD", "BPMN", "SQL", "Agile"],
        matchingSkills: [
          { skill: "Requirements Engineering", studentScore: 88, requiredScore: 75, status: "Met" },
          { skill: "Process Modeling", studentScore: 84, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "SQL for Analytics", studentScore: 60, requiredScore: 75, gap: 15, impact: "+8% match boost" }
        ],
        recommendation: "Complete the SQL querying module to qualify for client-facing analytics interviews."
      },
      {
        id: "opp-mgmt-2",
        category: "Job",
        role: "Associate Product Business Analyst",
        company: "Razorpay Payments",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹7.5 – 11.0 LPA",
        experience: "0–1 Years Experience",
        source: "Campus Hiring Partner",
        deadline: "30 Oct 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 92,
        logoBg: "bg-blue-600 text-white",
        tags: ["Product Requirements", "Jira", "SQL", "FinTech"],
        matchingSkills: [
          { skill: "Agile & Product Delivery", studentScore: 86, requiredScore: 75, status: "Met" },
          { skill: "Requirements Engineering", studentScore: 88, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Financial ROI Models", studentScore: 62, requiredScore: 75, gap: 13, impact: "+8% match boost" }
        ],
        recommendation: "Add your SaaS churn diagnosis deliverable to your Digital Skill Passport."
      },
      {
        id: "opp-mgmt-3",
        category: "Startup",
        role: "Founding Business & Operations Analyst",
        company: "KredX Supply Chain Finance",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹7.0 – 9.5 LPA + ESOPs",
        experience: "Freshers with verified business cases",
        source: "SkillBridge Startup Network",
        deadline: "08 Nov 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 94,
        logoBg: "bg-purple-600 text-white",
        tags: ["Process Optimization", "Excel", "BPMN", "Customer Workflows"],
        matchingSkills: [
          { skill: "Process Modeling", studentScore: 84, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "SQL Queries", studentScore: 60, requiredScore: 75, gap: 15, impact: "+9% match boost" }
        ],
        recommendation: "Review supply chain workflow optimization cases."
      },
      {
        id: "opp-mgmt-4",
        category: "Government",
        role: "Management Trainee / Strategic Analyst",
        company: "National Payments Corporation of India (NPCI / Govt Entity)",
        location: "Mumbai",
        duration: "Permanent Cadre",
        stipend: "₹8.0 – 12.0 LPA + Banking Benefits",
        experience: "Freshers with MBA / B.Tech",
        source: "National PSU Portal",
        deadline: "19 Nov 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 91,
        logoBg: "bg-amber-600 text-white",
        tags: ["Digital Payments", "UPI Specifications", "BRD", "Governance"],
        matchingSkills: [
          { skill: "Requirements Engineering", studentScore: 88, requiredScore: 75, status: "Met" },
          { skill: "Process Modeling", studentScore: 84, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Regulatory Banking Standards", studentScore: 45, requiredScore: 70, gap: 25, impact: "+8% match boost" }
        ],
        recommendation: "Review RBI Master Directions on digital payment security."
      }
    ]
  },

  // ==========================================
  // 8. FINANCIAL ANALYST (COMMERCE)
  // ==========================================
  "Financial Analyst": {
    roleName: "Financial Analyst",
    domainId: "comm",
    domainName: "Commerce & Finance",
    category: "Management & Finance",
    badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800",
    readinessScore: 82,
    scoreDelta: "+5% from last month",
    readinessStatus: "Industry Ready",
    readinessBreakdown: [
      { name: "Financial Statement Analysis", score: 88, desc: "3-statement financial modeling (P&L, Balance Sheet, Cash Flows)" },
      { name: "Valuation Methodologies", score: 75, desc: "Discounted Cash Flow (DCF), Trading Comps, Precedent Transactions" },
      { name: "Corporate Finance & Ratios", score: 86, desc: "WACC, DuPont analysis, working capital, debt covenant monitoring" },
      { name: "Advanced Excel & BI", score: 84, desc: "Dynamic Excel modeling, INDEX/MATCH, sensitivity tables, Power BI" },
      { name: "Equity & Credit Research", score: 78, desc: "Industry competitive benchmarking, earnings call summaries" }
    ],
    readinessSummary: "Strong 3-statement financial accounting and corporate ratio modeling. Enhancing multi-stage DCF valuation and M&A accretion/dilution analysis will elevate readiness to 93%.",
    skillGaps: [
      {
        id: "gap-dcf",
        name: "Discounted Cash Flow (DCF) Valuation",
        current: 58,
        required: 80,
        gap: 22,
        priority: "HIGH",
        status: "Needs Improvement",
        gapColor: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-900/50",
        recommendedAction: "Unlevered Free Cash Flow projection, WACC calculation, and terminal value sensitivity",
        duration: "3 weeks",
        roadmapStepId: "step-fin-dcf"
      },
      {
        id: "gap-comps",
        name: "Comparable Company Analysis (Trading Comps)",
        current: 62,
        required: 75,
        gap: 13,
        priority: "MEDIUM",
        status: "Needs Improvement",
        gapColor: "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-900/50",
        recommendedAction: "EV/EBITDA, P/E multiples, and peer benchmarking in Excel",
        duration: "2 weeks",
        roadmapStepId: "step-fin-comps"
      }
    ],
    assessmentQuestions: [
      {
        id: 1,
        category: "Financial Statement Linkages",
        difficulty: "Intermediate",
        question: "If depreciation expense increases by ₹100 in an enterprise with a 25% corporate tax rate, how does it impact the 3 financial statements?",
        description: "Core accounting mechanics.",
        options: [
          { value: "A", label: "Net income drops by ₹75; on Cash Flow, ₹100 is added back so cash increases by ₹25 (tax shield); Balance Sheet cash rises by ₹25, PP&E drops by ₹100, retained earnings drop by ₹75 (balances)" },
          { value: "B", label: "Cash drops by ₹100 immediately" },
          { value: "C", label: "Balance sheet does not balance" },
          { value: "D", label: "There is zero tax impact" }
        ],
        correct: "A",
        explanation: "Depreciation is non-cash but tax-deductible. It creates a cash tax shield of ₹25, balancing assets (-₹75) and equity (-₹75)."
      },
      {
        id: 2,
        category: "Valuation Methodologies",
        difficulty: "Intermediate",
        question: "Why is Enterprise Value (EV) compared against EBITDA (EV/EBITDA) rather than Net Income (EV/Net Income)?",
        description: "Capital structure neutrality.",
        options: [
          { value: "A", label: "EV represents total firm value available to all capital providers; EBITDA is before interest, tax, and depreciation, making the ratio capital-structure neutral" },
          { value: "B", label: "Because Net Income is always zero" },
          { value: "C", label: "Because EBITDA is mandated by tax authorities" },
          { value: "D", label: "EV/Net Income is mathematically impossible" }
        ],
        correct: "A",
        explanation: "EV belongs to both debt and equity holders; hence it must be paired with EBITDA (an unlevered metric), whereas Net Income is levered."
      },
      {
        id: 3,
        category: "Discounted Cash Flow (DCF)",
        difficulty: "Advanced",
        question: "In the Gordon Growth Method for calculating Terminal Value, what condition must ALWAYS hold regarding the perpetual growth rate (g) and WACC?",
        description: "DCF mathematical validity.",
        options: [
          { value: "A", label: "The long-term growth rate (g) MUST be strictly less than WACC (g < WACC) and generally cannot exceed long-term GDP growth" },
          { value: "B", label: "g must equal 100%" },
          { value: "C", label: "WACC must equal zero" },
          { value: "D", label: "g must exceed WACC by 5%" }
        ],
        correct: "A",
        explanation: "If g >= WACC, the formula yields a negative or infinite valuation; perpetual company growth cannot sustainably outpace the broader economy."
      },
      {
        id: 4,
        category: "Corporate Finance (WACC)",
        difficulty: "Intermediate",
        question: "Why is the Cost of Debt (Rd) multiplied by (1 - Tax Rate) when calculating the Weighted Average Cost of Capital (WACC)?",
        description: "Interest tax shield deduction.",
        options: [
          { value: "A", label: "Interest expense is tax-deductible in corporate income statements, lowering the effective after-tax cost of borrowing" },
          { value: "B", label: "To account for inflation" },
          { value: "C", label: "Because banks charge higher interest to profitable companies" },
          { value: "D", label: "Because dividends are tax deductible" }
        ],
        correct: "A",
        explanation: "Debt interest reduces taxable income, yielding an effective after-tax cost of debt equal to Rd * (1 - t)."
      },
      {
        id: 5,
        category: "Financial Ratios (DuPont)",
        difficulty: "Intermediate",
        question: "In the 3-step DuPont Analysis, Return on Equity (ROE) is decomposed into which three operational drivers?",
        description: "Deconstructing shareholder return.",
        options: [
          { value: "A", label: "Net Profit Margin (Profitability) * Asset Turnover (Efficiency) * Financial Leverage Ratio" },
          { value: "B", label: "Gross Margin * Inflation * Tax Rate" },
          { value: "C", label: "Total Assets * Total Debt * Dividends" },
          { value: "D", label: "EBITDA * Cash * Share Price" }
        ],
        correct: "A",
        explanation: "DuPont proves that ROE equals Profit Margin (NI/Sales) * Asset Turnover (Sales/Assets) * Equity Multiplier (Assets/Equity)."
      },
      {
        id: 6,
        category: "Working Capital Management",
        difficulty: "Intermediate",
        question: "What does the Cash Conversion Cycle (CCC) measure for an enterprise manufacturer or retailer?",
        description: "Liquidity and operating cycle efficiency.",
        options: [
          { value: "A", label: "Days Sales of Inventory (DSI) + Days Sales Outstanding (DSO) - Days Payable Outstanding (DPO)" },
          { value: "B", label: "Total cash in the bank account divided by 365" },
          { value: "C", label: "The time taken to print invoices" },
          { value: "D", label: "The dividend payout date" }
        ],
        correct: "A",
        explanation: "CCC measures the elapsed time from cash outflow for inventory raw materials to cash inflow collected from customer accounts receivable."
      },
      {
        id: 7,
        category: "Financial Modeling in Excel",
        difficulty: "Beginner",
        question: "Why are INDEX/MATCH or XLOOKUP preferred over legacy VLOOKUP in professional institutional financial models?",
        description: "Financial spreadsheet integrity.",
        options: [
          { value: "A", label: "They allow leftward lookups, do not break when columns are inserted or deleted, and use less processing memory" },
          { value: "B", label: "VLOOKUP is banned by the SEC" },
          { value: "C", label: "INDEX/MATCH only works on Mac computers" },
          { value: "D", label: "VLOOKUP cannot sum numbers" }
        ],
        correct: "A",
        explanation: "VLOOKUP relies on static column offset indices that fail upon structural column edits; INDEX/MATCH is dynamic and robust."
      },
      {
        id: 8,
        category: "Credit Analysis",
        difficulty: "Intermediate",
        question: "What is the Interest Coverage Ratio (Times Interest Earned), and what threshold is generally considered safe by bond rating agencies?",
        description: "Solvency and debt servicing capacity.",
        options: [
          { value: "A", label: "EBIT / Interest Expense; ratios above 3.0x generally indicate adequate operating cash flow to service debt comfortably" },
          { value: "B", label: "Total Revenue / Net Profit" },
          { value: "C", label: "Stock Price / Earnings Per Share" },
          { value: "D", label: "Cash / Total Liabilities" }
        ],
        correct: "A",
        explanation: "Interest coverage reflects how many times operating income (EBIT) covers annual interest obligations; higher values signify lower default risk."
      },
      {
        id: 9,
        category: "Mergers & Acquisitions (M&A)",
        difficulty: "Advanced",
        question: "When is an all-stock M&A acquisition mathematically 'Accretive' to the buyer's Earnings Per Share (EPS)?",
        description: "Acquisition financial mechanics.",
        options: [
          { value: "A", label: "When the acquiring buyer's P/E ratio is HIGHER than the target company's P/E ratio" },
          { value: "B", label: "When the target company has zero employees" },
          { value: "C", label: "When the deal is paid 100% in physical gold" },
          { value: "D", label: "When the target company has massive losses" }
        ],
        correct: "A",
        explanation: "If buyer trades at higher P/E, each rupee of target earnings acquired requires issuing fewer new shares, boosting pro-forma EPS."
      },
      {
        id: 10,
        category: "Capital Structure",
        difficulty: "Intermediate",
        question: "According to Modigliani-Miller Theorem with corporate taxes, what happens to the value of a firm as it adds debt to its capital structure?",
        description: "Optimal leverage and tax shields.",
        options: [
          { value: "A", label: "Firm value increases by the present value of the debt interest tax shield until bankruptcy distress costs offset benefits" },
          { value: "B", label: "Firm value drops to zero immediately" },
          { value: "C", label: "Debt has zero impact under any circumstances" },
          { value: "D", label: "Share price freezes permanently" }
        ],
        correct: "A",
        explanation: "Interest tax deductibility enhances firm value with leverage up to the point where financial distress costs counteract tax advantages."
      },
      {
        id: 11,
        category: "Market Multiples",
        difficulty: "Beginner",
        question: "What does a Trailing Price-to-Earnings (P/E) multiple of 25x imply about market expectations?",
        description: "Equity valuation benchmarking.",
        options: [
          { value: "A", label: "Investors are willing to pay ₹25 for every ₹1 of current net profit, expecting solid future earnings growth" },
          { value: "B", label: "The company will go bankrupt in 25 days" },
          { value: "C", label: "The stock price will drop by 25%" },
          { value: "D", label: "The company has 25 competitors" }
        ],
        correct: "A",
        explanation: "P/E reflects valuation multiple; higher multiples indicate investor willingness to pay a premium for anticipated future earnings expansion."
      },
      {
        id: 12,
        category: "Cash Flow Statements",
        difficulty: "Intermediate",
        question: "Under US GAAP and IFRS, in which section of the Cash Flow Statement is Capital Expenditure (CapEx) classified?",
        description: "Cash flow statement accounting.",
        options: [
          { value: "A", label: "Cash Flows from Investing Activities (outflow)" },
          { value: "B", label: "Cash Flows from Financing Activities" },
          { value: "C", label: "Operating Cash Flows strictly" },
          { value: "D", label: "Comprehensive Income section" }
        ],
        correct: "A",
        explanation: "Purchases of property, plant, and equipment (CapEx) represent long-term capital investments, reported under Investing Cash Flows."
      },
      {
        id: 13,
        category: "Risk & Portfolio Theory",
        difficulty: "Intermediate",
        question: "What does the 'Beta' coefficient of a publicly traded stock measure in the Capital Asset Pricing Model (CAPM)?",
        description: "Systematic market risk.",
        options: [
          { value: "A", label: "The stock's systematic volatility/sensitivity relative to the overall market (Beta > 1 indicates higher volatility than market)" },
          { value: "B", label: "The company's corporate tax rate" },
          { value: "C", label: "The dividend payout ratio" },
          { value: "D", label: "The probability of accounting fraud" }
        ],
        correct: "A",
        explanation: "Beta reflects systematic market covariance; Beta = 1.2 means the stock tends to swing 20% more than broad market indices."
      },
      {
        id: 14,
        category: "Auditing & Forensic Accounting",
        difficulty: "Intermediate",
        question: "What is the Beneish M-Score used for in institutional investment research?",
        description: "Earnings manipulation detection.",
        options: [
          { value: "A", label: "A mathematical model using 8 financial ratios to calculate the statistical probability that a company is manipulating its reported earnings" },
          { value: "B", label: "A model to predict stock splits" },
          { value: "C", label: "A calculation of employee bonus pay" },
          { value: "D", label: "A currency exchange rate tracker" }
        ],
        correct: "A",
        explanation: "Beneish M-Score flags aggressive accounting and revenue distortion using accrual, margin, and depreciation metrics."
      },
      {
        id: 15,
        category: "Corporate Governance",
        difficulty: "Beginner",
        question: "What is an 'Earnings Call' conducted quarterly by publicly listed corporations?",
        description: "Investor relations and financial communication.",
        options: [
          { value: "A", label: "A public teleconference where executive management discusses quarterly financial results, business outlook, and answers analyst Q&A" },
          { value: "B", label: "A phone call to collect unpaid customer debts" },
          { value: "C", label: "A meeting to hire new college interns" },
          { value: "D", label: "A private lottery for shareholders" }
        ],
        correct: "A",
        explanation: "Earnings calls allow institutional investors and equity analysts to probe quarterly performance and management guidance directly."
      }
    ],
    roadmap: [
      {
        id: "step-fin-model",
        title: "3-Statement Financial Modeling & Accounting Integration",
        skill: "3-Statement Financial Modeling",
        duration: "3 weeks • Beginner",
        difficulty: "Beginner",
        status: "completed",
        progress: 100,
        desc: "P&L, Balance Sheet, and Cash Flow statement linkages, circular debt schedules, and working capital modeling in Excel.",
        reason: "Prerequisite foundation for all institutional finance roles.",
        prerequisiteId: null
      },
      {
        id: "step-fin-dcf",
        title: "Discounted Cash Flow (DCF) & WACC Valuation",
        skill: "DCF & Valuation Modeling",
        duration: "3 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "current",
        progress: 45,
        desc: "Unlevered free cash flow projections, cost of equity (CAPM), WACC, terminal value, and sensitivity tables.",
        reason: "Highest skill gap (22%) for equity research and corporate finance careers.",
        prerequisiteId: "step-fin-model"
      },
      {
        id: "step-fin-comps",
        title: "Comparable Company Analysis (Trading & Transaction Comps)",
        skill: "Comps & Multiples",
        duration: "2 weeks • Intermediate",
        difficulty: "Intermediate",
        status: "upcoming",
        progress: 0,
        desc: "Enterprise Value calculations, EV/EBITDA, P/E, revenue multiples, and peer benchmarking.",
        reason: "Closes 13% gap in relative market valuation.",
        prerequisiteId: "step-fin-dcf"
      },
      {
        id: "step-fin-lbo",
        title: "M&A Accretion / Dilution & LBO Modeling",
        skill: "M&A Deal Modeling",
        duration: "3 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Pro-forma earnings per share (EPS) accretion/dilution, goodwill creation, and debt repayment waterfalls.",
        reason: "Required for investment banking and private equity roles.",
        prerequisiteId: "step-fin-comps"
      },
      {
        id: "step-fin-capstone",
        title: "Comprehensive Corporate Equity Valuation & Investment Memo Capstone",
        skill: "Full Investment Banking Package",
        duration: "4 weeks • Advanced",
        difficulty: "Advanced",
        status: "upcoming",
        progress: 0,
        desc: "Build a dynamic 3-statement model with multi-scenario DCF and trading comps for a publicly listed Indian corporation (e.g. Titan or Zomato) and write an institutional Buy/Hold/Sell equity research memo.",
        reason: "Verified portfolio deliverable on your Digital Skill Passport for finance recruiters.",
        prerequisiteId: "step-fin-lbo"
      }
    ],
    handsOnExperiments: [
      {
        id: "exp-comm-1",
        title: "Public Company 3-Statement & DCF Valuation Model",
        domain: "Commerce & Finance",
        industryContext: "Standard workflow at Goldman Sachs, JP Morgan, and ICICI Securities to determine 12-month target stock prices.",
        tools: "Microsoft Excel (Wall Street Prep Standards), Capital IQ / Screener.in data, Sensitivity Tables",
        deliverables: "Dynamic Excel valuation workbook (.xlsx), 10-page institutional equity research investment memo",
        difficulty: "Advanced"
      },
      {
        id: "exp-comm-2",
        title: "Working Capital Optimization & DuPont Ratio Audit",
        domain: "Commerce & Finance",
        industryContext: "Conducted by corporate finance teams (Hindustan Unilever, ITC) to release tied-up operational cash.",
        tools: "Excel, Power BI Finance Dashboard, DuPont Analysis Framework",
        deliverables: "Cash conversion cycle audit report, working capital simulation dashboard, CFO presentation",
        difficulty: "Intermediate"
      }
    ],
    opportunities: [
      {
        id: "opp-comm-1",
        category: "Internship",
        role: "Financial Analyst Intern",
        company: "Morgan Stanley India",
        location: "Mumbai / Bangalore",
        duration: "6 Months",
        stipend: "₹45,000 / month",
        experience: "B.Com / BBA / MBA Finance",
        source: "SkillBridge Direct",
        deadline: "24 Oct 2026",
        matchPercentage: 87,
        potentialMatchPercentage: 96,
        logoBg: "bg-blue-900 text-white",
        tags: ["Excel Modeling", "DCF", "Accounting", "Valuation"],
        matchingSkills: [
          { skill: "Financial Statement Analysis", studentScore: 88, requiredScore: 80, status: "Met" },
          { skill: "Corporate Finance & Ratios", studentScore: 86, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "DCF Valuation Modeling", studentScore: 58, requiredScore: 80, gap: 22, impact: "+9% match boost" }
        ],
        recommendation: "Complete DCF sensitivity table milestone to fast-track interview."
      },
      {
        id: "opp-comm-2",
        category: "Job",
        role: "Junior Equity Research Analyst",
        company: "HDFC Securities Institutional Research",
        location: "Mumbai",
        duration: "Full-Time",
        stipend: "₹6.5 – 9.0 LPA",
        experience: "0–1 Years / Freshers",
        source: "Campus Hiring Partner",
        deadline: "05 Nov 2026",
        matchPercentage: 83,
        potentialMatchPercentage: 92,
        logoBg: "bg-red-700 text-white",
        tags: ["Equity Research", "Financial Modeling", "Excel", "Earnings Calls"],
        matchingSkills: [
          { skill: "Financial Statement Analysis", studentScore: 88, requiredScore: 80, status: "Met" },
          { skill: "Advanced Excel & BI", studentScore: 84, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Comparable Trading Multiples", studentScore: 62, requiredScore: 75, gap: 13, impact: "+9% match boost" }
        ],
        recommendation: "Attach your public equity research report to your Digital Skill Passport."
      },
      {
        id: "opp-comm-3",
        category: "Startup",
        role: "Corporate Finance & FP&A Analyst",
        company: "CRED (FinTech Unicorn)",
        location: "Bangalore",
        duration: "Full-Time",
        stipend: "₹8.0 – 12.0 LPA + ESOPs",
        experience: "Strong financial modeling and Excel skills",
        source: "SkillBridge Startup Network",
        deadline: "12 Nov 2026",
        matchPercentage: 85,
        potentialMatchPercentage: 94,
        logoBg: "bg-black text-white",
        tags: ["FP&A", "Budgeting", "FinTech", "Excel"],
        matchingSkills: [
          { skill: "Financial Statement Analysis", studentScore: 88, requiredScore: 80, status: "Met" }
        ],
        missingSkills: [
          { skill: "Valuation & Comps", studentScore: 62, requiredScore: 75, gap: 13, impact: "+9% match boost" }
        ],
        recommendation: "Review SaaS unit economics and LTV/CAC calculations."
      },
      {
        id: "opp-comm-4",
        category: "Government",
        role: "Officer Grade 'A' (General / Finance Stream)",
        company: "Securities and Exchange Board of India (SEBI)",
        location: "Mumbai",
        duration: "Permanent Regulatory Cadre",
        stipend: "Gross Emoluments ~₹1,40,000 / month",
        experience: "Graduation in Commerce / Economics / CA / CFA",
        source: "SEBI Recruitment Portal",
        deadline: "22 Nov 2026",
        matchPercentage: 84,
        potentialMatchPercentage: 93,
        logoBg: "bg-blue-800 text-white",
        tags: ["Securities Law", "Financial Markets", "Corporate Finance", "Auditing"],
        matchingSkills: [
          { skill: "Financial Statement Analysis", studentScore: 88, requiredScore: 75, status: "Met" },
          { skill: "Corporate Finance & Ratios", studentScore: 86, requiredScore: 75, status: "Met" }
        ],
        missingSkills: [
          { skill: "Securities Regulation & SEBI LODR", studentScore: 45, requiredScore: 70, gap: 25, impact: "+9% match boost" }
        ],
        recommendation: "Take the SEBI capital markets regulatory module."
      }
    ]
  }
};

// Smart role aliases dictionary to map common specializations to primary competency tracks
const ROLE_ALIASES = {
  "software developer": "Software Engineer",
  "software development": "Software Engineer",
  "software engineering": "Software Engineer",
  "swe": "Software Engineer",
  "frontend developer": "Software Engineer",
  "backend developer": "Software Engineer",
  "full stack developer": "Software Engineer",
  "full-stack developer": "Software Engineer",
  "ai engineer": "Software Engineer",
  "data science": "Data Analyst",
  "data scientist": "Data Analyst",
  "ml engineer": "Data Analyst",
  "machine learning engineer": "Data Analyst",
  "bim & structural engineer": "Structural Engineer",
  "civil site engineer": "Structural Engineer",
  "bim engineer": "Structural Engineer",
  "cad designer": "Mechanical Design Engineer",
  "cad/cam engineer": "Mechanical Design Engineer",
  "manufacturing engineer": "Mechanical Design Engineer",
  "mechanical engineer": "Mechanical Design Engineer",
  "electrical engineer": "Power Systems Engineer",
  "renewable energy engineer": "Power Systems Engineer",
  "embedded engineer": "Embedded Systems Engineer",
  "embedded developer": "Embedded Systems Engineer",
  "vlsi / chip design engineer": "Embedded Systems Engineer",
  "iot engineer": "Embedded Systems Engineer",
  "risk analyst": "Financial Analyst",
  "investment analyst": "Financial Analyst",
  "product manager": "Business Analyst",
  "operations manager": "Business Analyst"
};

// Helper to retrieve role data with safe fallback to Data Analyst
export function getRoleData(roleName) {
  if (!roleName) return ROLE_COMPETENCIES["Data Analyst"];
  if (ROLE_COMPETENCIES[roleName]) {
    return ROLE_COMPETENCIES[roleName];
  }
  
  const normalized = String(roleName).toLowerCase().trim();
  
  // Check alias dictionary
  if (ROLE_ALIASES[normalized] && ROLE_COMPETENCIES[ROLE_ALIASES[normalized]]) {
    return ROLE_COMPETENCIES[ROLE_ALIASES[normalized]];
  }

  // Try case-insensitive or partial match
  const match = Object.keys(ROLE_COMPETENCIES).find(
    (k) => k.toLowerCase() === normalized
  );
  if (match) {
    return ROLE_COMPETENCIES[match];
  }

  // Try substring matching
  const subMatch = Object.keys(ROLE_COMPETENCIES).find(
    (k) => normalized.includes(k.toLowerCase()) || k.toLowerCase().includes(normalized)
  );
  if (subMatch) {
    return ROLE_COMPETENCIES[subMatch];
  }

  return ROLE_COMPETENCIES["Data Analyst"];
}

// Helper to get all roles grouped by Category
export function getRolesByCategory() {
  const grouped = {};
  ROLE_CATEGORIES.forEach((cat) => {
    grouped[cat] = [];
  });

  Object.values(ROLE_COMPETENCIES).forEach((role) => {
    if (!grouped[role.category]) {
      grouped[role.category] = [];
    }
    grouped[role.category].push(role);
  });

  return grouped;
}

// Helper to get roles by Domain
export function getRolesByDomain(domainId) {
  if (!domainId || domainId === "all") {
    return Object.values(ROLE_COMPETENCIES);
  }
  return Object.values(ROLE_COMPETENCIES).filter((r) => r.domainId === domainId);
}
