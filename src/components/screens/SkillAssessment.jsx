import React, { useState } from "react";
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
  ShieldCheck,
  Zap,
  FileText
} from "lucide-react";

export default function SkillAssessment({
  onNavigate,
  careerGoal = "Data Analyst",
  careerData,
  onRecordActivity,
  onNotify
}) {
  // Assessment workflow stages: "instructions" | "quiz" | "review" | "results"
  const [stage, setStage] = useState("instructions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedAt, setSubmittedAt] = useState(null);

  // 15 Comprehensive Assessment Questions (Tailored for Data Analyst / AI competencies)
  const questions = [
    {
      id: 1,
      category: "SQL Fundamentals",
      difficulty: "Beginner",
      question: "Which SQL clause is used to filter group summary results after an aggregation function has been applied?",
      description: "Select the correct ANSI-standard SQL keyword for conditional aggregation.",
      options: [
        { value: "WHERE", label: "WHERE — Filters individual rows prior to grouping" },
        { value: "HAVING", label: "HAVING — Filters aggregated row groups created by GROUP BY" },
        { value: "ORDER BY", label: "ORDER BY — Sorts output in ascending or descending sequence" },
        { value: "GROUP FILTER", label: "GROUP FILTER — Non-standard proprietary keyword" }
      ],
      correct: "HAVING"
    },
    {
      id: 2,
      category: "SQL Joins",
      difficulty: "Intermediate",
      question: "What will a FULL OUTER JOIN return when executed between two tables?",
      description: "Identify how non-matching foreign and primary key records are evaluated.",
      options: [
        { value: "A", label: "Only matching rows present in both the left and right tables" },
        { value: "B", label: "All rows from the left table, with nulls for non-matching right table columns" },
        { value: "C", label: "All rows from both tables, filling with NULL where join conditions do not match" },
        { value: "D", label: "A Cartesian product of all rows regardless of join predicates" }
      ],
      correct: "C"
    },
    {
      id: 3,
      category: "Advanced SQL",
      difficulty: "Intermediate",
      question: "How do Common Table Expressions (CTEs) defined using the WITH clause improve complex querying?",
      description: "Evaluate readability, recursiveness, and temporary table optimization.",
      options: [
        { value: "A", label: "They physically index the underlying disk storage permanently" },
        { value: "B", label: "They provide modular, readable named subquery blocks that can be referenced or recursive" },
        { value: "C", label: "They automatically disable ACID compliance for faster throughput" },
        { value: "D", label: "They convert relational tables directly into unstructured JSON files" }
      ],
      correct: "B"
    },
    {
      id: 4,
      category: "Advanced SQL",
      difficulty: "Advanced",
      question: "Which Window Function assigns rank without gaps when two rows have identical tie values?",
      description: "Distinguish between RANK(), DENSE_RANK(), and ROW_NUMBER().",
      options: [
        { value: "A", label: "ROW_NUMBER() — Guarantees unique sequential integers regardless of ties" },
        { value: "B", label: "RANK() — Leaves gaps in ranking sequence after ties (e.g., 1, 2, 2, 4)" },
        { value: "C", label: "DENSE_RANK() — Assigns consecutive ranks without skipped numbers (e.g., 1, 2, 2, 3)" },
        { value: "D", label: "NTILE() — Divides rows into specified buckets" }
      ],
      correct: "C"
    },
    {
      id: 5,
      category: "Python Data Manipulation",
      difficulty: "Beginner",
      question: "In Pandas, what is the primary difference between df.loc[] and df.iloc[]?",
      description: "Analyze indexer syntax for series and dataframe slicing.",
      options: [
        { value: "A", label: "df.loc is label-based selection, whereas df.iloc is integer position-based" },
        { value: "B", label: "df.loc only works on columns, while df.iloc only works on rows" },
        { value: "C", label: "df.iloc requires SQL syntax, while df.loc uses standard Python" },
        { value: "D", label: "There is no difference; they are interchangeable aliases" }
      ],
      correct: "A"
    },
    {
      id: 6,
      category: "Python Data Manipulation",
      difficulty: "Intermediate",
      question: "Which Pandas method is best suited to pivot wide categorical columns into long tidy key-value format?",
      description: "Selecting transformation routines for normalized data pipelines.",
      options: [
        { value: "A", label: "pd.concat() with axis=1" },
        { value: "B", label: "pd.melt() — Unpivots DataFrame from wide to long format" },
        { value: "C", label: "df.to_records()" },
        { value: "D", label: "df.fillna() with method='ffill'" }
      ],
      correct: "B"
    },
    {
      id: 7,
      category: "Business Intelligence (Power BI)",
      difficulty: "Intermediate",
      question: "In Power BI DAX, what is the fundamental purpose of the CALCULATE() function?",
      description: "Understanding filter context modification in tabular analytical models.",
      options: [
        { value: "A", label: "It merely sums numerical columns similar to basic arithmetic" },
        { value: "B", label: "It evaluates an expression under modified, newly injected filter contexts" },
        { value: "C", label: "It imports external CSV files into Power Query" },
        { value: "D", label: "It renders bar charts directly inside canvas visuals" }
      ],
      correct: "B"
    },
    {
      id: 8,
      category: "Business Intelligence (Power BI)",
      difficulty: "Intermediate",
      question: "What distinguishes Star Schema from Snowflake Schema in analytical data warehouse modeling?",
      description: "Evaluating dimension normalization and query join performance.",
      options: [
        { value: "A", label: "Star Schema denormalizes dimensions into single tables; Snowflake normalizes dimensions" },
        { value: "B", label: "Star Schema does not support numerical measure calculations" },
        { value: "C", label: "Snowflake Schema eliminates fact tables completely" },
        { value: "D", label: "Star Schema is strictly reserved for NoSQL graph databases" }
      ],
      correct: "A"
    },
    {
      id: 9,
      category: "Statistics & EDA",
      difficulty: "Intermediate",
      question: "When analyzing right-skewed salary data with severe high-end outliers, which central metric is most resilient?",
      description: "Evaluating central tendency sensitivity to extreme distributions.",
      options: [
        { value: "A", label: "Arithmetic Mean — Pulled strongly toward high outliers" },
        { value: "B", label: "Median (50th Percentile) — Non-parametric and robust against outliers" },
        { value: "C", label: "Range — Maximally affected by extreme ends" },
        { value: "D", label: "Standard Deviation — Amplified quadratically by outliers" }
      ],
      correct: "B"
    },
    {
      id: 10,
      category: "Statistics & EDA",
      difficulty: "Intermediate",
      question: "What statistical pitfall does Simpson's Paradox describe in aggregated datasets?",
      description: "Understanding confounding variables across demographic cohorts.",
      options: [
        { value: "A", label: "Correlation coefficient exceeding +1.0 in normalized models" },
        { value: "B", label: "A trend appearing in subgroups disappears or reverses when groups are combined" },
        { value: "C", label: "Machine learning models overfitting training sets prematurely" },
        { value: "D", label: "Null hypotheses rejected when p-value is greater than 0.05" }
      ],
      correct: "B"
    },
    {
      id: 11,
      category: "Data Modeling & Architecture",
      difficulty: "Advanced",
      question: "In dimensional modeling, what is a Slowly Changing Dimension Type 2 (SCD Type 2)?",
      description: "Preserving historical record tracking in analytical data marts.",
      options: [
        { value: "A", label: "Overwrites previous attributes directly with no audit history retained" },
        { value: "B", label: "Creates a new row with start/end effective dates and an active current flag" },
        { value: "C", label: "Deletes obsolete records permanently upon receiving update signals" },
        { value: "D", label: "Appends new columns dynamically for each historical modification" }
      ],
      correct: "B"
    },
    {
      id: 12,
      category: "Data Cleaning & Quality",
      difficulty: "Intermediate",
      question: "Which technique is most appropriate to detect multidimensional anomalies in continuous sensor telemetry?",
      description: "Identifying statistical and algorithmic outlier mitigation techniques.",
      options: [
        { value: "A", label: "Z-score univariate clipping on one single feature" },
        { value: "B", label: "Isolation Forest or Mahalanobis distance accounting for covariance" },
        { value: "C", label: "Replacing all values above zero with missing NaN tokens" },
        { value: "D", label: "One-hot encoding all continuous floats" }
      ],
      correct: "B"
    },
    {
      id: 13,
      category: "Data Storytelling & Reporting",
      difficulty: "Beginner",
      question: "Which chart type is best suited to display cumulative contributions of positive and negative cash flows?",
      description: "Choosing appropriate executive-level financial and metric visual charts.",
      options: [
        { value: "A", label: "Pie Chart with 20 categorical slices" },
        { value: "B", label: "Waterfall Chart illustrating incremental positive and negative transitions" },
        { value: "C", label: "Radar Chart with overlapping polylines" },
        { value: "D", label: "3D Concentric Donut Visual" }
      ],
      correct: "B"
    },
    {
      id: 14,
      category: "Metrics & Business KPIs",
      difficulty: "Intermediate",
      question: "How is Customer Churn Rate calculated over a defined monthly billing cycle?",
      description: "Evaluating SaaS cohort retention metrics.",
      options: [
        { value: "A", label: "(Lost Customers during Period) / (Total Customers at Start of Period) × 100%" },
        { value: "B", label: "(New Customers Acquired) / (Total Operational Expenses) × 100%" },
        { value: "C", label: "(Average Revenue Per User) × (Customer Lifetime in Months)" },
        { value: "D", label: "(Total Website Pageviews) / (Unique Conversions) × 100%" }
      ],
      correct: "A"
    },
    {
      id: 15,
      category: "Applied Capstone Scenario",
      difficulty: "Advanced",
      question: "An executive reports that dashboard metrics are 24 hours stale. Where in the data pipeline should you investigate first?",
      description: "Root cause diagnosis across ingestion, ETL scheduling, and visual cache.",
      options: [
        { value: "A", label: "Immediately delete all production database backup snapshots" },
        { value: "B", label: "Check automated pipeline orchestration logs (Airflow/dbt/Data Factory) for failed batch jobs" },
        { value: "C", label: "Rewrite all frontend CSS styling templates" },
        { value: "D", label: "Instruct users to clear their personal browser cookies" }
      ],
      correct: "B"
    }
  ];

  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (val) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: val
    }));
  };

  const handleNext = () => {
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
    // Calculate final score
    let correctCount = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct) {
        correctCount += 1;
      }
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);
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
        metaColor: finalScore >= 75 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-blue-50 text-blue-700 border-blue-200"
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
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        {/* Breadcrumb Hierarchy */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 font-bold">Skill Assessment</span>
          <span>›</span>
          <span className="text-blue-600 font-bold">Instructions</span>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                  Target: {careerGoal}
                </span>
                <span className="text-xs text-slate-400">• Standardized Technical Benchmark</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                Competency Assessment & Verification
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>15 Questions • ~15–20 Mins</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              This adaptive diagnostic tests hands-on proficiency across key industry requirements for <strong>{careerGoal}</strong>. Results will calibrate your <strong>Industry Readiness Score</strong>, detect exact <strong>Skill Gaps</strong>, and tailor your personalized <strong>Learning Roadmap</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  15 Multiple-Choice Questions
                </span>
                <p className="text-[11.5px] text-slate-600">
                  Covers SQL, Python, Power BI, Statistics, and Data Architecture scenarios.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100 space-y-1">
                <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  Skill Passport Verification
                </span>
                <p className="text-[11.5px] text-slate-600">
                  Scoring above 75% unlocks verified credential badges for employer portfolios.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  Direct Roadmap Action
                </span>
                <p className="text-[11.5px] text-slate-600">
                  Identified weaknesses automatically queue matching tutorials and practice projects.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Assessment Guidelines:
              </span>
              <ul className="list-disc pl-5 space-y-0.5 text-[11.5px] text-amber-800">
                <li>You can navigate back and forth freely between questions without losing answers.</li>
                <li>You can review and modify your answers before final submission.</li>
                <li>Submitting will take you directly to your personalized <strong>Skill Gap Analysis</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              ← Back to Dashboard
            </button>

            <button
              onClick={() => setStage("quiz")}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Begin Assessment</span>
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
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Dashboard
            </button>
            <span>›</span>
            <button
              onClick={() => setStage("instructions")}
              className="hover:text-blue-600 cursor-pointer"
            >
              Skill Assessment
            </button>
            <span>›</span>
            <span className="text-blue-600 font-bold">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          <button
            onClick={() => setStage("review")}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Review All Answers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Question Navigator Strip (Phase 5 Requirement: 1 ✓, 2 ✓, 3 ●, 4 ○ ...) */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Question Navigator:</span>
            <span className="text-slate-500 font-semibold">
              {answeredCount} of {totalQuestions} Answered ({progressPercent}%)
            </span>
          </div>

          {/* 15 Question Navigator Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              let btnClass = "border-slate-200 text-slate-600 bg-white hover:border-slate-300";
              if (isCurrent) {
                btnClass = "border-blue-600 bg-blue-600 text-white font-bold shadow-xs ring-2 ring-blue-400/30";
              } else if (isAnswered) {
                btnClass = "border-emerald-300 bg-emerald-50 text-emerald-700 font-bold";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`h-9 rounded-xl border text-xs flex items-center justify-center transition cursor-pointer ${btnClass}`}
                  title={`Question ${idx + 1}: ${q.category} ${isAnswered ? "(Answered)" : "(Pending)"}`}
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
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Main Question Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Question Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-200">
                {currentQ.category}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
                {currentQ.difficulty}
              </span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>

          {/* Question Title & Scenario */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
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
                      ? "border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600/30"
                      : "border-slate-200 hover:border-slate-300 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium leading-relaxed ${
                        isSelected ? "text-blue-950 font-bold" : "text-slate-700"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Workflow Level 3 Navigation Bar (Phase 5 Requirement: Back disabled on Q1, Next becomes Review on Q15) */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100 gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentQuestionIndex === 0
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-xs"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setStage("review")}
                className="hidden sm:inline-block px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Review Answers
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer min-h-[42px]"
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

  // 3. REVIEW ANSWERS STAGE (Phase 5 Requirement)
  if (stage === "review") {
    const unAnsweredCount = totalQuestions - answeredCount;

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <button
            onClick={() => setStage("quiz")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Skill Assessment
          </button>
          <span>›</span>
          <span className="text-blue-600 font-bold">Review Answers</span>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Review Your Assessment Responses
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Check your answers before final submission. You can click any question to review or edit.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
                {answeredCount} Answered
              </span>
              {unAnsweredCount > 0 && (
                <span className="px-3 py-1 bg-rose-50 text-rose-700 rounded-lg border border-rose-200">
                  {unAnsweredCount} Unanswered
                </span>
              )}
            </div>
          </div>

          {/* Review Question Cards List */}
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const selectedVal = answers[q.id];
              const isAnswered = selectedVal !== undefined;

              return (
                <div
                  key={q.id}
                  onClick={() => {
                    setCurrentQuestionIndex(idx);
                    setStage("quiz");
                  }}
                  className="p-3.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-slate-50/50 transition cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                        isAnswered
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-500">{q.category}</span>
                        <span className="text-[10px] text-slate-400">• {q.difficulty}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5 line-clamp-1">
                        {q.question}
                      </h4>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 text-xs">
                    {isAnswered ? (
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold rounded-md border border-emerald-200 text-[11px]">
                        Option {selectedVal}
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 bg-rose-50 text-rose-700 font-bold rounded-md border border-rose-200 text-[11px]">
                        Not Answered
                      </span>
                    )}
                    <span className="text-blue-600 font-semibold text-xs hover:underline">
                      Edit →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => setStage("quiz")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>← Back to Questions</span>
            </button>

            <button
              onClick={handleSubmitAssessment}
              className="w-full sm:w-auto px-7 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Assessment →</span>
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
    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    const categoryBreakdown = [
      { name: "SQL & Advanced Queries", score: 85, status: "Strong", color: "bg-emerald-500" },
      { name: "Python Data Wrangling", score: 80, status: "Good", color: "bg-blue-600" },
      { name: "Power BI & Data Modeling", score: 55, status: "Needs Improvement", color: "bg-rose-500" },
      { name: "Statistics & Exploratory Analysis", score: 75, status: "Competent", color: "bg-indigo-600" },
      { name: "Business Architecture & KPIs", score: 70, status: "Competent", color: "bg-amber-500" }
    ];

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <button
            onClick={() => onNavigate("student_dashboard")}
            className="hover:text-blue-600 cursor-pointer"
          >
            Dashboard
          </button>
          <span>›</span>
          <span className="text-slate-900 font-bold">Skill Assessment</span>
          <span>›</span>
          <span className="text-emerald-600 font-bold">Results</span>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          {/* Header Badge */}
          <div className="text-center max-w-lg mx-auto space-y-2">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-xs">
              <Award className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Assessment Completed!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Your competency evaluation for <strong>{careerGoal}</strong> has been recorded and verified on your Digital Skill Passport.
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
                  {finalScore >= 75 ? "Proficient" : "Foundational"}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Correct Answers: {correctCount} of {totalQuestions} • Verified on {submittedAt || "Today"}
              </p>
            </div>

            <div className="shrink-0 text-center sm:text-right space-y-2">
              <span className="text-[11px] text-slate-300 block">Credential Identifier:</span>
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 block">
                SB-ASSESS-2026-8821
              </span>
              <span className="text-[10.5px] text-emerald-400 block font-semibold">
                ✓ Recorded in Activity Timeline
              </span>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">
              Competency Breakdown & Priority Focus Areas:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {categoryBreakdown.map((cat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{cat.name}</span>
                    <span className="font-black text-slate-900">{cat.score}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full rounded-full`} style={{ width: `${cat.score}%` }} />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Status: <strong className="text-slate-700">{cat.status}</strong></span>
                    {cat.score < 70 && (
                      <span className="text-rose-600 font-bold">Action Recommended</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action: Logical Transition to Skill Gap Analysis (Phase 5 Requirement) */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onNavigate("student_dashboard")}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
            >
              Dashboard Overview
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onNavigate("skill_passport")}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
              >
                View Skill Passport
              </button>

              {/* Logical Next Step: View Skill Gap Analysis */}
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
