import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  AlertCircle,
  Briefcase,
  ExternalLink,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Zap,
  Target,
  CheckCircle2,
  Clock,
  Compass,
  Star,
  FolderKanban,
  FileText,
  Sparkles,
  Info,
  ChevronDown,
  X,
  History,
  ShieldCheck
} from "lucide-react";
import { CAREER_GOALS } from "../../data/careerIntelligence";
import { ROADMAP_MODULES } from "../../data/roadmapData";

export default function StudentDashboard({
  onNavigate,
  careerGoal = "Data Analyst",
  onChangeCareerGoal,
  careerData,
  profileData,
  userRoadmap = [],
  completedModuleIds = {},
  onOpenResource,
  recentActivities = [],
  onApplyOpportunity
}) {
  const [goalModalOpen, setGoalModalOpen] = useState(false);
  const [readinessModalOpen, setReadinessModalOpen] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState({});

  const studentName = profileData?.fullName || "Sachin";
  const readiness = careerData?.readinessScore || 82;

  // Derive dynamic active milestone from independent roadmap modules
  const learningCourses = ROADMAP_MODULES.filter((m) => m.id !== "internship-ready");
  const completedCoursesCount = learningCourses.filter((m) => completedModuleIds[m.id]).length;
  const activeMilestone =
    learningCourses.find((m) => !completedModuleIds[m.id]) ||
    ROADMAP_MODULES[ROADMAP_MODULES.length - 1];
  const activeMilestoneIndex = ROADMAP_MODULES.findIndex((m) => m.id === activeMilestone.id);
  const nextMilestone = ROADMAP_MODULES[activeMilestoneIndex + 1];
  const roadmapProgressPct = Math.round((completedCoursesCount / learningCourses.length) * 100);

  const handleApply = (opp) => {
    setAppliedJobs((prev) => ({ ...prev, [opp.id]: true }));
    if (onApplyOpportunity) {
      onApplyOpportunity(opp);
    }
  };

  const topMetrics = [
    {
      title: "Industry Readiness",
      value: `${readiness}%`,
      subtitle: careerData?.scoreDelta || "+5% this month",
      subColor: "text-emerald-600 font-bold",
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      onClick: () => setReadinessModalOpen(true)
    },
    {
      title: "Skills Verified",
      value: "12",
      subtitle: "Verified on Passport",
      subColor: "text-purple-600 font-semibold",
      icon: Award,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
      onClick: () => onNavigate("skill_passport")
    },
    {
      title: "Priority Skill Gaps",
      value: `${careerData?.skillGaps?.filter((g) => g.gap > 0).length || 3}`,
      subtitle: "Actionable milestones",
      subColor: "text-rose-600 font-semibold",
      icon: AlertCircle,
      iconBg: "bg-rose-50 text-rose-600 border border-rose-100",
      onClick: () => onNavigate("skill_gap")
    },
    {
      title: "Matching Internships",
      value: `${careerData?.opportunities?.length || 3}`,
      subtitle: "High affinity roles",
      subColor: "text-blue-600 font-semibold",
      icon: Briefcase,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      onClick: () => onNavigate("opportunities")
    },
  ];

  const recommendations = [
    {
      title: "Advanced SQL Queries & Window Functions",
      type: "Course • High Priority Gap",
      rating: "4.8",
      duration: "2 weeks",
      btnText: "Start Learning",
      action: () => (onOpenResource ? onOpenResource("advanced-sql") : onNavigate("roadmap")),
      iconBg: "bg-blue-600 text-white",
    },
    {
      title: "End-to-End Analytics Capstone",
      type: "Guided Project",
      rating: "4.9",
      duration: "4 weeks",
      btnText: "View Project",
      action: () => (onOpenResource ? onOpenResource("data-analytics-project") : onNavigate("roadmap")),
      iconBg: "bg-amber-500 text-white",
    },
    {
      title: "Power BI Desktop & DAX Modeling",
      type: "Interactive Workshop",
      rating: "4.7",
      duration: "3 weeks",
      btnText: "Start Learning",
      action: () => (onOpenResource ? onOpenResource("power-bi") : onNavigate("roadmap")),
      iconBg: "bg-orange-500 text-white",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, {studentName}! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep learning, keep growing. You're <span className="font-bold text-blue-600">{readiness}%</span> industry ready for <strong className="text-slate-700">{careerGoal}</strong>!
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate("skill_assessment")}
            className="px-3.5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer min-h-[38px]"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Take Assessment</span>
          </button>
          <button
            onClick={() => onNavigate("skill_gap")}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer min-h-[38px]"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>View Skill Gap</span>
          </button>
        </div>
      </div>

      {/* TOP SUMMARY: 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {topMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div
              key={idx}
              onClick={metric.onClick}
              className={`bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between ${
                metric.onClick ? "cursor-pointer hover:border-blue-300 hover:shadow-sm transition" : ""
              }`}
            >
              <div>
                <span className="text-xs font-semibold text-slate-500 block">{metric.title}</span>
                <span className="text-2xl font-black text-slate-900 mt-0.5 block">{metric.value}</span>
                <span className={`text-[11px] font-medium ${metric.subColor} mt-0.5 block`}>
                  {metric.subtitle}
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${metric.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. INDUSTRY READINESS & 5. CAREER GOAL & 4. SKILL SNAPSHOT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Col 1: 2. Explainable Industry Readiness */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Pillar Analysis
                </span>
                <h3 className="text-sm font-bold text-slate-900">Industry Readiness</h3>
              </div>
              <button
                onClick={() => setReadinessModalOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>View Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Gauge & Overall Score */}
            <div className="flex items-center gap-5 my-4">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="48" stroke="#E2E8F0" strokeWidth="10" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    stroke="#2563EB"
                    strokeWidth="10"
                    strokeDasharray="301.6"
                    strokeDashoffset={301.6 * (1 - readiness / 100)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">{readiness}%</span>
                  <span className="text-[10px] font-bold text-emerald-600 mt-0.5">Ready</span>
                </div>
              </div>

              <div className="space-y-1.5 flex-1">
                <span className="inline-block px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-md border border-emerald-200">
                  {careerData?.readinessStatus || "Industry Ready"}
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {careerData?.readinessSummary || "You have strong foundational skills. Bridging high-priority gaps will unlock top opportunities."}
                </p>
              </div>
            </div>

            {/* Explainable 5-Pillar Breakdown Bars */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              {careerData?.readinessBreakdown?.map((pillar, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span className="text-[11.5px] text-slate-600">{pillar.name}</span>
                    <span className="text-slate-800 font-bold">{pillar.score}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Overall: <strong className="text-blue-600">{readiness}% Industry Ready</strong></span>
            <button
              onClick={() => onNavigate("skill_gap")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              How it's calculated →
            </button>
          </div>
        </div>

        {/* Col 2: 5. CAREER GOAL & 4. SKILL SNAPSHOT */}
        <div className="lg:col-span-7 space-y-5">
          {/* 5. CAREER GOAL CARD */}
          <div className="bg-linear-to-r from-slate-900 via-slate-800 to-blue-950 text-white rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10 space-y-1">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                  Target Career Goal
                </span>
              </div>
              <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2.5">
                {careerGoal}
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  Active Focus
                </span>
              </h2>
              <p className="text-xs text-slate-300 max-w-md">
                All skill gaps, roadmap milestones, and internship matches are dynamically tailored to this target role.
              </p>
            </div>

            <div className="relative z-10 shrink-0">
              <button
                onClick={() => setGoalModalOpen(true)}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <span>Change Career Goal</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4. SKILL SNAPSHOT */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Skill Snapshot & Priority Gaps</h3>
                <p className="text-[11px] text-slate-500">Compare your proficiency against {careerGoal} standards</p>
              </div>
              <button
                onClick={() => onNavigate("my_skills")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View All Skills
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {careerData?.skillGaps?.slice(0, 4).map((gap, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{gap.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${gap.gapColor}`}
                    >
                      {gap.gap === 0 ? "Target Met" : `${gap.gap}% Gap (${gap.priority})`}
                    </span>
                  </div>

                  <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden relative">
                    <div
                      className={`h-full rounded-full ${
                        gap.gap === 0 ? "bg-emerald-500" : gap.gap > 15 ? "bg-rose-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${gap.current}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10.5px] text-slate-500 pt-0.5">
                    <span>You: <strong className="text-slate-800">{gap.current}%</strong></span>
                    <span>Required: <strong className="text-slate-800">{gap.required}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. YOUR NEXT BEST ACTION */}
      <div className="bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-2xl p-5 border border-blue-100 shadow-xs space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                YOUR NEXT BEST ACTION
                <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full">
                  AI Prioritized
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Actionable steps calculated to maximize your {careerGoal} hiring readiness
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {careerData?.nextBestActions?.map((action, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Step {idx + 1} • {action.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${action.priorityColor}`}>
                    {action.priority}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 leading-snug">{action.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{action.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigate(action.targetScreen)}
                  className="w-full py-2 bg-blue-50 hover:bg-[#1E60D5] hover:text-white text-blue-700 text-xs font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{action.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. RECOMMENDED OPPORTUNITIES & 7. LEARNING ROADMAP PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 6. RECOMMENDED OPPORTUNITIES (Explainable match) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recommended Opportunities</h3>
                <p className="text-[11px] text-slate-500">Explainable matching powered by SkillBridge competency analysis</p>
              </div>
              <button
                onClick={() => onNavigate("opportunities")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View All Opportunities
              </button>
            </div>

            <div className="space-y-3">
              {careerData?.opportunities?.slice(0, 2).map((opp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-50/70 hover:bg-blue-50/30 rounded-xl border border-slate-200/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg ${opp.logoBg} flex items-center justify-center font-bold text-xs shrink-0`}>
                        {opp.company.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{opp.role}</h4>
                        <p className="text-[11px] text-slate-600 font-medium">{opp.company} • {opp.location}</p>
                      </div>
                    </div>

                    {/* Why this match summary preview */}
                    <div className="pt-1.5 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="font-bold text-slate-500">Why match:</span>
                      {opp.matchingSkills?.slice(0, 3).map((m, mIdx) => (
                        <span key={mIdx} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded border border-emerald-200">
                          ✓ {m.skill}
                        </span>
                      ))}
                      {opp.missingSkills?.length > 0 && (
                        <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 font-semibold rounded border border-rose-200">
                          ⚠ {opp.missingSkills[0].skill} gap
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200/60">
                    <div className="text-left sm:text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-md border border-emerald-200 block">
                        {opp.matchPercentage}% Match
                      </span>
                      <span className="text-[9.5px] text-slate-400 mt-0.5 block">
                        → {opp.potentialMatchPercentage}% after roadmap
                      </span>
                    </div>

                    <button
                      onClick={() => handleApply(opp)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer min-h-[34px] ${
                        appliedJobs[opp.id]
                          ? "bg-emerald-600 text-white"
                          : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                      }`}
                    >
                      {appliedJobs[opp.id] ? "Applied ✓" : "Quick Apply"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Verified candidate priority queue enabled</span>
            <button
              onClick={() => onNavigate("opportunities")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              See Match Explanations →
            </button>
          </div>
        </div>

        {/* 7. LEARNING ROADMAP PROGRESS */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Career Roadmap Progress</h3>
                <p className="text-[11px] text-slate-500">Current Milestone in {careerGoal} path</p>
              </div>
              <button
                onClick={() => onNavigate("roadmap")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View Full Roadmap
              </button>
            </div>

            {activeMilestone && (
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200/80 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full uppercase tracking-wide">
                      Active Milestone
                    </span>
                    <h4 className="text-sm font-extrabold text-blue-950 mt-1">
                      {activeMilestone.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium block">
                      {activeMilestone.duration} • {activeMilestone.difficulty}
                    </span>
                  </div>
                  <span className="text-xs font-black text-blue-600">
                    {completedCoursesCount} / {learningCourses.length} Done ({roadmapProgressPct}%)
                  </span>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${roadmapProgressPct}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {activeMilestone.reason}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (onOpenResource && activeMilestone.id !== "internship-ready") {
                        onOpenResource(activeMilestone.id);
                      } else {
                        onNavigate("roadmap");
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{completedModuleIds[activeMilestone.id] ? "Review Course" : "Continue Learning"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10.5px] text-slate-400">
                    Milestone {activeMilestoneIndex + 1} of {ROADMAP_MODULES.length}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>
              Next: <strong className="text-slate-800">{nextMilestone ? nextMilestone.title : "Internship Applications"}</strong>
            </span>
            <span className="text-emerald-600 font-bold">On Schedule</span>
          </div>
        </div>
      </div>

      {/* 8. RECENT ACTIVITY & 9. RECOMMENDATIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 8. RECENT ACTIVITY (Live Feed) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-slate-500" />
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              </div>
              <button
                onClick={() => onNavigate("activity")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View Full Timeline
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.slice(0, 3).map((act, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{act.title}</span>
                      <span className="text-[10px] text-slate-400">• {act.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{act.desc}</p>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border shrink-0 ${act.metaColor}`}>
                    {act.meta}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Actions automatically recorded into your portfolio</span>
            <button
              onClick={() => onNavigate("activity")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Activity History →
            </button>
          </div>
        </div>

        {/* 9. RECOMMENDATIONS (Courses / Projects / Resources) */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">Curated Learning Recommendations</h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Industry Partner Verified</span>
            </div>

            <div className="space-y-2.5">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/60 rounded-xl border border-slate-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${rec.iconBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs`}>
                      {idx === 0 ? <BookOpen className="w-4 h-4" /> : idx === 1 ? <FolderKanban className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{rec.title}</h4>
                      <div className="flex items-center gap-2 mt-0.5 text-[10.5px] text-slate-400 font-medium">
                        <span>{rec.type}</span>
                        <span>•</span>
                        <span className="text-amber-500 font-semibold">★ {rec.rating}</span>
                        <span>•</span>
                        <span>{rec.duration}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={rec.action}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition shrink-0 cursor-pointer"
                  >
                    {rec.btnText}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Aligned with {careerGoal} qualification matrix</span>
            <button
              onClick={() => onNavigate("roadmap")}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
            >
              Roadmap Sync →
            </button>
          </div>
        </div>
      </div>

      {/* CHANGE CAREER GOAL MODAL */}
      {goalModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Select Target Career Goal</h3>
              </div>
              <button
                onClick={() => setGoalModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Choosing a new career goal dynamically recalculates your <strong>Industry Readiness</strong> score, highlights relevant <strong>Skill Gaps</strong>, adjusts your <strong>Learning Roadmap</strong>, and tailors <strong>Internship Recommendations</strong>.
            </p>

            <div className="space-y-2">
              {CAREER_GOALS.map((role) => {
                const isSelected = role === careerGoal;
                return (
                  <button
                    key={role}
                    onClick={() => {
                      onChangeCareerGoal(role);
                      setGoalModalOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-blue-50 border-blue-300 text-blue-900 shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <span>{role}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] text-blue-700 font-extrabold">
                        <CheckCircle2 className="w-4 h-4" /> Current Target
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setGoalModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPLAINABLE INDUSTRY READINESS BREAKDOWN MODAL */}
      {readinessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Explainable Industry Readiness</h3>
                  <span className="text-xs text-slate-500">Target Role: <strong>{careerGoal}</strong></span>
                </div>
              </div>
              <button
                onClick={() => setReadinessModalOpen(false)}
                className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Highlight Box */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Overall Composite Readiness
                </span>
                <span className="text-3xl font-black text-emerald-900">{readiness}% Industry Ready</span>
                <p className="text-xs text-emerald-700 mt-1">
                  {careerData?.readinessSummary}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-lg shrink-0">
                ✓
              </div>
            </div>

            {/* Pillars Detail */}
            <div className="space-y-3.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Score Pillar Calculation Breakdown
              </h4>
              {careerData?.readinessBreakdown?.map((pillar, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-900">{pillar.name}</span>
                    <span className="text-blue-600 text-sm">{pillar.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${pillar.score}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">{pillar.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setReadinessModalOpen(false);
                  onNavigate("skill_gap");
                }}
                className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Go to Skill Gap Analysis
              </button>
              <button
                onClick={() => setReadinessModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
