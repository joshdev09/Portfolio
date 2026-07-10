export default function WavesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <style>{`
        @keyframes wave1 {
          from { transform: translateX(0); }
          to { transform: translateX(-37.5%); }
        }
        @keyframes wave2 {
          from { transform: translateX(0); }
          to { transform: translateX(-41.6667%); }
        }
        @keyframes wave3 {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        svg g {
          transform-box: view-box;
        }
      `}</style>

      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave 1 */}
        <g className="animate-[wave1_8s_linear_infinite]">
          <path
            d="M0,600 C180,520 360,680 540,600 C720,520 900,680 1080,600
               C1260,520 1440,680 1620,600 C1800,520 1980,680 2160,600
               C2340,520 2520,680 2700,600 C2880,520 3060,680 3240,600
               L3240,900 L0,900 Z"
            fill="rgba(180,185,200,0.18)"
          />
        </g>
        {/* Wave 2 */}
        <g className="animate-[wave2_12s_linear_infinite_reverse]">
          <path
            d="M0,640 C200,560 400,720 600,640 C800,560 1000,720 1200,640
               C1400,560 1600,720 1800,640 C2000,560 2200,720 2400,640
               C2600,560 2800,720 3000,640 C3200,560 3400,720 3600,640
               L3600,900 L0,900 Z"
            fill="rgba(160,168,190,0.14)"
          />
        </g>
        {/* Wave 3 */}
        <g className="animate-[wave3_16s_linear_infinite]">
          <path
            d="M0,680 C240,580 480,760 720,680 C960,580 1200,760 1440,680
               C1680,580 1920,760 2160,680 C2400,580 2640,760 2880,680
               C3120,580 3360,760 3600,680 L3600,900 L0,900 Z"
            fill="rgba(200,205,220,0.12)"
          />
        </g>
      </svg>
    </div>
  );
}