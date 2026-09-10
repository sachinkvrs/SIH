import React, { useState, useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import TopHeader from "./components/common/TopHeader";
import AIAssistantModal from "./components/common/AIAssistantModal";

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

// Career Intelligence & Roadmap Central Data
import { CAREER_INTELLIGENCE_DATA } from "./data/careerIntelligence";
import { ROADMAP_MODULES } from "./data/roadmapData";
import { studentApi } from "./api/client";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("landing");
  const [careerGoal, setCareerGoal] = useState("Data Analyst");
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [highlightedRoadmapStepId, setHighlightedRoadmapStepId] = useState(null);

  // Active Career Profile Data
  const careerData = CAREER_INTELLIGENCE_DATA[careerGoal] || CAREER_INTELLIGENCE_DATA["Data Analyst"];

  // Default Avatar Reference
  const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

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

  // Shared Profile State with localStorage persistence
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem("skillbridge_student_profile");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
    return {
      fullName: "Sachin",
      email: "sachin.cs@example.edu.in",
      phone: "+91 98765 43210",
      college: "ABC Institute of Technology",
      course: "Computer Science & Engineering",
      gradYear: "2027",
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

  // Independent Roadmap Modules Completion State
  const [completedModuleIds, setCompletedModuleIds] = useState({
    "sql-fundamentals": true
  });
  const [activeLearningModuleId, setActiveLearningModuleId] = useState("advanced-sql");

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
      desc: "Your SQL assessment result is ready.",
      timestamp: "Yesterday",
      read: false,
      iconBg: "bg-emerald-100 text-emerald-600",
      actionText: "View Results",
      targetScreen: "skill_gap",
      details: "Your diagnostic assessment shows strong capability in fundamental queries and multi-table joins. An identified 15% gap remains for advanced queries."
    },
    {
      id: "notif-4",
      category: "Learning",
      title: "Learning Module Waiting",
      desc: "Your Power BI learning module is waiting to be completed.",
      timestamp: "Yesterday",
      read: false,
      iconBg: "bg-amber-100 text-amber-600",
      actionText: "Continue Learning",
      targetScreen: "roadmap",
      details: "You are currently on Module 3 of the Data Analytics Career Roadmap. Completing DAX and interactive report exercises will fulfill industry readiness requirements."
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
      details: "Your academic credentials were synchronized with ABC Institute of Technology records. Changes are now visible to partner employers."
    }
  ]);

  // Shared Applications Pipeline State
  const [applicationsList, setApplicationsList] = useState([
    {
      id: "app-1",
      company: "TCS",
      position: "Data Analyst Intern",
      appliedDate: "04 Sep 2026",
      appliedTimestamp: 1725408000000,
      deadline: "20 Sep 2026",
      status: "Under Review",
      location: "Remote",
      roleCategory: "Data Analyst",
      nextAction: "HR resume review in progress. Recruiter feedback expected by 12 Sep 2026.",
      history: [
        { stage: "Applied", date: "04 Sep 2026", done: true },
        { stage: "Resume Viewed", date: "06 Sep 2026", done: true },
        { stage: "Under Review", date: "07 Sep 2026", done: true },
        { stage: "Interview", date: "Pending", done: false },
        { stage: "Selection", date: "Pending", done: false },
      ],
      logoBg: "bg-blue-600 text-white"
    },
    {
      id: "app-2",
      company: "Infosys",
      position: "AI/ML Intern",
      appliedDate: "01 Sep 2026",
      appliedTimestamp: 1725148800000,
      deadline: "18 Sep 2026",
      status: "Shortlisted",
      location: "Bangalore",
      roleCategory: "AI/ML",
      nextAction: "Technical Round 1 scheduled for 15 Sep 2026 at 2:00 PM via Google Meet.",
      history: [
        { stage: "Applied", date: "01 Sep 2026", done: true },
        { stage: "Profile Screened", date: "03 Sep 2026", done: true },
        { stage: "Shortlisted", date: "05 Sep 2026", done: true },
        { stage: "Interview Round 1", date: "15 Sep 2026", done: false },
        { stage: "Selection", date: "Pending", done: false },
      ],
      logoBg: "bg-indigo-600 text-white"
    },
    {
      id: "app-3",
      company: "Accenture",
      position: "Software Developer Intern",
      appliedDate: "28 Aug 2026",
      appliedTimestamp: 1724803200000,
      deadline: "10 Sep 2026",
      status: "Interview",
      location: "Hyderabad",
      roleCategory: "Software Developer",
      nextAction: "Technical interview Round 2 on 12 Sep 2026 at 11:00 AM.",
      history: [
        { stage: "Applied", date: "28 Aug 2026", done: true },
        { stage: "Online Assessment", date: "31 Aug 2026", done: true },
        { stage: "Shortlisted", date: "03 Sep 2026", done: true },
        { stage: "Interview Round 1", date: "08 Sep 2026", done: true },
        { stage: "Managerial Round", date: "12 Sep 2026", done: false },
      ],
      logoBg: "bg-purple-600 text-white"
    },
    {
      id: "app-4",
      company: "Wipro",
      position: "Data Science Intern",
      appliedDate: "20 Aug 2026",
      appliedTimestamp: 1724112000000,
      deadline: "05 Sep 2026",
      status: "Selected",
      location: "Pune",
      roleCategory: "Data Science",
      nextAction: "Offer letter issued. Onboarding call scheduled for 25 Sep 2026.",
      history: [
        { stage: "Applied", date: "20 Aug 2026", done: true },
        { stage: "Assessment", date: "23 Aug 2026", done: true },
        { stage: "Shortlisted", date: "26 Aug 2026", done: true },
        { stage: "Interview", date: "30 Aug 2026", done: true },
        { stage: "Offer Released", date: "04 Sep 2026", done: true },
      ],
      logoBg: "bg-emerald-600 text-white"
    }
  ]);

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
    setCareerGoal(newGoal);
    const newCareerData = CAREER_INTELLIGENCE_DATA[newGoal] || CAREER_INTELLIGENCE_DATA["Data Analyst"];
    
    // Log Activity
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

    // Create Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      category: "System",
      title: `Career Goal Updated: ${newGoal}`,
      desc: `Your readiness is recalibrated to ${newCareerData.readinessScore}%. View your new priority skill gaps and learning roadmap.`,
      timestamp: "Just now",
      read: false,
      iconBg: "bg-blue-100 text-blue-600",
      actionText: "View Skill Gaps",
      targetScreen: "skill_gap",
      details: newCareerData.readinessSummary
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Cross-module Action: Apply for an Opportunity
  const handleApplyOpportunity = (opp) => {
    const roleTitle = opp.role || opp.position || "Data Analyst Intern";
    // Check if already applied
    if (applicationsList.some((a) => a.company === opp.company && (a.position === roleTitle || a.role === roleTitle))) {
      return;
    }

    const newApplication = {
      id: `app-${Date.now()}`,
      company: opp.company,
      position: roleTitle,
      role: roleTitle,
      appliedDate: "Today",
      appliedTimestamp: Date.now(),
      deadline: opp.deadline || "30 Sep 2026",
      status: "Under Review",
      location: opp.location || "Hybrid / Pan-India",
      roleCategory: careerGoal,
      matchPercentage: opp.matchPercentage || 85,
      type: opp.type || "Internship",
      source: opp.source || "SkillBridge Direct",
      nextAction: "Application submitted. Recruiter initial profile screening in progress.",
      history: [
        { stage: "Applied", date: "Today", done: true },
        { stage: "Resume Viewed", date: "Pending", done: false },
        { stage: "Under Review", date: "Pending", done: false },
        { stage: "Interview", date: "Pending", done: false },
        { stage: "Selection", date: "Pending", done: false },
      ],
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
      desc: `Submitted application with verified Digital Skill Passport attached (${opp.matchPercentage || 85}% profile match).`,
      meta: "Status: Under Review",
      metaColor: "bg-indigo-100 text-indigo-800 border-indigo-200"
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
      iconBg: "bg-indigo-100 text-indigo-600",
      actionText: "View Applications",
      targetScreen: "applications",
      details: `Your application for ${roleTitle} at ${opp.company} has been entered into the recruiter review queue with your verified SkillBridge profile.`
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Cross-module Action: Open Dedicated Learning Resource Page (Does NOT mark complete)
  const handleOpenLearningResource = (moduleId) => {
    setActiveLearningModuleId(moduleId);
    navigateToScreen("learning_resource");

    const mod = ROADMAP_MODULES.find((m) => m.id === moduleId);
    if (mod) {
      const newAct = {
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Started ${mod.title} learning module`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Exploring curriculum and resources for ${mod.skills.join(", ")}.`,
        meta: "In Progress ●",
        metaColor: "bg-blue-100 text-blue-800 border-blue-200"
      };
      setActivityTimeline((prev) => [newAct, ...prev]);
    }
  };

  // Cross-module Action: Mark Module Completed Independently
  const handleCompleteModule = (moduleId) => {
    // ONLY mark THIS module as completed
    setCompletedModuleIds((prev) => ({
      ...prev,
      [moduleId]: true
    }));

    const mod = ROADMAP_MODULES.find((m) => m.id === moduleId);
    const modIdx = ROADMAP_MODULES.findIndex((m) => m.id === moduleId);
    const nextMod = ROADMAP_MODULES[modIdx + 1];

    if (mod) {
      // Record Activity
      const newAct = {
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Completed ${mod.title}`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Mastered competencies for ${mod.skills.join(", ")}. Verified on your Digital Skill Passport.`,
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
    let targetId = moduleId;
    if (moduleId === "gap-sql" || moduleId === "step-adv-sql" || moduleId?.includes("sql")) {
      targetId = "advanced-sql";
    } else if (moduleId === "gap-pbi" || moduleId === "step-pbi" || moduleId?.includes("pbi") || moduleId?.includes("power-bi")) {
      targetId = "power-bi";
    }
    if (ROADMAP_MODULES.some((m) => m.id === targetId)) {
      handleOpenLearningResource(targetId);
    } else {
      const matched = ROADMAP_MODULES.find((m) => targetId?.includes(m.id) || m.id.includes(targetId));
      if (matched) {
        handleOpenLearningResource(matched.id);
      } else {
        setHighlightedRoadmapStepId(moduleId);
        navigateToScreen("roadmap");
      }
    }
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
            careerData={careerData}
            profileData={profileData}
            completedModuleIds={completedModuleIds}
            onOpenResource={handleOpenLearningResource}
            recentActivities={activityTimeline}
            onApplyOpportunity={handleApplyOpportunity}
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
            onSetApplicationsList={setApplicationsList}
          />
        );
      case "notifications":
        return (
          <Notifications
            onNavigate={navigateToScreen}
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
            onCompleteModule={handleCompleteModule}
            onOpenResource={handleOpenLearningResource}
            highlightedStepId={highlightedRoadmapStepId}
          />
        );
      case "learning_resource":
        return (
          <LearningResource
            moduleId={activeLearningModuleId}
            onNavigate={navigateToScreen}
            onOpenResource={handleOpenLearningResource}
            onCompleteModule={handleCompleteModule}
            isCompleted={!!completedModuleIds[activeLearningModuleId]}
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
        return <IndustryDashboard onNavigate={navigateToScreen} activeSection={currentScreen} />;
      case "institution_analytics":
      case "skill_demand":
      case "curriculum_gap":
      case "placements":
      case "students":
      case "reports":
      case "skill_analytics":
        return <InstitutionAnalytics onNavigate={navigateToScreen} activeSection={currentScreen} />;
      case "industry_collaboration":
        return <IndustryCollaboration onNavigate={navigateToScreen} />;
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
            profileData={profileData}
            mobileOpen={mobileMenuOpen}
            onCloseMobile={() => setMobileMenuOpen(false)}
          />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <TopHeader
              onNavigate={navigateToScreen}
              notifications={notifications}
              onMarkAllAsRead={markAllAsRead}
              onMarkAsRead={markAsRead}
              profileData={profileData}
              onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
            />
            <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 bg-[#F8FAFC] dark:bg-[#0B1220] transition-colors duration-200">
              {renderScreenContent()}
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
    </div>
  );
}
