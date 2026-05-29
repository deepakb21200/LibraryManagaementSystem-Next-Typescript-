export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8">

      {/* Pulsing icon ring */}
      <div className="relative w-22 h-22 flex items-center justify-center animate-pulse">
        <div className="absolute inset-0 rounded-full bg-emerald-50 border border-emerald-200" />
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
          fill="none" stroke="#0F6E56" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          className="relative z-10">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
          <path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
          <path d="M5 8h4" /><path d="M9 16h4" />
          <path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" />
          <path d="M14 9l4 -1" /><path d="M16 16l3.923 -.98" />
        </svg>
      </div>

      {/* Animated bookshelf */}
      <div className="flex flex-col items-center gap-0">
        <div className="flex items-end gap-1.5 h-10">
          {[
            { h: "h-9", bg: "bg-emerald-600", delay: "delay-[0ms]" },
            { h: "h-7", bg: "bg-emerald-300", delay: "delay-[150ms]" },
            { h: "h-10", bg: "bg-emerald-800", delay: "delay-[300ms]" },
            { h: "h-6", bg: "bg-emerald-400", delay: "delay-[450ms]" },
            { h: "h-8", bg: "bg-emerald-700", delay: "delay-[600ms]" },
            { h: "h-7", bg: "bg-emerald-500", delay: "delay-[750ms]" },
          ].map((book, i) => (
            <div
              key={i}
              className={`w-3.5 ${book.h} ${book.bg} ${book.delay} rounded-sm animate-bounce`}
              style={{ animationDuration: "1.2s" }}
            >
              <div className="w-full h-0.5 bg-white/20 mt-1.5 rounded-sm" />
            </div>
          ))}
        </div>
        <div className="w-32 h-0.5 bg-gray-300 rounded-full" />
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-base font-medium text-gray-800 tracking-wide">
          Library Management System
        </p>
        <p className="text-sm text-gray-400 animate-pulse">
          Loading your library...
        </p>
        <div className="flex gap-1.5 mt-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce"
              style={{ animationDelay: `${i * 160}ms`, animationDuration: "1.4s" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}