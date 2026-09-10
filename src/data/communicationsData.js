// src/data/communicationsData.js
// Central Career Communications Data Store for SkillBridge Platform

export const INITIAL_COMMUNICATIONS = [
  {
    id: "comm-1",
    category: "Interview",
    type: "interview_invitation",
    sender: {
      name: "Priya Sharma",
      role: "Senior Talent Acquisition Partner",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80",
      email: "priya.sharma@techcorp.com"
    },
    subject: "Interview Invitation — Junior BI Analyst (Round 1)",
    preview: "Congratulations! We reviewed your verified SkillBridge profile and SQL assessment score...",
    body: `Dear Sachin,

Congratulations! Our hiring committee has reviewed your application for the Junior BI Analyst position. We were particularly impressed by your verified SkillBridge assessment score in SQL (86%) and your hands-on dashboard portfolio projects.

We would like to invite you for a Round 1 Technical & Analytical Interview.

Interview Schedule & Format:
• Date: Friday, September 18, 2026
• Time: 3:30 PM – 4:15 PM IST
• Mode: Google Meet (Video Call)
• Meeting Link: https://meet.google.com/sb-techcorp-interview
• Panel: Lead Business Intelligence Architect & Product Lead

Topics Covered:
1. SQL query optimization and window functions
2. Star-schema data modeling in Power BI
3. Walkthrough of your recent academic project

Please confirm your availability by clicking "Confirm Availability" or replying below. If you need to reschedule, please notify us at least 24 hours in advance.

Best regards,
Priya Sharma
Senior Talent Acquisition Partner • TechCorp`,
    timestamp: "2 hours ago",
    date: "10 Sep 2026",
    unread: true,
    starred: true,
    relatedApplicationId: "app-1",
    relatedOpportunityId: "opp-1",
    details: {
      company: "TechCorp",
      role: "Junior BI Analyst",
      round: "Round 1: Technical & Analytical",
      interviewDate: "18 Sep 2026, 3:30 PM IST",
      location: "Remote (Google Meet)",
      compensation: "₹35,000 / month Stipend",
      deadline: "Confirm by 15 Sep 2026"
    },
    replies: [
      {
        id: "rep-1",
        senderName: "Sachin",
        senderRole: "Applicant",
        timestamp: "1 hour ago",
        text: "Thank you for the invitation, Ms. Priya! I am excited about the opportunity and confirm my availability for Friday, September 18 at 3:30 PM IST."
      }
    ]
  },
  {
    id: "comm-2",
    category: "Job Offer",
    type: "job_offer",
    sender: {
      name: "Vikram Malhotra",
      role: "Director of University Relations",
      company: "Wipro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
      email: "campus.offers@wipro.com"
    },
    subject: "Official Internship Offer — Cloud Analytics Intern (Batch 2026)",
    preview: "We are thrilled to offer you the position of Cloud Analytics Intern at Wipro...",
    body: `Dear Sachin,

On behalf of Wipro, we are pleased to extend an official offer of internship for the role of Cloud Analytics Intern at our Hyderabad Innovation Hub (with flexible hybrid options).

Offer Overview:
• Position: Cloud Analytics Intern
• Department: Enterprise Data & Cloud Solutions
• Duration: 6 Months (Commencing 01 October 2026)
• Monthly Stipend: ₹40,000 / month
• Additional Perks: Comprehensive health insurance, learning credits, and fast-track PPO evaluation based on internship performance.

Your performance in the multi-stage technical screening and your verified Digital Skill Passport stood out among over 400 applicants.

Next Steps:
Please review the attached demo offer letter and indicate your formal acceptance through the portal by September 22, 2026.

Welcome to the team!

Warm regards,
Vikram Malhotra
Director of University Relations • Wipro`,
    timestamp: "1 day ago",
    date: "09 Sep 2026",
    unread: true,
    starred: true,
    relatedApplicationId: "app-4",
    relatedOpportunityId: "opp-4",
    details: {
      company: "Wipro",
      role: "Cloud Analytics Intern",
      status: "Offer Extended",
      joiningDate: "01 October 2026",
      location: "Hyderabad / Hybrid",
      compensation: "₹40,000 / month",
      validUntil: "22 Sep 2026"
    },
    replies: []
  },
  {
    id: "comm-3",
    category: "Assessment",
    type: "skill_assessment",
    sender: {
      name: "Accenture Talent Portal",
      role: "Automated Evaluation Engine",
      company: "Accenture",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      email: "evaluations@accenture.com"
    },
    subject: "Assessment Invitation: Software Developer Coding & SQL Benchmark",
    preview: "You have been invited to complete the Accenture Technical Assessment for Software Developer Intern...",
    body: `Dear Sachin_kvrs,

Thank you for your application to Accenture for the Software Developer Intern role.

As the next stage in our talent matching process, you have been invited to complete our Online Technical Skill Assessment.

Assessment Breakdown:
• Section 1: Algorithmic Problem Solving & Data Structures (45 mins)
• Section 2: SQL Querying & Database Design (30 mins)
• Section 3: System Logic & Debugging (15 mins)

Assessment Window:
• Available: Immediately
• Deadline: Sunday, September 15, 2026, 11:59 PM IST
• Duration: 90 Minutes (Continuous)

We recommend using a quiet space and a desktop browser. Your score will automatically sync with your SkillBridge verified passport.

Good luck!
Accenture Campus Hiring Team`,
    timestamp: "2 days ago",
    date: "08 Sep 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-3",
    relatedOpportunityId: "opp-3",
    details: {
      company: "Accenture",
      role: "Software Developer Intern",
      duration: "90 Minutes",
      deadline: "15 Sep 2026",
      status: "Ready to Start",
      topics: "DSA, SQL, Code Debugging"
    },
    replies: []
  },
  {
    id: "comm-4",
    category: "Recruiter Response",
    type: "recruiter_response",
    sender: {
      name: "Ananya Deshmukh",
      role: "Engineering Recruiter",
      company: "Infosys",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
      email: "ananya.d@infosys.com"
    },
    subject: "Update on your AI/ML Intern Application — Shortlisted for Technical Review",
    preview: "Hi Sachin, quick update regarding your application for the AI/ML Intern role...",
    body: `Hi Sachin,

I hope you're having a productive week!

I'm writing to let you know that our AI & Applied Insights team reviewed your application and project portfolio for the AI/ML Intern role. 

The hiring manager specifically highlighted your demonstrated knowledge in Python predictive modeling and your 82% industry readiness score. You have officially been moved to the "Shortlisted" candidate pool.

We are currently grouping interview slots for next week and will send out the calendar invite with interview times shortly. In the meantime, feel free to review our team's recent work on automated tabular forecasting.

Best,
Ananya Deshmukh
Engineering Recruiter • Infosys`,
    timestamp: "3 days ago",
    date: "07 Sep 2026",
    unread: false,
    starred: true,
    relatedApplicationId: "app-2",
    relatedOpportunityId: "opp-2",
    details: {
      company: "Infosys",
      role: "AI/ML Intern",
      status: "Shortlisted",
      location: "Bangalore",
      compensation: "₹30,000 / month",
      nextStep: "Technical Round 1 scheduling"
    },
    replies: []
  },
  {
    id: "comm-5",
    category: "Rejection",
    type: "rejection_constructive",
    sender: {
      name: "Razorpay University Team",
      role: "Talent Acquisition",
      company: "Razorpay",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80",
      email: "earlytalent@razorpay.com"
    },
    subject: "Application Update: Associate Backend Engineer — Constructive Feedback",
    preview: "Thank you for taking the time to apply to Razorpay. While we are not moving forward at this time...",
    body: `Dear Sachin,

Thank you for your interest in joining Razorpay as an Associate Backend Engineer and for completing the preliminary review.

While your profile showcases strong database fundamentals and enthusiasm, our team has decided to proceed with candidates who possess deeper hands-on experience in distributed systems and microservices architectures (specifically Go/Java and Redis caching).

We believe in supporting engineering students through constructive feedback. Here are the specific areas we recommend upskilling in:
1. Concurrency control and caching patterns (Redis/Memcached)
2. Asynchronous message queuing (Kafka or RabbitMQ)
3. API rate limiting and security headers

We encourage you to practice these modules in your SkillBridge Career Roadmap and re-apply in 90 days. We keep profiles active in our talent pipeline for future opportunities.

We wish you all the best in your continued learning and career journey!

Sincerely,
Early Talent Team • Razorpay`,
    timestamp: "4 days ago",
    date: "06 Sep 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-5",
    relatedOpportunityId: "opp-5",
    details: {
      company: "Razorpay",
      role: "Associate Backend Engineer",
      outcome: "Application Closed",
      feedbackIncluded: true,
      reapplyWindow: "After 90 Days (Dec 2026)"
    },
    replies: []
  },
  {
    id: "comm-6",
    category: "Thank You",
    type: "thank_you",
    sender: {
      name: "Kavita Nair",
      role: "HR Operations Coordinator",
      company: "Infosys",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
      email: "kavita.nair@infosys.com"
    },
    subject: "Thank you for attending Technical Round 1 — Infosys",
    preview: "Thank you for taking the time to speak with our engineering panel today...",
    body: `Dear Sachin,

Thank you for taking the time to speak with our engineering panel today for the AI/ML Intern position.

Our interviewers appreciated your thorough explanation of data preprocessing techniques and your thoughtful questions regarding our enterprise machine learning pipelines.

What happens next:
• The panel will submit their interview evaluations within 48 business hours.
• If selected for the final Managerial round, our scheduling team will reach out with calendar options by early next week.

Thank you again for your time and continued enthusiasm for Infosys.

Warm regards,
Kavita Nair
HR Operations Coordinator • Infosys`,
    timestamp: "5 days ago",
    date: "05 Sep 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-2",
    relatedOpportunityId: "opp-2",
    details: {
      company: "Infosys",
      role: "AI/ML Intern",
      stage: "Technical Round 1 Completed",
      turnaround: "48 Business Hours"
    },
    replies: []
  },
  {
    id: "comm-7",
    category: "Follow-up",
    type: "follow_up_action",
    sender: {
      name: "TCS Campus Hiring Cell",
      role: "Recruitment Automation",
      company: "TCS",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
      email: "campus.queries@tcs.com"
    },
    subject: "Action Required: Complete SkillBridge Verification Verification for TCS",
    preview: "Your application for Data Analyst Intern is currently under review by the hiring manager...",
    body: `Dear Sachin,

Your application for the Data Analyst Intern role at TCS is currently active and marked as "Under Review".

The hiring manager has requested a verified copy of your SkillBridge Digital Passport to validate your certified proficiency in Power BI and Statistical SQL.

To ensure your application moves forward to the shortlisting stage without delay:
1. Ensure your latest assessment results are verified.
2. Confirm your contact phone number and graduation year (2027) in your profile.

You can check the live status of your application anytime through your SkillBridge Applications dashboard.

Best,
TCS Campus Hiring Cell`,
    timestamp: "6 days ago",
    date: "04 Sep 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-1",
    relatedOpportunityId: "opp-1",
    details: {
      company: "TCS",
      role: "Data Analyst Intern",
      status: "Under Review",
      actionNeeded: "Verify Skill Passport & Profile Data",
      deadline: "12 Sep 2026"
    },
    replies: []
  },
  {
    id: "comm-8",
    category: "Job Alert",
    type: "job_alert",
    sender: {
      name: "SkillBridge Career Intelligence",
      role: "Opportunity Matching Engine",
      company: "SkillBridge Network",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80",
      email: "alerts@skillbridge.edu"
    },
    subject: "3 New High-Match Opportunities in Bangalore & Remote (85%+ Fit)",
    preview: "Based on your 82% industry readiness score and verified SQL/Power BI skills...",
    body: `Hello Sachin,

Based on your verified skills in SQL, Python, and Power BI, our deterministic Opportunity Matching Engine has identified 3 newly posted internships matching your profile:

1. Flipkart — Business Analytics Intern
   • Match Score: 92%
   • Location: Bangalore (On-site)
   • Stipend: ₹45,000 / month
   • Key Requirements: Advanced SQL, Tableau/Power BI, Business Metrics

2. Swiggy — Growth Intelligence Intern
   • Match Score: 88%
   • Location: Remote
   • Stipend: ₹38,000 / month
   • Key Requirements: Python EDA, Data Storytelling, Excel Modeling

3. Cred — Risk & Analytics Trainee
   • Match Score: 85%
   • Location: Bangalore
   • Stipend: ₹50,000 / month
   • Key Requirements: SQL Window Functions, Fraud Pattern Analysis

Click "View Opportunities" below to review requirements and apply directly with your verified Skill Passport.`,
    timestamp: "1 week ago",
    date: "03 Sep 2026",
    unread: false,
    starred: false,
    relatedOpportunityId: "opp-all",
    details: {
      matchedRoles: 3,
      topMatch: "Flipkart (92% Fit)",
      domain: "Data Analytics & Business Intelligence"
    },
    replies: []
  },
  {
    id: "comm-9",
    category: "Onboarding",
    type: "onboarding",
    sender: {
      name: "Ramesh Kannan",
      role: "People & Culture Lead",
      company: "Wipro",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
      email: "onboarding.earlycareers@wipro.com"
    },
    subject: "Pre-Onboarding Checklist: Wipro Cloud Analytics Internship",
    preview: "Welcome to Wipro! Here is the pre-onboarding document checklist for your joining...",
    body: `Dear Sachin,

Welcome aboard! We are preparing for your orientation on October 01, 2026.

To ensure your corporate email, VPN credentials, and laptop dispatch are processed seamlessly, please upload the following documents to the student portal by September 25:
1. College Bonafide Certificate / No Objection Certificate (NOC)
2. Verified SkillBridge Digital Passport (PDF or Credential Link)
3. Government Photo ID (Aadhaar / Passport)
4. Bank Account Details for stipend disbursement

If you have any queries regarding workstation logistics or orientation week, please reply directly to this thread.

Congratulations once again!

Regards,
Ramesh Kannan
People & Culture Lead • Wipro`,
    timestamp: "1 week ago",
    date: "02 Sep 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-4",
    relatedOpportunityId: "opp-4",
    details: {
      company: "Wipro",
      orientationDate: "01 Oct 2026",
      docDeadline: "25 Sep 2026",
      status: "Pre-Onboarding"
    },
    replies: []
  },
  {
    id: "comm-10",
    category: "Feedback",
    type: "industry_feedback",
    sender: {
      name: "Dr. Arvind Rao",
      role: "Industry Advisor & Lead Assessor",
      company: "Tech Mahindra / SkillBridge Council",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80",
      email: "arvind.rao@skillbridge-industry.org"
    },
    subject: "Assessment Feedback & Upskilling Advice: Power BI DAX & Data Warehousing",
    preview: "Detailed review of your recent Power BI assessment with targeted improvement advice...",
    body: `Dear Sachin,

I have completed the technical review of your recent Power BI & Data Analytics benchmark assessment on the SkillBridge platform.

Key Strengths:
• Strong grasp of basic data transformation in Power Query
• Clean dashboard visual layout and storytelling
• Proficient SQL data extraction logic

Priority Areas for Improvement (Skill Gap):
• DAX Calculation Context: Your evaluation showed hesitation when creating complex CALCULATE() and FILTER() measures with time intelligence functions (YTD, MTD).
• Star-Schema Design: We recommend reinforcing snowflake-to-star normalization to improve rendering speed on large datasets.

Actionable Advice:
Complete the "Power BI Desktop & DAX Modeling" module in your SkillBridge roadmap (estimated 3 weeks). Once done, you will qualify for senior analyst internships.

Keep up the great progress!
Dr. Arvind Rao`,
    timestamp: "2 weeks ago",
    date: "28 Aug 2026",
    unread: false,
    starred: false,
    relatedApplicationId: "app-1",
    details: {
      assessor: "Dr. Arvind Rao",
      focusArea: "Power BI DAX & Star Schema",
      gapIdentified: "Time Intelligence DAX (30% gap)",
      recommendedAction: "Power BI Desktop Module"
    },
    replies: []
  }
];

export const COMMUNICATION_CATEGORIES = [
  { id: "all", label: "Inbox", icon: "Inbox", description: "All career communications" },
  { id: "Interview", label: "Interview", icon: "Calendar", description: "Invitations & scheduling" },
  { id: "Assessment", label: "Assessment", icon: "FileCheck", description: "Coding & skill tests" },
  { id: "Thank You", label: "Thank You", icon: "ThumbsUp", description: "Post-interview notes" },
  { id: "Job Offer", label: "Job Offer", icon: "Award", description: "Offer letters & selections" },
  { id: "Rejection", label: "Rejection", icon: "XCircle", description: "Application outcomes & feedback" },
  { id: "Follow-up", label: "Follow-up", icon: "Clock", description: "Actions requiring student response" },
  { id: "Job Alert", label: "Job Alert", icon: "Bell", description: "Opportunity recommendations" },
  { id: "Recruiter Response", label: "Recruiter Response", icon: "Reply", description: "Direct recruiter messages" },
  { id: "Onboarding", label: "Onboarding", icon: "Sparkles", description: "Joining instructions & checklists" },
  { id: "Feedback", label: "Feedback", icon: "MessageSquareQuote", description: "Industry evaluation & reviews" },
  { id: "Other", label: "Other", icon: "HelpCircle", description: "General network updates" }
];
