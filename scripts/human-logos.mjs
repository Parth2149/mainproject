import fs from 'node:fs';
import sharp from 'sharp';

// 1. CONCEPT A: "The Reverse Vector R" (Swiss Typographic Minimalist)
// Clean flat geometry: vertical stem, clean upper semi-circle loop, and a crisp diagonal that ends in a leftward reverse barb.
const logoA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <!-- Minimalist Clean Stem -->
  <rect x="6" y="5" width="4" height="22" rx="2" fill="#1e293b"/>
  <!-- Pure Upper Loop of R -->
  <path d="M10 8h8a5.5 5.5 0 0 1 0 11H10" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Reverse Leg: Diagonal down with reverse tick -->
  <path d="m14 18 9 9" stroke="#1e293b" stroke-width="4" stroke-linecap="round"/>
  <path d="M16 27h6" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

// 2. CONCEPT B: "The Disassembly Terminal" (Brackets + Reverse Slash)
// Inspired by Git and Hacker culture: Clean < / > where the slash reverses into an arrow
const logoB = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <!-- Left Bracket < -->
  <path d="m10 10-5 6 5 6" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Reversing Slash (steep diagonal with directional head) -->
  <path d="M19 8 13 24" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round"/>
  <!-- Right Bracket > -->
  <path d="m22 10 5 6-5 6" stroke="#2563eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// 3. CONCEPT C: "The Control Flow Loop" (Classic Paul Rand / Vercel simplicity)
// A continuous line forming an R where the loop and reverse arrow are one seamless stroke
const logoC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <path d="M7 27V7h11a6.5 6.5 0 0 1 0 13H7l14 8" stroke="#0f172a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Reverse Arrow on the loop return -->
  <path d="m13 17-3 3 3 3" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// 4. CONCEPT D: "The Dual Precision Slash" (Modernist Architecture)
// The cleanest, most timeless brand mark for RevKit:
// Two offset parallelograms (the decompilation slice), exactly like Stripe or Git's legendary simplicity
const logoD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none">
  <!-- Left Slash: Deep Navy / Slate -->
  <path d="M6 25 14 7h5L11 25Z" fill="#1e293b"/>
  <!-- Right Slash: Electric Cobalt Blue -->
  <path d="m15 25 8-18h5l-8 18Z" fill="#2563eb"/>
</svg>`;

fs.writeFileSync('public/assets/logos/human-logo-a.svg', logoA);
fs.writeFileSync('public/assets/logos/human-logo-b.svg', logoB);
fs.writeFileSync('public/assets/logos/human-logo-c.svg', logoC);
fs.writeFileSync('public/assets/logos/human-logo-d.svg', logoD);

await Promise.all([
  sharp(Buffer.from(logoA)).resize(512, 512).png().toFile('public/assets/logos/human-logo-a.png'),
  sharp(Buffer.from(logoB)).resize(512, 512).png().toFile('public/assets/logos/human-logo-b.png'),
  sharp(Buffer.from(logoC)).resize(512, 512).png().toFile('public/assets/logos/human-logo-c.png'),
  sharp(Buffer.from(logoD)).resize(512, 512).png().toFile('public/assets/logos/human-logo-d.png')
]);

console.log('SUCCESS: Generated 4 human-crafted flat minimalist logos!');

