import React from "react";

export default function BrandLogo({ variant = "light", size = "md" }) {
  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* SkillBridge Geometric Symbol */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-sm p-1">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white"
        >
          {/* Stylized bridge arch and node connections */}
          <path d="M4 19h16" />
          <path d="M4 15c4-7 12-7 16 0" />
          <circle cx="12" cy="7" r="2.5" fill="white" />
          <line x1="8" y1="14" x2="8" y2="19" />
          <line x1="16" y1="14" x2="16" y2="19" />
          <line x1="12" y1="9.5" x2="12" y2="19" />
        </svg>
      </div>

      <div className="flex flex-col text-left leading-tight">
        <span
          className={`font-extrabold tracking-tight ${
            size === "lg" ? "text-xl" : "text-base"
          }`}
        >
          <span className="text-[#FF3B4E]">Skill</span><span className="text-blue-600">Bridge</span>
        </span>
        <span
          className={`text-[9.5px] font-semibold tracking-wider uppercase ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Academia • Industry • Future
        </span>
      </div>
    </div>
  );
}
