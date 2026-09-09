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
  CheckCircle2
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
      {/* Notifications Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                {unreadCount} Unread
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Important alerts, status updates, and action items that require your attention.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={onMarkAllAsRead}
            className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer min-h-[38px]"
          >
            <CheckCheck className="w-4 h-4 text-slate-600" />
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
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {filtered.map((notif) => (
          <div
            key={notif.id}
            onClick={() => handleNotificationClick(notif)}
            className={`p-3.5 sm:p-5 transition cursor-pointer flex items-start gap-3 sm:gap-4 ${
              !notif.read
                ? "bg-blue-50/40 hover:bg-blue-50/70 border-l-4 border-l-blue-600"
                : "hover:bg-slate-50/80"
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
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {notif.title}
                  </span>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                  )}
                </div>
                <span className="text-[10.5px] text-slate-400 font-medium whitespace-nowrap">
                  {notif.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {notif.desc}
              </p>

              {/* Direct Action Link */}
              <div className="flex items-center gap-4 mt-2 text-[11px] font-semibold text-blue-600">
                <span className="hover:underline flex items-center gap-1">
                  {notif.actionText} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-400 text-xs">
            No notifications in this category
          </div>
        )}
      </div>

      {/* Notification Detail Slide-Over Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${selectedNotification.iconBg} flex items-center justify-center text-xs font-bold`}>
                  {selectedNotification.category === "Applications" ? (
                    <FolderKanban className="w-4 h-4" />
                  ) : (
                    <Briefcase className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedNotification.category} • {selectedNotification.timestamp}
                  </span>
                  <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">
                    {selectedNotification.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedNotification(null)}
                className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {selectedNotification.details}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedNotification(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
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
