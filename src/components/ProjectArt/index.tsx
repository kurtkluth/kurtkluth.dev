import React from 'react';
import styles from './styles.module.css';

/**
 * Branded, hand-drawn SVG artwork for each project card and hero.
 * Pure decoration (aria-hidden); every scene is self-contained so cards ship
 * with zero image assets and stay crisp at any size in both themes.
 */

function SqlclrArt() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="sql-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1f6feb" stopOpacity="0.35" />
          <stop offset="1" stopColor="#1f6feb" stopOpacity="0" />
        </radialGradient>
        <pattern id="sql-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0v25" fill="none" stroke="rgba(88,166,255,0.07)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="400" height="225" fill="#0a0f18" />
      <rect width="400" height="225" fill="url(#sql-grid)" />
      <ellipse cx="200" cy="112" rx="130" ry="85" fill="url(#sql-glow)" />
      {/* database cylinder */}
      <path
        d="M154 74v72c0 8.8 20.6 16 46 16s46-7.2 46-16V74"
        fill="rgba(88,166,255,0.06)"
        stroke="#58a6ff"
        strokeWidth="2.5"
      />
      <ellipse cx="200" cy="74" rx="46" ry="15" fill="#0a0f18" stroke="#58a6ff" strokeWidth="2.5" />
      <path d="M154 99c0 8.8 20.6 16 46 16s46-7.2 46-16" fill="none" stroke="#58a6ff" strokeWidth="2" opacity="0.75" />
      <path d="M154 123c0 8.8 20.6 16 46 16s46-7.2 46-16" fill="none" stroke="#58a6ff" strokeWidth="2" opacity="0.55" />
      {/* code brackets */}
      <path d="M118 84l-27 29 27 29" fill="none" stroke="#8ec6ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M282 84l27 29-27 29" fill="none" stroke="#8ec6ff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="200" y="204" textAnchor="middle" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" letterSpacing="4" fill="rgba(154,167,184,0.75)">
        .NET INSIDE SQL SERVER
      </text>
    </svg>
  );
}

function LisaClimberArt() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="400" height="225" fill="#0b0e1a" />
      <g shapeRendering="crispEdges">
        {/* stars + pixel moon */}
        <rect x="46" y="28" width="3" height="3" fill="#dbe7f3" opacity="0.8" />
        <rect x="118" y="52" width="3" height="3" fill="#dbe7f3" opacity="0.55" />
        <rect x="86" y="90" width="3" height="3" fill="#dbe7f3" opacity="0.4" />
        <rect x="298" y="40" width="3" height="3" fill="#dbe7f3" opacity="0.7" />
        <rect x="342" y="86" width="3" height="3" fill="#dbe7f3" opacity="0.5" />
        <rect x="260" y="22" width="3" height="3" fill="#dbe7f3" opacity="0.5" />
        <rect x="318" y="24" width="14" height="14" fill="#dbe7f3" />
        <rect x="318" y="24" width="5" height="5" fill="#aebfd4" />
        {/* back mountain */}
        <g fill="#141d33">
          <rect x="20" y="150" width="150" height="75" />
          <rect x="45" y="120" width="100" height="30" />
          <rect x="70" y="95" width="50" height="25" />
        </g>
        {/* main stepped summit */}
        <g fill="#1d2c4a">
          <rect x="150" y="180" width="230" height="45" />
          <rect x="170" y="150" width="190" height="30" />
          <rect x="190" y="120" width="150" height="30" />
          <rect x="210" y="90" width="110" height="30" />
          <rect x="230" y="60" width="70" height="30" />
        </g>
        {/* snow caps */}
        <g fill="#e8f1fa">
          <rect x="230" y="60" width="70" height="7" />
          <rect x="210" y="90" width="20" height="5" />
          <rect x="300" y="90" width="20" height="5" />
        </g>
        {/* summit flag */}
        <rect x="262" y="34" width="3" height="26" fill="#cbd5e1" />
        <path d="M265 34h20l-20 9z" fill="#ff5f6d" shapeRendering="auto" />
        {/* floating platforms */}
        <g>
          <rect x="52" y="176" width="52" height="6" fill="#3fa64e" />
          <rect x="52" y="182" width="52" height="8" fill="#7a4a22" />
          <rect x="120" y="140" width="44" height="6" fill="#8ecbff" />
          <rect x="120" y="146" width="44" height="8" fill="#39537a" />
        </g>
        {/* Lisa */}
        <g>
          <rect x="136" y="122" width="12" height="12" fill="#58a6ff" />
          <rect x="138" y="116" width="8" height="6" fill="#f3c79b" />
          <rect x="136" y="134" width="4" height="6" fill="#2d4a75" />
          <rect x="144" y="134" width="4" height="6" fill="#2d4a75" />
        </g>
        {/* gem */}
        <rect x="86" y="164" width="8" height="8" fill="#c77dff" />
      </g>
    </svg>
  );
}

function LisetrisArt() {
  const size = 21;
  const gap = 5;
  const heart: Array<[number, number]> = [
    [1, 0], [2, 0], [5, 0], [6, 0],
    [0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1], [6, 1], [7, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2], [6, 2], [7, 2],
    [1, 3], [2, 3], [3, 3], [4, 3], [5, 3], [6, 3],
    [2, 4], [3, 4], [4, 4], [5, 4],
    [3, 5], [4, 5],
  ];
  const shades = ['#ff5fa8', '#f14b97', '#ff77b5'];
  const originX = (400 - (8 * (size + gap) - gap)) / 2;
  const originY = 34;
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="lt-glow" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#ff5fa8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#ff5fa8" stopOpacity="0" />
        </radialGradient>
        <filter id="lt-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>
      <rect width="400" height="225" fill="#2b0f3a" />
      <ellipse cx="200" cy="105" rx="150" ry="100" fill="url(#lt-glow)" />
      {heart.map(([cx, cy], i) => (
        <rect
          key={i}
          x={originX + cx * (size + gap)}
          y={originY + cy * (size + gap)}
          width={size}
          height={size}
          rx="4.5"
          fill={shades[(cx + cy) % 3]}
        />
      ))}
      {/* drifting pieces */}
      <g opacity="0.55" filter="url(#lt-soft)">
        <rect x="40" y="30" width="15" height="15" rx="3.5" fill="#b06ce0" />
        <rect x="56" y="30" width="15" height="15" rx="3.5" fill="#b06ce0" />
        <rect x="56" y="46" width="15" height="15" rx="3.5" fill="#b06ce0" />
        <rect x="330" y="150" width="15" height="15" rx="3.5" fill="#8ec6ff" />
        <rect x="346" y="150" width="15" height="15" rx="3.5" fill="#8ec6ff" />
        <rect x="338" y="166" width="15" height="15" rx="3.5" fill="#8ec6ff" />
      </g>
      <g opacity="0.35">
        <circle cx="72" cy="140" r="1.6" fill="#ffd6ea" />
        <circle cx="322" cy="60" r="1.6" fill="#ffd6ea" />
        <circle cx="352" cy="96" r="1.4" fill="#ffd6ea" />
      </g>
    </svg>
  );
}

function LisasTapistryArt() {
  // The garden-1 tulip mosaic, as [col, row, kind] beads.
  const cell = 15;
  const bead = 12;
  const cols = 8;
  const P = 'p';
  const S = 's';
  const G = 'g';
  const beads: Array<[number, number, string]> = [
    [1, 0, P], [3, 0, P], [4, 0, P], [6, 0, P],
    [1, 1, P], [2, 1, P], [3, 1, P], [4, 1, P], [5, 1, P], [6, 1, P],
    [2, 2, P], [3, 2, P], [4, 2, P], [5, 2, P],
    [3, 3, S], [4, 3, S],
    [0, 4, G], [3, 4, S], [4, 4, S], [7, 4, G],
    [1, 5, G], [2, 5, G], [3, 5, S], [4, 5, S], [5, 5, G], [6, 5, G],
    [3, 6, S], [4, 6, S],
    [3, 7, S], [4, 7, S],
  ];
  const fills: Record<string, string> = {p: '#c2477b', s: '#4e8c4e', g: '#5fa05e'};
  const originX = (400 - (cols * cell - (cell - bead))) / 2;
  const originY = 50;

  // A cream arrow tile: rounded square plus a bold directional arrow.
  function Tile({x, y, rotate, color}: {x: number; y: number; rotate: number; color: string}) {
    return (
      <g transform={`translate(${x} ${y})`}>
        <rect width="42" height="42" rx="10" fill="#fbf1de" stroke="#e5d3b8" strokeWidth="2" />
        <g transform={`rotate(${rotate} 21 21)`}>
          <path
            d="M21 9 L33 24 H26.5 V34 H15.5 V24 H9 Z"
            fill={color}
            stroke="#4a3b40"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </g>
      </g>
    );
  }

  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tap-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a1a33" />
          <stop offset="1" stopColor="#240b1a" />
        </linearGradient>
        <radialGradient id="tap-glow" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#e8a93c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#e8a93c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="url(#tap-bg)" />
      <ellipse cx="200" cy="108" rx="150" ry="96" fill="url(#tap-glow)" />
      {/* stitched border */}
      <rect
        x="14"
        y="14"
        width="372"
        height="197"
        rx="16"
        fill="none"
        stroke="rgba(242,117,95,0.5)"
        strokeWidth="2"
        strokeDasharray="7 6"
      />
      {/* mosaic tulip */}
      {beads.map(([c, r, kind], i) => (
        <rect
          key={i}
          x={originX + c * cell}
          y={originY + r * cell}
          width={bead}
          height={bead}
          rx="3.5"
          fill={fills[kind]}
        />
      ))}
      {/* floating arrow tiles */}
      <Tile x={36} y={64} rotate={0} color="#2f8f83" />
      <Tile x={318} y={48} rotate={270} color="#9b7fc7" />
      <Tile x={322} y={140} rotate={90} color="#f2755f" />
    </svg>
  );
}

function SkyrouteArt() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="sr-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1020" />
          <stop offset="0.62" stopColor="#152641" />
          <stop offset="1" stopColor="#1b2f4f" />
        </linearGradient>
        <radialGradient id="sr-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f0a35c" stopOpacity="0.9" />
          <stop offset="0.55" stopColor="#f0a35c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f0a35c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill="url(#sr-sky)" />
      <circle cx="296" cy="118" r="52" fill="url(#sr-sun)" />
      <circle cx="296" cy="118" r="20" fill="#f0a35c" opacity="0.95" />
      {/* horizon + terrain */}
      <path d="M0 132h400" stroke="rgba(148,163,184,0.4)" strokeWidth="1" />
      <path
        d="M0 225V150c30-10 55-22 90-18 40 5 70 16 110 12s80-20 120-14c32 5 56 12 80 10v85z"
        fill="#0b1626"
      />
      {/* runway */}
      <path d="M58 205l52 0-14-34h-24z" fill="#182a41" stroke="rgba(148,163,184,0.35)" strokeWidth="1" />
      <path d="M84 203v-30" stroke="rgba(231,236,243,0.55)" strokeWidth="2" strokeDasharray="5 6" />
      {/* route */}
      <path
        d="M84 176C130 84 220 58 322 92"
        fill="none"
        stroke="#5ab1ff"
        strokeWidth="2"
        strokeDasharray="1 9"
        strokeLinecap="round"
      />
      <circle cx="84" cy="176" r="3.5" fill="none" stroke="#5ab1ff" strokeWidth="1.5" />
      {/* aircraft */}
      <g transform="translate(322 92) rotate(18)">
        <path d="M0 0l-22 7 4-7-4-7z" fill="#e7ecf3" />
        <path d="M-14 0h-8" stroke="#e7ecf3" strokeWidth="2" />
      </g>
      {/* clouds */}
      <g fill="rgba(231,236,243,0.12)">
        <rect x="44" y="52" width="58" height="10" rx="5" />
        <rect x="60" y="44" width="30" height="10" rx="5" />
        <rect x="228" y="34" width="46" height="9" rx="4.5" />
      </g>
      <text x="200" y="216" textAnchor="middle" fontFamily="JetBrains Mono Variable, monospace" fontSize="9" letterSpacing="3.5" fill="rgba(154,167,184,0.7)">
        MER → SKY · 110 KT
      </text>
    </svg>
  );
}

function SpindriftArt() {
  return (
    <svg viewBox="0 0 400 225" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <filter id="sp-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="225" fill="#000000" />
      <g fill="#e8f1f8">
        <circle cx="60" cy="40" r="1.2" opacity="0.8" />
        <circle cx="150" cy="26" r="1.2" opacity="0.5" />
        <circle cx="330" cy="52" r="1.2" opacity="0.7" />
        <circle cx="368" cy="150" r="1.2" opacity="0.5" />
        <circle cx="40" cy="170" r="1.2" opacity="0.6" />
        <circle cx="228" cy="200" r="1.2" opacity="0.5" />
      </g>
      <g fill="none" stroke="#e8f1f8" strokeWidth="1.8" filter="url(#sp-glow)">
        {/* rocks */}
        <path d="M84 78l24-16 26 8 8 24-14 22-30 4-18-20z" />
        <path d="M268 42l18-10 20 8 4 16-12 14-22 2-12-14z" />
        <path d="M312 150l14-9 16 5 6 15-9 13-19 3-11-12z" />
        <path d="M148 168l10-7 12 4 3 11-7 9-14 2-8-9z" />
        {/* saucer */}
        <ellipse cx="72" cy="130" rx="16" ry="6" />
        <path d="M64 126c1-6 15-6 16 0" />
        {/* ship + thrust */}
        <g transform="translate(212 112) rotate(-32)">
          <path d="M0-13L8 10L0 5L-8 10Z" strokeLinejoin="round" />
          <path d="M0 7v9" stroke="#8ec6ff" strokeWidth="2" />
        </g>
      </g>
      <text x="358" y="26" textAnchor="end" fontFamily="JetBrains Mono Variable, monospace" fontSize="10" letterSpacing="2" fill="rgba(232,241,248,0.55)">
        HI 3200
      </text>
    </svg>
  );
}

const ART: Record<string, () => React.ReactNode> = {
  sqlclr: SqlclrArt,
  'lisa-climber': LisaClimberArt,
  lisetris: LisetrisArt,
  'lisas-tapistry': LisasTapistryArt,
  skyroute: SkyrouteArt,
  spindrift: SpindriftArt,
};

export default function ProjectArt({slug}: {slug: string}): React.ReactNode {
  const Art = ART[slug];
  return <div className={styles.frame}>{Art ? <Art /> : null}</div>;
}
