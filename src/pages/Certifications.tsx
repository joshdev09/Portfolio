import { useEffect, useRef, useState } from "react";
import React from "react"

interface Certificate {
  name: string;
  done: boolean;
}

interface CertProvider {
  org: string;
  initials: string;
  meta?: string;
  progress?: { done: number; total: number };
  certificates: Certificate[];
}

const providers: CertProvider[] = [
  {
    org: "IBM",
    initials: "IBM",
    meta: "Full Stack Software Developer",
    progress: { done: 2, total: 15 },
    certificates: [
      { name: "Developing Front-End Apps with React", done: true },
      { name: "Python for Data Science, AI & Development", done: true },
    ],
  },
  {
    org: "Anthropic",
    initials: "ANT",
    meta: "AI Safety & Applications",
    progress: { done: 1, total: 20 },
    certificates: [
      { name: "AI Fluency: Framework & Foundations", done: true },
      { name: "Prompt Engineering Fundamentals", done: false },
      { name: "Building with the Claude API", done: false },
      { name: "AI Safety Essentials", done: false },
      { name: "Constitutional AI", done: false },
      { name: "Claude for Developers", done: false },
      { name: "Responsible AI Deployment", done: false },
      { name: "Multi-turn Conversation Design", done: false },
      { name: "Tool Use & Function Calling", done: false },
      { name: "Advanced Prompt Patterns", done: false },
      { name: "Building AI Agents", done: false },
      { name: "Context Window Management", done: false },
      { name: "Claude in Production", done: false },
      { name: "Evaluating LLM Outputs", done: false },
      { name: "RAG with Claude", done: false },
      { name: "Fine-tuning & Adaptation", done: false },
      { name: "AI Ethics in Practice", done: false },
      { name: "Enterprise AI Integration", done: false },
      { name: "Capstone: AI Application Build", done: false },
      { name: "Anthropic AI Professional Certificate", done: false },
    ],
  },
  {
    org: "CompTIA",
    initials: "CT",
    certificates: [
      { name: "CompTIA Tech+", done: true },
    ],
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

function ProgressBar({ done, total }: { done: number; total: number }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div style={{ marginTop: "4px" }}>
      <div
        style={{
          height: "2px",
          background: "#242424",
          borderRadius: "999px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#555",
            borderRadius: "999px",
            transition: "width 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
      <p
        style={{
          fontSize: "11px",
          color: "#444",
          fontFamily: "monospace",
          letterSpacing: "0.05em",
          margin: "5px 0 0",
        }}
      >
        {done} / {total} completed
      </p>
    </div>
  );
}

function CertCard({ cert }: { cert: Certificate }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 14px",
        borderRadius: "8px",
        border: cert.done ? "1px solid #2a2a2a" : "1px dashed #242424",
        background: cert.done ? "#1e1e1e" : "transparent",
      }}
    >
      {/* Status icon */}
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: cert.done ? "#2a2a2a" : "transparent",
          border: cert.done ? "none" : "1px dashed #333",
        }}
      >
        {cert.done ? (
          <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#333" }} />
        )}
      </div>

      <span
        style={{
          fontSize: "13px",
          color: cert.done ? "#c8c8c8" : "#3a3a3a",
          lineHeight: 1.45,
        }}
      >
        {cert.name}
      </span>
    </div>
  );
}

function ProviderSection({
  provider,
  index,
}: {
  provider: CertProvider;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();
  const [expanded, setExpanded] = useState(false);

  const doneCerts = provider.certificates.filter((c) => c.done);
  const pendingCerts = provider.certificates.filter((c) => !c.done);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 100}ms`,
      }}
    >
      {/* Org header */}
      <div style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
        {/* Avatar */}
        <div
          style={{
            width: "40px",
            height: "40px",
            minWidth: "40px",
            borderRadius: "10px",
            background: "#1e1e1e",
            border: "1px solid #2a2a2a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 600,
            color: "#555",
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          {provider.initials}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <p style={{ fontSize: "15px", fontWeight: 500, color: "#e5e5e5", margin: 0 }}>
              {provider.org}
            </p>
          </div>

          {provider.meta && (
            <p style={{ fontSize: "13px", color: "#444", margin: "2px 0 0" }}>
              {provider.meta}
            </p>
          )}

          {provider.progress && (
            <div style={{ marginTop: "8px", maxWidth: "240px" }}>
              <ProgressBar done={provider.progress.done} total={provider.progress.total} />
            </div>
          )}
        </div>
      </div>

      {/* Certificate cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {/* Always show completed ones */}
        {doneCerts.map((cert) => (
          <CertCard key={cert.name} cert={cert} />
        ))}

        {/* Pending: show first 2 always, rest behind expand */}
        {pendingCerts.length > 0 && (
          <>
            {(expanded ? pendingCerts : pendingCerts.slice(0, 2)).map((cert) => (
              <CertCard key={cert.name} cert={cert} />
            ))}

            {pendingCerts.length > 2 && (
              <button
                onClick={() => setExpanded((p) => !p)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "12px",
                  color: "#444",
                  background: "transparent",
                  border: "none",
                  padding: "6px 0 0",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                  width: "fit-content",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    fontSize: "10px",
                  }}
                >
                  ▾
                </span>
                {expanded
                  ? "Show less"
                  : `${pendingCerts.length - 2} more upcoming`}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Certifications() {
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
            certifications
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.65,
              margin: 0,
            }}
          >
            Credentials earned and courses in progress — across software engineering and AI.
          </p>
        </div>

        {/* Providers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {providers.map((provider, i) => (
            <React.Fragment key={provider.org}>
              <ProviderSection provider={provider} index={i} />
              {i < providers.length - 1 && (
                <div style={{ height: "1px", background: "#222", marginTop: "-1.5rem" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}