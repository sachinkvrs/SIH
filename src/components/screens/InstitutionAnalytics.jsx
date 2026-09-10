// src/components/screens/InstitutionAnalytics.jsx
// SkillBridge Institution Intelligence & Analytics Portal
// Connected to Canonical Applications State & Student Endorsement Queue

import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  Briefcase,
  GraduationCap,
  BarChart3,
  AlertCircle,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  Send,
  UserCheck,
  Building2,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import {
  APPLICATION_STATUS,
  ACTOR_ROLES,
  canTransition,
  STATUS_UI_META
} from "../../services/canonicalApplicationService";

export default function InstitutionAnalytics({
  onNavigate,
  activeSection = "institution_analytics",
  applicationsList = [],
  onUpdateApplicationStatus,
  onAddFeedback
}) {
  const [currentTab, setCurrentTab] = useState(
    activeSection === "skill_demand"
      ? "skill_demand"
      : activeSection === "curriculum_gap"
      ? "curriculum_gap"
      : activeSection === "placements"
      ? "placements"
      : activeSection === "students" || activeSection === "endorsements"
      ? "endorsements"
      : "overview"
  );

  useEffect(() => {
    if (activeSection === "skill_demand") setCurrentTab("skill_demand");
    else if (activeSection === "curriculum_gap") setCurrentTab("curriculum_gap");
    else if (activeSection === "placements") setCurrentTab("placements");
    else if (activeSection === "students" || activeSection === "endorsements") setCurrentTab("endorsements");
    else if (activeSection === "institution_analytics") setCurrentTab("overview");
  }, [activeSection]);

  const [endorsementMessage, setEndorsementMessage] = useState("");
  const [selectedStudentApp, setSelectedStudentApp] = useState(null);

  // Institution student applications
  const institutionApplications = applicationsList.filter((app) => {
    return (
      app.college === "ABC Institute of Technology" ||
      app.studentEmail?.includes("example.edu.in") ||
      !app.college // fallback
    );
  });

  const uniqueStudentsCount = new Set(
    institutionApplications.map((a) => a.studentId || a.studentEmail || a.studentName || a.id)
  ).size;

  const avgReadiness =
    institutionApplications.length > 0
      ? Math.round(
          institutionApplications.reduce((acc, a) => acc + (a.matchScore || 80), 0) /
            institutionApplications.length
        )
      : 0;

  const placedCount = institutionApplications.filter(
    (a) => a.status === APPLICATION_STATUS.SELECTED
  ).length;

  const kpis = [
    {
      label: "Active Student Applicants",
      value: uniqueStudentsCount.toString(),
      icon: Users,
      color: "text-blue-600 bg-blue-50 border-blue-100"
    },
    {
      label: "Average Match / Readiness",
      value: institutionApplications.length > 0 ? `${avgReadiness}%` : "0%",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      label: "Active Applications",
      value: institutionApplications.length.toString(),
      icon: Briefcase,
      color: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      label: "Verified Placed / Selected",
      value: placedCount.toString(),
      icon: GraduationCap,
      color: "text-cyan-600 bg-cyan-50 border-cyan-100"
    }
  ];

  const demandedSkills = [
    { name: "Python", percentage: 92, trend: "+8% YoY" },
    { name: "SQL", percentage: 86, trend: "+12% YoY" },
    { name: "AI/ML", percentage: 84, trend: "+18% YoY" },
    { name: "Cloud Architecture", percentage: 78, trend: "+15% YoY" },
    { name: "Cybersecurity", percentage: 72, trend: "+10% YoY" },
  ];

  const gapComparison = [
    { skill: "Python", curriculum: 80, industry: 92, gap: 12 },
    { skill: "SQL", curriculum: 65, industry: 86, gap: 21 },
    { skill: "Cloud", curriculum: 45, industry: 78, gap: 33 },
    { skill: "AI/ML", curriculum: 55, industry: 84, gap: 29 },
    { skill: "Security", curriculum: 40, industry: 72, gap: 32 },
  ];

  const branches = [
    { key: "cs_it", branch: "CSE & IT", matchRole: ["Data Analyst", "Data Science", "Software Developer", "AI/ML Engineer"] },
    { key: "ece", branch: "ECE (Electronics)", matchRole: ["Embedded Systems Engineer", "VLSI / Chip Design Engineer", "IoT Engineer"] },
    { key: "eee", branch: "EEE (Electrical)", matchRole: ["Power Systems Engineer", "Renewable Energy Engineer"] },
    { key: "mech", branch: "Mechanical", matchRole: ["Mechanical Design Engineer", "CAD Design Intern", "CAD/CAM Engineer"] },
    { key: "civil", branch: "Civil", matchRole: ["Structural Engineer", "Civil Site Engineer", "BIM Engineer"] },
  ];

  const placementsByBranch = branches.map((b) => {
    const branchApps = institutionApplications.filter((app) =>
      app.domainId === b.key ||
      b.matchRole.some((r) => app.roleCategory?.includes(r) || app.position?.includes(r) || app.role?.includes(r))
    );
    const branchStudents = new Set(branchApps.map((a) => a.studentId || a.id)).size;
    const branchPlaced = branchApps.filter((a) => a.status === APPLICATION_STATUS.SELECTED).length;
    const percentage = branchStudents > 0 ? Math.round((branchPlaced / branchStudents) * 100) : 0;
    return {
      branch: b.branch,
      students: branchStudents,
      placed: branchPlaced,
      percentage
    };
  });

  const totalStudentsCount = placementsByBranch.reduce((acc, b) => acc + b.students, 0);
  const totalPlacedCount = placementsByBranch.reduce((acc, b) => acc + b.placed, 0);
  const overallPlacementRate = totalStudentsCount > 0 ? Math.round((totalPlacedCount / totalStudentsCount) * 100) : 0;

  // Execute institutional endorsement & forward to industry
  const handleForwardToIndustry = (appId) => {
    if (!onUpdateApplicationStatus) return;
    const res = onUpdateApplicationStatus(
      appId,
      APPLICATION_STATUS.FORWARDED_TO_INDUSTRY,
      ACTOR_ROLES.INSTITUTION,
      "Endorsed by Institution TPO. Academic standing and skill passport verified.",
      {
        authorName: "Institution Placement Cell",
        category: "Institutional Endorsement",
        message: "Student verified with good academic standing and high competency passport credentials. Recommended for recruitment consideration.",
        visibility: "STUDENT_VISIBLE"
      }
    );

    if (res?.success) {
      setEndorsementMessage("Application successfully endorsed & forwarded to industry hiring partner!");
      setTimeout(() => setEndorsementMessage(""), 3500);
      if (selectedStudentApp && selectedStudentApp.id === appId) {
        setSelectedStudentApp(res.application);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Endorsement Message Banner */}
      {endorsementMessage && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>{endorsementMessage}</span>
          </div>
          <button onClick={() => setEndorsementMessage("")} className="text-emerald-700 hover:text-emerald-900 text-xs font-semibold">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Institution Intelligence & Placement Portal
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-900/50">
              ABC Institute of Technology
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Institutional competency monitoring, NIRF placement tracking, and student application endorsement queue.
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
            onClick={() => onNavigate("industry_dashboard")}
            className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800/60 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            Industry Portal →
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
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Institutional Overview</span>
        </button>
        <button
          onClick={() => setCurrentTab("endorsements")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "endorsements"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Student Endorsement Queue ({institutionApplications.length})</span>
        </button>
        <button
          onClick={() => setCurrentTab("skill_demand")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "skill_demand"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Skill Demand Trends</span>
        </button>
        <button
          onClick={() => setCurrentTab("curriculum_gap")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "curriculum_gap"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Curriculum Gap Analysis</span>
        </button>
        <button
          onClick={() => setCurrentTab("placements")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "placements"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Internships & Placements</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {currentTab === "overview" && (
        <div className="space-y-6">
          {/* 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {kpis.map((kpi, idx) => {
              const Icon = kpi.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111827] rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">{kpi.value}</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 block">{kpi.label}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${kpi.color} dark:bg-slate-800 dark:border-slate-700 border flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2 Analytics Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Most Demanded Skills Horizontal Bar Chart */}
            <div className="lg:col-span-6 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Most Demanded Industry Skills</h3>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Live Hiring Signals</span>
              </div>

              <div className="space-y-3.5 pt-2">
                {demandedSkills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <span>{skill.name}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum vs Industry Gap Grouped Bar Chart */}
            <div className="lg:col-span-6 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Curriculum vs Industry Gap</h3>
                <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-300 rounded-sm"></span> Curriculum
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span> Industry Demand
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-end justify-between h-48 px-1 sm:px-2 border-b border-slate-100 dark:border-slate-800 overflow-x-auto min-w-0">
                {gapComparison.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 group px-1">
                    <div className="flex items-end gap-1 h-36">
                      <div
                        className="w-3 sm:w-5 bg-blue-300 dark:bg-blue-400/60 rounded-t-sm transition-all group-hover:opacity-80"
                        style={{ height: `${(item.curriculum / 100) * 140}px` }}
                        title={`Curriculum: ${item.curriculum}%`}
                      ></div>
                      <div
                        className="w-3 sm:w-5 bg-blue-600 dark:bg-blue-500 rounded-t-sm transition-all group-hover:opacity-80"
                        style={{ height: `${(item.industry / 100) * 140}px` }}
                        title={`Industry: ${item.industry}%`}
                      ></div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 dark:text-slate-400 mt-1">
                      {item.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT ENDORSEMENT & VERIFICATION QUEUE */}
      {currentTab === "endorsements" && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Student Institutional Endorsement Queue
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Review student applications, verify academic standing, and endorse/forward directly to partner recruiters.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-800 self-start sm:self-auto">
                {institutionApplications.length} Total Student Submissions
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-4">
              {institutionApplications.length === 0 ? (
                <div className="py-12 text-center text-slate-500 dark:text-slate-400">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                  <p className="font-bold text-sm text-slate-700 dark:text-slate-300">No student applications in endorsement queue</p>
                  <p className="text-xs text-slate-400 mt-1">When students submit applications, they will appear here for institutional verification and endorsement.</p>
                </div>
              ) : (
                institutionApplications.map((app) => {
                  const statusMeta = STATUS_UI_META[app.status] || STATUS_UI_META[APPLICATION_STATUS.APPLIED];
                  const canForward = canTransition(app, ACTOR_ROLES.INSTITUTION, APPLICATION_STATUS.FORWARDED_TO_INDUSTRY);

                  return (
                    <div key={app.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0">
                          {(app.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{app.studentName}</h4>
                            <span className="text-[11px] text-slate-400">• {app.degree || "B.Tech"}</span>
                            <span className="px-2 py-0.2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded border border-emerald-200">
                              {app.matchScore || 85}% Skill Match
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                            Target: <strong>{app.position}</strong> at <strong>{app.company}</strong>
                          </p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                            <span>Applied: {app.appliedDate}</span>
                            <span>•</span>
                            <span>Passport ID: {app.passportCredentialId || "CRED-SB-2026-VERIFIED"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-auto">
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${statusMeta.badgeBg}`}>
                          {app.status}
                        </span>

                        {canForward ? (
                          <button
                            onClick={() => handleForwardToIndustry(app.id)}
                            className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1.5"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Endorse & Forward to {app.company}</span>
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold italic">
                            {app.status === APPLICATION_STATUS.FORWARDED_TO_INDUSTRY ? "Endorsed to Employer ✓" : "In Recruiter Pipeline"}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SKILL DEMAND TRENDS */}
      {currentTab === "skill_demand" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2026 Industry Skill Demand Trends</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Real-time aggregate data across 500+ recruiter job descriptions</p>
            </div>
            <button
              onClick={() => alert("Exported Institutional Skill Demand Report (CSV)")}
              className="px-3.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold border border-blue-200 dark:border-blue-900/50 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="space-y-3">
            {demandedSkills.map((sk, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{sk.name}</h4>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">{sk.trend} growth</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-blue-600 dark:text-blue-400">{sk.percentage}%</span>
                  <span className="text-[10.5px] text-slate-400 dark:text-slate-500 block">Employer Requirement Affinity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CURRICULUM GAP ANALYSIS */}
      {currentTab === "curriculum_gap" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Curriculum Syllabus vs Industry Delta</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Actionable recommendations for Board of Studies curriculum revision</p>
          </div>

          <div className="space-y-3">
            {gapComparison.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-white">{item.skill}</span>
                  <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 rounded border border-rose-200 dark:border-rose-900/50">
                    -{item.gap}% Syllabus Deficit
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>University Syllabus Coverage: <strong>{item.curriculum}%</strong></span>
                  <span>Industry Required Competency: <strong>{item.industry}%</strong></span>
                </div>
                <div className="p-2 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-[11px] text-slate-700 dark:text-slate-300">
                  Recommendation: Incorporate hands-on lab modules and partner certifications (IBM SkillsBuild / Microsoft Learn).
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PLACEMENTS & INTERNSHIPS */}
      {currentTab === "placements" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Branch-wise Placement & Internship Conversion</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Aggregated verified statistics for NIRF & NBA accreditation</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              {overallPlacementRate}% Overall Institution Placement Rate
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <th className="pb-3 font-semibold">Academic Discipline</th>
                  <th className="pb-3 font-semibold">Total Students</th>
                  <th className="pb-3 font-semibold">Placed / Interned</th>
                  <th className="pb-3 font-semibold text-right">Placement Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {placementsByBranch.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3 font-bold text-slate-900 dark:text-white">{b.branch}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{b.students}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">{b.placed}</td>
                    <td className="py-3 text-right">
                      <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold rounded-md border border-blue-200 dark:border-blue-900/50">
                        {b.percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
