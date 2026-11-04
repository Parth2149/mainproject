import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// CONCEPT 1: The Prismatic Monogram (R + Golden Key / Decompiler Kick)
const concept1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="rk-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A1844" />
      <stop offset="60%" stop-color="#3A0F34" />
      <stop offset="100%" stop-color="#260822" />
    </linearGradient>
    <linearGradient id="rk-stem" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#E5DBEE" />
    </linearGradient>
    <linearGradient id="rk-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFD452" />
      <stop offset="60%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#C28700" />
    </linearGradient>
    <filter id="rk-shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.3" />
    </filter>
  </defs>

  <!-- Container Badge -->
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#rk-bg)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.15" />

  <!-- Monogram Mark -->
  <g filter="url(#rk-shadow)">
    <!-- Vertical Pillar -->
    <rect x="16" y="16" width="7" height="32" rx="3.5" fill="url(#rk-stem)" />

    <!-- Loop of the R -->
    <path d="M22 16 H35 C41.6 16 46 20.4 46 26 C46 31.6 41.6 36 35 36 H22" fill="none" stroke="url(#rk-stem)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Golden Dynamic Kick / Reverse Key -->
    <path d="M30 33.5 L43.5 47" stroke="url(#rk-gold)" stroke-width="6.5" stroke-linecap="round" />

    <!-- Focal Reverse Node -->
    <circle cx="32" cy="26" r="3.2" fill="url(#rk-gold)" />
    <circle cx="32" cy="26" r="1.3" fill="#3A0F34" />
  </g>
</svg>`;

// CONCEPT 2: The Quantum Decompiler (Interlocking Hexagon / Binary Core)
const concept2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="q-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#481441" />
      <stop offset="100%" stop-color="#260822" />
    </linearGradient>
    <linearGradient id="q-white" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#DDD3EB" />
    </linearGradient>
    <linearGradient id="q-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDA66" />
      <stop offset="70%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#BA8100" />
    </linearGradient>
  </defs>

  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#q-bg)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.15" />

  <!-- Isometric Decompiler Cube / Hex Core -->
  <g transform="translate(0, 0)">
    <!-- Top Facet (Deconstruction Plane) -->
    <path d="M32 14 L47 22.5 L32 31 L17 22.5 Z" fill="url(#q-white)" fill-opacity="0.95" />
    <!-- Left Facet (Reverse Analysis) -->
    <path d="M17 25.5 L30 33 L30 49 L17 41.5 Z" fill="url(#q-white)" fill-opacity="0.75" />
    <!-- Right Facet (Golden Reconstruction / Kit) -->
    <path d="M34 33 L47 25.5 L47 41.5 L34 49 Z" fill="url(#q-gold)" />
    <!-- Center Core Spark -->
    <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
  </g>
</svg>`;

// CONCEPT 3: The Sovereign RK Monogram Ribbon (Continuous Code Flow)
const concept3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="rk-bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#461640" />
      <stop offset="50%" stop-color="#3A0F34" />
      <stop offset="100%" stop-color="#240720" />
    </linearGradient>
    <linearGradient id="gold-bright" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="50%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#B87D00" />
    </linearGradient>
    <linearGradient id="silver-bright" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#DFD2EC" />
    </linearGradient>
    <filter id="mark-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>

  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#rk-bg3)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.45" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.8" stroke-opacity="0.15" />

  <g filter="url(#mark-glow)">
    <!-- The Reverse Engineering 'R' Loop & Code Chevrons -->
    <!-- Left Stem with Bevel -->
    <path d="M16 48 V16 H28 C36 16 41 20 41 26 C41 31.5 36.5 35 29 35.5 L42 48 H33 L23 37 H22 V48 H16 Z" fill="url(#silver-bright)" />
    <!-- Golden Core Key Accent (The Reverse Vector inside the R counter) -->
    <path d="M22 22 H27 C31 22 34 23.5 34 26 C34 28.5 31 30 27 30 H22 V22 Z" fill="#3A0F34" />
    <path d="M25 24 L29 26 L25 28" stroke="url(#gold-bright)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none" />

    <!-- Golden 'K' Diagonal Arrow Element -->
    <path d="M33 35.5 L44 48 H38 L30 38.5 Z" fill="url(#gold-bright)" />
    <circle cx="43" cy="20" r="2.5" fill="url(#gold-bright)" />
  </g>
</svg>`;

async function main() {
  const dir = 'public/assets/logos';
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path.join(dir, 'revkit-concept-1-prismatic-r.svg'), concept1Svg);
  fs.writeFileSync(path.join(dir, 'revkit-concept-2-cube.svg'), concept2Svg);
  fs.writeFileSync(path.join(dir, 'revkit-concept-3-monogram.svg'), concept3Svg);

  await sharp(Buffer.from(concept1Svg)).resize(512, 512).png().toFile(path.join(dir, 'revkit-concept-1-prismatic-r.png'));
  await sharp(Buffer.from(concept2Svg)).resize(512, 512).png().toFile(path.join(dir, 'revkit-concept-2-cube.png'));
  await sharp(Buffer.from(concept3Svg)).resize(512, 512).png().toFile(path.join(dir, 'revkit-concept-3-monogram.png'));

  console.log('SUCCESS: Generated 3 Master Identity Concepts in SVG and 512x512 PNG!');
}

main().catch(console.error);
