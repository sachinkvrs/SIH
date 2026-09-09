import React from "react";
import { CheckCircle2, Circle, Clock, Award, Trophy, ArrowRight } from "lucide-react";

export default function LearningRoadmap({ onNavigate }) {
  const roadmapSteps = [
    {
      title: "SQL Fundamentals",
      duration: "2 weeks • Beginner",
      status: "completed",
      desc: "Basic queries, JOINs, aggregations, filtering and relational concepts.",
    },
    {
      title: "Advanced SQL",
      duration: "3 weeks • Intermediate",
      status: "current",
      desc: "Window functions, CTEs, indexing, stored procedures and performance tuning.",
    },
    {
      title: "Power BI",
      duration: "4 weeks • Intermediate",
      status: "upcoming",
      desc: "Data modeling, DAX expressions, interactive dashboards and visual analytics.",
    },
    {
      title: "Data Analytics Project",
      duration: "4 weeks • Project",
      status: "upcoming",
      desc: "End-to-end industry case study with automated ETL pipelines and reporting.",
    },
    {
      title: "Industry Assessment",
      duration: "1 week • Assessment",
      status: "upcoming",
      desc: "Proctored technical test evaluated by Industry partner mentors.",
    },
    {
      title: "Internship Ready",
      duration: "You're all set!",
      status: "target",
      desc: "Direct interview fast-tracking and verified digital credential issue.",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Learning Roadmap</h2>
        <p className="text-xs text-slate-500 mt-1">
          Structured personalized path designed to bridge your high-priority skill gaps.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
          {roadmapSteps.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";
            const isTarget = step.status === "target";

            return (
              <div key={idx} className="relative group">
                {/* Node Icon */}
                <div
                  className={`absolute -left-6 sm:-left-8 top-0.5 w-6 sm:w-7 h-6 sm:h-7 rounded-full flex items-center justify-center ring-4 ring-white ${
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                      : isTarget
                      ? "bg-amber-500 text-white"
                      : "bg-slate-100 text-slate-400 border border-slate-300"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <div className="w-2 h-2 rounded-full bg-white animate-ping"></div>
                  ) : isTarget ? (
                    <Trophy className="w-3.5 h-3.5" />
                  ) : (
                    <Circle className="w-2.5 h-2.5 fill-slate-300" />
                  )}
                </div>

                {/* Node Content */}
                <div
                  className={`p-4 rounded-xl border transition ${
                    isCurrent
                      ? "bg-blue-50/40 border-blue-200 shadow-xs"
                      : isCompleted
                      ? "bg-slate-50/60 border-slate-200"
                      : "bg-white border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-bold ${
                        isCurrent
                          ? "text-blue-900"
                          : isCompleted
                          ? "text-slate-800"
                          : "text-slate-700"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        isCompleted
                          ? "bg-emerald-100 text-emerald-700"
                          : isCurrent
                          ? "bg-blue-100 text-blue-700"
                          : isTarget
                          ? "bg-amber-100 text-amber-700 font-bold"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{step.desc}</p>

                  {isCurrent && (
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => onNavigate("opportunities")}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition"
                      >
                        Continue Module
                      </button>
                      <span className="text-[11px] text-blue-600 font-medium">
                        Module 4 of 6 in progress
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            Estimated completion: <strong className="text-slate-800">10 Weeks</strong>
          </span>
          <button
            onClick={() => onNavigate("opportunities")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition min-h-[42px] cursor-pointer"
          >
            <span>Explore Matching Internships</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
