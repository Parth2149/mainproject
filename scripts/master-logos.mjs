import fs from 'node:fs';
import sharp from 'sharp';

// Design Alpha: The Interlocked 'RK' Reverse Quantum Monogram
// Mathematically aligned geometry: left vertical bar, upper loop, reverse branch and K ray
const svgMasterRK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#141d2e"/>
      <stop offset="100%" stop-color="#070b13"/>
    </radialGradient>
    <linearGradient id="cyanCore" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="violetFlow" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0%" stop-color="#6366f1"/>
      <stop offset="50%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#ec4899"/>
    </linearGradient>
    <linearGradient id="emeraldBeam" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>

  <rect x="3" y="3" width="122" height="122" rx="32" fill="url(#bgGlow)" stroke="#1e293b" stroke-width="2"/>
  <rect x="4" y="4" width="120" height="120" rx="31" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.15"/>

  <!-- Left Pillar of R and K -->
  <rect x="28" y="28" width="14" height="72" rx="6" fill="url(#cyanCore)"/>

  <!-- Upper Reverse Loop of R -->
  <path d="M42 35h32a19 19 0 0 1 0 38H42" fill="none" stroke="url(#violetFlow)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Lower Reverse Leg (R) & K Base -->
  <path d="m56 68 34 32" stroke="url(#emeraldBeam)" stroke-width="14" stroke-linecap="round"/>

  <!-- Upper K Extension Ray -->
  <path d="m56 68 28-26" stroke="url(#cyanCore)" stroke-width="10" stroke-linecap="round" opacity="0.95"/>

  <!-- Focus / Execution Dot -->
  <circle cx="35" cy="35" r="4" fill="#ffffff" opacity="0.9"/>
</svg>`;

// Design Beta: The Binary Decompiler Prism (3D Isometric Slice)
const svgPrismCore = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="topFacet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="leftFacet" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="rightFacet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>

  <rect x="3" y="3" width="122" height="122" rx="32" fill="#070b13" stroke="#1e293b" stroke-width="2"/>

  <!-- Top Face -->
  <path d="M64 24 96 42 64 60 32 42Z" fill="url(#topFacet)"/>
  <!-- Left Face -->
  <path d="M32 42 64 60v38L32 80Z" fill="url(#leftFacet)" stroke="#334155" stroke-width="1"/>
  <!-- Right Face -->
  <path d="M64 60 96 42v38L64 98Z" fill="url(#rightFacet)"/>

  <!-- Laser Diagnostic Scan Beam -->
  <path d="M22 74 64 50l42 24" fill="none" stroke="#34d399" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="64" cy="50" r="5" fill="#ffffff"/>
</svg>`;

fs.writeFileSync('public/assets/logos/master-concept-rk.svg', svgMasterRK);
fs.writeFileSync('public/assets/logos/master-concept-prism.svg', svgPrismCore);

await sharp(Buffer.from(svgMasterRK)).resize(512, 512).png().toFile('public/assets/logos/master-concept-rk.png');
await sharp(Buffer.from(svgPrismCore)).resize(512, 512).png().toFile('public/assets/logos/master-concept-prism.png');

console.log('SUCCESS: Master logo concepts created!');

