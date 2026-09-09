import React, { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SkillAssessment({ onNavigate }) {
  const [selectedOption, setSelectedOption] = useState(3);

  const options = [
    { value: 1, label: "1 - Beginner" },
    { value: 2, label: "2 - Basic" },
    { value: 3, label: "3 - Intermediate" },
    { value: 4, label: "4 - Advanced" },
    { value: 5, label: "5 - Expert" },
  ];

  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        {/* Assessment Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Skill Assessment</h2>
            <p className="text-xs text-slate-500 mt-0.5">Question 3 of 15</p>
          </div>
          <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-1/5 rounded-full"></div>
          </div>
        </div>

        {/* Question Title */}
        <div className="py-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-800">
            How comfortable are you with SQL?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Select the option that best describes your hands-on querying and schema experience.
          </p>
        </div>

        {/* 5 Radio Option Cards */}
        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt.value;
            return (
              <div
                key={opt.value}
                onClick={() => setSelectedOption(opt.value)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/40 shadow-xs ring-1 ring-blue-600/30"
                    : "border-slate-200 hover:border-slate-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-blue-600 bg-blue-600"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      isSelected ? "text-blue-900" : "text-slate-700"
                    }`}
                  >
                    {opt.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-100">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={() => onNavigate("skill_gap")}
            className="flex items-center gap-2 px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <span>Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
