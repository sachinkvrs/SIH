// src/components/screens/Communications.jsx
import React, { useState, useMemo } from "react";
import {
  Inbox,
  Calendar,
  FileCheck,
  ThumbsUp,
  Award,
  XCircle,
  Clock,
  Bell,
  Reply,
  Sparkles,
  MessageSquareQuote,
  HelpCircle,
  Search,
  Star,
  Trash2,
  Mail,
  MailOpen,
  ArrowLeft,
  ChevronRight,
  Building2,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  User,
  Filter,
  Check
} from "lucide-react";
import { COMMUNICATION_CATEGORIES } from "../../data/communicationsData";

export default function Communications({
  onNavigate,
  communicationsList = [],
  onMarkAsRead,
  onToggleStar,
  onDeleteComm,
  onSendReply,
  onViewApplication
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // "all" | "unread" | "starred"
  const [selectedCommId, setSelectedCommId] = useState(() => {
    return communicationsList.length > 0 ? communicationsList[0].id : null;
  });

  // Mobile view state: "categories" | "list" | "detail"
  const [mobileView, setMobileView] = useState("list");

  // Inline reply box state
  const [replyText, setReplyText] = useState("");
  const [replySentSuccess, setReplySentSuccess] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  // Category Icon Map
  const categoryIconMap = {
    Inbox: Inbox,
    Calendar: Calendar,
    FileCheck: FileCheck,
    ThumbsUp: ThumbsUp,
    Award: Award,
    XCircle: XCircle,
    Clock: Clock,
    Bell: Bell,
    Reply: Reply,
    Sparkles: Sparkles,
    MessageSquareQuote: MessageSquareQuote,
    HelpCircle: HelpCircle
  };

  // Calculate unread counts per category
  const categoryCounts = useMemo(() => {
    const counts = { all: 0 };
    COMMUNICATION_CATEGORIES.forEach((cat) => {
      counts[cat.id] = 0;
    });

    communicationsList.forEach((c) => {
      if (c.unread) {
        counts.all += 1;
        if (counts[c.category] !== undefined) {
          counts[c.category] += 1;
        }
      }
    });
    return counts;
  }, [communicationsList]);

  // Filter communications list based on search, category, and filterMode
  const filteredCommunications = useMemo(() => {
    return communicationsList.filter((comm) => {
      // 1. Category Filter
      if (selectedCategory !== "all" && comm.category !== selectedCategory) {
        return false;
      }

      // 2. Unread / Starred Filter
      if (filterMode === "unread" && !comm.unread) return false;
      if (filterMode === "starred" && !comm.starred) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSender = comm.sender.name.toLowerCase().includes(q);
        const matchCompany = comm.sender.company.toLowerCase().includes(q);
        const matchRole = (comm.sender.role || "").toLowerCase().includes(q);
        const matchSubject = comm.subject.toLowerCase().includes(q);
        const matchBody = comm.body.toLowerCase().includes(q);
        const matchCategory = comm.category.toLowerCase().includes(q);
        return matchSender || matchCompany || matchRole || matchSubject || matchBody || matchCategory;
      }

      return true;
    });
  }, [communicationsList, selectedCategory, filterMode, searchQuery]);

  // Active selected communication
  const selectedComm = useMemo(() => {
    return communicationsList.find((c) => c.id === selectedCommId) || null;
  }, [communicationsList, selectedCommId]);

  // Handle clicking a communication item
  const handleSelectComm = (comm) => {
    setSelectedCommId(comm.id);
    setMobileView("detail");
    setReplySentSuccess(false);
    setReminderSet(false);
    if (comm.unread && onMarkAsRead) {
      onMarkAsRead(comm.id);
    }
  };

  // Handle sending inline reply
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedComm) return;

    if (onSendReply) {
      onSendReply(selectedComm.id, replyText.trim());
    }

    setReplyText("");
    setReplySentSuccess(true);
    setTimeout(() => setReplySentSuccess(false), 4000);
  };

  // Category Badge Styler
  const getCategoryBadge = (cat) => {
    switch (cat) {
      case "Interview":
        return "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "Job Offer":
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
      case "Assessment":
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800";
      case "Rejection":
        return "bg-rose-50 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border-rose-200 dark:border-rose-800";
      case "Recruiter Response":
        return "bg-purple-50 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "Thank You":
        return "bg-teal-50 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300 border-teal-200 dark:border-teal-800";
      case "Onboarding":
        return "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800";
      case "Feedback":
        return "bg-cyan-50 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] dark:bg-[#0B1220] overflow-hidden">
      {/* Top Workspace Header & Internal Back Navigation */}
      <div className="bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate && onNavigate("student_dashboard")}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Return to Student Dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Communications</span>
              {categoryCounts.all > 0 && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {categoryCounts.all} unread
                </span>
              )}
            </h1>
          </div>
        </div>

        {/* Mobile View Toggle Buttons */}
        <div className="lg:hidden flex items-center gap-1.5">
          {mobileView !== "categories" && (
            <button
              onClick={() => setMobileView("categories")}
              className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
            >
              Categories
            </button>
          )}
          {mobileView === "detail" && (
            <button
              onClick={() => setMobileView("list")}
              className="px-2.5 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg cursor-pointer"
            >
              ← Back to List
            </button>
          )}
        </div>
      </div>

      {/* 3-Pane Desktop Workspace / 1-Pane Mobile Stack */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* PANE 1: Left Categories / Mailbox Panel */}
        <div
          className={`w-full lg:w-64 xl:w-72 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto ${
            mobileView === "categories" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Mailbox Section Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Mailbox
            </span>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setFilterMode("all");
                setMobileView("list");
              }}
              className={`w-full mt-2 flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                selectedCategory === "all" && filterMode === "all"
                  ? "bg-[#1E60D5] text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Inbox className="w-4 h-4" />
                <span>Inbox</span>
              </div>
              {categoryCounts.all > 0 && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    selectedCategory === "all" && filterMode === "all"
                      ? "bg-white/20 text-white"
                      : "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300"
                  }`}
                >
                  {categoryCounts.all}
                </span>
              )}
            </button>
          </div>

          {/* Categories List */}
          <div className="p-3 space-y-1">
            <span className="px-2 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
              Categories
            </span>
            {COMMUNICATION_CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
              const IconComp = categoryIconMap[cat.icon] || HelpCircle;
              const isSelected = selectedCategory === cat.id;
              const unreadCount = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setMobileView("list");
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800/60"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`} />
                    <span className="truncate">{cat.label}</span>
                  </div>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 shrink-0">
                      {unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help Footer */}
          <div className="mt-auto p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <div className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
              <p>Communications link directly with your internship applications and recruiter evaluations.</p>
            </div>
          </div>
        </div>

        {/* PANE 2: Center Communications List Panel */}
        <div
          className={`w-full lg:w-80 xl:w-96 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-hidden ${
            mobileView === "list" ? "block" : "hidden lg:flex"
          }`}
        >
          {/* Search Box */}
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search communications..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Toggle: All vs Unread vs Starred */}
            <div className="flex items-center justify-between mt-2.5 pt-1">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFilterMode("all")}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer ${
                    filterMode === "all"
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterMode("unread")}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer flex items-center gap-1 ${
                    filterMode === "unread"
                      ? "bg-blue-600 text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <span>Unread</span>
                  {categoryCounts.all > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  )}
                </button>
                <button
                  onClick={() => setFilterMode("starred")}
                  className={`px-2 py-1 text-[11px] font-semibold rounded-md transition cursor-pointer flex items-center gap-1 ${
                    filterMode === "starred"
                      ? "bg-amber-500 text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                  title="Starred messages"
                >
                  <Star className="w-3 h-3" />
                </button>
              </div>

              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                {filteredCommunications.length} of {communicationsList.length}
              </span>
            </div>
          </div>

          {/* Message List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredCommunications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  No communications found
                </h4>
                <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                  {searchQuery
                    ? `No communications match "${searchQuery}". Try a different keyword.`
                    : "Your application inbox is empty in this category. New recruiter messages will appear here."}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mt-3 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              filteredCommunications.map((comm) => {
                const isSelected = selectedCommId === comm.id;
                return (
                  <div
                    key={comm.id}
                    onClick={() => handleSelectComm(comm)}
                    className={`p-3.5 transition cursor-pointer relative ${
                      isSelected
                        ? "bg-blue-50/70 dark:bg-blue-900/25 border-l-3 border-blue-600 dark:border-blue-400"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                    } ${comm.unread ? "bg-white dark:bg-[#111827]" : "opacity-90"}`}
                  >
                    {/* Unread Indicator Dot */}
                    {comm.unread && (
                      <span className="absolute top-4 right-3.5 w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></span>
                    )}

                    <div className="flex items-start gap-2.5">
                      <img
                        src={comm.sender.avatar}
                        alt={comm.sender.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700 mt-0.5"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className={`text-xs truncate ${comm.unread ? "font-bold text-slate-900 dark:text-white" : "font-semibold text-slate-700 dark:text-slate-300"}`}>
                            {comm.sender.name}
                          </span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                            {comm.timestamp}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {comm.sender.company} • {comm.sender.role}
                        </div>

                        <h4 className={`text-xs mt-1 truncate ${comm.unread ? "font-bold text-slate-900 dark:text-white" : "font-medium text-slate-700 dark:text-slate-300"}`}>
                          {comm.subject}
                        </h4>

                        <p className="text-[11px] text-slate-400 dark:text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                          {comm.preview}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${getCategoryBadge(comm.category)}`}>
                            {comm.category}
                          </span>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleStar) onToggleStar(comm.id);
                            }}
                            className={`p-1 rounded transition ${comm.starred ? "text-amber-500" : "text-slate-300 dark:text-slate-600 hover:text-amber-400"}`}
                            title={comm.starred ? "Unstar" : "Star"}
                          >
                            <Star className={`w-3.5 h-3.5 ${comm.starred ? "fill-amber-500" : ""}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* PANE 3: Right Selected Communication Details Panel */}
        <div
          className={`flex-1 bg-white dark:bg-[#111827] flex flex-col overflow-hidden ${
            mobileView === "detail" ? "block" : "hidden lg:flex"
          }`}
        >
          {selectedComm ? (
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* Detail Header Actions Bar */}
              <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${getCategoryBadge(selectedComm.category)}`}>
                    {selectedComm.category}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {selectedComm.date} • {selectedComm.timestamp}
                  </span>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => onToggleStar && onToggleStar(selectedComm.id)}
                    className={`p-2 rounded-lg transition cursor-pointer ${
                      selectedComm.starred
                        ? "text-amber-500 bg-amber-50 dark:bg-amber-950/40"
                        : "text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    title={selectedComm.starred ? "Starred" : "Star message"}
                  >
                    <Star className={`w-4 h-4 ${selectedComm.starred ? "fill-amber-500" : ""}`} />
                  </button>

                  <button
                    onClick={() => {
                      if (selectedComm.unread) {
                        onMarkAsRead && onMarkAsRead(selectedComm.id);
                      }
                    }}
                    className="p-2 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                    title={selectedComm.unread ? "Mark as Read" : "Read"}
                  >
                    {selectedComm.unread ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => onDeleteComm && onDeleteComm(selectedComm.id)}
                    className="p-2 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition cursor-pointer"
                    title="Delete communication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Content Container */}
              <div className="p-5 sm:p-6 space-y-5">
                {/* Sender Profile Card */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-3.5">
                    <img
                      src={selectedComm.sender.avatar}
                      alt={selectedComm.sender.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {selectedComm.sender.name}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {selectedComm.sender.role} • <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedComm.sender.company}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {selectedComm.sender.email}
                      </p>
                    </div>
                  </div>

                  {selectedComm.relatedApplicationId && (
                    <button
                      onClick={() => {
                        if (onViewApplication) {
                          onViewApplication(selectedComm.relatedApplicationId);
                        } else if (onNavigate) {
                          onNavigate("applications");
                        }
                      }}
                      className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition cursor-pointer shrink-0"
                    >
                      <span>View Application</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Subject Title */}
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {selectedComm.subject}
                  </h2>
                </div>

                {/* Structured Context Card (Company, Role, Logistics, Status) */}
                {selectedComm.details && (
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-4 border border-slate-200/80 dark:border-slate-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                        <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span>{selectedComm.details.company}</span>
                        <span className="text-slate-400 font-normal">•</span>
                        <span>{selectedComm.details.role}</span>
                      </div>
                      {selectedComm.details.status && (
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {selectedComm.details.status}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                      {selectedComm.details.interviewDate && (
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Interview Schedule</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedComm.details.interviewDate}</span>
                        </div>
                      )}
                      {selectedComm.details.location && (
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Location / Mode</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedComm.details.location}</span>
                        </div>
                      )}
                      {selectedComm.details.compensation && (
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Compensation</span>
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedComm.details.compensation}</span>
                        </div>
                      )}
                      {selectedComm.details.deadline && (
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Response Deadline</span>
                          <span className="font-semibold text-amber-600 dark:text-amber-400">{selectedComm.details.deadline}</span>
                        </div>
                      )}
                      {selectedComm.details.joiningDate && (
                        <div>
                          <span className="block text-[10px] text-slate-400 uppercase font-semibold">Joining Date</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedComm.details.joiningDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Rich Body Content */}
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal space-y-3">
                  {selectedComm.body}
                </div>

                {/* Contextual Action Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2.5">
                  {selectedComm.relatedApplicationId && (
                    <button
                      onClick={() => {
                        if (onViewApplication) {
                          onViewApplication(selectedComm.relatedApplicationId);
                        } else if (onNavigate) {
                          onNavigate("applications");
                        }
                      }}
                      className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>View Application</span>
                    </button>
                  )}

                  {selectedComm.category === "Interview" && (
                    <button
                      onClick={() => setReminderSet(true)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${
                        reminderSet
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {reminderSet ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                      <span>{reminderSet ? "Reminder Added to Dashboard" : "Add Interview Reminder"}</span>
                    </button>
                  )}

                  {selectedComm.category === "Assessment" && (
                    <button
                      onClick={() => onNavigate && onNavigate("skill_assessment")}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Start Skill Assessment</span>
                    </button>
                  )}

                  {(selectedComm.category === "Rejection" || selectedComm.category === "Feedback") && (
                    <>
                      <button
                        onClick={() => onNavigate && onNavigate("skill_gap")}
                        className="px-3.5 py-2 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 text-xs font-semibold rounded-lg border border-blue-200 dark:border-blue-800 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>View Skill Gap Diagnosis</span>
                      </button>
                      <button
                        onClick={() => onNavigate && onNavigate("opportunities")}
                        className="px-3.5 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Search className="w-3.5 h-3.5" />
                        <span>Explore Similar Opportunities</span>
                      </button>
                    </>
                  )}

                  {selectedComm.category === "Job Alert" && (
                    <button
                      onClick={() => onNavigate && onNavigate("opportunities")}
                      className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>View Recommended Opportunities</span>
                    </button>
                  )}

                  {selectedComm.category === "Job Offer" && (
                    <button
                      onClick={() => {
                        if (onViewApplication) onViewApplication(selectedComm.relatedApplicationId);
                        else onNavigate("applications");
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Review Offer Details</span>
                    </button>
                  )}
                </div>

                {/* Conversation Thread / Replies */}
                {selectedComm.replies && selectedComm.replies.length > 0 && (
                  <div className="pt-5 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                      Conversation Thread ({selectedComm.replies.length})
                    </span>
                    {selectedComm.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl p-3.5 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-blue-700 dark:text-blue-300">
                            {rep.senderName} ({rep.senderRole})
                          </span>
                          <span className="text-[10px] text-slate-400">{rep.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {rep.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inline Recruiter Reply Box */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <form onSubmit={handleReplySubmit} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <Reply className="w-3.5 h-3.5 text-blue-600" />
                        <span>Reply to {selectedComm.sender.name}</span>
                      </label>
                      <span className="text-[11px] text-slate-400">Direct response via SkillBridge</span>
                    </div>

                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`Write a professional reply to ${selectedComm.sender.name} (${selectedComm.sender.company})...`}
                      className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-white placeholder-slate-400 resize-none transition"
                    />

                    {replySentSuccess && (
                      <div className="p-2 text-xs bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Your response has been sent to {selectedComm.sender.name} and recorded in your application thread.</span>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={!replyText.trim()}
                        className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer flex items-center gap-1.5"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Response</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State when no communication is selected */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#111827]">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1.5">
                Select a communication to view
              </h3>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Choose a recruiter response, interview invite, or job offer from the list to view complete details, scheduling logistics, and linked applications.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
