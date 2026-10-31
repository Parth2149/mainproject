import fs from 'node:fs';
import sharp from 'sharp';

fs.mkdirSync('public/assets/logos', { recursive: true });

// 1. CONCEPT 1: "The Reverse Vector R" (Light Theme)
// Architectural 'R' where the lower leg has a precision reverse step
const svgConcept1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <!-- Soft Light Badge -->
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Left Pillar (Rich Slate) -->
  <rect x="16" y="14" width="6" height="36" rx="3" fill="#1e293b"/>
  
  <!-- Upper Loop (Vibrant Sky Blue) -->
  <path d="M22 18h13a9 9 0 0 1 0 18H22" stroke="#0284c7" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Lower Diagonal Leg (Electric Indigo) -->
  <path d="m27 34 13 14" stroke="#6366f1" stroke-width="6" stroke-linecap="round"/>
  
  <!-- Reverse Step Arrow Barb (Emerald Mint) -->
  <path d="M30 48h10" stroke="#10b981" stroke-width="4.5" stroke-linecap="round"/>
  
  <!-- Origin Dot (Fresh Cyan) -->
  <circle cx="41" cy="18" r="3" fill="#38bdf8"/>
</svg>`;

// 2. CONCEPT 2: "The Disassembly Terminal" (Light Theme)
// Code brackets enclosing a dynamic reverse slash
const svgConcept2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Left Bracket < (Vibrant Indigo) -->
  <path d="m20 20-9 12 9 12" stroke="#4f46e5" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Reversing Center Slash (Electric Cyan with direction) -->
  <path d="M37 16 27 48" stroke="#0284c7" stroke-width="5.5" stroke-linecap="round"/>
  
  <!-- Right Bracket > (Fresh Emerald) -->
  <path d="m44 20 9 12-9 12" stroke="#10b981" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Reverse Tick on Slash -->
  <path d="m30 32-4-4" stroke="#0284c7" stroke-width="4" stroke-linecap="round"/>
</svg>`;

// 3. CONCEPT 3: "The Control-Flow Ribbon" (Light Theme)
// Single continuous Bauhaus line forming an R with integrated loop arrow
const svgConcept3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Continuous Dynamic Flow -->
  <path d="M18 48V16h16a9 9 0 0 1 0 18H18l18 14" stroke="#1e293b" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Internal Reverse Indicator (Sky Blue to Mint) -->
  <path d="m27 22-4 3 4 3" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Terminal Node Dot (Electric Indigo) -->
  <circle cx="36" cy="48" r="4.5" fill="#6366f1"/>
</svg>`;

// 4. CONCEPT 4: "The Dual Precision Slashes" (Light Theme)
// Ultra-clean, modern geometric parallelograms: Cerulean Cyan + Royal Indigo
const svgConcept4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" stroke="#e2e8f0" stroke-width="2"/>
  
  <!-- Left Slash: Cerulean Sky Blue -->
  <path d="M14 48 29 16h9L23 48Z" fill="#0284c7"/>
  
  <!-- Right Slash: Vibrant Royal Indigo -->
  <path d="m31 48 15-32h9L40 48Z" fill="#6366f1"/>
</svg>`;

fs.writeFileSync('public/assets/logos/concept-1-reverse-r-light.svg', svgConcept1);
fs.writeFileSync('public/assets/logos/concept-2-brackets-light.svg', svgConcept2);
fs.writeFileSync('public/assets/logos/concept-3-ribbon-light.svg', svgConcept3);
fs.writeFileSync('public/assets/logos/concept-4-dual-slash-light.svg', svgConcept4);

// Generate 512x512 high-resolution PNGs
await Promise.all([
  sharp(Buffer.from(svgConcept1)).resize(512, 512).png().toFile('public/assets/logos/concept-1-reverse-r-light.png'),
  sharp(Buffer.from(svgConcept2)).resize(512, 512).png().toFile('public/assets/logos/concept-2-brackets-light.png'),
  sharp(Buffer.from(svgConcept3)).resize(512, 512).png().toFile('public/assets/logos/concept-3-ribbon-light.png'),
  sharp(Buffer.from(svgConcept4)).resize(512, 512).png().toFile('public/assets/logos/concept-4-dual-slash-light.png'),
]);

console.log('SUCCESS: Generated all 4 light-themed human-crafted logo sets (SVG & 512x512 PNG)!');

