import { useState, useEffect, useRef } from "react"

interface Recommendation {
  name: string
  initials: string
  comment: string
  tags: string[]
}

const recommendations: Recommendation[] = [
  {
    name: "Angel Lising",
    initials: "AL",
    tags: ["Reliable", "Professional", "Team Player"],
    comment:
      "I've worked with Joshua on different projects, and one thing that's consistent is how dependable he is. He stays committed to his responsibilities, collaborates well with the team, and approaches every task with service, professionalism, competence, and fellowship. He's someone I'd confidently recommend.",
  },
  {
    name: "Kiel David",
    initials: "KD",
    tags: ["Detail-Oriented", "Efficient", "Results-Driven"],
    comment:
      "Joshua is an exceptional teammate who always focuses on delivering high-quality results. He has a great eye for detail and a knack for solving problems efficiently. Any team would be lucky to have him onboard!",
  },
  {
    name: "Kevin Yeban",
    initials: "KY",
    tags: ["Collaborative", "Smart", "Reliable"],
    comment:
      "Joshua is an outstanding classmate and codeveloper. He's reliable, collaborative, and always brings smart solutions to the table. Working with him made our projects better and our team stronger.",
  },
  {
    name: "Caleb",
    initials: "CA",
    tags: ["Dependable", "Skilled", "Helpful"],
    comment:
      "Joshua is a deeply reliable teammate who consistently puts in the effort to get things done right. He approaches every task with skill and a helpful attitude, which makes him a pleasure to work with. His presence naturally makes the whole team better, and he is a truly valuable person to have on any project.",
  },
  {
    name: "Charles Viray",
    initials: "CV",
    tags: ["UI/UX", "Hackathon", "Clean Code"],
    comment:
      "Joshua is an outstanding developer with a phenomenal grasp of UI/UX design. We've collaborated on numerous hackathons together, and his ability to rapidly build out great projects with flawless, user-centric interfaces never ceases to impress me. He brings a perfect balance of clean code and aesthetic design to the table.",
  },
]

const traits = [
  { label: "Reliability",   score: 5.0 },
  { label: "Collaboration", score: 4.9 },
  { label: "Code Quality",  score: 4.8 },
]

// ── Hook: fires once when element enters viewport ────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

// ── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ score, size = 20, max = 5 }: { score: number; size?: number; max?: number }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center", lineHeight: 1 }}>
      {Array.from({ length: max }).map((_, i) => {
        const gradId = `star-grad-${i}-${score}-${size}`
        const fill = Math.min(1, Math.max(0, score - i))
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
            <defs>
              <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#22c55e" />
                <stop offset={`${fill * 100}%`} stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <path
              d="M12 2l2.9 5.8 6.4.9-4.6 4.5 1.1 6.4L12 16.8l-5.8 3.1 1.1-6.4L2.7 9l6.4-.9z"
              fill={`url(#${gradId})`}
            />
          </svg>
        )
      })}
    </div>
  )
}

// ── Trait Bar — animates width when panel scrolls into view ─────────────────
function TraitBar({ label, score, animate }: { label: string; score: number; animate: boolean }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "7px" }}>
        <span style={{ fontSize: "13px", color: "#4b5563", fontWeight: 500 }}>{label}</span>
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#333",
            opacity: animate ? 1 : 0,
            transition: "opacity 0.4s ease 0.6s",
          }}
        >
          {score.toFixed(1)}
        </span>
      </div>
      <div style={{ height: "5px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animate ? `${(score / 5) * 100}%` : "0%",
            background: "linear-gradient(90deg, #22c55e, #16a34a)",
            borderRadius: "999px",
            transition: "width 1s cubic-bezier(0.22,1,0.36,1) 0.4s",
          }}
        />
      </div>
    </div>
  )
}

// ── Review Card — staggered fade-up + hover lift ─────────────────────────────
function ReviewCard({ rec, index, visible }: { rec: Recommendation; index: number; visible: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isLong = rec.comment.length > 180
  const preview = isLong && !expanded
    ? rec.comment.slice(0, 180).trimEnd() + "…"
    : rec.comment

  const delay = index * 90

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `1px solid ${hovered ? "#d1fae5" : "#f0f0f0"}`,
        borderRadius: "16px",
        padding: "20px 20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        boxShadow: hovered
          ? "0 8px 28px rgba(34,197,94,0.10), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        // Scroll-triggered reveal
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `
          opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          transform 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
          box-shadow 0.25s ease,
          border-color 0.25s ease
        `,
        cursor: "default",
        willChange: "opacity, transform",
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {/* Avatar — subtle scale on card hover */}
        <div
          style={{
            width: "42px",
            height: "42px",
            minWidth: "42px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #bbf7d0, #86efac)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span style={{ fontSize: "12px", fontWeight: 800, color: "#166534" }}>
            {rec.initials}
          </span>
        </div>

        {/* Name + stars */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: "14px", fontWeight: 500, color: "#333", margin: "0 0 4px", lineHeight: 1.2 }}>
            {rec.name}
          </p>
          <div style={{ display: "flex", alignItems: "center", marginTop: "1px" }}>
            <StarRating score={5} size={16} />
          </div>
        </div>

        {/* Role badge */}
        <span style={{
          fontSize: "10px",
          color: "#6b7280",
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "999px",
          padding: "3px 9px",
          flexShrink: 0,
          fontFamily: "monospace",
          letterSpacing: "0.03em",
        }}>
          Colleague
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "#f3f4f6" }} />

      {/* Comment */}
      <p style={{ fontSize: "13.5px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
        {preview}
        {isLong && (
          <button
            onClick={() => setExpanded(p => !p)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "12px",
              color: "#16a34a",
              fontWeight: 600,
              padding: "0 0 0 5px",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>

      {/* Tags — stagger in after card appears */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {rec.tags.map((tag, ti) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              color: "#16a34a",
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "999px",
              padding: "3px 9px",
              fontWeight: 500,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 0.4s ease ${delay + 200 + ti * 60}ms, transform 0.4s ease ${delay + 200 + ti * 60}ms`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Review List with Show More ────────────────────────────────────────────────
const INITIAL_COUNT = 3

function ReviewList() {
  const [expanded, setExpanded] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  const { ref, inView } = useInView(0.08)

  const visible = expanded ? recommendations : recommendations.slice(0, INITIAL_COUNT)
  const hiddenCount = recommendations.length - INITIAL_COUNT

  return (
    <div ref={ref}>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {visible.map((rec, i) => (
          <ReviewCard key={rec.name} rec={rec} index={i} visible={inView} />
        ))}
      </div>

      {recommendations.length > INITIAL_COUNT && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button
            onClick={() => setExpanded(p => !p)}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: btnHovered ? "#111827" : "#6b7280",
              background: btnHovered ? "#f9fafb" : "transparent",
              border: `1px solid ${btnHovered ? "#d1d5db" : "#e5e7eb"}`,
              borderRadius: "999px",
              padding: "9px 22px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontWeight: 500,
            }}
          >
            <span style={{
              display: "inline-block",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              fontSize: "11px",
            }}>▾</span>
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </button>
        </div>
      )}
    </div>
  )
}

// ── Summary Panel ─────────────────────────────────────────────────────────────
function SummaryPanel() {
  const { ref, inView } = useInView(0.2)
  const avgScore = 5.0

  return (
    <div
      ref={ref}
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        willChange: "opacity, transform",
      }}
    >
      <h2 style={{
        fontSize: "20px",
        fontWeight: 800,
        color: "#333",
        margin: "0 0 2px",
        fontFamily: "serif",
        letterSpacing: "-0.02em",
      }}>
        Recommendations
      </h2>
      <p style={{ fontSize: "13px", color: "#9ca3af", margin: "0 0 22px" }}>
        {recommendations.length} colleagues
      </p>

      {/* Big score — counts up when in view */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "8px" }}>
        <span style={{
          fontSize: "52px",
          fontWeight: 700,
          color: "#333",
          lineHeight: 1,
          fontFamily: "serif",
          opacity: inView ? 1 : 0,
          transform: inView ? "scale(1)" : "scale(0.85)",
          transition: "opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>
          {avgScore.toFixed(1)}
        </span>
        <div>
          <StarRating score={avgScore} size={22} />
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: "6px 0 0" }}>
            Based on {recommendations.length} reviews
          </p>
        </div>
      </div>

      <div style={{ height: "1px", background: "#f3f4f6", margin: "18px 0" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {traits.map(t => <TraitBar key={t.label} {...t} animate={inView} />)}
      </div>
    </div>
  )
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader() {
  const { ref, inView } = useInView(0.3)

  return (
    <div
      ref={ref}
      style={{
        marginBottom: "2rem",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <p style={{
        fontSize: "11px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#9ca3af",
        marginBottom: "6px",
        fontWeight: 500,
      }}>
        What people say
      </p>
      <div style={{ width: "32px", height: "2px", background: "#22c55e", borderRadius: "2px" }} />
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────
function Recommendations() {
  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          .rec-layout {
            grid-template-columns: 270px 1fr !important;
            align-items: start;
          }
        }
      `}</style>

      <div className="bg-[#f0f2f5] w-full">
        <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
          <SectionHeader />
          <div
            className="rec-layout"
            style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "20px" }}
          >
            <SummaryPanel />
            <ReviewList />
          </div>
        </div>
      </div>
    </>
  )
}

export default Recommendations