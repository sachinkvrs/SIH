import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Clock,
  Award,
  Zap,
  Check,
  Sparkles,
  Star,
  PlayCircle,
  FileText,
  FolderKanban,
  HelpCircle,
  X,
  Filter
} from "lucide-react";
import { ROADMAP_MODULES } from "../../data/roadmapData";
import { getResourcesForModule, recordResourceInteraction } from "../../services/learningRecommendationService";

export default function LearningResource({
  moduleId = "advanced-sql",
  onNavigate,
  onOpenResource,
  onCompleteModule,
  isCompleted = false,
  onRecordActivity
}) {
  const [completedItems, setCompletedItems] = useState({});
  const [successToast, setSuccessToast] = useState(false);
  const [resourceFilter, setResourceFilter] = useState("all"); // 'all' | 'curated' | 'model_d'
  const [simulatedResourceModal, setSimulatedResourceModal] = useState(null);

  // Find module data or fallback to Advanced SQL
  const moduleData =
    ROADMAP_MODULES.find((m) => m.id === moduleId) ||
    ROADMAP_MODULES.find((m) => m.id === "advanced-sql") ||
    ROADMAP_MODULES[1];

  // Model D dynamic dataset resources for this module
  const [datasetResources, setDatasetResources] = useState(() => getResourcesForModule(moduleData.id));

  useEffect(() => {
    setDatasetResources(getResourcesForModule(moduleData.id));
  }, [moduleData.id]);

  const currentIdx = ROADMAP_MODULES.findIndex((m) => m.id === moduleData.id);
  const prevModule = currentIdx > 0 ? ROADMAP_MODULES[currentIdx - 1] : null;
  const nextModule = currentIdx < ROADMAP_MODULES.length - 1 ? ROADMAP_MODULES[currentIdx + 1] : null;

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

  const handleUpdateDatasetProgress = (resourceId, progressVal) => {
    recordResourceInteraction(resourceId, progressVal);
    setDatasetResources(getResourcesForModule(moduleData.id));
    if (onRecordActivity) {
      onRecordActivity({
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Updated progress (${Math.round(progressVal * 100)}%) on dataset resource #${resourceId}`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Logged interactive study milestone for Model D resource.`,
        meta: progressVal >= 1.0 ? "Completed ✓" : "In Progress ●",
        metaColor: progressVal >= 1.0 ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"
      });
    }
  };

  const handleUpdateDatasetRating = (resourceId, ratingVal) => {
    recordResourceInteraction(resourceId, undefined, ratingVal);
    setDatasetResources(getResourcesForModule(moduleData.id));
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
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>
              Congratulations! {moduleData.title} has been marked as completed. Returning to roadmap...
            </span>
          </div>
          <span className="text-emerald-700 dark:text-emerald-300">✓</span>
        </div>
      )}

      {/* Level 2 Breadcrumb & In-Workspace Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <button
            onClick={() => onNavigate("roadmap")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Career Roadmap
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">{moduleData.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("roadmap")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200/80 dark:border-slate-700 shadow-2xs transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Roadmap</span>
          </button>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-extrabold rounded-xl border border-emerald-200 dark:border-emerald-800 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>✓ Module Completed</span>
            </span>
          ) : (
            <button
              onClick={handleMarkCourseCompleted}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark Completed</span>
            </button>
          )}
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md border border-blue-200 dark:border-blue-800">
                {moduleData.category}
              </span>
              <span className="text-xs font-semibold text-slate-400">•</span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Primary Provider: <strong className="text-slate-700 dark:text-slate-200">{moduleData.provider}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {moduleData.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              {moduleData.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Duration: <strong className="text-slate-800 dark:text-slate-200">{moduleData.duration}</strong></span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-slate-400" />
                <span>Difficulty: <strong className="text-slate-800 dark:text-slate-200">{moduleData.difficulty}</strong></span>
              </span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 shrink-0 w-full md:w-64 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                Module Progress
              </span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">{progressPercent}%</span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isCompleted ? "bg-emerald-500" : "bg-blue-600"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
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
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Skills You Will Master:
          </span>
          <div className="flex flex-wrap gap-2">
            {moduleData.skills?.map((skill, sIdx) => (
              <span
                key={sIdx}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 transition"
              >
                <Zap className="w-3 h-3 text-amber-500" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Course Overview & Learning Objectives */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Course Overview & Learning Objectives</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
          {moduleData.learningObjectives?.map((obj, oIdx) => (
            <div
              key={oIdx}
              className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700 flex items-start gap-2.5 text-xs font-medium text-slate-700 dark:text-slate-300"
            >
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold text-[11px] mt-0.5">
                {oIdx + 1}
              </div>
              <span className="leading-relaxed">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Model D: Synthetic ML Dataset Integration Toolbar & Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-900/50 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Model D: Content-Based Learning Recommendations
                </h3>
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-[10px] font-bold rounded-full border border-blue-300 dark:border-blue-700">
                  ML Dataset Active
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {datasetResources.totalCount} synthetic resources mapped from <code className="text-blue-700 dark:text-blue-300 font-mono">learning_resources.csv</code> &amp; <code className="text-blue-700 dark:text-blue-300 font-mono">learning_interactions.csv</code> for {moduleData.title}.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setResourceFilter("all")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                resourceFilter === "all"
                  ? "bg-blue-600 text-white shadow-2xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({totalSubItems + datasetResources.totalCount})
            </button>
            <button
              onClick={() => setResourceFilter("curated")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                resourceFilter === "curated"
                  ? "bg-blue-600 text-white shadow-2xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Curated ({totalSubItems})
            </button>
            <button
              onClick={() => setResourceFilter("model_d")}
              className={`px-3 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                resourceFilter === "model_d"
                  ? "bg-blue-600 text-white shadow-2xs font-bold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Model D ({datasetResources.totalCount})</span>
            </button>
          </div>
        </div>

        {/* Model D Resource Cards Grid */}
        {(resourceFilter === "all" || resourceFilter === "model_d") && datasetResources.all.length > 0 && (
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Dynamically Recommended by Model D for {moduleData.skills?.join(", ")}</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Ranked by Gap Priority + Peer Rating
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {datasetResources.all.map((res) => {
                const progressPct = Math.round((res.userProgress || 0) * 100);
                const isResDone = (res.userProgress || 0) >= 1.0;

                return (
                  <div
                    key={res.id}
                    className="p-4 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-600 shadow-2xs transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            res.type === "COURSE"
                              ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                              : res.type === "PROJECT"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                              : res.type === "QUIZ"
                              ? "bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800"
                              : res.type === "VIDEO"
                              ? "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                              : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                          }`}>
                            {res.type}
                          </span>
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded">
                            {res.skill}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            • {res.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span>{res.rating}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({res.learnersCount})</span>
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                        {res.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Est. {res.durationHours} hours • {res.completionRate}% peer completion rate
                      </p>
                    </div>

                    {/* Progress Control */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">Your Progress:</span>
                        <span className={`font-bold ${isResDone ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"}`}>
                          {progressPct}% {isResDone ? "✓ Completed" : ""}
                        </span>
                      </div>

                      {/* Interactive Progress Stepper */}
                      <div className="flex items-center gap-1">
                        {[0, 0.25, 0.5, 0.75, 1.0].map((stepVal) => (
                          <button
                            key={stepVal}
                            onClick={() => handleUpdateDatasetProgress(res.id, stepVal)}
                            className={`flex-1 py-1 rounded text-[10px] font-bold transition cursor-pointer ${
                              res.userProgress >= stepVal
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
                            }`}
                            title={`Set progress to ${Math.round(stepVal * 100)}%`}
                          >
                            {Math.round(stepVal * 100)}%
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => setSimulatedResourceModal(res)}
                          className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Simulate / Open Module</span>
                        </button>
                        <span className="text-[10px] text-slate-400 font-mono">Dataset #{res.id}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4 STRUCTURED RESOURCE PILLARS */}
      {(resourceFilter === "all" || resourceFilter === "curated") && (
      <div className="space-y-6">
        {/* PILLAR 1: LEARN */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">LEARN — Core Concepts & Tutorials</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Official, trustworthy documentation and interactive courses</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {moduleData.resources?.learn?.length || 0} Resources
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.learn?.map((res) => {
              const isChecked = completedItems[res.id];

              return (
                <div
                  key={res.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10.5px] font-bold rounded border border-blue-200 dark:border-blue-800">
                        {res.provider}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{res.type}</span>
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">• {res.time}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {res.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {res.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggleItem(res.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
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

          <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3 h-3" />
              <span>↗ Opens external official provider resource in a new tab</span>
            </span>
          </div>
        </div>

        {/* PILLAR 2: PRACTICE */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">PRACTICE — Hands-On Coding & Exercises</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Interactive sandboxes and algorithmic query challenges</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {moduleData.resources?.practice?.length || 0} Challenges
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.practice?.map((prac) => {
              const isChecked = completedItems[prac.id];

              return (
                <div
                  key={prac.id}
                  className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-xs transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-[10.5px] font-bold rounded border border-purple-200 dark:border-purple-800">
                        {prac.provider}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{prac.time}</span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {prac.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {prac.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                    <button
                      onClick={() => handleToggleItem(prac.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                        isChecked
                          ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
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
                        className="px-4 py-2 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-xl text-xs font-bold border border-purple-200 dark:border-purple-800 cursor-pointer"
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
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">BUILD — Applied Mini Project</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Construct real-world deliverables for your portfolio</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 font-bold">
              Portfolio Proof
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.build?.map((proj) => (
              <div
                key={proj.id}
                className="p-5 rounded-xl border border-amber-200/80 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/20 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                      {proj.type} • {proj.time}
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {proj.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {proj.description}
                </p>

                {proj.deliverables && (
                  <div className="space-y-1.5 pt-2 border-t border-amber-200/60 dark:border-amber-900/60">
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide block">
                      Required Deliverables:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {proj.deliverables.map((del, dIdx) => (
                        <span
                          key={dIdx}
                          className="px-2.5 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs"
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
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">ASSESS — Competency Benchmark</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Proctored verification to upgrade your skill scores</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Credential Check
            </span>
          </div>

          <div className="space-y-3">
            {moduleData.resources?.assess?.map((quiz) => (
              <div
                key={quiz.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{quiz.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">{quiz.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
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
      )}

      {/* Bottom Completion Actions */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Finished working through {moduleData.title}?
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            Marking this course completed will unlock the subsequent milestone in your roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => onNavigate("roadmap")}
            className="flex-1 sm:flex-none px-4 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
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
            <span className="px-4 py-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Completed ✓</span>
            </span>
          )}
        </div>
      </div>

      {/* Level 3 Sequential Workflow Navigation (Previous / Next Module) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        {prevModule ? (
          <button
            onClick={() => onOpenResource ? onOpenResource(prevModule.id) : onNavigate("roadmap")}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl shadow-2xs transition cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            <div className="text-left">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Previous Module</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px] block">{prevModule.title}</span>
            </div>
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}

        <button
          onClick={() => onNavigate("roadmap")}
          className="px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition text-center cursor-pointer"
        >
          View Full Career Roadmap ({ROADMAP_MODULES.length} Milestones)
        </button>

        {nextModule ? (
          <button
            onClick={() => onOpenResource ? onOpenResource(nextModule.id) : onNavigate("roadmap")}
            className="flex items-center justify-end gap-3 px-4 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl shadow-2xs transition cursor-pointer group"
          >
            <div className="text-right">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Next Module</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[200px] block">{nextModule.title}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <div className="hidden sm:block" />
        )}
      </div>

      {/* SIMULATED RESOURCE MODAL (Model D Interactive Console) */}
      {simulatedResourceModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10.5px] font-bold rounded border border-blue-200 dark:border-blue-800">
                    Model D • {simulatedResourceModal.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Dataset #{simulatedResourceModal.id}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {simulatedResourceModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSimulatedResourceModal(null)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Simulated Workspace Information */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                  <span>Skill Competency:</span>
                  <strong className="text-slate-900 dark:text-white">{simulatedResourceModal.skill}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                  <span>Difficulty Tier:</span>
                  <strong className="text-slate-900 dark:text-white">{simulatedResourceModal.difficulty}</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                  <span>Duration:</span>
                  <strong className="text-slate-900 dark:text-white">{simulatedResourceModal.durationHours} Hours</strong>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 font-medium">
                  <span>Peer Community Rating:</span>
                  <span className="text-amber-500 font-bold flex items-center gap-1">
                    ★ {simulatedResourceModal.rating} ({simulatedResourceModal.learnersCount} learners)
                  </span>
                </div>
              </div>

              {/* Interactive Study Controls */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Update Your Learning Progress:
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[0, 0.25, 0.5, 0.75, 1.0].map((stepVal) => (
                    <button
                      key={stepVal}
                      onClick={() => {
                        handleUpdateDatasetProgress(simulatedResourceModal.id, stepVal);
                        setSimulatedResourceModal((prev) => prev ? { ...prev, userProgress: stepVal } : null);
                      }}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        (simulatedResourceModal.userProgress || 0) >= stepVal
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {Math.round(stepVal * 100)}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Feedback */}
              <div className="space-y-2 pt-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Rate this Resource:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      onClick={() => {
                        handleUpdateDatasetRating(simulatedResourceModal.id, starVal);
                        setSimulatedResourceModal((prev) => prev ? { ...prev, userRating: starVal } : null);
                      }}
                      className="p-2 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          (simulatedResourceModal.userRating || 0) >= starVal
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300 dark:text-slate-600"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-500 ml-2">
                    {simulatedResourceModal.userRating ? `${simulatedResourceModal.userRating} / 5 Stars` : "Not rated yet"}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-[11px] text-blue-800 dark:text-blue-300">
                💡 <strong>Model D Interaction:</strong> Updates are saved to your local interaction profile and feed into the readiness and recommendations engine.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSimulatedResourceModal(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Close &amp; Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
