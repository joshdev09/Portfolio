import { useEffect, useRef, useState } from "react";

interface Role {
  title: string;
  dateRange: string;
  duration: string;
  description: string;
  tags: string[];
}

interface ExperienceEntry {
  initials: string;
  org: string;
  meta: string;
  roles: Role[];
}

const experiences: ExperienceEntry[] = [
  {
    initials: "FR",
    org: "FlyRank AI",
    meta: "Internship · Remote",
    roles: [
      {
        title: "Front-end AI Engineer",
        dateRange: "Jun 2026 – Present",
        duration: "2 mos",
        description:
          "Interning as a Front-end AI Engineer, focusing on building and integrating AI-powered interfaces for organic growth tooling.",
        tags: ["Front-End Development", "AI Integration"],
      },
    ],
  },
  {
    initials: "GDG",
    org: "Google Developers Group on Campus",
    meta: "Holy Angel University · Angeles, Central Luzon",
    roles: [
      {
        title: "Web Development Lead",
        dateRange: "May 2026 – Present",
        duration: "3 mos",
        description:
          "Appointed as Web Development Lead at Google Developers Group on Campus (GDGoC). Leading web development initiatives, mentoring team members, and collaborating on projects that promote technology, innovation, and skill development within the student developer community.",
        tags: ["Front-End Development", "Web Design", "Mentorship"],
      },
      {
        title: "AI / ML Engineer Staff",
        dateRange: "Sep 2025 – Present",
        duration: "11 mos",
        description:
          "Former AI/ML Engineer Staff at Holy Angel University. Collaborated with team leads in planning and executing workshops focused on artificial intelligence and machine learning. Supported event organization, technical preparation, and knowledge-sharing initiatives to help students explore emerging technologies.",
        tags: ["RAG", "Artificial Intelligence"],
      },
    ],
  },
  {
    initials: "DC",
    org: "DEVCON Pampanga",
    meta: "Full-time · Angeles, Central Luzon",
    roles: [
      {
        title: "Core Member — DEVCON Kids Specialist",
        dateRange: "May 2026 – Present",
        duration: "3 mos",
        description:
          "Core Member of DEVCON Pampanga and actively involved in DEVCON Kids tier specialist. I contribute to community-driven programs that promote technology education and digital literacy, particularly among young learners. Through workshops and outreach activities, I help introduce children to technology concepts and basic programming, inspiring their interest in innovation and software development from an early age.",
        tags: ["Micro:bit", "Youth Education", "Leadership Development"],
      },
    ],
  },
];

// Two-way reveal: visible when in viewport, hidden when scrolled past/before
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function revealStyle(
  visible: boolean,
  delay: number = 0
): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(24px)",
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms,
                 transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };
}

function ExperienceCard({
  entry,
  index,
  showDivider,
}: {
  entry: ExperienceEntry;
  index: number;
  showDivider: boolean;
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <div ref={ref} style={revealStyle(visible, index * 60)}>
      <div className="flex gap-4">
        {/* Avatar badge */}
        <div
          style={{
            width: "40px",
            minWidth: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#242424",
            border: "1px solid #2e2e2e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 500,
            color: "#6b6b6b",
            letterSpacing: "0.03em",
            alignSelf: "flex-start",
            marginTop: "2px",
            flexShrink: 0,
          }}
        >
          {entry.initials}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#e5e5e5", margin: "0 0 2px" }}>
            {entry.org}
          </p>
          <p style={{ fontSize: "12px", color: "#555", margin: "0 0 16px" }}>
            {entry.meta}
          </p>

          {/* Timeline rail */}
          <div
            style={{
              borderLeft: "1px solid #2a2a2a",
              paddingLeft: "20px",
              marginLeft: "3px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {entry.roles.map((role, j) => (
              <div
                key={role.title}
                style={{
                  position: "relative",
                  paddingBottom: j < entry.roles.length - 1 ? "20px" : 0,
                }}
              >
                {/* Timeline dot */}
                <span
                  style={{
                    position: "absolute",
                    left: "-24px",
                    top: "5px",
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#1a1a1a",
                    border: "1.5px solid #444",
                    display: "block",
                  }}
                />

                <p style={{ fontSize: "14px", fontWeight: 500, color: "#e5e5e5", margin: "0 0 3px" }}>
                  {role.title}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: "#555",
                    fontFamily: "monospace",
                    margin: "0 0 8px",
                  }}
                >
                  {role.dateRange} · {role.duration}
                </p>
                <p style={{ fontSize: "13px", color: "#909090", lineHeight: 1.65, margin: "0 0 10px" }}>
                  {role.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {role.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid #2a2a2a",
                        borderRadius: "4px",
                        padding: "2px 8px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showDivider && (
        <div style={{ height: "1px", background: "#222", marginTop: "2.5rem" }} />
      )}
    </div>
  );
}

export default function Experience() {
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
          style={revealStyle(headingVisible, 0)}
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
            experience
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "#555",
              lineHeight: 1.65,
              maxWidth: "800px",
              margin: "0 0 3rem",
            }}
          >
            Building at the intersection of tech, culture, and community — from
            student dev roles to AI internships.
          </p>

          {/* Cards sit inside the heading ref so heading re-uses one observer,
              cards each have their own */}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {experiences.map((entry, i) => (
            <ExperienceCard
              key={entry.org}
              entry={entry}
              index={i}
              showDivider={i < experiences.length - 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}