import { useEffect, useRef, useState } from "react"

// ── Hook: fires once when element enters viewport ────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── SVG Icons ────────────────────────────────────────────────────────────────
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
)

// ── Social icon link with hover lift + green tint ────────────────────────────
function SocialLink({
  href,
  label,
  icon,
  delay,
  inView,
}: {
  href: string
  label: string
  icon: React.ReactNode
  delay: number
  inView: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: `1px solid ${hovered ? "#bbf7d0" : "#e5e7eb"}`,
        background: hovered ? "#f0fdf4" : "transparent",
        color: hovered ? "#16a34a" : "#9ca3af",
        textDecoration: "none",
        transform: inView
          ? hovered ? "translateY(-3px)" : "translateY(0)"
          : "translateY(10px)",
        opacity: inView ? 1 : 0,
        transitionProperty: "color, background, border-color, box-shadow, opacity, transform",
        transitionDuration: "0.2s, 0.2s, 0.2s, 0.2s, 0.5s, 0.5s",
        transitionDelay: `0s, 0s, 0s, 0s, ${delay}ms, ${delay}ms`,
        transitionTimingFunction: "ease, ease, ease, ease, cubic-bezier(0.22,1,0.36,1), cubic-bezier(0.22,1,0.36,1)",
        boxShadow: hovered ? "0 4px 12px rgba(34,197,94,0.15)" : "none",
      }}
    >
      {icon}
    </a>
  )
}

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/joshua.emmanuel.m.halili",        icon: <FacebookIcon /> },
  { label: "GitHub",   href: "https://github.com/joshdev09",          icon: <GitHubIcon />   },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/joshua-emmanuel-m-halili-133155377/",     icon: <LinkedInIcon /> },
  { label: "Email",    href: "mailto:joshuahalili526@gmail.com",         icon: <EmailIcon />    },
]

// ── Footer ───────────────────────────────────────────────────────────────────
export default function Footer() {
  const { ref, inView } = useInView(0.2)

  return (
    <footer
      ref={ref}
      style={{
        borderTop: "1px solid #d0d3d8",
        background: "#f0f2f5",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          maxWidth: "56rem",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* Left — copyright */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "-0.01em",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Joshua Halili
          </span>
          <span
            style={{
              fontSize: "10px",
              color: "#9ca3af",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            © 2026 · All rights reserved
          </span>
        </div>

        {/* Right — social links */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
          }}
          aria-label="Social links"
        >
          {socials.map(({ label, href, icon }, i) => (
            <SocialLink
              key={label}
              href={href}
              label={label}
              icon={icon}
              delay={100 + i * 70}
              inView={inView}
            />
          ))}
        </nav>
      </div>
    </footer>
  )
}