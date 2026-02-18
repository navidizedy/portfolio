"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const stats = t.raw("stats") as Record<string, string>;
  const locale = useLocale();

  const ROLES =
    locale === "fa"
      ? ["توسعه‌دهنده فول‌استک", "مشارکت در اپن سورس", "حل مسئله"]
      : ["FULL STACK DEVELOPER", "OPEN SOURCE CONTRIBUTOR", "PROBLEM SOLVER"];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    setRoleIndex(0);
    setDisplayed("");
    setDeleting(false);
    setCharIndex(0);
  }, [locale]);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(currentRole.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, roleIndex, ROLES]);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const statItems = [
    { value: stats.years, label: stats.yearsLabel },
    { value: stats.projects, label: stats.projectsLabel },
    { value: stats.hours, label: stats.hoursLabel },
  ];

  return (
    <>
      <style>{`
        .hero-section {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          padding: 96px 24px 64px;
        }
        .hero-inner { max-width: 1152px; margin: 0 auto; width: 100%; }
        .hero-grid { display: grid; gap: 64px; align-items: center; }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 99px;
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          background: rgba(var(--accent-rgb), 0.05);
          margin-bottom: 32px;
          animation: fadeUp 0.6s ease forwards;
        }
        .hero-badge-dot {
          width: 8px; height: 8px; border-radius: 99px;
          background: var(--accent);
          animation: blink 1.4s ease-in-out infinite;
        }
        .hero-badge-text { color: var(--accent); font-size: 0.8rem; font-weight: 500; letter-spacing: 0.2em; }
        .hero-name {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          line-height: 1; letter-spacing: 0.05em;
          color: var(--foreground); margin-bottom: 16px;
          animation: fadeUp 0.6s 0.1s ease both;
        }
        .hero-role {
          font-size: clamp(1.2rem, 3vw, 2rem);
          letter-spacing: 0.1em; color: var(--accent);
          margin-bottom: 32px; min-height: 2.4rem;
          animation: fadeUp 0.6s 0.2s ease both;
          font-weight: 600;
        }
        .hero-cursor { animation: blink 1s step-end infinite; }
        .hero-tagline {
          color: var(--muted-foreground); font-size: 1.1rem;
          line-height: 1.8; max-width: 560px; margin-bottom: 40px;
        }
        .hero-ctas { display: flex; flex-wrap: wrap; gap: 16px; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: var(--accent);
          color: #fff; font-weight: 600; border-radius: 99px;
          border: none; cursor: pointer; font-size: 0.95rem;
          transition: all 0.3s; box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.3);
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--accent-light); transform: scale(1.04);
          box-shadow: 0 0 35px rgba(var(--accent-rgb), 0.45);
          color: #fff;
        }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border: 1px solid var(--border);
          color: var(--foreground); font-weight: 600; border-radius: 99px;
          background: none; cursor: pointer; font-size: 0.95rem; transition: all 0.3s;
          text-decoration: none;
        }
        .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }
        .hero-stats { display: flex; gap: 16px; }
        .stat-card {
          flex: 1; padding: 20px 24px; border-radius: 16px;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--card) 60%, transparent);
          backdrop-filter: blur(8px); transition: all 0.3s;
        }
        .stat-card:hover { border-color: rgba(var(--accent-rgb), 0.4); background: var(--card); }
        .stat-value {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: 3rem; color: var(--accent); line-height: 1;
        }
        .stat-label { font-size: 0.75rem; color: var(--muted-foreground); margin-top: 4px; line-height: 1.4; }
        .scroll-indicator {
          position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          color: var(--muted-foreground);
        }
        .scroll-line {
          width: 1px; height: 48px;
          background: linear-gradient(to bottom, rgba(var(--accent-rgb), 0.6), transparent);
          animation: blink 2s ease-in-out infinite;
        }
        .scroll-text { font-size: 0.65rem; letter-spacing: 0.3em; }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr auto; }
          .hero-stats { flex-direction: column; gap: 16px; }
          .stat-card { padding: 24px; }
          .stat-value { font-size: 3.5rem; }
        }
        @media (max-width: 1023px) { .hero-stats { flex-direction: row; } }
        @media (max-width: 600px) { .hero-stats { flex-direction: column; } }
      `}</style>

      <section id="home" className="hero-section">
        <div className="hero-inner">
          <div className="hero-grid">
            {/* Left Content */}
            <div>
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                <span className="hero-badge-text">
                  {t("greeting", { name: t("name") })}
                </span>
              </div>

              <h1 className="hero-name">{t("name").toUpperCase()}</h1>

              <div className="hero-role">
                {displayed}
                <span className="hero-cursor">|</span>
              </div>

              <p className="hero-tagline reveal reveal-delay-2">
                {t("tagline")}
              </p>

              <div className="hero-ctas reveal reveal-delay-3">
                <a
                  href="https://karlancer.com/profile/652773"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  {t("hireMe")} <ArrowRight size={16} />
                </a>
                <a
                  href="#projects"
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo("#projects");
                  }}
                >
                  {t("viewWork")}
                </a>
              </div>
            </div>

            {/* Stats Section */}
            <div className="hero-stats reveal reveal-delay-4">
              {statItems.map((s, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span className="scroll-text">SCROLL</span>
          </div>
        </div>
      </section>
    </>
  );
}
