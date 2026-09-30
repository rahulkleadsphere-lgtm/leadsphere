import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, Clock, ShieldCheck, Send, CheckCircle2, ChevronDown, MapPin, Globe, Linkedin, ArrowUpRight } from "lucide-react";
import { SiteHeader, ArrowLabel } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";


const faqs = [
  {
    q: "How quickly can we ship our first production model or pipeline?",
    a: "Most client engagements follow a 4 to 8-week production sprint. We map bottlenecks in week 1, architect and test solutions in weeks 2-4, and deploy to your cloud with CI/CD and monitoring by week 6.",
  },
  {
    q: "Who owns the intellectual property and model weights?",
    a: "You retain 100% of the code, fine-tuned weights, embeddings, and infrastructure scripts. We never lock you into proprietary runtimes.",
  },
  {
    q: "How do you guarantee enterprise data privacy and SOC2 compliance?",
    a: "We deploy models within your VPC and private cloud boundaries. Your enterprise data never crosses external third-party training APIs, and all pipelines adhere to SOC2, HIPAA, and GDPR standards.",
  },
  {
    q: "What cloud providers and tech stacks do you support?",
    a: "We are vendor-neutral. We build across AWS (Bedrock, SageMaker), Google Cloud (Vertex AI), Microsoft Azure (Azure OpenAI), and hybrid on-premise Kubernetes clusters.",
  },
];

export default function ContactPage() {
  useEffect(() => {
    document.title = "Contact Us & Strategy Call — LeadSphere AI";
  }, []);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const reduced = useReducedMotion();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Enterprise AI Consultation Request — ${data.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nCompany: ${data.get("company")}\nTimeline: ${data.get(
        "timeline"
      )}\nBudget: ${data.get("budget")}\n\nProject Goals:\n${data.get("message")}`
    );

    window.location.href = `mailto:ceo@lspheres.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader activeId="contact" />

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
              DIRECT ARCHITECT ACCESS <span className="badge-dot">•</span> 24H RESPONSE GUARANTEE
            </motion.div>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.12]"
            >
              Let's Architect Your
              <br />
              <span className="gradient-text">Next AI Breakthrough.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Whether you are evaluating practical AI use cases, auditing legacy infrastructure, or scaling
              multi-agent production systems, our senior practitioners reply within one business day.
            </motion.p>
          </div>
        </section>

        {/* Contact Layout */}
        <section className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Direct channels & FAQs */}
            <div className="lg:col-span-5 space-y-8">
              {/* Contact Information Card */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm space-y-6">
                <span className="eyebrow">DIRECT CONTACT</span>
                <h3 className="text-2xl font-bold tracking-tight">Direct Channels</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Skip the sales qualification queue and speak directly with our engineering leadership.
                </p>

                <div className="space-y-3.5 pt-2">
                  <a
                    href="mailto:ceo@lspheres.com"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-accent/40 border border-border hover:border-primary/40 transition-all hover:bg-accent/60 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                        Email Address
                      </div>
                      <div className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        ceo@lspheres.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+919821751538"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-accent/40 border border-border hover:border-primary/40 transition-all hover:bg-accent/60 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                        Phone &amp; WhatsApp
                      </div>
                      <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                        +91 9821751538
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-accent/40 border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                        Headquarters Location
                      </div>
                      <div className="text-sm font-bold text-foreground">Mumbai, India</div>
                    </div>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/amitk1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-accent/40 border border-border hover:border-primary/40 transition-all hover:bg-accent/60 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Linkedin size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                        LinkedIn Profile
                      </div>
                      <div className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-1">
                        linkedin.com/in/amitk1 <ArrowUpRight size={13} className="shrink-0" />
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://leadsphere-ai.lovable.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-accent/40 border border-border hover:border-primary/40 transition-all hover:bg-accent/60 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Globe size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-mono uppercase font-bold text-muted-foreground">
                        Portfolio Website
                      </div>
                      <div className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors flex items-center gap-1">
                        www.leadsphere-ai.lovable.app <ArrowUpRight size={13} className="shrink-0" />
                      </div>
                    </div>
                  </a>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border">
                      <Clock size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="text-[9px] font-mono uppercase font-bold text-muted-foreground">SLA</div>
                        <div className="text-xs font-bold text-foreground">&lt; 1 Business Day</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border">
                      <ShieldCheck size={16} className="text-primary shrink-0" />
                      <div>
                        <div className="text-[9px] font-mono uppercase font-bold text-muted-foreground">Security</div>
                        <div className="text-xs font-bold text-foreground">Strict NDA</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
                <span className="eyebrow mb-3">FREQUENT QUESTIONS</span>
                <h3 className="text-xl font-bold tracking-tight mb-6">Engagement Details</h3>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div
                      key={faq.q}
                      className="rounded-2xl border border-border overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 text-xs font-bold flex items-center justify-between gap-3 text-foreground hover:bg-accent/40"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-muted-foreground transition-transform duration-200 ${
                            openFaq === idx ? "rotate-180 text-primary" : ""
                          }`}
                        />
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Consultation Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-card p-8 md:p-10 shadow-sm relative overflow-hidden">
                <span className="eyebrow mb-3">CONSULTATION REQUEST</span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                  Tell Us About Your Project
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-8">
                  Fill in the details below and we will prepare a dedicated technical roadmap for your review.
                </p>

                {submitted ? (
                  <div className="p-8 text-center rounded-2xl bg-primary/10 border border-primary/20 space-y-4">
                    <CheckCircle2 size={48} className="mx-auto text-primary" />
                    <h4 className="text-xl font-bold text-foreground">Your Email Client Has Been Opened!</h4>
                    <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                      Your project request has been formatted to send directly to{" "}
                      <strong className="text-foreground">ceo@lspheres.com</strong>. We will review your goals and
                      reply with an architectural assessment within 24 hours.
                    </p>
                    <Button variant="brandOutline" onClick={() => setSubmitted(false)}>
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                          Your Name *
                        </label>
                        <input
                          name="name"
                          required
                          placeholder="Alex Morgan"
                          autoComplete="name"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                          Work Email *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          placeholder="alex@enterprise.com"
                          autoComplete="email"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Company / Organization
                      </label>
                      <input
                        name="company"
                        placeholder="Enterprise Inc."
                        autoComplete="organization"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                          Target Timeline
                        </label>
                        <select
                          name="timeline"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="Immediate (Next 30 days)">Immediate (Next 30 days)</option>
                          <option value="Next Quarter (1-3 months)">Next Quarter (1-3 months)</option>
                          <option value="Strategic Planning (3-6 months)">Strategic Planning (3-6 months)</option>
                          <option value="Exploring Feasibility">Exploring Feasibility</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                        >
                          <option value="₹10L - ₹25L ($15k - $30k)">₹10L - ₹25L ($15k - $30k)</option>
                          <option value="₹25L - ₹50L ($30k - $60k)">₹25L - ₹50L ($30k - $60k)</option>
                          <option value="₹50L+ ($60k+) enterprise">₹50L+ ($60k+) enterprise</option>
                          <option value="To be determined">To be determined</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider font-mono">
                        Project Description &amp; Objectives *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Describe your current tech stack, bottlenecks, data availability, and what operational outcomes you want to achieve..."
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      />
                    </div>

                    <Button type="submit" variant="brand" className="w-full py-4 text-sm font-bold shadow-lg">
                      <ArrowLabel>Submit Request to ceo@lspheres.com</ArrowLabel>
                    </Button>

                    <p className="text-center text-[11px] text-muted-foreground pt-2">
                      Direct executive delivery to ceo@lspheres.com · Confidentiality guaranteed.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
