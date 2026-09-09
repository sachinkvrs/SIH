import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  BookOpen,
  Filter,
  RefreshCw,
  Award
} from "lucide-react";

export default function MySkills({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const skillGapsPriorities = [
    {
      priority: "HIGH PRIORITY",
      skill: "Power BI",
      gap: "25% gap",
      current: "45%",
      target: "70%",
      color: "border-rose-300 bg-rose-50/70 text-rose-900",
      badgeColor: "bg-rose-600 text-white",
      course: "End-to-End Power BI Desktop & DAX Modeling (Microsoft Learn)",
    },
    {
      priority: "MEDIUM PRIORITY",
      skill: "SQL",
      gap: "15% gap",
      current: "65%",
      target: "80%",
      color: "border-amber-300 bg-amber-50/70 text-amber-900",
      badgeColor: "bg-amber-600 text-white",
      course: "Advanced SQL Queries & Window Functions (Mode Analytics)",
    },
    {
      priority: "LOW PRIORITY",
      skill: "Machine Learning",
      gap: "8% gap",
      current: "72%",
      target: "80%",
      color: "border-blue-300 bg-blue-50/70 text-blue-900",
      badgeColor: "bg-blue-600 text-white",
      course: "Applied Machine Learning with Scikit-Learn (DeepLearning.AI)",
    },
  ];

  // Flatten skills or filter by category
  const categoriesList = ["All", ...skillCategories.map((c) => c.name)];

  const displayedCategories = selectedCategory === "All"
    ? skillCategories
    : skillCategories.filter((c) => c.name === selectedCategory);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              My Skills
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              Personal Skill Analytics
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Track, assess and improve your professional skills.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onNavigate("skill_assessment")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retake Assessment</span>
          </button>
          <button
            onClick={() => onNavigate("skill_passport")}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Verified Skill Passport
          </button>
        </div>
      </div>

      {/* SECTION 3 — Dedicated Skill Gap Analysis Visual Section (High, Med, Low Priority) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
              Section 3 — Priority Skill Gap Hierarchy
            </h2>
            <p className="text-xs text-slate-500">Skills categorized by immediate impact on your target role</p>
          </div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            3 Gaps Detected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {skillGapsPriorities.map((gap, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${gap.color} flex flex-col justify-between space-y-3 transition hover:shadow-xs`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${gap.badgeColor}`}>
                    {gap.priority}
                  </span>
                  <span className="text-xs font-black text-rose-600">
                    -{gap.gap}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">
                  {gap.skill}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Current: <strong>{gap.current}</strong> vs Required: <strong>{gap.target}</strong>
                </p>

                <div className="mt-3 p-2.5 bg-white/80 rounded-lg border border-slate-200/60 text-[11px] text-slate-700">
                  <span className="font-bold block text-slate-900 mb-0.5">Recommended Course:</span>
                  {gap.course}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => onNavigate("skill_assessment")}
                  className="flex-1 py-1.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  Improve Skill
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1 — Skill Categories Filter */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
            Section 1 & 2 — Competency Breakdown by Category
          </h2>
          <p className="text-xs text-slate-500">Programming, Data & Analytics, AI/ML, and Professional Skills</p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION 2 — Individual Skill Analysis Matrix */}
      <div className="space-y-6">
        {displayedCategories.map((category) => (
          <div key={category.name} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>{category.name}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {category.skills.length} Competencies
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.skills.map((skill, sIdx) => {
                const isGap = skill.gap > 0;
                return (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-white hover:border-blue-300 hover:shadow-xs transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Skill Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            Last assessed: {skill.lastAssessed}
                          </span>
                        </div>
                        {skill.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-md border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            Verified ✓
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-md">
                            Self-Reported
                          </span>
                        )}
                      </div>

                      {/* Proficiency & Requirement Comparison */}
                      <div className="mt-4 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Current: <strong className="text-slate-900">{skill.proficiency}%</strong></span>
                          <span>Industry Req: <strong className="text-slate-600">{skill.industryReq}%</strong></span>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden relative">
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
                            className={`font-bold px-1.5 py-0.2 rounded ${
                              isGap
                                ? "bg-rose-50 text-rose-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {skill.status}
                          </span>
                          {isGap && (
                            <span className="text-rose-600 font-bold">
                              Gap: {skill.gap}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4 — Improve Skills Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                      {isGap ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => onNavigate("skill_assessment")}
                            className="flex-1 py-1.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Take Assessment
                          </button>
                          <button
                            onClick={() => alert(`Starting learning module: ${skill.resource}`)}
                            className="flex-1 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold transition cursor-pointer"
                          >
                            Start Learning
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onNavigate("skill_passport")}
                          className="w-full py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 cursor-pointer"
                        >
                          View Credential ✓
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
