import React, { useState, useRef, useEffect } from "react";
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
  EyeOff,
  ArrowLeft,
  AlertCircle,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

import { CAREER_GOALS } from "../../data/careerIntelligence";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80";

export default function Settings({
  onNavigate,
  careerGoal = "Data Analyst",
  onChangeCareerGoal,
  profileData = {},
  onUpdateProfile,
  theme = "system",
  onThemeChange
}) {
  const [activeSection, setActiveSection] = useState("profile");
  const [savedToast, setSavedToast] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef(null);

  // 1. PROFILE
  const [profile, setProfile] = useState({
    fullName: profileData.fullName || "Sachin",
    email: profileData.email || "sachin.cs@example.edu.in",
    phone: profileData.phone || "+91 98765 43210",
    college: profileData.college || "ABC Institute of Technology",
    course: profileData.course || "Computer Science & Engineering",
    gradYear: profileData.gradYear || "2027",
  });

  const [draftAvatar, setDraftAvatar] = useState(
    profileData.avatar || DEFAULT_AVATAR
  );

  // Sync draft avatar and profile when profileData prop updates
  useEffect(() => {
    if (profileData && Object.keys(profileData).length > 0) {
      setProfile((prev) => ({
        ...prev,
        fullName: profileData.fullName || prev.fullName,
        email: profileData.email || prev.email,
        phone: profileData.phone || prev.phone,
        college: profileData.college || prev.college,
        course: profileData.course || prev.course,
        gradYear: profileData.gradYear || prev.gradYear,
      }));
      setDraftAvatar(profileData.avatar || DEFAULT_AVATAR);
    }
  }, [profileData]);

  // 2. CAREER PREFERENCES
  const [career, setCareer] = useState({
    targetRole: profileData.targetRole || careerGoal,
    preferredIndustry: profileData.preferredIndustry || "Information Technology & Artificial Intelligence",
    preferredLocation: profileData.preferredLocation || "Bangalore, Hyderabad, Remote",
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhotoError("");

    // Validate type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setPhotoError("Please select a valid image file (PNG, JPG, or JPEG).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate size: 2MB max
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setPhotoError("Image must be smaller than 2MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Read and compress via Canvas to keep base64 Data URLs compact (~30-50KB)
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_DIM = 320;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
        setDraftAvatar(dataUrl);
      };
      img.onerror = () => {
        setPhotoError("Failed to decode image file.");
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setPhotoError("Failed to read image file.");
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemovePhoto = () => {
    setDraftAvatar("");
    setPhotoError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    setDraftAvatar(profileData.avatar || DEFAULT_AVATAR);
    setPhotoError("");
    onNavigate("student_dashboard");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onChangeCareerGoal && career.targetRole !== careerGoal) {
      onChangeCareerGoal(career.targetRole);
    }
    if (onUpdateProfile) {
      onUpdateProfile({
        ...profileData,
        ...profile,
        targetRole: career.targetRole,
        preferredIndustry: career.preferredIndustry,
        preferredLocation: career.preferredLocation,
        avatar: draftAvatar || DEFAULT_AVATAR
      });
    }
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
          <span className="text-slate-900 dark:text-white font-bold">Account & Preferences</span>
        </div>
        <button
          onClick={() => onNavigate("student_dashboard")}
          className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Settings Header */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Account & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Manage your personal profile, career preferences, skill tracking, and account security.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Changes saved successfully!</span>
          </div>
        )}
      </div>

      {/* Two-Column Settings Interface */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* Left Side Navigation Menu (Scrollable pills on mobile, stacked list on desktop) */}
        <div className="md:col-span-4 bg-white dark:bg-[#111827] rounded-2xl p-2.5 sm:p-3 border border-slate-200/80 dark:border-slate-800 shadow-xs flex md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 md:gap-1 scrollbar-none">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left whitespace-nowrap shrink-0 md:shrink md:w-full min-h-[40px] ${
                  isActive
                    ? "bg-[#1E60D5] text-white shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800/60 md:bg-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Form Content Panel */}
        <div className="md:col-span-8 bg-white dark:bg-[#111827] rounded-2xl p-4 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {/* 1. PROFILE SECTION */}
            {activeSection === "profile" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Profile Information
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Your student credentials and institutional contact information.
                  </p>
                </div>

                {/* Profile Photo */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    {draftAvatar ? (
                      <img
                        src={draftAvatar}
                        alt={profile.fullName || "Student"}
                        className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/30 shadow-xs"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-xl ring-2 ring-blue-500/30 shadow-xs">
                        {(profile.fullName || "S").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                        aria-label="Upload profile photo"
                      />
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition cursor-pointer"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Change Photo</span>
                        </button>
                        {draftAvatar && draftAvatar !== DEFAULT_AVATAR && (
                          <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="px-2.5 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-medium rounded-lg transition cursor-pointer"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-1">PNG, JPG up to 2MB</span>
                    </div>
                  </div>

                  {photoError && (
                    <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/50 px-3 py-2 rounded-lg max-w-md">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{photoError}</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Graduation Year</label>
                    <input
                      type="text"
                      value={profile.gradYear}
                      onChange={(e) => setProfile({ ...profile, gradYear: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">College</label>
                    <input
                      type="text"
                      value={profile.college}
                      onChange={(e) => setProfile({ ...profile, college: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Course</label>
                    <input
                      type="text"
                      value={profile.course}
                      onChange={(e) => setProfile({ ...profile, course: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. CAREER PREFERENCES SECTION */}
            {activeSection === "career" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Career Preferences
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Define target roles and employment terms for automated internship matching.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Target Job Role</label>
                  <select
                    value={career.targetRole}
                    onChange={(e) => setCareer({ ...career, targetRole: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 font-semibold cursor-pointer"
                  >
                    {CAREER_GOALS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Industry</label>
                  <input
                    type="text"
                    value={career.preferredIndustry}
                    onChange={(e) => setCareer({ ...career, preferredIndustry: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={career.preferredLocation}
                      onChange={(e) => setCareer({ ...career, preferredLocation: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Work Mode</label>
                    <select
                      value={career.workMode}
                      onChange={(e) => setCareer({ ...career, workMode: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer"
                    >
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Internship Preference</label>
                    <select
                      value={career.internshipPreference}
                      onChange={(e) => setCareer({ ...career, internshipPreference: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer"
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
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Skill Preferences
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Configure technologies you want to benchmark and career learning objectives.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Interested Technologies</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-900/60"
                      >
                        <span>{tech}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tech)}
                          className="hover:text-blue-900 dark:hover:text-white text-blue-400 font-normal cursor-pointer"
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
                      className="flex-1 px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Learning Interests</label>
                  <input
                    type="text"
                    value={learningInterests}
                    onChange={(e) => setLearningInterests(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Career Goals</label>
                  <textarea
                    rows={3}
                    value={careerGoals}
                    onChange={(e) => setCareerGoals(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                  ></textarea>
                </div>
              </div>
            )}

            {/* 4. NOTIFICATION PREFERENCES SECTION */}
            {activeSection === "notifications" && (
              <div className="space-y-4">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Notification Preferences
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Customize your alert streams and delivery channels.
                  </p>
                </div>

                <div className="space-y-3.5 divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Application Updates</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Alerts when recruiter changes stage to Shortlisted or Interview.</p>
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
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Internship Recommendations</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Push notification when high-affinity openings match your verified skills.</p>
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
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Skill Recommendations</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Weekly suggestions targeting high-priority detected gaps.</p>
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
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Learning Reminders</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Milestone nudges to keep your learning streak on track.</p>
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
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Email Notifications</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Periodic email digests sent to your institutional address.</p>
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
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Privacy & Security
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Manage password credentials, authentication, and session security.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Change Password</h4>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Current Password</label>
                    <input
                      type="password"
                      defaultValue="••••••••••••"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">New Password</label>
                      <input
                        type="password"
                        placeholder="Min 8 characters"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Repeat new password"
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Two-Factor Authentication (2FA)</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold rounded border border-emerald-200 dark:border-emerald-800">
                      Enabled
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Additional security required on institutional portal sign-ins via verification code.
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Login Activity</h4>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/60">
                      <span>Windows 11 • Chrome (This Device)</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active Now</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700/60">
                      <span>Android 14 • Mobile Web</span>
                      <span className="text-slate-400 dark:text-slate-500">07 Sep 2026</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Data Privacy</h4>
                  <button
                    type="button"
                    onClick={() => alert("Generating verified credentials and telemetry data export...")}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Download My SkillBridge Data & Credentials Archive
                  </button>
                </div>
              </div>
            )}

            {/* 6. APPEARANCE SECTION */}
            {activeSection === "appearance" && (
              <div className="space-y-5">
                <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                    Appearance & Localization
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Customize your interface display theme and platform language.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Interface Theme</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Light Theme */}
                    <div
                      onClick={() => onThemeChange && onThemeChange("light")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        theme === "light"
                          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-600"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Sun className={`w-4 h-4 ${theme === "light" ? "text-amber-500" : "text-slate-400"}`} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Light Theme</span>
                        </div>
                        {theme === "light" && (
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Crisp, high-contrast academic daylight aesthetic.</p>
                    </div>

                    {/* Dark Slate Mode */}
                    <div
                      onClick={() => onThemeChange && onThemeChange("dark")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        theme === "dark"
                          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-600"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Moon className={`w-4 h-4 ${theme === "dark" ? "text-indigo-400" : "text-slate-400"}`} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">Dark Slate Mode</span>
                        </div>
                        {theme === "dark" && (
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Deep navy & dark slate palette for evening study.</p>
                    </div>

                    {/* System Preference */}
                    <div
                      onClick={() => onThemeChange && onThemeChange("system")}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                        theme === "system"
                          ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 ring-2 ring-blue-600"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Monitor className={`w-4 h-4 ${theme === "system" ? "text-blue-500" : "text-slate-400"}`} />
                          <span className="text-xs font-bold text-slate-900 dark:text-white">System Preference</span>
                        </div>
                        {theme === "system" && (
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Automatically tracks your OS light or dark setting.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Language</label>
                  <select
                    value={appearance.language}
                    onChange={(e) => setAppearance({ ...appearance, language: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100 cursor-pointer"
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
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={handleCancel}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
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
