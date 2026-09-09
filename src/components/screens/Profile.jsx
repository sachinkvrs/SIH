import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  MapPin,
  Calendar,
  Award,
  Edit3,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Building2,
  X,
  Save,
  ArrowRight,
  Zap
} from "lucide-react";
import { CAREER_GOALS } from "../../data/careerIntelligence";

export default function Profile({
  profileData,
  onUpdateProfile,
  careerGoal = "Data Analyst",
  onChangeCareerGoal,
  onNavigate
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(profileData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const verifiedSkills = [
    { name: "Python", level: "85%", verified: true },
    { name: "SQL", level: "65%", verified: true },
    { name: "Machine Learning", level: "72%", verified: true },
    { name: "JavaScript", level: "78%", verified: true },
    { name: "Power BI", level: "45%", verified: false },
    { name: "Communication", level: "80%", verified: true },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile(editForm);
    if (onChangeCareerGoal && editForm.targetRole !== careerGoal) {
      onChangeCareerGoal(editForm.targetRole);
    }
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Toast Alert */}
      {saveSuccess && (
        <div className="p-3.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile information updated successfully!</span>
          </div>
          <button onClick={() => setSaveSuccess(false)} className="text-emerald-600 font-bold text-xs">✕</button>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="relative shrink-0 self-start sm:self-center">
            <img
              src={profileData.avatar}
              alt={profileData.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white" title="Active Student">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {profileData.fullName}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Verified Student
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              {profileData.course}
            </p>

            <p className="text-xs text-slate-500">
              {profileData.college} • Class of {profileData.gradYear}
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 text-xs">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold rounded-md border border-blue-200">
                Target: {profileData.targetRole}
              </span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="font-semibold text-slate-600">
                Readiness: <strong className="text-blue-600">{profileData.readinessScore}%</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-none border-slate-100">
          <button
            onClick={() => {
              setEditForm(profileData);
              setIsEditing(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer min-h-[42px]"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={() => onNavigate("settings")}
            className="flex-1 md:flex-none flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer min-h-[42px]"
          >
            Preferences
          </button>
        </div>
      </div>

      {/* Information Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Personal & Education Info (Col 7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Institutional Record</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Full Legal Name</span>
                <span className="font-bold text-slate-800">{profileData.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Primary Email</span>
                <span className="font-bold text-slate-800">{profileData.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Contact Phone</span>
                <span className="font-bold text-slate-800">{profileData.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Account Status</span>
                <span className="font-bold text-emerald-600">Active • Verified Student</span>
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Academic Credentials</h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Verified by Registrar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <span className="text-slate-400 block mb-0.5">College / Institution</span>
                <span className="font-bold text-slate-800">{profileData.college}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Degree & Specialization</span>
                <span className="font-bold text-slate-800">{profileData.course}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Graduation Year</span>
                <span className="font-bold text-slate-800">{profileData.gradYear}</span>
              </div>
            </div>
          </div>

          {/* Career Preferences */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Career Preferences</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-0.5">Target Job Role</span>
                <span className="font-bold text-blue-600">{profileData.targetRole}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Preferred Industry</span>
                <span className="font-bold text-slate-800">{profileData.preferredIndustry}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Preferred Locations</span>
                <span className="font-bold text-slate-800">{profileData.preferredLocation}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Internship Mode</span>
                <span className="font-bold text-slate-800">Hybrid / Remote</span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Summary Sidebar (Col 5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Skills Summary</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                12 Verified
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Curated snapshot of competencies verified through proctored diagnostic benchmarks and course submissions.
            </p>

            <div className="space-y-3">
              {verifiedSkills.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{s.name}</span>
                    {s.verified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px]" title="Verified">
                        ✓
                      </span>
                    )}
                  </div>
                  <span className="font-extrabold text-blue-600">{s.level}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => onNavigate("my_skills")}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <span>View My Skills Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setEditForm(profileData);
                  setIsEditing(true);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile Information</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">Edit Profile Information</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.fullName}
                  onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">College / University</label>
                <input
                  type="text"
                  value={editForm.college}
                  onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Degree & Course</label>
                  <input
                    type="text"
                    value={editForm.course}
                    onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Graduation Year</label>
                  <input
                    type="text"
                    value={editForm.gradYear}
                    onChange={(e) => setEditForm({ ...editForm, gradYear: e.target.value })}
                    required
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Career Role</label>
                <select
                  value={editForm.targetRole}
                  onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })}
                  required
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 text-xs font-semibold"
                >
                  {CAREER_GOALS.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
