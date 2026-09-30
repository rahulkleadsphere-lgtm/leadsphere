import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function ArrowLabel({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArrowUpRight className="button-arrow" size={17} aria-hidden="true" />
    </>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="/#home" className={`logo-lockup ${inverted ? "logo-inverted" : ""}`} aria-label="LeadSphere Solutions, back to top">
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

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
] as const;

interface SiteHeaderProps {
  onContact?: () => void;
  activeId?: string;
}

export function SiteHeader({ onContact, activeId = "" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled || open ? "site-header-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Logo />

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={`nav-link ${activeId === item.label.toLowerCase() ? "nav-link-active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          {onContact ? (
            <Button variant="brand" className="nav-cta" onClick={onContact}>
              <ArrowLabel>Book a Strategy Call</ArrowLabel>
            </Button>
          ) : (
            <Button variant="brand" className="nav-cta" asChild>
              <a href="/contact">
                <ArrowLabel>Book a Strategy Call</ArrowLabel>
              </a>
            </Button>
          )}

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
          {navItems.map((item) => (
            <a key={item.label} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight size={17} />
            </a>
          ))}
          <div className="mobile-nav-footer flex items-center justify-between pt-4 mt-2 border-t border-border">
            <span className="text-xs font-semibold text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
          {onContact ? (
            <Button
              variant="brand"
              className="w-full mt-3"
              onClick={() => {
                setOpen(false);
                onContact();
              }}
            >
              <ArrowLabel>Book a Strategy Call</ArrowLabel>
            </Button>
          ) : (
            <Button variant="brand" className="w-full mt-3" asChild>
              <a href="/contact" onClick={() => setOpen(false)}>
                <ArrowLabel>Book a Strategy Call</ArrowLabel>
              </a>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
