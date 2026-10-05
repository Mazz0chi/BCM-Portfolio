import type { ReactNode } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Low-fi page: image placeholder (box with a cross) over two text lines.
function Wire({ x, y, w, ih }: { x: number; y: number; w: number; ih: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={ih} rx={1.5} />
      <path d={`M${x} ${y}L${x + w} ${y + ih}M${x + w} ${y}L${x} ${y + ih}`} />
      <path d={`M${x} ${y + ih + 6}H${x + w}M${x} ${y + ih + 12}H${x + w * 0.6}`} />
    </g>
  );
}

// Same wireframes drawn twice: flat on the page (web design) and inside real
// hardware, a monitor and a phone (frontend).
function Devices({ hardware }: { hardware: boolean }) {
  return (
    <>
      {hardware ? (
        <>
          <rect x="4" y="12" width="60" height="44" rx="4" />
          <path d="M34 56V68M24 68H44" />
          <Wire x={11} y={19} w={46} ih={18} />
          <rect x="68" y="36" width="22" height="50" rx="5" />
          <path d="M76 40.5H82" />
          <Wire x={73} y={47} w={12} ih={14} />
        </>
      ) : (
        <>
          <rect x="4" y="16" width="60" height="46" rx="4" />
          <path d="M4 25H64" />
          <Wire x={11} y={31} w={46} ih={16} />
          <rect x="68" y="36" width="22" height="50" rx="2" />
          <Wire x={73} y={44} w={12} ih={14} />
        </>
      )}
    </>
  );
}

const icons: ReactNode[] = [
  // Brand identity: open book.
  <>
    <path d="M48 27C40 21 27 20 14 23V71C27 68 40 69 48 75C56 69 69 68 82 71V23C69 20 56 21 48 27Z" />
    <path d="M48 27V75" />
    <path d="M23 34C28 33 33 33.5 38 35M23 44C28 43 33 43.5 38 45M23 54H31" />
    <path d="M58 35C63 33.5 68 33 73 34M58 45C63 43.5 68 43 73 44" />
  </>,
  // Web design: flat low-fi wireframes.
  <Devices key="web" hardware={false} />,
  // Frontend development: the same wireframes on a monitor and a phone.
  <Devices key="front" hardware />,
  // Design systems: a grid of components, one still snapping into place.
  <>
    <rect x="12" y="12" width="32" height="32" rx="5" />
    <circle cx="28" cy="28" r="8" />
    <rect x="52" y="12" width="32" height="32" rx="5" />
    <path d="M60 24H76M60 32H70" />
    <rect x="12" y="52" width="32" height="32" rx="5" />
    <rect x="20" y="64" width="16" height="8" rx="4" />
    <rect x="58" y="58" width="32" height="32" rx="5" strokeDasharray="3 4.5" />
    <path d="M52 52L62 62" />
  </>,
];

export function ServiceIcon({ index, className }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden className={className} {...stroke}>
      {icons[index]}
    </svg>
  );
}
