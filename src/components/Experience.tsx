"use client";

import { useTranslations } from "next-intl";
import { Briefcase } from "lucide-react";

type Job = { company: string; role: string; period: string; description: string; };

export default function Experience() {
  const t = useTranslations("experience");
  const jobs = t.raw("jobs") as Job[];

  return (
    <>
      <style>{`
        .exp-section { padding: 128px 24px; }
        .exp-inner { max-width: 1152px; margin: 0 auto; }
        .exp-heading {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 5vw, 4rem); line-height: 1.1;
          letter-spacing: 0.05em; color: var(--foreground); margin-bottom: 64px;
        }
        .exp-timeline { position: relative; }
        .exp-timeline-line {
          position: absolute; left: 11px; top: 0; bottom: 0; width: 1px;
          background: linear-gradient(to bottom, var(--accent), rgba(var(--accent-rgb), 0.1));
        }
        .exp-item { position: relative; padding-left: 56px; padding-bottom: 56px; }
        .exp-item:last-child { padding-bottom: 0; }
        .exp-dot {
          position: absolute; left: 0; top: 4px;
          width: 24px; height: 24px; border-radius: 99px;
          border: 2px solid var(--accent); background: var(--background);
          display: flex; align-items: center; justify-content: center; z-index: 1;
        }
        .exp-dot-inner { width: 8px; height: 8px; border-radius: 99px; background: var(--accent); }
        .exp-card {
          padding: 24px 32px; border-radius: 16px;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--card) 30%, transparent);
          transition: all 0.3s;
        }
        .exp-card:hover {
          border-color: rgba(var(--accent-rgb), 0.4);
          background: color-mix(in srgb, var(--card) 60%, transparent);
        }
        .exp-card-top { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
        .exp-company { font-size: 1.1rem; font-weight: 600; color: var(--foreground); transition: color 0.2s; }
        .exp-card:hover .exp-company { color: var(--accent); }
        .exp-role { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; color: var(--accent); margin-top: 2px; }
        .exp-period {
          font-size: 0.75rem; font-weight: 500; color: var(--muted-foreground);
          border: 1px solid var(--border); padding: 4px 12px; border-radius: 99px;
          white-space: nowrap;
        }
        .exp-desc { color: var(--muted-foreground); font-size: 0.9rem; line-height: 1.7; }
        @media (max-width: 767px) {
          .exp-timeline-line { display: none; }
          .exp-item { padding-left: 0; }
          .exp-dot { display: none; }
        }
      `}</style>

      <section id="experience" className="exp-section">
        <div className="exp-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }} className="reveal">
            <span style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              {t("sectionLabel")}
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "60px" }} />
          </div>

          <h2 className="exp-heading reveal reveal-delay-1">{t("heading")}</h2>

          <div className="exp-timeline">
            <div className="exp-timeline-line" />
            {jobs.map((job, i) => (
              <div
                key={i}
                className="exp-item reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="exp-dot">
                  <div className="exp-dot-inner" />
                </div>
                <div className="exp-card">
                  <div className="exp-card-top">
                    <div>
                      <div className="exp-company">{job.company}</div>
                      <div className="exp-role">
                        <Briefcase size={12} />
                        {job.role}
                      </div>
                    </div>
                    <span className="exp-period">{job.period}</span>
                  </div>
                  <p className="exp-desc">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
