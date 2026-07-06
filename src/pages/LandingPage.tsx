import WavesBackground from '../components/WavesBackground'

const pillars = [
  { num: "01", label: "IDENTIFY" },
  { num: "02", label: "DESIGN" },
  { num: "03", label: "CREATE" },
  { num: "04", label: "INNOVATE" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5] text-[#1a1a1a] font-sans overflow-hidden">
        <WavesBackground />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-16 relative z-10">

        <div className="flex items-center gap-3">
          <span className="w-9 h-px bg-[#bbb]" />
          <span className="text-[9px] tracking-[0.22em] font-medium text-[#444] uppercase">
            Joshua Emmanuel M. Halili
          </span>
          <span className="w-9 h-px bg-[#bbb]" />
        </div>

        {/* Wordmark */}
        <h1
          className="text-[clamp(2.5rem,10vw,7rem)] font-black leading-none
            tracking-[-0.03em] text-[#111] flex text-center justify-center w-20"
        >
          SOFTWARE DEVELOPER
        </h1>

        <div className="flex items-center gap-3 text-[9px] tracking-[0.2em] font-medium text-[#444] uppercase">
          <span className="w-9 h-px bg-[#bbb]" />
          Let's Start Innovating
          <span className="w-9 h-px bg-[#bbb]" />
        </div>
      </main>

      <div className="grid grid-cols-4 border-t border-[#d0d3d8] relative z-10 bg-[#f0f2f5]/70 backdrop-blur-sm">
        {pillars.map(({ num, label }) => (
          <div
            key={num}
            className="flex flex-col gap-1 px-4 py-8
              border-r border-[#d0d3d8] last:border-r-0"
          >
            <span className="text-[12px] tracking-widest font-medium text-[#aaa]">{num}</span>
            <span className="text-[13px] tracking-[0.12em] font-bold uppercase text-[#1a1a1a]">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <footer className="flex justify-between items-center px-5 py-2.5 border-t border-[#d0d3d8] relative z-10 bg-[#f0f2f5]/70 backdrop-blur-sm">
        <span className="text-[8px] tracking-[0.14em] font-medium text-[#aaa] uppercase">
          © 2026 Shua <span className="mx-1.5 opacity-50">///</span> All rights reserved
        </span>
        <span className="text-[8px] tracking-[0.14em] font-medium text-[#aaa] uppercase">
          /// System Operational
        </span>
      </footer>
    </div>
  );
}