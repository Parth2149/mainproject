import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
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

  <!-- Container Badge with Precision Gold Inset Border -->
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#rk-bg)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.5" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.18" />

  <!-- The Master Monogram Mark -->
  <g filter="url(#rk-shadow)">
    <!-- Vertical Pillar of Integrity -->
    <rect x="16" y="16" width="7" height="32" rx="3.5" fill="url(#rk-stem)" />

    <!-- Continuous Reversible Loop -->
    <path d="M22 16 H35 C41.6 16 46 20.4 46 26 C46 31.6 41.6 36 35 36 H22" fill="none" stroke="url(#rk-stem)" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- The Sovereign Gold Reverse Key Kick -->
    <path d="M30 33.5 L43.5 47" stroke="url(#rk-gold)" stroke-width="6.5" stroke-linecap="round" />

    <!-- The Reverse Engineering Insight Eye -->
    <circle cx="32" cy="26" r="3.2" fill="url(#rk-gold)" />
    <circle cx="32" cy="26" r="1.3" fill="#3A0F34" />
  </g>
</svg>`;

async function main() {
  console.log('Rendering Master Identity Mark across all platforms...');

  // 1. Write SVGs
  fs.writeFileSync('public/favicon.svg', masterSvg);
  if (fs.existsSync('public/assets')) {
    fs.writeFileSync('public/assets/favicon.svg', masterSvg);
  }

  // 2. Generate PNGs at required sizes
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
    const buf = await sharp(Buffer.from(masterSvg)).resize(s.size, s.size).png().toBuffer();
    fs.writeFileSync(s.name, buf);
    console.log(`Generated ${s.name} (${s.size}x${s.size})`);
  }

  // 3. Generate Multi-Size ICO File (16x16, 32x32, 48x48)
  const p16 = await sharp(Buffer.from(masterSvg)).resize(16, 16).png().toBuffer();
  const p32 = await sharp(Buffer.from(masterSvg)).resize(32, 32).png().toBuffer();
  const p48 = await sharp(Buffer.from(masterSvg)).resize(48, 48).png().toBuffer();

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
    entry.writeUInt8(dims[i], 0); // width
    entry.writeUInt8(dims[i], 1); // height
    entry.writeUInt8(0, 2); // colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buffers[i].length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset
    entries.push(entry);
    currentOffset += buffers[i].length;
  }

  const ico = Buffer.concat([header, ...entries, ...buffers]);
  fs.writeFileSync('public/favicon.ico', ico);
  if (fs.existsSync('public/assets')) {
    fs.writeFileSync('public/assets/favicon.ico', ico);
  }
  console.log('Generated multi-resolution favicon.ico (16, 32, 48px)');

  console.log('MASTER BRAND IDENTITY DEPLOYED SUCCESSFULLY!');
}

main().catch(console.error);

