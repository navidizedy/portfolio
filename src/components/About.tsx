"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Code2, Globe, Zap } from "lucide-react";

export default function About() {
  const t = useTranslations("about");

  const highlights = [
    { icon: Code2, label: t("highlights.clean") },
    { icon: Globe, label: t("highlights.global") },
    { icon: Zap, label: t("highlights.performance") },
  ];

  return (
    <>
      <style>{`
        .about-section { padding: 128px 24px; }
        .about-inner { max-width: 1152px; margin: 0 auto; }
        .section-header { display: flex; align-items: center; gap: 16px; margin-bottom: 64px; }
        .section-label { color: var(--accent); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; }
        .section-divider { flex: 1; height: 1px; background: var(--border); max-width: 60px; }
        .about-grid { display: grid; gap: 64px; align-items: center; }
        .about-visual { position: relative; }
        .about-photo-wrap {
          position: relative; max-width: 380px; margin: 0 auto;
          aspect-ratio: 1; border-radius: 24px;
          border: 1px solid var(--border); background: var(--card); overflow: hidden;
        }
        .about-photo-img {
          border-radius: 24px;
        }
        .about-corner {
          position: absolute; width: 28px; height: 28px;
          border-color: rgba(var(--accent-rgb), 0.4);
          border-style: solid; border-width: 0; z-index: 1;
        }
        .about-corner-tl { top: 12px; left: 12px; border-top-width: 2px; border-left-width: 2px; border-radius: 6px 0 0 0; }
        .about-corner-tr { top: 12px; right: 12px; border-top-width: 2px; border-right-width: 2px; border-radius: 0 6px 0 0; }
        .about-corner-bl { bottom: 12px; left: 12px; border-bottom-width: 2px; border-left-width: 2px; border-radius: 0 0 0 6px; }
        .about-corner-br { bottom: 12px; right: 12px; border-bottom-width: 2px; border-right-width: 2px; border-radius: 0 0 6px 0; }
        .about-badge {
          position: absolute; bottom: -16px; right: -16px; z-index: 2;
          background: var(--card); border: 1px solid var(--border);
          border-radius: 16px; padding: 16px; display: flex; align-items: center; gap: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.15);
        }
        .about-badge-icon {
          width: 40px; height: 40px; border-radius: 99px;
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          display: flex; align-items: center; justify-content: center;
          color: var(--accent); font-weight: 700;
        }
        .about-badge-label { font-size: 0.7rem; color: var(--muted-foreground); }
        .about-badge-value { font-size: 0.85rem; font-weight: 600; color: var(--foreground); display: flex; align-items: center; gap: 6px; }
        .status-dot { width: 6px; height: 6px; border-radius: 99px; background: #4ade80; animation: blink 1.5s ease-in-out infinite; }
        .about-heading {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.1;
          letter-spacing: 0.05em; color: var(--foreground); margin-bottom: 24px;
        }
        .about-p { color: var(--muted-foreground); line-height: 1.8; margin-bottom: 20px; }
        .about-highlights { display: flex; flex-wrap: wrap; gap: 12px; }
        .about-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 16px; border-radius: 99px;
          border: 1px solid var(--border); font-size: 0.85rem;
          color: var(--muted-foreground); background: none; transition: all 0.2s;
        }
        .about-chip:hover { border-color: rgba(var(--accent-rgb), 0.5); color: var(--accent); }
        .about-chip-icon { color: var(--accent); }
        @media (min-width: 1024px) {
          .about-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="section-header reveal">
            <span className="section-label">{t("sectionLabel")}</span>
            <div className="section-divider" />
          </div>

          <div className="about-grid">
            {/* Visual Section */}
            <div className="about-visual reveal">
              <div className="about-photo-wrap">
                <Image
                  src="/Navid.jpg"
                  alt="Navid Izedy"
                  width={800}
                  height={800}
                  priority
                  quality={90}
                  className="about-photo-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="about-corner about-corner-tl" />
                <div className="about-corner about-corner-tr" />
                <div className="about-corner about-corner-bl" />
                <div className="about-corner about-corner-br" />
              </div>

              <div className="about-badge">
                <div className="about-badge-icon">✓</div>
                <div>
                  <div className="about-badge-label">{t("statusLabel")}</div>
                  <div className="about-badge-value">
                    <span className="status-dot" />
                    {t("statusValue")}
                  </div>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="reveal reveal-delay-2">
              <h2 className="about-heading">{t("heading")}</h2>
              <p className="about-p">{t("p1")}</p>
              <p className="about-p">{t("p2")}</p>

              <div className="about-highlights">
                {highlights.map(({ icon: Icon, label }) => (
                  <div key={label} className="about-chip">
                    <span className="about-chip-icon">
                      <Icon size={14} />
                    </span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
