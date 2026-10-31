import fs from 'node:fs';
import sharp from 'sharp';

// The "Pure Reverse Engineering" Mark
// Concept: Binary Decompilation Flow
// Left: Data bus / Machine architecture column
// Center: Reverse Rewind Loop (Decompiler mechanism)
// Right: Branching Control-Flow Logic & Code Brackets
// Monogram: Together they form an unmistakable, razor-sharp 'R'
const pureReSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="deepDark" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#111927"/>
      <stop offset="100%" stop-color="#05080f"/>
    </radialGradient>

    <!-- Cyan Binary Data Stream Gradient -->
    <linearGradient id="binaryStream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#0369a1"/>
    </linearGradient>

    <!-- Neon Mint Disassembly Beam -->
    <linearGradient id="decompileBeam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>

    <!-- Ultraviolet Reconstructed Logic Flow -->
    <linearGradient id="reconstructedLogic" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="60%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#d946ef"/>
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Squircle Base with Cyber Rim -->
  <rect x="3" y="3" width="122" height="122" rx="30" fill="url(#deepDark)" stroke="#1e293b" stroke-width="2"/>
  <rect x="4" y="4" width="120" height="120" rx="29" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.12"/>

  <!-- Sub-surface Binary Register Grid (Subtle) -->
  <g opacity="0.18" stroke="#38bdf8" stroke-width="1.2">
    <line x1="20" y1="44" x2="108" y2="44" stroke-dasharray="2 6"/>
    <line x1="20" y1="84" x2="108" y2="84" stroke-dasharray="2 6"/>
    <circle cx="20" cy="44" r="2" fill="#38bdf8"/>
    <circle cx="108" cy="84" r="2" fill="#38bdf8"/>
  </g>

  <!-- 1. LEFT PILLAR: The Compiled Architecture / Binary Bus -->
  <!-- Split into 3 register segments (representing bytes/registers: EAX, EBX, ECX) -->
  <rect x="26" y="26" width="14" height="20" rx="4" fill="url(#binaryStream)"/>
  <rect x="26" y="50" width="14" height="26" rx="4" fill="url(#binaryStream)"/>
  <rect x="26" y="80" width="14" height="22" rx="4" fill="url(#binaryStream)"/>

  <!-- 2. UPPER REVERSE LOOP: The Decompiler Core -->
  <!-- Curving back from the right, unwinding compiled code into high-level logic -->
  <path d="M40 33h35a18 18 0 0 1 0 36H40" fill="none" stroke="url(#reconstructedLogic)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 3. LOWER DIAGNOSTIC SCAN: The Branching Control-Flow Path -->
  <!-- Laser trace slicing downward (like IDA / Ghidra true/false branch) -->
  <path d="m54 69 36 33" stroke="url(#decompileBeam)" stroke-width="14" stroke-linecap="round"/>

  <!-- 4. REVERSE ARROW / DISASSEMBLY PROBE -->
  <!-- A reverse arrowhead embedded right on the scan line pointing BACK toward source -->
  <path d="M82 82l-14-3 3 14" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- 5. RECONSTRUCTED CODE BRACKET in the loop core (Negative Space Glyph) -->
  <!-- An inward code bracket < showing decompiled source syntax -->
  <path d="m58 45-6 6 6 6" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9"/>

  <!-- 6. ENTRY POINT INSTRUCTION POINTER (RIP / PC register dot) -->
  <circle cx="95" cy="51" r="5" fill="#38bdf8"/>
  <circle cx="95" cy="51" r="2.5" fill="#ffffff"/>
</svg>`;

fs.writeFileSync('public/assets/logos/pure-reverse-engineering.svg', pureReSvg);

await sharp(Buffer.from(pureReSvg)).resize(512, 512).png().toFile('public/assets/logos/pure-reverse-engineering.png');
console.log('SUCCESS: Generated pure reverse engineering mark (SVG & 512x512 PNG)!');

