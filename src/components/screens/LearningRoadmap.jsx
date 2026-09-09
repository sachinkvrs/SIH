import React, { useState, useEffect, useRef } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Trophy,
  ArrowRight,
  Sparkles,
  Zap,
  BookOpen,
  Check,
  AlertCircle,
  Lock,
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Building2,
  Cpu,
  Wrench,
  Compass,
  FileCheck2
} from "lucide-react";
import { ROADMAP_MODULES, ACADEMIC_DOMAINS_DATA } from "../../data/roadmapData";

export default function LearningRoadmap({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData,
  completedModuleIds = {},
  onCompleteModule,
  onOpenResource,
  highlightedStepId
}) {
  const [selectedDomain, setSelectedDomain] = useState("cs_it");
  const [showDomainDrawer, setShowDomainDrawer] = useState(false);
  const highlightedRef = useRef(null);

  // Filter modules: exclude internship-ready from regular course count
  const learningCourses = ROADMAP_MODULES.filter((m) => m.id !== "internship-ready");
  const completedCount = learningCourses.filter((m) => completedModuleIds[m.id]).length;
  const totalCourses = learningCourses.length;
  const overallProgress = Math.round((completedCount / totalCourses) * 100);

  // All prerequisites completed check for Internship Ready milestone
  const allCoursesCompleted = completedCount === totalCourses;
  const isInternshipReady = allCoursesCompleted;

  useEffect(() => {
    if (highlightedStepId && highlightedRef.current) {
      highlightedRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedStepId]);

  const handleContinueLearning = (moduleId) => {
    if (onOpenResource) {
      onOpenResource(moduleId);
    } else {
      onNavigate("learning_resource");
    }
  };

  const handleMarkAsCompleted = (moduleId) => {
    if (onCompleteModule) {
      onCompleteModule(moduleId);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personalized Career Roadmap</h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              Role: {careerGoal}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Structured step-by-step milestones to systematically close skill gaps and achieve verified industry readiness.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDomainDrawer((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>Academic Domains</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onNavigate("opportunities")}
            className="flex items-center gap-2 px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
          >
            <span>Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Track Progress Overview Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900">
                Roadmap Completion Track: <span className="text-blue-600">{overallProgress}%</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">
                {completedCount} of {totalCourses} Learning Milestones Completed
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            {allCoursesCompleted ? (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Internship Ready Achieved!</span>
              </span>
            ) : (
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
                {totalCourses - completedCount} modules remaining to reach Target
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              allCoursesCompleted ? "bg-emerald-500" : "bg-blue-600"
            }`}
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* Multi-Domain Academic Recommendations Drawer (Collapsible) */}
      {showDomainDrawer && (
        <div className="bg-white rounded-2xl p-5 border border-blue-200 shadow-sm space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Domain-Aware Resource Recommendations
              </h3>
            </div>
            <button
              onClick={() => setShowDomainDrawer(false)}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              ✕ Close
            </button>
          </div>

          {/* Domain Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            {Object.entries(ACADEMIC_DOMAINS_DATA).map(([key, dom]) => (
              <button
                key={key}
                onClick={() => setSelectedDomain(key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedDomain === key
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                {dom.domainName}
              </button>
            ))}
          </div>

          {/* Domain Details */}
          {ACADEMIC_DOMAINS_DATA[selectedDomain] && (
            <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-700">Trusted Academic Providers:</span>
                {ACADEMIC_DOMAINS_DATA[selectedDomain].providers.map((p, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 bg-white text-slate-800 font-semibold rounded-md border border-slate-200 text-[11px]"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <div className="space-y-1.5 pt-1">
                {ACADEMIC_DOMAINS_DATA[selectedDomain].paths.map((p, idx) => (
                  <div key={idx} className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-900">{p.name}</strong>
                      {p.sampleProject && (
                        <span className="text-[10px] text-blue-600 font-bold">
                          Cap: {p.sampleProject}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.topSkills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Roadmap Timeline Container */}
      <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Timeline Path */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {ROADMAP_MODULES.map((step, idx) => {
            const isCompleted = !!completedModuleIds[step.id];
            const prereqModule = step.prerequisiteId
              ? ROADMAP_MODULES.find((m) => m.id === step.prerequisiteId)
              : null;
            const isUnlocked = !step.prerequisiteId || !!completedModuleIds[step.prerequisiteId];
            const isTarget = step.id === "internship-ready";
            const isCurrent = isUnlocked && !isCompleted && !isTarget;
            const isLocked = !isUnlocked && !isCompleted && !isTarget;
            const isHighlighted = highlightedStepId === step.id;

            return (
              <div
                key={step.id}
                ref={isHighlighted ? highlightedRef : null}
                className="relative group"
              >
                {/* Node Pin */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center ring-4 ring-white transition ${
                    isCompleted
                      ? "bg-emerald-500 text-white shadow-xs"
                      : isCurrent
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-blue-100"
                      : isTarget
                      ? allCoursesCompleted
                        ? "bg-emerald-500 text-white animate-bounce"
                        : "bg-amber-500 text-white"
                      : isLocked
                      ? "bg-slate-200 text-slate-400"
                      : "bg-slate-100 text-slate-400 border border-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                  ) : isTarget ? (
                    <Trophy className="w-3.5 h-3.5" />
                  ) : isLocked ? (
                    <Lock className="w-3 h-3 text-slate-500" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 fill-slate-300" />
                  )}
                </div>

                {/* Node Card */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border transition ${
                    isHighlighted
                      ? "bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/40 shadow-md"
                      : isCompleted
                      ? "bg-slate-50/60 border-slate-200"
                      : isCurrent
                      ? "bg-blue-50/30 border-blue-200 shadow-xs"
                      : isTarget
                      ? allCoursesCompleted
                        ? "bg-emerald-50/50 border-emerald-300 shadow-xs"
                        : "bg-amber-50/30 border-amber-200"
                      : isLocked
                      ? "bg-slate-50/40 border-slate-200/60 opacity-85"
                      : "bg-white border-slate-200/80"
                  }`}
                >
                  {/* Top Row: Title, Category & Status Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-slate-400">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={`text-sm font-extrabold ${
                          isCompleted
                            ? "text-slate-900"
                            : isCurrent
                            ? "text-blue-950"
                            : isTarget
                            ? "text-amber-950 font-black"
                            : isLocked
                            ? "text-slate-600"
                            : "text-slate-800"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {isHighlighted && (
                        <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full animate-pulse">
                          Skill Gap Match
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        {step.duration}
                      </span>

                      {/* State Badge */}
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isCompleted
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : isCurrent
                            ? "bg-blue-100 text-blue-800 border border-blue-200"
                            : isTarget
                            ? allCoursesCompleted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200 font-black"
                              : "bg-amber-100 text-amber-800 border border-amber-200 font-bold"
                            : isLocked
                            ? "bg-slate-100 text-slate-500 border border-slate-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isCompleted
                          ? "✓ Completed"
                          : isCurrent
                          ? "● In Progress"
                          : isTarget
                          ? allCoursesCompleted
                            ? "✓ Target Achieved!"
                            : "🎯 Target Milestone"
                          : isLocked
                          ? "🔒 Locked"
                          : "○ Upcoming"}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                    <span>
                      Provider: <strong className="text-slate-800">{step.provider}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Difficulty: <strong className="text-slate-700">{step.difficulty}</strong>
                    </span>
                    {!isTarget && (
                      <>
                        <span>•</span>
                        <span>
                          Progress:{" "}
                          <strong className="text-blue-600">
                            {isCompleted ? 100 : isCurrent ? 50 : 0}%
                          </strong>
                        </span>
                      </>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {!isTarget && (
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2.5">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          isCompleted ? "bg-emerald-500" : "bg-blue-600"
                        }`}
                        style={{
                          width: `${isCompleted ? 100 : isCurrent ? 50 : 0}%`
                        }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Reason / Gap Callout */}
                  {step.reason && (
                    <div className="mt-3 p-2.5 rounded-xl bg-slate-100/80 border border-slate-200 text-xs flex items-start gap-2 text-slate-700">
                      <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-900">Why this is recommended: </strong>
                        <span>"{step.reason}"</span>
                      </div>
                    </div>
                  )}

                  {/* Prerequisite / Lock Warning */}
                  {isLocked && prereqModule && (
                    <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center gap-2 text-amber-800 font-semibold">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Complete {prereqModule.title} to unlock this module.</span>
                    </div>
                  )}

                  {/* Target Milestone Checklist */}
                  {isTarget && (
                    <div className="mt-3.5 p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2 text-xs">
                      <span className="font-bold text-slate-800 block">
                        Milestone Completion Checklist:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {learningCourses.map((crs) => {
                          const crsDone = !!completedModuleIds[crs.id];
                          return (
                            <div key={crs.id} className="flex items-center gap-2">
                              {crsDone ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Circle className="w-3.5 h-3.5 text-slate-300" />
                              )}
                              <span className={crsDone ? "text-slate-800 font-semibold" : "text-slate-400"}>
                                {crs.title}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Actions Bar (Strict Card Behavior) */}
                  <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2">
                    {/* 1. COMPLETED MODULE ACTION */}
                    {isCompleted && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleContinueLearning(step.id)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                          <span>Review Resources</span>
                        </button>
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          ✓ Completed
                        </span>
                      </div>
                    )}

                    {/* 2. IN-PROGRESS / CURRENT MODULE ACTIONS */}
                    {isCurrent && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleContinueLearning(step.id)}
                          className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Continue Learning</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleMarkAsCompleted(step.id)}
                          className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 transition cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark as Completed</span>
                        </button>
                      </div>
                    )}

                    {/* 3. UNLOCKED / UPCOMING ACTION */}
                    {!isCompleted && !isCurrent && !isLocked && !isTarget && (
                      <button
                        onClick={() => handleContinueLearning(step.id)}
                        className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Start Learning</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* 4. LOCKED ACTION */}
                    {isLocked && (
                      <button
                        disabled
                        className="px-4 py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed flex items-center gap-1.5"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </button>
                    )}

                    {/* 5. TARGET ACTION (Internship Ready) */}
                    {isTarget && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigate("opportunities")}
                          className={`px-5 py-2 rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5 ${
                            allCoursesCompleted
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                          }`}
                        >
                          <span>Explore Matched Opportunities</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onNavigate("skill_passport")}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          View Skill Passport
                        </button>
                      </div>
                    )}

                    <span className="text-[11px] text-slate-400 font-medium">
                      Est. 4–6 hrs/week
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Roadmap progress directly unlocks partner employer job matches and verification badges.
          </div>
          <button
            onClick={() => onNavigate("opportunities")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition min-h-[42px] cursor-pointer"
          >
            <span>Explore Matched Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
