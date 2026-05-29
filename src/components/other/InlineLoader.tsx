export default function InlineLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex justify-center mt-6">
      <style>{`
        @keyframes barGrow {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes textPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .il-scan {
          animation: scan 1.8s ease-in-out infinite;
        }
        .il-bar {
          animation: barGrow 1.2s ease-in-out infinite;
          transform-origin: bottom;
        }
        .il-dot {
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .il-text {
          animation: textPulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <div
        style={{ position: "relative", overflow: "hidden" }}
        className="bg-white border border-gray-100 rounded-2xl px-8 py-5 flex flex-col items-center gap-3 min-w-[220px]"
      >
        {/* Scan line */}
        <div
          className="il-scan"
          style={{
            position: "absolute",
            top: 0, left: 0,
            height: "100%",
            width: "56px",
            background: "linear-gradient(90deg, transparent, rgba(29,158,117,0.10), transparent)",
          }}
        />

        {/* Bars */}
        <div className="flex items-center gap-1.5" style={{ height: "32px" }}>
          {[
            { color: "#9FE1CB", delay: "0ms" },
            { color: "#5DCAA5", delay: "100ms" },
            { color: "#1D9E75", delay: "200ms" },
            { color: "#0F6E56", delay: "300ms" },
            { color: "#1D9E75", delay: "200ms" },
            { color: "#5DCAA5", delay: "100ms" },
            { color: "#9FE1CB", delay: "0ms" },
          ].map((bar, i) => (
            <div
              key={i}
              className="il-bar rounded-full"
              style={{
                width: "4px",
                height: "100%",
                background: bar.color,
                animationDelay: bar.delay,
              }}
            />
          ))}
        </div>

        {/* Text */}
        <span
          className="il-text text-xs tracking-wide"
          style={{ color: "#888780" }}
        >
          {text}
        </span>

        {/* Dots */}
        <div className="flex gap-1">
          {[
            { color: "#1D9E75", delay: "0ms" },
            { color: "#5DCAA5", delay: "150ms" },
            { color: "#9FE1CB", delay: "300ms" },
          ].map((dot, i) => (
            <div
              key={i}
              className="il-dot rounded-full"
              style={{
                width: "6px",
                height: "6px",
                background: dot.color,
                animationDelay: dot.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}