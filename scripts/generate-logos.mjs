import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

fs.mkdirSync('public/assets/logos', { recursive: true });

// 1. Concept 1: Geometric 'R' Reverse Loop
const svgConcept1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="cyanStem" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="purpleLoop" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#818cf8"/>
      <stop offset="100%" stop-color="#a855f7"/>
    </linearGradient>
    <linearGradient id="greenAccent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="16" fill="#0e1726" stroke="#1e293b" stroke-width="1.5"/>
  <rect x="15" y="15" width="8" height="34" rx="3" fill="url(#cyanStem)"/>
  <path d="M23 19h14a10 10 0 0 1 0 20H23" fill="none" stroke="url(#purpleLoop)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="m30 38 16 11" stroke="url(#greenAccent)" stroke-width="7.5" stroke-linecap="round"/>
  <circle cx="48" cy="19" r="3.5" fill="#38bdf8"/>
</svg>`;

// 2. Concept 2: Disassembly Code Brackets & Loop
const svgConcept2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="c2grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="16" fill="#0b1320" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M22 17h-4a4 4 0 0 0-4 4v5a4 4 0 0 1-4 4 4 4 0 0 1 4 4v5a4 4 0 0 0 4 4h4" fill="none" stroke="#38bdf8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M42 17h4a4 4 0 0 1 4 4v5a4 4 0 0 0 4 4 4 4 0 0 0-4 4v5a4 4 0 0 1-4 4h-4" fill="none" stroke="#818cf8" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M32 23a9 9 0 1 1-7 14" fill="none" stroke="#34d399" stroke-width="3.5" stroke-linecap="round"/>
  <path d="m28 20-5 3 5 4" fill="none" stroke="#34d399" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="32" cy="32" r="2.5" fill="#38bdf8"/>
</svg>`;

// 3. Concept 3: Hexagonal Control-Flow Graph Badge
const svgConcept3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="c3blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect x="1" y="1" width="62" height="62" rx="16" fill="#080f1a" stroke="#1e293b" stroke-width="1.5"/>
  <path d="M32 8 51 19v26L32 56 13 45V19Z" fill="none" stroke="#1e293b" stroke-width="2.5"/>
  <rect x="26" y="14" width="12" height="8" rx="2" fill="#38bdf8"/>
  <path d="M32 22v7M32 29H20v7M32 29h12v7" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
  <rect x="14" y="36" width="12" height="8" rx="2" fill="#818cf8"/>
  <rect x="38" y="36" width="12" height="8" rx="2" fill="#34d399"/>
  <path d="M20 44v4h12M44 44v4H32" fill="none" stroke="#64748b" stroke-width="2" stroke-linecap="round"/>
  <circle cx="32" cy="48" r="2.5" fill="#38bdf8"/>
</svg>`;

fs.writeFileSync('public/assets/logos/logo-concept-1-r-loop.svg', svgConcept1);
fs.writeFileSync('public/assets/logos/logo-concept-2-brackets.svg', svgConcept2);
fs.writeFileSync('public/assets/logos/logo-concept-3-cfg-badge.svg', svgConcept3);

// Generate high-resolution 512x512 PNGs for each concept
await sharp(Buffer.from(svgConcept1)).resize(512, 512).png().toFile('public/assets/logos/logo-concept-1.png');
await sharp(Buffer.from(svgConcept2)).resize(512, 512).png().toFile('public/assets/logos/logo-concept-2.png');
await sharp(Buffer.from(svgConcept3)).resize(512, 512).png().toFile('public/assets/logos/logo-concept-3.png');

// Set Concept 1 as the official site favicon and icon suite
fs.writeFileSync('public/assets/favicon.svg', svgConcept1);
fs.writeFileSync('public/favicon.svg', svgConcept1);

const png32 = await sharp(Buffer.from(svgConcept1)).resize(32, 32).png().toBuffer();
const png48 = await sharp(Buffer.from(svgConcept1)).resize(48, 48).png().toBuffer();
const png180 = await sharp(Buffer.from(svgConcept1)).resize(180, 180).png().toBuffer();
const png192 = await sharp(Buffer.from(svgConcept1)).resize(192, 192).png().toBuffer();

fs.writeFileSync('public/assets/favicon-32x32.png', png32);
fs.writeFileSync('public/assets/favicon-48x48.png', png48);
fs.writeFileSync('public/assets/apple-touch-icon.png', png180);
fs.writeFileSync('public/assets/icon-192.png', png192);

// Generate ICO
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(2, 4);

const offset0 = 38;
const offset1 = offset0 + png32.length;

const entry0 = Buffer.alloc(16);
entry0.writeUInt8(32, 0);
entry0.writeUInt8(32, 1);
entry0.writeUInt8(0, 2);
entry0.writeUInt8(0, 3);
entry0.writeUInt16LE(1, 4);
entry0.writeUInt16LE(32, 6);
entry0.writeUInt32LE(png32.length, 8);
entry0.writeUInt32LE(offset0, 12);

const entry1 = Buffer.alloc(16);
entry1.writeUInt8(48, 0);
entry1.writeUInt8(48, 1);
entry1.writeUInt8(0, 2);
entry1.writeUInt8(0, 3);
entry1.writeUInt16LE(1, 4);
entry1.writeUInt16LE(32, 6);
entry1.writeUInt32LE(png48.length, 8);
entry1.writeUInt32LE(offset1, 12);

const ico = Buffer.concat([header, entry0, entry1, png32, png48]);
fs.writeFileSync('public/favicon.ico', ico);
fs.writeFileSync('public/assets/favicon.ico', ico);

console.log('SUCCESS: Generated all 3 logo concepts (SVG + 512x512 PNGs) and applied Concept 1 to all site favicons!');

