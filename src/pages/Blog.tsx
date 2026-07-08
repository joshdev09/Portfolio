import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { blogPosts, type BlogPost } from "../data/blogData";

type ViewMode = "grid" | "list";
const MOBILE_INITIAL = 3;

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

// Reusable blurred thumbnail — works for any size container
function BlurredThumbnail({
  src,
  alt,
  label,
  blurAmount = "20px",
}: {
  src?: string;
  alt: string;
  label: string;
  blurAmount?: string;
}) {
  if (!src) {
    return (
      <span style={{
        fontSize: "9px",
        fontFamily: "monospace",
        color: "#333",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        textAlign: "center",
        padding: "4px",
        lineHeight: 1.4,
      }}>
        {label}
      </span>
    );
  }

  return (
    <>
      {/* Blurred backdrop */}
      <img
        src={src}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: `blur(${blurAmount}) brightness(0.3) saturate(1.3)`,
          transform: "scale(1.08)",
          zIndex: 0,
        }}
      />
      {/* Sharp main image */}
      <img
        src={src}
        alt={alt}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
        }}
      />
    </>
  );
}

function PostCard({
  post,
  mode,
  onClick,
  index,
}: {
  post: BlogPost;
  mode: ViewMode;
  onClick: () => void;
  index: number;
}) {
  const { ref, visible } = useScrollReveal();
  const [hovered, setHovered] = useState(false);

  if (mode === "list") {
    return (
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
        }}
      >
        <button
          onClick={onClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            width: "100%",
            textAlign: "left",
            display: "flex",
            alignItems: "flex-start",
            gap: "16px",
            padding: "20px 0",
            borderBottom: "1px solid #222",
            background: "transparent",
            cursor: "pointer",
            transition: "border-color 0.2s ease",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
          }}
        >
          {/* List thumbnail */}
          <div style={{
            flexShrink: 0,
            width: "72px",
            height: "72px",
            borderRadius: "8px",
            background: "#161616",
            border: "1px solid #2a2a2a",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <BlurredThumbnail
              src={post.images?.[0]}
              alt={post.coverLabel}
              label={post.coverLabel}
              blurAmount="16px"
            />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#444", margin: "0 0 4px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              {post.date}
            </p>
            <h3 style={{
              fontSize: "14px",
              fontWeight: 500,
              color: hovered ? "#ffffff" : "#e5e5e5",
              margin: "0 0 4px",
              lineHeight: 1.4,
              transition: "color 0.2s ease",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}>
              {post.title}
            </h3>
            <p style={{ fontSize: "12px", color: "#555", margin: 0, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {post.description}
            </p>
          </div>

          <span style={{ flexShrink: 0, fontSize: "10px", fontFamily: "monospace", color: "#444", paddingTop: "2px" }}>
            {post.readTime} min
          </span>
        </button>
      </div>
    );
  }

  // Grid card
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms,
                     transform 0.55s cubic-bezier(0.22,1,0.36,1) ${index * 70}ms`,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          borderRadius: "12px",
          border: `1px solid ${hovered ? "#3a3a3a" : "#262626"}`,
          background: hovered ? "#202020" : "#1e1e1e",
          overflow: "hidden",
          cursor: "pointer",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.35)" : "0 1px 4px rgba(0,0,0,0.2)",
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s ease, border-color 0.2s ease, background 0.2s ease",
        }}
      >
        {/* Grid thumbnail */}
        <div style={{
          width: "100%",
          aspectRatio: "16/9",
          background: "#111",
          borderBottom: "1px solid #262626",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <BlurredThumbnail
            src={post.images?.[0]}
            alt={post.coverLabel}
            label={post.coverLabel}
            blurAmount="20px"
          />
        </div>

        <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
          <p style={{ fontSize: "10px", fontFamily: "monospace", color: "#444", margin: 0, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {post.date}
          </p>
          <h3 style={{
            fontSize: "14px",
            fontWeight: 500,
            color: hovered ? "#ffffff" : "#e5e5e5",
            margin: 0,
            lineHeight: 1.4,
            transition: "color 0.2s ease",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.title}
          </h3>
          <p style={{
            fontSize: "12px",
            color: "#555",
            margin: 0,
            lineHeight: 1.6,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {post.description}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#444" }}>Read</span>
            <span style={{ color: "#333" }}>·</span>
            <span style={{ fontSize: "10px", fontFamily: "monospace", color: "#444" }}>{post.readTime} min</span>
          </div>
        </div>
      </button>
    </div>
  );
}

function Blog() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [expanded, setExpanded] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { ref: headingRef, visible: headingVisible } = useScrollReveal(0.1);

  const visiblePosts =
    isMobile && !expanded ? blogPosts.slice(0, MOBILE_INITIAL) : blogPosts;
  const hiddenCount = blogPosts.length - MOBILE_INITIAL;

  const handleViewMode = (mode: ViewMode) => {
    setViewMode(mode);
    setExpanded(false);
  };

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
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 400, letterSpacing: "-0.02em", color: "#e5e5e5", margin: "0 0 8px", fontFamily: "serif" }}>
                Articles
              </h2>
              <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.65, margin: 0 }}>
                Thoughts, events, projects, AI, and building things.
              </p>
            </div>

            {/* View toggle */}
            <div style={{
              display: "flex",
              border: "1px solid #2a2a2a",
              borderRadius: "8px",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              {(["list", "grid"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleViewMode(mode)}
                  style={{
                    padding: "7px 10px",
                    background: viewMode === mode ? "#242424" : "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: viewMode === mode ? "#e5e5e5" : "#444",
                    transition: "background 0.15s ease, color 0.15s ease",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {mode === "list" ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
                      <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Posts */}
        {blogPosts.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#444", textAlign: "center", padding: "4rem 0" }}>
            No posts yet. Check back soon.
          </p>
        ) : viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
            {visiblePosts.map((post, i) => (
              <PostCard key={post.slug} post={post} mode="grid" index={i} onClick={() => navigate(`/blog/${post.slug}`)} />
            ))}
          </div>
        ) : (
          <div>
            {visiblePosts.map((post, i) => (
              <PostCard key={post.slug} post={post} mode="list" index={i} onClick={() => navigate(`/blog/${post.slug}`)} />
            ))}
          </div>
        )}

        {/* Show more / less — mobile only */}
        {isMobile && blogPosts.length > MOBILE_INITIAL && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <button
              onClick={() => setExpanded((p) => !p)}
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
              <span style={{
                display: "inline-block",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                fontSize: "10px",
              }}>
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

export default Blog;