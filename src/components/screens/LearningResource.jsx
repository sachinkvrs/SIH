import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Code2,
  Hammer,
  FileCheck2,
  Clock,
  Award,
  Zap,
  Building2,
  Check,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/roadmapData";

export default function LearningResource({
  moduleId = "advanced-sql",
  onNavigate,
  onCompleteModule,
  isCompleted = false,
  onRecordActivity
}) {
  const [completedItems, setCompletedItems] = useState({});
  const [successToast, setSuccessToast] = useState(false);

  // Find module data or fallback to Advanced SQL
  const moduleData =
    ROADMAP_MODULES.find((m) => m.id === moduleId) ||
    ROADMAP_MODULES.find((m) => m.id === "advanced-sql") ||
    ROADMAP_MODULES[1];

  const handleOpenExternalResource = (resource) => {
    if (onRecordActivity) {
      onRecordActivity({
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Viewed ${resource.provider} resource: ${resource.title}`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Studied external educational material from ${resource.provider}.`,
        meta: "Resource Opened ↗",
        metaColor: "bg-blue-100 text-blue-800 border-blue-200"
      });
    }
  };

  const handleToggleItem = (itemId) => {
    setCompletedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const handleMarkCourseCompleted = () => {
    if (onCompleteModule) {
      onCompleteModule(moduleData.id);
    }
    setSuccessToast(true);
    setTimeout(() => {
      onNavigate("roadmap");
    }, 1200);
  };

  // Sub-items calculation
  const totalSubItems =
    (moduleData.resources?.learn?.length || 0) +
    (moduleData.resources?.practice?.length || 0) +
    (moduleData.resources?.build?.length || 0) +
    (moduleData.resources?.assess?.length || 0);

  const completedSubCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = isCompleted
    ? 100
    : totalSubItems > 0
    ? Math.min(95, Math.round((completedSubCount / totalSubItems) * 80) + 20)
    : 45;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Toast Alert */}
      {successToast && (
        <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>
              Congratulations! {moduleData.title} has been marked as completed. Returning to roadmap...
            </span>
          </div>
          <span className="text-emerald-700">✓</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => onNavigate("roadmap")}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200/80 shadow-2xs transition cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Roadmap</span>
        </button>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-extrabold rounded-xl border border-emerald-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>✓ Module Completed</span>
            </span>
          ) : (
            <button
              onClick={handleMarkCourseCompleted}
              className="inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer min-h-[38px]"
            >
              <Check className="w-4 h-4" />
              <span>Mark Course as Completed</span>
            </button>
          )}
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-200">
                {moduleData.category}
              </span>
              <span className="text-xs font-semibold text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500">
                Primary Provider: <strong className="text-slate-700">{moduleData.provider}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {moduleData.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              {moduleData.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Duration: <strong className="text-slate-800">{moduleData.duration}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Difficulty: <strong className="text-slate-800">{moduleData.difficulty}</strong></span>
              </span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200/80 shrink-0 w-full md:w-64 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                Module Progress
              </span>
              <span className="text-sm font-black text-blue-600">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isCompleted ? "bg-emerald-500" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              {isCompleted
                ? "All requirements fulfilled. Portfolio credential verified."
                : "Work through the Learn, Practice, Build, and Assess pillars below."}
            </p>

            {!isCompleted && (
              <button
                onClick={handleMarkCourseCompleted}
                className="w-full py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Mark as Completed ✓
              </button>
            )}
          </div>
        </div>

        {/* Skills Covered Pills */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Skills You Will Master:
          </span>
          <div className="flex flex-wrap gap-2">
            {moduleData.skills?.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold rounded-lg border border-slate-200 transition"
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Course Overview & Learning Objectives */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Course Overview & Learning Objectives</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {moduleData.learningObjectives?.map((obj, oIdx) => (
            <div
              key={oIdx}
              className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 flex items-start gap-2.5 text-xs font-medium text-slate-700"
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                {oIdx + 1}
              </div>
              <span className="leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 STRUCTURED RESOURCE PILLARS */}
      <div className="space-y-6">
        {/* PILLAR 1: LEARN */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">LEARN — Core Concepts & Tutorials</h3>
                <p className="text-[11px] text-slate-500">Official, trustworthy documentation and interactive courses</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {moduleData.resources?.learn?.length || 0} Resources
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.learn?.map((res) => {
              const isChecked = completedItems[res.id];

              return (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10.5px] font-bold rounded border border-blue-200">
                        {res.provider}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{res.type}</span>
                      <span className="text-[11px] font-semibold text-slate-400">• {res.time}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {res.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggleItem(res.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                      title={isChecked ? "Completed" : "Mark as Done"}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleOpenExternalResource(res)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
                    >
                      <span>Open Resource</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              <span>↗ Opens external official provider resource in a new tab</span>
            </span>
          </div>
        </div>

        {/* PILLAR 2: PRACTICE */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">PRACTICE — Hands-On Coding & Exercises</h3>
                <p className="text-[11px] text-slate-500">Interactive sandboxes and algorithmic query challenges</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {moduleData.resources?.practice?.length || 0} Challenges
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.practice?.map((prac) => {
              const isChecked = completedItems[prac.id];

              return (
                <div
                  key={prac.id}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10.5px] font-bold rounded border border-purple-200">
                        {prac.provider}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{prac.time}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {prac.title}
                    </h4>

                    <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                      {prac.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggleItem(prac.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-white border-slate-200 text-slate-500 hover:bg-slate-100"
                      }`}
                      title={isChecked ? "Completed" : "Mark as Done"}
                    >
                      <Check className="w-4 h-4" />
                    </button>

                    {prac.url ? (
                      <a
                        href={prac.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
                      >
                        <span>Practice Problems</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => handleToggleItem(prac.id)}
                        className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold border border-purple-200 cursor-pointer"
                      >
                        Practice In Sandbox
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PILLAR 3: BUILD */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">BUILD — Applied Mini Project</h3>
                <p className="text-[11px] text-slate-500">Construct real-world deliverables for your portfolio</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-bold">
              Portfolio Proof
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.build?.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-amber-200/80 bg-amber-50/20 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                      {proj.type} • {proj.time}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {proj.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {proj.description}
                </p>

                {proj.deliverables && (
                  <div className="space-y-1.5 pt-2 border-t border-amber-200/60">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide block">
                      Required Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proj.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2.5 py-1 bg-white text-slate-700 text-xs font-semibold rounded-md border border-slate-200 shadow-2xs"
                        >
                          📦 {del}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PILLAR 4: ASSESS */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">ASSESS — Competency Benchmark</h3>
                <p className="text-[11px] text-slate-500">Proctored verification to upgrade your skill scores</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              Credential Check
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.assess?.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm">{quiz.title}</h4>
                  <p className="text-slate-500 text-[11px]">{quiz.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                    <span>Questions: <strong>{quiz.questionsCount}</strong></span>
                    <span>•</span>
                    <span>Benchmark: <strong>{quiz.passingScore}</strong></span>
                    <span>•</span>
                    <span>Duration: {quiz.time}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("skill_assessment")}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-2xs shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  Take Assessment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Completion Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-900 block">
            Finished working through {moduleData.title}?
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Marking this course completed will unlock the subsequent milestone in your roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onNavigate("roadmap")}
            className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            Back to Roadmap
          </button>

          {!isCompleted ? (
            <button
              onClick={handleMarkCourseCompleted}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Mark Course as Completed</span>
            </button>
          ) : (
            <span className="px-4 py-2 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Completed ✓</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
