import React, { useState } from "react";
import { Search, MapPin, Clock, Building2, SlidersHorizontal, CheckCircle2, Filter, X } from "lucide-react";

export default function InternshipOpportunities({ onNavigate }) {
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const opportunities = [
    {
      id: 1,
      role: "Data Analyst Intern",
      company: "ABC Technologies",
      location: "Remote",
      duration: "3 Months",
      tags: ["Python", "SQL", "Power BI", "Excel"],
      match: "88%",
      logoBg: "bg-blue-600 text-white",
      isRemote: true,
    },
    {
      id: 2,
      role: "ML Research Intern",
      company: "InnovateAI Labs",
      location: "On-site (Bangalore)",
      duration: "6 Months",
      tags: ["Python", "Machine Learning", "Research"],
      match: "82%",
      logoBg: "bg-purple-600 text-white",
      isRemote: false,
    },
    {
      id: 3,
      role: "Business Analyst Intern",
      company: "TechCorp",
      location: "Hybrid (Mumbai)",
      duration: "3 Months",
      tags: ["Excel", "SQL", "Communication"],
      match: "78%",
      logoBg: "bg-emerald-600 text-white",
      isRemote: false,
    },
  ];

  const handleApply = (id) => {
    setAppliedJobs((prev) => ({ ...prev, [id]: true }));
  };

  const filtered = remoteOnly
    ? opportunities.filter((opp) => opp.isRemote)
    : opportunities;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Internship & Placement</h2>
        <p className="text-xs text-slate-500 mt-1">
          Explore curated opportunities matched to your verified SkillBridge profile.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search internships, roles, companies..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
            />
          </div>

          {/* Mobile Filter Toggle Button (< md) */}
          <button
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
            className={`flex md:hidden items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition cursor-pointer shrink-0 min-h-[38px] ${
              mobileFiltersOpen || remoteOnly
                ? "bg-blue-50 border-blue-300 text-blue-700"
                : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {remoteOnly && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            )}
          </button>

          {/* Desktop Filter Dropdowns (>= md) */}
          <div className="hidden md:flex items-center gap-2.5">
            <select className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
              <option>Type (All)</option>
              <option>Full-time Intern</option>
              <option>Part-time</option>
              <option>Project-based</option>
            </select>

            <select className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
              <option>Location (All)</option>
              <option>Bangalore</option>
              <option>Mumbai</option>
              <option>Delhi NCR</option>
              <option>Hyderabad</option>
            </select>

            <select className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
              <option>Skills (All)</option>
              <option>Python</option>
              <option>SQL</option>
              <option>Machine Learning</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-600 px-2 py-1.5 bg-slate-50 rounded-lg border border-slate-200">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded"
              />
              <span>Remote Only</span>
            </label>
          </div>
        </div>

        {/* Mobile Collapsible Filter Panel (< md) */}
        {mobileFiltersOpen && (
          <div className="md:hidden pt-3 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Opportunity Type</label>
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
                  <option>Type (All)</option>
                  <option>Full-time Intern</option>
                  <option>Part-time</option>
                  <option>Project-based</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Location</label>
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
                  <option>Location (All)</option>
                  <option>Bangalore</option>
                  <option>Mumbai</option>
                  <option>Delhi NCR</option>
                  <option>Hyderabad</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 mb-1">Skill</label>
                <select className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none">
                  <option>Skills (All)</option>
                  <option>Python</option>
                  <option>SQL</option>
                  <option>Machine Learning</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span>Remote Only Internships</span>
              </label>

              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg"
              >
                Close Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Opportunities List */}
      <div className="space-y-3">
        {filtered.map((opp) => (
          <div
            key={opp.id}
            className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Left Content */}
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl ${opp.logoBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                {opp.company.charAt(0)}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{opp.role}</h3>
                </div>
                <p className="text-xs font-semibold text-slate-600">{opp.company}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {opp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {opp.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {opp.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Action */}
            <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end justify-between gap-3 shrink-0 pt-3 md:pt-0 border-t border-slate-100 md:border-none">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 shrink-0">
                Match {opp.match}
              </span>

              <div className="flex items-center gap-2 w-auto">
                <button
                  onClick={() => onNavigate && onNavigate("applications")}
                  className="px-3.5 py-2 min-h-[38px] text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(opp.id)}
                  className={`px-5 py-2 min-h-[38px] text-xs font-semibold rounded-lg transition shadow-xs cursor-pointer ${
                    appliedJobs[opp.id]
                      ? "bg-emerald-600 text-white hover:bg-emerald-700"
                      : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                  }`}
                >
                  {appliedJobs[opp.id] ? "Applied ✓" : "Apply"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
