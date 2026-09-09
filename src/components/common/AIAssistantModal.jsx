import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ArrowRight,
  Compass,
  AlertCircle,
  Briefcase,
  HelpCircle,
  Minimize2
} from "lucide-react";
import { getAIContextualResponse } from "../../data/careerIntelligence";

export default function AIAssistantModal({
  isOpen,
  onClose,
  onToggle,
  careerGoal,
  careerData,
  onNavigate
}) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hello Sachin! 👋 I'm your **SkillBridge AI Career Guide**.\n\nI analyze your profile against **${careerGoal}** industry benchmarks. Ask me about your readiness score, high-priority skill gaps, roadmap milestones, or matched internships!`,
      actionText: "View Current Roadmap",
      actionTarget: "roadmap"
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What should I learn next?",
    `Why is my readiness score ${careerData?.readinessScore || 82}%?`,
    `How can I improve my ${careerGoal} match?`,
    "What skills am I missing?",
    "Which internship should I apply for?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    // Add User message
    const userMsg = { sender: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    // Simulate AI cognitive lookup
    setTimeout(() => {
      const response = getAIContextualResponse(query, careerGoal, careerData);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: response.text,
          actionText: response.actionText,
          actionTarget: response.actionTarget
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            onClick={onToggle}
            className="flex items-center gap-2.5 px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group"
            aria-label="Open AI Career Assistant"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold tracking-wide">Ask SkillBridge</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
        )}
      </div>

      {/* Floating Slide-over / Modal Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[420px] max-h-[85vh] h-[600px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3.5 bg-linear-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-300">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                  Ask SkillBridge
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    AI Advisor
                  </span>
                </h3>
                <p className="text-[11px] text-slate-300">
                  Your personal career guide • <span className="text-blue-300 font-medium">{careerGoal}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
                title="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Question Prompt Chips */}
          <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[10.5px] font-semibold px-2.5 py-1 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 border border-slate-200 rounded-full shrink-0 transition shadow-2xs cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[84%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white font-medium rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text.split("\n").map((line, i) => {
                      // Simple markdown bold formatting support
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                      return (
                        <p
                          key={i}
                          className="mb-1.5 last:mb-0"
                          dangerouslySetInnerHTML={{ __html: formatted }}
                        />
                      );
                    })}
                  </div>

                  {msg.actionText && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => {
                          onClose();
                          onNavigate(msg.actionTarget);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg text-[11px] transition cursor-pointer"
                      >
                        <span>{msg.actionText}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                  <span className="text-[11px] text-slate-400 font-medium ml-1">Analyzing career profile...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about skills, gaps, readiness, jobs..."
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
              />
              <button
                type="submit"
                disabled={!inputVal.trim()}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  inputVal.trim()
                    ? "bg-[#1E60D5] hover:bg-blue-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
                title="Send Question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1">
              <span>SkillBridge Intelligence Engine v2.4</span>
              <span>Ready for real LLM webhook</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
