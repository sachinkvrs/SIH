import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  Check,
  Compass,
  Code,
  Cpu,
  Zap,
  Wrench,
  Building2,
  Briefcase,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Target
} from "lucide-react";
import {
  DOMAINS_LIST,
  ROLE_CATEGORIES,
  ROLE_COMPETENCIES,
  getRolesByCategory
} from "../../data/roleCompetencies";

const DOMAIN_ICONS = {
  cs_it: Code,
  ece: Cpu,
  eee: Zap,
  mech: Wrench,
  civil: Building2,
  mgmt: Briefcase,
  comm: TrendingUp
};

export default function TargetRoleSelectorModal({
  isOpen,
  onClose,
  currentRole = "Data Analyst",
  userDomain = "cs_it",
  onSelectRole
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomainFilter, setSelectedDomainFilter] = useState("all");

  const allRoles = useMemo(() => Object.values(ROLE_COMPETENCIES), []);

  const filteredRoles = useMemo(() => {
    return allRoles.filter((role) => {
      const matchesSearch =
        !searchQuery.trim() ||
        role.roleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.domainName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        role.skillGaps.some((g) => g.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDomain =
        selectedDomainFilter === "all" || role.domainId === selectedDomainFilter;

      return matchesSearch && matchesDomain;
    });
  }, [allRoles, searchQuery, selectedDomainFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/50">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Select Your Target Career Goal
                <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                  Personalization Engine
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Switching your target role personalizes benchmarks, skill gap diagnostics, roadmap milestones, and opportunity match scores.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Domain Filter Bar */}
        <div className="p-6 pb-3 border-b border-slate-100 dark:border-slate-800/80 space-y-4 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role name, engineering discipline, or key skill (e.g., Embedded, Power, CAD, SQL, DCF, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Domain Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            <button
              onClick={() => setSelectedDomainFilter("all")}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition cursor-pointer ${
                selectedDomainFilter === "all"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700"
              }`}
            >
              All Domains ({allRoles.length})
            </button>
            {DOMAINS_LIST.map((domain) => {
              const IconComp = DOMAIN_ICONS[domain.id] || Compass;
              const isSelected = selectedDomainFilter === domain.id;
              const isUserDomain = userDomain === domain.id;

              return (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomainFilter(domain.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold shrink-0 transition cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{domain.shortName}</span>
                  {isUserDomain && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Your academic domain" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Roles Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-[58vh]">
          {filteredRoles.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Compass className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No matching career roles found
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Try searching for another keyword or reset the domain filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDomainFilter("all");
                }}
                className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredRoles.map((role) => {
                const isCurrent = currentRole.toLowerCase() === role.roleName.toLowerCase();
                const IconComp = DOMAIN_ICONS[role.domainId] || Compass;
                const isRecommendedForDomain = role.domainId === userDomain;

                return (
                  <div
                    key={role.roleName}
                    onClick={() => {
                      onSelectRole(role.roleName);
                      onClose();
                    }}
                    className={`group relative p-5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between ${
                      isCurrent
                        ? "border-blue-600 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-500/30 shadow-md"
                        : "border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md"
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <IconComp className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                            {role.domainName}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100/70 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400">
                            {role.category}
                          </span>
                        </div>

                        {isCurrent ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs">
                            <Check className="w-3 h-3" />
                            Active Goal
                          </span>
                        ) : isRecommendedForDomain ? (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <Sparkles className="w-2.5 h-2.5 text-emerald-500" />
                            Domain Recommended
                          </span>
                        ) : null}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {role.roleName}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {role.readinessSummary}
                      </p>

                      {/* Core Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {role.skillGaps.map((gap) => (
                          <span
                            key={gap.id}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                          >
                            {gap.name} ({gap.required}%)
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-400">Baseline Readiness:</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {role.readinessScore}%
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
                        <span>{isCurrent ? "Currently Selected" : "Select Role"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="px-6 py-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>
            Mode A: Free cross-domain discovery enabled. Mode B: Recommendations prioritize selected goal.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-bold transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
