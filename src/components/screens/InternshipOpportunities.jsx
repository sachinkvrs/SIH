import React, { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Building2,
  SlidersHorizontal,
  CheckCircle2,
  Filter,
  X,
  Sparkles,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Zap,
  Info,
  ExternalLink,
  Briefcase,
  Rocket,
  Landmark,
  FileCheck,
  Upload,
  Award,
  ChevronRight,
  Check
} from "lucide-react";

export default function InternshipOpportunities({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData,
  profileData = {
    fullName: "Sachin",
    email: "sachin.cs@example.edu.in",
    phone: "+91 98765 43210",
    college: "Indian Institute of Technology / Apex Engineering University",
    course: "B.Tech CSE"
  },
  appliedApplications = [],
  onApplyOpportunity
}) {
  const [selectedTab, setSelectedTab] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalOpp, setActiveModalOpp] = useState(null);
  const [applyModalOpp, setApplyModalOpp] = useState(null);
  const [applyStep, setApplyStep] = useState(1);
  const [localApplied, setLocalApplied] = useState({});

  // Application Modal Form State
  const [applicantName, setApplicantName] = useState(profileData?.fullName || "Sachin");
  const [applicantEmail, setApplicantEmail] = useState(profileData?.email || "sachin.cs@example.edu.in");
  const [applicantPhone, setApplicantPhone] = useState(profileData?.phone || "+91 98765 43210");
  const [resumeType, setResumeType] = useState("passport"); // "passport" | "upload"
  const [portfolioLink, setPortfolioLink] = useState("https://github.com/sachin-portfolio");
  const [coverNote, setCoverNote] = useState("Passionate about leveraging verified SQL & analytics skills to drive business intelligence.");
  const [attachPassport, setAttachPassport] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppDetails, setSubmittedAppDetails] = useState(null);

  const rawOpportunities = careerData?.opportunities || [];

  // Categorized opportunities ensuring All 4 Types are represented (Phase 13)
  const defaultOpportunities = [
    {
      id: "opp-intern-1",
      category: "Internship",
      role: `${careerGoal} Intern`,
      company: "ABC Technologies",
      location: "Remote",
      duration: "3 Months",
      stipend: "₹25,000 / month",
      experience: "College Students / Freshers",
      source: "LinkedIn",
      deadline: "15 Oct 2026",
      matchPercentage: 88,
      potentialMatchPercentage: 94,
      logoBg: "bg-blue-600 text-white",
      tags: ["Python", "SQL", "Power BI", "Excel"],
      matchingSkills: [
        { skill: "Python", studentScore: 85, requiredScore: 75, status: "Met" },
        { skill: "SQL", studentScore: 65, requiredScore: 70, status: "Near Target" },
        { skill: "Excel", studentScore: 80, requiredScore: 70, status: "Met" },
        { skill: "Communication", studentScore: 80, requiredScore: 75, status: "Met" }
      ],
      missingSkills: [
        { skill: "Power BI", studentScore: 45, requiredScore: 70, gap: 25, impact: "+6% match boost" }
      ],
      recommendation: "Complete the Power BI module in your roadmap to increase this match to 94%."
    },
    {
      id: "opp-job-1",
      category: "Job",
      role: `Junior ${careerGoal}`,
      company: "TechCorp Global Solutions",
      location: "Hybrid (Bangalore)",
      duration: "Full-Time",
      stipend: "₹4.5 – 6.0 LPA",
      experience: "0–1 Years Experience",
      source: "Naukri",
      deadline: "22 Oct 2026",
      matchPercentage: 80,
      potentialMatchPercentage: 90,
      logoBg: "bg-emerald-600 text-white",
      tags: ["SQL", "Tableau", "Statistics", "Reporting"],
      matchingSkills: [
        { skill: "SQL", studentScore: 65, requiredScore: 65, status: "Met" },
        { skill: "Statistics", studentScore: 70, requiredScore: 70, status: "Met" },
        { skill: "Communication", studentScore: 80, requiredScore: 70, status: "Met" }
      ],
      missingSkills: [
        { skill: "Tableau", studentScore: 40, requiredScore: 65, gap: 25, impact: "+10% match boost" }
      ],
      recommendation: "Add Tableau data storytelling project from your recommendations tab."
    },
    {
      id: "opp-start-1",
      category: "Startup",
      role: `Founding ${careerGoal} Intern`,
      company: "NeuralPulse AI (YC W25)",
      location: "Bangalore / Remote",
      duration: "4 Months (PPO Offered)",
      stipend: "₹30,000 / month + Equity",
      experience: "Early-Stage Venture",
      source: "Wellfound",
      deadline: "10 Oct 2026",
      matchPercentage: 92,
      potentialMatchPercentage: 96,
      logoBg: "bg-purple-600 text-white",
      tags: ["Python", "SQL", "FastAPI", "Pandas"],
      matchingSkills: [
        { skill: "Python", studentScore: 85, requiredScore: 80, status: "Met" },
        { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" },
        { skill: "Problem Solving", studentScore: 80, requiredScore: 75, status: "Met" }
      ],
      missingSkills: [
        { skill: "FastAPI / Microservices", studentScore: 50, requiredScore: 65, gap: 15, impact: "+4% match boost" }
      ],
      recommendation: "Early-stage venture opportunity with direct CTO mentorship and high equity upside."
    },
    {
      id: "opp-gov-1",
      category: "Government",
      role: "Young Professional / Technical Research Analyst",
      company: "National Informatics Centre (NIC) & NITI Aayog",
      location: "New Delhi / Hybrid",
      duration: "1 Year Contract (Renewable)",
      stipend: "₹60,000 / month consolidated",
      experience: "B.Tech / MCA with min 60% aggregate",
      source: "Official Government Portal",
      deadline: "30 Nov 2026",
      isDemoGov: true,
      matchPercentage: 84,
      potentialMatchPercentage: 92,
      logoBg: "bg-amber-600 text-white",
      tags: ["Public Policy Analytics", "SQL", "Excel", "Data Governance"],
      matchingSkills: [
        { skill: "SQL", studentScore: 65, requiredScore: 60, status: "Met" },
        { skill: "Excel", studentScore: 80, requiredScore: 75, status: "Met" },
        { skill: "Communication", studentScore: 80, requiredScore: 75, status: "Met" }
      ],
      missingSkills: [
        { skill: "Government Schema Standards", studentScore: 40, requiredScore: 60, gap: 20, impact: "+8% match boost" }
      ],
      recommendation: "Demo opportunity modeled after official government Young Professional recruitment guidelines."
    }
  ];

  // Merge opportunities prioritizing careerData if already enriched
  const opportunities = rawOpportunities.length >= 4 ? rawOpportunities : defaultOpportunities;

  const isApplied = (opp) => {
    return (
      localApplied[opp.id] ||
      appliedApplications.some(
        (a) => a.company === opp.company && (a.position === opp.role || a.role === opp.role)
      )
    );
  };

  // Filter tabs definition with dynamic counts
  const filterTabs = [
    { id: "All", label: "All Opportunities", icon: Briefcase, count: opportunities.length },
    { id: "Internship", label: "Internships", icon: Clock, count: opportunities.filter((o) => (o.category || "Internship") === "Internship").length },
    { id: "Job", label: "Job Openings", icon: Building2, count: opportunities.filter((o) => o.category === "Job").length },
    { id: "Startup", label: "Startup Opportunities", icon: Rocket, count: opportunities.filter((o) => o.category === "Startup").length },
    { id: "Government", label: "Government Jobs", icon: Landmark, count: opportunities.filter((o) => o.category === "Government").length }
  ];

  const filtered = opportunities.filter((opp) => {
    const oppCat = opp.category || "Internship";
    if (selectedTab !== "All" && oppCat !== selectedTab) return false;
    if (remoteOnly && !opp.location.toLowerCase().includes("remote")) return false;
    if (
      searchQuery &&
      !opp.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !opp.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  // Open the 5-step Application Flow Modal
  const handleOpenApply = (opp) => {
    setApplyModalOpp(opp);
    setApplyStep(1);
    setSubmittedAppDetails(null);
  };

  // Submit Final Application
  const handleFinalSubmitApplication = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const appRecord = {
        id: `app-${Date.now()}`,
        company: applyModalOpp.company,
        position: applyModalOpp.role,
        role: applyModalOpp.role,
        appliedDate: "Today",
        status: "Applied",
        statusColor: "bg-blue-50 text-blue-700 border-blue-200",
        match: `${applyModalOpp.matchPercentage}%`,
        location: applyModalOpp.location,
        salary: applyModalOpp.stipend,
        type: applyModalOpp.duration || "Internship",
        source: applyModalOpp.source || "SkillBridge Verified",
        timeline: [
          { status: "Applied", date: "Today", note: "Application submitted with verified Skill Passport credential." },
          { status: "Under Review", date: "Pending", note: "Awaiting recruiter portfolio screening." }
        ]
      };

      setLocalApplied((prev) => ({ ...prev, [applyModalOpp.id]: true }));
      setSubmittedAppDetails(appRecord);
      setApplyStep(5); // Success step

      if (onApplyOpportunity) {
        onApplyOpportunity(appRecord);
      }
    }, 600);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-8">
      {/* Level 2 Breadcrumb & In-Workspace Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Opportunities Hub</span>
          <span>›</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{selectedTab}</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Opportunities & Internship Intelligence
            </h1>
            <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
              Role: {careerGoal}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Separated, explainable hiring opportunities matched against your verified SkillBridge competency graph.
          </p>
        </div>

        <button
          onClick={() => onNavigate("applications")}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition self-start sm:self-auto cursor-pointer"
        >
          <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>View Applications Tracker →</span>
        </button>
      </div>

      {/* Phase 13: 4 Separated Categories Navigation Bar (All / Internships / Jobs / Startups / Government) */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-2 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {filterTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#1E60D5] text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400 dark:text-slate-500"}`} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${careerGoal} roles, companies (ABC, TechCorp, NIC), or skills...`}
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700 dark:text-slate-300 self-start sm:self-auto px-1">
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(e) => setRemoteOnly(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span>Remote Roles Only</span>
        </label>
      </div>

      {/* Opportunities Grid / List with Explainable Matching */}
      <div className="space-y-4">
        {filtered.map((opp) => {
          const applied = isApplied(opp);
          const isGov = opp.category === "Government" || opp.isDemoGov;

          return (
            <div
              key={opp.id}
              className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className={`w-11 h-11 rounded-xl ${opp.logoBg || "bg-blue-600 text-white"} flex items-center justify-center font-black text-sm shrink-0 shadow-xs`}>
                    {opp.company.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{opp.role}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {opp.category || "Internship"}
                      </span>
                      {isGov && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          Demo Govt Opportunity
                        </span>
                      )}
                    </div>

                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-0.5">
                      {opp.company} • <span className="text-slate-500 dark:text-slate-400">{opp.location}</span>
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{opp.duration}</span>
                      </span>
                      <span>•</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{opp.stipend}</span>
                      <span>•</span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">Source: <strong className="text-slate-600 dark:text-slate-300">{opp.source || "LinkedIn"}</strong></span>
                      <span>•</span>
                      <span className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">Deadline: {opp.deadline || "Open"}</span>
                    </div>
                  </div>
                </div>

                {/* Match Affinity Badge */}
                <div className="sm:text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-black rounded-lg border border-emerald-200 dark:border-emerald-800">
                    {opp.matchPercentage}% Match
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5 font-medium">
                    → {opp.potentialMatchPercentage}% after roadmap
                  </span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {opp.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Explainable "Why This Match?" Preview */}
              <div className="p-3 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/70 text-xs space-y-2">
                <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Why you match:</span>
                  {opp.matchingSkills?.slice(0, 3).map((m, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold rounded border border-emerald-200 dark:border-emerald-800"
                    >
                      ✓ {m.skill} ({m.studentScore}%)
                    </span>
                  ))}
                  {opp.missingSkills?.length > 0 && (
                    <span className="px-2 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-semibold rounded border border-rose-200 dark:border-rose-800">
                      ⚠ {opp.missingSkills[0].skill} gap (-{opp.missingSkills[0].gap}%)
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11.5px] text-slate-500 dark:text-slate-400 pt-0.5">
                  <span className="line-clamp-1">{opp.recommendation}</span>
                  <button
                    onClick={() => setActiveModalOpp(opp)}
                    className="text-blue-600 dark:text-blue-400 font-bold hover:underline shrink-0 ml-2 cursor-pointer flex items-center gap-0.5"
                  >
                    <span>View Match Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => setActiveModalOpp(opp)}
                  className="font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer"
                >
                  Inspect Competency Requirements →
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenApply(opp)}
                    disabled={applied}
                    className={`px-5 py-2 rounded-xl font-bold text-xs shadow-xs transition cursor-pointer min-h-[38px] flex items-center gap-1.5 ${
                      applied
                        ? "bg-emerald-600 text-white cursor-default"
                        : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                    }`}
                  >
                    {applied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied ✓</span>
                      </>
                    ) : (
                      <>
                        <span>Apply with Passport</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-10 text-center border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No opportunities found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              We couldn't find matches for "{searchQuery}" in {selectedTab}. Try clearing search filters or explore all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTab("All");
                setRemoteOnly(false);
              }}
              className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* MODAL 1: EXPLAINABLE MATCH BREAKDOWN MODAL (Phase 15) */}
      {activeModalOpp && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalOpp(null)}
        >
          <div
            className="bg-white dark:bg-[#111827] rounded-2xl max-w-xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 rounded-full uppercase tracking-wider">
                  SkillBridge Competency Analysis
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  Why you match: {activeModalOpp.role}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{activeModalOpp.company} • {activeModalOpp.location}</p>
              </div>
              <button
                onClick={() => setActiveModalOpp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score & Potential Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">Current Profile Match</span>
                <span className="text-2xl font-black text-blue-700 dark:text-blue-400">{activeModalOpp.matchPercentage}%</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block">Potential After Roadmap</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{activeModalOpp.potentialMatchPercentage}%</span>
              </div>
            </div>

            {/* Matching Skills */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Matching Verified Skills (Met Hiring Thresholds)</span>
              </h4>
              <div className="space-y-2">
                {activeModalOpp.matchingSkills?.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{m.skill}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 dark:text-slate-400">Your Score: <strong className="text-slate-800 dark:text-slate-200">{m.studentScore}%</strong></span>
                      <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold rounded text-[10.5px]">✓ {m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Missing Skills / Gaps */}
            {activeModalOpp.missingSkills?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Target Competency Gaps (Improvement Opportunities)</span>
                </h4>
                <div className="space-y-2">
                  {activeModalOpp.missingSkills.map((gap, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-800/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white block">{gap.skill}</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Impact: <strong className="text-emerald-700 dark:text-emerald-300">{gap.impact}</strong></span>
                      </div>
                      <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-bold rounded text-[10.5px]">{gap.gap}% Gap</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Recommendation */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>SkillBridge Recommendation:</span>
              </span>
              <p className="leading-relaxed text-[11.5px]">{activeModalOpp.recommendation}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setActiveModalOpp(null);
                  onNavigate("roadmap");
                }}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Go to Learning Roadmap →
              </button>

              <button
                onClick={() => {
                  const target = activeModalOpp;
                  setActiveModalOpp(null);
                  handleOpenApply(target);
                }}
                disabled={isApplied(activeModalOpp)}
                className={`px-5 py-2 text-xs font-bold rounded-xl shadow-xs transition cursor-pointer ${
                  isApplied(activeModalOpp)
                    ? "bg-emerald-600 text-white"
                    : "bg-[#1E60D5] hover:bg-blue-700 text-white"
                }`}
              >
                {isApplied(activeModalOpp) ? "Applied ✓" : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: 5-STEP STRUCTURED APPLICATION WORKFLOW MODAL (Phase 16) */}
      {applyModalOpp && (
        <div
          className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => {
            if (applyStep === 5) setApplyModalOpp(null);
          }}
        >
          <div
            className="bg-white dark:bg-[#111827] rounded-2xl max-w-xl w-full p-6 space-y-5 border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 rounded-full uppercase tracking-wider">
                  Official Application Portal
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white mt-1">
                  Apply for {applyModalOpp.role}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{applyModalOpp.company} • {applyModalOpp.stipend}</p>
              </div>
              <button
                onClick={() => setApplyModalOpp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 5-Step Progress Indicator (Level 3 Workflow Navigation) */}
            {applyStep < 5 && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                  <span className={applyStep >= 1 ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}>1. Profile</span>
                  <span>›</span>
                  <span className={applyStep >= 2 ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}>2. Resume</span>
                  <span>›</span>
                  <span className={applyStep >= 3 ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}>3. Skills</span>
                  <span>›</span>
                  <span className={applyStep >= 4 ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500"}>4. Review</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(applyStep / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* STEP 1: Personal & Academic Profile */}
            {applyStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900/50 text-blue-950 dark:text-blue-200 leading-relaxed">
                  Confirm your verified student profile information for the recruiter screening queue.
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">University Email</label>
                      <input
                        type="email"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Degree & Major</label>
                    <input
                      type="text"
                      disabled
                      value={`${profileData?.course || "B.Tech Computer Science"} • Final Year (2026 Batch)`}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setApplyModalOpp(null)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Resume & Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Resume & Portfolio */}
            {applyStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">Resume Submission Method</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => setResumeType("passport")}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        resumeType === "passport"
                          ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-600 dark:ring-blue-500"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <span className="font-bold text-slate-900 dark:text-white block">Verified Skill Passport</span>
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400">Auto-generates verified portfolio PDF</span>
                    </div>

                    <div
                      onClick={() => setResumeType("upload")}
                      className={`p-3 rounded-xl border cursor-pointer transition ${
                        resumeType === "upload"
                          ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-1 ring-blue-600 dark:ring-blue-500"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <span className="font-bold text-slate-900 dark:text-white block">Custom Resume Upload</span>
                      <span className="text-[10.5px] text-slate-500 dark:text-slate-400">Upload PDF / DOCX from device</span>
                    </div>
                  </div>
                </div>

                {resumeType === "upload" && (
                  <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-center space-y-1 bg-slate-50/50 dark:bg-slate-800/40">
                    <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500 mx-auto" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300 block">Sachin_Resume_DataAnalyst.pdf (245 KB)</span>
                    <span className="text-[10.5px] text-emerald-600 dark:text-emerald-400 font-bold">✓ Uploaded and parsed</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">GitHub / Live Project Portfolio</label>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium text-slate-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Short Candidate Note (Optional)</label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-white text-xs"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setApplyStep(1)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setApplyStep(3)}
                    className="px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Verified Credentials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Skills & Digital Skill Passport */}
            {applyStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-900/50 flex items-start gap-2 text-purple-900 dark:text-purple-200">
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Fast-Track Screening with Verified Skill Passport</span>
                    <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-0.5">
                      Partner recruiters prioritize candidates with authenticated competencies over unverified claims.
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachPassport}
                    onChange={(e) => setAttachPassport(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">Attach SkillBridge Passport (ID: SB-2026-88492-V)</span>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400">Includes 12 verified skill badges, assessment scores, and project repo links</span>
                  </div>
                </label>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300 block">Matching Competencies Being Shared:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {applyModalOpp.matchingSkills?.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 font-bold text-[11px]">
                        ✓ {m.skill} ({m.studentScore}%)
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setApplyStep(2)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setApplyStep(4)}
                    className="px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Review & Submit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Review Application */}
            {applyStep === 4 && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <div className="flex justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-500 dark:text-slate-400">Candidate:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{applicantName} ({applicantEmail})</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-500 dark:text-slate-400">Applying For:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{applyModalOpp.role} at {applyModalOpp.company}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-500 dark:text-slate-400">Match Affinity:</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{applyModalOpp.matchPercentage}% Verified Match</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                    <span className="text-slate-500 dark:text-slate-400">Credential Shared:</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">Digital Skill Passport (Verified)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Portfolio:</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 truncate max-w-[200px]">{portfolioLink}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  By clicking submit, your application is logged directly into the SkillBridge candidate matching system for {applyModalOpp.company}.
                </p>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setApplyStep(3)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleFinalSubmitApplication}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer min-h-[42px]"
                  >
                    {isSubmitting ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm & Submit Application →</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Submission Success Confirmation (Phase 16 Requirement) */}
            {applyStep === 5 && submittedAppDetails && (
              <div className="text-center py-4 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Application Submitted Successfully!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Your verified application for <strong>{submittedAppDetails.position}</strong> has been logged with {submittedAppDetails.company}.
                  </p>
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-xs text-left space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Tracking ID:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{submittedAppDetails.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Current Stage:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">Applied (Under Review)</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setApplyModalOpp(null)}
                    className="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    Keep Browsing Opportunities
                  </button>
                  <button
                    onClick={() => {
                      setApplyModalOpp(null);
                      onNavigate("applications");
                    }}
                    className="w-full sm:w-auto px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
                  >
                    View in Applications Pipeline →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
