import React, { useState } from "react";
import {
  History,
  FileCheck2,
  Zap,
  BookOpen,
  Briefcase,
  User,
  Search,
  CheckCircle2,
  TrendingUp,
  Clock,
  Filter,
  ChevronDown
} from "lucide-react";

export default function Activity({ onNavigate, activityTimeline = [] }) {
  const [selectedFilter, setSelectedFilter] = useState("All Activity");
  const [visibleCount, setVisibleCount] = useState(10);

  const filterOptions = [
    "All Activity",
    "Assessments",
    "Skills",
    "Learning",
    "Applications",
    "Profile"
  ];

  // Icon mapping helper
  const getIconForType = (type) => {
    switch (type) {
      case "Assessments":
        return FileCheck2;
      case "Skills":
        return Zap;
      case "Learning":
        return BookOpen;
      case "Applications":
        return Briefcase;
      case "Profile":
        return User;
      default:
        return History;
    }
  };

  const getIconColorForType = (type) => {
    switch (type) {
      case "Assessments":
        return "bg-blue-600 text-white";
      case "Skills":
        return "bg-emerald-600 text-white";
      case "Learning":
        return "bg-amber-500 text-white";
      case "Applications":
        return "bg-indigo-600 text-white";
      case "Profile":
        return "bg-slate-700 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  // Chronological activity history (Things the STUDENT has DONE)
  const baseTimelineData = [
    {
      dateGroup: "Today",
      items: [
        {
          id: "act-1",
          type: "Assessments",
          title: "Completed SQL Skill Assessment",
          time: "10:42 AM",
          desc: "Proctored diagnostic assessment submitted successfully.",
          meta: "Score: 65%",
          metaColor: "bg-amber-100 text-amber-800 border-amber-200",
          icon: FileCheck2,
          iconColor: "bg-blue-600 text-white"
        },
        {
          id: "act-2",
          type: "Skills",
          title: "Added Python to your skill profile",
          time: "9:20 AM",
          desc: "Self-reported competency added with portfolio GitHub repository link.",
          meta: "Proficiency: 85%",
          metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: Zap,
          iconColor: "bg-emerald-600 text-white"
        },
      ]
    },
    {
      dateGroup: "Yesterday",
      items: [
        {
          id: "act-3",
          type: "Learning",
          title: "Completed Power BI Module 3",
          time: "6:15 PM",
          desc: "Finished interactive DAX modeling and visualization tutorial exercises.",
          meta: "Progress: 75%",
          metaColor: "bg-blue-100 text-blue-800 border-blue-200",
          icon: BookOpen,
          iconColor: "bg-amber-500 text-white"
        },
        {
          id: "act-4",
          type: "Applications",
          title: "Applied for Data Analyst Intern at TCS",
          time: "3:40 PM",
          desc: "Submitted application with verified Digital Skill Passport attached.",
          meta: "Status: Under Review",
          metaColor: "bg-indigo-100 text-indigo-800 border-indigo-200",
          icon: Briefcase,
          iconColor: "bg-indigo-600 text-white"
        },
      ]
    },
    {
      dateGroup: "2 days ago",
      items: [
        {
          id: "act-5",
          type: "Profile",
          title: "Updated career preferences",
          time: "11:15 AM",
          desc: "Set target job role to 'Data Analyst' with Hybrid work preference.",
          meta: "Profile Updated",
          metaColor: "bg-slate-100 text-slate-800 border-slate-200",
          icon: User,
          iconColor: "bg-slate-700 text-white"
        },
        {
          id: "act-6",
          type: "Applications",
          title: "Viewed AI/ML Internship at Infosys",
          time: "4:30 PM",
          desc: "Reviewed job description, required tech stack, and verified candidate match score (92%).",
          meta: "Job Viewed",
          metaColor: "bg-slate-100 text-slate-700 border-slate-200",
          icon: Search,
          iconColor: "bg-cyan-600 text-white"
        },
      ]
    },
    {
      dateGroup: "3 days ago",
      items: [
        {
          id: "act-7",
          type: "Skills",
          title: "Python proficiency increased from 78% → 85%",
          time: "2:10 PM",
          desc: "Evaluation algorithm upgraded level based on verified project code analysis.",
          meta: "+7% Improvement",
          metaColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: TrendingUp,
          iconColor: "bg-emerald-600 text-white"
        },
        {
          id: "act-8",
          type: "Assessments",
          title: "Ran Skill Gap Diagnostic",
          time: "11:00 AM",
          desc: "Benchmark matrix computed across Data Analyst competencies.",
          meta: "3 Gaps Found",
          metaColor: "bg-rose-100 text-rose-800 border-rose-200",
          icon: FileCheck2,
          iconColor: "bg-purple-600 text-white"
        }
      ]
    }
  ];

  // Merge extra live items from activityTimeline
  const extraLiveToday = activityTimeline
    .filter((act) => !baseTimelineData[0].items.some((item) => item.id === act.id))
    .map((act) => ({
      ...act,
      icon: getIconForType(act.type),
      iconColor: getIconColorForType(act.type)
    }));

  const timelineData = [
    {
      dateGroup: "Today",
      items: [...extraLiveToday, ...baseTimelineData[0].items]
    },
    ...baseTimelineData.slice(1)
  ];

  // Filter items
  const filteredGroups = timelineData.map((group) => ({
    ...group,
    items: selectedFilter === "All Activity"
      ? group.items
      : group.items.filter((item) => item.type.toLowerCase() === selectedFilter.toLowerCase())
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Recent Activity
            </h1>
            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full border border-slate-200">
              Audit History
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Chronological log of your assessments, applications, skill updates, and learning progress.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Real-time Activity Log</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition whitespace-nowrap cursor-pointer ${
              selectedFilter === filter
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Vertical Timeline Card Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-8">
        {filteredGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-4">
            {/* Date Group Header */}
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></span>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                {group.dateGroup}
              </h3>
              <div className="flex-1 border-t border-slate-200/70"></div>
            </div>

            {/* Timeline Items under this Date */}
            <div className="relative pl-7 space-y-5 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative group">
                    {/* Node Icon on rail */}
                    <div
                      className={`absolute -left-7 top-1 w-6 h-6 rounded-full flex items-center justify-center ring-4 ring-white shadow-xs ${item.iconColor}`}
                    >
                      <Icon className="w-3 h-3" />
                    </div>

                    {/* Content Box */}
                    <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-xs transition">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-900">
                            {item.title}
                          </h4>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-slate-100/80">
                        {item.meta && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.metaColor}`}
                          >
                            {item.meta}
                          </span>
                        )}
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
                          Category: {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs italic">
            No activity records found for "{selectedFilter}"
          </div>
        )}

        {/* View More Activity Button */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => alert("All recorded platform events up to 30 days are loaded.")}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
          >
            <span>View More Activity</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
