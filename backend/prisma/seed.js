// backend/prisma/seed.js
// SkillBridge Database Seed Script
// Populates demo accounts, skills, careers, job opportunities, assessments, and learning resources.

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SkillBridge PostgreSQL database via Prisma...");

  // Clear existing records in reverse dependency order
  await prisma.notification.deleteMany();
  await prisma.application.deleteMany();
  await prisma.jobMatch.deleteMany();
  await prisma.jobSkill.deleteMany();
  await prisma.jobOpportunity.deleteMany();
  await prisma.company.deleteMany();
  await prisma.roadmapItem.deleteMany();
  await prisma.roadmap.deleteMany();
  await prisma.learningProgress.deleteMany();
  await prisma.learningResource.deleteMany();
  await prisma.assessmentResult.deleteMany();
  await prisma.assessmentQuestion.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.careerSkill.deleteMany();
  await prisma.career.deleteMany();
  await prisma.studentSkill.deleteMany();
  await prisma.skillPassport.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.studentProfile.deleteMany();
  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash("password123", salt);

  // 1. Create Core Users
  const studentUser = await prisma.user.create({
    data: {
      name: "Sachin Kumar",
      email: "sachin.cs@example.edu.in",
      passwordHash,
      role: "STUDENT"
    }
  });

  const recruiterUser = await prisma.user.create({
    data: {
      name: "Priya Menon",
      email: "recruiter@acme.com",
      passwordHash,
      role: "RECRUITER"
    }
  });

  const institutionUser = await prisma.user.create({
    data: {
      name: "Dr. K. S. Raman",
      email: "admin@abcinstitute.edu.in",
      passwordHash,
      role: "INSTITUTION"
    }
  });

  const adminUser = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: "admin@skillbridge.edu.in",
      passwordHash,
      role: "ADMIN"
    }
  });

  // 2. Create Student Profile
  const studentProfile = await prisma.studentProfile.create({
    data: {
      userId: studentUser.id,
      college: "ABC Institute of Technology",
      degree: "Bachelor of Technology",
      branch: "Computer Science & Engineering",
      graduationYear: "2027",
      careerGoal: "Data Analyst",
      bio: "Aspiring Data Analyst passionate about relational database modeling, exploratory data analysis, and predictive metrics.",
      location: "Bangalore, India",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      readinessScore: 82
    }
  });

  // 3. Create Skills Catalogue
  const skillNames = [
    { name: "SQL", category: "Data", description: "Structured Query Language, relational schemas, complex joins, and window functions." },
    { name: "Python", category: "Programming", description: "Data structures, pandas, numpy, and backend scripting." },
    { name: "Power BI", category: "Data Visualization", description: "Business intelligence, DAX expressions, and executive reporting." },
    { name: "Excel", category: "Data", description: "Pivot tables, advanced lookup functions, and financial modeling." },
    { name: "Statistics", category: "Data Science", description: "Hypothesis testing, probability distributions, regression, and variance." },
    { name: "Machine Learning", category: "AI/ML", description: "Supervised and unsupervised learning, scikit-learn models." },
    { name: "Communication", category: "Soft Skills", description: "Stakeholder presentation, data storytelling, and technical writing." },
    { name: "Problem Solving", category: "Soft Skills", description: "Algorithmic thinking, critical analysis, and optimization." },
    { name: "React", category: "Web Development", description: "Modern component architecture, hooks, and responsive frontends." },
    { name: "JavaScript", category: "Programming", description: "Core ES6+, asynchronous programming, and DOM APIs." },
    { name: "Git", category: "DevOps", description: "Version control, branching strategies, and open-source collaboration." },
    { name: "Docker", category: "Cloud & DevOps", description: "Containerization, microservices, and environment isolation." },
    { name: "Cybersecurity", category: "Security", description: "Network protocols, vulnerability scanning, and secure coding." },
    { name: "Cloud", category: "Cloud & DevOps", description: "AWS / Azure compute, cloud databases, and serverless hosting." },
    { name: "Java", category: "Programming", description: "Object-oriented programming, Spring framework, and enterprise backends." }
  ];

  const skillMap = {};
  for (const s of skillNames) {
    const created = await prisma.skill.create({ data: s });
    skillMap[s.name] = created;
  }

  // 4. Connect Student Skills
  const studentInitialSkills = [
    { name: "SQL", current: 65, verified: 75, status: "VERIFIED", source: "ASSESSMENT" },
    { name: "Python", current: 75, verified: 80, status: "VERIFIED", source: "PROJECT" },
    { name: "Power BI", current: 45, verified: 0, status: "PENDING", source: "SELF" },
    { name: "Excel", current: 80, verified: 85, status: "VERIFIED", source: "CERTIFICATE" },
    { name: "Statistics", current: 70, verified: 70, status: "VERIFIED", source: "ASSESSMENT" },
    { name: "Communication", current: 82, verified: 85, status: "VERIFIED", source: "INSTITUTION" },
    { name: "Problem Solving", current: 78, verified: 80, status: "VERIFIED", source: "ASSESSMENT" }
  ];

  for (const item of studentInitialSkills) {
    const sk = skillMap[item.name];
    if (sk) {
      await prisma.studentSkill.create({
        data: {
          studentId: studentProfile.id,
          skillId: sk.id,
          currentLevel: item.current,
          verifiedLevel: item.verified,
          verificationStatus: item.status,
          source: item.source
        }
      });
    }
  }

  // 5. Create Careers and Career Skills
  const careersData = [
    {
      title: "Data Analyst",
      description: "Transforms raw corporate datasets into actionable executive insights through SQL, dashboarding, and statistics.",
      category: "Data & Analytics",
      averageSalary: "₹6.5 - ₹10.0 LPA",
      demandLevel: "Very High",
      skills: [
        { name: "SQL", required: 80, importance: 5 },
        { name: "Python", required: 75, importance: 4 },
        { name: "Power BI", required: 75, importance: 4 },
        { name: "Excel", required: 70, importance: 3 },
        { name: "Statistics", required: 70, importance: 3 },
        { name: "Communication", required: 80, importance: 4 }
      ]
    },
    {
      title: "Data Scientist",
      description: "Builds statistical models, machine learning pipelines, and predictive algorithms.",
      category: "AI & Data Science",
      averageSalary: "₹9.0 - ₹15.0 LPA",
      demandLevel: "High",
      skills: [
        { name: "Python", required: 85, importance: 5 },
        { name: "Machine Learning", required: 85, importance: 5 },
        { name: "Statistics", required: 80, importance: 5 },
        { name: "SQL", required: 75, importance: 4 }
      ]
    },
    {
      title: "Business Analyst",
      description: "Bridges business stakeholders with engineering teams via requirement elicitation, process flow, and KPI tracking.",
      category: "Management & Tech",
      averageSalary: "₹7.0 - ₹11.0 LPA",
      demandLevel: "High",
      skills: [
        { name: "Power BI", required: 80, importance: 5 },
        { name: "Excel", required: 85, importance: 5 },
        { name: "SQL", required: 70, importance: 4 },
        { name: "Communication", required: 90, importance: 5 }
      ]
    },
    {
      title: "Software Developer",
      description: "Designs, codes, tests, and maintains full-stack web and enterprise software systems.",
      category: "Software Engineering",
      averageSalary: "₹7.5 - ₹13.0 LPA",
      demandLevel: "Very High",
      skills: [
        { name: "Java", required: 80, importance: 5 },
        { name: "React", required: 80, importance: 4 },
        { name: "Git", required: 75, importance: 3 },
        { name: "SQL", required: 70, importance: 3 }
      ]
    }
  ];

  const careerMap = {};
  for (const c of careersData) {
    const createdCareer = await prisma.career.create({
      data: {
        title: c.title,
        description: c.description,
        category: c.category,
        averageSalary: c.averageSalary,
        demandLevel: c.demandLevel
      }
    });
    careerMap[c.title] = createdCareer;

    for (const cs of c.skills) {
      const sk = skillMap[cs.name];
      if (sk) {
        await prisma.careerSkill.create({
          data: {
            careerId: createdCareer.id,
            skillId: sk.id,
            requiredLevel: cs.required,
            importance: cs.importance
          }
        });
      }
    }
  }

  // 6. Create Companies
  const companiesData = [
    { name: "Deloitte Digital", industry: "Consulting & Tech", location: "Hyderabad, India", website: "https://deloitte.com" },
    { name: "Mu Sigma Analytics", industry: "Decision Sciences", location: "Bangalore, India", website: "https://mu-sigma.com" },
    { name: "Fractal AI", industry: "Artificial Intelligence", location: "Mumbai, India", website: "https://fractal.ai" },
    { name: "Zomato Tech", industry: "E-Commerce / FoodTech", location: "Gurugram, India", website: "https://zomato.com" },
    { name: "Infosys Innovations", industry: "Enterprise Services", location: "Pune, India", website: "https://infosys.com" }
  ];

  const companyMap = {};
  for (const comp of companiesData) {
    const createdComp = await prisma.company.create({ data: comp });
    companyMap[comp.name] = createdComp;
  }

  // 7. Create Job Opportunities
  const jobsData = [
    {
      company: "Deloitte Digital",
      title: "Junior Data Analyst Intern",
      jobType: "Internship",
      location: "Bangalore (Hybrid)",
      experience: "0-1 Years",
      salary: "₹35,000 / month",
      description: "Work alongside senior consultants to build executive BI reporting models, SQL transformations, and client pitch decks.",
      skills: [
        { name: "SQL", required: 75, importance: 5 },
        { name: "Power BI", required: 70, importance: 4 },
        { name: "Communication", required: 80, importance: 4 }
      ]
    },
    {
      company: "Mu Sigma Analytics",
      title: "Trainee Decision Scientist",
      jobType: "Full-Time",
      location: "Bangalore",
      experience: "0-1 Years",
      salary: "₹6.5 - ₹8.5 LPA",
      description: "Analyze large-scale corporate telemetry data, formulate optimization equations, and deliver decision roadmaps.",
      skills: [
        { name: "Python", required: 80, importance: 5 },
        { name: "Statistics", required: 75, importance: 5 },
        { name: "SQL", required: 75, importance: 4 }
      ]
    },
    {
      company: "Fractal AI",
      title: "Business Intelligence Intern",
      jobType: "Internship",
      location: "Mumbai (Remote)",
      experience: "Fresher",
      salary: "₹30,000 / month",
      description: "Transform customer churn data into interactive Power BI dashboards and executive summary presentations.",
      skills: [
        { name: "Power BI", required: 75, importance: 5 },
        { name: "Excel", required: 80, importance: 4 },
        { name: "SQL", required: 70, importance: 3 }
      ]
    },
    {
      company: "Zomato Tech",
      title: "Data Operations Associate",
      jobType: "Startup",
      location: "Gurugram (On-site)",
      experience: "0-2 Years",
      salary: "₹28,000 / month",
      description: "Query real-time delivery logs, identify bottleneck latency issues, and support the operations analytics team.",
      skills: [
        { name: "SQL", required: 70, importance: 5 },
        { name: "Problem Solving", required: 75, importance: 4 }
      ]
    },
    {
      company: "Infosys Innovations",
      title: "Graduate Engineer Trainee - Data",
      jobType: "Full-Time",
      location: "Hyderabad",
      experience: "Fresher (2026/2027 batch)",
      salary: "₹4.5 - ₹6.0 LPA",
      description: "Comprehensive foundational enterprise program covering cloud warehouses, SQL optimizations, and automated ETL pipelines.",
      skills: [
        { name: "SQL", required: 65, importance: 4 },
        { name: "Python", required: 65, importance: 4 },
        { name: "Communication", required: 70, importance: 3 }
      ]
    }
  ];

  for (const j of jobsData) {
    const comp = companyMap[j.company];
    if (comp) {
      const createdJob = await prisma.jobOpportunity.create({
        data: {
          companyId: comp.id,
          title: j.title,
          jobType: j.jobType,
          location: j.location,
          experience: j.experience,
          salary: j.salary,
          description: j.description
        }
      });

      for (const js of j.skills) {
        const sk = skillMap[js.name];
        if (sk) {
          await prisma.jobSkill.create({
            data: {
              jobId: createdJob.id,
              skillId: sk.id,
              requiredLevel: js.required,
              importance: js.importance
            }
          });
        }
      }

      // Initial match for student
      await prisma.jobMatch.create({
        data: {
          studentId: studentProfile.id,
          jobId: createdJob.id,
          matchPercentage: 85,
          skillMatch: 82,
          educationMatch: 95,
          experienceMatch: 75,
          interestMatch: 90,
          explanation: [
            `Strong match on ${j.skills[0]?.name || "core"} competencies`,
            "Academic credentials fulfill recruiter screening benchmark",
            "Target career aligns with opening requirements"
          ]
        }
      });
    }
  }

  // 8. Create Learning Resources
  const learningResources = [
    { title: "Advanced SQL Queries & Window Functions", skill: "SQL", type: "COURSE", difficulty: "Intermediate", duration: "6 hours", url: "https://www.geeksforgeeks.org/sql-window-function/" },
    { title: "Power BI Desktop & DAX Modeling", skill: "Power BI", type: "COURSE", difficulty: "Intermediate", duration: "8 hours", url: "https://learn.microsoft.com/en-us/training/paths/get-started-power-bi/" },
    { title: "Python for Data Analysis with Pandas", skill: "Python", type: "COURSE", difficulty: "Intermediate", duration: "10 hours", url: "https://pandas.pydata.org/docs/" },
    { title: "Statistical Thinking for Business Decisions", skill: "Statistics", type: "ARTICLE", difficulty: "Beginner", duration: "3 hours", url: "https://skillsbuild.org/" },
    { title: "E-Commerce Customer Retention Capstone", skill: "SQL", type: "PROJECT", difficulty: "Advanced", duration: "12 hours", url: "https://kaggle.com" },
    { title: "Executive Sales Dashboard Capstone", skill: "Power BI", type: "PROJECT", difficulty: "Intermediate", duration: "10 hours", url: "https://learn.microsoft.com" }
  ];

  for (const lr of learningResources) {
    const sk = skillMap[lr.skill];
    if (sk) {
      await prisma.learningResource.create({
        data: {
          title: lr.title,
          skillId: sk.id,
          type: lr.type,
          difficulty: lr.difficulty,
          duration: lr.duration,
          url: lr.url,
          description: `Industry-aligned verified educational resource for mastering ${lr.skill}.`
        }
      });
    }
  }

  // 9. Create Assessments & Questions
  const sqlSkill = skillMap["SQL"];
  if (sqlSkill) {
    const sqlAssessment = await prisma.assessment.create({
      data: {
        title: "SQL Diagnostic Competency Check",
        skillId: sqlSkill.id,
        duration: 25,
        totalQuestions: 3,
        description: "Verified assessment measuring schema design, join operations, and window aggregations."
      }
    });

    await prisma.assessmentQuestion.createMany({
      data: [
        {
          assessmentId: sqlAssessment.id,
          question: "Which SQL clause is used to filter grouped records after an aggregation has taken place?",
          options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
          correctAnswer: 1,
          difficulty: "Intermediate"
        },
        {
          assessmentId: sqlAssessment.id,
          question: "What is the primary difference between RANK() and DENSE_RANK() window functions?",
          options: [
            "RANK() skips numbers on tie values, whereas DENSE_RANK() does not skip rank values.",
            "DENSE_RANK() cannot use the OVER() clause.",
            "RANK() is only available in MySQL 5.7.",
            "There is no difference between them."
          ],
          correctAnswer: 0,
          difficulty: "Intermediate"
        },
        {
          assessmentId: sqlAssessment.id,
          question: "Which of the following creates a non-materialized temporary result set that can be referenced within a SELECT statement?",
          options: ["CTE (Common Table Expression)", "INDEX", "FOREIGN KEY", "UNIQUE CONSTRAINT"],
          correctAnswer: 0,
          difficulty: "Intermediate"
        }
      ]
    });
  }

  // 10. Create Skill Passport
  await prisma.skillPassport.create({
    data: {
      studentId: studentProfile.id,
      credentialId: "CRED-SB-2026-98741",
      verificationStatus: "VERIFIED"
    }
  });

  // 11. Initial Notifications
  await prisma.notification.createMany({
    data: [
      {
        userId: studentUser.id,
        title: "Welcome to SkillBridge Platform 🎉",
        message: "Your profile has been created with baseline verified competencies. Explore your personalized roadmap and opportunity matches.",
        type: "SYSTEM",
        read: false
      },
      {
        userId: studentUser.id,
        title: "New Opportunity Match Available",
        message: "Deloitte Digital posted 'Junior Data Analyst Intern' with an 85% verified fit score for your profile.",
        type: "JOB",
        read: false
      }
    ]
  });

  console.log("✅ SkillBridge database successfully seeded with demo student, recruiters, skills, jobs, and assessments!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
