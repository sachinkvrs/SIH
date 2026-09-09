import React, { useState } from "react";
import {
  User,
  Briefcase,
  Zap,
  Bell,
  Lock,
  Palette,
  CheckCircle2,
  Save,
  Shield,
  Upload,
  Globe,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react";

export default function Settings({ onNavigate }) {
  const [activeSection, setActiveSection] = useState("profile");
  const [savedToast, setSavedToast] = useState(false);

  // 1. PROFILE
  const [profile, setProfile] = useState({
    fullName: "Sachin",
    email: "sachin.cs@example.edu.in",
    phone: "+91 98765 43210",
    college: "ABC Institute of Technology",
    course: "Computer Science & Engineering",
    gradYear: "2027",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  });

  // 2. CAREER PREFERENCES
  const [career, setCareer] = useState({
    targetRole: "Data Analyst / AI Engineer",
    preferredIndustry: "Information Technology & Artificial Intelligence",
    preferredLocation: "Bangalore, Hyderabad, Remote",
    workMode: "Hybrid",
    internshipPreference: "6-Month Semester Internship",
  });

  // 3. SKILL PREFERENCES
  const [technologies, setTechnologies] = useState([
    "Python", "SQL", "Power BI", "Machine Learning", "PyTorch", "FastAPI"
  ]);
  const [newTech, setNewTech] = useState("");
  const [learningInterests, setLearningInterests] = useState(
    "Generative AI, Large Language Models, Cloud Data Pipelines, Automated ETL"
  );
  const [careerGoals, setCareerGoals] = useState(
    "Transition into a Junior AI/ML Engineer or Data Analyst role within 6 months through validated skill benchmarks."
  );

  // 4. NOTIFICATION PREFERENCES
  const [notifications, setNotifications] = useState({
    appUpdates: true,
    internshipRecs: true,
    skillRecs: true,
    learningReminders: true,
    emailAlerts: false,
  });

  // 5. PRIVACY & SECURITY
  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirmPass: "",
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // 6. APPEARANCE
  const [appearance, setAppearance] = useState({
    theme: "Light Theme",
    language: "English (India)",
  });

  const sections = [
    { id: "profile", label: "Profile", icon: User },
    { id: "career", label: "Career Preferences", icon: Briefcase },
    { id: "skills", label: "Skill Preferences", icon: Zap },
    { id: "notifications", label: "Notification Preferences", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleAddTech = (e) => {
    e.preventDefault();
    if (newTech.trim() && !technologies.includes(newTech.trim())) {
      setTechnologies([...technologies, newTech.trim()]);
      setNewTech("");
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Settings Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Account & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Manage your personal profile, career preferences, skill tracking, and account security.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Two-Column Settings Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side Navigation Menu */}
        <div className="md:col-span-4 bg-white rounded-2xl p-3 border border-slate-200/80 shadow-xs space-y-1">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                  isActive
                    ? "bg-[#1E60D5] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Form Content Panel */}
        <div className="md:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. PROFILE SECTION */}
            {activeSection === "profile" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Profile Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Your student credentials and institutional contact information.
                  </p>
                </div>

                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                  <img
                    src={profile.avatar}
                    alt={profile.fullName}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-xs"
                  />
                  <div>
                    <button
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Photo</span>
                    </button>
                    <span className="text-[11px] text-slate-400 block mt-1">PNG, JPG up to 2MB</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={profile.gradYear}
                      onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">College</label>
                    <input
                      type="text"
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                    <input
                      type="text"
                      value={profile.course}
                      onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. CAREER PREFERENCES SECTION */}
            {activeSection === "career" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Career Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Define target roles and employment terms for automated internship matching.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Job Role</label>
                  <input
                    type="text"
                    value={career.targetRole}
                    onChange={(e) => setCareer({ ...career, targetRole: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Industry</label>
                  <input
                    type="text"
                    value={career.preferredIndustry}
                    onChange={(e) => setCareer({ ...career, preferredIndustry: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={career.preferredLocation}
                      onChange={(e) => setCareer({ ...career, preferredLocation: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Mode</label>
                    <select
                      value={career.workMode}
                      onChange={(e) => setCareer({ ...career, workMode: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 cursor-pointer"
                    >
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Internship Preference</label>
                    <select
                      value={career.internshipPreference}
                      onChange={(e) => setCareer({ ...career, internshipPreference: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 cursor-pointer"
                    >
                      <option>6-Month Semester Internship</option>
                      <option>Summer Internship (2-3 Months)</option>
                      <option>Part-time Virtual Internship</option>
                      <option>Full-time Graduate Job</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SKILL PREFERENCES SECTION */}
            {activeSection === "skills" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Skill Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure technologies you want to benchmark and career learning objectives.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Interested Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="hover:text-blue-900 text-blue-400 font-normal cursor-pointer"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTech}
                      onChange={(e) => setNewTech(e.target.value)}
                      placeholder="Add technology (e.g. React, Docker, Rust)..."
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Learning Interests</label>
                  <input
                    type="text"
                    value={learningInterests}
                    onChange={(e) => setLearningInterests(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Career Goals</label>
                  <textarea
                    rows={3}
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  ></textarea>
                </div>
              </div>
            )}

            {/* 4. NOTIFICATION PREFERENCES SECTION */}
            {activeSection === "notifications" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize your alert streams and delivery channels.
                  </p>
                </div>

                <div className="space-y-3.5 divide-y divide-slate-100">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Application Updates</h4>
                      <p className="text-[11px] text-slate-500">Alerts when recruiter changes stage to Shortlisted or Interview.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.appUpdates}
                      onChange={(e) => setNotifications({ ...notifications, appUpdates: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Internship Recommendations</h4>
                      <p className="text-[11px] text-slate-500">Push notification when high-affinity openings match your verified skills.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.internshipRecs}
                      onChange={(e) => setNotifications({ ...notifications, internshipRecs: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Skill Recommendations</h4>
                      <p className="text-[11px] text-slate-500">Weekly suggestions targeting high-priority detected gaps.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.skillRecs}
                      onChange={(e) => setNotifications({ ...notifications, skillRecs: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Learning Reminders</h4>
                      <p className="text-[11px] text-slate-500">Milestone nudges to keep your learning streak on track.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.learningReminders}
                      onChange={(e) => setNotifications({ ...notifications, learningReminders: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Email Notifications</h4>
                      <p className="text-[11px] text-slate-500">Periodic email digests sent to your institutional address.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications.emailAlerts}
                      onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 5. PRIVACY & SECURITY SECTION */}
            {activeSection === "privacy" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Privacy & Security
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage password credentials, authentication, and session security.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800">Change Password</h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Current Password</label>
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="Min 8 characters"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-bold text-slate-800">Two-Factor Authentication (2FA)</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      Enabled
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Additional security required on institutional portal sign-ins via verification code.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800">Login Activity</h4>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span>Windows 11 • Chrome (This Device)</span>
                      <span className="text-emerald-600 font-semibold">Active Now</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <span>Android 14 • Mobile Web</span>
                      <span className="text-slate-400">07 Sep 2026</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 mb-1">Data Privacy</h4>
                  <button
                    type="button"
                    onClick={() => alert("Generating verified credentials and telemetry data export...")}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Download My SkillBridge Data & Credentials Archive
                  </button>
                </div>
              </div>
            )}

            {/* 6. APPEARANCE SECTION */}
            {activeSection === "appearance" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    Appearance & Localization
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customize your interface display theme and platform language.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Theme</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div
                      onClick={() => setAppearance({ ...appearance, theme: "Light Theme" })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        appearance.theme === "Light Theme"
                          ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">Light Theme (Default)</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Crisp, high-contrast dashboard aesthetic.</p>
                    </div>

                    <div
                      onClick={() => setAppearance({ ...appearance, theme: "Dark Slate" })}
                      className={`p-3.5 rounded-xl border cursor-pointer transition ${
                        appearance.theme === "Dark Slate"
                          ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">Dark Slate Mode</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Deep slate palette for evening study.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={appearance.language}
                    onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 cursor-pointer"
                  >
                    <option>English (India)</option>
                    <option>Hindi (हिन्दी)</option>
                    <option>Tamil (தமிழ்)</option>
                    <option>Telugu (తెలుగు)</option>
                  </select>
                </div>
              </div>
            )}

            {/* BUTTONS: Save Changes & Cancel */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate("student_dashboard")}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
