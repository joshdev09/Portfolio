import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogPosts, type ContentBlock } from "../data/blogData";

// ─── Image Carousel ────────────────────────────────────────────────────────────
// Pass an array of image paths relative to /public, e.g. ["/covers/my-post-1.jpg"]
// If no images are provided it shows a plain dark placeholder.
function ImageCarousel({ images, label }: { images?: string[]; label: string }) {
  const [current, setCurrent] = useState(0);
  const hasImages = images && images.length > 0;

  if (!hasImages) {
    return (
      <div style={{
        width: "100%",
        aspectRatio: "16/9",
        borderRadius: "10px",
        background: "#161616",
        border: "1px solid #242424",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "40px",
      }}>
        <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#333", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {label}
        </span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div style={{ position: "relative", marginBottom: "40px", borderRadius: "10px", overflow: "hidden", border: "1px solid #242424" }}>
      {/* Image */}
      <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", background: "#111", overflow: "hidden" }}>
  
      {/* Blurred backdrop — same image, covers + blurs behind */}
      <img
        src={images[current]}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "blur(24px) brightness(0.35) saturate(1.3)",
          transform: "scale(1.08)", // slightly scale to hide blur edge bleed
          zIndex: 0,
        }}
      />

      {/* Main image on top */}
      <img
        key={current}
        src={images[current]}
        alt={`Cover ${current + 1}`}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block",
          animation: "fadeIn 0.3s ease",
        }}
      />
    </div>

      {/* Arrows — only if more than 1 image */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(20,20,20,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid #333",
              color: "#ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "rgba(20,20,20,0.75)",
              backdropFilter: "blur(8px)",
              border: "1px solid #333",
              color: "#ccc",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "5px",
            zIndex: 2,
          }}>
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "18px" : "5px",
                  height: "5px",
                  borderRadius: "999px",
                  background: i === current ? "#e5e5e5" : "rgba(255,255,255,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.25s ease, background 0.2s ease",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Counter badge */}
      {images.length > 1 && (
        <span style={{
          position: "absolute",
          top: "10px",
          right: "12px",
          fontSize: "10px",
          fontFamily: "monospace",
          color: "#aaa",
          background: "rgba(20,20,20,0.7)",
          backdropFilter: "blur(6px)",
          border: "1px solid #333",
          borderRadius: "999px",
          padding: "2px 8px",
          zIndex: 2,
        }}>
          {current + 1} / {images.length}
        </span>
      )}
    </div>
  );
}

// ─── Code Block ────────────────────────────────────────────────────────────────
function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div style={{ margin: "24px 0", borderRadius: "10px", overflow: "hidden", border: "1px solid #242424" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 16px", background: "#1e1e1e", borderBottom: "1px solid #242424" }}>
        <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#666", letterSpacing: "0.05em" }}>{language}</span>
        <div style={{ display: "flex", gap: "5px" }}>
          {[0,1,2].map(i => <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#2a2a2a" }} />)}
        </div>
      </div>
      <pre style={{ background: "#161616", padding: "16px 20px", overflowX: "auto", margin: 0 }}>
        <code style={{ fontSize: "13px", fontFamily: "monospace", color: "#c8c8c8", lineHeight: 1.7 }}>
          {code}
        </code>
      </pre>
    </div>
  );
}

// ─── Content Blocks ────────────────────────────────────────────────────────────
function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p key={index} style={{ fontSize: "15px", color: "#b0b0b0", lineHeight: 1.85, margin: "0 0 22px" }}>
          {block.text}
        </p>
      );
    case "heading":
      return (
        <h2 key={index} style={{ fontSize: "18px", fontWeight: 500, color: "#e8e8e8", margin: "40px 0 14px", letterSpacing: "-0.01em" }}>
          {block.text}
        </h2>
      );
    case "subheading":
      return (
        <h3 key={index} style={{ fontSize: "11px", fontWeight: 500, color: "#666", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace", margin: "32px 0 12px" }}>
          {block.text}
        </h3>
      );
    case "code":
      return <CodeBlock key={index} language={block.language} code={block.code} />;
    case "list":
      return (
        <ul key={index} style={{ margin: "0 0 22px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontSize: "15px", color: "#b0b0b0", lineHeight: 1.75 }}>
              <span style={{ marginTop: "10px", flexShrink: 0, width: "3px", height: "3px", borderRadius: "50%", background: "#666" }} />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={index} style={{ margin: "28px 0", paddingLeft: "18px", borderLeft: "2px solid #333" }}>
          <p style={{ fontSize: "15px", color: "#777", fontStyle: "italic", lineHeight: 1.8, margin: 0 }}>{block.text}</p>
        </blockquote>
      );
    default:
      return null;
  }
}

// ─── BlogPost Page ─────────────────────────────────────────────────────────────
function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate  = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  function goBack() {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("blog");
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#1a1a1a", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <p style={{ fontSize: "14px", color: "#666" }}>Post not found.</p>
        <button onClick={goBack} style={{ fontSize: "13px", color: "#777", background: "none", border: "none", cursor: "pointer" }}>
          ← back to blog
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Fade-in keyframe */}
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      <div style={{ minHeight: "100vh", backgroundColor: "#1a1a1a", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "38rem", margin: "0 auto" }}>

          {/* Back */}
          <button
            onClick={goBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#666",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: "44px",
              letterSpacing: "0.03em",
              padding: 0,
              transition: "color 0.2s ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#e5e5e5")}
            onMouseLeave={e => (e.currentTarget.style.color = "#666")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            all posts
          </button>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {post.date}
            </span>
            <span style={{ color: "#333" }}>·</span>
            <span style={{ fontSize: "11px", fontFamily: "monospace", color: "#666", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: "clamp(1.5rem, 5vw, 2.1rem)",
            fontWeight: 400,
            color: "#efefef",
            lineHeight: 1.3,
            letterSpacing: "-0.02em",
            fontFamily: "serif",
            margin: "0 0 16px",
          }}>
            {post.title}
          </h1>

          {/* Description */}
          <p style={{ fontSize: "15px", color: "#777", lineHeight: 1.75, margin: "0 0 28px" }}>
            {post.description}
          </p>

          {/* Author */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            paddingBottom: "28px",
            borderBottom: "1px solid #222",
            marginBottom: "32px",
          }}>
            
            <div style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#242424",
              border: "1px solid #2e2e2e",
              overflow: "hidden",
              flexShrink: 0,
            }}>
              <img
                src="../src/assets/images/me-photo.png"
                alt="Joshua Halili"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
                onError={(e) => {
                  // Fallback to initials if image not found
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLDivElement).style.display = "flex";
                  (e.currentTarget.parentElement as HTMLDivElement).style.alignItems = "center";
                  (e.currentTarget.parentElement as HTMLDivElement).style.justifyContent = "center";
                  (e.currentTarget.parentElement as HTMLDivElement).innerHTML = `<span style="font-size:13px;font-weight:600;color:#666">J</span>`;
                }}
              />
            </div>
            <div>
              <p style={{ fontSize: "14px", color: "#c8c8c8", margin: 0, fontWeight: 500 }}>Joshua Halili</p>
              <p style={{ fontSize: "11px", color: "#555", margin: "1px 0 0", fontFamily: "monospace" }}>joshdev09</p>
            </div>
          </div>

          {/*
            Cover image carousel:
            Add image paths to post.images in your blogData file.
            Each path should be relative to /public, e.g. "/blog/my-post/cover.jpg"
            Multiple images will show a carousel with arrows + dot indicators.
          */}
          <ImageCarousel
            images={(post as any).images}
            label={post.coverLabel}
          />

          {/* Article content */}
          <article>{post.content.map((block, i) => renderBlock(block, i))}</article>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div style={{ marginTop: "44px", paddingTop: "28px", borderTop: "1px solid #222", display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {post.tags.map((tag) => (
                <span key={tag} style={{
                  fontSize: "11px",
                  fontFamily: "monospace",
                  color: "#555",
                  background: "transparent",
                  border: "1px solid #2a2a2a",
                  borderRadius: "999px",
                  padding: "3px 10px",
                  letterSpacing: "0.04em",
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Bottom back */}
          <div style={{ marginTop: "52px", paddingTop: "28px", borderTop: "1px solid #222" }}>
            <button
              onClick={goBack}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "#666",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.03em",
                padding: 0,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#e5e5e5")}
              onMouseLeave={e => (e.currentTarget.style.color = "#666")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              back to all posts
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default BlogPost;