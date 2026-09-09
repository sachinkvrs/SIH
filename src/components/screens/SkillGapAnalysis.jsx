import React from "react";
import { AlertTriangle, CheckCircle2, ArrowRight, BookOpen, Compass } from "lucide-react";

export default function SkillGapAnalysis({ onNavigate }) {
  const skillGaps = [
    { name: "Python", current: 85, required: 85, gap: 0, status: "Strong", gapColor: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { name: "SQL", current: 65, required: 80, gap: 15, status: "Needs Improvement", gapColor: "text-rose-600 bg-rose-50 border-rose-200" },
    { name: "Power BI", current: 45, required: 75, gap: 30, status: "Needs Improvement", gapColor: "text-rose-600 bg-rose-50 border-rose-200" },
    { name: "Statistics", current: 70, required: 80, gap: 10, status: "Needs Improvement", gapColor: "text-amber-600 bg-amber-50 border-amber-200" },
    { name: "Machine Learning", current: 72, required: 80, gap: 8, status: "Needs Improvement", gapColor: "text-amber-600 bg-amber-50 border-amber-200" },
  ];

  const recommendations = [
    "Complete SQL course",
    "Build one SQL project",
    "Take SQL assessment",
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Skill Gap Analysis</h2>
        <p className="text-xs text-slate-500 mt-1">Compare your skills with industry requirements</p>
      </div>

      {/* Main Analysis Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-6">
        {/* Desktop Table View (>= md) */}
        <div className="hidden md:block space-y-4">
          <div className="grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-wider pb-3 border-b border-slate-100">
            <div className="col-span-3">Skill</div>
            <div className="col-span-7">You vs Req</div>
            <div className="col-span-2 text-right">Gap</div>
          </div>

          <div className="space-y-4">
            {skillGaps.map((item, idx) => (
              <div key={idx} className="grid grid-cols-12 items-center text-xs">
                {/* Skill Name */}
                <div className="col-span-3 font-semibold text-slate-800">
                  {item.name}
                </div>

                {/* Visual Bars */}
                <div className="col-span-7 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-0.5">
                    <span className="text-blue-600 font-bold">{item.current}%</span>
                    <span>(Req: {item.required}%)</span>
                  </div>
                  {/* Bar */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden relative">
                    {/* Required Target Marker */}
                    <div
                      className="absolute top-0 bottom-0 bg-slate-300 w-0.5 z-10"
                      style={{ left: `${item.required}%` }}
                      title={`Required: ${item.required}%`}
                    ></div>
                    {/* Current Progress */}
                    <div
                      className={`h-full rounded-full ${
                        item.gap === 0
                          ? "bg-emerald-500"
                          : item.gap > 15
                          ? "bg-rose-500"
                          : "bg-amber-500"
                      }`}
                      style={{ width: `${item.current}%` }}
                    ></div>
                  </div>
                </div>

                {/* Gap Badge */}
                <div className="col-span-2 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded-md border ${item.gapColor}`}
                  >
                    {item.gap}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards Stack View (< md) */}
        <div className="block md:hidden space-y-3.5">
          {skillGaps.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{item.name}</span>
                <span className={`px-2 py-0.5 text-xs font-bold rounded-md border ${item.gapColor}`}>
                  {item.gap === 0 ? "0% Gap" : `-${item.gap}% Gap`}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-slate-100 shadow-xs">
                  <span className="text-slate-400 block text-[10.5px]">Current</span>
                  <span className="font-extrabold text-blue-600 text-sm">{item.current}%</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-slate-100 shadow-xs">
                  <span className="text-slate-400 block text-[10.5px]">Required</span>
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

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                <span className="text-slate-500 text-[11px] font-medium">Status</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                    item.status === "Strong"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Priority Alert Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-900">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold">SQL is your highest-priority skill gap for the Data Analyst role.</span>
            <p className="text-[11px] text-amber-800 mt-0.5">
              Bridging this gap will improve your internship match score by +12%.
            </p>
          </div>
        </div>

        {/* Recommended Action Checklist */}
        <div className="pt-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Recommended Action:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendations.map((action, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 hover:bg-blue-50/40 hover:border-blue-200 transition"
              >
                <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 text-[10px]">
                  ✓
                </div>
                <span>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => onNavigate("roadmap")}
            className="flex items-center gap-2 px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <span>View Learning Roadmap</span>
            <Compass className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
