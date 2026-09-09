import React, { useState } from "react";
import BrandLogo from "../common/BrandLogo";
import { User, Building2, BookOpen, School, ArrowRight } from "lucide-react";

export default function LoginPage({ onNavigate }) {
  const [selectedRole, setSelectedRole] = useState("student");
  const [email, setEmail] = useState("rahul.sharma@example.com");
  const [password, setPassword] = useState("••••••••");

  const roles = [
    { id: "student", label: "Student", icon: User, color: "bg-blue-600 text-white ring-blue-600" },
    { id: "industry", label: "Industry", icon: Building2, color: "bg-purple-600 text-white ring-purple-600" },
    { id: "academician", label: "Academician", icon: BookOpen, color: "bg-emerald-600 text-white ring-emerald-600" },
    { id: "institution", label: "Institution", icon: School, color: "bg-amber-600 text-white ring-amber-600" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
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
    setSelectedRole(role);
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
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200 grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Login Form Column */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="cursor-pointer mb-6" onClick={() => onNavigate("landing")}>
              <BrandLogo size="md" />
            </div>

            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h2>
              <p className="text-xs text-slate-500 mt-1">Login to continue to your dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 transition"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Password</label>
                  <a href="#forgot" className="text-[11px] font-semibold text-blue-600 hover:underline">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 transition"
                  required
                />
              </div>

              {/* Select Role */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">Select Role</label>
                <div className="grid grid-cols-2 gap-2">
                  {roles.map((r) => {
                    const Icon = r.icon;
                    const isSelected = selectedRole === r.id;
                    return (
                      <button
                        type="button"
                        key={r.id}
                        onClick={() => setSelectedRole(r.id)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition border ${
                          isSelected
                            ? `${r.color} shadow-sm border-transparent`
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{r.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-[#1E60D5] hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm transition"
              >
                Login
              </button>
            </form>

            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <span className="relative px-3 bg-white text-[11px] text-slate-400 font-medium">Or</span>
            </div>

            <div className="text-center text-xs text-slate-500">
              New here?{" "}
              <button
                onClick={() => onNavigate("landing")}
                className="font-semibold text-blue-600 hover:underline"
              >
                Create an account
              </button>
            </div>
          </div>

          {/* Quick Demo Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-50/70 p-3 rounded-xl border border-slate-200/80">
            <span className="block text-[11px] font-bold text-slate-600 text-center uppercase tracking-wider mb-2.5">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin("student")}
                className="px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold rounded-md border border-blue-200 transition flex items-center justify-center gap-1"
              >
                <User className="w-3 h-3" />
                Login as Student
              </button>
              <button
                onClick={() => handleQuickLogin("industry")}
                className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-semibold rounded-md border border-purple-200 transition flex items-center justify-center gap-1"
              >
                <Building2 className="w-3 h-3" />
                Login as Industry
              </button>
              <button
                onClick={() => handleQuickLogin("academician")}
                className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-[11px] font-semibold rounded-md border border-emerald-200 transition flex items-center justify-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                Login as Academician
              </button>
              <button
                onClick={() => handleQuickLogin("institution")}
                className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 text-[11px] font-semibold rounded-md border border-amber-200 transition flex items-center justify-center gap-1"
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
