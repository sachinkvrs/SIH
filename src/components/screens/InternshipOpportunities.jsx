import React, { useState } from "react";
import { Search, MapPin, Clock, Building2, SlidersHorizontal, CheckCircle2 } from "lucide-react";

export default function InternshipOpportunities({ onNavigate }) {
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState({});

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
    ? opportunities.filter((o) => o.isRemote)
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
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Dropdowns */}
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

        {/* Remote Toggle */}
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-600 px-2 py-1 bg-slate-50 rounded-lg border border-slate-200">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            className="w-3.5 h-3.5 text-blue-600 rounded"
          />
          <span>Remote Only</span>
        </label>
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
            <div className="flex md:flex-col items-center md:items-end justify-between gap-3 shrink-0">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                Match {opp.match}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigate && onNavigate("applications")}
                  className="px-3.5 py-2 text-xs font-semibold rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleApply(opp.id)}
                  className={`px-5 py-2 text-xs font-semibold rounded-lg transition shadow-xs ${
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
