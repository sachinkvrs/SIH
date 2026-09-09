import React, { useState, useRef, useEffect } from "react";
import BrandLogo from "./BrandLogo";
import {
  LayoutDashboard,
  FileText,
  Zap,
  BarChart3,
  Compass,
  Briefcase,
  FolderKanban,
  Award,
  Bell,
  Settings as SettingsIcon,
  Users,
  Sparkles,
  LogOut,
  User,
  Shield,
  Clock,
  History,
  ChevronUp
} from "lucide-react";

export default function Sidebar({
  activeScreen = "student_dashboard",
  onNavigate,
  portalType = "student",
  unreadCount = 4,
  profileData = {
    fullName: "Sachin",
    email: "sachin.cs@example.edu.in",
    course: "B.Tech CSE",
    targetRole: "Data Analyst",
    readinessScore: 82,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  }
}) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Student Navigation: EXACT 10 items from reference image
  const studentNavItems = [
    { id: "student_dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "skill_assessment", label: "Skill Assessment", icon: FileText },
    { id: "my_skills", label: "My Skills", icon: Zap },
    { id: "skill_gap", label: "Skill Gap Analysis", icon: BarChart3 },
    { id: "roadmap", label: "Career Roadmap", icon: Compass },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "applications", label: "Applications", icon: FolderKanban },
    { id: "skill_passport", label: "Skill Passport", icon: Award },
    { id: "notifications", label: "Notifications", icon: Bell, badge: unreadCount > 0 ? unreadCount : null },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  // Industry Navigation
  const industryNavItems = [
    { id: "industry_dashboard", label: "Industry Dashboard", icon: LayoutDashboard },
    { id: "industry_collaboration", label: "Industry Collaboration", icon: Sparkles },
    { id: "student_dashboard", label: "← Student Portal", icon: User },
  ];

  // Institution Navigation
  const institutionNavItems = [
    { id: "institution_analytics", label: "Institution Analytics", icon: BarChart3 },
    { id: "industry_collaboration", label: "Industry Collaboration", icon: Sparkles },
    { id: "student_dashboard", label: "← Student Portal", icon: User },
  ];

  let navItems = studentNavItems;
  let userDetails = {
    name: profileData.fullName || "Sachin",
    role: `Student • ${profileData.course || "B.Tech CSE"}`,
    email: profileData.email || "sachin.cs@example.edu.in",
    avatar: profileData.avatar
  };

  if (portalType === "industry") {
    navItems = industryNavItems;
    userDetails = {
      name: "TechCorp Inc.",
      role: "Industry Partner",
      email: "recruitment@techcorp.com",
      avatar: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80"
    };
  } else if (portalType === "institution") {
    navItems = institutionNavItems;
    userDetails = {
      name: "ABC Institute",
      role: "Institution Admin",
      email: "placement@abcinstitute.edu.in",
      avatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80"
    };
  }

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setProfileDropdownOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    if (onNavigate) onNavigate("login");
  };

  return (
    <aside className="w-56 lg:w-60 bg-[#0B1727] text-white flex flex-col justify-between h-full min-h-screen py-4 px-3 border-r border-slate-800 shrink-0 select-none overflow-y-auto scrollbar-none relative">
      <div>
        {/* Brand Header */}
        <div className="px-2 mb-5 cursor-pointer" onClick={() => onNavigate("landing")}>
          <BrandLogo variant="dark" />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate && onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive
                    ? "bg-[#1E60D5] text-white shadow-xs font-semibold"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white text-blue-700" : "bg-rose-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer with Popover */}
      <div className="pt-3 border-t border-slate-800/80 mt-4 px-1 relative" ref={profileDropdownRef}>
        {/* Popover Menu (Upward) */}
        {profileDropdownOpen && (
          <div className="absolute bottom-full left-1 right-1 mb-2 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header info */}
            <div className="p-3.5 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
              <div className="flex items-center gap-2.5">
                <img
                  src={userDetails.avatar}
                  alt={userDetails.name}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-white/30"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{userDetails.name}</h4>
                  <p className="text-[10px] text-slate-300 truncate">{userDetails.email}</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className="text-slate-300 truncate max-w-[120px]">{profileData.targetRole || "Data Analyst"}</span>
                <span className="font-bold text-emerald-300">{profileData.readinessScore || 82}% Ready</span>
              </div>
            </div>

            {/* Links */}
            <div className="p-2 space-y-0.5 text-xs">
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate("profile");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>View Profile</span>
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate("activity");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
              >
                <History className="w-3.5 h-3.5 text-slate-400" />
                <span>Activity Timeline</span>
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate("settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
              >
                <SettingsIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  onNavigate("settings");
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-slate-400" />
                <span>Security</span>
              </button>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition font-semibold text-xs text-left cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}

        {/* Profile Trigger Pill */}
        <div
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          className={`flex items-center justify-between p-2 rounded-xl transition cursor-pointer ${
            profileDropdownOpen
              ? "bg-slate-800 text-white ring-1 ring-blue-500"
              : "hover:bg-slate-800/70"
          }`}
          title="Open Profile Menu"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={userDetails.avatar}
              alt={userDetails.name}
              className="w-8 h-8 rounded-full object-cover ring-1 ring-blue-500/40 shrink-0"
            />
            <div className="flex flex-col text-left overflow-hidden">
              <span className="text-xs font-semibold text-white truncate leading-tight">
                {userDetails.name}
              </span>
              <span className="text-[11px] text-slate-400 truncate">
                {userDetails.role}
              </span>
            </div>
          </div>
          <ChevronUp className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileDropdownOpen ? "rotate-180 text-blue-400" : ""}`} />
        </div>
      </div>
    </aside>
  );
}
