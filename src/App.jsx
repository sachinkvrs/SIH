import React, { useState, useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import TopHeader from "./components/common/TopHeader";
import AIAssistantModal from "./components/common/AIAssistantModal";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Screen Views
import LandingPage from "./components/screens/LandingPage";
import LoginPage from "./components/screens/LoginPage";
import StudentDashboard from "./components/screens/StudentDashboard";
import MySkills from "./components/screens/MySkills";
import Applications from "./components/screens/Applications";
import Notifications from "./components/screens/Notifications";
import Activity from "./components/screens/Activity";
import Profile from "./components/screens/Profile";
import Settings from "./components/screens/Settings";
import SkillAssessment from "./components/screens/SkillAssessment";
import SkillGapAnalysis from "./components/screens/SkillGapAnalysis";
import LearningRoadmap from "./components/screens/LearningRoadmap";
import LearningResource from "./components/screens/LearningResource";
import InternshipOpportunities from "./components/screens/InternshipOpportunities";
import DigitalSkillPassport from "./components/screens/DigitalSkillPassport";
import IndustryDashboard from "./components/screens/IndustryDashboard";
import InstitutionAnalytics from "./components/screens/InstitutionAnalytics";
import IndustryCollaboration from "./components/screens/IndustryCollaboration";
import Communications from "./components/screens/Communications";
import TargetRoleSelectorModal from "./components/common/TargetRoleSelectorModal";

// Career Intelligence & Roadmap Central Data
import { CAREER_INTELLIGENCE_DATA } from "./data/careerIntelligence";
import { getRoleData } from "./data/roleCompetencies";
import { ROADMAP_MODULES } from "./data/roadmapData";
import { INITIAL_COMMUNICATIONS } from "./data/communicationsData";
import { studentApi } from "./api/client";
import {
  APPLICATION_STATUS,
  ACTOR_ROLES,
  canTransition,
  INITIAL_CANONICAL_APPLICATIONS
} from "./services/canonicalApplicationService";
import {
  loadCanonicalLearningProgress,
  saveCanonicalLearningProgress,
  recordResourceToggle,
  recordAssessmentAttempt,
  getRoadmapOverallProgress,
  loadCompletedResourceIds,
  saveCompletedResourceIds,
  MODULE_STATUS
} from "./services/canonicalLearningService";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [careerGoal, setCareerGoal] = useState("Data Analyst");
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [highlightedRoadmapStepId, setHighlightedRoadmapStepId] = useState(null);

  // Active Career Profile Data: Guarantees complete roadmap, skill gaps, opportunities, and nextBestActions for ALL roles
  const careerData = React.useMemo(() => {
    const activeRoleCompetency = getRoleData(careerGoal);
    const legacyCareerData = CAREER_INTELLIGENCE_DATA[careerGoal] || (careerGoal === "Software Engineer" ? CAREER_INTELLIGENCE_DATA["Software Developer"] : null) || {};
    const gaps = (activeRoleCompetency?.skillGaps && activeRoleCompetency.skillGaps.length > 0)
      ? activeRoleCompetency.skillGaps
      : (legacyCareerData?.skillGaps || []);

    const roadmap = (activeRoleCompetency?.roadmap && activeRoleCompetency.roadmap.length > 0)
      ? activeRoleCompetency.roadmap
      : (legacyCareerData?.roadmap && legacyCareerData.roadmap.length > 0)
      ? legacyCareerData.roadmap
      : ROADMAP_MODULES;

    const opps = (activeRoleCompetency?.opportunities && activeRoleCompetency.opportunities.length > 0)
      ? activeRoleCompetency.opportunities
      : (legacyCareerData?.opportunities || []);

    // Generate dynamic nextBestActions tailored to this role's highest priority gaps and roadmap
    const dynamicNextBestActions = (legacyCareerData?.nextBestActions && legacyCareerData.nextBestActions.length > 0)
      ? legacyCareerData.nextBestActions
      : [
          {
            category: "Learning",
            title: gaps[0] ? `Bridge ${gaps[0].name} Skill Gap` : `Advance ${activeRoleCompetency?.roleName || careerGoal} Roadmap`,
            reason: gaps[0]
              ? `High impact milestone: ${gaps[0].recommendedAction || 'Master core concepts'} to close a ${gaps[0].gap}% gap.`
              : `Complete foundational module assessments to increase employer hiring readiness.`,
            priority: "HIGH",
            priorityColor: "bg-rose-100 text-rose-700 border-rose-200"
          },
          {
            category: "Verification",
            title: `Verify ${careerGoal} Skills on Passport`,
            reason: `Take proctored milestone assessments to earn tamper-proof credentials.`,
            priority: "MEDIUM",
            priorityColor: "bg-amber-100 text-amber-700 border-amber-200"
          },
          {
            category: "Opportunity",
            title: opps[0] ? `Apply for ${opps[0].role || opps[0].title}` : `Explore Verified Internships`,
            reason: opps[0]
              ? `${opps[0].company} is actively reviewing candidates in ${activeRoleCompetency?.domainName || 'your field'}.`
              : `Match your profile against live partner job postings.`,
            priority: "LOW",
            priorityColor: "bg-blue-100 text-blue-700 border-blue-200"
          }
        ];

    return {
      ...legacyCareerData,
      ...activeRoleCompetency,
      roadmap,
      skillGaps: gaps,
      opportunities: opps,
      nextBestActions: dynamicNextBestActions,
      readinessScore: activeRoleCompetency?.readinessScore || legacyCareerData?.readinessScore || 80,
      scoreDelta: activeRoleCompetency?.scoreDelta || legacyCareerData?.scoreDelta || "+5% this month",
      readinessStatus: activeRoleCompetency?.readinessStatus || legacyCareerData?.readinessStatus || "Industry Ready",
      readinessBreakdown: activeRoleCompetency?.readinessBreakdown || legacyCareerData?.readinessBreakdown || [
        { name: "Technical Skills", score: 82, desc: `Core competencies for ${careerGoal}` },
        { name: "Domain Knowledge", score: 78, desc: `${activeRoleCompetency?.domainName || "Engineering"} principles` },
        { name: "Tools & Frameworks", score: 75, desc: "Industry standard tools & labs" },
        { name: "Practical Projects", score: 80, desc: "Hands-on milestones" },
        { name: "Verified Credentials", score: 85, desc: "Digital Skill Passport badges" }
      ]
    };
  }, [careerGoal]);

  // Default Avatar Reference (Using user-specified sunset sports car profile photo)
  const DEFAULT_AVATAR = "/avatar-sachin.png";

  // Central Theme State ("light" | "dark" | "system") with localStorage persistence
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("skillbridge-theme");
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
    return "system";
  });

  // Apply theme to document root and listen to OS changes when theme === "system"
  useEffect(() => {
    const applyTheme = () => {
      let isDark = false;
      if (theme === "dark") {
        isDark = true;
      } else if (theme === "light") {
        isDark = false;
      } else {
        isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };

    applyTheme();

    try {
      localStorage.setItem("skillbridge-theme", theme);
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }

    if (theme === "system" && window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, [theme]);

  // Shared Profile State with localStorage persistence (Defaulted to user-specified Profile Information)
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("skillbridge_student_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Automatically upgrade previous hardcoded demo avatar or old name/course to new default
        if (
          parsed.fullName === "Sachin" ||
          !parsed.fullName ||
          parsed.email === "sachin.cs@example.edu.in" ||
          parsed.avatar?.includes("unsplash.com/photo-1534528741775")
        ) {
          const upgraded = {
            ...parsed,
            fullName: "Sachin_kvrs",
            email: "sachin.it@example.edu.in",
            phone: "+91 98765 43210",
            college: "sri sairam instute of techhnology",
            course: "Information Technology",
            gradYear: "2028",
            avatar: DEFAULT_AVATAR
          };
          localStorage.setItem("skillbridge_student_profile", JSON.stringify(upgraded));
          return upgraded;
        }
        return parsed;
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
    return {
      fullName: "Sachin_kvrs",
      email: "sachin.it@example.edu.in",
      phone: "+91 98765 43210",
      college: "sri sairam instute of techhnology",
      course: "Information Technology",
      gradYear: "2028",
      targetRole: "Data Analyst",
      preferredIndustry: "Artificial Intelligence & Enterprise SaaS",
      preferredLocation: "Bangalore, Remote",
      readinessScore: 82,
      avatar: DEFAULT_AVATAR
    };
  });

  // Central profile update handler with persistence and backend sync
  const handleUpdateProfile = (newProfile) => {
    setProfileData(newProfile);
    try {
      localStorage.setItem("skillbridge_student_profile", JSON.stringify(newProfile));
    } catch (e) {
      console.error("Failed to persist profile to localStorage", e);
    }
    // Asynchronously synchronize with backend API if online
    studentApi.updateProfile({
      name: newProfile.fullName,
      phone: newProfile.phone,
      institution: newProfile.college,
      department: newProfile.course,
      graduationYear: parseInt(newProfile.gradYear, 10) || undefined,
      targetCareer: newProfile.targetRole,
      avatar: newProfile.avatar
    }).catch(() => {
      // Graceful offline fallback
    });
  };

  // Synchronize profile from backend on initial mount if authenticated
  useEffect(() => {
    async function fetchLiveProfile() {
      try {
        const res = await studentApi.getProfile();
        if (res && res.success && res.data) {
          const s = res.data;
          setProfileData((prev) => ({
            ...prev,
            fullName: s.user?.name || prev.fullName,
            email: s.user?.email || prev.email,
            phone: s.phone || prev.phone,
            college: s.institution || prev.college,
            course: s.department || prev.course,
            gradYear: s.graduationYear ? String(s.graduationYear) : prev.gradYear,
            targetRole: s.targetCareer || prev.targetRole,
            avatar: s.user?.avatar || prev.avatar,
            readinessScore: s.readinessScore || prev.readinessScore
          }));
        }
      } catch (err) {
        // Backend offline or unauthenticated, graceful fallback to localStorage
      }
    }
    fetchLiveProfile();
  }, []);

  // Keep Profile Target Role and Readiness in sync with active Career Goal
  useEffect(() => {
    setProfileData((prev) => {
      const updated = {
        ...prev,
        targetRole: careerGoal,
        readinessScore: careerData.readinessScore
      };
      try {
        localStorage.setItem("skillbridge_student_profile", JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  }, [careerGoal, careerData.readinessScore]);

  // Canonical Learning Progress & Assessment State (Single Source of Truth)
  const [canonicalLearningProgress, setCanonicalLearningProgress] = useState(() => loadCanonicalLearningProgress());
  const [completedResourceIds, setCompletedResourceIds] = useState(() => loadCompletedResourceIds());

  // Derived completedModuleIds map for fast boolean checks and backward compatibility
  const completedModuleIds = React.useMemo(() => {
    const map = {};
    Object.entries(canonicalLearningProgress).forEach(([id, data]) => {
      if (data?.status === MODULE_STATUS.COMPLETED || data?.progressPercent === 100) {
        map[id] = true;
      }
    });
    return map;
  }, [canonicalLearningProgress]);

  const [activeLearningModuleId, setActiveLearningModuleId] = useState(null);
  const [activeLearningResourceId, setActiveLearningResourceId] = useState(null);

  // Shared Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      category: "Applications",
      title: "Application Shortlisted",
      desc: "Your application for Data Analyst Intern has been shortlisted.",
      timestamp: "2 hours ago",
      read: false,
      iconBg: "bg-indigo-100 text-indigo-600",
      actionText: "View Application",
      targetScreen: "applications",
      targetEntityId: "app-1",
      details: "TCS recruiters evaluated your verified Digital Skill Passport and shortlisted your candidacy for Round 1 technical interview."
    },
    {
      id: "notif-2",
      category: "Internships",
      title: "New Internship Match",
      desc: "New AI/ML internship matches 92% of your profile.",
      timestamp: "4 hours ago",
      read: false,
      iconBg: "bg-blue-100 text-blue-600",
      actionText: "View Opportunity",
      targetScreen: "opportunities",
      details: "InnovateAI Labs has opened applications for an AI/ML Research Intern position (Bangalore). Your verified competencies meet all core requirements."
    },
    {
      id: "notif-3",
      category: "Skills",
      title: "Skill Assessment Result",
      desc: "Your diagnostic assessment result is ready.",
      timestamp: "Yesterday",
      read: false,
      iconBg: "bg-emerald-100 text-emerald-600",
      actionText: "View Results",
      targetScreen: "skill_gap",
      details: "Your diagnostic assessment shows strong capability across fundamentals. Review your updated skill gap priorities."
    },
    {
      id: "notif-4",
      category: "Learning",
      title: "Learning Module Waiting",
      desc: "Your active learning milestone is ready to resume.",
      timestamp: "Yesterday",
      read: false,
      iconBg: "bg-amber-100 text-amber-600",
      actionText: "Continue Learning",
      targetScreen: "roadmap",
      details: "You have open learning milestones in your personalized career roadmap. Completing hands-on projects fulfills industry readiness requirements."
    },
    {
      id: "notif-5",
      category: "System",
      title: "Profile Successfully Updated",
      desc: "Your profile has been successfully updated.",
      timestamp: "2 days ago",
      read: true,
      iconBg: "bg-slate-100 text-slate-600",
      actionText: "Review Profile",
      targetScreen: "profile",
      details: "Your academic credentials were synchronized with your institutional records. Changes are now visible to partner employers."
    }
  ]);

  // Shared Canonical Applications State (Single Source of Truth across Student, Industry, and Institution)
  const [applicationsList, setApplicationsList] = useState(() => {
    try {
      const saved = localStorage.getItem("skillbridge_canonical_applications");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load canonical applications from localStorage", e);
    }
    return INITIAL_CANONICAL_APPLICATIONS;
  });

  // Sync canonical applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillbridge_canonical_applications", JSON.stringify(applicationsList));
    } catch (e) {
      console.error("Failed to save canonical applications to localStorage", e);
    }
  }, [applicationsList]);

  // Shared Career Communications State with LocalStorage Persistence
  const [communicationsList, setCommunicationsList] = useState(() => {
    try {
      const saved = localStorage.getItem("skillbridge_communications");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load communications from localStorage", e);
    }
    return INITIAL_COMMUNICATIONS;
  });

  const [focusedAppId, setFocusedAppId] = useState(null);

  // Sync communications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("skillbridge_communications", JSON.stringify(communicationsList));
    } catch (e) {
      console.error("Failed to save communications to localStorage", e);
    }
  }, [communicationsList]);

  // Derived unread communications count
  const unreadCommCount = communicationsList.filter((c) => c.unread).length;

  const handleMarkCommAsRead = (id) => {
    setCommunicationsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: false } : c))
    );
  };

  const handleToggleCommStar = (id) => {
    setCommunicationsList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, starred: !c.starred } : c))
    );
  };

  const handleDeleteComm = (id) => {
    setCommunicationsList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSendCommReply = (commId, replyText) => {
    const newReply = {
      id: `rep-${Date.now()}`,
      senderName: profileData.fullName || "Sachin",
      senderRole: "Applicant",
      timestamp: "Just now",
      text: replyText
    };

    setCommunicationsList((prev) =>
      prev.map((c) => {
        if (c.id === commId) {
          return {
            ...c,
            replies: [...(c.replies || []), newReply]
          };
        }
        return c;
      })
    );

    // Also record this in student activity timeline
    setActivityTimeline((prev) => [
      {
        id: `act-${Date.now()}`,
        type: "Communications",
        title: "Sent Recruiter Reply",
        time: "Just now",
        dateGroup: "Today",
        desc: `Replied to recruiter inquiry: "${replyText.substring(0, 60)}..."`,
        meta: "Delivered",
        metaColor: "bg-blue-100 text-blue-800 border-blue-200"
      },
      ...prev
    ]);
  };

  // ============================================================
  // CANONICAL APPLICATION WORKFLOW ENGINE (Single Source of Truth)
  // Enforces RBAC, appends immutable timeline events, dispatches notifications
  // ============================================================
  const handleApplicationStatusChange = (appId, targetStatus, actorRole = ACTOR_ROLES.INDUSTRY, note = "", feedbackData = null) => {
    const targetApp = applicationsList.find((a) => a.id === appId);
    if (!targetApp) {
      console.warn(`Application ${appId} not found.`);
      return { success: false, error: "Application not found" };
    }

    if (!canTransition(targetApp, actorRole, targetStatus)) {
      console.warn(`Transition from "${targetApp.status}" to "${targetStatus}" not permitted for role "${actorRole}".`);
      return { success: false, error: `Invalid transition from ${targetApp.status} to ${targetStatus} for ${actorRole}` };
    }

    const nowStr = "Today";
    const timestamp = Date.now();

    // Actor display name
    const actorName =
      actorRole === ACTOR_ROLES.INDUSTRY
        ? `${targetApp.company} Recruiter`
        : actorRole === ACTOR_ROLES.INSTITUTION
        ? "Institution TPO"
        : actorRole === ACTOR_ROLES.STUDENT
        ? targetApp.studentName || "Applicant"
        : "System Administrator";

    // Build timeline event
    const newTimelineEvent = {
      stage: targetStatus,
      date: nowStr,
      timestamp,
      actor: actorName,
      note: note || `Status transitioned to ${targetStatus} by ${actorName}.`,
      done: true
    };

    // Determine next action guidance
    let nextActionText = targetApp.nextAction;
    if (targetStatus === APPLICATION_STATUS.UNDER_REVIEW) {
      nextActionText = `${targetApp.company} technical panel reviewing candidate portfolio.`;
    } else if (targetStatus === APPLICATION_STATUS.FORWARDED_TO_INDUSTRY) {
      nextActionText = `Institution endorsed & forwarded to ${targetApp.company}. Recruiter review pending.`;
    } else if (targetStatus === APPLICATION_STATUS.SHORTLISTED) {
      nextActionText = `Congratulations! You have been shortlisted by ${targetApp.company}. Interview slot scheduling soon.`;
    } else if (targetStatus === APPLICATION_STATUS.INTERVIEW) {
      nextActionText = `Interview round scheduled with ${targetApp.company} technical committee.`;
    } else if (targetStatus === APPLICATION_STATUS.SELECTED) {
      nextActionText = `Offer Extended! Formal selection and onboarding documents pending issue.`;
    } else if (targetStatus === APPLICATION_STATUS.REJECTED) {
      nextActionText = `Application process concluded. Resume and feedback recorded for future opportunities.`;
    } else if (targetStatus === APPLICATION_STATUS.WITHDRAWN) {
      nextActionText = `Application withdrawn by applicant.`;
    }

    // Build new feedback item if provided
    let newFeedbackList = targetApp.feedback || [];
    if (feedbackData) {
      const fbItem = {
        id: `fb-${Date.now()}`,
        authorRole,
        authorName: feedbackData.authorName || actorName,
        category: feedbackData.category || "Evaluation Note",
        message: feedbackData.message,
        timestamp: nowStr,
        visibility: feedbackData.visibility || "STUDENT_VISIBLE"
      };
      newFeedbackList = [fbItem, ...newFeedbackList];
    }

    // Update canonical application
    const updatedApplication = {
      ...targetApp,
      status: targetStatus,
      nextAction: nextActionText,
      history: [...(targetApp.history || []), newTimelineEvent],
      feedback: newFeedbackList
    };

    setApplicationsList((prev) =>
      prev.map((app) => (app.id === appId ? updatedApplication : app))
    );

    // If student is recipient, create high-priority notification with deep-link
    const notifTitle =
      targetStatus === APPLICATION_STATUS.SHORTLISTED
        ? `Shortlisted by ${targetApp.company}! 🎉`
        : targetStatus === APPLICATION_STATUS.INTERVIEW
        ? `Interview Scheduled: ${targetApp.company}`
        : targetStatus === APPLICATION_STATUS.SELECTED
        ? `Selected! Offer from ${targetApp.company} 🏆`
        : targetStatus === APPLICATION_STATUS.FORWARDED_TO_INDUSTRY
        ? `College Endorsed: Application Forwarded to ${targetApp.company}`
        : targetStatus === APPLICATION_STATUS.REJECTED
        ? `Application Update: ${targetApp.company}`
        : `Status Update: ${targetApp.company}`;

    const newNotif = {
      id: `notif-${Date.now()}`,
      category: "Applications",
      title: notifTitle,
      desc: note || `Your application for ${targetApp.position} at ${targetApp.company} is now ${targetStatus}.`,
      timestamp: "Just now",
      read: false,
      iconBg:
        targetStatus === APPLICATION_STATUS.SELECTED
          ? "bg-emerald-100 text-emerald-600"
          : targetStatus === APPLICATION_STATUS.SHORTLISTED || targetStatus === APPLICATION_STATUS.INTERVIEW
          ? "bg-indigo-100 text-indigo-600"
          : targetStatus === APPLICATION_STATUS.FORWARDED_TO_INDUSTRY
          ? "bg-cyan-100 text-cyan-600"
          : targetStatus === APPLICATION_STATUS.REJECTED
          ? "bg-rose-100 text-rose-600"
          : "bg-blue-100 text-blue-600",
      actionText: "View Application",
      targetScreen: "applications",
      targetEntityId: appId,
      details: note || `${actorName} updated your application status to ${targetStatus}. Check timeline and feedback in ATS.`
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Record in global Activity Timeline
    const newAct = {
      id: `act-${Date.now()}`,
      type: "Applications",
      title: `${targetApp.company}: ${targetStatus}`,
      time: "Just now",
      dateGroup: "Today",
      desc: `${actorName} updated application for ${targetApp.position} to ${targetStatus}. ${note || ""}`,
      meta: targetStatus,
      metaColor:
        targetStatus === APPLICATION_STATUS.SELECTED
          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
          : targetStatus === APPLICATION_STATUS.SHORTLISTED || targetStatus === APPLICATION_STATUS.INTERVIEW
          ? "bg-indigo-100 text-indigo-800 border-indigo-200"
          : targetStatus === APPLICATION_STATUS.REJECTED
          ? "bg-rose-100 text-rose-800 border-rose-200"
          : "bg-blue-100 text-blue-800 border-blue-200"
    };
    setActivityTimeline((prev) => [newAct, ...prev]);

    // Also dispatch official communication letter to student's Communications Center
    if (actorRole !== ACTOR_ROLES.STUDENT) {
      const commCategory =
        targetStatus === APPLICATION_STATUS.INTERVIEW
          ? "Interview"
          : targetStatus === APPLICATION_STATUS.SELECTED
          ? "Offer"
          : targetStatus === APPLICATION_STATUS.SHORTLISTED
          ? "Application"
          : targetStatus === APPLICATION_STATUS.FORWARDED_TO_INDUSTRY
          ? "Institutional"
          : "Application";

      const commType =
        targetStatus === APPLICATION_STATUS.INTERVIEW
          ? "interview_invitation"
          : targetStatus === APPLICATION_STATUS.SELECTED
          ? "offer_letter"
          : "status_update";

      const newComm = {
        id: `comm-${Date.now()}`,
        category: commCategory,
        type: commType,
        sender: {
          name: actorName,
          role: actorRole === ACTOR_ROLES.INSTITUTION ? "Head of Training & Placements" : "Senior Talent Acquisition Partner",
          company: actorRole === ACTOR_ROLES.INSTITUTION ? (targetApp.college || "Placement Cell") : targetApp.company,
          avatar:
            actorRole === ACTOR_ROLES.INSTITUTION
              ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
              : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
          email:
            actorRole === ACTOR_ROLES.INSTITUTION
              ? "tpo@institution.edu.in"
              : `recruitment@${targetApp.company.toLowerCase().replace(/[^a-z0-9]/g, "") || "company"}.com`
        },
        subject: `${notifTitle} — ${targetApp.position}`,
        preview: note || `Official update: Your application has been moved to ${targetStatus}.`,
        body: `Dear ${profileData?.fullName || "Student"},\n\nWe would like to inform you that your application for the ${targetApp.position} position at ${targetApp.company} has been updated to "${targetStatus}".\n\n${note ? `Reviewer Notes: ${note}\n\n` : ""}Next Steps:\n${nextActionText}\n\nYou can track all your stages, interview details, and recruiter feedback notes anytime through the SkillBridge ATS.\n\nBest regards,\n${actorName}`,
        timestamp: "Just now",
        date: "Today",
        unread: true,
        starred: targetStatus === APPLICATION_STATUS.SELECTED || targetStatus === APPLICATION_STATUS.SHORTLISTED,
        relatedApplicationId: appId,
        details: {
          company: targetApp.company,
          role: targetApp.position,
          status: targetStatus,
          updatedBy: actorName
        },
        replies: []
      };
      setCommunicationsList((prev) => [newComm, ...prev]);
    }

    return { success: true, application: updatedApplication };
  };

  // Recruiter & Institution Feedback Handler
  const handleAddApplicationFeedback = (appId, feedbackData, actorRole = ACTOR_ROLES.INDUSTRY) => {
    const targetApp = applicationsList.find((a) => a.id === appId);
    if (!targetApp) return false;

    const actorName =
      actorRole === ACTOR_ROLES.INDUSTRY
        ? `${targetApp.company} Hiring Team`
        : actorRole === ACTOR_ROLES.INSTITUTION
        ? "Institution Placement Cell"
        : "SkillBridge Reviewer";

    const fbItem = {
      id: `fb-${Date.now()}`,
      authorRole,
      authorName: feedbackData.authorName || actorName,
      category: feedbackData.category || "Review Note",
      message: feedbackData.message,
      timestamp: "Today",
      visibility: feedbackData.visibility || "STUDENT_VISIBLE"
    };

    setApplicationsList((prev) =>
      prev.map((app) =>
        app.id === appId
          ? {
              ...app,
              feedback: [fbItem, ...(app.feedback || [])]
            }
          : app
      )
    );

    if (feedbackData.visibility === "STUDENT_VISIBLE") {
      const newNotif = {
        id: `notif-${Date.now()}`,
        category: "Applications",
        title: `New Feedback from ${targetApp.company}`,
        desc: feedbackData.message.substring(0, 90) + (feedbackData.message.length > 90 ? "..." : ""),
        timestamp: "Just now",
        read: false,
        iconBg: "bg-purple-100 text-purple-600",
        actionText: "View Feedback",
        targetScreen: "applications",
        targetEntityId: appId,
        details: feedbackData.message
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // Add feedback item to communications
      const newComm = {
        id: `comm-${Date.now()}`,
        category: "Feedback",
        type: "evaluation_feedback",
        sender: {
          name: feedbackData.authorName || actorName,
          role: "Hiring & Evaluation Committee",
          company: targetApp.company,
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
          email: `recruitment@${targetApp.company.toLowerCase().replace(/[^a-z0-9]/g, "") || "company"}.com`
        },
        subject: `Evaluation Feedback: ${targetApp.position} at ${targetApp.company}`,
        preview: feedbackData.message.substring(0, 95) + (feedbackData.message.length > 95 ? "..." : ""),
        body: `Dear ${profileData?.fullName || "Student"},\n\nThe recruitment team at ${targetApp.company} has shared review feedback on your profile for ${targetApp.position}:\n\nCategory: ${feedbackData.category || "Review Note"}\nFeedback Note:\n"${feedbackData.message}"\n\nYou can review this feedback anytime in your Application Tracker.\n\nBest regards,\n${feedbackData.authorName || actorName}`,
        timestamp: "Just now",
        date: "Today",
        unread: true,
        starred: false,
        relatedApplicationId: appId,
        details: {
          company: targetApp.company,
          role: targetApp.position,
          category: feedbackData.category
        },
        replies: []
      };
      setCommunicationsList((prev) => [newComm, ...prev]);
    }

    return true;
  };

  // Cross-module Navigation: Jump from Communication to Application
  const handleViewApplicationFromComm = (appId) => {
    setFocusedAppId(appId);
    navigateToScreen("applications");
  };

  // Cross-module Entity Navigation: Navigate to a specific entity (e.g. application from notification)
  const handleNavigateToEntity = (screen, entityId) => {
    if (screen === "applications" && entityId) {
      setFocusedAppId(entityId);
    }
    navigateToScreen(screen);
  };

  // Shared Activity Timeline State
  const [activityTimeline, setActivityTimeline] = useState([
    {
      id: "act-1",
      type: "Assessments",
      title: "Completed SQL Skill Assessment",
      time: "10:42 AM",
      dateGroup: "Today",
      desc: "Proctored diagnostic assessment submitted successfully.",
      meta: "Score: 65%",
      metaColor: "bg-amber-100 text-amber-800 border-amber-200"
    },
    {
      id: "act-2",
      type: "Skills",
      title: "Added Python to your skill profile",
      time: "9:20 AM",
      dateGroup: "Today",
      desc: "Self-reported competency added with portfolio GitHub repository link.",
      meta: "Proficiency: 85%",
      metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
    },
    {
      id: "act-3",
      type: "Learning",
      title: "Completed Power BI Module 3",
      time: "6:15 PM",
      dateGroup: "Yesterday",
      desc: "Finished interactive DAX modeling and visualization tutorial exercises.",
      meta: "Progress: 75%",
      metaColor: "bg-blue-100 text-blue-800 border-blue-200"
    },
    {
      id: "act-4",
      type: "Applications",
      title: "Applied for Data Analyst Intern at TCS",
      time: "3:40 PM",
      dateGroup: "Yesterday",
      desc: "Submitted application with verified Digital Skill Passport attached.",
      meta: "Status: Under Review",
      metaColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
    },
    {
      id: "act-5",
      type: "Profile",
      title: "Updated career preferences",
      time: "11:15 AM",
      dateGroup: "2 days ago",
      desc: "Set target job role to 'Data Analyst' with Hybrid work preference.",
      meta: "Profile Updated",
      metaColor: "bg-slate-100 text-slate-800 border-slate-200"
    }
  ]);

  // Notification helpers
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Determine portal type for sidebar items and active user
  const getPortalType = () => {
    if (
      currentScreen === "industry_dashboard" ||
      currentScreen === "post_jobs" ||
      currentScreen === "skill_requirements" ||
      currentScreen === "candidate_matching" ||
      currentScreen === "feedback"
    ) {
      return "industry";
    }
    if (
      currentScreen === "institution_analytics" ||
      currentScreen === "skill_demand" ||
      currentScreen === "curriculum_gap" ||
      currentScreen === "placements" ||
      currentScreen === "students" ||
      currentScreen === "reports" ||
      currentScreen === "skill_analytics"
    ) {
      return "institution";
    }
    return "student";
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  // Cross-module Action: Change Career Goal
  const handleChangeCareerGoal = (newGoal) => {
    if (!newGoal) return;
    setCareerGoal(newGoal);
    const newCareerData = CAREER_INTELLIGENCE_DATA[newGoal] || getRoleData(newGoal) || CAREER_INTELLIGENCE_DATA["Data Analyst"];
    
    // Sync with Student Profile state and localStorage
    setProfileData((prev) => {
      const updated = {
        ...prev,
        targetRole: newGoal,
        readinessScore: newCareerData.readinessScore || prev.readinessScore || 75
      };
      try {
        localStorage.setItem("skillbridge_student_profile", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save profile targetRole", e);
      }
      return updated;
    });

    // Sync with backend API if online
    studentApi.updateProfile({
      targetCareer: newGoal
    }).catch(() => {});

    // Log Activity Timeline
    const newAct = {
      id: `act-${Date.now()}`,
      type: "Profile",
      title: `Changed target career goal to ${newGoal}`,
      time: "Just now",
      dateGroup: "Today",
      desc: `Recalibrated skill requirements, priority gaps, roadmap steps, and matching opportunities for ${newGoal}.`,
      meta: `Target: ${newGoal}`,
      metaColor: "bg-blue-100 text-blue-800 border-blue-200"
    };
    setActivityTimeline((prev) => [newAct, ...prev]);

    // Create Recalibration Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      category: "System",
      title: `Career Goal Updated: ${newGoal}`,
      desc: `Your readiness is recalibrated to ${newCareerData.readinessScore || 75}%. View your new priority skill gaps and learning roadmap.`,
      timestamp: "Just now",
      read: false,
      iconBg: "bg-blue-100 text-blue-600",
      actionText: "View Skill Gaps",
      targetScreen: "skill_gap",
      details: newCareerData.readinessSummary || `Career intelligence model recalibrated for ${newGoal}.`
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Cross-module Action: Apply for an Opportunity (Canonical Application Creation)
  const handleApplyOpportunity = (opp, customSubmission = null) => {
    const roleTitle = opp.role || opp.position || `${careerGoal} Intern`;
    // Check if already applied
    if (applicationsList.some((a) => a.company === opp.company && (a.position === roleTitle || a.role === roleTitle))) {
      return;
    }

    const appId = `app-${Date.now()}`;
    const newApplication = {
      id: appId,
      studentId: "std-101",
      studentName: customSubmission?.applicantName || profileData?.fullName || "Sachin_kvrs",
      studentEmail: customSubmission?.applicantEmail || profileData?.email || "sachin.it@example.edu.in",
      studentPhone: customSubmission?.applicantPhone || profileData?.phone || "+91 98765 43210",
      college: profileData?.college || "sri sairam instute of techhnology",
      degree: profileData?.degree || profileData?.course || "Information Technology",
      company: opp.company,
      position: roleTitle,
      role: roleTitle,
      appliedDate: "Today",
      appliedTimestamp: Date.now(),
      deadline: opp.deadline || "30 Sep 2026",
      status: APPLICATION_STATUS.APPLIED,
      location: opp.location || "Hybrid / Pan-India",
      roleCategory: careerGoal,
      domainId: getRoleData(careerGoal)?.domainId || "cs_it",
      matchScore: opp.matchPercentage || 85,
      type: opp.duration || opp.type || "Internship",
      source: opp.source || "SkillBridge Direct",
      verifiedSkills: Array.isArray(opp.tags) ? opp.tags : [careerGoal, "Problem Solving"],
      resumeType: customSubmission?.resumeType || "passport",
      submittedResumeUrl:
        customSubmission?.resumeType === "upload" && customSubmission?.uploadedResume?.name
          ? customSubmission.uploadedResume.name
          : "https://skillbridge.edu/passports/CRED-SB-2026-9482.pdf",
      submittedResumeFile: customSubmission?.uploadedResume || null,
      portfolioLink: customSubmission?.portfolioLink || "https://github.com/sachin-dev",
      coverNote: customSubmission?.coverNote || "",
      passportCredentialId: customSubmission?.attachPassport ? "CRED-SB-2026-88492-V" : null,
      nextAction: "Application submitted. Institution endorsement & initial recruiter screening in progress.",
      history: [
        {
          stage: APPLICATION_STATUS.APPLIED,
          date: "Today",
          timestamp: Date.now(),
          actor: customSubmission?.applicantName || profileData?.fullName || "Applicant",
          note: customSubmission?.attachPassport
            ? `Applied with verified Digital Skill Passport (${opp.matchPercentage || 85}% profile match).`
            : `Applied with custom uploaded resume (${customSubmission?.uploadedResume?.name || "Resume"}).`,
          done: true
        }
      ],
      feedback: [],
      logoBg: opp.logoBg || "bg-blue-600 text-white"
    };

    setApplicationsList((prev) => [newApplication, ...prev]);

    // Add Activity
    const newAct = {
      id: `act-${Date.now()}`,
      type: "Applications",
      title: `Applied for ${roleTitle} at ${opp.company}`,
      time: "Just now",
      dateGroup: "Today",
      desc: `Submitted application with ${customSubmission?.attachPassport ? "verified Digital Skill Passport" : "custom resume"} (${opp.matchPercentage || 85}% match).`,
      meta: `Status: ${APPLICATION_STATUS.APPLIED}`,
      metaColor: "bg-blue-100 text-blue-800 border-blue-200"
    };
    setActivityTimeline((prev) => [newAct, ...prev]);

    // Add Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      category: "Applications",
      title: "Application Submitted Successfully",
      desc: `Your application for ${roleTitle} at ${opp.company} has been received.`,
      timestamp: "Just now",
      read: false,
      iconBg: "bg-blue-100 text-blue-600",
      actionText: "View Applications",
      targetScreen: "applications",
      targetEntityId: appId,
      details: `Your application for ${roleTitle} at ${opp.company} has been entered into the institution & recruiter review pipeline.`
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Cross-module Action: Open Dedicated Learning Resource Page (Does NOT mark complete)
  const handleOpenLearningResource = (moduleId, resourceId = null) => {
    setActiveLearningModuleId(moduleId);
    setActiveLearningResourceId(resourceId);
    navigateToScreen("learning_resource");

    // Look up module in ROADMAP_MODULES first, then in role-specific roadmap
    const activeRoleModules = (getRoleData(careerGoal)?.roadmap) || [];
    const mod =
      ROADMAP_MODULES.find((m) => m.id === moduleId) ||
      activeRoleModules.find((m) => m.id === moduleId);

    if (mod) {
      const newAct = {
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Started ${mod.title} learning module`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Exploring curriculum and resources for ${Array.isArray(mod.skills) ? mod.skills.join(", ") : mod.title}.`,
        meta: "In Progress ●",
        metaColor: "bg-blue-100 text-blue-800 border-blue-200"
      };
      setActivityTimeline((prev) => [newAct, ...prev]);
    }
  };

  // Explicit Action: Toggle Completion of a Specific Resource
  const handleToggleResourceCompleted = (moduleId, resourceId, totalResourcesCount = 1) => {
    const result = recordResourceToggle(moduleId, resourceId, totalResourcesCount, canonicalLearningProgress);
    setCanonicalLearningProgress(result.updatedStore);
    setCompletedResourceIds(result.completedResourceIds);
  };

  // Assessment Submission Handler: Proctored/Module verification
  const handleAssessmentSubmit = (moduleId, answers, questions) => {
    const result = recordAssessmentAttempt(moduleId, answers, questions, canonicalLearningProgress);
    setCanonicalLearningProgress(result.updatedStore);

    const activeRoleModules = (getRoleData(careerGoal)?.roadmap) || [];
    const mod =
      ROADMAP_MODULES.find((m) => m.id === moduleId) ||
      activeRoleModules.find((m) => m.id === moduleId);

    if (result.passed) {
      handleCompleteModule(moduleId);
    } else if (mod) {
      const failNotif = {
        id: `notif-${Date.now()}`,
        category: "Learning",
        title: `${mod.title} Assessment: Score ${result.score}%`,
        desc: `Score was below passing threshold (70%). Review module study resources and retry.`,
        timestamp: "Just now",
        read: false,
        iconBg: "bg-amber-100 text-amber-600",
        actionText: "Review Material",
        targetScreen: "learning_resource",
        details: `Scored ${result.score}% (${result.updatedModule.assessmentResult?.correctCount || 0}/${questions.length || 5} questions). 70% required to certify competency.`
      };
      setNotifications((prev) => [failNotif, ...prev]);
    }

    return result;
  };

  // Cross-module Action: Mark Module Completed Independently
  const handleCompleteModule = (moduleId) => {
    setCanonicalLearningProgress((prev) => {
      const existing = prev[moduleId] || {};
      const updated = {
        ...prev,
        [moduleId]: {
          ...existing,
          moduleId,
          status: MODULE_STATUS.COMPLETED,
          progressPercent: 100,
          completedAt: existing.completedAt || Date.now(),
          lastActivityAt: Date.now()
        }
      };
      saveCanonicalLearningProgress(updated);
      return updated;
    });

    const activeRoleModules = (getRoleData(careerGoal)?.roadmap) || [];
    const mod =
      ROADMAP_MODULES.find((m) => m.id === moduleId) ||
      activeRoleModules.find((m) => m.id === moduleId);

    const allModules = [...activeRoleModules, ...ROADMAP_MODULES.filter(m => !activeRoleModules.some(r => r.id === m.id))];
    const modIdx = allModules.findIndex((m) => m.id === moduleId);
    const nextMod = allModules[modIdx + 1];

    if (mod) {
      // Record Activity
      const newAct = {
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Completed ${mod.title}`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Mastered competencies for ${Array.isArray(mod.skills) ? mod.skills.join(", ") : mod.title}. Verified on your Digital Skill Passport.`,
        meta: "Completed ✓",
        metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      };
      setActivityTimeline((prev) => [newAct, ...prev]);

      // Trigger Celebration Notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        category: "Learning",
        title: `${mod.title} Completed Successfully! 🎉`,
        desc: nextMod && nextMod.id !== "internship-ready"
          ? `Great job! ${nextMod.title} is now unlocked in your roadmap.`
          : "All prerequisite learning modules are completed! You are Internship Ready.",
        timestamp: "Just now",
        read: false,
        iconBg: "bg-emerald-100 text-emerald-600",
        actionText: "View Roadmap",
        targetScreen: "roadmap",
        details: `Completing ${mod.title} advances your industry readiness score.`
      };
      setNotifications((prev) => [newNotif, ...prev]);

      // Readiness Boost
      setProfileData((prev) => ({
        ...prev,
        readinessScore: Math.min(100, prev.readinessScore + 3)
      }));
    }
  };

  // Cross-module Action: Deep-link from Skill Gap to Roadmap Module or Resource
  const handleStartLearningFromGap = (moduleId) => {
    // Get role-specific roadmap modules
    const activeRoleData = getRoleData(careerGoal);
    const roleModules = activeRoleData?.roadmap || [];

    // First: try exact match in role-specific roadmap
    if (roleModules.some((m) => m.id === moduleId)) {
      handleOpenLearningResource(moduleId);
      return;
    }

    // Second: try exact match in generic ROADMAP_MODULES
    if (ROADMAP_MODULES.some((m) => m.id === moduleId)) {
      handleOpenLearningResource(moduleId);
      return;
    }

    // Third: try to match by roadmapStepId → roadmap module ID
    const matchedRoleModule = roleModules.find((m) =>
      m.id === moduleId ||
      moduleId?.includes(m.id) ||
      m.id?.includes(moduleId?.replace(/^step-/, "").replace(/^gap-/, ""))
    );
    if (matchedRoleModule) {
      handleOpenLearningResource(matchedRoleModule.id);
      return;
    }

    // Fourth: fuzzy match in generic ROADMAP_MODULES
    const matchedGenericModule = ROADMAP_MODULES.find((m) =>
      moduleId?.includes(m.id) || m.id.includes(moduleId?.replace(/^step-/, "").replace(/^gap-/, ""))
    );
    if (matchedGenericModule) {
      handleOpenLearningResource(matchedGenericModule.id);
      return;
    }

    // Fifth: fallback to highlighting the step in the roadmap
    setHighlightedRoadmapStepId(moduleId);
    navigateToScreen("roadmap");
  };

  // Render individual screen content with connected shared state
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "landing":
        return <LandingPage onNavigate={navigateToScreen} />;
      case "login":
        return <LoginPage onNavigate={navigateToScreen} />;
      case "student_dashboard":
        return (
          <StudentDashboard
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            onChangeCareerGoal={handleChangeCareerGoal}
            onOpenRoleSelector={() => setRoleModalOpen(true)}
            careerData={careerData}
            profileData={profileData}
            completedModuleIds={completedModuleIds}
            canonicalLearningProgress={canonicalLearningProgress}
            onOpenResource={handleOpenLearningResource}
            recentActivities={activityTimeline}
            onApplyOpportunity={handleApplyOpportunity}
            applicationsList={applicationsList}
          />
        );
      case "my_skills":
        return (
          <MySkills
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            careerData={careerData}
          />
        );
      case "applications":
        return (
          <Applications
            onNavigate={navigateToScreen}
            applicationsList={applicationsList}
            onUpdateApplicationStatus={handleApplicationStatusChange}
            focusedAppId={focusedAppId}
          />
        );
      case "communications":
        return (
          <Communications
            onNavigate={navigateToScreen}
            communicationsList={communicationsList}
            onMarkAsRead={handleMarkCommAsRead}
            onToggleStar={handleToggleCommStar}
            onDeleteComm={handleDeleteComm}
            onSendReply={handleSendCommReply}
            onViewApplication={handleViewApplicationFromComm}
          />
        );
      case "notifications":
        return (
          <Notifications
            onNavigate={navigateToScreen}
            onNavigateToEntity={handleNavigateToEntity}
            notifications={notifications}
            onMarkAllAsRead={markAllAsRead}
            onMarkAsRead={markAsRead}
          />
        );
      case "activity":
        return (
          <Activity
            onNavigate={navigateToScreen}
            activityTimeline={activityTimeline}
          />
        );
      case "profile":
        return (
          <Profile
            profileData={profileData}
            onUpdateProfile={handleUpdateProfile}
            careerGoal={careerGoal}
            onChangeCareerGoal={handleChangeCareerGoal}
            onNavigate={navigateToScreen}
          />
        );
      case "settings":
        return (
          <Settings
            onNavigate={navigateToScreen}
            profileData={profileData}
            onUpdateProfile={handleUpdateProfile}
            careerGoal={careerGoal}
            onChangeCareerGoal={handleChangeCareerGoal}
            theme={theme}
            onThemeChange={setTheme}
          />
        );
      case "skill_assessment":
        return (
          <SkillAssessment
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            careerData={careerData}
            onOpenRoleSelector={() => setRoleModalOpen(true)}
            onRecordActivity={(act) => setActivityTimeline((prev) => [act, ...prev])}
            onNotify={(notif) => {
              const newNotif = {
                id: `notif-${Date.now()}`,
                category: notif.type || "Skills",
                title: notif.title,
                desc: notif.desc,
                timestamp: "Just now",
                read: false,
                iconBg: "bg-blue-100 text-blue-600",
                actionText: "View Analysis",
                targetScreen: notif.targetScreen || "skill_gap",
                details: notif.desc
              };
              setNotifications((prev) => [newNotif, ...prev]);
            }}
          />
        );
      case "skill_gap":
        return (
          <SkillGapAnalysis
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            careerData={careerData}
            onOpenRoleSelector={() => setRoleModalOpen(true)}
            onStartLearning={handleStartLearningFromGap}
          />
        );
      case "roadmap":
        return (
          <LearningRoadmap
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            careerData={careerData}
            completedModuleIds={completedModuleIds}
            canonicalLearningProgress={canonicalLearningProgress}
            onCompleteModule={handleCompleteModule}
            onOpenResource={handleOpenLearningResource}
            highlightedStepId={highlightedRoadmapStepId}
            onOpenRoleSelector={() => setRoleModalOpen(true)}
          />
        );
      case "learning_resource":
        return (
          <LearningResource
            moduleId={activeLearningModuleId}
            resourceId={activeLearningResourceId}
            careerGoal={careerGoal}
            onNavigate={navigateToScreen}
            onOpenResource={handleOpenLearningResource}
            onCompleteModule={handleCompleteModule}
            onAssessmentSubmit={handleAssessmentSubmit}
            isCompleted={!!completedModuleIds[activeLearningModuleId]}
            completedModuleIds={completedModuleIds}
            canonicalLearningProgress={canonicalLearningProgress}
            completedResourceIds={completedResourceIds}
            onToggleResourceCompleted={handleToggleResourceCompleted}
            onRecordActivity={(act) => setActivityTimeline((prev) => [act, ...prev])}
          />
        );
      case "opportunities":
        return (
          <InternshipOpportunities
            onNavigate={navigateToScreen}
            careerGoal={careerGoal}
            careerData={careerData}
            profileData={profileData}
            appliedApplications={applicationsList}
            onApplyOpportunity={handleApplyOpportunity}
            onOpenRoleSelector={() => setRoleModalOpen(true)}
          />
        );
      case "skill_passport":
        return (
          <DigitalSkillPassport
            profileData={profileData}
            careerGoal={careerGoal}
            careerData={careerData}
            onNavigate={navigateToScreen}
          />
        );
      case "industry_dashboard":
      case "post_jobs":
      case "skill_requirements":
      case "candidate_matching":
      case "feedback":
        return (
          <IndustryDashboard
            onNavigate={navigateToScreen}
            activeSection={currentScreen}
            applicationsList={applicationsList}
            onUpdateApplicationStatus={handleApplicationStatusChange}
            onAddFeedback={handleAddApplicationFeedback}
          />
        );
      case "institution_analytics":
      case "skill_demand":
      case "curriculum_gap":
      case "placements":
      case "students":
      case "reports":
      case "skill_analytics":
        return (
          <InstitutionAnalytics
            onNavigate={navigateToScreen}
            activeSection={currentScreen}
            applicationsList={applicationsList}
            onUpdateApplicationStatus={handleApplicationStatusChange}
            onAddFeedback={handleAddApplicationFeedback}
          />
        );
      case "industry_collaboration":
        return (
          <IndustryCollaboration
            onNavigate={navigateToScreen}
            onRecordActivity={(act) => setActivityTimeline((prev) => [act, ...prev])}
            onNotify={(notif) => {
              const newNotif = {
                id: `notif-${Date.now()}`,
                category: notif.type || "Collaboration",
                title: notif.title,
                desc: notif.desc,
                timestamp: "Just now",
                read: false,
                iconBg: "bg-blue-100 text-blue-600",
                actionText: "View Activity",
                targetScreen: "activity",
                details: notif.desc
              };
              setNotifications((prev) => [newNotif, ...prev]);
            }}
          />
        );
      default:
        return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-slate-200 shadow-xs max-w-xl mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4 text-2xl font-bold">
              404
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Screen Not Found</h3>
            <p className="text-sm text-slate-500 mb-6 max-w-md">
              The requested view <code className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-xs">"{currentScreen}"</code> does not exist or has been relocated in the SkillBridge Career Intelligence System.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => navigateToScreen("student_dashboard")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition cursor-pointer"
              >
                Return to Student Dashboard
              </button>
              <button
                onClick={() => navigateToScreen("landing")}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                Home Page
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1220] text-slate-900 dark:text-slate-100 flex flex-col font-sans relative transition-colors duration-200">
      {currentScreen === "landing" || currentScreen === "login" ? (
        /* Full-page views for Landing and Login */
        <div className="flex-1">
          {renderScreenContent()}
        </div>
      ) : (
        /* App Portal Shell (Sidebar + TopHeader + Content) */
        <div className="flex h-screen overflow-hidden relative">
          <Sidebar
            activeScreen={currentScreen}
            onNavigate={navigateToScreen}
            portalType={getPortalType()}
            unreadCount={unreadCount}
            unreadCommCount={unreadCommCount}
            profileData={profileData}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <TopHeader
              onNavigate={navigateToScreen}
              notifications={notifications}
              unreadCommCount={unreadCommCount}
              onMarkAllAsRead={markAllAsRead}
              onMarkAsRead={markAsRead}
              profileData={profileData}
              careerGoal={careerGoal}
              onOpenRoleSelector={() => setRoleModalOpen(true)}
              onOpenResource={handleOpenLearningResource}
              onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
            />
            <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 bg-[#F8FAFC] dark:bg-[#0B1220] transition-colors duration-200">
              <ErrorBoundary onReset={() => navigateToScreen("student_dashboard")}>
                {renderScreenContent()}
              </ErrorBoundary>
            </main>
          </div>
        </div>
      )}

      {/* Global Floating AI Career Assistant (Available across all authenticated portal screens) */}
      {currentScreen !== "landing" && currentScreen !== "login" && (
        <AIAssistantModal
          isOpen={aiAssistantOpen}
          onClose={() => setAiAssistantOpen(false)}
          onToggle={() => setAiAssistantOpen((prev) => !prev)}
          careerGoal={careerGoal}
          careerData={careerData}
          onNavigate={navigateToScreen}
        />
      )}

      {/* Universal Target Role Selector Modal */}
      <TargetRoleSelectorModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        currentRole={careerGoal}
        userDomain={profileData?.domain || "cs_it"}
        onSelectRole={(newRole) => {
          handleChangeCareerGoal(newRole);
        }}
      />
    </div>
  );
}
