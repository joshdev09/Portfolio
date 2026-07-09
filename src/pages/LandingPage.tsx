import { useEffect, useState } from "react";
import WavesBackground from "../components/WavesBackground";

const pillars = [
  { num: "01", label: "IDENTIFY" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "CREATE" },
  { num: "04", label: "INNOVATE" },
];

// Staggered fade-up animation via inline styles
// Each element gets an index-based delay
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Tiny delay so browser paints first, then triggers transitions
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return mounted;
}

function fadeUp(mounted: boolean, delay: number): React.CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms,
                 transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  };
}

function slideUp(mounted: boolean, delay: number): React.CSSProperties {
  return {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(100%)",
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  };
}

export default function LandingPage() {
  const mounted = useMounted();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f0f2f5] text-[#1a1a1a] font-sans overflow-hidden">
      <WavesBackground />

      {/* ── MAIN ── */}
      <main className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 sm:px-8 py-12 sm:py-16 relative z-10">

        {/* Name tag — fades up first */}
        <div
          className="flex items-center gap-2 sm:gap-3"
          style={fadeUp(mounted, 100)}
        >
          <span
            className="h-px bg-[#bbb]"
            style={{
              width: mounted ? "2.25rem" : "0px",
              transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 200ms",
            }}
          />
          <span className="text-[8px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.22em] font-medium text-[#444] uppercase text-center">
            Joshua Emmanuel M. Halili
          </span>
          <span
            className="h-px bg-[#bbb]"
            style={{
              width: mounted ? "2.25rem" : "0px",
              transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 200ms",
            }}
          />
        </div>

        {/* Wordmark — clips up from below, word by word */}
        <h1
          className="font-black leading-none tracking-[-0.03em] text-[#111]
            text-center w-full max-w-[90vw] sm:max-w-2xl lg:max-w-4xl
            text-[clamp(2rem,11vw,7rem)] px-2 overflow-hidden"
        >
          {/* Each word slides up individually */}
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block"
              style={slideUp(mounted, 250)}
            >
              SOFTWARE
            </span>
          </span>
          {" "}
          <span className="inline-block overflow-hidden">
            <span
              className="inline-block"
              style={slideUp(mounted, 380)}
            >
              DEVELOPER
            </span>
          </span>
        </h1>

        {/* Tagline — fades up after wordmark */}
        <div
          className="flex items-center gap-2 sm:gap-3 text-[8px] sm:text-[9px] tracking-[0.16em] sm:tracking-[0.2em] font-medium text-[#444] uppercase"
          style={fadeUp(mounted, 550)}
        >
          <span
            className="h-px bg-[#bbb]"
            style={{
              width: mounted ? "2.25rem" : "0px",
              transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 650ms",
            }}
          />
          <span className="text-center">Let's Start Innovating</span>
          <span
            className="h-px bg-[#bbb]"
            style={{
              width: mounted ? "2.25rem" : "0px",
              transition: "width 0.7s cubic-bezier(0.22,1,0.36,1) 650ms",
            }}
          />
        </div>
      </main>

      {/* ── PILLARS ── */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 border-t border-[#d0d3d8] relative z-10 bg-[#f0f2f5]/70 backdrop-blur-sm"
        style={fadeUp(mounted, 700)}
      >
        {pillars.map(({ num, label }, i) => (
          <div
            key={num}
            className={`
              flex flex-col gap-1 px-4 sm:px-5 py-5 sm:py-8
              border-[#d0d3d8]
              ${i % 2 === 0 ? "border-r" : ""}
              sm:border-r sm:last:border-r-0
              ${i >= 2 ? "border-t sm:border-t-0" : ""}
            `}
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition: `opacity 0.5s ease ${750 + i * 80}ms, transform 0.5s ease ${750 + i * 80}ms`,
            }}
          >
            <span className="text-[11px] sm:text-[12px] tracking-widest font-medium text-[#aaa]">
              {num}
            </span>
            <span className="text-[12px] sm:text-[13px] tracking-[0.1em] sm:tracking-[0.12em] font-bold uppercase text-[#1a1a1a]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer
        className="flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0 px-4 sm:px-5 py-3 sm:py-2.5 border-t border-[#d0d3d8] relative z-10 bg-[#f0f2f5]/70 backdrop-blur-sm"
        style={fadeUp(mounted, 900)}
      >
        <span className="text-[7px] sm:text-[8px] tracking-[0.12em] sm:tracking-[0.14em] font-medium text-[#aaa] uppercase">
          © 2026 Shua <span className="mx-1 sm:mx-1.5 opacity-50">///</span> All rights reserved
        </span>
      </footer>
    </div>
  );
}