// src/components/screens/LearningResource.jsx
// Dedicated Role-Context Resource Hub & Interactive Study Workspace
// Strictly scoped to the active target role, domain, roadmap module, and resource.

import React, { useState, useEffect, useMemo } from "react";
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
  ChevronDown,
  ChevronRight,
  FileText,
  Video,
  Code,
  Wrench,
  Sparkles,
  Shield,
  Layers,
  HelpCircle,
  FolderOpen,
  Menu,
  X,
  Target,
  ShieldCheck,
  AlertCircle,
  RotateCcw
} from "lucide-react";
import {
  getResourcesForRoleAndModule,
  getAllModulesForRole,
  getRecommendedRoleResources
} from "../../services/strictResourceService";
import { LEARNING_RESOURCES_CATALOG } from "../../data/learningResourcesCatalog";
import { getRoleData } from "../../data/roleCompetencies";
import {
  getModuleAssessmentQuestions,
  recordAssessmentAttempt,
  MODULE_STATUS,
  PASSING_SCORE
} from "../../services/canonicalLearningService";

export default function LearningResource({
  moduleId,
  resourceId,
  careerGoal = "Data Analyst",
  onNavigate,
  onOpenResource,
  onCompleteModule,
  onAssessmentSubmit,
  isCompleted = false,
  completedModuleIds = {},
  canonicalLearningProgress = {},
  completedResourceIds = {},
  onToggleResourceCompleted,
  onRecordActivity
}) {
  // Mobile sidebar drawer state
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeModuleState, setActiveModuleState] = useState(moduleId);
  const [activeResourceState, setActiveResourceState] = useState(resourceId);
  const [successToast, setSuccessToast] = useState(false);

  // Module Assessment State
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState(null);

  // Sync state when props change
  useEffect(() => {
    if (moduleId) {
      setActiveModuleState(moduleId);
    }
  }, [moduleId]);

  useEffect(() => {
    if (resourceId) {
      setActiveResourceState(resourceId);
    }
  }, [resourceId]);

  // Retrieve strictly-filtered role and module resources
  const {
    resources: currentModuleResources,
    activeModule,
    allModules
  } = useMemo(() => {
    return getResourcesForRoleAndModule({
      roleName: careerGoal,
      moduleId: activeModuleState
    });
  }, [careerGoal, activeModuleState]);

  // All resources strictly belonging to this role across all modules
  const allRoleResources = useMemo(() => {
    return LEARNING_RESOURCES_CATALOG.filter(
      (r) => Array.isArray(r.roleIds) && r.roleIds.includes(careerGoal)
    );
  }, [careerGoal]);

  // Resolve currently active resource in the study workspace
  const activeResource = useMemo(() => {
    if (activeResourceState) {
      const found = allRoleResources.find((r) => r.id === activeResourceState);
      if (found) return found;
    }
    // Default to the first resource of the current module
    if (currentModuleResources.length > 0) {
      return currentModuleResources[0];
    }
    // Or first resource of the role
    if (allRoleResources.length > 0) {
      return allRoleResources[0];
    }
    return null;
  }, [activeResourceState, currentModuleResources, allRoleResources]);

  // Resolve active role metadata
  const activeRoleData = useMemo(() => {
    return getRoleData(careerGoal) || { roleName: careerGoal, domainName: "Academic Track" };
  }, [careerGoal]);

  // Get canonical questions for the active module
  const moduleQuestions = useMemo(() => {
    return getModuleAssessmentQuestions(activeModule, careerGoal);
  }, [activeModule, careerGoal]);

  const activeModuleProgressData = canonicalLearningProgress[activeModule?.id];
  const isModuleCertified =
    isCompleted ||
    activeModuleProgressData?.status === MODULE_STATUS.COMPLETED ||
    activeModuleProgressData?.progressPercent === 100;

  // Calculate current module completion statistics
  const currentModuleResourceCount = currentModuleResources.length;
  const currentModuleCompletedCount = currentModuleResources.filter(
    (r) => completedResourceIds[r.id]
  ).length;

  const currentModuleProgress =
    activeModuleProgressData?.progressPercent ??
    (isModuleCertified
      ? 100
      : currentModuleResourceCount > 0
      ? Math.min(80, Math.round((currentModuleCompletedCount / currentModuleResourceCount) * 80))
      : 0);

  // Handle resource selection
  const handleSelectResource = (resId, modId) => {
    setActiveResourceState(resId);
    if (modId && modId !== activeModuleState) {
      setActiveModuleState(modId);
      if (onOpenResource) onOpenResource(modId, resId);
    }
    setMobileSidebarOpen(false);
  };

  // Explicit Toggle of Resource Completion
  const handleToggleCurrentResource = () => {
    if (!activeResource) return;
    if (onToggleResourceCompleted) {
      onToggleResourceCompleted(activeModule?.id, activeResource.id, currentModuleResources.length);
    }
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 2500);

    // Record activity
    if (onRecordActivity) {
      onRecordActivity({
        id: `act-${Date.now()}`,
        type: "Learning",
        title: `Completed ${activeResource.title}`,
        time: "Just now",
        dateGroup: "Today",
        desc: `Mastered study material for ${activeRoleData.roleName} in ${activeModule?.title || "curriculum"}.`,
        meta: "Progress Saved ✓",
        metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
      });
    }
  };

  // Open Assessment Modal
  const handleOpenAssessmentModal = () => {
    setAssessmentAnswers({});
    setAssessmentSubmitted(false);
    setAssessmentResult(null);
    setAssessmentModalOpen(true);
  };

  // Submit Module Assessment
  const handleSubmitAssessment = () => {
    if (!activeModule) return;
    let res;
    if (onAssessmentSubmit) {
      res = onAssessmentSubmit(activeModule.id, assessmentAnswers, moduleQuestions);
    } else {
      res = recordAssessmentAttempt(activeModule.id, assessmentAnswers, moduleQuestions, canonicalLearningProgress);
      if (res.passed && onCompleteModule) {
        onCompleteModule(activeModule.id);
      }
    }
    setAssessmentResult(res);
    setAssessmentSubmitted(true);

    if (res.passed) {
      setSuccessToast(true);
      setTimeout(() => setSuccessToast(false), 3000);
      if (onRecordActivity) {
        onRecordActivity({
          id: `act-${Date.now()}`,
          type: "Assessments",
          title: `Certified ${activeModule.title} (${res.score}%)`,
          time: "Just now",
          dateGroup: "Today",
          desc: `Passed module diagnostic verification with score ${res.score}%. Competency certified on Digital Skill Passport.`,
          meta: "Certified ✓",
          metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200"
        });
      }
    }
  };

  // Previous & Next navigation in the role's resource sequence
  const currentResourceIndex = currentModuleResources.findIndex(
    (r) => r.id === activeResource?.id
  );
  const prevResource = currentResourceIndex > 0 ? currentModuleResources[currentResourceIndex - 1] : null;
  const nextResource = currentResourceIndex >= 0 && currentResourceIndex < currentModuleResources.length - 1
    ? currentModuleResources[currentResourceIndex + 1]
    : null;

  // Type metadata helper
  const getTypeBadge = (type) => {
    switch (type) {
      case "PDF":
      case "BOOK":
        return { color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800", icon: FileText };
      case "VIDEO":
        return { color: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800", icon: Video };
      case "LAB":
      case "PROJECT":
        return { color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800", icon: Wrench };
      case "PRACTICE":
        return { color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800", icon: Zap };
      default:
        return { color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800", icon: BookOpen };
    }
  };

  const isCurrentResourceDone = activeResource ? !!completedResourceIds[activeResource.id] : false;
  const isCurrentModuleDone = activeModule ? !!completedModuleIds[activeModule.id] : false;

  return (
    <div className="space-y-4 max-w-7xl mx-auto pb-16">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-emerald-600 text-white rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
          <div>
            <p className="text-xs font-bold">Progress Updated</p>
            <p className="text-[11px] text-emerald-100">Saved to your verified Digital Skill Passport.</p>
          </div>
        </div>
      )}

      {/* Top Header & Breadcrumb Bar */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium flex-wrap">
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
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{careerGoal}</span>
            {activeModule && (
              <>
                <span>›</span>
                <span className="text-slate-800 dark:text-slate-200 font-bold truncate max-w-[200px]">
                  {activeModule.title}
                </span>
              </>
            )}
          </div>

          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mt-1 flex items-center gap-2">
            <span>{activeModule?.title || "Role Learning Workspace"}</span>
            {isCurrentModuleDone && (
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-[10.5px] font-bold rounded-full border border-emerald-200 dark:border-emerald-800">
                Module Completed ✓
              </span>
            )}
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>Modules ({allModules.length})</span>
          </button>

          <button
            onClick={() => onNavigate("roadmap")}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Roadmap</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Learning Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: MODULE & RESOURCE SIDEBAR NAVIGATOR (Desktop & Drawer)        */}
        {/* ========================================================================= */}
        <div
          className={`
            fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-[#111827] border-r border-slate-200 dark:border-slate-800 p-4 transition-transform duration-300 ease-in-out md:static md:z-auto md:w-auto md:col-span-4 md:rounded-2xl md:border md:p-4 md:shadow-xs
            ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          {/* Mobile Close Button */}
          <div className="flex md:hidden items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Course Curriculum
            </span>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Role Summary Banner */}
          <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200/80 dark:border-blue-900/60 mb-4 space-y-2">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block truncate">
                  {activeRoleData.domainName}
                </span>
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {careerGoal}
                </h3>
              </div>
            </div>

            {/* Module Progress Bar */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[10.5px] font-semibold text-slate-600 dark:text-slate-300 mb-1">
                <span>Active Module Progress</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{currentModuleProgress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${currentModuleProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Modules Accordion List */}
          <div className="space-y-2.5 max-h-[calc(100vh-260px)] md:max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
            {allModules.map((mod, mIdx) => {
              const isModActive = mod.id === activeModule?.id;
              const isModCompleted = !!completedModuleIds[mod.id];

              // Find resources mapped to this specific module
              const modResources = allRoleResources.filter(
                (r) => Array.isArray(r.moduleIds) && r.moduleIds.includes(mod.id)
              );

              return (
                <div
                  key={mod.id || mIdx}
                  className={`rounded-xl border transition overflow-hidden ${
                    isModActive
                      ? "border-blue-300 dark:border-blue-700 bg-slate-50/80 dark:bg-slate-800/40"
                      : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827]"
                  }`}
                >
                  {/* Module Header Button */}
                  <button
                    onClick={() => {
                      setActiveModuleState(mod.id);
                      if (modResources.length > 0) {
                        setActiveResourceState(modResources[0].id);
                      }
                      if (onOpenResource) onOpenResource(mod.id);
                    }}
                    className="w-full text-left p-3 flex items-start gap-2.5 transition cursor-pointer hover:bg-slate-100/60 dark:hover:bg-slate-800/60"
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 ${
                        isModCompleted
                          ? "bg-emerald-600 text-white"
                          : isModActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {isModCompleted ? "✓" : mIdx + 1}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-bold leading-snug truncate ${
                        isModActive ? "text-blue-600 dark:text-blue-400" : "text-slate-800 dark:text-slate-200"
                      }`}>
                        {mod.title}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                        <span>{mod.duration || "2 weeks"}</span>
                        <span>•</span>
                        <span>{modResources.length} items</span>
                      </div>
                    </div>

                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${
                        isModActive ? "rotate-180 text-blue-500" : ""
                      }`}
                    />
                  </button>

                  {/* Child Resources List (when active) */}
                  {isModActive && (
                    <div className="border-t border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-[#0c121e]">
                      {modResources.length > 0 ? (
                        modResources.map((res) => {
                          const isResSelected = res.id === activeResource?.id;
                          const isResDone = !!completedResourceIds[res.id];
                          const badge = getTypeBadge(res.type);
                          const BadgeIcon = badge.icon;

                          return (
                            <button
                              key={res.id}
                              onClick={() => handleSelectResource(res.id, mod.id)}
                              className={`w-full text-left px-3 py-2.5 flex items-center gap-2.5 transition cursor-pointer text-xs ${
                                isResSelected
                                  ? "bg-blue-50 dark:bg-blue-950/50 font-bold text-blue-700 dark:text-blue-300"
                                  : "hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] shrink-0 ${
                                  isResDone
                                    ? "bg-emerald-600 text-white font-bold"
                                    : "border border-slate-300 dark:border-slate-600 text-transparent"
                                }`}
                              >
                                {isResDone && "✓"}
                              </span>

                              <div className="flex-1 min-w-0">
                                <p className="truncate text-[11px] leading-snug">{res.title}</p>
                                <span className="text-[9.5px] text-slate-400 dark:text-slate-500 block">
                                  {res.provider} • {res.duration}
                                </span>
                              </div>

                              <span className={`px-1.5 py-0.5 rounded text-[8.5px] font-bold shrink-0 border ${badge.color}`}>
                                {res.type}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-3 text-[11px] text-slate-400 dark:text-slate-500 italic text-center">
                          Syllabus overview module. No sub-items attached.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Backdrop */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          />
        )}

        {/* ========================================================================= */}
        {/* CENTER / RIGHT COLUMN: DEDICATED STUDY WORKSPACE                            */}
        {/* ========================================================================= */}
        <div className="md:col-span-8 space-y-5">
          {activeResource ? (
            <>
              {/* Active Resource Card */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
                {/* Header Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-2 flex-wrap">
                      {(() => {
                        const badge = getTypeBadge(activeResource.type);
                        const BadgeIcon = badge.icon;
                        return (
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10.5px] font-bold border ${badge.color}`}>
                            <BadgeIcon className="w-3 h-3" />
                            <span>{activeResource.type}</span>
                          </span>
                        );
                      })()}
                      <span className="text-xs font-semibold text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                        {activeResource.provider}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">•</span>
                      <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{activeResource.duration}</span>
                      </span>
                      <span className="text-xs font-semibold text-slate-400">•</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {activeResource.difficulty}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                      {activeResource.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {activeResource.description}
                    </p>
                  </div>

                  {/* Explicit Completion State Action */}
                  <div className="shrink-0 self-start sm:self-auto">
                    <button
                      onClick={handleToggleCurrentResource}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer ${
                        isCurrentResourceDone
                          ? "bg-emerald-600 text-white hover:bg-emerald-700"
                          : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>{isCurrentResourceDone ? "Completed ✓" : "Mark as Complete"}</span>
                    </button>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block text-center mt-1">
                      {isCurrentResourceDone ? "Verified on Passport" : "Requires explicit action"}
                    </span>
                  </div>
                </div>

                {/* Skills Covered Pills */}
                {Array.isArray(activeResource.skillIds) && activeResource.skillIds.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                      Target Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeResource.skillIds.map((s, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200/80 dark:border-slate-700"
                        >
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>{s}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Learning Objectives */}
                {Array.isArray(activeResource.learningObjectives) && activeResource.learningObjectives.length > 0 && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Learning Objectives</span>
                    </h3>
                    <ul className="space-y-1.5">
                      {activeResource.learningObjectives.map((obj, oIdx) => (
                        <li key={oIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Type-Specific Interactive Study Viewer */}
                <div className="pt-2">
                  {/* ARTICLE & DOCUMENTATION */}
                  {(activeResource.type === "ARTICLE" || activeResource.type === "DOCUMENTATION") && (
                    <div className="prose dark:prose-invert max-w-none text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50/60 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                      <div className="whitespace-pre-line font-sans space-y-3">
                        {activeResource.content}
                      </div>
                    </div>
                  )}

                  {/* PDF & BOOK PUBLICATION */}
                  {(activeResource.type === "PDF" || activeResource.type === "BOOK") && (
                    <div className="p-6 bg-linear-to-br from-slate-50 to-amber-50/30 dark:from-slate-800/40 dark:to-amber-950/20 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                            Official Publication / Technical Standard
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {activeResource.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Published by <strong>{activeResource.provider}</strong> • Access: {activeResource.accessType}
                          </p>
                        </div>
                        <FileText className="w-8 h-8 text-amber-500 shrink-0" />
                      </div>

                      {activeResource.content && (
                        <div className="p-4 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line">
                          {activeResource.content}
                        </div>
                      )}
                    </div>
                  )}

                  {/* LAB & PROJECT WORKSPACE */}
                  {(activeResource.type === "LAB" || activeResource.type === "PROJECT" || activeResource.type === "PRACTICE") && (
                    <div className="p-6 bg-linear-to-br from-slate-50 to-purple-50/30 dark:from-slate-800/40 dark:to-purple-950/20 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
                            Hands-On Industrial Workspace
                          </span>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                            {activeResource.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            Simulated lab hosted by {activeResource.provider}
                          </p>
                        </div>
                        <Wrench className="w-8 h-8 text-purple-500 shrink-0" />
                      </div>

                      {activeResource.content && (
                        <div className="p-4 bg-white dark:bg-[#111827] rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line">
                          {activeResource.content}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Key Takeaways */}
                {Array.isArray(activeResource.keyTakeaways) && activeResource.keyTakeaways.length > 0 && (
                  <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/80 dark:border-emerald-900/60 space-y-2">
                    <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Executive Key Takeaways</span>
                    </h3>
                    <ul className="space-y-1">
                      {activeResource.keyTakeaways.map((takeaway, tIdx) => (
                        <li key={tIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-600 font-bold shrink-0">✓</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* External Official Link */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    <span>Source Provider: <strong>{activeResource.provider}</strong> ({activeResource.license || "Open Educational Material"})</span>
                  </div>

                  <a
                    href={activeResource.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    <span>Open Official Resource</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

              {/* Bottom Pagination & Module Complete Bar */}
              <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-3">
                {prevResource ? (
                  <button
                    onClick={() => handleSelectResource(prevResource.id, activeModule?.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Previous:</span>
                    <span className="truncate max-w-[120px]">{prevResource.title}</span>
                  </button>
                ) : (
                  <div />
                )}

                {/* Module Level Assessment & Certification Action */}
                {!isModuleCertified ? (
                  <button
                    onClick={handleOpenAssessmentModal}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Take Module Assessment (Certify) →</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Certified ({activeModuleProgressData?.assessmentResult?.score || 100}%)</span>
                    </span>
                    <button
                      onClick={handleOpenAssessmentModal}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[11px] font-semibold transition cursor-pointer"
                    >
                      Retake
                    </button>
                  </div>
                )}

                {nextResource ? (
                  <button
                    onClick={() => handleSelectResource(nextResource.id, activeModule?.id)}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                  >
                    <span className="hidden sm:inline">Next:</span>
                    <span className="truncate max-w-[120px]">{nextResource.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigate("roadmap")}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>View Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Strict Empty State: NO generic SQL fallback */
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mx-auto flex items-center justify-center">
                <FolderOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1 max-w-md mx-auto">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  No resources available for this module yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  We are actively curating verified academic literature, labs, and standards for{" "}
                  <strong>{careerGoal}</strong>: <em>{activeModule?.title || "selected milestone"}</em>.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => onNavigate("roadmap")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  Return to Career Roadmap
                </button>
                <button
                  onClick={() => {
                    if (allRoleResources.length > 0) {
                      setActiveResourceState(allRoleResources[0].id);
                    }
                  }}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  View Available {careerGoal} Resources ({allRoleResources.length})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Competency Assessment & Certification Modal */}
      {assessmentModalOpen && activeModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111827] rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {activeModule.title} — Module Assessment
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Diagnostic Certification · Passing Score: {PASSING_SCORE}% · {moduleQuestions.length} Questions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAssessmentModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {!assessmentSubmitted ? (
                <>
                  {/* Instructions banner */}
                  <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 rounded-xl border border-blue-200/60 dark:border-blue-900/60 flex items-start gap-3">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
                      Score at least <strong>{PASSING_SCORE}%</strong> to verify this competency on your Digital Skill Passport and unlock full module completion in your Career Roadmap.
                    </p>
                  </div>

                  {/* Question list */}
                  <div className="space-y-6">
                    {moduleQuestions.map((q, qIdx) => {
                      const selectedVal = assessmentAnswers[q.id];
                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                              Question {qIdx + 1} of {moduleQuestions.length}
                            </span>
                            {selectedVal && (
                              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 rounded-md border border-emerald-200 dark:border-emerald-800">
                                Answered
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                            {q.question}
                          </p>

                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt) => {
                              const isSelected = selectedVal === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => {
                                    setAssessmentAnswers((prev) => ({
                                      ...prev,
                                      [q.id]: opt.value
                                    }));
                                  }}
                                  className={`p-3 rounded-xl text-left text-xs font-medium transition cursor-pointer flex items-start gap-2.5 border ${
                                    isSelected
                                      ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500"
                                      : "bg-white dark:bg-[#111827] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-300 dark:hover:border-blue-700"
                                  }`}
                                >
                                  <span
                                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                                      isSelected
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    }`}
                                  >
                                    {opt.value}
                                  </span>
                                  <span className="leading-snug">{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                /* Post-Submission Result State */
                <div className="space-y-6">
                  {assessmentResult?.passed ? (
                    <div className="p-6 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center">
                        <Award className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 rounded-full">
                          Assessment Passed!
                        </span>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">
                          Competency Certified: {assessmentResult.score}%
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                          You answered {assessmentResult.correctCount} of {assessmentResult.totalQuestions} questions correctly.
                          This module is now <strong>100% COMPLETED</strong> on your roadmap and verified on your Digital Skill Passport.
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setAssessmentModalOpen(false);
                            onNavigate("roadmap");
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <span>View Updated Roadmap</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setAssessmentModalOpen(false)}
                          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                        >
                          Keep Studying
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 bg-amber-50/80 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-center space-y-3">
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/60 text-amber-600 dark:text-amber-300 mx-auto flex items-center justify-center">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider px-2 py-0.5 bg-amber-100 dark:bg-amber-900/60 rounded-full">
                          Passing Score Not Reached
                        </span>
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">
                          Score: {assessmentResult?.score || 0}% (Required: {PASSING_SCORE}%)
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                          You answered {assessmentResult?.correctCount || 0} of {assessmentResult?.totalQuestions || 5} correctly.
                          Module progress remains <strong>In Progress</strong> (capped at 80%). Review the answer explanations below and retry when ready.
                        </p>
                      </div>
                      <div className="pt-2 flex items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setAssessmentSubmitted(false);
                            setAssessmentAnswers({});
                          }}
                          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Retake Assessment</span>
                        </button>
                        <button
                          onClick={() => setAssessmentModalOpen(false)}
                          className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                        >
                          Back to Module
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Question by question review */}
                  <div className="space-y-4">
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      Question Review & Explanations
                    </h5>
                    {moduleQuestions.map((q, qIdx) => {
                      const studentAns = assessmentAnswers[q.id];
                      const isCorrect = studentAns === q.correct;
                      return (
                        <div
                          key={q.id}
                          className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                            isCorrect
                              ? "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60"
                              : "bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              {qIdx + 1}. {q.question}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-[10px] font-bold rounded-md shrink-0 ${
                                isCorrect
                                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300"
                                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300"
                              }`}
                            >
                              {isCorrect ? "Correct ✓" : "Incorrect ✗"}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <span className="text-slate-500 dark:text-slate-400 font-medium">Your answer: </span>
                              <strong className={isCorrect ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"}>
                                {studentAns || "None"} — {q.options.find((o) => o.value === studentAns)?.label || "Unanswered"}
                              </strong>
                            </div>
                            {!isCorrect && (
                              <div>
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Correct answer: </span>
                                <strong className="text-emerald-700 dark:text-emerald-300">
                                  {q.correct} — {q.options.find((o) => o.value === q.correct)?.label}
                                </strong>
                              </div>
                            )}
                          </div>
                          {q.explanation && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/50 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                              💡 <strong>Key takeaway:</strong> {q.explanation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {!assessmentSubmitted && (
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {Object.keys(assessmentAnswers).length} of {moduleQuestions.length} questions answered
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setAssessmentModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitAssessment}
                    disabled={Object.keys(assessmentAnswers).length === 0}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Assessment</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
