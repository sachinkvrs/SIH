import React, { useState } from "react";
import BrandLogo from "../common/BrandLogo";
import { User, Building2, BookOpen, School, ArrowRight, Loader2 } from "lucide-react";
import { authApi } from "../../api/client";

export default function LoginPage({ onNavigate }) {
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("alex.chen@skillbridge.edu");
  const [password, setPassword] = useState("Password123!");
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const roles = [
    { id: "student", label: "Student", icon: User, color: "bg-blue-600 text-white ring-blue-600" },
    { id: "industry", label: "Industry", icon: Building2, color: "bg-purple-600 text-white ring-purple-600" },
    { id: "academician", label: "Academician", icon: BookOpen, color: "bg-emerald-600 text-white ring-emerald-600" },
    { id: "institution", label: "Institution", icon: School, color: "bg-amber-600 text-white ring-amber-600" },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setAuthError("");
    if (roleId === "student") setEmail("alex.chen@skillbridge.edu");
    else if (roleId === "industry") setEmail("recruiter@techcorp.com");
    else if (roleId === "institution") setEmail("dean@university.edu");
    else if (roleId === "academician") setEmail("alex.chen@skillbridge.edu");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      const res = await authApi.login(email, password);
      if (res && res.success && res.data?.user) {
        const role = res.data.user.role;
        if (role === "RECRUITER") onNavigate("industry_dashboard");
        else if (role === "INSTITUTION") onNavigate("institution_analytics");
        else onNavigate("student_dashboard");
        return;
      }
    } catch (err) {
      console.warn("Backend login network fallback:", err);
    } finally {
      setIsLoading(false);
    }

    // Seamless offline demo fallback
    if (selectedRole === "industry") {
      onNavigate("industry_dashboard");
    } else if (selectedRole === "institution") {
      onNavigate("institution_analytics");
    } else if (selectedRole === "academician") {
      onNavigate("industry_collaboration");
    } else {
      onNavigate("student_dashboard");
    }
  };

  const handleQuickLogin = (role) => {
    handleRoleSelect(role);
    if (role === "industry") {
      onNavigate("industry_dashboard");
    } else if (role === "institution") {
      onNavigate("institution_analytics");
    } else if (role === "academician") {
      onNavigate("industry_collaboration");
    } else {
      onNavigate("student_dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] dark:bg-[#0B1220] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-4xl w-full bg-white dark:bg-[#111827] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Login Form Column */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="cursor-pointer mb-6" onClick={() => onNavigate("landing")}>
              <BrandLogo size="md" />
            </div>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Login to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-white transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <a href="#forgot" className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-white transition"
                  required
                />
              </div>

              {/* Select Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => handleRoleSelect(r.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition border cursor-pointer ${
                          isSelected
                            ? `${r.color} shadow-sm border-transparent`
                            : "bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {authError && (
                <div className="p-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/30 rounded-lg border border-rose-200 dark:border-rose-800">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 mt-2 bg-[#1E60D5] hover:bg-blue-700 disabled:opacity-60 text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isLoading ? "Signing in..." : "Login"}</span>
              </button>
            </form>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <span className="relative px-3 bg-white dark:bg-[#111827] text-[11px] text-slate-400 dark:text-slate-500 font-medium">Or</span>
            </div>

            <div className="text-center text-xs text-slate-500 dark:text-slate-400">
              New here?{" "}
              <button
                onClick={() => onNavigate("landing")}
                className="font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Create an account
              </button>
            </div>
          </div>

          {/* Quick Demo Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <span className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 text-center uppercase tracking-wider mb-2.5">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin("student")}
                className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[11px] font-semibold rounded-md border border-blue-200 dark:border-blue-900/50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <User className="w-3 h-3" />
                Login as Student
              </button>
              <button
                onClick={() => handleQuickLogin("industry")}
                className="px-2.5 py-1.5 bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-[11px] font-semibold rounded-md border border-purple-200 dark:border-purple-900/50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <Building2 className="w-3 h-3" />
                Login as Industry
              </button>
              <button
                onClick={() => handleQuickLogin("academician")}
                className="px-2.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold rounded-md border border-emerald-200 dark:border-emerald-900/50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-3 h-3" />
                Login as Academician
              </button>
              <button
                onClick={() => handleQuickLogin("institution")}
                className="px-2.5 py-1.5 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[11px] font-semibold rounded-md border border-amber-200 dark:border-amber-900/50 transition flex items-center justify-center gap-1 cursor-pointer"
              >
                <School className="w-3 h-3" />
                Login as Institution
              </button>
            </div>
          </div>
        </div>

        {/* Right Campus Quote & Graphic Column */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 bg-slate-900 overflow-hidden text-white">
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80"
            alt="University campus"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-900/50 to-slate-950/80"></div>

          {/* Quote Header */}
          <div className="relative z-10">
            <p className="text-base lg:text-lg font-serif italic text-slate-100 leading-relaxed max-w-xs">
              “Empowering students, industries and institutions for a better tomorrow.”
            </p>
          </div>

          {/* Decorative Campus Signpost Card */}
          <div className="relative z-10 mt-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-lg inline-block">
              <div className="text-xs font-bold tracking-widest uppercase text-cyan-300">
                Learn • Collaborate • Innovate • Grow
              </div>
              <p className="text-[11px] text-slate-200 mt-1">
                National Academic & Industry Network
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
