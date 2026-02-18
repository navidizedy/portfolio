"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Copy, Check, Mail, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);
  const email = t("email");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("input");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        .contact-section { padding: 128px 24px; }
        .contact-inner { max-width: 1152px; margin: 0 auto; }
        .contact-box {
          position: relative; border-radius: 24px;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--card) 30%, transparent);
          padding: 80px 40px; overflow: hidden; text-align: center;
        }
        .contact-glow-1 {
          position: absolute; top: -80px; right: -80px;
          width: 256px; height: 256px; border-radius: 99px;
          background: rgba(var(--accent-rgb), 0.05); filter: blur(60px);
          pointer-events: none;
        }
        .contact-glow-2 {
          position: absolute; bottom: -80px; left: -80px;
          width: 256px; height: 256px; border-radius: 99px;
          background: rgba(var(--accent-rgb), 0.05); filter: blur(60px);
          pointer-events: none;
        }
        .contact-icon-wrap {
          width: 64px; height: 64px; border-radius: 16px;
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          background: rgba(var(--accent-rgb), 0.08);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 32px; color: var(--accent);
        }
        .contact-heading {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 6vw, 4.5rem); line-height: 1.1;
          letter-spacing: 0.05em; color: var(--foreground); margin-bottom: 16px;
        }
        .contact-sub { color: var(--muted-foreground); font-size: 1.1rem; margin-bottom: 40px; }
        .contact-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 12px; }
        .contact-email-display {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 20px; border-radius: 99px;
          border: 1px solid var(--border);
          background: color-mix(in srgb, var(--background) 60%, transparent);
          backdrop-filter: blur(8px);
          font-weight: 500; color: var(--foreground);
        }
        .btn-primary {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 28px; background: var(--accent);
          color: #fff; font-weight: 600; border-radius: 99px;
          border: none; cursor: pointer; font-size: 0.9rem;
          text-decoration: none; transition: all 0.3s;
          box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.3);
        }
        .btn-primary:hover { opacity: 0.9; box-shadow: 0 0 35px rgba(var(--accent-rgb), 0.45); }
        .btn-copy {
          display: flex; align-items: center; gap: 8px;
          padding: 14px 20px; border-radius: 99px;
          border: 1px solid var(--border); font-size: 0.9rem;
          font-weight: 500; background: none; cursor: pointer; transition: all 0.3s;
        }
        .btn-copy.idle { color: var(--muted-foreground); }
        .btn-copy.idle:hover { border-color: var(--accent); color: var(--accent); }
        .btn-copy.done { border-color: #4ade80; color: #4ade80; background: rgba(74,222,128,0.08); }
      `}</style>

      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "64px" }} className="reveal">
            <span style={{ color: "var(--accent)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              {t("sectionLabel")}
            </span>
            <div style={{ flex: 1, height: "1px", background: "var(--border)", maxWidth: "60px" }} />
          </div>

          <div className="contact-box reveal reveal-delay-1">
            <div className="contact-glow-1" />
            <div className="contact-glow-2" />

            <div className="contact-icon-wrap">
              <Mail size={28} />
            </div>

            <h2 className="contact-heading">{t("heading")}</h2>
            <p className="contact-sub">{t("subheading")}</p>

            <div className="contact-actions">
              <div className="contact-email-display">{email}</div>
              <a href={`mailto:${email}`} className="btn-primary">
                {t("sendEmail")} <ArrowUpRight size={16} />
              </a>
              <button
                onClick={handleCopy}
                className={`btn-copy ${copied ? "done" : "idle"}`}
              >
                {copied ? <><Check size={14} /> {t("copied")}</> : <><Copy size={14} /> {t("copyEmail")}</>}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
