import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin, Globe, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./SiteHeader";

interface SiteFooterProps {
  onContact?: () => void;
}

export function SiteFooter({ onContact }: SiteFooterProps) {
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
              <a href="/#services">Services</a>
              <a href="/portfolio">Portfolio</a>
              <a href="/#process">Our Approach</a>
            </div>

            <div>
              <h3>RESOURCES</h3>
              <a href="/#dashboard">Command Center</a>
              <a href="/#results">Results &amp; ROI</a>
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
              <a
                href="https://leadsphere-ai.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe size={14} /> Portfolio Site <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 LeadSphere Solutions. All rights reserved.</span>
          <span>
            ENGINEERED FOR IMPACT <span className="footer-star">✳</span>
          </span>
          <a href="#home" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Back to top <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
