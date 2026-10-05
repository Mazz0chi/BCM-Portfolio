import type { ReactNode } from "react";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

// Mobile app screen: status bar, search, tab row, card, text, bottom nav.
// (x, y) is the top-left of the 34 x 72 frame; `hardware` adds a speaker and rounder corners.
function Phone({ x, y, hardware }: { x: number; y: number; hardware?: boolean }) {
  const h = hardware ? 76 : 72;
  const dy = hardware ? 4 : 0;
  return (
    <g>
      <rect x={x} y={y} width="34" height={h} rx={hardware ? 8 : 3} />
      {hardware && <path d={`M${x + 13} ${y + 3.5}h8`} />}
      <path d={`M${x + 6} ${y + 7 + dy}h5M${x + 23} ${y + 7 + dy}h3M${x + 28} ${y + 7 + dy}h0`} />
      <rect x={x + 5} y={y + 12 + dy} width="24" height="6" rx="3" />
      {[0, 7, 14, 21].map((o) => (
        <rect key={o} x={x + 6 + o} y={y + 23 + dy} width="4" height="4" rx="1" />
      ))}
      <path d={`M${x + 5} ${y + 31 + dy}H${x + 29}M${x + 5} ${y + 36 + dy}h10`} />
      <rect x={x + 5} y={y + 40 + dy} width="24" height="13" rx="2.5" />
      <path d={`M${x + 5} ${y + 57 + dy}h12M${x + 5} ${y + 61 + dy}h8`} />
      <path d={`M${x + 5} ${y + h - 9}H${x + 29}`} />
      {[8, 14.5, 21, 27.5].map((o) => (
        <circle key={o} cx={x + o} cy={y + h - 5} r="1.4" />
      ))}
    </g>
  );
}

// Web page: nav, search, three cards with captions. (x, y) is the top-left of the 82-wide screen.
function Screen({ x, y, cardH }: { x: number; y: number; cardH: number }) {
  return (
    <g>
      <path d={`M${x + 6} ${y + 7}h8M${x + 52} ${y + 7}h6M${x + 62} ${y + 7}h6M${x + 72} ${y + 7}h4`} />
      <rect x={x + 6} y={y + 12} width="70" height="6" rx="3" />
      {[0, 25, 50].map((o) => (
        <g key={o}>
          <rect x={x + 6 + o} y={y + 23} width="20" height={cardH} rx="2" />
          <path d={`M${x + 6 + o} ${y + 27 + cardH}h14M${x + 6 + o} ${y + 31 + cardH}h9`} />
        </g>
      ))}
    </g>
  );
}

const icons: ReactNode[] = [
  // Brand identity: open book in perspective, pages stacked underneath.
  <g key="book" transform="translate(4 8)">
    <path d="M60 32C48 24 32 22 20 26L8 52C28 52 48 54 60 60C72 54 92 52 112 52L100 26C88 22 72 24 60 32Z" />
    <path d="M60 32V60" />
    <path d="M24 33C32 31 40 32 48 36M21 40C30 38 40 39 50 43M18 47C28 45 40 46 52 50" />
    <path d="M96 33C88 31 80 32 72 36M99 40C90 38 80 39 70 43M102 47C92 45 80 46 68 50" />
    <path d="M10 57C30 57 48 59 60 66C72 59 90 57 110 57" />
    <path d="M7 62C28 62 48 64 60 71C72 64 92 62 113 62" />
    <path d="M4 67C27 67 48 69 56 74H64C72 69 93 67 116 67" />
  </g>,
  // Web design: flat wireframes of a web page and a mobile screen.
  <g key="web">
    <rect x="2" y="8" width="82" height="60" rx="3" />
    <path d="M2 16H84" />
    <path d="M7 12h0M11 12h0M15 12h0" />
    <Screen x={2} y={16} cardH={14} />
    <Phone x={92} y={12} />
  </g>,
  // Frontend development: the same screens inside a monitor and a phone.
  <g key="front">
    <rect x="2" y="6" width="86" height="58" rx="4" />
    <path d="M45 64V76M33 76H57" />
    <Screen x={4} y={8} cardH={20} />
    <Phone x={94} y={10} hardware />
  </g>,
  // Design systems: type, color, a component, and a slot still to fill.
  <g key="system">
    <rect x="22" y="8" width="40" height="38" rx="6" />
    <path d="M34 36L42 16L50 36M37.5 29H46.5" />
    <rect x="68" y="8" width="40" height="38" rx="6" />
    <circle cx="78" cy="27" r="4.5" />
    <circle cx="88" cy="27" r="4.5" />
    <circle cx="98" cy="27" r="4.5" />
    <rect x="22" y="52" width="40" height="38" rx="6" />
    <rect x="30" y="66" width="24" height="10" rx="5" />
    <rect x="68" y="52" width="40" height="38" rx="6" strokeDasharray="3 4" />
    <path d="M82 71H94M88 65V77" />
  </g>,
];

export function ServiceIcon({ index, className }: { index: number; className?: string }) {
  return (
    <svg viewBox="0 0 128 96" aria-hidden className={className} {...stroke}>
      {icons[index]}
    </svg>
  );
}
