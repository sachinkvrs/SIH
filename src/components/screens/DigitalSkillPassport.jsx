import React, { useState } from "react";
import { Award, CheckCircle2, Download, Share2, ExternalLink, ShieldCheck } from "lucide-react";

export default function DigitalSkillPassport({ profileData, onNavigate }) {
  const [activeTab, setActiveTab] = useState("Skills");
  const [copied, setCopied] = useState(false);

  const studentName = profileData?.fullName || "Sachin";
  const courseName = profileData?.course || "Computer Science Engineering";
  const collegeName = profileData?.college || "ABC Institute of Technology";

  const tabs = ["Skills", "Certifications", "Projects", "Internships", "Achievements"];

  const skills = [
    { name: "Python", verified: true },
    { name: "SQL", verified: true },
    { name: "Machine Learning", verified: true },
    { name: "JavaScript", verified: true },
    { name: "Power BI", verified: false },
    { name: "Communication", verified: false },
  ];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Digital Skill Passport</h2>
        <p className="text-xs text-slate-500 mt-1">
          Cryptographically signed, institution & industry verified portfolio of competency.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center ring-2 ring-blue-500/30 shadow-xs">
              {studentName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">{studentName}</h3>
              </div>
              <p className="text-xs font-semibold text-slate-600 mt-0.5">
                {courseName}
              </p>
              <p className="text-[11px] text-slate-400">
                {collegeName}
              </p>
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified Profile</span>
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                activeTab === tab
                  ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Verified Skills Grid */}
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Verified Competencies & Tags
          </h4>

          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition border ${
                  skill.verified
                    ? "bg-slate-50 border-blue-200 text-slate-800 shadow-xs"
                    : "bg-slate-50/60 border-slate-200 text-slate-600"
                }`}
              >
                <span>{skill.name}</span>
                {skill.verified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400 font-medium">Self-reported</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={() => alert("Downloading Verified Skill Passport PDF...")}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "Link Copied!" : "Share Profile"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
