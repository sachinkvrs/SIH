import React, { useState } from "react";
import {
  FolderKanban,
  Search,
  Plus,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Building2,
  Kanban,
  Table as TableIcon,
  X
} from "lucide-react";

export default function Applications({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [sortBy, setSortBy] = useState("latest"); // "latest" or "oldest"
  const [viewMode, setViewMode] = useState("pipeline"); // "pipeline" or "list"
  const [activeModalApp, setActiveModalApp] = useState(null);

  // Top Summary Data strictly matching requirements
  const summary = {
    total: 12,
    underReview: 5,
    shortlisted: 3,
    interview: 2,
    selected: 1,
    rejected: 1,
  };

  // Realistic applications matching user specs
  const applications = [
    {
      id: "app-1",
      company: "TCS",
      position: "Data Analyst Intern",
      appliedDate: "04 Sep 2026",
      appliedTimestamp: 1725408000000,
      deadline: "20 Sep 2026",
      status: "Under Review",
      location: "Remote",
      roleCategory: "Data Analyst",
      nextAction: "HR resume review in progress. Recruiter feedback expected by 12 Sep 2026.",
      history: [
        { stage: "Applied", date: "04 Sep 2026", done: true },
        { stage: "Resume Viewed", date: "06 Sep 2026", done: true },
        { stage: "Under Review", date: "07 Sep 2026", done: true },
        { stage: "Interview", date: "Pending", done: false },
        { stage: "Selection", date: "Pending", done: false },
      ],
      logoBg: "bg-blue-600 text-white"
    },
    {
      id: "app-2",
      company: "Infosys",
      position: "AI/ML Intern",
      appliedDate: "01 Sep 2026",
      appliedTimestamp: 1725148800000,
      deadline: "18 Sep 2026",
      status: "Shortlisted",
      location: "Bangalore",
      roleCategory: "AI/ML",
      nextAction: "Technical Round 1 scheduled for 15 Sep 2026 at 2:00 PM via Google Meet.",
      history: [
        { stage: "Applied", date: "01 Sep 2026", done: true },
        { stage: "Profile Screened", date: "03 Sep 2026", done: true },
        { stage: "Shortlisted", date: "05 Sep 2026", done: true },
        { stage: "Interview Round 1", date: "15 Sep 2026", done: false },
        { stage: "Selection", date: "Pending", done: false },
      ],
      logoBg: "bg-indigo-600 text-white"
    },
    {
      id: "app-3",
      company: "Accenture",
      position: "Software Developer Intern",
      appliedDate: "28 Aug 2026",
      appliedTimestamp: 1724803200000,
      deadline: "10 Sep 2026",
      status: "Interview",
      location: "Hyderabad",
      roleCategory: "Software Developer",
      nextAction: "Technical interview Round 2 on 12 Sep 2026 at 11:00 AM.",
      history: [
        { stage: "Applied", date: "28 Aug 2026", done: true },
        { stage: "Online Assessment", date: "31 Aug 2026", done: true },
        { stage: "Shortlisted", date: "03 Sep 2026", done: true },
        { stage: "Interview Round 1", date: "08 Sep 2026", done: true },
        { stage: "Managerial Round", date: "12 Sep 2026", done: false },
      ],
      logoBg: "bg-purple-600 text-white"
    },
    {
      id: "app-4",
      company: "Wipro",
      position: "Cloud Analytics Intern",
      appliedDate: "22 Aug 2026",
      appliedTimestamp: 1724284800000,
      deadline: "05 Sep 2026",
      status: "Selected",
      location: "Pune (Hybrid)",
      roleCategory: "Cloud Analytics",
      nextAction: "Offer letter generated. Download and return signed copy before 18 Sep 2026.",
      history: [
        { stage: "Applied", date: "22 Aug 2026", done: true },
        { stage: "Assessment", date: "25 Aug 2026", done: true },
        { stage: "Shortlisted", date: "29 Aug 2026", done: true },
        { stage: "Interview", date: "03 Sep 2026", done: true },
        { stage: "Selected & Offered", date: "08 Sep 2026", done: true },
      ],
      logoBg: "bg-emerald-600 text-white"
    },
    {
      id: "app-5",
      company: "Google",
      position: "Software Engineering Intern",
      appliedDate: "15 Aug 2026",
      appliedTimestamp: 1723680000000,
      deadline: "30 Aug 2026",
      status: "Rejected",
      location: "Bangalore",
      roleCategory: "Software Developer",
      nextAction: "Application cycle closed. Eligible to reapply after 6-month cooldown.",
      history: [
        { stage: "Applied", date: "15 Aug 2026", done: true },
        { stage: "OA Screen", date: "18 Aug 2026", done: true },
        { stage: "Closed", date: "25 Aug 2026", done: true },
      ],
      logoBg: "bg-rose-600 text-white"
    },
    {
      id: "app-6",
      company: "Cognizant",
      position: "Business Intelligence Intern",
      appliedDate: "06 Sep 2026",
      appliedTimestamp: 1725580800000,
      deadline: "25 Sep 2026",
      status: "Applied",
      location: "Chennai",
      roleCategory: "Data Analyst",
      nextAction: "Application submitted. Awaiting initial recruiter screening.",
      history: [
        { stage: "Applied", date: "06 Sep 2026", done: true },
        { stage: "Recruiter Review", date: "Pending", done: false },
      ],
      logoBg: "bg-cyan-600 text-white"
    },
    {
      id: "app-7",
      company: "HCLTech",
      position: "Python Backend Intern",
      appliedDate: "03 Sep 2026",
      appliedTimestamp: 1725321600000,
      deadline: "22 Sep 2026",
      status: "Under Review",
      location: "Noida",
      roleCategory: "Software Developer",
      nextAction: "Technical team reviewing portfolio and GitHub repo.",
      history: [
        { stage: "Applied", date: "03 Sep 2026", done: true },
        { stage: "Under Review", date: "05 Sep 2026", done: true },
      ],
      logoBg: "bg-slate-700 text-white"
    },
    {
      id: "app-8",
      company: "Deloitte",
      position: "Risk & Analytics Analyst",
      appliedDate: "29 Aug 2026",
      appliedTimestamp: 1724889600000,
      deadline: "15 Sep 2026",
      status: "Under Review",
      location: "Mumbai",
      roleCategory: "Data Analyst",
      nextAction: "Aptitude score verified. Resume under department review.",
      history: [
        { stage: "Applied", date: "29 Aug 2026", done: true },
        { stage: "Under Review", date: "02 Sep 2026", done: true },
      ],
      logoBg: "bg-green-700 text-white"
    },
    {
      id: "app-9",
      company: "Amazon",
      position: "Applied Scientist Intern",
      appliedDate: "02 Sep 2026",
      appliedTimestamp: 1725235200000,
      deadline: "20 Sep 2026",
      status: "Shortlisted",
      location: "Hyderabad",
      roleCategory: "AI/ML",
      nextAction: "Online coding assessment invitation sent to email.",
      history: [
        { stage: "Applied", date: "02 Sep 2026", done: true },
        { stage: "Shortlisted", date: "06 Sep 2026", done: true },
      ],
      logoBg: "bg-amber-600 text-white"
    },
    {
      id: "app-10",
      company: "TechCorp",
      position: "Associate Data Analyst",
      appliedDate: "30 Aug 2026",
      appliedTimestamp: 1724976000000,
      deadline: "16 Sep 2026",
      status: "Under Review",
      location: "Remote",
      roleCategory: "Data Analyst",
      nextAction: "SkillBridge matched application being evaluated by team lead.",
      history: [
        { stage: "Applied", date: "30 Aug 2026", done: true },
        { stage: "Under Review", date: "04 Sep 2026", done: true },
      ],
      logoBg: "bg-teal-600 text-white"
    },
    {
      id: "app-11",
      company: "InnovateAI Labs",
      position: "Computer Vision Intern",
      appliedDate: "25 Aug 2026",
      appliedTimestamp: 1724544000000,
      deadline: "12 Sep 2026",
      status: "Interview",
      location: "Bangalore",
      roleCategory: "AI/ML",
      nextAction: "Research paper discussion round scheduled for 14 Sep 2026.",
      history: [
        { stage: "Applied", date: "25 Aug 2026", done: true },
        { stage: "Shortlisted", date: "29 Aug 2026", done: true },
        { stage: "Interview", date: "14 Sep 2026", done: false },
      ],
      logoBg: "bg-violet-600 text-white"
    },
    {
      id: "app-12",
      company: "Capgemini",
      position: "Database Engineer Intern",
      appliedDate: "05 Sep 2026",
      appliedTimestamp: 1725494400000,
      deadline: "24 Sep 2026",
      status: "Under Review",
      location: "Pune",
      roleCategory: "Data Analyst",
      nextAction: "Initial credentials verified by campus placement cell.",
      history: [
        { stage: "Applied", date: "05 Sep 2026", done: true },
        { stage: "Under Review", date: "07 Sep 2026", done: true },
      ],
      logoBg: "bg-sky-600 text-white"
    },
  ];

  // Pipeline stages
  const pipelineStages = [
    { key: "Applied", label: "Applied", badgeBg: "bg-blue-100 text-blue-700 border-blue-200" },
    { key: "Under Review", label: "Under Review", badgeBg: "bg-amber-100 text-amber-700 border-amber-200" },
    { key: "Shortlisted", label: "Shortlisted", badgeBg: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { key: "Interview", label: "Interview", badgeBg: "bg-purple-100 text-purple-700 border-purple-200" },
    { key: "Selected", label: "Selected", badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  ];

  // Filter and sort logic
  const filteredApps = applications
    .filter((app) => {
      const matchSearch =
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === "All" || app.status === selectedStatus;
      const matchRole = selectedRole === "All" || app.roleCategory === selectedRole;
      return matchSearch && matchStatus && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return b.appliedTimestamp - a.appliedTimestamp;
      return a.appliedTimestamp - b.appliedTimestamp;
    });

  return (
    <div className="space-y-6">
      {/* Header & Prominent "Find New Opportunities" CTA */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Applications Tracker (ATS)
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
              Active Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Where have I applied and what is the current application status?
          </p>
        </div>

        <button
          onClick={() => onNavigate("opportunities")}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Find New Opportunities</span>
        </button>
      </div>

      {/* Top ATS Summary Status Strip (Strictly user-specified values) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div
          onClick={() => setSelectedStatus("All")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "All" ? "ring-2 ring-blue-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Total Applications</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{summary.total}</span>
          <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">All Submissions</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Under Review")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "Under Review" ? "ring-2 ring-amber-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Under Review</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{summary.underReview}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Screening Stage</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Shortlisted")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "Shortlisted" ? "ring-2 ring-indigo-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Shortlisted</span>
          <span className="text-2xl font-black text-indigo-600 mt-1 block">{summary.shortlisted}</span>
          <span className="text-[10px] text-indigo-600 font-medium mt-0.5 block">Passed Initial</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Interview")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "Interview" ? "ring-2 ring-purple-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Interview</span>
          <span className="text-2xl font-black text-purple-600 mt-1 block">{summary.interview}</span>
          <span className="text-[10px] text-purple-600 font-medium mt-0.5 block">Active Rounds</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Selected")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "Selected" ? "ring-2 ring-emerald-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Selected</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">{summary.selected}</span>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">Offer Extended</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Rejected")}
          className={`p-4 rounded-xl border bg-white shadow-xs cursor-pointer transition ${
            selectedStatus === "Rejected" ? "ring-2 ring-rose-600 border-transparent" : "hover:border-slate-300"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 block">Rejected</span>
          <span className="text-2xl font-black text-rose-600 mt-1 block">{summary.rejected}</span>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Closed</span>
        </div>
      </div>

      {/* Search, Filter by Status, Filter by Role, Sort, and View Switcher Toolbar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications by company or position..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Filter by Role */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="All">All Roles</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="AI/ML">AI/ML</option>
          <option value="Software Developer">Software Developer</option>
          <option value="Cloud Analytics">Cloud Analytics</option>
        </select>

        {/* Sort by Latest/Oldest */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="latest">Latest Applied</option>
            <option value="oldest">Oldest Applied</option>
          </select>
        </div>

        {/* View Mode Toggle: Pipeline vs List */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode("pipeline")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
              viewMode === "pipeline" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Pipeline</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
              viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>
      </div>

      {/* APPLICATION PIPELINE: Applied → Under Review → Shortlisted → Interview → Selected */}
      {viewMode === "pipeline" ? (
        <div className="overflow-x-auto pb-4 max-w-full min-w-0">
          <div className="flex lg:grid lg:grid-cols-5 gap-4 min-w-[960px] lg:min-w-0 items-start">
            {pipelineStages.map((stage) => {
              const stageApps = filteredApps.filter((app) => app.status === stage.key);
              return (
                <div
                  key={stage.key}
                  className="bg-slate-100/70 rounded-2xl p-3.5 border border-slate-200/80 min-h-[440px] flex flex-col w-[260px] lg:w-auto shrink-0"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">{stage.label}</span>
                    <span className="w-5 h-5 rounded-full bg-white text-slate-700 text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Applications inside this stage */}
                  <div className="space-y-3 flex-1">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setActiveModalApp(app)}
                        className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1 mb-1.5">
                            <span className="font-extrabold text-xs text-slate-900 group-hover:text-blue-600 transition">
                              {app.company}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${stage.badgeBg}`}>
                              {app.status}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-800 leading-tight">
                            {app.position}
                          </h4>

                          <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" /> {app.location}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> Deadline: {app.deadline}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                          <span>Applied: {app.appliedDate}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                        </div>
                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div className="py-12 text-center text-slate-400 text-xs italic">
                        No applications in this stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Detailed List / Table View: Responsive Table on Desktop, Cards on Mobile */
        <div>
          {/* Mobile Cards List (< md) */}
          <div className="block md:hidden space-y-3">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{app.company}</h3>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">{app.position}</p>
                  </div>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Applied</span>
                    <span className="font-semibold text-slate-700">{app.appliedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Location</span>
                    <span className="font-semibold text-slate-700">{app.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Deadline</span>
                    <span className="font-semibold text-slate-700">{app.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Match Score</span>
                    <span className="font-bold text-emerald-600">88%</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => setActiveModalApp(app)}
                    className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition text-center cursor-pointer min-h-[38px]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>= md) */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Position</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setActiveModalApp(app)}
                    className="hover:bg-blue-50/40 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">{app.company}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{app.position}</td>
                    <td className="py-3.5 px-4 text-slate-500">{app.appliedDate}</td>
                    <td className="py-3.5 px-4 text-slate-600">{app.location}</td>
                    <td className="py-3.5 px-4 text-slate-500">{app.deadline}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-xs font-semibold text-blue-600 hover:underline">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Application Details Slide-over / Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                  Application Tracking Record
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {activeModalApp.company} • {activeModalApp.position}
                </h3>
                <p className="text-xs text-slate-500">
                  Location: {activeModalApp.location} • Applied: {activeModalApp.appliedDate} • Deadline: {activeModalApp.deadline}
                </p>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Status and Next Action Box */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">Current Status:</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white font-bold rounded text-[11px]">
                  {activeModalApp.status}
                </span>
              </div>
              <p className="text-xs text-blue-900 pt-1">
                <strong>Next Action:</strong> {activeModalApp.nextAction}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Application Progression History
              </h4>
              <div className="space-y-2.5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {activeModalApp.history.map((step, sIdx) => (
                  <div key={sIdx} className="relative flex items-center justify-between text-xs">
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center ${
                        step.done ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {step.done && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <span className={step.done ? "font-semibold text-slate-900" : "text-slate-400"}>
                      {step.stage}
                    </span>
                    <span className="text-[11px] text-slate-400">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModalApp(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveModalApp(null);
                  onNavigate("opportunities");
                }}
                className="px-4 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Browse Similar Roles
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
