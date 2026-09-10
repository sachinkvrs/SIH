import React, { useState } from "react";
import {
  Bell,
  CheckCheck,
  Briefcase,
  TrendingUp,
  FolderKanban,
  BookOpen,
  Settings as SettingsIcon,
  ChevronRight,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

export default function Notifications({
  onNavigate,
  notifications = [],
  onMarkAllAsRead,
  onMarkAsRead
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const categories = ["All", "Applications", "Internships", "Skills", "Learning", "System"];

  const handleNotificationClick = (notif) => {
    if (onMarkAsRead) {
      onMarkAsRead(notif.id);
    }
    setSelectedNotification(notif);
  };

  const filtered = selectedCategory === "All"
    ? notifications
    : notifications.filter((n) => n.category === selectedCategory);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Level 2 Breadcrumbs & In-Workspace Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Notifications</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Notifications Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Important alerts, status updates, and action items that require your attention.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer min-h-[38px]"
          >
            <CheckCheck className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => {
          const count = cat === "All"
            ? notifications.length
            : notifications.filter((n) => n.category === cat).length;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-[#111827] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-3.5 sm:p-5 transition cursor-pointer flex items-start gap-3 sm:gap-4 ${
              !notif.read
                ? "bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 border-l-4 border-l-blue-600 dark:border-l-blue-500"
                : "hover:bg-slate-50/80 dark:hover:bg-slate-800/50"
            }`}
          >
            {/* Category Icon */}
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${notif.iconBg} flex items-center justify-center shrink-0 shadow-xs mt-0.5 text-xs font-bold`}>
              {notif.category === "Applications" ? (
                <FolderKanban className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : notif.category === "Internships" ? (
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : notif.category === "Skills" ? (
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>

            {/* Notification Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0"></span>
                  )}
                </div>
                <span className="text-[10.5px] text-slate-400 dark:text-slate-500 font-medium whitespace-nowrap">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {notif.desc}
              </p>

              {/* Direct Action Link */}
              <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                <span className="hover:underline flex items-center gap-1">
                  {notif.actionText} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs space-y-2">
            <Bell className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto stroke-1" />
            <p className="font-semibold text-slate-600 dark:text-slate-300">You're all caught up!</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">No new alerts or action items in this category.</p>
          </div>
        )}
      </div>

      {/* Notification Detail Slide-Over Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-slate-950/40 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#111827] max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${selectedNotification.iconBg} flex items-center justify-center text-xs font-bold`}>
                  {selectedNotification.category === "Applications" ? (
                    <FolderKanban className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                    {selectedNotification.category} • {selectedNotification.timestamp}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {selectedNotification.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-700">
              {selectedNotification.details}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  const target = selectedNotification.targetScreen;
                  setSelectedNotification(null);
                  if (onNavigate && target) {
                    onNavigate(target);
                  }
                }}
                className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                {selectedNotification.actionText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
