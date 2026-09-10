import React, { useState, useEffect } from "react";
import BrandLogo from "../common/BrandLogo";
import {
  ArrowRight,
  GraduationCap,
  Building2,
  BookOpen,
  School,
  CheckCircle2,
  Search,
  BookMarked,
  TrendingUp,
  Briefcase,
  Award,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export default function LandingPage({ onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", role: "Student" });

  // Smooth scroll handler
  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "features", "about", "how-it-works", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const audienceCards = [
    {
      title: "For Students",
      desc: "Build your skills and find opportunities",
      icon: GraduationCap,
      color: "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400 border-pink-100 dark:border-pink-900/40",
      iconBg: "bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400",
      target: "student_dashboard",
    },
    {
      title: "For Industries",
      desc: "Find the right talent and collaborate",
      icon: Building2,
      color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/40",
      iconBg: "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400",
      target: "industry_dashboard",
    },
    {
      title: "For Academicians",
      desc: "Explore internships, FDPs and research",
      icon: BookOpen,
      color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40",
      iconBg: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
      target: "industry_collaboration",
    },
    {
      title: "For Institutions",
      desc: "Track progress and bridge the skill gap",
      icon: School,
      color: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/40",
      iconBg: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
      target: "institution_analytics",
    },
  ];

  const steps = [
    {
      title: "Assess",
      subtitle: "Evaluate your skills",
      icon: CheckCircle2,
    },
    {
      title: "Analyze",
      subtitle: "Find skill gaps",
      icon: Search,
    },
    {
      title: "Learn",
      subtitle: "Get personalized recommendations",
      icon: BookMarked,
    },
    {
      title: "Improve",
      subtitle: "Build in-demand skills",
      icon: TrendingUp,
    },
    {
      title: "Match",
      subtitle: "Get relevant opportunities",
      icon: Briefcase,
    },
    {
      title: "Get Hired",
      subtitle: "Start your career",
      icon: Award,
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: "", email: "", message: "", role: "Student" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1220] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-white/95 dark:bg-[#0B1220]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="cursor-pointer" onClick={() => scrollToSection("home")}>
            <BrandLogo size="md" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => scrollToSection("home")}
              className={`transition font-semibold ${
                activeSection === "home" ? "text-blue-600 dark:text-blue-400 font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`transition font-semibold ${
                activeSection === "about" ? "text-blue-600 dark:text-blue-400 font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className={`transition font-semibold ${
                activeSection === "features" ? "text-blue-600 dark:text-blue-400 font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className={`transition font-semibold ${
                activeSection === "how-it-works" ? "text-blue-600 dark:text-blue-400 font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`transition font-semibold ${
                activeSection === "contact" ? "text-blue-600 dark:text-blue-400 font-bold" : "hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate("login")}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-300 dark:border-slate-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition cursor-pointer"
            >
              Login
            </button>
            <button
              onClick={() => onNavigate("login")}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1E60D5] hover:bg-blue-700 rounded-lg shadow-sm transition cursor-pointer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-[#111827] border-b border-slate-200 dark:border-slate-800 px-6 py-4 space-y-3 shadow-lg">
            <div className="flex flex-col space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <button
                onClick={() => scrollToSection("home")}
                className="text-left py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left py-1.5 hover:text-blue-600 dark:hover:text-blue-400"
              >
                Contact
              </button>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => onNavigate("login")}
                className="flex-1 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-center hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("login")}
                className="flex-1 py-2 text-xs font-semibold text-white bg-[#1E60D5] rounded-lg text-center shadow-xs"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section (#home) */}
      <section id="home" className="py-12 lg:py-16 px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.18]">
              Bridging the Gap <br className="hidden sm:inline" />
              Between Academia <br className="hidden sm:inline" />
              and Industry
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
              Assess skills. Identify gaps. Build industry readiness. Connect talent with opportunity.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => onNavigate("login")}
                className="flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#1E60D5] hover:bg-blue-700 rounded-lg shadow-md transition cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("opportunities")}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg shadow-xs transition cursor-pointer"
              >
                Explore Opportunities
              </button>
            </div>
          </div>

          {/* Hero Right Image & Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80"
                alt="Students collaborating"
                className="w-full h-72 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-white/40 dark:border-slate-700/60 text-[11px] font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Skills • Careers • Opportunities • A Better Tomorrow</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Audience Cards Grid (#features) */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 scroll-mt-24">
          {audienceCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => onNavigate(card.target)}
                className="bg-white dark:bg-[#111827] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center mb-3.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                    {card.desc}
                  </p>
                </div>
                <div className="pt-4 flex items-center text-blue-600 dark:text-blue-400 text-xs font-semibold group-hover:translate-x-1 transition">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Banner Strip (#about) */}
      <section id="about" className="bg-white dark:bg-[#111827] border-y border-slate-200/80 dark:border-slate-800 py-10 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase bg-blue-50 dark:bg-blue-950/50 px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/50">
              About SkillBridge
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-2">
              A unified platform for a skilled, future-ready workforce.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-2 leading-relaxed">
              SkillBridge connects higher education institutions, aspirational students, faculty, and industry leaders through AI-driven competency benchmarking, verified digital passports, and real-time opportunity pipelines.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-4">
            <div className="border-r last:border-none border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">10K+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Students</div>
            </div>
            <div className="border-r last:border-none border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">500+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Industry Partners</div>
            </div>
            <div className="border-r last:border-none border-slate-100 dark:border-slate-800">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1K+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Internship Opportunities</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">200+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Colleges</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Navy Container) (#how-it-works) */}
      <section id="how-it-works" className="py-12 px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="bg-[#0B1727] border border-slate-800 rounded-2xl p-8 sm:p-10 text-white shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">How It Works</h2>
            <div className="w-10 h-0.5 bg-blue-500 mx-auto mt-2.5 rounded-full"></div>
          </div>

          {/* 6 Connected Steps */}
          <div className="relative">
            {/* Horizontal connecting line on desktop */}
            <div className="hidden lg:block absolute top-6 left-12 right-12 h-0.5 bg-slate-800 -z-0"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md mb-3 ring-4 ring-[#0B1727] group-hover:scale-110 transition">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">
                      {step.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 max-w-[120px] leading-tight">
                      {step.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skilled Bharat Sub-Banner */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span className="tracking-wide">Together for a Skilled Bharat</span>
          </div>
        </div>
      </section>

      {/* Contact Section (#contact) */}
      <section id="contact" className="py-12 px-6 max-w-7xl mx-auto w-full scroll-mt-20">
        <div className="bg-white dark:bg-[#111827] rounded-2xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-900/40">
                Get In Touch
              </span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Connect with the SkillBridge Team
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Whether you are a university looking to integrate student analytics, an industry partner seeking verified talent, or a student needing guidance, we are here to support your journey.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Email Us</span>
                    <a href="mailto:support@skillbridge.edu.in" className="text-blue-600 dark:text-blue-400 hover:underline">
                      support@skillbridge.edu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">Toll Free Support</span>
                    <span className="text-slate-600 dark:text-slate-400">+91 1800-123-SKILL (Mon-Sat, 9AM-6PM)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-semibold text-slate-800 dark:text-slate-200">National Headquarters</span>
                    <span className="text-slate-600 dark:text-slate-400">New Delhi, Innovation Hub, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact / Inquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Send us an Inquiry</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Fill out the quick form and our academic-industry relations officer will respond within 24 hours.</p>

              {contactSubmitted ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-lg text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Thank you! Your message has been sent successfully. We will get back to you shortly.</span>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                        placeholder="you@example.com"
                        className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">I am a</label>
                    <select
                      value={contactForm.role}
                      onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    >
                      <option>Student</option>
                      <option>Industry Partner</option>
                      <option>Academician / Faculty</option>
                      <option>Institution Representative</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Message</label>
                    <textarea
                      rows={3}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      required
                      placeholder="Tell us about your requirements or questions..."
                      className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 dark:text-slate-100"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 bg-[#1E60D5] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition cursor-pointer"
                  >
                    <span>Submit Message</span>
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1220]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© 2026 SkillBridge Platform. Academia • Industry • Future.</span>
          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 dark:text-slate-400">
            <button onClick={() => scrollToSection("home")} className="hover:text-blue-600 dark:hover:text-blue-400">Home</button>
            <button onClick={() => scrollToSection("about")} className="hover:text-blue-600 dark:hover:text-blue-400">About</button>
            <button onClick={() => scrollToSection("features")} className="hover:text-blue-600 dark:hover:text-blue-400">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="hover:text-blue-600 dark:hover:text-blue-400">How It Works</button>
            <button onClick={() => scrollToSection("contact")} className="hover:text-blue-600 dark:hover:text-blue-400">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
