import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// 1. Concept 1: The Cryptographic Key & Unlocked Vault
const svg1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#481542" />
      <stop offset="100%" stop-color="#240720" />
    </linearGradient>
    <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="50%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#C28700" />
    </linearGradient>
    <linearGradient id="white1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#D5C8E6" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg1)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- Outer Digital Vault Bracket (Opening) -->
  <path d="M20 18 H15 C13 18 12 19 12 21 V43 C12 45 13 46 15 46 H20" stroke="url(#white1)" stroke-width="3.5" stroke-linecap="round" />
  <path d="M44 18 H49 C51 18 52 19 52 21 V43 C52 45 51 46 49 46 H44" stroke="url(#white1)" stroke-width="3.5" stroke-linecap="round" />
  
  <!-- Master Keyblade cutting through -->
  <circle cx="26" cy="32" r="8" stroke="url(#gold1)" stroke-width="4" />
  <circle cx="26" cy="32" r="3" fill="url(#gold1)" />
  <path d="M34 32 H50" stroke="url(#gold1)" stroke-width="4.5" stroke-linecap="round" />
  <path d="M42 32 V38" stroke="url(#gold1)" stroke-width="3.5" stroke-linecap="round" />
  <path d="M48 32 V39" stroke="url(#gold1)" stroke-width="3.5" stroke-linecap="round" />
</svg>`;

// 2. Concept 2: The Decompiler Prism & Refraction Core
const svg2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#461440" />
      <stop offset="100%" stop-color="#240822" />
    </linearGradient>
    <linearGradient id="gold2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDF73" />
      <stop offset="60%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#B87D00" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg2)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- Prism Facets (Isometric Crystal) -->
  <!-- Solid White Beam Entering from Left -->
  <path d="M8 32 H22" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round" />
  
  <!-- Center Triangle Prism -->
  <polygon points="32,15 48,47 16,47" fill="#3A0F34" stroke="#FFFFFF" stroke-width="2.5" />
  <polygon points="32,22 43,44 21,44" fill="#4A1844" />
  
  <!-- Golden Refracted Beams Exiting to Right -->
  <path d="M36 34 L56 22" stroke="url(#gold2)" stroke-width="3" stroke-linecap="round" />
  <path d="M38 37 L56 32" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
  <path d="M36 40 L56 42" stroke="url(#gold2)" stroke-width="3" stroke-linecap="round" />
  
  <!-- Radiant Core Spark -->
  <circle cx="32" cy="34" r="3" fill="url(#gold2)" />
</svg>`;

// 3. Concept 3: The Cybernetic Falcon / Vision Mascot (Sharp Geometric Eagle)
const svg3 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A1642" />
      <stop offset="100%" stop-color="#250721" />
    </linearGradient>
    <linearGradient id="gold3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="60%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#BD8300" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg3)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- Geometric Wings & Crest -->
  <path d="M12 26 L32 14 L52 26 L42 36 L32 30 L22 36 Z" fill="#FFFFFF" fill-opacity="0.95" />
  <path d="M18 32 L32 24 L46 32 L38 42 L32 37 L26 42 Z" fill="#DDD3EB" fill-opacity="0.8" />
  
  <!-- Falcon Beak & Golden Core Eye -->
  <polygon points="32,32 36,41 28,41" fill="url(#gold3)" />
  <polygon points="32,41 35,49 29,49" fill="url(#gold3)" />
  
  <!-- Laser Eyes -->
  <circle cx="28" cy="28" r="2" fill="url(#gold3)" />
  <circle cx="36" cy="28" r="2" fill="url(#gold3)" />
</svg>`;

// 4. Concept 4: The Mobius Loop / Infinite Reverse 'R'
const svg4 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#481541" />
      <stop offset="100%" stop-color="#240720" />
    </linearGradient>
    <linearGradient id="gold4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFDA66" />
      <stop offset="50%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#B87D00" />
    </linearGradient>
    <linearGradient id="silver4" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#D0C4DF" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg4)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- Fluid Interlocking Infinite Ribbon forming 'R' -->
  <!-- Left Spine -->
  <path d="M17 48 V16" stroke="url(#silver4)" stroke-width="6.5" stroke-linecap="round" />
  
  <!-- Reverse Loop (Counter-Clockwise Flow) -->
  <path d="M17 16 C28 16 38 18 43 23 C48 28 46 35 38 37 C30 39 23 37 17 37" stroke="url(#silver4)" stroke-width="6" stroke-linecap="round" />
  
  <!-- Golden Reverse Arrow Kick cutting forward -->
  <path d="M29 35 L44 48" stroke="url(#gold4)" stroke-width="6.5" stroke-linecap="round" />
  <polygon points="44,48 45,41 38,47" fill="url(#gold4)" />
  
  <!-- Reverse Cycle Arrowhead on top loop -->
  <polygon points="26,11 26,20 18,16" fill="url(#gold4)" />
</svg>`;

// 5. Concept 5: The Master Security Shield & Caliper Toolkit
const svg5 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" fill="none">
  <defs>
    <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#461440" />
      <stop offset="100%" stop-color="#240822" />
    </linearGradient>
    <linearGradient id="gold5" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE082" />
      <stop offset="50%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#C28700" />
    </linearGradient>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#bg5)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- The Security Crest Outline -->
  <path d="M32 14 L48 20 V33 C48 42 41 49 32 52 C23 49 16 42 16 33 V20 Z" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" fill="#320C2D" />
  
  <!-- Precision Caliper & Key Tool Inside Crest -->
  <!-- Digital Caliper Jaw Left -->
  <path d="M24 23 V37 L29 34 V26 Z" fill="url(#gold5)" />
  <!-- Digital Caliper Jaw Right -->
  <path d="M40 23 V37 L35 34 V26 Z" fill="url(#gold5)" />
  <!-- Central Precision Vernier / Decompiler Dial -->
  <circle cx="32" cy="30" r="4.5" fill="#FFFFFF" />
  <circle cx="32" cy="30" r="2" fill="#3A0F34" />
  <path d="M32 35 V44" stroke="url(#gold5)" stroke-width="3" stroke-linecap="round" />
</svg>`;

async function run() {
  const dir = 'public/assets/logos';
  const concepts = [
    { name: 'option-1-unlocked-vault-key', svg: svg1 },
    { name: 'option-2-decompiler-prism', svg: svg2 },
    { name: 'option-3-cyber-falcon-vision', svg: svg3 },
    { name: 'option-4-mobius-infinite-r', svg: svg4 },
    { name: 'option-5-master-toolkit-shield', svg: svg5 }
  ];

  for (const c of concepts) {
    const svgPath = path.join(dir, `${c.name}.svg`);
    const pngPath = path.join(dir, `${c.name}.png`);
    fs.writeFileSync(svgPath, c.svg);
    await sharp(Buffer.from(c.svg)).resize(512, 512).png().toFile(pngPath);
    console.log(`Generated: ${pngPath}`);
  }
  console.log('ALL 5 DISTINCT CONCEPTS GENERATED AT 512x512 RESOLUTION!');
}

run().catch(console.error);

