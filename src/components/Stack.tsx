"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const STACK = {
  frontend: [
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Redux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    },
    {
      name: "Zustand",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/zustand/zustand-original.svg",
    },
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
  ],
  backend: [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    },
    {
      name: "NestJS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg",
    },
    {
      name: "REST API",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    },
    {
      name: "GraphQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
  ],
  database: [
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "Redis",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    },
  ],
  tools: [
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "GitHub",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Jest",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
    },
    {
      name: "TanStack Query",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjU2IDIzMCI+PHBhdGggZmlsbD0iIzAwNDM1QiIgZD0ibTE1Ny45OCAxNDIuNDg3bC00LjkxIDguNTI3YTguMjg4IDguMjg4IDAgMCAxLTcuMTgyIDQuMTUxSDEwOC4yN2E4LjI4OCA4LjI4OCAwIDAgMS03LjE4Mi00LjE1MWwtNC45MTEtOC41MjdoNjEuODAyWm0xMy43NDctMjMuODdsLTguNjU4IDE1LjAzNGgtNzEuOThsLTguNjU4LTE1LjAzNGg4OS4yOTZabS04LjM0LTIzLjM0Mmw4LjM1NCAxNC41MDZIODIuNDE3bDguMzU0LTE0LjUwNmg3Mi42MTZabS0xNy41LTIyLjA2NmE4LjI4OCA4LjI4OCAwIDAgMSA3LjE4MyA0LjE1MWw1LjIyOCA5LjA3OUg5NS44Nmw1LjIyOS05LjA3OWE4LjI4OCA4LjI4OCAwIDAgMSA3LjE4Mi00LjE1MWgzNy42MTdaIi8+PHBhdGggZmlsbD0iIzAwMkIzQiIgZD0iTTUzLjUyMyA2OS4yNTJjLTQuMTY3LTIwLjIwNi01LjA2Mi0zNS43MDQtMi4zNjgtNDYuOTU3YzEuNjAyLTYuNjkzIDQuNTMtMTIuMTUzIDguOTg0LTE2LjA5M2M0LjcwMi00LjE1OSAxMC42NDYtNi4yIDE3LjMyNi02LjJjMTEuMDE4IDAgMjIuNjAyIDUuMDI1IDM0Ljk4IDE0LjU3YzUuMDUgMy44OTQgMTAuMjkgOC41ODcgMTUuNzMyIDE0LjA4MmMuNDM0LS41NTcuOTIzLTEuMDgzIDEuNDY5LTEuNTdjMTUuMzg2LTEzLjcxIDI4LjM0LTIyLjIzIDM5LjQyLTI1LjUxNGM2LjU4OC0xLjk1NCAxMi43NzMtMi4xNCAxOC40MDUtLjI0NGM1Ljk0NiAyIDEwLjY4MyA2LjEzNyAxNC4wMjYgMTEuOTNjNS41MTYgOS41NjEgNi45NyAyMi4xMjQgNC45MTQgMzcuNjM3Yy0uODM4IDYuMzIzLTIuMjcxIDEzLjIxLTQuMjk2IDIwLjY3M2MuNzY0LjA5MiAxLjUzLjI2MiAyLjI4OC41MTNjMTkuNTIxIDYuNDcgMzMuMzQ1IDEzLjQyNiA0MS43MTQgMjEuMzc3YzQuOTggNC43MyA4LjIzMSA5Ljk5NiA5LjQwNyAxNS44MjZjMS4yNCA2LjE1My4wMyAxMi4zMjQtMy4zMDggMTguMTEzYy01LjUwNiA5LjU0OC0xNS42MyAxNy4wNzctMzAuMDUyIDIzLjA0MWMtNS43OSAyLjM5NS0xMi4zNDMgNC41NjQtMTkuNjY0IDYuNTE1Yy4zMzQuNzU0LjU5NCAxLjU1NS43NjcgMi4zOTVjNC4xNjcgMjAuMjA2IDUuMDYxIDM1LjcwNCAyLjM2OCA0Ni45NTdjLTEuNjAyIDYuNjkzLTQuNTMxIDEyLjE1My04Ljk4NSAxNi4wOTNjLTQuNzAxIDQuMTU5LTEwLjY0NiA2LjItMTcuMzI1IDYuMmMtMTEuMDE5IDAtMjIuNjAyLTUuMDI1LTM0Ljk4LTE0LjU3Yy01LjEwNC0zLjkzNi0xMC40MDItOC42ODctMTUuOTA3LTE0LjI1OGExMS43MzcgMTEuNzM3IDAgMCAxLTIuMDg0IDIuNDQyYy0xNS4zODYgMTMuNzEyLTI4LjM0IDIyLjIzLTM5LjQyIDI1LjUxNWMtNi41ODggMS45NTQtMTIuNzczIDIuMTQtMTguNDA1LjI0NGMtNS45NDYtMi0xMC42ODMtNi4xMzctMTQuMDI2LTExLjkzYy01LjUxNi05LjU2MS02Ljk3LTIyLjEyNC00LjkxNC0zNy42MzdjLjg2OS02LjU1MSAyLjM3Ni0xMy43MDkgNC41MTgtMjEuNDg1YTExLjczMiAxMS43MzIgMCAwIDEtMi41MS0uNTM3Yy0xOS41MjEtNi40Ny0zMy4zNDUtMTMuNDI2LTQxLjcxNC0yMS4zNzdjLTQuOTgtNC43My04LjIzMS05Ljk5Ni05LjQwNy0xNS44MjZjLTEuMjQtNi4xNTMtLjAzLTEyLjMyNSAzLjMwOC0xOC4xMTRjNS41MDYtOS41NDcgMTUuNjMtMTcuMDc3IDMwLjA1Mi0yMy4wNGM1Ljk2My0yLjQ2NyAxMi43MzQtNC42OTMgMjAuMzItNi42ODlhMTEuODEgMTEuODEgMCAwIDEtLjYzMy0yLjA4MloiLz48cGF0aCBmaWxsPSIjRkY0MTU0IiBkPSJNMTg5LjY0NyAxNjEuMzMzYTMuNjg0IDMuNjg0IDAgMCAxIDQuMjM1IDIuODFsLjAyMy4xMTJsLjIwNyAxLjA3NWM2LjcxIDM1LjI3NiAxLjk4MyA1Mi45MTUtMTQuMTggNTIuOTE1Yy0xNS44MTMgMC0zNS45NDQtMTUuMDUxLTYwLjM5Mi00NS4xNTNhMy42ODQgMy42ODQgMCAwIDEgMi43NzctNi4wMDVoLjExNGwxLjI4OC4wMDljMTAuMjg4LjA1NiAyMC4yODktLjMwMyAzMC4wMDQtMS4wNzZjMTEuNDY3LS45MTMgMjMuNDQyLTIuNDc1IDM1LjkyNC00LjY4N1pNNzguNjQ2IDEzNC42NjdsLjA2Mi4xMDVsLjY0NiAxLjEyN2M1LjE3NyA5IDEwLjU3IDE3LjU0MiAxNi4xOCAyNS42MjdjNi42MDggOS41MiAxNC4wMzggMTkuMTU4IDIyLjI5IDI4LjkxNGEzLjY4NCAzLjY4NCAwIDAgMS0uMzA5IDUuMDgybC0uMDkzLjA4M2wtLjgzLjcxNWMtMjcuMzA3IDIzLjM5Ny00NS4wNTUgMjguMDY4LTUzLjI0NCAxNC4wMTJjLTguMDE3LTEzLjc1Ny01LjExLTM4Ljc3MyA4LjcxOS03NS4wNDdhMy42ODMgMy42ODMgMCAwIDEgNi41NzktLjYxOFptMTI0Ljg1Ny01Mi4wNTRsLjExMi4wMzdsMS4wMjguMzU0YzMzLjcwNSAxMS43MjUgNDYuNTEgMjQuNjEgMzguNDE2IDM4LjY1NWMtNy45MTYgMTMuNzM2LTMwLjkzIDIzLjczOC02OS4wNDEgMzAuMDA0YTMuNjgzIDMuNjgzIDAgMCAxLTMuNzczLTUuNTAxYzUuNDU4LTkuMjg2IDEwLjM3NS0xOC41MjQgMTQuNzQ5LTI3LjcxN2M0Ljk2LTEwLjQyNSA5LjYxNS0yMS42MTYgMTMuOTY1LTMzLjU3YTMuNjg0IDMuNjg0IDAgMCAxIDQuNDMyLTIuMjk1bC4xMTIuMDMzWk04NC40NDYgNzYuNzFhMy42ODMgMy42ODMgMCAwIDEgMS4zMSA1LjA0MmMtNS40NiA5LjI4NS0xMC4zNzYgMTguNTI0LTE0Ljc1IDI3LjcxN2MtNC45NiAxMC40MjUtOS42MTUgMjEuNjE1LTEzLjk2NSAzMy41N2EzLjY4NCAzLjY4NCAwIDAgMS00LjU0NCAyLjI2MmwtLjExMi0uMDM3bC0xLjAyOC0uMzU1Yy0zMy43MDUtMTEuNzI0LTQ2LjUxLTI0LjYxLTM4LjQxNi0zOC42NTRjNy45MTYtMTMuNzM3IDMwLjkzLTIzLjczOCA2OS4wNDEtMzAuMDA0Yy44NS0uMTQgMS43MjIuMDIyIDIuNDY0LjQ1OVptMTA4LjIwNi01Ny43NDhjOC4wMTcgMTMuNzU4IDUuMTEgMzguNzc0LTguNzE5IDc1LjA0OGEzLjY4MyAzLjY4MyAwIDAgMS02LjU3OS42MThsLS4wNjItLjEwNWwtLjY0Ni0xLjEyN2MtNS4xNzctOS0xMC41Ny0xNy41NDItMTYuMTgtMjUuNjI3Yy02LjYwOC05LjUyLTE0LjAzOC0xOS4xNTgtMjIuMjktMjguOTE0YTMuNjg0IDMuNjg0IDAgMCAxIC4zMDktNS4wODJsLjA5My0uMDgzbC44My0uNzE1YzI3LjMwNy0yMy4zOTcgNDUuMDU1LTI4LjA2OCA1My4yNDQtMTQuMDEzWk03Ny40NSAxMC41OWMxNS44MTQgMCAzNS45NDUgMTUuMDUgNjAuMzkyIDQ1LjE1MmEzLjY4NCAzLjY4NCAwIDAgMS0yLjc3NyA2LjAwNWgtLjExNGwtMS4yODgtLjAwOGMtMTAuMjg3LS4wNTYtMjAuMjg5LjMwMy0zMC4wMDMgMS4wNzZjLTExLjQ2OC45MTMtMjMuNDQzIDIuNDc1LTM1LjkyNSA0LjY4N2EzLjY4NCAzLjY4NCAwIDAgMS00LjIzNC0yLjgxbC0uMDI0LS4xMTNsLS4yMDctMS4wNzRDNTYuNTYgMjguMjI4IDYxLjI4NiAxMC41OSA3Ny40NSAxMC41OVoiLz48cGF0aCBmaWxsPSIjRkZEOTRDIiBkPSJNMTExLjI5NSA3My42N2gzMS41NzZhMTIuODkgMTIuODkgMCAwIDEgMTEuMTgxIDYuNDc1bDE1Ljg1NSAyNy42MjZhMTIuODkyIDEyLjg5MiAwIDAgMSAwIDEyLjgzNGwtMTUuODU1IDI3LjYyNmExMi44OTIgMTIuODkyIDAgMCAxLTExLjE4MSA2LjQ3NWgtMzEuNTc2Yy00LjYxOCAwLTguODgzLTIuNDctMTEuMTgyLTYuNDc1TDg0LjI2IDEyMC42MDVhMTIuODkyIDEyLjg5MiAwIDAgMSAwLTEyLjgzNGwxNS44NTQtMjcuNjI2YTEyLjg5MiAxMi44OTIgMCAwIDEgMTEuMTgyLTYuNDc1Wm0yNi43NjMgOC4zMzhjNC42MiAwIDguODg4IDIuNDczIDExLjE4NSA2LjQ4MWwxMS4wNTYgMTkuMjg4YTEyLjg5MiAxMi44OTIgMCAwIDEgMCAxMi44MjJsLTExLjA1NiAxOS4yODhhMTIuODkyIDEyLjg5MiAwIDAgMS0xMS4xODUgNi40OGgtMjEuOTVjLTQuNjIgMC04Ljg4OC0yLjQ3Mi0xMS4xODUtNi40OGwtMTEuMDU2LTE5LjI4OGExMi44OTIgMTIuODkyIDAgMCAxIDAtMTIuODIybDExLjA1Ni0xOS4yODhhMTIuODkyIDEyLjg5MiAwIDAgMSAxMS4xODQtNi40OGgyMS45NTFabS01LjE4NyA5LjEyaC0xMS41NzZhMTIuODkyIDEyLjg5MiAwIDAgMC0xMS4xNzkgNi40N2wtNS44NDIgMTAuMTY3YTEyLjg5MiAxMi44OTIgMCAwIDAgMCAxMi44NDZsNS44NDIgMTAuMTY4YTEyLjg5MiAxMi44OTIgMCAwIDAgMTEuMTc5IDYuNDdoMTEuNTc2YzQuNjE2IDAgOC44OC0yLjQ2OCAxMS4xNzktNi40N2w1Ljg0Mi0xMC4xNjhhMTIuODkyIDEyLjg5MiAwIDAgMCAwLTEyLjg0NmwtNS44NDItMTAuMTY4YTEyLjg5MiAxMi44OTIgMCAwIDAtMTEuMTc5LTYuNDdabS00Ljk5NCA4LjcyOWM0LjYxMiAwIDguODczIDIuNDY0IDExLjE3MyA2LjQ2bC44MjkgMS40NGExMi44OTIgMTIuODkyIDAgMCAxIDAgMTIuODYybC0uODI5IDEuNDRhMTIuODkyIDEyLjg5MiAwIDAgMS0xMS4xNzMgNi40NmgtMS41ODhhMTIuODkyIDEyLjg5MiAwIDAgMS0xMS4xNzMtNi40NmwtLjgyOS0xLjQ0YTEyLjg5MiAxMi44OTIgMCAwIDEgMC0xMi44NjJsLjgyOS0xLjQ0YTEyLjg5MiAxMi44OTIgMCAwIDEgMTEuMTczLTYuNDZoMS41ODhabS0uNzkyIDguNTk5YTUuNzM4IDUuNzM4IDAgMCAwLTQuOTcgMi44NjZhNS43MjkgNS43MjkgMCAwIDAgMCA1LjczMmE1LjczOCA1LjczOCAwIDAgMCA5LjkzNyAwYTUuNzI5IDUuNzI5IDAgMCAwIDAtNS43MzJhNS43MzYgNS43MzYgMCAwIDAtNC45NjctMi44NjZabS00Ni41MDkgNS43MzJoMTAuMzIiLz48L3N2Zz4=",
    },
  ],
};

type Category = keyof typeof STACK;

export default function Stack() {
  const t = useTranslations("stack");
  const cats = t.raw("categories") as Record<string, string>;
  const [active, setActive] = useState<Category>("frontend");

  const categories: { key: Category; label: string }[] = [
    { key: "frontend", label: cats.frontend },
    { key: "backend", label: cats.backend },
    { key: "database", label: cats.database },
    { key: "tools", label: cats.tools },
  ];

  return (
    <>
      <style>{`
        .stack-section { padding: 128px 24px; }
        .stack-inner { max-width: 1152px; margin: 0 auto; }
        .stack-heading {
          font-family: var(--font-bebas-neue), "Bebas Neue", sans-serif;
          font-size: clamp(2rem, 5vw, 4rem); line-height: 1.1;
          letter-spacing: 0.05em; color: var(--foreground); margin-bottom: 48px;
        }
        .stack-tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 48px; }
        .stack-tab {
          padding: 8px 20px; border-radius: 99px; font-size: 0.875rem;
          font-weight: 500; border: 1px solid var(--border);
          color: var(--muted-foreground); background: none;
          cursor: pointer; transition: all 0.3s;
        }
        .stack-tab:hover { border-color: rgba(var(--accent-rgb), 0.5); color: var(--foreground); }
        .stack-tab.active {
          background: var(--accent); color: #fff; border-color: var(--accent);
          box-shadow: 0 4px 20px rgba(var(--accent-rgb), 0.25);
        }
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 16px;
        }
        .tech-card {
          display: flex; flex-direction: column; align-items: center; gap: 12px;
          padding: 20px 16px; border-radius: 16px;
          border: 1px solid var(--border); background: color-mix(in srgb, var(--card) 50%, transparent);
          cursor: default; transition: all 0.3s;
        }
        .tech-card:hover {
          border-color: rgba(var(--accent-rgb), 0.4); background: var(--card);
          transform: translateY(-4px);
        }
        .tech-icon-wrap { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; }
        .tech-icon { width: 40px; height: 40px; object-fit: contain; transition: transform 0.3s; }
        .tech-card:hover .tech-icon { transform: scale(1.15); }
        .tech-name { font-size: 0.8rem; font-weight: 500; color: var(--muted-foreground); text-align: center; }
        .tech-card:hover .tech-name { color: var(--foreground); }
      `}</style>

      <section id="stack" className="stack-section">
        <div className="stack-inner">
          <div
            className="section-header reveal"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
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

          <h2 className="stack-heading reveal reveal-delay-1">
            {t("heading")}
          </h2>

          <div className="stack-tabs reveal reveal-delay-2">
            {categories.map(({ key, label }) => (
              <button
                key={key}
                className={`stack-tab${active === key ? " active" : ""}`}
                onClick={() => setActive(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="stack-grid">
            {STACK[active].map((tech, i) => (
              <div
                key={tech.name}
                className="tech-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="tech-icon-wrap">
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="tech-icon"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="tech-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
