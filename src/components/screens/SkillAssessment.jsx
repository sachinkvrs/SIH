import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
  AlertCircle,
  BarChart3,
  Compass,
  RotateCcw,
  Check,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Zap,
  FileText,
  Target
} from "lucide-react";
import { getRoleData } from "../../data/roleCompetencies";

export default function SkillAssessment({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData,
  onRecordActivity,
  onNotify,
  onOpenRoleSelector
}) {
  // Assessment workflow stages: "instructions" | "quiz" | "review" | "results"
  const [stage, setStage] = useState("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedAt, setSubmittedAt] = useState(null);
  const [finalScoreResult, setFinalScoreResult] = useState(null);
  const [credentialHash, setCredentialHash] = useState(null);

  // Dynamically load active role data and tailored 15 diagnostic questions
  const activeRoleData = getRoleData(careerGoal);
  const questions = activeRoleData.assessmentQuestions || [];

  // Reset quiz state if role changes while on instructions
  useEffect(() => {
    if (stage === "instructions") {
      setAnswers({});
      setCurrentQuestionIndex(0);
    }
  }, [careerGoal, stage]);

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestionIndex] || questions[0];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (val) => {
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val
    }));
  };

  const isCurrentAnswered = currentQ && answers[currentQ.id] !== undefined && answers[currentQ.id] !== null;

  const handleNext = () => {
    // Strict validation: cannot advance without selecting an answer
    if (!isCurrentAnswered) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStage("review");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    const unAnsweredCount = totalQuestions - answeredCount;
    if (unAnsweredCount > 0) return; // Strict validation: blocked if incomplete

    // Calculate final score
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    setFinalScoreResult(finalScore);
    setCredentialHash(`SB-${careerGoal.replace(/\s+/g, "").toUpperCase().slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`);
    setSubmittedAt(new Date().toLocaleDateString());
    setStage("results");

    // Dynamic Activity Logging
    if (onRecordActivity) {
      onRecordActivity({
        id: `act-assess-${Date.now()}`,
        title: `Completed ${careerGoal} Skill Assessment`,
        time: "Just now",
        desc: `Scored ${finalScore}% across 15 technical evaluation questions. Results updated in your Skill Gap profile.`,
        meta: `Score: ${finalScore}%`,
        metaColor:
          finalScore >= 75
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : "bg-blue-50 text-blue-700 border-blue-200"
      });
    }

    // Notification Trigger
    if (onNotify) {
      onNotify({
        title: "Assessment Results Published",
        desc: `You scored ${finalScore}% on the ${careerGoal} benchmark. Review your updated skill gap priorities.`,
        targetScreen: "skill_gap",
        type: "Skills"
      });
    }
  };

  // 1. INSTRUCTIONS SCREEN
  if (stage === "instructions") {
    // Extract unique categories tested for this role
    const categoriesList = Array.from(new Set(questions.map((q) => q.category))).slice(0, 5);

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        {/* Breadcrumb Hierarchy */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Skill Assessment</span>
          <span>›</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Instructions</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800">
                  Target: {careerGoal}
                </span>

                {/* Target Role Selector Button */}
                {onOpenRoleSelector && (
                  <button
                    onClick={onOpenRoleSelector}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 transition cursor-pointer"
                    title="Change active target role benchmark"
                  >
                    <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>Change Target Role</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>
                )}

                <span className="text-xs text-slate-400">• Standardized Technical Benchmark</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1.5">
                {careerGoal} Competency Benchmark
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Discipline: <strong className="text-slate-700 dark:text-slate-300">{activeRoleData.domainName}</strong> • Category: {activeRoleData.category}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>15 Questions • ~20 Mins</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              This adaptive diagnostic tests hands-on proficiency across key industry requirements for <strong>{careerGoal}</strong>. Results will calibrate your <strong>Industry Readiness Score</strong>, detect exact <strong>Skill Gaps</strong>, and tailor your personalized <strong>Learning Roadmap</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1">
                <span className="text-xs font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  15 Technical Questions
                </span>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-normal">
                  Covers: {categoriesList.join(", ")}.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/50 space-y-1">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Skill Passport Verification
                </span>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-normal">
                  Scoring above 75% unlocks verified credential badges for employer partner pipelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 space-y-1">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Direct Roadmap Action
                </span>
                <p className="text-[11.5px] text-slate-600 dark:text-slate-400 leading-normal">
                  Identified weaknesses automatically queue matching industrial experiments and coursework.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-950 dark:text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Assessment Instructions & Integrity Rules:
              </span>
              <ul className="list-disc pl-5 space-y-1 text-[11.5px] text-amber-800 dark:text-amber-300/90">
                <li>Every question is mandatory and marked with a red asterisk (<span className="text-rose-600 font-bold">*</span>).</li>
                <li><strong>The Next button is disabled</strong> until an answer choice is selected for the active question.</li>
                <li>You can navigate back with the <strong>Previous</strong> button at any time without losing already answered selections.</li>
                <li>Final submission is strictly blocked in the Review stage until all 15 questions are answered.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              ← Back to Dashboard
            </button>

            <button
              onClick={() => setStage("quiz")}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin {careerGoal} Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. QUIZ QUESTIONS SCREEN
  if (stage === "quiz") {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        {/* Level 2 Breadcrumb & Back */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
              Dashboard
            </button>
            <span>›</span>
            <button
              onClick={() => setStage("instructions")}
              className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
              Skill Assessment
            </button>
            <span>›</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          <button
            onClick={() => setStage("review")}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Review All Answers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Question Navigator Strip (1 ✓, 2 ✓, 3 ●, 4 ○ ...) */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700 dark:text-slate-300">Question Navigator:</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
                {careerGoal}
              </span>
            </div>
            <span className="text-slate-500 dark:text-slate-400 font-semibold">
              {answeredCount} of {totalQuestions} Answered ({progressPercent}%)
            </span>
          </div>

          {/* 15 Question Navigator Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null;
              const isCurrent = idx === currentQuestionIndex;

              let btnClass =
                "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600";
              if (isCurrent) {
                btnClass = "border-blue-600 bg-blue-600 text-white font-bold shadow-xs ring-2 ring-blue-400/30";
              } else if (isAnswered) {
                btnClass =
                  "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 rounded-xl border text-xs flex items-center justify-center transition cursor-pointer ${btnClass}`}
                  title={`Question ${idx + 1}: ${q.category} ${isAnswered ? "(Answered: " + answers[q.id] + ")" : "(Pending)"}`}
                >
                  {isAnswered && !isCurrent ? (
                    <span className="text-[11px]">✓ {idx + 1}</span>
                  ) : isCurrent ? (
                    <span className="text-[11px]">● {idx + 1}</span>
                  ) : (
                    <span className="text-[11px]">○ {idx + 1}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Question Card */}
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          {/* Question Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-md border border-blue-200 dark:border-blue-800">
                {currentQ.category}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-md">
                {currentQ.difficulty}
              </span>
            </div>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Question Title & Scenario with Required Asterisk */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
              {currentQ.question} <span className="text-rose-500 font-bold ml-0.5" title="Required response">*</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {currentQ.description}
            </p>
          </div>

          {/* Multiple-Choice Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className={`flex items-center justify-between p-4 min-h-[56px] rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs ring-1 ring-blue-600/30"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800/70"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium leading-relaxed ${
                        isSelected
                          ? "text-blue-950 dark:text-blue-200 font-bold"
                          : "text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Helper hint when unanswered */}
          {!isCurrentAnswered && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Please select an option to enable Next.</span>
            </p>
          )}

          {/* Workflow Level 3 Navigation Bar (Strict Validation Bug Fix: Next disabled until answered) */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentQuestionIndex === 0
                  ? "bg-slate-100 dark:bg-slate-800/50 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-200 dark:border-slate-800"
                  : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStage("review")}
                className="hidden sm:inline-block px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Review Answers
              </button>

              <button
                onClick={handleNext}
                disabled={!isCurrentAnswered}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition min-h-[42px] ${
                  isCurrentAnswered
                    ? "bg-[#1E60D5] hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700"
                }`}
                title={!isCurrentAnswered ? "Select an answer to proceed" : ""}
              >
                <span>
                  {currentQuestionIndex === totalQuestions - 1 ? "Review Answers →" : "Next"}
                </span>
                {currentQuestionIndex < totalQuestions - 1 && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. REVIEW ANSWERS STAGE (Submit blocked if any unanswered)
  if (stage === "review") {
    const unAnsweredCount = totalQuestions - answeredCount;

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <button
            onClick={() => setStage("quiz")}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Skill Assessment
          </button>
          <span>›</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">Review Answers</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Review Your Responses: {careerGoal}
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Check your answers before final submission. All 15 questions must be answered.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800">
                {answeredCount} Answered
              </span>
              {unAnsweredCount > 0 && (
                <span className="px-3 py-1 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-lg border border-rose-200 dark:border-rose-800">
                  {unAnsweredCount} Unanswered
                </span>
              )}
            </div>
          </div>

          {/* Warning Banner if Unanswered */}
          {unAnsweredCount > 0 && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                Submission is locked. You have {unAnsweredCount} unanswered question{unAnsweredCount > 1 ? "s" : ""}. Please answer all required questions before final submission. Click on any unanswered question below to jump directly to it.
              </span>
            </div>
          )}

          {/* Review Question Cards List */}
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const selectedVal = answers[q.id];
              const isAnswered = selectedVal !== undefined && selectedVal !== null;

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setStage("quiz");
                  }}
                  className={`p-3.5 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                    isAnswered
                      ? "border-slate-200/80 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 bg-slate-50/30 dark:bg-slate-800/40"
                      : "border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-400"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isAnswered
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300"
                          : "bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-black"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">• {q.difficulty}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                        {q.question} <span className="text-rose-500 font-bold">*</span>
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs">
                    {isAnswered ? (
                      <span className="px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold rounded-md border border-emerald-200 dark:border-emerald-800 text-[11px]">
                        Choice: {selectedVal}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold rounded-md border border-rose-200 dark:border-rose-800 text-[11px]">
                        Not Answered
                      </span>
                    )}
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-xs hover:underline">
                      {isAnswered ? "Edit →" : "Answer Now →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setStage("quiz")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Questions</span>
            </button>

            <button
              onClick={handleSubmitAssessment}
              disabled={unAnsweredCount > 0}
              className={`w-full sm:w-auto px-7 py-2.5 rounded-xl text-xs font-bold shadow-xs transition flex items-center justify-center gap-2 min-h-[42px] ${
                unAnsweredCount === 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed border border-slate-300 dark:border-slate-700"
              }`}
              title={unAnsweredCount > 0 ? "Complete all questions before submitting" : ""}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {unAnsweredCount === 0
                  ? "Submit Assessment & Verify Passport →"
                  : `Submit Disabled (${unAnsweredCount} Incomplete)`}
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. RESULTS STAGE (Phase 5 Requirement: Assessment → Results → Skill Gap)
  if (stage === "results") {
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) correctCount += 1;
    });
    const finalScore = finalScoreResult !== null ? finalScoreResult : Math.round((correctCount / totalQuestions) * 100);

    // Compute dynamic category scores based on active questions
    const categoriesMap = {};
    questions.forEach((q) => {
      if (!categoriesMap[q.category]) {
        categoriesMap[q.category] = { total: 0, correct: 0 };
      }
      categoriesMap[q.category].total += 1;
      if (answers[q.id] === q.correct) {
        categoriesMap[q.category].correct += 1;
      }
    });

    const categoryBreakdown = Object.keys(categoriesMap).map((catName) => {
      const { total, correct } = categoriesMap[catName];
      const catScore = Math.round((correct / total) * 100);
      let status = "Competent";
      let color = "bg-blue-600";
      if (catScore >= 80) {
        status = "Strong";
        color = "bg-emerald-500";
      } else if (catScore < 60) {
        status = "Needs Improvement";
        color = "bg-rose-500";
      }
      return { name: catName, score: catScore, status, color };
    });

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-bold">Skill Assessment</span>
          <span>›</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">Results</span>
        </div>

        <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          {/* Header Badge */}
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Assessment Completed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Your competency evaluation for <strong>{careerGoal}</strong> ({activeRoleData.domainName}) has been recorded and calibrated against verified employer benchmarks.
            </p>
          </div>

          {/* Score Card Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Verified Benchmark Score
              </span>
              <div className="flex items-baseline gap-3 justify-center sm:justify-start">
                <span className="text-4xl sm:text-5xl font-black text-white">{finalScore}%</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {finalScore >= 75 ? "Industry Ready" : "Foundational"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Correct Answers: {correctCount} of {totalQuestions} • Verified on {submittedAt || "Today"}
              </p>
            </div>

            <div className="shrink-0 text-center sm:text-right space-y-2">
              <span className="text-[11px] text-slate-300 block">Credential Hash:</span>
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 block">
                {credentialHash || `SB-${careerGoal.replace(/\s+/g, "").toUpperCase().slice(0, 4)}-884920`}
              </span>
              <span className="text-[10.5px] text-emerald-400 block font-semibold">
                ✓ Synced to Digital Skill Passport
              </span>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Competency Breakdown & Priority Focus Areas:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {categoryBreakdown.map((cat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{cat.name}</span>
                    <span className="font-black text-slate-900 dark:text-white">{cat.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>
                      Status: <strong className="text-slate-700 dark:text-slate-300">{cat.status}</strong>
                    </span>
                    {cat.score < 70 && (
                      <span className="text-rose-600 dark:text-rose-400 font-bold">Action Recommended</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action: Logical Transition to Skill Gap Analysis */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Dashboard Overview
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate("roadmap")}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Go to Roadmap
              </button>

              <button
                onClick={() => onNavigate("skill_gap")}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
              >
                <span>View Skill Gap Analysis →</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
