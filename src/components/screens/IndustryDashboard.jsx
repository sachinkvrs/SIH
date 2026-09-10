import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Users,
  FileCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Filter,
  Star,
  Send,
  MessageSquare
} from "lucide-react";

export default function IndustryDashboard({ onNavigate, activeSection = "industry_dashboard" }) {
  const [currentTab, setCurrentTab] = useState(
    activeSection === "post_jobs"
      ? "post_jobs"
      : activeSection === "candidate_matching"
      ? "candidate_matching"
      : activeSection === "feedback"
      ? "feedback"
      : "overview"
  );

  useEffect(() => {
    if (activeSection === "post_jobs") setCurrentTab("post_jobs");
    else if (activeSection === "candidate_matching") setCurrentTab("candidate_matching");
    else if (activeSection === "feedback") setCurrentTab("feedback");
    else if (activeSection === "industry_dashboard") setCurrentTab("overview");
  }, [activeSection]);

  // Form state for Post Jobs
  const [jobTitle, setJobTitle] = useState("");
  const [jobCategory, setJobCategory] = useState("Internship");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [stipend, setStipend] = useState("");
  const [jobPostedSuccess, setJobPostedSuccess] = useState(false);

  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Active Internships", value: "8", icon: Clock, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Applications Received", value: "156", icon: FileCheck, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Pre-Verified Candidates", value: "24", icon: Sparkles, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  const applications = [
    {
      name: "Rahul Sharma",
      role: "ML Intern",
      match: "92%",
      skills: ["Python", "PyTorch", "FastAPI"],
      status: "Under Review",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Aditi Verma",
      role: "Data Analyst Intern",
      match: "94%",
      skills: ["SQL", "Power BI", "Python", "EDA"],
      status: "Shortlisted",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Sneha Patel",
      role: "Business Analyst",
      match: "78%",
      skills: ["Excel", "Tableau", "Agile"],
      status: "Applied",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
  ];

  const handlePostJobSubmit = (e) => {
    e.preventDefault();
    setJobPostedSuccess(true);
    setTimeout(() => {
      setJobPostedSuccess(false);
      setJobTitle("");
      setRequiredSkills("");
      setStipend("");
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Industry Hiring & Competency Portal
            </h2>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-900/50">
              TechCorp Inc.
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Discover pre-verified engineering talent matched by authenticated SkillBridge competency graphs.
          </p>
        </div>

        <button
          onClick={() => onNavigate("student_dashboard")}
          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer"
        >
          ← Return to Student Portal
        </button>
      </div>

      {/* Internal Navigation Tabs (Phase 2 Requirement) */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-bold">
        <button
          onClick={() => setCurrentTab("overview")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer ${
            currentTab === "overview"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setCurrentTab("post_jobs")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "post_jobs"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post Jobs & Requirements</span>
        </button>
        <button
          onClick={() => setCurrentTab("candidate_matching")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "candidate_matching"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Candidate Matching</span>
        </button>
        <button
          onClick={() => setCurrentTab("feedback")}
          className={`px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
            currentTab === "feedback"
              ? "bg-[#1E60D5] text-white shadow-xs"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Recruiter Feedback</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {currentTab === "overview" && (
        <div className="space-y-6">
          {/* 4 Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#111827] rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white block">{s.value}</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 block">{s.label}</span>
                  </div>
                  <div className={`w-10 h-10 rounded-xl ${s.color} dark:bg-slate-800 dark:border-slate-700 border flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Applications Table */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Recent Applications Received</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Applications submitted with verified Digital Skill Passports</p>
              </div>
              <button
                onClick={() => setCurrentTab("candidate_matching")}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                View Candidate Matching Pipeline →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-3 font-semibold">Candidate Name</th>
                    <th className="pb-3 font-semibold">Applied Role</th>
                    <th className="pb-3 font-semibold">Verified Match</th>
                    <th className="pb-3 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {applications.map((app, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5">
                        <img
                          src={app.avatar}
                          alt={app.name}
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div>
                          <span>{app.name}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 block">{app.skills.join(", ")}</span>
                        </div>
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-300 font-medium">{app.role}</td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold rounded border border-emerald-200 dark:border-emerald-800">
                          {app.match}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-md border ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: POST JOBS & REQUIREMENTS */}
      {currentTab === "post_jobs" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post a New Opportunity</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Specify required competencies to auto-match pre-assessed candidates.
            </p>
          </div>

          {jobPostedSuccess && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Opportunity successfully published to SkillBridge Opportunity Hub!</span>
            </div>
          )}

          <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Role Title</label>
                <input
                  type="text"
                  required
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., Data Analyst Intern or Junior BI Engineer"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Opportunity Type</label>
                <select
                  value={jobCategory}
                  onChange={(e) => setJobCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                >
                  <option value="Internship">Internship (3–6 Months)</option>
                  <option value="Job">Full-Time Job</option>
                  <option value="Startup">Early-Stage Venture Opportunity</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Stipend / Annual Compensation</label>
                <input
                  type="text"
                  required
                  value={stipend}
                  onChange={(e) => setStipend(e.target.value)}
                  placeholder="e.g., ₹25,000 / month or ₹5.0 – 6.5 LPA"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Location & Mode</label>
                <input
                  type="text"
                  defaultValue="Remote / Hybrid (Bangalore)"
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Required Competencies (Comma-separated)</label>
              <input
                type="text"
                required
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                placeholder="e.g., SQL, Python, Power BI, Statistical Modeling"
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer min-h-[42px]"
            >
              Publish Opportunity to Students →
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: CANDIDATE MATCHING */}
      {currentTab === "candidate_matching" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Verified Candidate Pool</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Sorted by verified competency graph alignment</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
              3 High Affinity Candidates
            </span>
          </div>

          <div className="space-y-3">
            {applications.map((cand, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-500 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={cand.avatar}
                    alt={cand.name}
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{cand.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{cand.role} • Apex University</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {cand.skills.map((s, sIdx) => (
                        <span key={sIdx} className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] rounded">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {cand.match} Match
                  </span>
                  <button
                    onClick={() => alert(`Interview invite sent to ${cand.name}`)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Invite for Interview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RECRUITER FEEDBACK */}
      {currentTab === "feedback" && (
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Post-Interview Candidate Feedback</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide structured feedback to help candidates improve curriculum gaps.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Select Candidate</label>
              <select className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-800 dark:text-white">
                <option>Aditi Verma — Data Analyst Intern (Shortlisted)</option>
                <option>Rahul Sharma — ML Intern (Under Review)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Interview Assessment Note</label>
              <textarea
                rows={3}
                defaultValue="Candidate demonstrates exceptional SQL and problem-solving fundamentals. Recommending deep-dive practice on multi-table DAX expressions."
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white"
              />
            </div>

            <button
              onClick={() => alert("Feedback logged into candidate Skill Passport feedback loop!")}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              Submit Feedback to Candidate Loop →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
