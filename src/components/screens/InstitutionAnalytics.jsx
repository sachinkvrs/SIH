import React from "react";
import { Users, TrendingUp, Briefcase, GraduationCap } from "lucide-react";

export default function InstitutionAnalytics() {
  const kpis = [
    { label: "Total Students", value: "1,240", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Average Readiness", value: "78%", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Internship Participation", value: "320", icon: Briefcase, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Placement Rate", value: "85%", icon: GraduationCap, color: "text-cyan-600 bg-cyan-50 border-cyan-100" },
  ];

  const demandedSkills = [
    { name: "Python", percentage: 92 },
    { name: "SQL", percentage: 86 },
    { name: "AI/ML", percentage: 84 },
    { name: "Cloud", percentage: 78 },
    { name: "Cybersecurity", percentage: 72 },
  ];

  const gapComparison = [
    { skill: "Python", curriculum: 80, industry: 92 },
    { skill: "SQL", curriculum: 65, industry: 86 },
    { skill: "Cloud", curriculum: 45, industry: 78 },
    { skill: "AI/ML", curriculum: 55, industry: 84 },
    { skill: "Security", curriculum: 40, industry: 72 },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Institution Analytics
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Overall student readiness and industry alignment
        </p>
      </div>

      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold text-slate-900 block">{kpi.value}</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5 block">{kpi.label}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${kpi.color} border flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Most Demanded Skills Horizontal Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Most Demanded Skills</h3>
          </div>

          <div className="space-y-3.5 pt-2">
            {demandedSkills.map((skill, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>{skill.name}</span>
                  <span className="text-blue-600 font-bold">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${skill.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum vs Industry Gap Grouped Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Curriculum vs Industry Gap</h3>
            {/* Legend */}
            <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-300 rounded-sm"></span> Curriculum Coverage
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-sm"></span> Industry Demand
              </span>
            </div>
          </div>

          {/* Grouped SVG/Flex Bar Visualizer */}
          <div className="pt-4 flex items-end justify-between h-48 px-2 border-b border-slate-100">
            {gapComparison.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <div className="flex items-end gap-1 h-36">
                  {/* Curriculum Bar */}
                  <div
                    className="w-4 sm:w-5 bg-blue-300 rounded-t-sm transition-all group-hover:opacity-80"
                    style={{ height: `${(item.curriculum / 100) * 140}px` }}
                    title={`Curriculum: ${item.curriculum}%`}
                  ></div>
                  {/* Industry Bar */}
                  <div
                    className="w-4 sm:w-5 bg-blue-600 rounded-t-sm transition-all group-hover:opacity-80"
                    style={{ height: `${(item.industry / 100) * 140}px` }}
                    title={`Industry: ${item.industry}%`}
                  ></div>
                </div>
                <span className="text-[11px] font-semibold text-slate-600 mt-1">
                  {item.skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
