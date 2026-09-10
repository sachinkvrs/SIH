import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  MessageSquare,
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
  Sparkles,
  Menu,
  Target,
  ChevronDown,
  X
} from "lucide-react";
import { searchAll, SEARCH_TYPE_META, SEARCH_SUGGESTIONS } from "../../data/searchIndex";

export default function TopHeader({
  title = "",
  subtitle = "",
  onNavigate,
  notifications = [],
  unreadCommCount = 0,
  onMarkAllAsRead,
  onMarkAsRead,
  careerGoal = "Data Analyst",
  onOpenRoleSelector,
  onOpenResource,
  profileData = {
    fullName: "Sachin_kvrs",
    email: "sachin.it@example.edu.in",
    targetRole: "Data Analyst",
    readinessScore: 82,
    avatar: "/avatar-sachin.png"
  },
  onToggleMobileMenu
}) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Universal Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchHighlight, setSearchHighlight] = useState(-1);

  const notifRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleSearchChange = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    setSearchHighlight(-1);
    if (q.trim().length >= 2) {
      const results = searchAll(q, 8);
      setSearchResults(results);
      setSearchOpen(true);
    } else {
      setSearchResults([]);
      setSearchOpen(q.trim().length > 0);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (!searchOpen) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSearchHighlight((prev) => Math.min(prev + 1, searchResults.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSearchHighlight((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (searchHighlight >= 0 && searchResults[searchHighlight]) {
        handleSearchResultClick(searchResults[searchHighlight]);
      }
    } else if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
      setSearchHighlight(-1);
    }
  };

  const handleSearchResultClick = (result) => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchHighlight(-1);
    if (result.screen === "learning_resource" && onOpenResource && (result.moduleId || result.resourceId)) {
      onOpenResource(result.moduleId, result.resourceId);
    } else if (result.action === "open_module" && onOpenResource && result.moduleId) {
      onOpenResource(result.moduleId);
    } else if (onNavigate && result.screen) {
      onNavigate(result.screen);
    }
  };

  // Toggle notification popover (mutually exclusive with profile)
  const toggleNotif = (e) => {
    e.stopPropagation();
    setProfileOpen(false);
    setSearchOpen(false);
    setNotifOpen((prev) => !prev);
  };

  // Toggle profile popover (mutually exclusive with notification)
  const toggleProfile = (e) => {
    e.stopPropagation();
    setNotifOpen(false);
    setSearchOpen(false);
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
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setNotifOpen(false);
        setProfileOpen(false);
        setSearchOpen(false);
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
    <header className="h-14 bg-white dark:bg-[#111827] border-b border-slate-200/80 dark:border-slate-800 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-30 select-none shadow-xs transition-colors duration-200">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="p-1.5 -ml-1 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer transition flex items-center justify-center min-w-[38px] min-h-[38px]"
          title="Open Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* SkillBridge Logo on Mobile / Title on Desktop */}
        <div className="flex items-center gap-2">
          <div
            className="lg:hidden flex items-center gap-1.5 cursor-pointer"
            onClick={() => onNavigate && onNavigate("student_dashboard")}
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white font-black text-xs shadow-xs">
              S
            </div>
            <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
              Skill<span className="text-blue-600">Bridge</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-slate-800 dark:text-slate-200">SkillBridge Career Intelligence System</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Search bar (Desktop & Tablet) */}
        <div className="relative hidden md:block" ref={searchRef}>
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onFocus={() => { if (searchQuery.trim().length >= 2) setSearchOpen(true); }}
            placeholder="Search skills, jobs, roadmaps..."
            className="w-44 lg:w-64 pl-8 pr-7 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
            aria-label="Search SkillBridge"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setSearchResults([]); setSearchOpen(false); searchInputRef.current?.focus(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Search Results Dropdown */}
          {searchOpen && (
            <div className="absolute top-full mt-1.5 left-0 w-80 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                  {searchResults.map((result, idx) => {
                    const meta = SEARCH_TYPE_META[result.type] || SEARCH_TYPE_META.role;
                    return (
                      <button
                        key={`${result.type}-${result.title}-${idx}`}
                        onClick={() => handleSearchResultClick(result)}
                        className={`w-full text-left px-3.5 py-2.5 flex items-start gap-2.5 transition cursor-pointer ${
                          idx === searchHighlight
                            ? "bg-blue-50 dark:bg-blue-950/50"
                            : "hover:bg-slate-50 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0 mt-0.5 ${meta.color}`}>
                          {meta.label}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                            {result.title}
                          </p>
                          {result.description && (
                            <p className="text-[10.5px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {result.description}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : searchQuery.trim().length >= 2 ? (
                <div className="px-4 py-5 text-center">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                    No results for "{searchQuery}"
                  </p>
                  <p className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-1">
                    Try: SQL, CAD, Embedded, Power Systems, React
                  </p>
                </div>
              ) : (
                <div className="px-3.5 py-3">
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                    Popular Searches
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["SQL", "Embedded", "CAD", "Power Systems", "React", "BIM", "MATLAB"].map((s) => (
                      <button
                        key={s}
                        onClick={() => { setSearchQuery(s); const r = searchAll(s, 8); setSearchResults(r); setSearchOpen(true); }}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[10.5px] font-semibold hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950/50 dark:hover:text-blue-300 transition cursor-pointer"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="px-3.5 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 dark:text-slate-500">
                  ↑↓ navigate · Enter select · Esc close
                </span>
              </div>
            </div>
          )}
        </div>

        {/* TARGET ROLE QUICK SWITCHER */}
        {onOpenRoleSelector && (
          <button
            onClick={onOpenRoleSelector}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-blue-50/80 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold border border-blue-200/80 dark:border-blue-800 transition cursor-pointer"
            title="Switch Target Career Role"
          >
            <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="truncate max-w-[130px]">{careerGoal || profileData?.targetRole || "Select Goal"}</span>
            <ChevronDown className="w-3 h-3 text-blue-500 opacity-70 shrink-0" />
          </button>
        )}

        {/* COMMUNICATIONS BUTTON */}
        <button
          onClick={() => onNavigate && onNavigate("communications")}
          className="relative p-2 rounded-xl transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Communications"
          aria-label="Open Communications Workspace"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadCommCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-blue-600 text-white text-[9.5px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unreadCommCount}
            </span>
          )}
        </button>

        {/* 1. NOTIFICATION BELL & DROPDOWN CONTAINER */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={toggleNotif}
            className={`relative p-2 rounded-xl transition cursor-pointer min-w-[40px] min-h-[40px] flex items-center justify-center ${
              notifOpen
                ? "bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-rose-500 text-white text-[9.5px] font-black rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                {unreadCount}
              </span>
            )}
          </button>

          {/* NOTIFICATION DROPDOWN POPOVER (Bounded to viewport width on mobile) */}
          {notifOpen && (
            <div className="fixed sm:absolute top-14 sm:top-auto right-2 sm:right-0 mt-1 sm:mt-2 w-[calc(100vw-1rem)] sm:w-96 max-w-sm bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Dropdown Header */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">Notifications</span>
                  {unreadCount > 0 ? (
                    <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-[10px] font-bold rounded-full border border-rose-200 dark:border-rose-900/50">
                      {unreadCount} unread
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded-full">
                      All caught up
                    </span>
                  )}
                </div>

                {unreadCount > 0 && (
                  <button
                    onClick={() => {
                      if (onMarkAllAsRead) onMarkAllAsRead();
                    }}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all as read</span>
                  </button>
                )}
              </div>

              {/* Notification Items List */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                {notifications.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3 sm:p-3.5 transition cursor-pointer flex items-start gap-3 text-left ${
                      !item.read
                        ? "bg-blue-50/40 dark:bg-blue-950/30 hover:bg-blue-50/80 dark:hover:bg-blue-900/40 border-l-3 border-l-blue-600"
                        : "hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
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
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {notifications.length === 0 && (
                  <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs italic">
                    No notifications available
                  </div>
                )}
              </div>

              {/* Dropdown Footer Action */}
              <div className="p-2.5 bg-slate-50/80 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-center">
                <button
                  onClick={() => {
                    setNotifOpen(false);
                    if (onNavigate) onNavigate("notifications");
                  }}
                  className="w-full py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/60 dark:hover:bg-blue-900/30 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
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
                ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 ring-1 ring-blue-500"
                : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
            title="Profile Menu"
            aria-expanded={profileOpen}
          >
            {profileData?.avatar ? (
              <img
                src={profileData.avatar}
                alt={profileData.fullName}
                className="w-7 h-7 rounded-full object-cover ring-1 ring-blue-500/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-1 ring-blue-500/40">
                {(profileData?.fullName || "S").charAt(0).toUpperCase()}
              </div>
            )}
            <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
              {profileData.fullName}
            </span>
          </button>

          {/* PROFILE DROPDOWN POPOVER (Bounded to viewport on mobile) */}
          {profileOpen && (
            <div className="fixed sm:absolute top-14 sm:top-auto right-2 sm:right-0 mt-1 sm:mt-2 w-[calc(100vw-1rem)] sm:w-72 max-w-xs bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              {/* Profile Summary Header */}
              <div className="p-4 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
                <div className="flex items-center gap-3">
                  {profileData?.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt={profileData.fullName}
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/30 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm ring-2 ring-white/30 shrink-0">
                      {(profileData?.fullName || "S").charAt(0).toUpperCase()}
                    </div>
                  )}
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
              <div className="p-2 space-y-0.5 text-xs text-slate-700 dark:text-slate-200">
                {onOpenRoleSelector && (
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      onOpenRoleSelector();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 dark:hover:text-blue-400 text-blue-700 dark:text-blue-300 font-bold text-left cursor-pointer"
                  >
                    <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Switch Career Goal ▾</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("profile");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium text-left cursor-pointer"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium text-left cursor-pointer"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings & Preferences</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (onNavigate) onNavigate("settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium text-left cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Security & 2FA</span>
                </button>

                {/* Portal Switchers */}
                <div className="pt-1.5 mt-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (onNavigate) onNavigate("industry_dashboard");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-[11px] font-bold text-left cursor-pointer transition"
                  >
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Industry Portal (TechCorp)</span>
                  </button>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (onNavigate) onNavigate("institution_analytics");
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/40 text-[11px] font-bold text-left cursor-pointer transition"
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Institution Portal (ABC Institute)</span>
                  </button>
                </div>
              </div>

              {/* Logout Footer */}
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition font-semibold text-xs text-left cursor-pointer"
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
