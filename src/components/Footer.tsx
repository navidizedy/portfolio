"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Instagram } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

const SOCIALS = [
  { icon: Github, href: "https://github.com/navidizedy", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/navidizedy",
    label: "LinkedIn",
  },
  { icon: SiX, href: "https://x.com/navidizedy", label: "X" },
  {
    icon: Instagram,
    href: "https://instagram.com/navidizedy",
    label: "Instagram",
  },
];

export default function Footer() {
  // We still use nav translation for the links above
  const navT = useTranslations("nav");

  const navLinks = [
    { label: navT("home"), href: "#home" },
    { label: navT("about"), href: "#about" },
    { label: navT("stack"), href: "#stack" },
    { label: navT("experience"), href: "#experience" },
    { label: navT("projects"), href: "#projects" },
    { label: navT("contact"), href: "#contact" },
  ];

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        .footer-root { border-top: 1px solid var(--border); }
        .footer-inner { max-width: 1152px; margin: 0 auto; padding: 48px 24px; }
        .footer-top {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 32px; margin-bottom: 40px;
        }
        .footer-logo {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: 2rem; letter-spacing: 0.2em;
          color: var(--foreground); background: none; border: none;
          cursor: pointer; transition: color 0.3s;
        }
        .footer-logo:hover { color: var(--accent); }
        .footer-nav { display: flex; flex-wrap: wrap; gap: 24px; }
        .footer-nav-btn {
          font-size: 0.875rem; color: var(--muted-foreground);
          background: none; border: none; cursor: pointer; transition: color 0.2s;
        }
        .footer-nav-btn:hover { color: var(--foreground); }
        .footer-socials { display: flex; align-items: center; gap: 8px; }
        .footer-social-btn {
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; border-radius: 99px;
          border: 1px solid var(--border); color: var(--muted-foreground);
          background: none; cursor: pointer; transition: all 0.2s; text-decoration: none;
        }
        .footer-social-btn:hover { border-color: var(--accent); color: var(--accent); }
        .footer-bottom {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 12px;
          padding-top: 32px; border-top: 1px solid var(--border);
        }
        /* Added dir="ltr" to ensure the copyright and build info always flow left-to-right */
        .footer-bottom-content { 
          display: flex; width: 100%; justify-content: space-between; 
          flex-wrap: wrap; gap: 12px; direction: ltr; 
        }
        .footer-copy { font-size: 0.75rem; color: var(--muted-foreground); }
        .footer-built { font-size: 0.75rem; color: var(--muted-foreground); }
        .footer-built-name { color: var(--accent); font-weight: 500; }
      `}</style>

      <footer className="footer-root">
        <div className="footer-inner">
          <div className="footer-top">
            <button
              className="footer-logo logo-btn"
              onClick={() => scrollTo("#home")}
            >
              NVD<span style={{ color: "var(--accent)" }}>.</span>
            </button>

            <nav className="footer-nav">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  className="footer-nav-btn"
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="footer-socials">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-btn"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p className="footer-copy">
                © {new Date().getFullYear()} Navid Izedy. All rights reserved.
              </p>
              <p className="footer-built">
                Designed & built by{" "}
                <span className="footer-built-name">Navid Izedy</span>
                {" · "} Next.js + Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
