// src/services/canonicalApplicationService.js
// SkillBridge Canonical Application State & Workflow Service
// Single source of truth for Student, Institution, and Industry recruiting pipelines.

export const APPLICATION_STATUS = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  FORWARDED_TO_INDUSTRY: "Forwarded to Industry",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  SELECTED: "Selected",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn"
};

export const ACTOR_ROLES = {
  STUDENT: "student",
  INSTITUTION: "institution",
  INDUSTRY: "industry",
  ADMIN: "admin"
};

/**
 * Valid transitions by actor role.
 * Enforces RBAC so students cannot select themselves or industry cannot bypass review rules.
 */
export const ALLOWED_TRANSITIONS = {
  [ACTOR_ROLES.STUDENT]: {
    [APPLICATION_STATUS.APPLIED]: [APPLICATION_STATUS.WITHDRAWN],
    [APPLICATION_STATUS.UNDER_REVIEW]: [APPLICATION_STATUS.WITHDRAWN],
    [APPLICATION_STATUS.FORWARDED_TO_INDUSTRY]: [APPLICATION_STATUS.WITHDRAWN],
    [APPLICATION_STATUS.SHORTLISTED]: [APPLICATION_STATUS.WITHDRAWN],
    [APPLICATION_STATUS.INTERVIEW]: [APPLICATION_STATUS.WITHDRAWN]
  },
  [ACTOR_ROLES.INSTITUTION]: {
    [APPLICATION_STATUS.APPLIED]: [
      APPLICATION_STATUS.UNDER_REVIEW,
      APPLICATION_STATUS.FORWARDED_TO_INDUSTRY,
      APPLICATION_STATUS.REJECTED
    ],
    [APPLICATION_STATUS.UNDER_REVIEW]: [
      APPLICATION_STATUS.FORWARDED_TO_INDUSTRY,
      APPLICATION_STATUS.REJECTED
    ]
  },
  [ACTOR_ROLES.INDUSTRY]: {
    [APPLICATION_STATUS.APPLIED]: [
      APPLICATION_STATUS.UNDER_REVIEW,
      APPLICATION_STATUS.SHORTLISTED,
      APPLICATION_STATUS.REJECTED
    ],
    [APPLICATION_STATUS.UNDER_REVIEW]: [
      APPLICATION_STATUS.SHORTLISTED,
      APPLICATION_STATUS.INTERVIEW,
      APPLICATION_STATUS.REJECTED
    ],
    [APPLICATION_STATUS.FORWARDED_TO_INDUSTRY]: [
      APPLICATION_STATUS.UNDER_REVIEW,
      APPLICATION_STATUS.SHORTLISTED,
      APPLICATION_STATUS.REJECTED
    ],
    [APPLICATION_STATUS.SHORTLISTED]: [
      APPLICATION_STATUS.INTERVIEW,
      APPLICATION_STATUS.SELECTED,
      APPLICATION_STATUS.REJECTED
    ],
    [APPLICATION_STATUS.INTERVIEW]: [
      APPLICATION_STATUS.SELECTED,
      APPLICATION_STATUS.REJECTED
    ]
  },
  [ACTOR_ROLES.ADMIN]: {
    [APPLICATION_STATUS.APPLIED]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.UNDER_REVIEW]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.FORWARDED_TO_INDUSTRY]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.SHORTLISTED]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.INTERVIEW]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.SELECTED]: Object.values(APPLICATION_STATUS),
    [APPLICATION_STATUS.REJECTED]: Object.values(APPLICATION_STATUS)
  }
};

/**
 * Validates if an actor can transition an application to a target status.
 */
export function canTransition(application, actorRole, targetStatus) {
  if (!application || !actorRole || !targetStatus) return false;
  const currentStatus = application.status;
  if (currentStatus === targetStatus) return false;
  const roleRules = ALLOWED_TRANSITIONS[actorRole];
  if (!roleRules) return false;
  const allowed = roleRules[currentStatus] || [];
  return allowed.includes(targetStatus);
}

/**
 * Status visual badge configurations
 */
export const STATUS_UI_META = {
  [APPLICATION_STATUS.APPLIED]: {
    badgeBg: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    color: "blue"
  },
  [APPLICATION_STATUS.UNDER_REVIEW]: {
    badgeBg: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    color: "amber"
  },
  [APPLICATION_STATUS.FORWARDED_TO_INDUSTRY]: {
    badgeBg: "bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800",
    color: "cyan"
  },
  [APPLICATION_STATUS.SHORTLISTED]: {
    badgeBg: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800",
    color: "indigo"
  },
  [APPLICATION_STATUS.INTERVIEW]: {
    badgeBg: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    color: "purple"
  },
  [APPLICATION_STATUS.SELECTED]: {
    badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
    color: "emerald"
  },
  [APPLICATION_STATUS.REJECTED]: {
    badgeBg: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
    color: "rose"
  },
  [APPLICATION_STATUS.WITHDRAWN]: {
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    color: "slate"
  }
};

/**
 * Initial Canonical Applications across multiple domains and companies.
 * All roles (Student, Institution, Industry) query and operate on this same dataset.
 */
export const INITIAL_CANONICAL_APPLICATIONS = [
  {
    id: "app-1",
    studentId: "std-101",
    studentName: "Sachin",
    studentEmail: "sachin.cs@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "TCS",
    position: "Data Analyst Intern",
    role: "Data Analyst Intern",
    appliedDate: "04 Sep 2026",
    appliedTimestamp: 1725408000000,
    deadline: "20 Sep 2026",
    status: APPLICATION_STATUS.UNDER_REVIEW,
    location: "Remote / Hybrid (Pan-India)",
    roleCategory: "Data Analyst",
    domainId: "cs_it",
    matchScore: 88,
    type: "Internship",
    verifiedSkills: ["SQL", "Power BI", "Python", "Data Storytelling"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
    passportCredentialId: "CRED-SB-2026-9482",
    nextAction: "HR resume review in progress. Recruiter feedback expected by 12 Sep 2026.",
    history: [
      { stage: "Applied", date: "04 Sep 2026", actor: "Student", note: "Application submitted with verified Digital Skill Passport.", done: true },
      { stage: "College Verification", date: "05 Sep 2026", actor: "Institution TPO", note: "Verified good academic standing & endorsed by TPO.", done: true },
      { stage: "Resume Viewed", date: "06 Sep 2026", actor: "TCS Recruiter", note: "Recruiter opened verified competency graph.", done: true },
      { stage: "Under Review", date: "07 Sep 2026", actor: "TCS Recruiter", note: "Application is in technical screening queue.", done: true }
    ],
    feedback: [
      {
        id: "fb-1",
        authorRole: ACTOR_ROLES.INSTITUTION,
        authorName: "Dr. R. Sharma (TPO)",
        category: "Endorsement",
        message: "Strong foundational SQL and analytics projects. Recommended for corporate internship placement.",
        timestamp: "05 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-blue-600 text-white"
  },
  {
    id: "app-2",
    studentId: "std-101",
    studentName: "Sachin",
    studentEmail: "sachin.cs@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "Infosys",
    position: "AI/ML Intern",
    role: "AI/ML Intern",
    appliedDate: "01 Sep 2026",
    appliedTimestamp: 1725148800000,
    deadline: "18 Sep 2026",
    status: APPLICATION_STATUS.SHORTLISTED,
    location: "Bangalore",
    roleCategory: "AI/ML Engineer",
    domainId: "cs_it",
    matchScore: 92,
    type: "Internship",
    verifiedSkills: ["Python", "PyTorch", "FastAPI", "Pandas"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
    passportCredentialId: "CRED-SB-2026-9482",
    nextAction: "Technical Round 1 scheduled for 15 Sep 2026 at 2:00 PM via Google Meet.",
    history: [
      { stage: "Applied", date: "01 Sep 2026", actor: "Student", note: "Application submitted.", done: true },
      { stage: "Profile Screened", date: "03 Sep 2026", actor: "Infosys AI Team", note: "Candidate matched 92% benchmark.", done: true },
      { stage: "Shortlisted", date: "05 Sep 2026", actor: "Infosys Recruiter", note: "Shortlisted for Round 1 Interview.", done: true }
    ],
    feedback: [
      {
        id: "fb-2",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "Infosys Campus Recruitment",
        category: "Shortlist Note",
        message: "Excellent hands-on computer vision and machine learning pipeline milestones verified in SkillBridge passport.",
        timestamp: "05 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-indigo-600 text-white"
  },
  {
    id: "app-3",
    studentId: "std-101",
    studentName: "Sachin",
    studentEmail: "sachin.cs@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "Accenture",
    position: "Software Developer Intern",
    role: "Software Developer Intern",
    appliedDate: "28 Aug 2026",
    appliedTimestamp: 1724803200000,
    deadline: "10 Sep 2026",
    status: APPLICATION_STATUS.INTERVIEW,
    location: "Hyderabad",
    roleCategory: "Software Developer",
    domainId: "cs_it",
    matchScore: 85,
    type: "Internship",
    verifiedSkills: ["Java", "Spring Boot", "REST APIs", "SQL"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
    passportCredentialId: "CRED-SB-2026-9482",
    nextAction: "Managerial Round on 12 Sep 2026 at 11:00 AM.",
    history: [
      { stage: "Applied", date: "28 Aug 2026", actor: "Student", note: "Applied via SkillBridge Direct.", done: true },
      { stage: "Online Assessment", date: "31 Aug 2026", actor: "Accenture System", note: "Scored 85% on coding test.", done: true },
      { stage: "Shortlisted", date: "03 Sep 2026", actor: "Accenture Lead", note: "Shortlisted for rounds.", done: true },
      { stage: "Interview Round 1", date: "08 Sep 2026", actor: "Technical Panel", note: "Passed coding & design round.", done: true }
    ],
    feedback: [
      {
        id: "fb-3",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "Accenture Hiring Panel",
        category: "Round 1 Evaluation",
        message: "Clean object-oriented design and API implementation. Demonstrated solid grasp of database query optimizations.",
        timestamp: "08 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-purple-600 text-white"
  },
  {
    id: "app-4",
    studentId: "std-101",
    studentName: "Sachin",
    studentEmail: "sachin.cs@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "Wipro",
    position: "Data Science Intern",
    role: "Data Science Intern",
    appliedDate: "20 Aug 2026",
    appliedTimestamp: 1724112000000,
    deadline: "05 Sep 2026",
    status: APPLICATION_STATUS.SELECTED,
    location: "Pune",
    roleCategory: "Data Science",
    domainId: "cs_it",
    matchScore: 94,
    type: "Internship",
    verifiedSkills: ["Python", "Pandas", "Scikit-Learn", "EDA"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
    passportCredentialId: "CRED-SB-2026-9482",
    nextAction: "Offer letter issued. Onboarding call scheduled for 25 Sep 2026.",
    history: [
      { stage: "Applied", date: "20 Aug 2026", actor: "Student", note: "Submitted application.", done: true },
      { stage: "Assessment", date: "23 Aug 2026", actor: "Wipro Talent", note: "Cleared data analysis challenge.", done: true },
      { stage: "Shortlisted", date: "26 Aug 2026", actor: "Wipro Hiring Team", note: "Selected for final review.", done: true },
      { stage: "Interview", date: "30 Aug 2026", actor: "Data Science Manager", note: "Cleared technical presentation.", done: true },
      { stage: "Offer Released", date: "04 Sep 2026", actor: "Wipro HR", note: "Official offer released.", done: true }
    ],
    feedback: [
      {
        id: "fb-4",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "Wipro HR Onboarding",
        category: "Final Selection",
        message: "Congratulations! You have been selected for the Data Science Internship cohort starting October 2026.",
        timestamp: "04 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-emerald-600 text-white"
  },
  {
    id: "app-5",
    studentId: "std-102",
    studentName: "Rahul Sharma",
    studentEmail: "rahul.s@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "TechCorp Inc.",
    position: "ML Intern",
    role: "ML Intern",
    appliedDate: "05 Sep 2026",
    appliedTimestamp: 1725494400000,
    deadline: "25 Sep 2026",
    status: APPLICATION_STATUS.UNDER_REVIEW,
    location: "Remote / Bangalore",
    roleCategory: "AI/ML Engineer",
    domainId: "cs_it",
    matchScore: 92,
    type: "Internship",
    verifiedSkills: ["Python", "PyTorch", "FastAPI", "NLP"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-8812.pdf",
    passportCredentialId: "CRED-SB-2026-8812",
    nextAction: "Candidate in review queue for upcoming interview slots.",
    history: [
      { stage: "Applied", date: "05 Sep 2026", actor: "Student", note: "Submitted application.", done: true },
      { stage: "Institution Endorsed", date: "06 Sep 2026", actor: "Institution TPO", note: "Forwarded to TechCorp partner pool.", done: true }
    ],
    feedback: [],
    logoBg: "bg-purple-600 text-white"
  },
  {
    id: "app-6",
    studentId: "std-103",
    studentName: "Aditi Verma",
    studentEmail: "aditi.v@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Information Technology",
    company: "TechCorp Inc.",
    position: "Data Analyst Intern",
    role: "Data Analyst Intern",
    appliedDate: "03 Sep 2026",
    appliedTimestamp: 1725321600000,
    deadline: "20 Sep 2026",
    status: APPLICATION_STATUS.SHORTLISTED,
    location: "Bangalore",
    roleCategory: "Data Analyst",
    domainId: "cs_it",
    matchScore: 94,
    type: "Internship",
    verifiedSkills: ["SQL", "Power BI", "Python", "EDA", "Tableau"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-7731.pdf",
    passportCredentialId: "CRED-SB-2026-7731",
    nextAction: "Recruiter technical interview invitation sent.",
    history: [
      { stage: "Applied", date: "03 Sep 2026", actor: "Student", note: "Applied with Skill Passport.", done: true },
      { stage: "Screened", date: "05 Sep 2026", actor: "TechCorp AI Matcher", note: "Matched 94% skills.", done: true },
      { stage: "Shortlisted", date: "07 Sep 2026", actor: "TechCorp Hiring Manager", note: "Selected for technical round.", done: true }
    ],
    feedback: [
      {
        id: "fb-6",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "TechCorp Hiring Team",
        category: "Technical Screening",
        message: "Outstanding Power BI portfolio and SQL CTE benchmarks.",
        timestamp: "07 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-blue-600 text-white"
  },
  {
    id: "app-7",
    studentId: "std-104",
    studentName: "Sneha Patel",
    studentEmail: "sneha.p@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "BBA / B.Tech Business Systems",
    company: "TechCorp Inc.",
    position: "Business Analyst Intern",
    role: "Business Analyst Intern",
    appliedDate: "06 Sep 2026",
    appliedTimestamp: 1725580800000,
    deadline: "24 Sep 2026",
    status: APPLICATION_STATUS.APPLIED,
    location: "Mumbai / Remote",
    roleCategory: "Business Analyst",
    domainId: "mgmt",
    matchScore: 78,
    type: "Internship",
    verifiedSkills: ["Excel", "Tableau", "Agile", "BPMN"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-6642.pdf",
    passportCredentialId: "CRED-SB-2026-6642",
    nextAction: "Awaiting initial recruiter screening.",
    history: [
      { stage: "Applied", date: "06 Sep 2026", actor: "Student", note: "Applied via SkillBridge.", done: true }
    ],
    feedback: [],
    logoBg: "bg-amber-600 text-white"
  },
  {
    id: "app-8",
    studentId: "std-101",
    studentName: "Sachin",
    studentEmail: "sachin.cs@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Computer Science & Engineering",
    company: "Deloitte",
    position: "Risk & Analytics Intern",
    role: "Risk & Analytics Intern",
    appliedDate: "29 Aug 2026",
    appliedTimestamp: 1724889600000,
    deadline: "15 Sep 2026",
    status: APPLICATION_STATUS.REJECTED,
    location: "Mumbai",
    roleCategory: "Data Analyst",
    domainId: "cs_it",
    matchScore: 72,
    type: "Internship",
    verifiedSkills: ["SQL", "Excel"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
    passportCredentialId: "CRED-SB-2026-9482",
    nextAction: "Application cycle closed. Eligible to reapply after 6-month cooldown.",
    history: [
      { stage: "Applied", date: "29 Aug 2026", actor: "Student", note: "Submitted application.", done: true },
      { stage: "OA Screen", date: "01 Sep 2026", actor: "Deloitte Evaluator", note: "Candidate met baseline.", done: true },
      { stage: "Closed", date: "08 Sep 2026", actor: "Deloitte HR", note: "Role cohort filled.", done: true }
    ],
    feedback: [
      {
        id: "fb-8",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "Deloitte Campus Talent",
        category: "Development Guidance",
        message: "Thank you for applying. We encourage completing financial risk modeling projects on SkillBridge before our next intake.",
        timestamp: "08 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-rose-600 text-white"
  },
  {
    id: "app-9",
    studentId: "std-105",
    studentName: "Karan Johar",
    studentEmail: "karan.j@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Electronics & Communication",
    company: "STMicroelectronics",
    position: "Embedded Systems Intern",
    role: "Embedded Systems Intern",
    appliedDate: "05 Sep 2026",
    appliedTimestamp: 1725494400000,
    deadline: "22 Sep 2026",
    status: APPLICATION_STATUS.FORWARDED_TO_INDUSTRY,
    location: "Noida",
    roleCategory: "Embedded Systems Engineer",
    domainId: "ece",
    matchScore: 89,
    type: "Internship",
    verifiedSkills: ["Embedded C", "Microcontrollers", "RTOS", "I2C/SPI"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-5521.pdf",
    passportCredentialId: "CRED-SB-2026-5521",
    nextAction: "Endorsed by Institution TPO. Awaiting STMicroelectronics recruiter review.",
    history: [
      { stage: "Applied", date: "05 Sep 2026", actor: "Student", note: "Applied with Skill Passport.", done: true },
      { stage: "Endorsed by TPO", date: "07 Sep 2026", actor: "Institution TPO", note: "Verified laboratory practical score. Forwarded to employer.", done: true }
    ],
    feedback: [
      {
        id: "fb-9",
        authorRole: ACTOR_ROLES.INSTITUTION,
        authorName: "ECE Department Placement Head",
        category: "Department Endorsement",
        message: "Exemplary lab scores in Microcontroller systems and firmware programming.",
        timestamp: "07 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-sky-700 text-white"
  },
  {
    id: "app-10",
    studentId: "std-106",
    studentName: "Pooja Hegde",
    studentEmail: "pooja.h@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Electrical & Electronics",
    company: "Siemens Energy",
    position: "Power Systems Intern",
    role: "Power Systems Intern",
    appliedDate: "30 Aug 2026",
    appliedTimestamp: 1724976000000,
    deadline: "18 Sep 2026",
    status: APPLICATION_STATUS.SHORTLISTED,
    location: "Pune",
    roleCategory: "Power Systems Engineer",
    domainId: "eee",
    matchScore: 87,
    type: "Internship",
    verifiedSkills: ["MATLAB", "Load Flow", "Power Electronics", "ETAP"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-4410.pdf",
    passportCredentialId: "CRED-SB-2026-4410",
    nextAction: "Technical interview Round 1 scheduled.",
    history: [
      { stage: "Applied", date: "30 Aug 2026", actor: "Student", note: "Applied via SkillBridge.", done: true },
      { stage: "Shortlisted", date: "04 Sep 2026", actor: "Siemens Energy Recruiter", note: "High match on ETAP modeling.", done: true }
    ],
    feedback: [],
    logoBg: "bg-amber-600 text-white"
  },
  {
    id: "app-11",
    studentId: "std-107",
    studentName: "Aditya Verma",
    studentEmail: "aditya.v@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Mechanical Engineering",
    company: "Mahindra",
    position: "CAD Design Intern",
    role: "CAD Design Intern",
    appliedDate: "03 Sep 2026",
    appliedTimestamp: 1725321600000,
    deadline: "21 Sep 2026",
    status: APPLICATION_STATUS.INTERVIEW,
    location: "Nashik",
    roleCategory: "Mechanical Design Engineer",
    domainId: "mech",
    matchScore: 89,
    type: "Internship",
    verifiedSkills: ["SolidWorks", "AutoCAD", "FEA Analysis", "GD&T"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-7811.pdf",
    passportCredentialId: "CRED-SB-2026-7811",
    nextAction: "Design challenge round on 13 Sep 2026. Submit assembly model.",
    history: [
      { stage: "Applied", date: "03 Sep 2026", actor: "Student", note: "Submitted SolidWorks assembly portfolio.", done: true },
      { stage: "Portfolio Review", date: "06 Sep 2026", actor: "Mahindra Design Lead", note: "GD&T and kinematic modeling verified.", done: true },
      { stage: "Interview Scheduled", date: "08 Sep 2026", actor: "Mahindra Recruiter", note: "Invited to virtual design challenge.", done: true }
    ],
    feedback: [
      {
        id: "fb-11",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "Mahindra Automotive Design Lead",
        category: "Portfolio Evaluation",
        message: "Excellent CAD assembly drawings. Verified tolerance analysis and gear train modeling skills.",
        timestamp: "08 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-red-700 text-white"
  },
  {
    id: "app-12",
    studentId: "std-108",
    studentName: "Kavya Nair",
    studentEmail: "kavya.n@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Tech Civil Engineering",
    company: "L&T Construction",
    position: "Structural Engineering Intern",
    role: "Structural Engineering Intern",
    appliedDate: "01 Sep 2026",
    appliedTimestamp: 1725148800000,
    deadline: "19 Sep 2026",
    status: APPLICATION_STATUS.UNDER_REVIEW,
    location: "Mumbai",
    roleCategory: "Structural Engineer",
    domainId: "civil",
    matchScore: 86,
    type: "Internship",
    verifiedSkills: ["STAAD Pro", "ETABS", "RCC Design", "AutoCAD Civil"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-3122.pdf",
    passportCredentialId: "CRED-SB-2026-3122",
    nextAction: "Technical resume evaluation by structural engineering team.",
    history: [
      { stage: "Applied", date: "01 Sep 2026", actor: "Student", note: "Applied with verified STAAD Pro credentials.", done: true },
      { stage: "Under Review", date: "05 Sep 2026", actor: "L&T Engineering Recruiter", note: "Reviewing seismic load calculations.", done: true }
    ],
    feedback: [],
    logoBg: "bg-slate-700 text-white"
  },
  {
    id: "app-13",
    studentId: "std-109",
    studentName: "Rohan Kapoor",
    studentEmail: "rohan.k@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "MBA & Tech Management",
    company: "McKinsey & Company",
    position: "Business Analyst Intern",
    role: "Business Analyst Intern",
    appliedDate: "06 Sep 2026",
    appliedTimestamp: 1725580800000,
    deadline: "25 Sep 2026",
    status: APPLICATION_STATUS.APPLIED,
    location: "Bangalore",
    roleCategory: "Business Analyst",
    domainId: "management",
    matchScore: 91,
    type: "Internship",
    verifiedSkills: ["Requirements Engineering", "BPMN", "Market Sizing", "Financial Modeling"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-5513.pdf",
    passportCredentialId: "CRED-SB-2026-5513",
    nextAction: "Application submitted. Case study round invitation expected.",
    history: [
      { stage: "Applied", date: "06 Sep 2026", actor: "Student", note: "Applied with business modeling credentials.", done: true }
    ],
    feedback: [],
    logoBg: "bg-blue-800 text-white"
  },
  {
    id: "app-14",
    studentId: "std-110",
    studentName: "Meera Krishnan",
    studentEmail: "meera.k@example.edu.in",
    college: "ABC Institute of Technology",
    degree: "B.Com / Finance Honors",
    company: "HDFC Bank",
    position: "Financial Analyst Intern",
    role: "Financial Analyst Intern",
    appliedDate: "04 Sep 2026",
    appliedTimestamp: 1725408000000,
    deadline: "22 Sep 2026",
    status: APPLICATION_STATUS.SHORTLISTED,
    location: "Mumbai",
    roleCategory: "Financial Analyst",
    domainId: "commerce",
    matchScore: 93,
    type: "Internship",
    verifiedSkills: ["Financial Modeling", "DCF Valuation", "Advanced Excel", "Ratio Analysis"],
    submittedResumeUrl: "https://skillbridge.edu/passports/CRED-SB-2026-8814.pdf",
    passportCredentialId: "CRED-SB-2026-8814",
    nextAction: "Aptitude + financial modeling test on 16 Sep 2026.",
    history: [
      { stage: "Applied", date: "04 Sep 2026", actor: "Student", note: "Applied via SkillBridge Finance track.", done: true },
      { stage: "Shortlisted", date: "08 Sep 2026", actor: "HDFC Talent Acquisition", note: "Shortlisted based on valuation test score.", done: true }
    ],
    feedback: [
      {
        id: "fb-14",
        authorRole: ACTOR_ROLES.INDUSTRY,
        authorName: "HDFC Wealth Management Recruiter",
        category: "Screening Evaluation",
        message: "Strong financial statement analysis and discounted cash flow modeling verified.",
        timestamp: "08 Sep 2026",
        visibility: "STUDENT_VISIBLE"
      }
    ],
    logoBg: "bg-cyan-700 text-white"
  }
];
