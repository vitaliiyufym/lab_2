// Ілюстрація «щит із замком» — чистий SVG, без зовнішніх файлів.
function Shield({ className = '' }) {
  return (
    <svg
      viewBox="0 0 200 220"
      className={`text-emerald-400 drop-shadow-[0_0_18px_rgba(52,211,153,0.55)] ${className}`}
      role="img"
      aria-label="Щит із замком — символ кібербезпеки"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* щит */}
      <path
        d="M100 10 L180 40 V110 C180 160 140 195 100 210 C60 195 20 160 20 110 V40 Z"
        className="fill-slate-900"
      />
      {/* «схема» всередині щита */}
      <path d="M45 70 H75 M125 70 H155 M45 140 H70 M130 140 H155" className="text-cyan-400" strokeWidth="2" />
      <circle cx="45" cy="70" r="3" className="fill-cyan-400 text-cyan-400" />
      <circle cx="155" cy="70" r="3" className="fill-cyan-400 text-cyan-400" />
      <circle cx="45" cy="140" r="3" className="fill-cyan-400 text-cyan-400" />
      <circle cx="155" cy="140" r="3" className="fill-cyan-400 text-cyan-400" />
      {/* замок */}
      <path d="M78 98 V86 a22 22 0 0 1 44 0 V98" />
      <rect x="68" y="98" width="64" height="50" rx="8" className="fill-emerald-400/15" />
      <circle cx="100" cy="120" r="6" className="fill-emerald-400" />
      <path d="M100 126 V136" />
    </svg>
  );
}

export default Shield;
