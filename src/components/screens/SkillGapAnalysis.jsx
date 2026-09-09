import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Compass,
  Zap,
  Target,
  Clock,
  Award
} from "lucide-react";

export default function SkillGapAnalysis({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData,
  onStartLearning
}) {
  const skillGaps = careerData?.skillGaps || [];
  const topPriorityGap = skillGaps.find((g) => g.priority === "HIGH") || skillGaps[0];

  const handleStart = (stepId) => {
    if (onStartLearning) {
      onStartLearning(stepId);
    } else {
      onNavigate("roadmap");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Skill Gap Analysis</h2>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              Target: {careerGoal}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare your current assessed skills against validated industry requirements for <strong>{careerGoal}</strong>.
          </p>
        </div>

        <button
          onClick={() => onNavigate("roadmap")}
          className="flex items-center gap-2 px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition self-start sm:self-auto cursor-pointer"
        >
          <span>View Full Roadmap</span>
          <Compass className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-6">
        {/* Highest Priority Alert Banner */}
        {topPriorityGap && topPriorityGap.gap > 0 && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-rose-900">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-extrabold text-sm block text-rose-950">
                  {topPriorityGap.name} is your highest-priority skill gap ({topPriorityGap.gap}% gap).
                </span>
                <p className="text-[11.5px] text-rose-800 mt-0.5">
                  Bridging this gap by completing <strong>{topPriorityGap.recommendedAction}</strong> will increase your industry readiness by +10% and boost internship matching affinity.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleStart(topPriorityGap.roadmapStepId)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition shrink-0 self-start sm:self-auto cursor-pointer"
            >
              Start Learning Now →
            </button>
          </div>
        )}

        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block space-y-4">
          <div className="grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
            <div className="col-span-3">Skill & Priority</div>
            <div className="col-span-4">You vs Requirement</div>
            <div className="col-span-2 text-center">Gap</div>
            <div className="col-span-3 text-right">Recommended Action</div>
          </div>

          <div className="space-y-4">
            {skillGaps.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center text-xs p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
              >
                {/* Skill Name & Priority Badge */}
                <div className="col-span-3 space-y-1">
                  <span className="font-bold text-slate-900 block text-sm">{item.name}</span>
                  <span
                    className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border ${
                      item.priority === "HIGH"
                        ? "bg-rose-100 text-rose-700 border-rose-200"
                        : item.priority === "MEDIUM"
                        ? "bg-amber-100 text-amber-700 border-amber-200"
                        : "bg-emerald-100 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {item.priority} PRIORITY
                  </span>
                </div>

                {/* Visual Bars */}
                <div className="col-span-4 space-y-1 pr-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-0.5">
                    <span>Current: <strong className="text-blue-600 font-bold">{item.current}%</strong></span>
                    <span>Req: <strong className="text-slate-700">{item.required}%</strong></span>
                  </div>
                  {/* Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                    <div
                      className="absolute top-0 bottom-0 bg-slate-300 w-0.5 z-10"
                      style={{ left: `${item.required}%` }}
                      title={`Required: ${item.required}%`}
                    />
                    <div
                      className={`h-full rounded-full ${
                        item.gap === 0
                          ? "bg-emerald-500"
                          : item.gap > 15
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${item.current}%` }}
                    />
                  </div>
                </div>

                {/* Gap Badge */}
                <div className="col-span-2 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-black rounded-lg border ${item.gapColor}`}
                  >
                    {item.gap === 0 ? "Target Met ✓" : `-${item.gap}% Gap`}
                  </span>
                </div>

                {/* Recommended Action with deep link */}
                <div className="col-span-3 text-right space-y-1">
                  <span className="text-[11px] text-slate-600 font-semibold block truncate" title={item.recommendedAction}>
                    {item.recommendedAction}
                  </span>
                  {item.gap > 0 ? (
                    <button
                      onClick={() => handleStart(item.roadmapStepId)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                    >
                      <span>Start Learning ({item.duration})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <span className="text-[10.5px] font-bold text-emerald-600">
                      Verified Competent ✓
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards Stack View (< md) */}
        <div className="block md:hidden space-y-3.5">
          {skillGaps.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900 block">{item.name}</span>
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {item.priority} Priority
                  </span>
                </div>
                <span className={`px-2.5 py-1 text-xs font-black rounded-lg border ${item.gapColor}`}>
                  {item.gap === 0 ? "0% Gap" : `-${item.gap}% Gap`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-100 shadow-xs">
                  <span className="text-slate-400 block text-[10.5px]">Current Assessment</span>
                  <span className="font-extrabold text-blue-600 text-sm">{item.current}%</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-100 shadow-xs">
                  <span className="text-slate-400 block text-[10.5px]">Industry Required</span>
                  <span className="font-extrabold text-slate-800 text-sm">{item.required}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden relative">
                <div
                  className="absolute top-0 bottom-0 bg-slate-400 w-0.5 z-10"
                  style={{ left: `${item.required}%` }}
                />
                <div
                  className={`h-full rounded-full ${
                    item.gap === 0 ? "bg-emerald-500" : item.gap > 15 ? "bg-rose-500" : "bg-amber-500"
                  }`}
                  style={{ width: `${item.current}%` }}
                />
              </div>

              <div className="pt-2 border-t border-slate-200/60 space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Recommended Action:</span>
                  <p className="text-xs font-semibold text-slate-800">{item.recommendedAction}</p>
                </div>

                {item.gap > 0 && (
                  <button
                    onClick={() => handleStart(item.roadmapStepId)}
                    className="w-full py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Start Learning ({item.duration})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recommended Learning Path Section */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600" />
              <span>Recommended Learning Path:</span>
            </h4>
            <button
              onClick={() => onNavigate("roadmap")}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              View Full Roadmap →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {skillGaps.filter((g) => g.gap > 0).slice(0, 3).map((gap, idx) => (
              <div
                key={idx}
                onClick={() => handleStart(gap.roadmapStepId)}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/50 hover:border-blue-300 transition cursor-pointer flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{gap.name}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                    {gap.duration}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {gap.recommendedAction}
                </p>
                <span className="text-[11px] font-bold text-blue-600 flex items-center gap-1 pt-1">
                  <span>Start Module</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Roadmap modules are ordered strictly by gap priority and industry hiring demand.
          </span>
          <button
            onClick={() => onNavigate("roadmap")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition w-full sm:w-auto cursor-pointer"
          >
            <span>View Full Roadmap</span>
            <Compass className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
