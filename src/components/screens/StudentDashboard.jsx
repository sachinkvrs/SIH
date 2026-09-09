import React from "react";
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
  FileText
} from "lucide-react";

export default function StudentDashboard({ onNavigate }) {
  const topMetrics = [
    {
      title: "Career Readiness",
      value: "82%",
      subtitle: "+5% from last month",
      subColor: "text-emerald-600 font-bold",
      icon: TrendingUp,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      title: "Skills Verified",
      value: "12",
      subtitle: "+2 new skills",
      subColor: "text-purple-600 font-semibold",
      icon: Award,
      iconBg: "bg-purple-50 text-purple-600 border border-purple-100",
      onClick: () => onNavigate("skill_passport")
    },
    {
      title: "Skill Gaps",
      value: "4",
      subtitle: "Focus on improvements",
      subColor: "text-rose-600 font-semibold",
      icon: AlertCircle,
      iconBg: "bg-rose-50 text-rose-600 border border-rose-100",
      onClick: () => onNavigate("skill_gap")
    },
    {
      title: "Internship Matches",
      value: "8",
      subtitle: "Based on your profile",
      subColor: "text-blue-600 font-semibold",
      icon: Briefcase,
      iconBg: "bg-blue-50 text-blue-600 border border-blue-100",
      onClick: () => onNavigate("opportunities")
    },
  ];

  const topSkills = [
    { name: "Python", percentage: 85 },
    { name: "SQL", percentage: 65 },
    { name: "Machine Learning", percentage: 72 },
    { name: "JavaScript", percentage: 78 },
    { name: "Communication", percentage: 80 },
  ];

  const upcomingOpportunities = [
    {
      role: "Data Analyst Intern",
      company: "ABC Technologies",
      location: "Remote",
      duration: "3 Months",
      match: "88%",
    },
    {
      role: "ML Research Intern",
      company: "InnovateAI Labs",
      location: "On-site",
      duration: "6 Months",
      match: "82%",
    },
    {
      role: "Business Analyst Intern",
      company: "TechCorp",
      location: "Hybrid",
      duration: "3 Months",
      match: "78%",
    },
  ];

  const recommendations = [
    {
      title: "SQL for Data Analysis",
      type: "Course",
      rating: "4.5",
      duration: "4 weeks",
      btnText: "Start Learning",
      action: () => onNavigate("roadmap"),
      iconBg: "bg-blue-600 text-white",
    },
    {
      title: "Data Analytics Project",
      type: "Guided Project",
      rating: "4.7",
      duration: "4 weeks",
      btnText: "View Project",
      action: () => onNavigate("roadmap"),
      iconBg: "bg-amber-500 text-white",
    },
    {
      title: "Power BI Fundamentals",
      type: "Microsoft Learn",
      rating: "4.6",
      duration: "4 weeks",
      btnText: "Start Learning",
      action: () => onNavigate("roadmap"),
      iconBg: "bg-orange-500 text-white",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Greeting Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Welcome back, Sachin! <span className="inline-block animate-bounce">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep learning, keep growing. You're <span className="font-semibold text-blue-600">82%</span> industry ready!
          </p>
        </div>

        {/* Quick Action Buttons */}
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
                metric.onClick ? "cursor-pointer hover:border-blue-300 transition" : ""
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

      {/* Middle Row (3-Column Layout from Reference Image) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Col 1: Your Readiness Score */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between text-center">
          <div className="w-full text-left">
            <h3 className="text-sm font-bold text-slate-900">Your Readiness Score</h3>
            <p className="text-[11px] text-slate-500">Target Role: <strong className="text-slate-700">Data Analyst</strong></p>
          </div>

          <div className="relative my-4 flex items-center justify-center">
            {/* SVG Circular Progress Gauge */}
            <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#E2E8F0"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="48"
                stroke="#2563EB"
                strokeWidth="10"
                strokeDasharray="301.6"
                strokeDashoffset={301.6 * (1 - 0.82)}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-slate-900 leading-none">82%</span>
            </div>
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
              Industry Ready
            </span>
            <p className="text-[11px] text-slate-500 mt-2 font-medium">
              You are on the right track!
            </p>
          </div>
        </div>

        {/* Col 2: Top Skills */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Top Skills</h3>
              <button
                onClick={() => onNavigate("my_skills")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3.5">
              {topSkills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>{skill.name}</span>
                    <span className="text-slate-500 font-bold">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Overall Competency</span>
            <strong className="text-blue-600">78% Verified</strong>
          </div>
        </div>

        {/* Col 3: Upcoming Opportunities */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Upcoming Opportunities</h3>
              <button
                onClick={() => onNavigate("opportunities")}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {upcomingOpportunities.map((opp, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-50/80 hover:bg-blue-50/40 rounded-xl border border-slate-100 transition flex items-center justify-between"
                >
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-900">{opp.role}</h4>
                    <p className="text-[11px] text-slate-600 font-medium">{opp.company}</p>
                    <span className="text-[10px] text-slate-400 block">{opp.location} • {opp.duration}</span>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">
                      Match {opp.match}
                    </span>
                    <button
                      onClick={() => onNavigate("opportunities")}
                      className="px-2.5 py-1 bg-[#1E60D5] hover:bg-blue-700 text-white text-[10px] font-semibold rounded-md transition cursor-pointer"
                    >
                      Quick Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: RECOMMENDATIONS FOR YOU */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3">Recommendations for You</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 flex flex-col justify-between"
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg ${rec.iconBg} flex items-center justify-center shrink-0 font-bold text-xs`}>
                  {idx === 0 ? <BookOpen className="w-4 h-4" /> : idx === 1 ? <FolderKanban className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                  <p className="text-[11px] text-slate-500">{rec.type}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                    <span className="flex items-center text-amber-500 font-medium">
                      ★ {rec.rating}
                    </span>
                    <span>•</span>
                    <span>{rec.duration}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60">
                <button
                  onClick={rec.action}
                  className="w-full py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                >
                  {rec.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
