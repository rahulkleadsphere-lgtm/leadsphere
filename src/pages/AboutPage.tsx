import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, ShieldCheck, Cpu, Cloud, Target, Users, Sparkles, ArrowRight, Award } from "lucide-react";
import { SiteHeader, ArrowLabel } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";


const pillars = [
  {
    icon: Users,
    title: "Senior ML Practitioners",
    description:
      "We never delegate core architecture to junior contractors. Every sprint is staffed by senior systems engineers, ML researchers, and cloud architects who have built at scale.",
  },
  {
    icon: Cloud,
    title: "Vendor-Neutral Integrity",
    description:
      "We build on the infrastructure that best serves your business — AWS, Azure, Google Cloud, or hybrid self-hosted. Zero proprietary lock-in. Full client IP ownership.",
  },
  {
    icon: Target,
    title: "KPI-Obsessed Execution",
    description:
      "We tie every model deployment directly to balance-sheet metrics — lower customer acquisition cost, reduced operational hours, and higher net revenue.",
  },
  {
    icon: ShieldCheck,
    title: "Responsible AI & Governance",
    description:
      "Security and ethical compliance by design. Automated bias audits, output drift detectors, SOC2 readiness, and strict GDPR privacy guardrails built in from day one.",
  },
];

const milestones = [
  {
    year: "2025 Q1",
    title: "LeadSphere Solutions Founded",
    description:
      "Formed by a collective of enterprise cloud and machine learning engineers committed to moving AI out of hype cycles and into mission-critical production.",
  },
  {
    year: "2025 Q3",
    title: "Multi-Cloud Agentic Framework",
    description:
      "Released our internal orchestration framework enabling deterministic, high-throughput autonomous agents across AWS Bedrock and GCP Vertex.",
  },
  {
    year: "2026",
    title: "40+ Production Deployments",
    description:
      "Surpassed 150 million weekly inference calls with 99.8% uptime across global leaders in FinTech, Healthcare, Logistics, and Enterprise SaaS.",
  },
];

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us — LeadSphere AI Transformation Solutions";
  }, []);
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activeId="about" />

      <main className="pt-28 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20">
          <div className="hero-grid opacity-40" />
          <div className="container relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge mx-auto mb-6"
            >
              <span className="badge-pulse" />
              FOUNDED 2025 <span className="badge-dot">•</span> GLOBAL REACH <span className="badge-dot">•</span> PRODUCTION IMPACT
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
            >
              The Intelligence Behind
              <br />
              <span className="gradient-text">Enterprise Growth.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              LeadSphere Solutions was founded in 2025 to bring enterprise-grade AI to organizations
              ready to lead their industries. Our name represents a sphere of influence where data,
              automation, and human expertise converge.
            </motion.p>
          </div>
        </section>

        {/* Origin Story Bento */}
        <section className="container mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-border bg-card p-8 md:p-12 shadow-sm">
            <div className="lg:col-span-7 space-y-5">
              <span className="eyebrow">OUR STORY &amp; ETHOS</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Built to Replace AI Hype with Lasting Operational Leverage.
              </h2>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Most AI pilots fail because they focus on flashy demos rather than integration, data hygiene,
                and production reliability. At LeadSphere, we started with a clear premise: enterprise AI must
                be treated as core software engineering.
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                Whether deploying deterministic RAG copilots or sub-millisecond vision inference lines,
                we work shoulder-to-shoulder with internal engineering leaders to ensure systems are secure,
                observable, and fully owned by the client.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> 100% Client Code Ownership
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> Zero Vendor Cloud Lock-in
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> SOC2 &amp; GDPR Guardrails
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-accent/40 rounded-2xl p-7 border border-border flex flex-col justify-center text-center">
              <div className="text-5xl font-black text-primary font-sans mb-2">2025</div>
              <div className="text-sm font-bold tracking-wide uppercase text-foreground mb-4">
                Established with a Clear Purpose
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Our name says it all — a sphere of influence where data, automation, and human expertise
                converge to create measurable growth."
              </p>
              <div className="mt-6 pt-6 border-t border-border flex justify-around">
                <div>
                  <div className="text-2xl font-bold font-sans">40+</div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Deployments</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-sans">99.8%</div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Uptime SLA</div>
                </div>
                <div>
                  <div className="text-2xl font-bold font-sans">3.8×</div>
                  <div className="text-[10px] text-muted-foreground font-semibold uppercase">Avg ROI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Pillars Grid */}
        <section className="container mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow justify-center mb-2">THE LEADSPHERE ADVANTAGE</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Our Guiding Principles
            </h2>
            <p className="text-sm text-muted-foreground mt-3">
              The four foundational pillars supporting every engagement and production architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-border bg-card p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon size={24} />
                  </div>
                  <div className="text-xs font-mono font-bold text-muted-foreground mb-2">
                    PILLAR 0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline / Milestones */}
        <section className="container mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow justify-center mb-2">GROWTH MILESTONES</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              From Founding to Global Scale
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 rounded-2xl border border-border bg-card shadow-sm"
              >
                <div className="font-mono font-extrabold text-lg text-primary min-w-[90px]">
                  {item.year}
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="container">
          <div className="cta-banner-box rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <div className="cta-grid-bg opacity-30" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="eyebrow eyebrow-light justify-center mb-3">WORK WITH US</span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                Partner with Senior AI Engineers
              </h2>
              <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
                Ready to accelerate your roadmap? Book a direct strategy consultation with our founding team.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="brand" className="button-large" asChild>
                  <a href="/contact">
                    <ArrowLabel>Schedule Strategy Session</ArrowLabel>
                  </a>
                </Button>
                <Button variant="darkOutline" className="button-large" asChild>
                  <a href="/portfolio">Explore Portfolio</a>
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
