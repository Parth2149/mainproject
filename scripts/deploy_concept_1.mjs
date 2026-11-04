import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Master SVG Vector for Concept 1: The Cryptographic Golden Key & Unlocked Digital Vault
const concept1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <!-- Deep Plum Premium Shield Background -->
    <linearGradient id="vault-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4E1746" />
      <stop offset="50%" stop-color="#3A0F34" />
      <stop offset="100%" stop-color="#240720" />
    </linearGradient>

    <!-- Sovereign Gold Gradient -->
    <linearGradient id="gold-core" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE48A" />
      <stop offset="45%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#B87D00" />
    </linearGradient>

    <!-- Platinum Shimmer Gradient -->
    <linearGradient id="plat-beam" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#D5C7E6" />
    </linearGradient>

    <!-- Circuit Glow -->
    <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Container Squircle Badge -->
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#vault-bg)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.55" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.18" />

  <g filter="url(#core-glow)">
    <!-- Digital Vault / Chamber Brackets (Unlocking Effect) -->
    <!-- Top & Left Frame Brackets -->
    <path d="M22 17 H16 C13.8 17 12 18.8 12 21 V43 C12 45.2 13.8 47 16 47 H22" stroke="url(#plat-beam)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Top & Right Frame Brackets -->
    <path d="M42 17 H48 C50.2 17 52 18.8 52 21 V43 C52 45.2 50.2 47 48 47 H42" stroke="url(#plat-beam)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Isometric Vault Nodes -->
    <circle cx="16" cy="21" r="1.5" fill="url(#gold-core)" />
    <circle cx="48" cy="21" r="1.5" fill="url(#gold-core)" />
    <circle cx="16" cy="43" r="1.5" fill="url(#gold-core)" />
    <circle cx="48" cy="43" r="1.5" fill="url(#gold-core)" />

    <!-- Circuit Interconnect Traces (Subtle) -->
    <path d="M15 32 H19" stroke="#EAAA00" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7" />
    <path d="M45 32 H49" stroke="#EAAA00" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7" />

    <!-- The Master Golden Keyblade (Unlocking the Vault) -->
    <!-- Key Bow (Head) with Concentric Rings & Crosshair -->
    <circle cx="25" cy="32" r="7.5" stroke="url(#gold-core)" stroke-width="3.5" />
    <circle cx="25" cy="32" r="2.8" fill="url(#gold-core)" />

    <!-- Key Shaft -->
    <path d="M32.5 32 H48" stroke="url(#gold-core)" stroke-width="4.2" stroke-linecap="round" />

    <!-- Dual Key Teeth (Bit) Cutting Into Vault Logic -->
    <path d="M40 32 V38.5" stroke="url(#gold-core)" stroke-width="3.2" stroke-linecap="round" />
    <path d="M46 32 V39.5" stroke="url(#gold-core)" stroke-width="3.2" stroke-linecap="round" />
  </g>
</svg>`;

async function deploy() {
  console.log('Deploying Concept 1 (The Cryptographic Golden Key & Unlocked Vault)...');

  // 1. Write Favicon SVGs
  fs.writeFileSync('public/favicon.svg', concept1Svg);
  fs.writeFileSync('public/assets/favicon.svg', concept1Svg);

  // 2. Generate PNGs across all required dimensions
  const sizes = [
    { name: 'public/icon-48.png', size: 48 },
    { name: 'public/icon-96.png', size: 96 },
    { name: 'public/icon-192.png', size: 192 },
    { name: 'public/icon-512.png', size: 512 },
    { name: 'public/apple-touch-icon.png', size: 180 },
    { name: 'public/assets/favicon-32x32.png', size: 32 },
    { name: 'public/assets/favicon-48x48.png', size: 48 },
    { name: 'public/assets/icon-192.png', size: 192 },
    { name: 'public/assets/apple-touch-icon.png', size: 180 },
  ];

  for (const s of sizes) {
    const buf = await sharp(Buffer.from(concept1Svg)).resize(s.size, s.size).png().toBuffer();
    fs.writeFileSync(s.name, buf);
    console.log(`Generated ${s.name} (${s.size}x${s.size})`);
  }

  // 3. Generate multi-resolution ICO file (16, 32, 48px)
  const p16 = await sharp(Buffer.from(concept1Svg)).resize(16, 16).png().toBuffer();
  const p32 = await sharp(Buffer.from(concept1Svg)).resize(32, 32).png().toBuffer();
  const p48 = await sharp(Buffer.from(concept1Svg)).resize(48, 48).png().toBuffer();

  const numImages = 3;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO type
  header.writeUInt16LE(numImages, 4); // count

  let currentOffset = 6 + (16 * numImages);
  const entries = [];
  const buffers = [p16, p32, p48];
  const dims = [16, 32, 48];

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(dims[i], 0);
    entry.writeUInt8(dims[i], 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffers[i].length, 8);
    entry.writeUInt32LE(currentOffset, 12);
    entries.push(entry);
    currentOffset += buffers[i].length;
  }

  const ico = Buffer.concat([header, ...entries, ...buffers]);
  fs.writeFileSync('public/favicon.ico', ico);
  fs.writeFileSync('public/assets/favicon.ico', ico);
  console.log('Generated multi-resolution favicon.ico');

  // 4. Update Chrome.jsx
  const chromePath = 'src/components/Chrome.jsx';
  let chromeContent = fs.readFileSync(chromePath, 'utf8');

  const newLogoSvg = `<svg viewBox="0 0 64 64" width="30" height="30" fill="none">
        <defs>
          <linearGradient id="v-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E1746" />
            <stop offset="50%" stopColor="#3A0F34" />
            <stop offset="100%" stopColor="#240720" />
          </linearGradient>
          <linearGradient id="v-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE48A" />
            <stop offset="45%" stopColor="#EAAA00" />
            <stop offset="100%" stopColor="#B87D00" />
          </linearGradient>
          <linearGradient id="v-plat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D5C7E6" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#v-bg)" stroke="#EAAA00" strokeWidth="1.5" strokeOpacity="0.55" />
        <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.18" />
        <path d="M22 17 H16 C13.8 17 12 18.8 12 21 V43 C12 45.2 13.8 47 16 47 H22" stroke="url(#v-plat)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 17 H48 C50.2 17 52 18.8 52 21 V43 C52 45.2 50.2 47 48 47 H42" stroke="url(#v-plat)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="21" r="1.5" fill="url(#v-gold)" />
        <circle cx="48" cy="21" r="1.5" fill="url(#v-gold)" />
        <circle cx="16" cy="43" r="1.5" fill="url(#v-gold)" />
        <circle cx="48" cy="43" r="1.5" fill="url(#v-gold)" />
        <path d="M15 32 H19" stroke="#EAAA00" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M45 32 H49" stroke="#EAAA00" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        <circle cx="25" cy="32" r="7.5" stroke="url(#v-gold)" strokeWidth="3.5" />
        <circle cx="25" cy="32" r="2.8" fill="url(#v-gold)" />
        <path d="M32.5 32 H48" stroke="url(#v-gold)" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M40 32 V38.5" stroke="url(#v-gold)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M46 32 V39.5" stroke="url(#v-gold)" strokeWidth="3.2" strokeLinecap="round" />
      </svg>`;

  chromeContent = chromeContent.replace(/<svg viewBox="0 0 64 64" width="30" height="30" fill="none">[\s\S]*?<\/svg>/, newLogoSvg);
  fs.writeFileSync(chromePath, chromeContent);
  console.log('Updated Chrome.jsx Logo component');

  console.log('CONCEPT 1 APPLIED ACROSS ALL ASSETS SUCCESSFULLY!');
}

deploy().catch(console.error);

