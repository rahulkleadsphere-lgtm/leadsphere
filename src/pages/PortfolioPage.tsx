import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp,
  Zap,
  Globe,
} from "lucide-react";
import { SiteHeader, ArrowLabel } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";

const categories = ["All", "Generative AI", "Process Automation", "Machine Learning", "Data & Cloud"] as const;
type Category = (typeof categories)[number];

interface Project {
  id: string;
  category: Category;
  industry: string;
  title: string;
  tagline: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  technologies: string[];
  gradientClass: string;
  image: string;
  liveUrl: string;
  liveBadgeText?: string;
}

const projects: Project[] = [
  {
    id: "medora-healthcare",
    category: "Generative AI",
    industry: "DIGITAL HEALTH & TELEMEDICINE",
    title: "Medora — Modern Healthcare & Instant AI Care Platform",
    tagline: "Healthcare that feels personal again — book trusted specialists, consult with 24/7 AI care companions, and manage health in one clinic platform.",
    metric: "4.9/5",
    metricLabel: "patient satisfaction rating across 12,400+ reviews",
    challenge:
      "Patients endured multi-day clinic wait times and confusing triage processes, while clinical staff struggled with disjointed scheduling and patient record access.",
    solution:
      "Architected a unified digital healthcare platform featuring instant specialist booking, HIPAA-compliant 24/7 conversational care companions, vitals monitoring, and seamless electronic records.",
    technologies: ["React", "AI Symptom Companion", "HIPAA Guardrails", "Telehealth Video", "Vitals Dashboard"],
    gradientClass: "from-teal-600/20 via-emerald-600/10 to-transparent",
    image: "/images/projects/medora.png",
    liveUrl: "https://medusa-vert-eight.vercel.app?_vercel_share=092q8N21NFWhJssMg3yuHe58MyTyDFuH",
    liveBadgeText: "Medora Live",
  },
  {
    id: "sevasetu-health-ai",
    category: "Generative AI",
    industry: "HEALTHCARE & PUBLIC SECTOR",
    title: "SevaSetu AI — Digital Health Sanctuary & Multilingual Medical AI",
    tagline: "Empowering 800M+ citizens across rural India with conversational symptom analysis, Ayushman Bharat PM-JAY scheme eligibility, and multimodal report scanning.",
    metric: "+82%",
    metricLabel: "faster patient triage & scheme discovery",
    challenge:
      "Language barriers, lack of medical specialists in rural districts, and fragmented access to national healthcare benefits like Ayushman Bharat PM-JAY.",
    solution:
      "Engineered an offline-capable multimodal medical assistant supporting 12+ regional languages (Hindi, Telugu, Odia), real-time medical report scanning, and automated eligibility matching.",
    technologies: ["React", "Multilingual LLM", "Multimodal OCR", "Vector Search", "Ayushman Bharat API"],
    gradientClass: "from-blue-600/20 via-cyan-600/10 to-transparent",
    image: "/images/projects/sevasetu.png",
    liveUrl: "https://health-ai-chatbot-lead-sphere.vercel.app/",
    liveBadgeText: "Health AI Live",
  },
  {
    id: "estateflow-crm",
    category: "Process Automation",
    industry: "REAL ESTATE & BROKERAGE",
    title: "EstateFlow — AI-Powered Brokerage CRM & Pipeline Intelligence",
    tagline: "The intelligent CRM for top-producing agents to manage deals, automate tour follow-ups, and build lasting client relationships.",
    metric: "3.2×",
    metricLabel: "pipeline conversion velocity",
    challenge:
      "High-velocity real estate agencies lost 35% of high-net-worth buyer leads due to scattered communication, manual tour scheduling, and sluggish contract handoffs.",
    solution:
      "Built an end-to-end deal pipeline manager with autonomous follow-up triggers, AI property-to-buyer matching, real-time commission analytics, and contract tracking.",
    technologies: ["React", "Pipeline Automation", "TailwindCSS", "Real-Time Analytics", "Automated Agents"],
    gradientClass: "from-indigo-600/20 via-purple-600/10 to-transparent",
    image: "/images/projects/estateflow.png",
    liveUrl: "https://web-crm-production.vercel.app/",
    liveBadgeText: "EstateFlow Live",
  },
  {
    id: "leadengine-discovery",
    category: "Machine Learning",
    industry: "GROWTH INTELLIGENCE & B2B SAAS",
    title: "LeadEngine — Lead Discovery Intelligence Platform",
    tagline: "Real-time analytics for multi-source Google discovery, RAG vector deduplication, and ICP lead scoring powered by Gemini 3.6 Flash.",
    metric: "10×",
    metricLabel: "faster lead prospecting & verification",
    challenge:
      "Sales development reps spent over 18 hours weekly manually finding B2B decision makers, verifying contact emails, and researching business signals.",
    solution:
      "Engineered a high-velocity prospecting engine powered by Gemini 3.6 Flash & LangGraph pipelines, performing automated web scraping, entity resolution, and personalized outreach drafts.",
    technologies: ["Gemini 3.6 Flash", "LangGraph Pipeline", "RAG Vector Store", "React", "Entity Resolution"],
    gradientClass: "from-cyan-600/20 via-blue-600/10 to-transparent",
    image: "/images/projects/leadengine.png",
    liveUrl: "https://lead-engine-main.vercel.app/",
    liveBadgeText: "LeadEngine Live",
  },
  {
    id: "cgtmse-portal",
    category: "Data & Cloud",
    industry: "FINTECH & GOVERNMENT",
    title: "CGTMSE GMS — Credit Guarantee Management System & AI Assistant",
    tagline: "Official credit guarantee management portal for MSME financing backed by SIDBI & Ministry of MSME with 24/7 conversational AI assistant.",
    metric: "₹500Cr+",
    metricLabel: "guarantee facilities administered with 24/7 AI SLA",
    challenge:
      "Member Lending Institutions (MLIs) faced complex guarantee claim validation, manual compliance audits, and lengthy query resolution times for collateral-free MSME loans.",
    solution:
      "Modernized the enterprise GMS banking portal with an embedded 24/7 Generative AI assistant for scheme queries, automated claim rule checking, and institutional audit trails.",
    technologies: ["Enterprise Banking Portal", "Conversational AI Assistant", "SIDBI API", "RBAC Security", "Audit Pipeline"],
    gradientClass: "from-blue-700/20 via-amber-600/10 to-transparent",
    image: "/images/projects/cgtmse.png",
    liveUrl: "https://cgtmse-69w5.vercel.app/",
    liveBadgeText: "GMS Portal Live",
  },
];

export default function PortfolioPage() {
  useEffect(() => {
    document.title = "Live Enterprise Projects & AI Deployments — LeadSphere AI";
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const reduced = useReducedMotion();

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activeId="portfolio" />

      <main className="pt-28 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-16">
          <div className="hero-grid opacity-40" />
          <div className="container relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge mx-auto mb-6"
            >
              <span className="badge-pulse" />
              LIVE DEPLOYMENTS <span className="badge-dot">•</span> 5 PRODUCTION PLATFORMS
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
            >
              Architected for Reliability.
              <br />
              <span className="gradient-text">Shipped to Production.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Explore our live enterprise applications across Health AI, CRM intelligence, B2B lead discovery, and financial credit guarantees. Click any project to test the live deployment.
            </motion.p>
          </div>
        </section>

        {/* Highlight Stats Bar */}
        <section className="container mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-3xl border border-border bg-card/60 backdrop-blur-md shadow-sm">
            {[
              { label: "Production Platforms", value: "5 Live", icon: Globe },
              { label: "Patient & User Reach", value: "800M+", icon: Sparkles },
              { label: "Pipeline Value Tracked", value: "₹500Cr+", icon: TrendingUp },
              { label: "Average Speedup", value: "10×", icon: Zap },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center p-3">
                  <div className="inline-flex p-2 rounded-xl bg-primary/10 text-primary mb-2">
                    <Icon size={20} />
                  </div>
                  <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground font-sans">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mt-0.5">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Category Filters */}
        <section className="container mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md scale-105"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.id}
                className="group relative flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Visual Screenshot Header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-border">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-80" />

                  {/* Floating Action Pill */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-background/90 text-foreground backdrop-blur-md border border-border/80 shadow-lg hover:bg-primary hover:text-white transition-all hover:scale-105"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{project.liveBadgeText || "Live Demo"}</span>
                      <ExternalLink size={13} className="ml-0.5" />
                    </a>
                  </div>

                  {/* Industry Badge over image */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 shadow-md">
                      {project.industry}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="relative p-7 md:p-8 flex flex-col flex-1 z-10">
                  {/* Title & Tagline */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5 font-mono">
                      <span>PROJECT 0{idx + 1}</span>
                      <span className="text-primary font-semibold">{project.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 hover:underline"
                      >
                        {project.title}
                        <ArrowUpRight size={18} className="text-primary shrink-0 opacity-80 group-hover:opacity-100" />
                      </a>
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Highlight Metric Box */}
                  <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-accent/40 border border-border/80 backdrop-blur-sm">
                    <span className="text-3xl md:text-4xl font-extrabold text-primary font-sans">
                      {project.metric}
                    </span>
                    <span className="text-xs font-semibold text-foreground/80">
                      {project.metricLabel}
                    </span>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-4 mb-6 text-xs text-muted-foreground leading-relaxed flex-1">
                    <div>
                      <strong className="block text-[11px] font-bold text-foreground tracking-wide uppercase mb-1">
                        Operational Challenge
                      </strong>
                      <p>{project.challenge}</p>
                    </div>
                    <div>
                      <strong className="block text-[11px] font-bold text-foreground tracking-wide uppercase mb-1">
                        Deployed AI Architecture
                      </strong>
                      <p>{project.solution}</p>
                    </div>
                  </div>

                  {/* Tech stack tags & Live Launch Action */}
                  <div className="pt-4 border-t border-border mt-auto flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors ml-auto py-1"
                    >
                      Visit Live Platform <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="container mt-20">
          <div className="cta-banner-box relative rounded-3xl p-8 md:p-14 overflow-hidden text-center shadow-2xl">
            <div className="cta-grid-bg opacity-30" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="eyebrow eyebrow-light justify-center mb-3">
                LET'S TALK SPECIFICS
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                Have a Complex AI Use Case?
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
                Our staff engineers will review your tech stack and provide a comprehensive feasibility
                assessment within one business day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="brand" className="button-large" asChild>
                  <a href="/contact">
                    <ArrowLabel>Request Architecture Audit</ArrowLabel>
                  </a>
                </Button>
                <Button variant="darkOutline" className="button-large" asChild>
                  <a href="mailto:ceo@lspheres.com">Email ceo@lspheres.com</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
