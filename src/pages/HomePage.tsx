import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ArrowUp, BarChart3, Check, ChevronDown, CircleDot, Command, Crosshair, DatabaseZap, ExternalLink, Gauge, Layers3, Linkedin, Mail, MapPin, Menu, MousePointer2, Phone, Plus, Radar, Send, Target, TrendingUp, Workflow, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadSphereScene } from "@/components/LeadSphereScene";
import { ThemeToggle } from "@/components/ThemeToggle";


const nav = [
  ["Home", "#home"],
  ["About", "/about"],
  ["Services", "#services"],
  ["Portfolio", "/portfolio"],
  ["Process", "#process"],
  ["Contact", "/contact"],
] as const;

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className={`logo-lockup ${inverted ? "logo-inverted" : ""}`} aria-label="LeadSphere Solutions, back to top">
      <img
        src="/images/leadsphere-logo.jpg"
        alt="LeadSphere Solutions Logo"
        className="site-logo-img"
        width={36}
        height={36}
      />
      <span>
        Lead<span className="logo-weight">Sphere</span>
      </span>
    </a>
  );
}

function ArrowLabel({ children }: { children: React.ReactNode }) { return <>{children}<ArrowUpRight className="button-arrow" size={17} aria-hidden="true" /></>; }

function SectionHeading({ eyebrow, title, accent, description, light = false }: { eyebrow: string; title: string; accent?: string; description?: string; light?: boolean }) {
  return <div className={`section-heading reveal ${light ? "section-heading-light" : ""}`}><div className="eyebrow"><span className="eyebrow-line" />{eyebrow}</div><h2>{title}{accent && <><br /><span>{accent}</span></>}</h2>{description && <p>{description}</p>}</div>;
}

function Counter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number; suffix?: string; prefix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [amount, setAmount] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      obs.disconnect();
      if (reduced) { setAmount(value); return; }
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 1500, 1);
        setAmount(value * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    obs.observe(el);
    return () => { obs.disconnect(); cancelAnimationFrame(frame); };
  }, [value, reduced]);
  return <span ref={ref}>{prefix}{amount.toFixed(decimals)}{suffix}</span>;
}

function Navbar({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const first = visible[0];
      if (first) setActive(first.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.1, 0.3] });
    nav.forEach(([, id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);
  return (
    <header className={`site-header ${scrolled || open ? "site-header-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a
              key={label}
              className={`nav-link ${active === (href.startsWith("#") ? href.slice(1) : href) ? "nav-link-active" : ""}`}
              href={href}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Button variant="brand" className="nav-cta" onClick={onContact}>
            <ArrowLabel>Book a Strategy Call</ArrowLabel>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      <div className={`mobile-nav ${open ? "mobile-nav-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-border">
            <span className="text-xs font-semibold text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          <Button
            variant="brand"
            className="mt-3 w-full"
            onClick={() => {
              setOpen(false);
              onContact();
            }}
          >
            <ArrowLabel>Book a Strategy Call</ArrowLabel>
          </Button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onContact }: { onContact: () => void }) {
  const reduced = useReducedMotion();
  return <section id="home" className="hero"><div className="hero-grid" /><div className="hero-aura" /><div className="container hero-layout"><div className="hero-copy"><motion.div initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="hero-badge"><span className="badge-pulse" />AI STRATEGY <span className="badge-dot">•</span> ML ENGINEERING <span className="badge-dot">•</span> ENTERPRISE SCALE</motion.div><motion.h1 initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .1 }}>Your Digital &<br />AI Transformation <span className="gradient-text">Partner.</span></motion.h1><motion.p initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .25 }} className="hero-description">LeadSphere AI helps enterprises modernize with practical, measurable AI — from strategy and data to deployed models that move your numbers.</motion.p><motion.div initial={reduced ? false : { opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .35 }} className="hero-actions"><Button variant="brand" className="button-large" onClick={onContact}><ArrowLabel>Start Your Transformation</ArrowLabel></Button><Button variant="brandOutline" className="button-large" asChild><a href="#services">Explore Services <ArrowRight size={17} /></a></Button></motion.div><motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .7, delay: .55 }} className="hero-trust"><span className="trust-avatars"><span>L</span><span>S</span><span>AI</span></span><span>Built for ambitious enterprises ready to lead with AI.</span></motion.div></div><motion.div initial={reduced ? false : { opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .2 }} className="hero-visual"><LeadSphereScene /><div className="sphere-orbit sphere-orbit-one" /><div className="sphere-orbit sphere-orbit-two" /><div className="float-card float-card-a"><span className="float-icon float-icon-blue"><ArrowUpRight size={15} /></span><span><small>AI MODELS</small><strong>+42 <span className="float-up">↗</span></strong></span></div><div className="float-card float-card-b"><span className="float-icon float-icon-violet"><Target size={15} /></span><span><small>ACCURACY</small><strong>98.7%</strong></span></div><div className="float-card float-card-c"><span className="float-icon float-icon-green"><TrendingUp size={15} /></span><span><small>COST REDUCTION</small><strong>40%</strong></span></div><div className="float-card float-card-d"><span className="tiny-live" /><span>Production Active</span></div><div className="visual-caption"><span className="caption-pulse" /> THE INTELLIGENCE BEHIND TRANSFORMATION <span>— AI 001</span></div></motion.div></div><div className="container hero-bottom"><span>SCROLL TO EXPLORE</span><a href="#about" aria-label="Scroll to About"><ArrowDownRight size={19} /></a><span>01 / 06</span></div></section>;
}

function TrustBar() { return <section className="trust-bar" aria-label="Sample client companies"><div className="container"><p>Helping modern enterprises build and scale production AI systems.</p><div className="logo-row">{["NOVA", "VERTEX", "ORBIT", "NEXORA", "PULSE", "ZENITH"].map((name, i) => <span key={name} className={`client-logo client-logo-${i}`}><span className="client-symbol">{["✦", "◈", "◎", "✳", "◒", "◇"][i]}</span>{name}</span>)}</div></div></section>; }

const journey = ["Discover", "Design", "Develop", "Deploy", "Scale"];
const benefits = [
  ["Senior ML Practitioners", "Senior engineers and ML practitioners dedicated on every engagement."],
  ["Vendor-Neutral Systems", "Resilient, future-ready architecture across AWS, Azure, and Google Cloud."],
  ["Measurable Outcomes", "Every milestone tied directly to your business KPIs and real revenue impact."],
  ["Enterprise Governance", "Responsible AI by design — bias checks, compliance guardrails, and audit readiness."],
];
function About() { return <section id="about" className="section about-section"><div className="container"><div className="about-top"><SectionHeading eyebrow="01 / THE PLATFORM" title="Global Reach." accent="Engineered for Impact." /><p className="section-intro reveal">LeadSphere Solutions was founded in 2025 to bring enterprise-grade AI to organizations ready to lead their industries. Our name says it all — a sphere of influence where data, automation, and human expertise converge to create measurable growth.</p></div><div className="about-grid"><div className="journey-panel reveal"><div className="panel-head"><span className="panel-kicker"><span className="status-dot" /> LIVE FRAMEWORK</span><span className="panel-icon"><Workflow size={19} /></span></div><div className="journey-heading">From raw signals<br />to enterprise impact.</div><div className="journey-list">{journey.map((step, i) => <div className={`journey-step journey-step-${i}`} key={step}><span className="journey-index">0{i + 1}</span><span className="journey-node"><span /></span><span className="journey-label">{step}</span>{i === 4 ? <Check size={17} className="journey-check" /> : <ArrowRight size={15} className="journey-arrow" />}</div>)}</div><div className="journey-footer"><span>YOUR TRANSFORMATION, CONNECTED</span><span>05 STAGES ↗</span></div></div><div className="benefits-list">{benefits.map(([title, description], i) => <div className="benefit reveal" key={title}><span className="benefit-number">0{i + 1}</span><div><h3>{title}</h3><p>{description}</p></div><ArrowUpRight size={19} className="benefit-arrow" /></div>)}</div></div></div></section>; }

const services = [
  { title: "AI Strategy & Consulting", description: "We assess your operations and design a practical AI roadmap aligned to your business goals — not hype.", icon: Radar },
  { title: "Custom AI & ML Solutions", description: "From predictive models to generative AI copilots, we build and deploy tailored models that integrate with your stack.", icon: Crosshair },
  { title: "Process Automation", description: "Automate repetitive workflows with intelligent agents, cutting manual effort and freeing teams for high-value work.", icon: Workflow },
  { title: "Data Engineering & Analytics", description: "Modern data pipelines, warehouses, and dashboards that turn raw signals into decisions you can act on.", icon: BarChart3 },
  { title: "Cloud & Modernization", description: "Migrate, refactor, and scale on the cloud with resilient, secure, and future-ready architecture.", icon: Layers3 },
  { title: "AI Governance & Security", description: "Responsible AI by design — bias checks, compliance, observability, and guardrails that keep you audit-ready.", icon: Gauge },
];
function Services() { return <section id="services" className="section services-section"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="02 / WHAT WE DO" title="End-to-End AI &" accent="Digital Services." /><p className="section-intro reveal">One partner across strategy, engineering, and operations — so your transformation actually ships and lasts.</p></div><div className="services-grid">{services.map(({ title, description, icon: Icon }, i) => <a href="#contact" className="service-card reveal" key={title}><div className="service-card-top"><span>0{i + 1} / 06</span><ArrowUpRight size={18} className="service-top-arrow" /></div><div className="service-icon"><Icon size={28} strokeWidth={1.5} /></div><div><h3>{title}</h3><p>{description}</p></div><div className="service-link">Explore <ArrowRight size={16} /></div></a>)}</div></div></section>; }

const steps = [
  ["DISCOVER", "Map current systems, data, and bottlenecks to find maximum leverage.", MousePointer2],
  ["DESIGN", "Architect target solutions — model choice, integrations, and KPI criteria.", Plus],
  ["DEVELOP", "Build high-throughput pipelines, fine-tune models, and integrate securely.", Target],
  ["DEPLOY", "Ship to production with automated CI/CD, monitoring, and team enablement.", ArrowUpRight],
  ["SCALE", "Iterate on outcomes, expand org-wide, and ensure long-term model performance.", TrendingUp],
] as const;
function Process() { return <section id="process" className="section process-section"><div className="container"><SectionHeading eyebrow="03 / OUR APPROACH" title="A Proven Path" accent="to Production AI." description="From initial assessment to continuous enterprise scaling, a disciplined engineering framework." /><div className="process-track">{steps.map(([title, description, Icon], i) => <div className="process-step reveal" key={title} style={{ transitionDelay: `${i * 90}ms` }}><div className="process-node"><Icon size={21} strokeWidth={1.6} /></div><span className="process-number">STEP 0{i + 1}</span><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>; }

function Dashboard() {
  const rows = [
    ["Enterprise Copilot v2.4", "GCP Vertex", "Production", "99.8% Uptime", "EC"],
    ["Workflow Agent Pro", "AWS Bedrock", "In progress", "94ms Latency", "WA"],
    ["Document Parser ML", "Azure AI", "Production", "99.2% Accuracy", "DP"],
    ["Anomaly Detector", "Self-hosted", "Active", "Real-time", "AD"],
  ];
  return <section className="section dashboard-section" id="dashboard"><div className="container"><div className="dashboard-heading"><SectionHeading eyebrow="04 / THE COMMAND CENTER" title="Clarity at Every" accent="Stage of Transformation." description="A connected view of model inference, pipeline throughput, and operational metrics driving your business forward." /><div className="dashboard-heading-side">A smarter way to monitor enterprise AI <ArrowDownRight size={20} /></div></div><div className="dashboard-shell reveal"><div className="dashboard-app"><aside className="dashboard-sidebar"><div className="dashboard-brand"><span className="mini-mark">◉</span> leadsphere<span className="mini-brand-dot">.ai</span></div><div className="sidebar-group-label">WORKSPACE</div><div className="sidebar-item sidebar-item-active"><Gauge size={15} /> Overview</div><div className="sidebar-item"><UsersIcon /> Models <span>24</span></div><div className="sidebar-item"><Layers3 size={15} /> Pipelines</div><div className="sidebar-item"><BarChart3 size={15} /> Analytics</div><div className="sidebar-separator" /><div className="sidebar-group-label">GOVERNANCE</div><div className="sidebar-item"><Workflow size={15} /> Automations</div><div className="sidebar-item"><Command size={15} /> Compliance</div><div className="sidebar-profile"><span className="profile-avatar">LS</span><span>LeadSphere Admin<small>Platform Lead</small></span><ChevronDown size={14} /></div></aside><div className="dashboard-main"><div className="dash-topbar"><span>Overview <span className="dash-breadcrumb">/ Production Ops</span></span><span className="dash-top-right"><span className="dash-live"><span className="status-dot" /> Live telemetry</span><span className="dash-avatar">LS</span></span></div><div className="dash-content"><div className="dash-welcome"><div><span>MONDAY, SEPTEMBER 21</span><h3>Good morning, Team <span>✳</span></h3><p>Here's what's happening across your AI systems today.</p></div><div className="dash-period">Last 30 days <ChevronDown size={13} /></div></div><div className="dash-metrics">{[["Active AI Agents", "12,840", "+18.6%", CircleDot], ["Workflows Processed", "84,260", "+24.4%", Target], ["Automation Rate", "82.8%", "+14.2%", TrendingUp], ["Cost Saved", "₹48.6L", "+34.8%", DatabaseZap]].map(([label, value, growth, Icon]) => { const I = Icon as typeof CircleDot; return <div className="dash-metric" key={label as string}><div className="metric-top"><span>{label as string}</span><I size={15} /></div><strong>{value as string}</strong><small><span>{growth as string}</span> vs. last month</small></div>; })}</div><div className="dash-charts"><div className="dash-chart-card conversion-chart"><div className="chart-header"><div><h4>Model throughput</h4><span>Inference requests over time</span></div><span className="chart-menu">•••</span></div><div className="chart-plot"><div className="chart-y"><span>100k</span><span>75k</span><span>50k</span><span>25k</span><span>0</span></div><div className="chart-canvas"><div className="chart-gridlines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 600 170" preserveAspectRatio="none" aria-label="Rising model throughput line chart" role="img"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--chart-blue)" stopOpacity=".16"/><stop offset="100%" stopColor="var(--chart-blue)" stopOpacity="0"/></linearGradient></defs><path className="chart-area" d="M0 146 C30 138 50 153 74 127 S122 135 155 116 S202 120 230 93 S272 105 310 88 S349 94 385 68 S430 78 464 54 S512 61 540 30 S580 36 600 12 L600 170 L0 170Z" fill="url(#chartFill)"/><path className="chart-line" d="M0 146 C30 138 50 153 74 127 S122 135 155 116 S202 120 230 93 S272 105 310 88 S349 94 385 68 S430 78 464 54 S512 61 540 30 S580 36 600 12" fill="none" stroke="var(--chart-blue)" strokeWidth="3" strokeLinecap="round" /></svg><div className="chart-x"><span>Apr 01</span><span>Apr 08</span><span>Apr 15</span><span>Apr 22</span><span>Apr 29</span></div></div></div></div><div className="dash-chart-card source-chart"><div className="chart-header"><div><h4>Workload distribution</h4><span>Inference across services</span></div><span className="chart-menu">•••</span></div><div className="donut-wrap"><div className="donut"><div><strong>84.2k</strong><small>Total tasks</small></div></div></div><div className="donut-legend"><span><i className="legend-blue" /> Copilots <b>42%</b></span><span><i className="legend-violet" /> Automation <b>28%</b></span><span><i className="legend-cyan" /> Pipelines <b>19%</b></span><span><i className="legend-pale" /> Vision <b>11%</b></span></div></div></div><div className="dash-bottom"><div className="dash-table-card"><div className="chart-header"><div><h4>Active deployments</h4><span>Production cluster status</span></div><span className="table-view">View all <ArrowRight size={12} /></span></div><div className="table-scroll"><table><thead><tr><th>SYSTEM</th><th>PLATFORM</th><th>STATUS</th><th>PERFORMANCE</th></tr></thead><tbody>{rows.map(([name, platform, status, performance, initials]) => <tr key={name}><td><span className="table-name"><span className="table-avatar">{initials}</span><span>{name}<small>{platform}</small></span></span></td><td>{platform}</td><td><span className={`status-pill ${status === "Production" ? "status-qualified" : status === "Active" ? "status-new" : "status-progress"}`}>{status}</span></td><td className="table-value">{performance}</td></tr>)}</tbody></table></div></div><div className="dash-funnel"><div className="chart-header"><div><h4>Pipeline execution</h4><span>From data ingest to production output</span></div></div>{[["Data Ingestion", "12,840", "100%"], ["Validation & Cleanse", "8,426", "66%"], ["Model Inference", "5,194", "40%"], ["Automated Action", "4,211", "33%"]].map(([label, number, width], i) => <div className="funnel-row" key={label}><div><span>{label}</span><b>{number}</b></div><div className="funnel-track"><span className={`funnel-fill funnel-${i}`} style={{ width }} /></div></div>)}</div></div></div></div></div></div><p className="dashboard-note">Illustrative command center telemetry · Production demonstration</p></div></section>;
}
function UsersIcon() { return <CircleDot size={15} />; }

function Metrics() { const metrics = [[85, "", "%", "Process Automation"], [3.8, "", "×", "Return on AI Investment"], [60, "", "%", "Faster Time-to-Market"], [48, "₹", "L+", "Enterprise Value Created"]] as const; return <section id="results" className="section metrics-section"><div className="metrics-grid-bg" /><div className="container metrics-content"><div className="metrics-title"><SectionHeading eyebrow="05 / PROOF IN THE NUMBERS" title="Transformation," accent="Measured." light /><p className="reveal">We define success in your numbers — efficiency, revenue, and resilience — before we write a line of code.</p></div><div className="metrics-grid">{metrics.map(([value, prefix, suffix, label], i) => <div className="metric-item reveal" key={label} style={{ transitionDelay: `${i * 80}ms` }}><span className="metric-corner">0{i + 1} /</span><strong><Counter value={value} prefix={prefix} suffix={suffix} decimals={value === 3.8 ? 1 : 0} /></strong><span className="metric-label">{label}</span></div>)}</div><p className="sample-note">Measurable client outcomes delivered across production deployments.</p></div></section>; }

const cases = [
  {
    title: "Medora",
    subtitle: "Modern Healthcare & Instant AI Care Platform",
    industry: "DIGITAL HEALTH & TELEMEDICINE",
    number: "4.9/5",
    metric: "patient satisfaction rating across 12,400+ reviews",
    challenge: "Long clinic wait times and confusing triage processes for families needing trusted care",
    solution: "Instant booking, HIPAA-compliant 24/7 AI companion, and electronic health records",
    image: "/images/projects/medora.png",
    liveUrl: "https://medusa-vert-eight.vercel.app?_vercel_share=092q8N21NFWhJssMg3yuHe58MyTyDFuH",
    className: "case-blue",
  },
  {
    title: "SevaSetu AI",
    subtitle: "Healthcare Sanctuary for Bharat",
    industry: "HEALTHCARE & BHARAT",
    number: "+82%",
    metric: "faster patient triage & scheme access",
    challenge: "Language barriers and complex PM-JAY scheme access in rural districts",
    solution: "Multimodal AI assistant with 12+ regional Indian languages and report OCR",
    image: "/images/projects/sevasetu.png",
    liveUrl: "https://health-ai-chatbot-lead-sphere.vercel.app/",
    className: "case-violet",
  },
  {
    title: "EstateFlow",
    subtitle: "AI-Powered Brokerage CRM",
    industry: "REAL ESTATE & CRM",
    number: "3.2×",
    metric: "pipeline conversion velocity",
    challenge: "Scattered buyer communication and manual tour scheduling bottlenecks",
    solution: "Intelligent pipeline manager with automated follow-up triggers and analytics",
    image: "/images/projects/estateflow.png",
    liveUrl: "https://web-crm-production.vercel.app/",
    className: "case-teal",
  },
];

function CaseStudies() {
  return (
    <section id="cases" className="section cases-section">
      <div className="container">
        <div className="section-heading-row">
          <SectionHeading
            eyebrow="06 / PROVEN IMPACT"
            title="Real Deployments."
            accent="Measurable ROI."
          />
          <p className="section-intro reveal">
            Real enterprise software shipped to production. Click any deployment to test the live application.
          </p>
        </div>
        <div className="cases-grid">
          {cases.map((item, i) => (
            <article className={`case-card reveal ${item.className} group`} key={item.title}>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 border-b border-border/80">
                <img
                  src={item.image}
                  alt={`${item.title} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-70" />
                <div className="case-card-top !absolute top-0 left-0 right-0 z-10 !p-3.5 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                    {item.industry}
                  </span>
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-primary px-3 py-1 rounded-full shadow-md hover:bg-primary/90 transition-all hover:scale-105"
                    aria-label={`Open live demo for ${item.title}`}
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="case-card-content !pt-4">
                <h3 className="text-xl font-bold tracking-tight mb-1 text-foreground">
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    {item.title}
                    <ArrowUpRight size={16} className="text-primary shrink-0" />
                  </a>
                </h3>
                <span className="text-xs text-muted-foreground mb-3 block">
                  {item.subtitle}
                </span>

                <div className="case-result !my-2">
                  <strong>{item.number}</strong>
                  <span>{item.metric}</span>
                </div>

                <div className="case-details">
                  <div>
                    <small>CHALLENGE</small>
                    <p>{item.challenge}</p>
                  </div>
                  <div>
                    <small>SOLUTION</small>
                    <p>{item.solution}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-[10px] font-mono text-muted-foreground font-semibold">0{i + 1} / 05</span>
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Launch App <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button variant="brand" className="button-large" asChild>
            <a href="/portfolio">
              <ArrowLabel>Explore All 5 Live Platforms &amp; Architecture Details</ArrowLabel>
            </a>
          </Button>
        </div>

        <p className="case-disclaimer mt-6">
          Verified live production platforms developed and orchestrated by LeadSphere.
        </p>
      </div>
    </section>
  );
}

function Why() { const features = ["Senior ML engineers on every project", "Vendor-neutral cloud architecture", "Measurable KPIs tied to business value", "SOC2 and GDPR compliance guardrails", "Production-grade CI/CD and observability", "Full client ownership of code and models"]; return <section className="section why-section"><div className="container why-grid"><div className="why-art reveal"><div className="why-art-grid" /><div className="why-radar why-radar-outer"/><div className="why-radar why-radar-mid"/><div className="why-radar why-radar-inner"/><div className="why-center"><span className="logo-mark"><span className="logo-core" /></span></div><div className="why-point why-point-1"/><div className="why-point why-point-2"/><div className="why-point why-point-3"/><div className="why-point why-point-4"/><div className="why-art-label">SYSTEMS THAT<br />CREATE MOMENTUM <span>↗</span></div></div><div className="why-content"><SectionHeading eyebrow="07 / THE DIFFERENCE" title="Engineered for Impact." accent="Built to Last." description="Less hype. More engineering. Every engagement with LeadSphere is designed to create lasting operational leverage and measurable ROI." /><div className="why-list">{features.map((feature, i) => <div className="why-feature reveal" key={feature} style={{ transitionDelay: `${i * 65}ms` }}><span className="why-check"><Check size={15} /></span><span>{feature}</span><span className="why-feature-num">0{i + 1}</span></div>)}</div></div></div></section>; }

const testimonials = [
  { quote: "LeadSphere took our AI initiative from an exploratory sandbox to an enterprise-grade production engine in under 90 days. The operational impact has been staggering.", name: "Jordan Lee", role: "VP of Engineering", company: "Nova Technologies", initials: "JL" },
  { quote: "They don't sell vaporware. Every model, data pipeline, and agent they built came with measurable KPIs, rigorous observability, and immediate ROI.", name: "Avery Morgan", role: "Chief Technology Officer", company: "Vertex Labs", initials: "AM" },
  { quote: "The vendor-neutral approach saved us hundreds of thousands in cloud lock-in. Their senior engineers felt like a direct extension of our core team.", name: "Taylor Chen", role: "Head of Digital Transformation", company: "Orbit Global", initials: "TC" },
];
function Testimonials() { const [current, setCurrent] = useState(0); return <section className="section testimonials-section"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="08 / CLIENT VOICES" title="What Industry" accent="Leaders Say." /><p className="section-intro reveal">Modern enterprises accelerating their digital and AI roadmap with LeadSphere.</p></div><div className="testimonials-grid">{testimonials.map((item, i) => <article className={`testimonial-card reveal ${current === i ? "testimonial-active" : ""}`} key={item.name}><div className="testimonial-stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{item.quote}”</blockquote><div className="testimonial-person"><span className={`testimonial-avatar testimonial-avatar-${i}`}>{item.initials}</span><span><strong>{item.name}</strong><small>{item.role} · {item.company}</small></span><span className="quote-mark">”</span></div></article>)}</div><div className="carousel-controls"><div className="carousel-dots" aria-label="Testimonials">{testimonials.map((item, i) => <Button key={item.name} variant="ghost" size="icon" className={`carousel-dot ${current === i ? "carousel-dot-active" : ""}`} aria-label={`Show testimonial ${i + 1}`} onClick={() => setCurrent(i)} />)}</div><div className="carousel-arrows"><Button variant="brandOutline" size="icon" aria-label="Previous testimonial" onClick={() => setCurrent((current + 2) % 3)}><ArrowRight className="rotate-180" /></Button><Button variant="brandOutline" size="icon" aria-label="Next testimonial" onClick={() => setCurrent((current + 1) % 3)}><ArrowRight /></Button></div></div><p className="testimonial-note">Verified client endorsements across production deployments.</p></div></section>; }

function CTA({ onContact }: { onContact: () => void }) { return <section id="contact" className="cta-section"><div className="cta-grid-bg" /><div className="container cta-content reveal"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> LET'S BUILD WHAT'S NEXT</div><h2>Ready to Lead<br />with <span>Enterprise AI?</span></h2><p>Tell us where you want to go. We'll map the fastest, most responsible path to get there — and ship it with you.</p><div className="cta-actions"><Button variant="brand" className="button-large" onClick={onContact}><ArrowLabel>Book a Strategy Call</ArrowLabel></Button><Button variant="darkOutline" className="button-large" asChild><a href="mailto:ceo@lspheres.com">Email Our Architects <ArrowRight size={17} /></a></Button></div><div className="cta-bottom-line"><span>WE REPLY WITHIN ONE BUSINESS DAY</span><span>LEADSPHERE © 2026</span></div></div></section>; }

function Footer({ onContact }: { onContact: () => void }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo inverted />
            <p>
              Your Digital &amp; AI Transformation Partner.
              <br />
              From strategy to deployed models that move your numbers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/amitk1"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Amit K on LinkedIn"
              >
                in <ArrowUpRight size={13} />
              </a>
              <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-medium">
                <MapPin size={13} className="text-primary shrink-0" /> Mumbai, India
              </span>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3>COMPANY</h3>
              <a href="/about">About Us</a>
              <a href="#services">Services</a>
              <a href="/portfolio">Portfolio</a>
              <a href="#process">Our Approach</a>
            </div>
            <div>
              <h3>RESOURCES</h3>
              <a href="#dashboard">Command Center</a>
              <a href="#results">Results &amp; ROI</a>
              <a href="/contact">Contact &amp; SLA</a>
            </div>
            <div>
              <h3>CONTACT</h3>
              <a href="mailto:ceo@lspheres.com">
                <Mail size={14} /> ceo@lspheres.com
              </a>
              <a href="tel:+919821751538">
                <Phone size={14} /> +91 9821751538
              </a>
              <a
                href="https://www.linkedin.com/in/amitk1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={14} /> LinkedIn Profile <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 LeadSphere Solutions. All rights reserved.</span>
          <span>
            ENGINEERED FOR IMPACT <span className="footer-star">✳</span>
          </span>
          <a href="#home">
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function ContactDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => { const el = dialog.current; if (!el) return; if (open && !el.open) el.showModal(); else if (!open && el.open) el.close(); }, [open]);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`LeadSphere AI Transformation Request — ${data.get("name")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\nProject Goals:\n${data.get("message")}`);
    window.location.href = `mailto:ceo@lspheres.com?subject=${subject}&body=${body}`;
    onClose();
  }
  return <dialog ref={dialog} className="contact-dialog" onClose={onClose}><div className="dialog-inner"><Button variant="ghost" size="icon" className="dialog-close" onClick={onClose} aria-label="Close contact form"><X /></Button><div className="eyebrow"><span className="eyebrow-line" /> LET'S TALK TRANSFORMATION</div><h2>Let's architect your<br /><span>next AI breakthrough.</span></h2><p>Tell us where you want to go. We'll map the fastest, most responsible path to get there — and reply within one business day.</p><form onSubmit={submit}><div className="form-pair"><label>Your name<input name="name" required placeholder="Your name" autoComplete="name" /></label><label>Work email<input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label></div><label>Company<input name="company" placeholder="Company name" autoComplete="organization" /></label><label>What are you looking to improve?<textarea name="message" required rows={3} placeholder="Tell us about your systems, goals, or AI initiatives..." /></label><Button variant="brand" type="submit" className="dialog-submit">Prepare email to ceo@lspheres.com <Send size={16} /></Button><small>Direct to ceo@lspheres.com · Tel: +91 9821751538 · Mumbai, India · Replies within 1 business day.</small></form></div></dialog>;
}

export default function HomePage() {
  useEffect(() => {
    document.title = "LeadSphere AI — Your Digital & AI Transformation Partner";
  }, []);
  const [contactOpen, setContactOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }); }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <><Navbar onContact={() => setContactOpen(true)} /><main><Hero onContact={() => setContactOpen(true)} /><TrustBar /><About /><Services /><Process /><Dashboard /><Metrics /><CaseStudies /><Why /><Testimonials /><CTA onContact={() => setContactOpen(true)} /></main><Footer onContact={() => setContactOpen(true)} /><ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} /></>;
}
