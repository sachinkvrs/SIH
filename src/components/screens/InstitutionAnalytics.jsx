import React, { useState, useEffect } from "react";
import { Users, TrendingUp, Briefcase, GraduationCap, BarChart3, AlertCircle, CheckCircle2, Download, FileSpreadsheet } from "lucide-react";

export default function InstitutionAnalytics({ onNavigate, activeSection = "institution_analytics" }) {
  const [currentTab, setCurrentTab] = useState(
    activeSection === "skill_demand"
      ? "skill_demand"
      : activeSection === "curriculum_gap"
      ? "curriculum_gap"
      : activeSection === "placements"
      ? "placements"
      : "overview"
  );

  useEffect(() => {
    if (activeSection === "skill_demand") setCurrentTab("skill_demand");
    else if (activeSection === "curriculum_gap") setCurrentTab("curriculum_gap");
    else if (activeSection === "placements") setCurrentTab("placements");
    else if (activeSection === "institution_analytics") setCurrentTab("overview");
  }, [activeSection]);

  const kpis = [
    { label: "Total Students", value: "1,240", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Average Readiness", value: "78%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Internship Participation", value: "320", icon: Briefcase, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Placement Rate", value: "85%", icon: GraduationCap, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
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

  const placementsByBranch = [
    { branch: "CSE & IT", students: 420, placed: 378, percentage: 90 },
    { branch: "ECE (Electronics)", students: 280, placed: 232, percentage: 83 },
    { branch: "EEE (Electrical)", students: 180, placed: 144, percentage: 80 },
    { branch: "Mechanical", students: 210, placed: 162, percentage: 77 },
    { branch: "Civil", students: 150, placed: 112, percentage: 75 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Institution Intelligence & Analytics
            </h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              ABC Institute of Technology
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Overall student competency progression, curriculum alignment, and placement readiness.
          </p>
        </div>

        <button
          onClick={() => onNavigate("student_dashboard")}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer"
        >
          ← Return to Student Portal
        </button>
      </div>

      {/* Internal Navigation Tabs (Phase 2 Requirement) */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setCurrentTab("overview")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer ${
            currentTab === "overview"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Institutional Overview
        </button>
        <button
          onClick={() => setCurrentTab("skill_demand")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "skill_demand"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
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
              : "text-slate-600 hover:bg-slate-100"
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
              : "text-slate-600 hover:bg-slate-100"
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
                  className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 block">{kpi.value}</span>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5 block">{kpi.label}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${kpi.color} border flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2 Analytics Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Most Demanded Skills Horizontal Bar Chart */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Most Demanded Industry Skills</h3>
                <span className="text-xs font-semibold text-blue-600">Live Hiring Signals</span>
              </div>

              <div className="space-y-3.5 pt-2">
                {demandedSkills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>{skill.name}</span>
                      <span className="text-blue-600 font-bold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
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
            <div className="lg:col-span-6 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-800">Curriculum vs Industry Gap</h3>
                <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-300 rounded-sm"></span> Curriculum
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span> Industry Demand
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-end justify-between h-48 px-1 sm:px-2 border-b border-slate-100 overflow-x-auto min-w-0">
                {gapComparison.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 group px-1">
                    <div className="flex items-end gap-1 h-36">
                      <div
                        className="w-3 sm:w-5 bg-blue-300 rounded-t-sm transition-all group-hover:opacity-80"
                        style={{ height: `${(item.curriculum / 100) * 140}px` }}
                        title={`Curriculum: ${item.curriculum}%`}
                      ></div>
                      <div
                        className="w-3 sm:w-5 bg-blue-600 rounded-t-sm transition-all group-hover:opacity-80"
                        style={{ height: `${(item.industry / 100) * 140}px` }}
                        title={`Industry: ${item.industry}%`}
                      ></div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 mt-1">
                      {item.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SKILL DEMAND TRENDS */}
      {currentTab === "skill_demand" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">2026 Industry Skill Demand Trends</h3>
              <p className="text-xs text-slate-500">Real-time aggregate data across 500+ recruiter job descriptions</p>
            </div>
            <button
              onClick={() => alert("Exported Institutional Skill Demand Report (CSV)")}
              className="px-3.5 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>

          <div className="space-y-3">
            {demandedSkills.map((sk, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{sk.name}</h4>
                  <span className="text-[11px] text-emerald-600 font-bold">{sk.trend} growth</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-blue-600">{sk.percentage}%</span>
                  <span className="text-[10.5px] text-slate-400 block">Employer Requirement Affinity</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CURRICULUM GAP ANALYSIS */}
      {currentTab === "curriculum_gap" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Curriculum Syllabus vs Industry Delta</h3>
            <p className="text-xs text-slate-500">Actionable recommendations for Board of Studies curriculum revision</p>
          </div>

          <div className="space-y-3">
            {gapComparison.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900">{item.skill}</span>
                  <span className="px-2 py-0.5 bg-rose-50 text-rose-700 rounded border border-rose-200">
                    -{item.gap}% Syllabus Deficit
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>University Syllabus Coverage: <strong>{item.curriculum}%</strong></span>
                  <span>Industry Required Competency: <strong>{item.industry}%</strong></span>
                </div>
                <div className="p-2 bg-slate-50 rounded-lg text-[11px] text-slate-700">
                  Recommendation: Incorporate hands-on lab modules and partner certifications (IBM SkillsBuild / Microsoft Learn).
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PLACEMENTS & INTERNSHIPS */}
      {currentTab === "placements" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Branch-wise Placement & Internship Conversion</h3>
              <p className="text-xs text-slate-500">Aggregated verified statistics for NIRF & NBA accreditation</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              85% Overall Institution Placement Rate
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-3 font-semibold">Academic Discipline</th>
                  <th className="pb-3 font-semibold">Total Students</th>
                  <th className="pb-3 font-semibold">Placed / Interned</th>
                  <th className="pb-3 font-semibold text-right">Placement Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {placementsByBranch.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition">
                    <td className="py-3 font-bold text-slate-900">{b.branch}</td>
                    <td className="py-3 text-slate-600">{b.students}</td>
                    <td className="py-3 text-slate-600">{b.placed}</td>
                    <td className="py-3 text-right">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold rounded-md border border-blue-200">
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
