import React from "react";
import { Briefcase, Users, FileCheck, Sparkles, ArrowRight, CheckCircle2, Clock } from "lucide-react";

export default function IndustryDashboard({ onNavigate }) {
  const stats = [
    { label: "Active Jobs", value: "12", icon: Briefcase, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Active Internships", value: "8", icon: Clock, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
    { label: "Applications", value: "156", icon: FileCheck, color: "text-purple-600 bg-purple-50 border-purple-100" },
    { label: "Matching Candidates", value: "24", icon: Sparkles, color: "text-amber-600 bg-amber-50 border-amber-100" },
  ];

  const applications = [
    {
      name: "Rahul Sharma",
      role: "ML Intern",
      match: "92%",
      status: "Under Review",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Aditi Verma",
      role: "Data Analyst Intern",
      match: "92%",
      status: "Shortlisted",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Sneha Patel",
      role: "Business Analyst",
      match: "78%",
      status: "Applied",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Welcome, TechCorp
        </h2>
        <p className="text-xs text-slate-500 mt-1">Find talent. Build the future.</p>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between"
            >
              <div>
                <span className="text-2xl font-extrabold text-slate-900 block">{s.value}</span>
                <span className="text-xs font-semibold text-slate-500 mt-0.5 block">{s.label}</span>
              </div>
              <div className={`w-10 h-10 rounded-xl ${s.color} border flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Recent Applications</h3>
          <button className="text-xs font-semibold text-blue-600 hover:underline">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 font-semibold">Name</th>
                <th className="pb-3 font-semibold">Role</th>
                <th className="pb-3 font-semibold">Match</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.map((app, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 font-semibold text-slate-800 flex items-center gap-2.5">
                    <img
                      src={app.avatar}
                      alt={app.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span>{app.name}</span>
                  </td>
                  <td className="py-3 text-slate-600 font-medium">{app.role}</td>
                  <td className="py-3">
                    <span className="font-bold text-blue-600">{app.match}</span>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2.5 py-1 text-[11px] font-bold rounded-md border ${app.statusColor}`}
                    >
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
  );
}
