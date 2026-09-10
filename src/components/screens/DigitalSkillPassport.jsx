import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  Download,
  Share2,
  ExternalLink,
  ShieldCheck,
  QrCode,
  Sparkles,
  FileCheck2,
  Briefcase,
  FolderKanban,
  Trophy,
  X,
  Copy,
  Check,
  ArrowLeft
} from "lucide-react";

export default function DigitalSkillPassport({
  profileData,
  careerGoal = "Data Analyst",
  careerData,
  onNavigate
}) {
  const [activeTab, setActiveTab] = useState("Skills");
  const [copied, setCopied] = useState(false);
  const [publicModalOpen, setPublicModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const studentName = profileData?.fullName || "Sachin";
  const courseName = profileData?.course || "Computer Science & Engineering";
  const collegeName = profileData?.college || "ABC Institute of Technology";
  const readiness = profileData?.readinessScore || careerData?.readinessScore || 82;
  const credentialId = "SB-2026-88492-V";

  const tabs = [
    "Skills",
    "Certifications",
    "Projects",
    "Internships",
    "Achievements",
    "Assessment History"
  ];

  const defaultVerifiedSkills = [
    { name: "Communication", proficiency: "80%", verified: true, date: "25 Aug 2026", issuer: "Campus Evaluation" },
    { name: "Problem Solving", proficiency: "85%", verified: true, date: "02 Sep 2026", issuer: "SkillBridge Lab" }
  ];

  const roleSkills = (careerData?.skillGaps || []).map((g) => ({
    name: g.name,
    proficiency: `${g.current}%`,
    verified: g.gap === 0 || g.current >= 70,
    date: "04 Sep 2026",
    issuer: "SkillBridge Proctored Benchmark"
  }));

  const verifiedSkills = [
    ...roleSkills,
    ...defaultVerifiedSkills.filter((s) => !roleSkills.some((r) => r.name.toLowerCase() === s.name.toLowerCase()))
  ];

  const certifications = [
    { title: `Verified ${careerGoal} Diagnostic`, issuer: "SkillBridge & Industry Partners", date: "Sep 2026", grade: "Top 15%" },
    { title: `${careerGoal} Core Competency`, issuer: "SkillBridge Verified Credentials", date: "Aug 2026", grade: "Certified" },
    { title: "Applied Problem Solving & Ethics", issuer: "SkillBridge Council", date: "Jul 2026", grade: "94%" }
  ];

  const projects = (careerData?.handsOnExperiments && careerData.handsOnExperiments.length > 0)
    ? careerData.handsOnExperiments.map((exp) => ({
        title: exp.title,
        stack: Array.isArray(exp.tools) ? exp.tools.join(", ") : "Production Tooling",
        desc: exp.industryContext || exp.description || `Hands-on capstone project for ${careerGoal}.`
      }))
    : [
        { title: `${careerGoal} Industrial Capstone`, stack: "Production Toolchain", desc: `Comprehensive milestone project demonstrating hands-on proficiency in ${careerGoal}.` }
      ];

  const internships = [
    { role: `${careerGoal} Trainee`, org: "SkillBridge Industry Lab", duration: "Jun 2026 – Aug 2026", outcome: "Optimized workflow pipeline; verified hands-on milestone execution." }
  ];

  const achievements = [
    { title: "Smart India Hackathon Finalist", org: "Ministry of Education / AICTE", date: "2026" },
    { title: "Academic Excellence Dean's List", org: "ABC Institute of Technology", date: "2025 – 2026" }
  ];

  const assessmentHistory = [
    { test: "SQL Diagnostic Assessment", date: "28 Aug 2026", score: "66/100", status: "Verified" },
    { test: "Python Data Analysis Assessment", date: "02 Sep 2026", score: "88/100", status: "Verified" },
    { test: "Machine Learning Fundamentals", date: "04 Sep 2026", score: "74/100", status: "Verified" }
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(`https://skillbridge.edu.in/verify/${credentialId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-8">
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
          <span className="text-slate-900 dark:text-white font-bold">Digital Skill Passport</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Digital Skill Passport</h2>
            <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Verified by SkillBridge
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Industry and institution verified digital credential showcasing validated student competencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setPublicModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Profile</span>
          </button>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Verified Digital Skill Passport PDF generated and ready for download!</span>
          </div>
          <button onClick={() => setDownloadSuccess(false)} className="text-emerald-700 dark:text-emerald-400 font-bold">✕</button>
        </div>
      )}

      {/* Main Digital Passport Certificate Card */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm overflow-hidden space-y-6">
        {/* Credential Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {profileData?.avatar ? (
                <img
                  src={profileData.avatar}
                  alt={studentName}
                  className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg shrink-0"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-2xl flex items-center justify-center ring-4 ring-white/10 shadow-lg shrink-0">
                  {studentName.charAt(0)}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl font-black tracking-tight text-white">{studentName}</h1>
                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold rounded-full">
                    ✓ Verified by SkillBridge
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-300">{courseName}</p>
                <p className="text-[11px] text-slate-400">{collegeName}</p>
              </div>
            </div>

            {/* QR Code & Credential ID Block */}
            <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
              <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-10 h-10 text-slate-900" />
              </div>
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block">
                  Credential ID
                </span>
                <span className="font-mono text-xs font-bold text-white block">{credentialId}</span>
                <span className="text-[9.5px] text-emerald-300 font-semibold block">
                  {readiness}% Industry Ready ({careerGoal})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900/50 shadow-2xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content: Skills */}
          {activeTab === "Skills" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Verified Competencies & Evaluation Matrix
                </h4>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {verifiedSkills.filter((s) => s.verified).length} of {verifiedSkills.length} Verified
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {verifiedSkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                      skill.verified
                        ? "bg-slate-50/70 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700"
                        : "bg-slate-50/30 dark:bg-slate-800/30 border-slate-200/50 dark:border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{skill.name}</span>
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400">{skill.proficiency}</span>
                    </div>

                    <div className="text-[10.5px] text-slate-400 dark:text-slate-400 space-y-0.5">
                      <span>Evaluator: {skill.issuer}</span>
                      <span className="block">Date: {skill.date}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                      {skill.verified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          Verified by SkillBridge
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Self-reported</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Certifications */}
          {activeTab === "Certifications" && (
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{cert.issuer} • {cert.date}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold rounded-lg border border-blue-200 dark:border-blue-900/50 shrink-0 self-start sm:self-auto">
                    Grade: {cert.grade}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Projects */}
          {activeTab === "Projects" && (
            <div className="space-y-3">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">{proj.title}</h4>
                    <span className="text-[10.5px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                      {proj.stack}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Internships */}
          {activeTab === "Internships" && (
            <div className="space-y-3">
              {internships.map((intern, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">{intern.role}</h4>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500">{intern.duration}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 font-semibold">{intern.org}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">{intern.outcome}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Achievements */}
          {activeTab === "Achievements" && (
            <div className="space-y-3">
              {achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{ach.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">{ach.org}</p>
                  </div>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">{ach.date}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tab Content: Assessment History */}
          {activeTab === "Assessment History" && (
            <div className="space-y-3">
              {assessmentHistory.map((test, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{test.test}</h4>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px]">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 dark:text-white block">{test.score}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{test.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-[11px] text-slate-400 dark:text-slate-500">
              Verified by SkillBridge Evaluation Algorithm & Academic Registry
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer min-h-[40px]"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer min-h-[40px]"
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? "Link Copied!" : "Share Passport"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PUBLIC VERIFICATION MODAL */}
      {publicModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Public Verification Profile</h3>
              </div>
              <button
                onClick={() => setPublicModalOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Candidate Name:</span>
                <strong className="text-slate-900 dark:text-white">{studentName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Institution:</span>
                <strong className="text-slate-900 dark:text-white">{collegeName}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Target Role:</span>
                <strong className="text-blue-600 dark:text-blue-400">{careerGoal}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 dark:text-slate-400">Industry Readiness:</span>
                <strong className="text-emerald-700 dark:text-emerald-400">{readiness}% Verified</strong>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Verification URL:</span>
                <span className="font-mono text-[10.5px] text-slate-600 dark:text-slate-300">skillbridge.edu.in/verify/{credentialId}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 font-bold rounded-lg text-xs cursor-pointer"
              >
                {copied ? "Link Copied!" : "Copy Public Link"}
              </button>
              <button
                onClick={() => setPublicModalOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
