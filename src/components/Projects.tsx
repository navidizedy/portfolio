"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight, Github } from "lucide-react";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
};

export default function Projects() {
  const t = useTranslations("projects");
  const items = t.raw("items") as Project[];

  return (
    <>
      <style>{`
        .proj-section { padding: 128px 24px; }
        .proj-inner { max-width: 1152px; margin: 0 auto; }
        .proj-heading {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem); line-height: 1;
          letter-spacing: 0.05em; color: var(--foreground); margin-bottom: 64px;
        }
        .proj-list { display: flex; flex-direction: column; }
        .proj-item {
          display: grid;
          grid-template-columns: 80px 1fr auto;
          gap: 32px; align-items: start;
          padding: 32px 16px; margin: 0 -16px;
          border-top: 1px solid var(--border);
          border-radius: 12px;
          transition: all 0.3s;
        }
        .proj-item:last-child { border-bottom: 1px solid var(--border); }
        .proj-item:hover { background: color-mix(in srgb, var(--card) 40%, transparent); }
        .proj-index {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: 3rem; line-height: 1;
          color: rgba(var(--accent-rgb), 0.15); padding-top: 4px;
          transition: color 0.3s;
        }
        .proj-item:hover .proj-index { color: rgba(var(--accent-rgb), 0.3); }
        .proj-title { font-size: 1.25rem; font-weight: 600; color: var(--foreground); margin-bottom: 8px; transition: color 0.2s; }
        .proj-item:hover .proj-title { color: var(--accent); }
        .proj-desc { color: var(--muted-foreground); font-size: 0.875rem; line-height: 1.7; margin-bottom: 16px; max-width: 520px; }
        .proj-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .proj-tag {
          font-size: 0.75rem; padding: 4px 12px; border-radius: 99px;
          border: 1px solid var(--border); color: var(--muted-foreground);
          transition: border-color 0.2s;
        }
        .proj-item:hover .proj-tag { border-color: rgba(var(--accent-rgb), 0.3); }
        .proj-buttons { display: flex; gap: 8px; flex-shrink: 0; margin-top: 4px; }
        .proj-button {
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px; border-radius: 99px;
          border: 1px solid var(--border); 
          color: var(--muted-foreground);
          font-size: 0.875rem; font-weight: 500;
          transition: all 0.3s; text-decoration: none;
          white-space: nowrap;
        }
        .proj-button:hover {
          border-color: var(--accent); color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
        }
        .proj-button.demo:hover {
          transform: translateX(2px);
        }
        .proj-button.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .proj-github {
          display: flex; align-items: center; gap: 8px; margin-top: 48px;
          justify-content: center; color: var(--muted-foreground);
          text-decoration: none; font-size: 0.875rem; font-weight: 500; transition: color 0.2s;
        }
        .proj-github:hover { color: var(--foreground); }

        /* MOBILE FIXES */
        @media (max-width: 768px) {
          .proj-item {
            grid-template-columns: 48px 1fr; /* Switch to 2 columns */
            gap: 16px;
          }
          .proj-buttons {
            grid-column: 2; /* Move buttons under the text column */
            margin-top: 16px;
            flex-wrap: wrap;
          }
          .proj-index { font-size: 2rem; }
          .proj-desc { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .proj-button {
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <section id="projects" className="proj-section">
        <div className="proj-inner">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
            className="reveal"
          >
            <span
              style={{
                color: "var(--accent)",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              {t("sectionLabel")}
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border)",
                maxWidth: "60px",
              }}
            />
          </div>

          <h2 className="proj-heading reveal reveal-delay-1">{t("heading")}</h2>

          <div className="proj-list">
            {items.map((project, i) => (
              <div
                key={project.id}
                className="proj-item reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="proj-index">_{project.id}</span>
                <div>
                  <h3 className="proj-title">{project.title}</h3>
                  <p className="proj-desc">{project.description}</p>
                  <div className="proj-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="proj-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="proj-buttons">
                  <a
                    href={project.github || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`proj-button ${!project.github ? "disabled" : ""}`}
                    title={t("codeLabel")}
                    onClick={(e) => !project.github && e.preventDefault()}
                  >
                    <Github size={16} />
                    <span>{t("codeLabel")}</span>
                  </a>
                  <a
                    href={project.demo || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`proj-button demo ${!project.demo ? "disabled" : ""}`}
                    title={t("demoLabel")}
                    onClick={(e) => !project.demo && e.preventDefault()}
                  >
                    <ArrowUpRight size={16} />
                    <span>{t("demoLabel")}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://github.com/navidizedy"
            target="_blank"
            rel="noopener noreferrer"
            className="proj-github reveal"
          >
            <Github size={16} />
            {t("githubLink")}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
