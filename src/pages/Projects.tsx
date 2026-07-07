import { useEffect, useRef, useState } from "react";

interface Project {
  name: string;
  description: string;
  lang: string;
  langColor: string;
  href: string;
  stars?: number;
}

const projects: Project[] = [
  {
    name: "Salangi",
    description:
      "A map-based platform for discovering Pampanga's local businesses, food spots, crafts, and experiences while helping small businesses build a simple digital presence.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/salangi",
    stars: 1,
  },
  {
    name: "Iskolar",
    description:
      "A web app that makes studying easier for students. Includes a quiz maker for practice tests and an AI tool for quick notes. Users can upload and organize files in folders — study tools in one simple platform.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/iskolar",
    stars: 1,
  },
  {
    name: "Meemo",
    description:
      "A beautifully crafted mobile app that helps you take control of your time. From calculating the exact number of days between two dates, to managing events, setting reminders, and writing journal entries.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/meemo",
    stars: 1,
  },
  {
    name: "Musikultura",
    description:
      "A mobile-first rhythm and discovery game that takes players on a journey across the Visayas islands, scanning and unlocking traditional indigenous instruments — from the Cebuano Gitara to the Tulali and Korlong — while learning the folklore and cultural significance behind each one.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/musikultura",
    stars: 1,
  },
  {
    name: "museum-of-the-unsaid-thoughts",
    description:
      "An anonymous confession board. Anyone can post a thought paired with an image, styled as a polaroid and pinned at a random spot and angle on a shared canvas — or write a longer, unfiltered rant that gets its own page.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/museum-of-the-unsaid-thoughts",
    stars: 1,
  },
  {
    name: "Sinammon",
    description:
      "An open-source platform that centralizes free digital educational tools for Filipino educators — a directory and toolkit that curates the platforms teachers already need, organized by classroom use with plain-language guidance.",
    lang: "TypeScript",
    langColor: "#3178c6",
    href: "https://github.com/joshdev09/sinammon",
    stars: 1,
  },
];

const MOBILE_INITIAL = 3;

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
      }}
    >
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          borderRadius: "12px",
          border: `1px solid ${hovered ? "#3a3a3a" : "#262626"}`,
          background: hovered ? "#202020" : "#1e1e1e",
          textDecoration: "none",
          cursor: "pointer",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 8px 32px rgba(0,0,0,0.35)"
            : "0 1px 4px rgba(0,0,0,0.2)",
          transition:
            "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.2s ease, background 0.2s ease",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: hovered ? "#ffffff" : "#e5e5e5",
              transition: "color 0.2s ease",
              wordBreak: "break-word",
            }}
          >
            {project.name}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#6b6b6b",
              border: "1px solid #2e2e2e",
              borderRadius: "999px",
              padding: "2px 10px",
              whiteSpace: "nowrap",
              letterSpacing: "0.04em",
              flexShrink: 0,
            }}
          >
            Public
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "12px",
            color: "#818181",
            lineHeight: 1.65,
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "2px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: project.langColor,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{project.lang}</span>
          </div>

          {project.stars !== undefined && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#6b6b6b" strokeWidth="1.5">
                <path d="M8 1.5l1.9 3.8 4.2.6-3 2.9.7 4.2L8 11l-3.8 2 .7-4.2-3-2.9 4.2-.6z" />
              </svg>
              <span style={{ fontSize: "11px", color: "#6b6b6b" }}>{project.stars}</span>
            </div>
          )}

          <span
            style={{
              marginLeft: "auto",
              fontSize: "13px",
              color: "#555",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-6px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            ↗
          </span>
        </div>
      </a>
    </div>
  );
}

export default function Projects() {
  const { ref: headingRef, visible: headingVisible } = useScrollReveal(0.1);
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  // Slice the list — mobile gets MOBILE_INITIAL unless expanded; desktop gets all
  const visibleProjects =
    isMobile && !expanded ? projects.slice(0, MOBILE_INITIAL) : projects;

  const hiddenCount = projects.length - MOBILE_INITIAL;

  return (
    <div style={{ backgroundColor: "#1a1a1a", width: "100%" }}>
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 1.5rem" }}>

        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            marginBottom: "2.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#e5e5e5",
              margin: "0 0 8px",
              fontFamily: "serif",
            }}
          >
            projects
          </h2>
          <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.65, margin: 0 }}>
            Things I've built — from providing technological solutions, education open-source, to fostering culutral game development for preserving cultural identity.
          </p>
        </div>

        {/* Grid — only renders the visible slice */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {visibleProjects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Show more / less — mobile only */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <button
              onClick={() => setExpanded((prev) => !prev)}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: btnHovered ? "#e5e5e5" : "#555",
                background: "transparent",
                border: `1px solid ${btnHovered ? "#3a3a3a" : "#2a2a2a"}`,
                borderRadius: "999px",
                padding: "8px 20px",
                cursor: "pointer",
                transition: "color 0.2s ease, border-color 0.2s ease",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                  fontSize: "10px",
                }}
              >
                ▾
              </span>
              {expanded ? "Show less" : `Show ${hiddenCount} more`}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}