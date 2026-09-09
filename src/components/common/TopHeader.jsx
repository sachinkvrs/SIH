import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  CheckCheck,
  User,
  Settings as SettingsIcon,
  Shield,
  LogOut,
  Briefcase,
  TrendingUp,
  FolderKanban,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function TopHeader({
  title = "",
  subtitle = "",
  onNavigate,
  notifications = [],
  onMarkAllAsRead,
  onMarkAsRead,
  profileData = {
    fullName: "Sachin",
    email: "sachin.cs@example.edu.in",
    targetRole: "Data Analyst / AI Engineer",
    readinessScore: 82,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  }
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Toggle notification popover (mutually exclusive with profile)
  const toggleNotif = (e) => {
    e.stopPropagation();
    setProfileOpen(false);
    setNotifOpen((prev) => !prev);
  };

  // Toggle profile popover (mutually exclusive with notification)
  const toggleProfile = (e) => {
    e.stopPropagation();
    setNotifOpen(false);
    setProfileOpen((prev) => !prev);
  };

  // Close both on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setNotifOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleNotificationClick = (notif) => {
    if (onMarkAsRead) {
      onMarkAsRead(notif.id);
    }
    setNotifOpen(false);
    if (onNavigate && notif.targetScreen) {
      onNavigate(notif.targetScreen);
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    if (onNavigate) {
      onNavigate("login");
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs">
      <div>
        {title ? (
          <h1 className="text-xs font-semibold text-slate-800">
            {title}
            {subtitle && <span className="text-slate-400 font-normal ml-2">| {subtitle}</span>}
          </h1>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-800">SkillBridge Career Intelligence System</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3 ml-auto">
        {/* Search bar */}
        <div className="relative hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skills, jobs, roadmaps..."
            className="w-44 lg:w-56 pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white text-slate-700 placeholder-slate-400"
          />
        </div>

        {/* 1. NOTIFICATION BELL & DROPDOWN CONTAINER */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={toggleNotif}
            className={`relative p-2 rounded-xl transition cursor-pointer ${
              notifOpen
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:text-blue-600 hover:bg-slate-100"
            }`}
            title="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-rose-500 text-white text-[9.5px] font-black rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN POPOVER */}
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Dropdown Header */}
              <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-full">
                      {unreadCount} unread
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-full">
                      All caught up
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      if (onMarkAllAsRead) onMarkAllAsRead();
                    }}
                    className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all as read</span>
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {notifications.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3 sm:p-3.5 transition cursor-pointer flex items-start gap-3 text-left ${
                      !item.read
                        ? "bg-blue-50/40 hover:bg-blue-50/80 border-l-3 border-l-blue-600"
                        : "hover:bg-slate-50/80"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5 shadow-xs text-xs font-bold`}>
                      {item.category === "Applications" ? (
                        <FolderKanban className="w-4 h-4" />
                      ) : item.category === "Internships" ? (
                        <Briefcase className="w-4 h-4" />
                      ) : item.category === "Skills" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <BookOpen className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs italic">
                    No notifications available
                  </div>
                )}
              </div>

              {/* Dropdown Footer Action */}
              <div className="p-2.5 bg-slate-50/80 border-t border-slate-100 text-center">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    if (onNavigate) onNavigate("notifications");
                  }}
                  className="w-full py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/60 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>View All Notifications</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 2. STUDENT PROFILE & DROPDOWN CONTAINER */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={toggleProfile}
            className={`flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl transition cursor-pointer border ${
              profileOpen
                ? "bg-slate-100 border-slate-300 ring-1 ring-blue-500"
                : "border-transparent hover:bg-slate-100"
            }`}
            title="Profile Menu"
            aria-expanded={profileOpen}
          >
            <img
              src={profileData.avatar}
              alt={profileData.fullName}
              className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/40"
            />
            <span className="hidden sm:inline text-xs font-semibold text-slate-700">
              {profileData.fullName}
            </span>
          </button>

          {/* PROFILE DROPDOWN POPOVER */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Summary Header */}
              <div className="p-4 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
                <div className="flex items-center gap-3">
                  <img
                    src={profileData.avatar}
                    alt={profileData.fullName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/30 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white truncate">
                      {profileData.fullName}
                    </h4>
                    <p className="text-[11px] text-slate-300 truncate">
                      {profileData.email}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 truncate max-w-[150px]">
                    {profileData.targetRole}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold rounded border border-emerald-400/30">
                    {profileData.readinessScore}% Ready
                  </span>
                </div>
              </div>

              {/* Menu Options */}
              <div className="p-2 space-y-0.5 text-xs text-slate-700">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings & Preferences</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-blue-600 transition font-medium text-left cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Security & 2FA</span>
                </button>
              </div>

              {/* Logout Footer */}
              <div className="p-2 border-t border-slate-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition font-semibold text-xs text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
