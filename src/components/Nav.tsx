import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";

const navLinks = [
  { label: "About",          id: "about" },
  { label: "Experience",     id: "experience" },
  { label: "Projects",       id: "projects" },
  { label: "Stacks",         id: "stacks" },
  { label: "Certifications", id: "certifications" },
  { label: "Blog",           id: "blog" },
];

const categories = [
  { id: "freelance",      label: "Freelance",      },
  { id: "hire",           label: "Hire You",       },
  { id: "collaboration",  label: "Collaboration",  },
  { id: "other",          label: "Other",          },
];

// ── Contact Modal ─────────────────────────────────────────────────────────────
function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState("freelance");
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [subject,  setSubject]  = useState("");
  const [details,  setDetails]  = useState("");
  const [sending,  setSending]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset form when re-opened
  useEffect(() => {
    if (open) { 
      setSent(false); 
      setSending(false); 
    }
  }, [open]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) onClose();
  }

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !subject.trim() || !details.trim()) return;
    
    setSending(true);

    try {
      const currentTime = new Date().toLocaleString('en-US', { 
        dateStyle: 'medium', 
        timeStyle: 'short' 
      });

      const combinedMessage = `[Category: ${category.toUpperCase()}]\nSubject: ${subject}\n\n${details}`;

      const templateParams = {
        name: name,
        email: email,
        time: currentTime,
        message: combinedMessage,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSent(true);
      // Optional: clear form fields upon success
      setName(""); setEmail(""); setSubject(""); setDetails("");
    } catch (error) {
      console.error("FAILED to send message via EmailJS...", error);
      alert("Uh oh! Something went wrong sending your message. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "13px",
    color: "#1a1a1a",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "Inter, sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: "#9ca3af",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          backdropFilter: open ? "blur(12px)" : "blur(0px)",
          WebkitBackdropFilter: open ? "blur(12px)" : "blur(0px)",
          background: open ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease, backdrop-filter 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Modal panel */}
        <div
          ref={modalRef}
          style={{
            width: "100%",
            maxWidth: "620px",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "24px",
            padding: "32px 32px 28px",
            boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
            transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
            opacity: open ? 1 : 0,
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease",
            pointerEvents: open ? "auto" : "none",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              background: "#f3f4f6",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#9ca3af",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#e5e7eb";
              (e.currentTarget as HTMLButtonElement).style.color = "#374151";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "#f3f4f6";
              (e.currentTarget as HTMLButtonElement).style.color = "#9ca3af";
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M1 1l10 10M11 1L1 11" />
            </svg>
          </button>

          {sent ? (
            /* ── Success state ── */
            <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "50%",
                background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <p style={{ fontSize: "16px", fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px" }}>Message sent!</p>
              <p style={{ fontSize: "13px", color: "#6b7280", margin: "0 0 24px" }}>
                I'll get back to you as soon as I can.
              </p>
              <button
                onClick={onClose}
                style={{
                  background: "#f3f4f6",
                  border: "1px solid #e5e7eb",
                  borderRadius: "10px",
                  padding: "9px 24px",
                  fontSize: "13px",
                  color: "#374151",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                }}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* ── Header ── */}
              <div style={{ marginBottom: "22px" }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#9ca3af", margin: "0 0 4px", fontFamily: "Inter, sans-serif" }}>
                  Get in touch
                </p>
                <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a1a1a", margin: 0, letterSpacing: "-0.02em", fontFamily: "Roboto, sans-serif" }}>
                  Let's work together
                </h2>
              </div>

              {/* ── Category pills ── */}
              <div style={{ marginBottom: "20px" }}>
                <span style={labelStyle}>What's this about?</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {categories.map(c => {
                    const active = category === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                          padding: "6px 13px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: active ? 600 : 400,
                          fontFamily: "Inter, sans-serif",
                          cursor: "pointer",
                          border: active
                            ? "1px solid #1a1a1a"
                            : "1px solid #e5e7eb",
                          background: active
                            ? "#1a1a1a"
                            : "#f9fafb",
                          color: active ? "#ffffff" : "#6b7280",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Name + Email row ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Juan Dela Cruz"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#1a1a1a")}
                    onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Your Email</label>
                  <input
                    type="email"
                    placeholder="juan@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = "#1a1a1a")}
                    onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              {/* ── Subject ── */}
              <div style={{ marginBottom: "12px" }}>
                <label style={labelStyle}>Subject</label>
                <input
                  type="text"
                  placeholder="Short summary of your message"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  style={inputStyle}
                  onFocus={e => (e.target.style.borderColor = "#1a1a1a")}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              {/* ── Details ── */}
              <div style={{ marginBottom: "20px" }}>
                <label style={labelStyle}>Details</label>
                <textarea
                  placeholder="Tell me more — what are you working on?"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  rows={4}
                  style={{
                    ...inputStyle,
                    resize: "none",
                    lineHeight: 1.6,
                  }}
                  onFocus={e => (e.target.style.borderColor = "#1a1a1a")}
                  onBlur={e => (e.target.style.borderColor = "#e5e7eb")}
                />
              </div>

              {/* ── Submit ── */}
              <button
                onClick={handleSubmit}
                disabled={sending || !name.trim() || !email.trim() || !subject.trim() || !details.trim()}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "12px",
                  border: "none",
                  background: (!name.trim() || !email.trim() || !subject.trim() || !details.trim())
                    ? "#e5e7eb"
                    : "#1a1a1a",
                  color: (!name.trim() || !email.trim() || !subject.trim() || !details.trim())
                    ? "#9ca3af"
                    : "#ffffff",
                  fontSize: "13px",
                  fontWeight: 600,
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.03em",
                  cursor: (!name.trim() || !email.trim() || !subject.trim() || !details.trim()) ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background 0.2s ease, color 0.2s ease",
                }}
                onMouseEnter={e => {
                  const btn = e.currentTarget;
                  if (!btn.disabled) btn.style.background = "#333333";
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget;
                  if (!btn.disabled) btn.style.background = "#1a1a1a";
                }}
              >
                {sending ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ animation: "spin 0.8s linear infinite" }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                    Send Message
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #d1d5db; }
        input:focus, textarea:focus { border-color: #1a1a1a !important; box-shadow: 0 0 0 3px rgba(26,26,26,0.06); }
      `}</style>
    </>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [scrolled,   setScrolled]    = useState(false);
  const [activeId,   setActiveId]    = useState<string>("");
  const [navVisible, setNavVisible]  = useState(true);
  const [modalOpen,  setModalOpen]   = useState(false);

  const lastScrollY = useRef(0);
  const navigate    = useNavigate();
  const location    = useLocation();
  const isHome      = location.pathname === "/";

  function handleNavClick(id: string) {
    setMenuOpen(false);
    if (isHome) {
      scrollToId(id);
    } else {
      navigate("/");
      setTimeout(() => scrollToId(id), 80);
    }
  }

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const navHeight = 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }

  function scrollToTop() {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setNavVisible(false);
        setMenuOpen(false);
      } else {
        setNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 200);
      if (isHome) {
        const threshold = currentScrollY + window.innerHeight * 0.4;
        let current = "";
        for (const { id } of navLinks) {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= threshold) current = id;
        }
        setActiveId(current);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />

      <div
        className={`flex flex-col items-center fixed top-0 w-full z-[100] px-4 transition-transform duration-300 ease-in-out ${
          navVisible ? "translate-y-0" : "-translate-y-[120%] md:translate-y-0"
        }`}
      >
        <nav className="
          bg-[#333333]/40 backdrop-blur-md border border-white/10 shadow-lg
          mt-4 px-5 py-3 rounded-full w-full max-w-[45rem]
          flex items-center justify-between gap-4
        ">
          <h1
            onClick={scrollToTop}
            className="text-white font-semibold text-sm shrink-0 roboto-uniquifier cursor-pointer select-none"
          >
            JHalili
          </h1>

          <ul className="hidden md:flex gap-7 inter-uniquifier text-sm items-center">
            {navLinks.map(({ label, id }) => (
              <li
                key={id}
                onClick={() => handleNavClick(id)}
                className="cursor-pointer select-none nav-link"
                style={{
                  color: isHome && activeId === id ? "#ffffff" : "rgba(255,255,255,0.55)",
                  fontWeight: isHome && activeId === id ? 500 : 400,
                  transition: "color 0.2s ease",
                }}
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 shrink-0">
            {/* Suitcase / contact button */}
            <button
              onClick={() => setModalOpen(true)}
              className="rounded-full hover:bg-white/10 p-1.5 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
              aria-label="Get in touch"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-[#f0f2f5]">
                <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 0 1 8.75 1h2.5A2.75 2.75 0 0 1 14 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 0 1 6 4.193V3.75Zm6.5 0v.325a41.622 41.622 0 0 0-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25ZM10 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 1 1h.01a1 1 0 0 0 1-1V11a1 1 0 0 0-1-1H10Z" clipRule="evenodd" />
                <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 0 1-9.274 0C3.985 17.585 3 16.402 3 15.055Z" />
              </svg>
            </button>

            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden rounded-full hover:bg-white/10 p-1.5 cursor-pointer transition-all duration-200"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-[#f0f2f5]">
                {menuOpen ? (
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 0 1 1.414 0L10 8.586l4.293-4.293a1 1 0 1 1 1.414 1.414L11.414 10l4.293 4.293a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L8.586 10 4.293 5.707a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 5A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75Zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className={`
          md:hidden w-full max-w-[45rem] overflow-hidden
          transition-all duration-300 ease-in-out
          ${menuOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}
        `}>
          <ul className="
            bg-[#333333]/40 backdrop-blur-md border border-white/10 shadow-lg
            rounded-2xl px-5 py-4 flex flex-col gap-4 text-sm inter-uniquifier
          ">
            {navLinks.map(({ label, id }) => (
              <li
                key={id}
                onClick={() => handleNavClick(id)}
                className="cursor-pointer transition-colors duration-200 py-0.5 select-none"
                style={{
                  color: isHome && activeId === id ? "#ffffff" : "rgba(255,255,255,0.6)",
                  fontWeight: isHome && activeId === id ? 500 : 400,
                }}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Scroll-to-top FAB */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: "fixed",
          bottom: "28px",
          right: "24px",
          zIndex: 50,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          background: "rgba(50,50,50,0.6)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 9.5L7 4.5L12 9.5" />
        </svg>
      </button>
    </>
  );
}

export default Nav;