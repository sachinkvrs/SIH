import React, { useState, useEffect } from "react";
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
  X,
  ArrowLeft
} from "lucide-react";

export default function Applications({
  onNavigate,
  applicationsList = [],
  focusedAppId = null
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRole, setSelectedRole] = useState("All");
  const [sortBy, setSortBy] = useState("latest"); // "latest" or "oldest"
  const [viewMode, setViewMode] = useState("pipeline"); // "pipeline" or "list"
  const [activeModalApp, setActiveModalApp] = useState(null);

  // Use centralized cross-domain applications from App.jsx state
  const allApplications = applicationsList;

  // Auto-focus matching application when navigated from Communication Center
  useEffect(() => {
    if (focusedAppId) {
      const match = allApplications.find(
        (a) => a.id === focusedAppId || a.id?.toLowerCase() === focusedAppId.toLowerCase()
      );
      if (match) {
        setActiveModalApp(match);
      }
    }
  }, [focusedAppId, allApplications]);

  // Dynamic summary calculation
  const summary = {
    total: allApplications.length,
    underReview: allApplications.filter((a) => a.status === "Under Review").length,
    shortlisted: allApplications.filter((a) => a.status === "Shortlisted").length,
    interview: allApplications.filter((a) => a.status === "Interview").length,
    selected: allApplications.filter((a) => a.status === "Selected").length,
    rejected: allApplications.filter((a) => a.status === "Rejected").length,
  };

  // Pipeline stages including Forwarded to Industry and Rejected
  const pipelineStages = [
    { key: "Applied", label: "Applied", badgeBg: "bg-blue-100 text-blue-700 border-blue-200" },
    { key: "Under Review", label: "Under Review", badgeBg: "bg-amber-100 text-amber-700 border-amber-200" },
    { key: "Forwarded to Industry", label: "Endorsed", badgeBg: "bg-cyan-100 text-cyan-700 border-cyan-200" },
    { key: "Shortlisted", label: "Shortlisted", badgeBg: "bg-indigo-100 text-indigo-700 border-indigo-200" },
    { key: "Interview", label: "Interview", badgeBg: "bg-purple-100 text-purple-700 border-purple-200" },
    { key: "Selected", label: "Selected", badgeBg: "bg-emerald-100 text-emerald-700 border-emerald-200" },
    { key: "Rejected", label: "Rejected", badgeBg: "bg-rose-100 text-rose-700 border-rose-200" },
  ];

  // Filter and sort logic
  const filteredApps = allApplications
    .filter((app) => {
      const matchSearch =
        app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = selectedStatus === "All" || app.status === selectedStatus;
      const matchRole =
        selectedRole === "All" ||
        app.roleCategory === selectedRole ||
        (selectedRole === "Software Engineer" && (app.roleCategory === "Software Developer" || app.roleCategory === "Software Engineer")) ||
        (selectedRole === "Software Developer" && (app.roleCategory === "Software Developer" || app.roleCategory === "Software Engineer")) ||
        (selectedRole === "Data Analyst" && (app.roleCategory === "Data Analyst" || app.roleCategory === "Data Science")) ||
        (selectedRole === "Structural Engineer" && (app.roleCategory === "Structural Engineer" || app.roleCategory === "BIM Engineer"));
      return matchSearch && matchStatus && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return b.appliedTimestamp - a.appliedTimestamp;
      return a.appliedTimestamp - b.appliedTimestamp;
    });

  return (
    <div className="space-y-6">
      {/* Level 2 Breadcrumbs & In-Workspace Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Applications Tracker</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header & Prominent "Find New Opportunities" CTA */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Applications Tracker (ATS)
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-900/50">
              Active Pipeline
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
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
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "All" ? "ring-2 ring-blue-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Total Applications</span>
          <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">{summary.total}</span>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-0.5 block">All Submissions</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Under Review")}
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "Under Review" ? "ring-2 ring-amber-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Under Review</span>
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">{summary.underReview}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 block">Screening Stage</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Shortlisted")}
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "Shortlisted" ? "ring-2 ring-indigo-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Shortlisted</span>
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1 block">{summary.shortlisted}</span>
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium mt-0.5 block">Passed Initial</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Interview")}
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "Interview" ? "ring-2 ring-purple-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Interview</span>
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">{summary.interview}</span>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-medium mt-0.5 block">Active Rounds</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Selected")}
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "Selected" ? "ring-2 ring-emerald-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Selected</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">{summary.selected}</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 block">Offer Extended</span>
        </div>

        <div
          onClick={() => setSelectedStatus("Rejected")}
          className={`p-4 rounded-xl border bg-white dark:bg-[#111827] shadow-xs cursor-pointer transition ${
            selectedStatus === "Rejected" ? "ring-2 ring-rose-600 border-transparent" : "border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
          }`}
        >
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Rejected</span>
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1 block">{summary.rejected}</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5 block">Closed</span>
        </div>
      </div>

      {/* Search, Filter by Status, Filter by Role, Sort, and View Switcher Toolbar */}
      <div className="bg-white dark:bg-[#111827] rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search applications by company or position..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white"
          />
        </div>

        {/* Filter by Role */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer max-w-[200px]"
        >
          <option value="All">All Domains &amp; Roles</option>
          <optgroup label="CSE / IT">
            <option value="Data Analyst">Data Analyst</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Software Developer">Software Developer</option>
            <option value="AI/ML Engineer">AI/ML Engineer</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Analyst">Business Analyst</option>
            <option value="Cloud & DevOps">Cloud &amp; DevOps</option>
          </optgroup>
          <optgroup label="ECE">
            <option value="Embedded Systems Engineer">Embedded Systems</option>
            <option value="VLSI / Chip Design Engineer">VLSI / Chip Design</option>
            <option value="IoT Engineer">IoT Engineer</option>
          </optgroup>
          <optgroup label="EEE">
            <option value="Power Systems Engineer">Power Systems</option>
            <option value="Renewable Energy Engineer">Renewable Energy</option>
          </optgroup>
          <optgroup label="Mechanical">
            <option value="Mechanical Design Engineer">Mechanical Design</option>
            <option value="Manufacturing Engineer">Manufacturing</option>
          </optgroup>
          <optgroup label="Civil">
            <option value="Structural Engineer">Structural Engineering</option>
            <option value="BIM Engineer">BIM Engineering</option>
          </optgroup>
          <optgroup label="Finance & Management">
            <option value="Financial Analyst">Financial Analyst</option>
            <option value="Business Analyst">Business Analyst</option>
          </optgroup>
        </select>

        {/* Sort by Latest/Oldest */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="latest">Latest Applied</option>
            <option value="oldest">Oldest Applied</option>
          </select>
        </div>

        {/* View Mode Toggle: Pipeline vs List */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewMode("pipeline")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
              viewMode === "pipeline" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Pipeline</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition cursor-pointer ${
              viewMode === "list" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
                  className="bg-slate-100/70 dark:bg-slate-800/40 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 min-h-[440px] flex flex-col w-[260px] lg:w-auto shrink-0"
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{stage.label}</span>
                    <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold flex items-center justify-center shadow-xs">
                      {stageApps.length}
                    </span>
                  </div>

                  {/* Applications inside this stage */}
                  <div className="space-y-3 flex-1">
                    {stageApps.map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setActiveModalApp(app)}
                        className="bg-white dark:bg-[#111827] p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition cursor-pointer flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-1 mb-1.5">
                            <span className="font-extrabold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                              {app.company}
                            </span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${stage.badgeBg}`}>
                              {app.status}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                            {app.position}
                          </h4>

                          <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 space-y-0.5">
                            <p className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400 dark:text-slate-500" /> {app.location}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" /> Deadline: {app.deadline}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                          <span>Applied: {app.appliedDate}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
                        </div>
                      </div>
                    ))}

                    {stageApps.length === 0 && (
                      <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs italic">
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
                className="bg-white dark:bg-[#111827] rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">{app.company}</h3>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">{app.position}</p>
                  </div>
                  <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shrink-0">
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Applied</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{app.appliedDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Location</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{app.location}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Deadline</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{app.deadline}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 block">Match Score</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {app.matchScore ? `${app.matchScore}%` : "85%"}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setActiveModalApp(app)}
                    className="w-full py-2 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg transition text-center cursor-pointer min-h-[38px]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View (>= md) */}
          <div className="hidden md:block bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
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
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredApps.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => setActiveModalApp(app)}
                    className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{app.company}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">{app.position}</td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{app.appliedDate}</td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{app.location}</td>
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{app.deadline}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveModalApp(app)}
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State for List/Table View */}
          {filteredApps.length === 0 && (
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs text-center max-w-md mx-auto my-6 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <FolderKanban className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  You haven't applied to any opportunities yet
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Browse opportunities matching your career goal and apply with your verified Digital Skill Passport.
                </p>
              </div>
              <button
                onClick={() => onNavigate("opportunities")}
                className="px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
              >
                Explore Opportunities
              </button>
            </div>
          )}
        </div>
      )}

      {/* View Application Details Slide-over / Modal */}
      {activeModalApp && (
        <div className="fixed inset-0 bg-slate-950/40 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#111827] max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                  Application Tracking Record
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                  {activeModalApp.company} • {activeModalApp.position}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Location: {activeModalApp.location} • Applied: {activeModalApp.appliedDate} • Deadline: {activeModalApp.deadline}
                </p>
              </div>
              <button
                onClick={() => setActiveModalApp(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Status and Next Action Box */}
            <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Current Status:</span>
                <span className="px-2 py-0.5 bg-blue-600 text-white font-bold rounded text-[11px]">
                  {activeModalApp.status}
                </span>
              </div>
              <p className="text-xs text-blue-900 dark:text-blue-200 pt-1">
                <strong>Next Action:</strong> {activeModalApp.nextAction}
              </p>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                Application Progression History
              </h4>
              <div className="space-y-2.5 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
                {(activeModalApp.history || []).map((step, sIdx) => (
                  <div key={sIdx} className="relative flex items-start justify-between text-xs gap-2">
                    <div
                      className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                        step.done ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {step.done && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <div>
                      <span className={step.done ? "font-semibold text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-500"}>
                        {step.stage}
                      </span>
                      {step.actor && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-1.5 font-medium">
                          by {step.actor}
                        </span>
                      )}
                      {step.note && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                          {step.note}
                        </p>
                      )}
                    </div>
                    <span className="text-[10.5px] text-slate-400 dark:text-slate-500 shrink-0 font-medium">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Structured Recruiter & Institution Feedback Section */}
            {activeModalApp.feedback && activeModalApp.feedback.length > 0 && (
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Recruiter & Institution Feedback</span>
                </h4>
                <div className="space-y-2">
                  {activeModalApp.feedback.map((fb, fbIdx) => (
                    <div
                      key={fb.id || fbIdx}
                      className="p-3 bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-purple-900 dark:text-purple-300">
                          {fb.authorName || "Hiring Team"} • {fb.category || "Evaluation"}
                        </span>
                        <span className="text-[10.5px] text-purple-600 dark:text-purple-400">{fb.timestamp || "Recent"}</span>
                      </div>
                      <p className="text-xs text-purple-950 dark:text-purple-200 leading-relaxed">
                        "{fb.message}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModalApp(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold cursor-pointer"
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
