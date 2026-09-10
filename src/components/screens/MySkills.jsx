import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookOpen,
  Filter,
  RefreshCw,
  Award,
  TrendingUp,
  History
} from "lucide-react";

export default function MySkills({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const skillProgressHistory = careerData?.skillProgressHistory || [
    { skill: "Python", before: 68, current: 85, delta: 17, verified: true },
    { skill: "SQL", before: 48, current: 65, delta: 17, verified: true },
    { skill: "Power BI", before: 30, current: 45, delta: 15, verified: false },
    { skill: "Statistics", before: 55, current: 70, delta: 15, verified: true },
    { skill: "Excel", before: 65, current: 80, delta: 15, verified: true }
  ];

  const readinessHistory = careerData?.readinessProgressHistory || {
    before: 64,
    current: 82,
    delta: 18,
    duration: "Past 60 days"
  };

  const skillCategories = [
    {
      name: "Programming",
      skills: [
        {
          name: "Python",
          proficiency: 85,
          assessmentScore: "88/100",
          industryReq: 75,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "02 Sep 2026",
          resource: "Advanced Data Structures & Asynchronous Python",
          resourceProvider: "Coursera",
        },
        {
          name: "Java",
          proficiency: 70,
          assessmentScore: "72/100",
          industryReq: 70,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "18 Aug 2026",
          resource: "Enterprise Spring Boot & Microservices",
          resourceProvider: "Udemy",
        },
        {
          name: "C++",
          proficiency: 65,
          assessmentScore: "68/100",
          industryReq: 70,
          gap: 5,
          status: "Needs Improvement",
          verified: false,
          lastAssessed: "10 Aug 2026",
          resource: "Modern C++20 and STL Memory Optimization",
          resourceProvider: "edX",
        },
      ],
    },
    {
      name: "Data & Analytics",
      skills: [
        {
          name: "SQL",
          proficiency: 65,
          assessmentScore: "66/100",
          industryReq: 80,
          gap: 15,
          status: "Needs Improvement",
          verified: true,
          lastAssessed: "28 Aug 2026",
          resource: "Advanced SQL Queries & Window Functions",
          resourceProvider: "Mode Analytics",
        },
        {
          name: "Excel",
          proficiency: 80,
          assessmentScore: "82/100",
          industryReq: 70,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "01 Sep 2026",
          resource: "Advanced VLOOKUP, Power Query & Automation",
          resourceProvider: "Microsoft Learn",
        },
        {
          name: "Power BI",
          proficiency: 45,
          assessmentScore: "48/100",
          industryReq: 70,
          gap: 25,
          status: "Needs Improvement",
          verified: false,
          lastAssessed: "20 Aug 2026",
          resource: "End-to-End Power BI Desktop & DAX Modeling",
          resourceProvider: "Microsoft Learn",
        },
      ],
    },
    {
      name: "AI & Machine Learning",
      skills: [
        {
          name: "Machine Learning",
          proficiency: 72,
          assessmentScore: "74/100",
          industryReq: 80,
          gap: 8,
          status: "Needs Improvement",
          verified: true,
          lastAssessed: "04 Sep 2026",
          resource: "Applied Machine Learning with Scikit-Learn",
          resourceProvider: "DeepLearning.AI",
        },
        {
          name: "NLP",
          proficiency: 60,
          assessmentScore: "62/100",
          industryReq: 75,
          gap: 15,
          status: "Needs Improvement",
          verified: false,
          lastAssessed: "15 Aug 2026",
          resource: "Natural Language Processing with Transformers",
          resourceProvider: "Hugging Face",
        },
        {
          name: "Deep Learning",
          proficiency: 50,
          assessmentScore: "52/100",
          industryReq: 70,
          gap: 20,
          status: "Needs Improvement",
          verified: false,
          lastAssessed: "12 Aug 2026",
          resource: "Neural Networks & PyTorch Fundamentals",
          resourceProvider: "Fast.ai",
        },
      ],
    },
    {
      name: "Professional Skills",
      skills: [
        {
          name: "Communication",
          proficiency: 80,
          assessmentScore: "82/100",
          industryReq: 75,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "25 Aug 2026",
          resource: "Technical Presentation & Executive Storytelling",
          resourceProvider: "SkillBridge Lab",
        },
        {
          name: "Problem Solving",
          proficiency: 85,
          assessmentScore: "86/100",
          industryReq: 80,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "29 Aug 2026",
          resource: "Algorithmic Thinking & Engineering Problem Solving",
          resourceProvider: "LeetCode / SkillBridge",
        },
        {
          name: "Teamwork",
          proficiency: 90,
          assessmentScore: "92/100",
          industryReq: 80,
          gap: 0,
          status: "Strong",
          verified: true,
          lastAssessed: "30 Aug 2026",
          resource: "Agile, Scrum & Cross-Functional Teamwork",
          resourceProvider: "Atlassian University",
        },
      ],
    },
  ];

  const categoriesList = ["All", ...skillCategories.map((c) => c.name)];

  const displayedCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.name === selectedCategory);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
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
          <span className="text-slate-900 dark:text-white font-bold">My Skills</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* HEADER */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              My Skills
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
              Target: {careerGoal}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Track, verify, and measure your competency improvements over time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate("skill_assessment")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer min-h-[38px]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          <button
            onClick={() => onNavigate("skill_passport")}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer min-h-[38px]"
          >
            Digital Skill Passport
          </button>
        </div>
      </div>

      {/* 📈 SECTION 8 — SKILL PROGRESS (Before vs After Historical Improvement) */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                📈 Skill Progress & Historical Growth
                <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full">
                  Verified Trajectory
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                SkillBridge helps you systematically improve, not just evaluate. ({readinessHistory.duration})
              </p>
            </div>
          </div>

          {/* Composite Readiness Lift Card */}
          <div className="p-3 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                Industry Readiness Gain
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 line-through">Before: {readinessHistory.before}%</span>
                <span className="text-lg font-black text-emerald-900 dark:text-emerald-200">Now: {readinessHistory.current}%</span>
                <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                  +{readinessHistory.delta}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Before vs After Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {skillProgressHistory.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 hover:bg-emerald-50/30 dark:hover:bg-slate-800 hover:border-emerald-200 dark:hover:border-emerald-800/60 transition flex flex-col justify-between space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.skill}</span>
                <span className="text-[11px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded-md">
                  +{item.delta}%
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Before: <strong>{item.before}%</strong></span>
                  <span className="text-slate-900 dark:text-slate-200 font-bold">Now: {item.current}%</span>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden relative">
                  {/* Baseline marker */}
                  <div
                    className="absolute top-0 bottom-0 bg-slate-400 w-0.5 z-10"
                    style={{ left: `${item.before}%` }}
                    title={`Baseline: ${item.before}%`}
                  />
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.current}%` }}
                  />
                </div>
              </div>

              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-medium pt-1 border-t border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <span>Assessment Validated</span>
                {item.verified && <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Verified</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
            Competency Breakdown by Category
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click categories to filter your verified skills
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full sm:w-auto pb-1 sm:pb-0">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 dark:bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* INDIVIDUAL SKILL MATRIX */}
      <div className="space-y-6">
        {displayedCategories.map((category) => (
          <div
            key={category.name}
            className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>{category.name}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                {category.skills.length} Competencies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.skills.map((skill, sIdx) => {
                const isGap = skill.gap > 0;
                return (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/40 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800/90 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xs transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Skill Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</h4>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                            Last assessed: {skill.lastAssessed}
                          </span>
                        </div>
                        {skill.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold rounded-md border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            Verified ✓
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-semibold rounded-md">
                            Self-Reported
                          </span>
                        )}
                      </div>

                      {/* Proficiency & Requirement Comparison */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <span>Current: <strong className="text-slate-900 dark:text-white">{skill.proficiency}%</strong></span>
                          <span>Industry Req: <strong className="text-slate-600 dark:text-slate-400">{skill.industryReq}%</strong></span>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden relative">
                          <div
                            className="absolute top-0 bottom-0 bg-slate-400 w-0.5 z-10"
                            style={{ left: `${skill.industryReq}%` }}
                            title={`Industry Requirement: ${skill.industryReq}%`}
                          ></div>
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isGap ? "bg-rose-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] pt-1">
                          <span
                            className={`font-bold px-1.5 py-0.5 rounded ${
                              isGap
                                ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                            }`}
                          >
                            {skill.status}
                          </span>
                          {isGap && (
                            <span className="text-rose-600 dark:text-rose-400 font-bold">
                              Gap: -{skill.gap}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700 space-y-2">
                      {isGap ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onNavigate("skill_assessment")}
                            className="flex-1 py-1.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Take Assessment
                          </button>
                          <button
                            onClick={() => onNavigate("roadmap")}
                            className="flex-1 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Start Learning
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate("skill_passport")}
                          className="w-full py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-lg text-xs font-semibold border border-emerald-200 dark:border-emerald-800/60 cursor-pointer"
                        >
                          View in Digital Passport ✓
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
