import React, { useState } from "react";
import Sidebar from "./components/common/Sidebar";
import TopHeader from "./components/common/TopHeader";

// Screens
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
import InternshipOpportunities from "./components/screens/InternshipOpportunities";
import DigitalSkillPassport from "./components/screens/DigitalSkillPassport";
import IndustryDashboard from "./components/screens/IndustryDashboard";
import InstitutionAnalytics from "./components/screens/InstitutionAnalytics";
import IndustryCollaboration from "./components/screens/IndustryCollaboration";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("landing");

  // Shared Profile State
  const [profileData, setProfileData] = useState({
    fullName: "Sachin",
    email: "sachin.cs@example.edu.in",
    phone: "+91 98765 43210",
    college: "ABC Institute of Technology",
    course: "Computer Science & Engineering",
    gradYear: "2027",
    targetRole: "Data Analyst / AI Engineer",
    preferredIndustry: "Artificial Intelligence & Enterprise SaaS",
    preferredLocation: "Bangalore, Remote",
    readinessScore: 82,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
  });

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
    if (currentScreen === "industry_dashboard") return "industry";
    if (currentScreen === "institution_analytics") return "institution";
    return "student";
  };

  const navigateToScreen = (screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  // Render individual screen content
  const renderScreenContent = () => {
    switch (currentScreen) {
      case "landing":
        return <LandingPage onNavigate={navigateToScreen} />;
      case "login":
        return <LoginPage onNavigate={navigateToScreen} />;
      case "student_dashboard":
        return <StudentDashboard onNavigate={navigateToScreen} />;
      case "my_skills":
        return <MySkills onNavigate={navigateToScreen} />;
      case "applications":
        return <Applications onNavigate={navigateToScreen} />;
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
        return <Activity onNavigate={navigateToScreen} />;
      case "profile":
        return (
          <Profile
            profileData={profileData}
            onUpdateProfile={setProfileData}
            onNavigate={navigateToScreen}
          />
        );
      case "settings":
        return <Settings onNavigate={navigateToScreen} />;
      case "skill_assessment":
        return <SkillAssessment onNavigate={navigateToScreen} />;
      case "skill_gap":
        return <SkillGapAnalysis onNavigate={navigateToScreen} />;
      case "roadmap":
        return <LearningRoadmap onNavigate={navigateToScreen} />;
      case "opportunities":
        return <InternshipOpportunities onNavigate={navigateToScreen} />;
      case "skill_passport":
        return (
          <DigitalSkillPassport
            profileData={profileData}
            onNavigate={navigateToScreen}
          />
        );
      case "industry_dashboard":
        return <IndustryDashboard onNavigate={navigateToScreen} />;
      case "institution_analytics":
        return <InstitutionAnalytics onNavigate={navigateToScreen} />;
      case "industry_collaboration":
        return <IndustryCollaboration onNavigate={navigateToScreen} />;
      default:
        return <StudentDashboard onNavigate={navigateToScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
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
            <main className="flex-1 overflow-y-auto p-3.5 sm:p-6 lg:p-8 bg-[#F8FAFC]">
              {renderScreenContent()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
