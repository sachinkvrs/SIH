import React, { useState } from "react";
import BrandLogo from "../common/BrandLogo";
import { Sparkles, Users, Award, Calendar, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";

export default function IndustryCollaboration({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("All");

  const filterTabs = ["All", "Mentorship", "Workshops", "Live Projects", "Research", "Challenges"];

  const collaborations = [
    {
      title: "AI Innovation Challenge",
      org: "XYZ Technologies",
      iconBg: "bg-pink-100 text-pink-600",
      tags: ["Python", "Machine Learning", "Generative AI"],
      eligibility: "Open for Students • Faculty • 3 Months",
      btnText: "Register",
    },
    {
      title: "Industry Mentorship Program",
      org: "TechCorp",
      iconBg: "bg-emerald-100 text-emerald-600",
      tags: ["Career Guidance", "Industry Exposure", "Networking"],
      eligibility: "Open for Students • 6 Months",
      btnText: "Apply",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Level 2 Breadcrumb & In-Workspace Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Industry Collaboration</span>
        </div>
        <button
          onClick={() => onNavigate && onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Industry Collaboration
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Bridge industry needs with university research, student challenges, and mentorship.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 overflow-x-auto scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === tab
                ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 shadow-xs"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Two Column Layout: Cards + Promo Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Collaboration Listings */}
        <div className="lg:col-span-8 space-y-4">
          {collaborations.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#111827] rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className={`w-10 h-10 rounded-xl ${item.iconBg} dark:bg-slate-800 flex items-center justify-center shrink-0`}>
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{item.org}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-semibold rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
                    {item.eligibility}
                  </p>
                </div>
              </div>

              <div className="w-full sm:w-auto sm:self-center shrink-0 pt-2 sm:pt-0 border-t sm:border-none border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => alert(`Submitted action for ${item.title}`)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition min-h-[42px] cursor-pointer"
                >
                  {item.btnText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Promotional Branding Card */}
        <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-md flex flex-col justify-between min-h-[220px]">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80"
            alt="Mountain landscape"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-blue-950/70 to-transparent"></div>

          <div className="relative z-10">
            <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">
              Vision & Impact
            </span>
            <h3 className="text-lg font-serif italic text-white mt-1 leading-snug">
              “Skills today.<br />Better tomorrow.”
            </h3>
          </div>

          <div className="relative z-10 pt-6">
            <BrandLogo variant="dark" />
          </div>
        </div>
      </div>
    </div>
  );
}
