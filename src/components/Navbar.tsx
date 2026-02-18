"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("nav");
  const tLang = useTranslations("lang");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navLinks = [
    { label: t("home"), href: "#home" },
    { label: t("about"), href: "#about" },
    { label: t("stack"), href: "#stack" },
    { label: t("experience"), href: "#experience" },
    { label: t("projects"), href: "#projects" },
    { label: t("contact"), href: "#contact" },
  ];

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "fa" : "en";
    // pathname is like /en or /en/something — swap the locale segment
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const newPath = segments.join("/") || `/${nextLocale}`;
    router.push(newPath);
  };

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-root {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          transition: all 0.4s ease;
        }
        .nav-inner {
          max-width: 1152px; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: 1.5rem; letter-spacing: 0.2em;
          color: var(--foreground); background: none; border: none;
          cursor: pointer; transition: color 0.3s;
        }
        .nav-logo:hover { color: var(--accent); }
        .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
        .nav-link-btn {
          font-size: 0.875rem; font-weight: 500; color: var(--muted-foreground);
          background: none; border: none; cursor: pointer; transition: color 0.2s;
        }
        .nav-link-btn:hover { color: var(--foreground); }
        .nav-controls { display: flex; align-items: center; gap: 8px; }
        .nav-icon-btn {
          width: 36px; height: 36px; display: flex; align-items: center;
          justify-content: center; border-radius: 99px;
          border: 1px solid var(--border); color: var(--muted-foreground);
          background: none; cursor: pointer; transition: all 0.2s;
        }
        .nav-icon-btn:hover { border-color: var(--accent); color: var(--accent); }
        .nav-lang-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 6px 14px; border-radius: 99px;
          border: 1px solid var(--border); font-size: 0.75rem; font-weight: 600;
          color: var(--muted-foreground); background: none; cursor: pointer;
          transition: all 0.2s; letter-spacing: 0.05em;
        }
        .nav-lang-btn:hover { border-color: var(--accent); color: var(--foreground); }
        .lang-active { color: var(--accent); }
        .lang-sep { color: var(--border); }
        .mobile-menu-overlay {
          position: fixed; inset: 0; z-index: 40;
          transition: opacity 0.4s;
        }
        .mobile-menu-backdrop {
          position: absolute; inset: 0;
          background: color-mix(in srgb, var(--background) 95%, transparent);
          backdrop-filter: blur(20px);
        }
        .mobile-menu-panel {
          position: absolute; top: 72px; left: 0; right: 0;
          background: var(--card);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 32px 24px;
          transition: transform 0.4s;
        }
        .mobile-link-btn {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: 2rem; letter-spacing: 0.1em;
          color: var(--foreground); background: none; border: none;
          cursor: pointer; transition: color 0.2s; display: block;
        }
        .mobile-link-btn:hover { color: var(--accent); }
        @media (max-width: 767px) {
          .nav-links { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-toggle { display: none !important; }
        }
      `}</style>

      <nav
        className="nav-root"
        style={{
          padding: scrolled ? "12px 0" : "24px 0",
          background: scrolled
            ? "color-mix(in srgb, var(--background) 85%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="nav-inner">
          <button
            className="nav-logo logo-btn"
            onClick={() => scrollTo("#home")}
          >
            NVD<span style={{ color: "var(--accent)" }}>.</span>
          </button>

          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className="nav-link-btn"
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="nav-controls">
            {/* Language switcher */}
            <button
              className="nav-lang-btn"
              onClick={switchLocale}
              title="Switch language"
            >
              <span
                style={{ color: locale === "en" ? "var(--accent)" : undefined }}
              >
                EN
              </span>
              <span className="lang-sep">/</span>
              <span
                style={{ color: locale === "fa" ? "var(--accent)" : undefined }}
              >
                FA
              </span>
            </button>

            {/* Theme toggle */}
            {mounted && (
              <button
                className="nav-icon-btn"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            )}

            {/* Mobile toggle */}
            <button
              className="nav-icon-btn mobile-toggle"
              style={{ display: "none" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="mobile-menu-overlay"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
        }}
      >
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className="mobile-menu-panel"
          style={{
            transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          }}
        >
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  className="mobile-link-btn"
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          {/* Language switcher in mobile menu too */}
          <div
            style={{
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              className="nav-lang-btn"
              onClick={switchLocale}
              style={{ fontSize: "1rem", padding: "10px 20px" }}
            >
              <span
                style={{ color: locale === "en" ? "var(--accent)" : undefined }}
              >
                EN
              </span>
              <span className="lang-sep"> / </span>
              <span
                style={{ color: locale === "fa" ? "var(--accent)" : undefined }}
              >
                FA
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
