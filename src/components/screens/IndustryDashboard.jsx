// src/components/screens/IndustryDashboard.jsx
// SkillBridge Industry Hiring & Competency Portal
// Connected directly to Canonical Applications State Machine & Recruiter Review Workspace

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  FileCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Star,
  Send,
  MessageSquare,
  FileText,
  UserCheck,
  ExternalLink,
  XCircle,
  AlertCircle,
  TrendingUp,
  Award
} from "lucide-react";
import {
  APPLICATION_STATUS,
  ACTOR_ROLES,
  canTransition,
  STATUS_UI_META
} from "../../services/canonicalApplicationService";

export default function IndustryDashboard({
  onNavigate,
  activeSection = "industry_dashboard",
  applicationsList = [],
  onUpdateApplicationStatus,
  onAddFeedback
}) {
  const [currentTab, setCurrentTab] = useState(
    activeSection === "post_jobs"
      ? "post_jobs"
      : activeSection === "candidate_matching"
      ? "candidate_matching"
      : activeSection === "feedback"
      ? "feedback"
      : "overview"
  );

  useEffect(() => {
    if (activeSection === "post_jobs") setCurrentTab("post_jobs");
    else if (activeSection === "candidate_matching") setCurrentTab("candidate_matching");
    else if (activeSection === "feedback") setCurrentTab("feedback");
    else if (activeSection === "industry_dashboard") setCurrentTab("overview");
  }, [activeSection]);

  // Form state for Post Jobs
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("Internship");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [stipend, setStipend] = useState("");
  const [jobPostedSuccess, setJobPostedSuccess] = useState(false);

  // Candidate filtering & review workspace state
  const [filterRole, setFilterRole] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedCandidateApp, setSelectedCandidateApp] = useState(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState("");

  // Feedback form state
  const [feedbackAppId, setFeedbackAppId] = useState("");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [feedbackCategory, setFeedbackCategory] = useState("Technical Evaluation");
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  // Filter applications for Industry partner (e.g. TechCorp or all candidates in system)
  const candidateApplications = applicationsList.filter((app) => {
    if (filterRole !== "All" && app.roleCategory !== filterRole) return false;
    if (filterStatus !== "All" && app.status !== filterStatus) return false;
    return true;
  });

  // Dynamic distinct active roles count
  const activeRolesCount = new Set(applicationsList.map((a) => a.position || a.roleCategory)).size;

  // Dynamic statistics calculated from canonical applications
  const stats = [
    { label: "Active Roles", value: activeRolesCount.toString(), icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-100" },
    {
      label: "Total Applications",
      value: applicationsList.length.toString(),
      icon: FileCheck,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      label: "Shortlisted / Interview",
      value: applicationsList.filter((a) => a.status === APPLICATION_STATUS.SHORTLISTED || a.status === APPLICATION_STATUS.INTERVIEW).length.toString(),
      icon: Users,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100"
    },
    {
      label: "Selected Offers",
      value: applicationsList.filter((a) => a.status === APPLICATION_STATUS.SELECTED).length.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    }
  ];

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    setJobPostedSuccess(true);
    setTimeout(() => {
      setJobPostedSuccess(false);
      setJobTitle("");
      setRequiredSkills("");
      setStipend("");
    }, 2500);
  };

  // Execute canonical status transition from Industry Recruiter view
  const executeStatusTransition = (appId, targetStatus, customNote = "") => {
    if (!onUpdateApplicationStatus) return;
    const res = onUpdateApplicationStatus(appId, targetStatus, ACTOR_ROLES.INDUSTRY, customNote);
    if (res?.success) {
      setActionSuccessMessage(`Successfully updated status to "${targetStatus}". Student notified.`);
      setTimeout(() => setActionSuccessMessage(""), 3500);
      if (selectedCandidateApp && selectedCandidateApp.id === appId) {
        setSelectedCandidateApp(res.application);
      }
    } else {
      alert(res?.error || "Unable to complete transition.");
    }
  };

  // Submit structured feedback
  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const targetId = feedbackAppId || (candidateApplications[0]?.id);
    if (!targetId || !feedbackNote.trim()) return;

    if (onAddFeedback) {
      onAddFeedback(
        targetId,
        {
          authorName: "TechCorp Recruitment Board",
          category: feedbackCategory,
          message: feedbackNote.trim(),
          visibility: "STUDENT_VISIBLE"
        },
        ACTOR_ROLES.INDUSTRY
      );
      setFeedbackSuccess(true);
      setTimeout(() => {
        setFeedbackSuccess(false);
        setFeedbackNote("");
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Action Notification Toast */}
      {actionSuccessMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{actionSuccessMessage}</span>
          </div>
          <button onClick={() => setActionSuccessMessage("")} className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Industry Hiring & Candidate Review Portal
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-900/50">
              TechCorp Inc.
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Review verified candidate applications, assess skill passports, manage pipeline stages, and dispatch direct feedback.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            ← Student Portal
          </button>
          <button
            onClick={() => onNavigate("institution_analytics")}
            className="px-3.5 py-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-800/60 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Institution Portal →
          </button>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setCurrentTab("overview")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "overview"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Hiring Overview</span>
        </button>
        <button
          onClick={() => setCurrentTab("candidate_matching")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "candidate_matching"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Candidate Pipeline ({candidateApplications.length})</span>
        </button>
        <button
          onClick={() => setCurrentTab("post_jobs")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "post_jobs"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post New Opportunity</span>
        </button>
        <button
          onClick={() => setCurrentTab("feedback")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "feedback"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Recruiter Feedback Loop</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {currentTab === "overview" && (
        <div className="space-y-6">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111827] rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">{s.value}</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 block">{s.label}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${s.color} dark:bg-slate-800 dark:border-slate-700 border flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Canonical Applications Table */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Active Candidate Applications</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Single canonical application pool synchronized across Student and Recruiter views
                </p>
              </div>
              <button
                onClick={() => setCurrentTab("candidate_matching")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer self-start sm:self-auto"
              >
                Open Review Pipeline Workspace →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-3 font-semibold">Candidate</th>
                    <th className="pb-3 font-semibold">Role / Opportunity</th>
                    <th className="pb-3 font-semibold">Match</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Review Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {candidateApplications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-slate-400 dark:text-slate-500">
                        <AlertCircle className="w-7 h-7 mx-auto mb-1.5 opacity-50" />
                        <span className="font-bold text-xs block text-slate-600 dark:text-slate-400">No active applications found</span>
                        <span className="text-[11px] text-slate-400 block mt-0.5">When students apply to your positions, their verified skill profiles appear here.</span>
                      </td>
                    </tr>
                  ) : (
                    candidateApplications.slice(0, 7).map((app) => {
                      const statusMeta = STATUS_UI_META[app.status] || STATUS_UI_META[APPLICATION_STATUS.APPLIED];
                      return (
                        <tr key={app.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                                {(app.studentName || "S").charAt(0)}
                              </div>
                              <div>
                                <span className="font-bold block text-slate-900 dark:text-white">{app.studentName || "Applicant"}</span>
                                <span className="text-[10px] text-slate-400 dark:text-slate-500 block">
                                  {app.college || "Apex University"}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-slate-600 dark:text-slate-300 font-medium">
                            <div>
                              <span className="font-bold text-slate-800 dark:text-slate-200">{app.position}</span>
                              <span className="text-[10.5px] text-slate-400 block">{app.company} • {app.location}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-200 dark:border-emerald-800 text-[11px]">
                              {app.matchScore ? `${app.matchScore}%` : "85%"}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`inline-block px-2.5 py-0.5 text-[11px] font-bold rounded-md border ${statusMeta.badgeBg}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedCandidateApp(app);
                                setCurrentTab("candidate_matching");
                              }}
                              className="px-3 py-1.5 bg-[#1E60D5] hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition cursor-pointer"
                            >
                              Inspect Candidate
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CANDIDATE MATCHING & PIPELINE WORKSPACE */}
      {currentTab === "candidate_matching" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-slate-700 dark:text-slate-300">Filter Role:</span>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-white"
              >
                <option value="All">All Career Roles</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Data Science">Data Science</option>
                <option value="Business Analyst">Business Analyst</option>
                <option value="Embedded Systems Engineer">Embedded Systems Engineer</option>
                <option value="Power Systems Engineer">Power Systems Engineer</option>
              </select>

              <span className="font-bold text-slate-700 dark:text-slate-300 ml-2">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-slate-800 dark:text-white"
              >
                <option value="All">All Stages</option>
                <option value={APPLICATION_STATUS.APPLIED}>Applied</option>
                <option value={APPLICATION_STATUS.UNDER_REVIEW}>Under Review</option>
                <option value={APPLICATION_STATUS.FORWARDED_TO_INDUSTRY}>Forwarded by College</option>
                <option value={APPLICATION_STATUS.SHORTLISTED}>Shortlisted</option>
                <option value={APPLICATION_STATUS.INTERVIEW}>Interview</option>
                <option value={APPLICATION_STATUS.SELECTED}>Selected</option>
                <option value={APPLICATION_STATUS.REJECTED}>Rejected</option>
              </select>
            </div>

            <span className="text-slate-500 dark:text-slate-400 font-semibold">
              Showing {candidateApplications.length} candidates
            </span>
          </div>

          {/* Grid Layout: Candidate List + Candidate Inspection Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left Candidate List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {candidateApplications.map((cand) => {
                const isSelected = selectedCandidateApp?.id === cand.id;
                const statusMeta = STATUS_UI_META[cand.status] || STATUS_UI_META[APPLICATION_STATUS.APPLIED];
                return (
                  <div
                    key={cand.id}
                    onClick={() => setSelectedCandidateApp(cand)}
                    className={`p-4 rounded-2xl border transition cursor-pointer bg-white dark:bg-[#111827] shadow-xs ${
                      isSelected
                        ? "ring-2 ring-blue-600 border-transparent dark:bg-slate-800/80"
                        : "border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0">
                          {(cand.studentName || "A").charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cand.studentName || "Applicant"}</h4>
                            <span className="px-2 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded-md font-semibold">
                              {cand.college || "Engineering College"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {cand.position} • {cand.company}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2">
                            {(cand.verifiedSkills || []).slice(0, 4).map((s, sIdx) => (
                              <span key={sIdx} className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[10px] font-semibold rounded">
                                ✓ {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1.5 shrink-0">
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          {cand.matchScore ? `${cand.matchScore}%` : "85%"} Match
                        </span>
                        <span className={`px-2 py-0.5 text-[10.5px] font-bold rounded-md border ${statusMeta.badgeBg}`}>
                          {cand.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {candidateApplications.length === 0 && (
                <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                  No candidate applications match the selected role or status filters.
                </div>
              )}
            </div>

            {/* Right Candidate Review Workspace (5 cols) */}
            <div className="lg:col-span-5">
              {selectedCandidateApp ? (
                <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-4 sticky top-4">
                  <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        Candidate Verification Workspace
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                        {selectedCandidateApp.studentName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {selectedCandidateApp.degree} • {selectedCandidateApp.college}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg text-xs">
                      {selectedCandidateApp.matchScore || 85}%
                    </span>
                  </div>

                  {/* Passport & Match Info */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Target Role:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{selectedCandidateApp.position}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Current Status:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{selectedCandidateApp.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Skill Passport:</span>
                      <span className="font-mono text-[10px] bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                        {selectedCandidateApp.passportCredentialId || "CRED-SB-2026-VERIFIED"}
                      </span>
                    </div>
                  </div>

                  {/* Verified Skills Breakdown */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                      Verified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(selectedCandidateApp.verifiedSkills || ["SQL", "Python", "Problem Solving"]).map((sk, skIdx) => (
                        <span key={skIdx} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-md border border-emerald-200 dark:border-emerald-800">
                          ✓ {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline History */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-2">
                      Pipeline Progression:
                    </span>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
                      {(selectedCandidateApp.history || []).map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-[11px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                          <div>
                            <span className="font-bold text-slate-800 dark:text-slate-200">{step.stage}</span>
                            <span className="text-slate-400 text-[10px] ml-1.5">({step.date} by {step.actor || "System"})</span>
                            {step.note && <p className="text-[10px] text-slate-500 dark:text-slate-400">{step.note}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recruiter Action Buttons (State Machine Enforcement) */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Recruiter Pipeline Actions:
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {canTransition(selectedCandidateApp, ACTOR_ROLES.INDUSTRY, APPLICATION_STATUS.SHORTLISTED) && (
                        <button
                          onClick={() => executeStatusTransition(selectedCandidateApp.id, APPLICATION_STATUS.SHORTLISTED, "Candidate shortlisted by recruiter after portfolio review.")}
                          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Shortlist</span>
                        </button>
                      )}

                      {canTransition(selectedCandidateApp, ACTOR_ROLES.INDUSTRY, APPLICATION_STATUS.INTERVIEW) && (
                        <button
                          onClick={() => executeStatusTransition(selectedCandidateApp.id, APPLICATION_STATUS.INTERVIEW, "Interview slot scheduled with technical hiring panel.")}
                          className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>Invite Interview</span>
                        </button>
                      )}

                      {canTransition(selectedCandidateApp, ACTOR_ROLES.INDUSTRY, APPLICATION_STATUS.SELECTED) && (
                        <button
                          onClick={() => executeStatusTransition(selectedCandidateApp.id, APPLICATION_STATUS.SELECTED, "Candidate selected! Extending formal internship offer letter.")}
                          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1 col-span-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Extend Selection Offer</span>
                        </button>
                      )}

                      {canTransition(selectedCandidateApp, ACTOR_ROLES.INDUSTRY, APPLICATION_STATUS.REJECTED) && (
                        <button
                          onClick={() => executeStatusTransition(selectedCandidateApp.id, APPLICATION_STATUS.REJECTED, "Application concluded for this hiring cohort.")}
                          className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50 font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Reject / Close</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 border border-slate-200/80 dark:border-slate-800 text-center text-slate-400 space-y-2">
                  <UserCheck className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Select a Candidate</h4>
                  <p className="text-[11px] text-slate-500">
                    Click any applicant from the pipeline list to view their verified Skill Passport, match analysis, and take review action.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: POST JOBS */}
      {currentTab === "post_jobs" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post a New Opportunity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify required competencies to auto-match pre-assessed candidates.
            </p>
          </div>

          {jobPostedSuccess && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Opportunity successfully published to SkillBridge Opportunity Hub!</span>
            </div>
          )}

          <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Data Analyst Intern or Junior BI Engineer"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Opportunity Type</label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                >
                  <option value="Internship">Internship (3–6 Months)</option>
                  <option value="Job">Full-Time Job</option>
                  <option value="Startup">Early-Stage Venture Opportunity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Stipend / Annual Compensation</label>
                <input
                  type="text"
                  required
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  placeholder="e.g., ₹25,000 / month or ₹5.0 – 6.5 LPA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Location & Mode</label>
                <input
                  type="text"
                  defaultValue="Remote / Hybrid (Bangalore)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Required Competencies (Comma-separated)</label>
              <input
                type="text"
                required
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="e.g., SQL, Python, Power BI, Statistical Modeling"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer min-h-[42px]"
            >
              Publish Opportunity to Students →
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: RECRUITER FEEDBACK */}
      {currentTab === "feedback" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post-Interview Candidate Feedback Loop</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide actionable guidance. Feedback is directly published to the student's Application Tracking and notification inbox.
            </p>
          </div>

          {feedbackSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Feedback successfully submitted to student's ATS profile!</span>
            </div>
          )}

          <form onSubmit={handleSubmitFeedback} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Select Candidate</label>
              <select
                value={feedbackAppId}
                onChange={(e) => setFeedbackAppId(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-white"
              >
                {candidateApplications.map((cand) => (
                  <option key={cand.id} value={cand.id}>
                    {cand.studentName} — {cand.position} ({cand.status})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Feedback Category</label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-white"
              >
                <option value="Technical Evaluation">Technical Evaluation</option>
                <option value="Curriculum Guidance">Curriculum Guidance</option>
                <option value="Interview Debrief">Interview Debrief</option>
                <option value="Praise & Recommendation">Praise & Recommendation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Interview Assessment Note</label>
              <textarea
                rows={3}
                required
                value={feedbackNote}
                onChange={(e) => setFeedbackNote(e.target.value)}
                placeholder="Provide specific notes on what candidate did well and what competencies to practice next..."
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Submit Feedback to Student ATS Profile →
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
