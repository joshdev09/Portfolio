import { useEffect, useRef, useState } from "react";

interface StackGroup {
  label: string;
  items: string[];
}

const stack: StackGroup[] = [
  {
    label: "Core Stack",
    items: ["React", "TypeScript", "Tailwind CSS", "Vite", "Supabase", "Node.js", "Vercel"],
  },
  {
    label: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "ESLint", "Vite"],
  },
  {
    label: "Backend",
    items: ["Node.js", "TypeScript", "Python", "PostgreSQL"],
  },
  {
    label: "Database",
    items: ["Supabase", "PostgreSQL", "Neon"],
  },
  {
    label: "Cloud & DevOps",
    items: ["Vercel", "Git", "GitHub"],
  },
  {
    label: " Frontend Email Integration Service",
    items: ["EmailJS"],
  },
  {
    label: "AI & Development Tools",
    items: ["Google Gemini", "Anthropic", "Antigravity"],
  },
  {
    label: "Design & Other Tools",
    items: ["Figma", "Canva", "VS Code", "Adobe Premiere Pro",],
  },
];

function useScrollReveal(threshold = 0.1) {
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

function StackGroup({
  group,
  index,
}: {
  group: StackGroup;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 80}ms`,
      }}
    >
      {/* Category label */}
      <p
        style={{
          fontSize: "14px",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#444",
          margin: "0 0 12px",
          fontFamily: "monospace",
        }}
      >
        {group.label}
      </p>

      {/* Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {group.items.map((item) => (
          <span
            key={item}
            style={{
              fontSize: "13px",
              color: "#c8c8c8",
              background: "transparent",
              border: "1px solid #2a2a2a",
              borderRadius: "6px",
              padding: "10px 20px",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Stacks() {
  const { ref: headingRef, visible: headingVisible } = useScrollReveal(0.1);

  return (
    <div style={{ backgroundColor: "#1a1a1a", width: "100%" }}>
      <section
        style={{
          maxWidth: "42rem",
          margin: "0 auto",
          padding: "4rem 1.5rem",
        }}
      >
        {/* Heading */}
        <div
          ref={headingRef}
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            marginBottom: "3rem",
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
            tech stack
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.65,
              margin: 0,
              maxWidth: "700px",
            }}
          >
            The tools, frameworks, and platforms I reach for — across the front end, back end, and AI.
          </p>
        </div>

        {/* Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
          {stack.map((group, i) => (
            <StackGroup key={group.label} group={group} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}