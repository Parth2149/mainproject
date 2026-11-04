import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_IMAGE = 'C:\\Users\\parth\\.gemini\\antigravity\\brain\\d171bd32-f210-46b5-abc8-bfe991eb9f8c\\revkit_concept1_golden_key_vault_1793814181290.jpg';

async function main() {
  console.log('--- DEPLOYING CROPPED CONCEPT 1 LOGO ---');
  console.log('Source image path:', SOURCE_IMAGE);

  if (!fs.existsSync(SOURCE_IMAGE)) {
    throw new Error('Source image not found: ' + SOURCE_IMAGE);
  }

  const rawBytes = fs.readFileSync(SOURCE_IMAGE);
  console.log('Source file size:', rawBytes.length, 'bytes');

  // Verify metadata
  const meta = await sharp(SOURCE_IMAGE).metadata();
  console.log(`Original dimensions: ${meta.width}x${meta.height}`);

  // Save exact uncompressed raw image to public/assets/logo-raw.jpg
  fs.writeFileSync('public/assets/logo-raw.jpg', rawBytes);
  console.log('Saved exact raw image to public/assets/logo-raw.jpg');

  // For the app icon & header logo, create a clean squircle mask with safe padding so no artwork is clipped
  // The emblem is 592x592. Let's create a 512x512 base with gentle squircle rounding (rx=80 on 512x512, which is ~15%)
  // This preserves the full rectangular artwork while providing sleek luxury rounded corners for web/mobile UI.
  const squircleMaskSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="80" fill="#ffffff" />
  </svg>`;

  const squircleBorderSvg = `<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="508" height="508" rx="78" stroke="#EAAA00" stroke-width="4" stroke-opacity="0.5" />
    <rect x="6" y="6" width="500" height="500" rx="74" stroke="#ffffff" stroke-width="2" stroke-opacity="0.15" />
  </svg>`;

  // 1. Master 512x512 icon
  const masterIcon512 = await sharp(SOURCE_IMAGE)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .composite([
      { input: Buffer.from(squircleMaskSvg), blend: 'dest-in' },
      { input: Buffer.from(squircleBorderSvg), blend: 'over' }
    ])
    .png()
    .toBuffer();

  // Also create a full-bleed square version for platforms that apply their own mask (like Android / Google Search)
  const fullBleed512 = await sharp(SOURCE_IMAGE)
    .resize(512, 512, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  // Save 512 icons
  fs.writeFileSync('public/icon-512.png', masterIcon512);
  console.log('Saved public/icon-512.png');

  // 2. Navigation bar logo (256x256)
  const logo256 = await sharp(masterIcon512).resize(256, 256).png().toBuffer();
  fs.writeFileSync('public/assets/logo.png', logo256);
  console.log('Saved public/assets/logo.png');

  // 3. Google Search and PWA icon sizes
  const sizes = [
    { file: 'public/icon-192.png', size: 192 },
    { file: 'public/icon-96.png', size: 96 },
    { file: 'public/icon-48.png', size: 48 },
    { file: 'public/apple-touch-icon.png', size: 180 },
    { file: 'public/assets/icon-192.png', size: 192 },
    { file: 'public/assets/apple-touch-icon.png', size: 180 },
    { file: 'public/assets/favicon-48x48.png', size: 48 },
    { file: 'public/assets/favicon-32x32.png', size: 32 },
  ];

  for (const item of sizes) {
    const buf = await sharp(masterIcon512).resize(item.size, item.size).png().toBuffer();
    fs.writeFileSync(item.file, buf);
    console.log(`Saved ${item.file} (${item.size}x${item.size})`);
  }

  // 4. Multi-resolution favicon.ico (16x16, 32x32, 48x48)
  const p16 = await sharp(masterIcon512).resize(16, 16).png().toBuffer();
  const p32 = await sharp(masterIcon512).resize(32, 32).png().toBuffer();
  const p48 = await sharp(masterIcon512).resize(48, 48).png().toBuffer();

  const numImages = 3;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(numImages, 4);

  let currentOffset = 6 + (16 * numImages);
  const entries = [];
  const buffers = [p16, p32, p48];
  const dims = [16, 32, 48];

  for (let i = 0; i < numImages; i++) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(dims[i], 0); // width
    entry.writeUInt8(dims[i], 1); // height
    entry.writeUInt8(0, 2);       // color palette
    entry.writeUInt8(0, 3);       // reserved
    entry.writeUInt16LE(1, 4);    // color planes
    entry.writeUInt16LE(32, 6);   // bpp
    entry.writeUInt32LE(buffers[i].length, 8); // size
    entry.writeUInt32LE(currentOffset, 12);    // offset
    entries.push(entry);
    currentOffset += buffers[i].length;
  }

  const ico = Buffer.concat([header, ...entries, ...buffers]);
  fs.writeFileSync('public/favicon.ico', ico);
  fs.writeFileSync('public/assets/favicon.ico', ico);
  console.log('Saved public/favicon.ico and public/assets/favicon.ico');

  // 5. Clean vector SVG favicon matching Concept 1 (ultra-lightweight ~2KB for instant browser tab rendering)
  const vectorFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <defs>
    <linearGradient id="vault-bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4E1746" />
      <stop offset="50%" stop-color="#3A0F34" />
      <stop offset="100%" stop-color="#240720" />
    </linearGradient>
    <linearGradient id="gold-core" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE48A" />
      <stop offset="45%" stop-color="#EAAA00" />
      <stop offset="100%" stop-color="#B87D00" />
    </linearGradient>
    <linearGradient id="plat-beam" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#D5C7E6" />
    </linearGradient>
    <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000000" flood-opacity="0.4" />
    </filter>
  </defs>
  <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#vault-bg)" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.55" />
  <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" stroke-width="0.75" stroke-opacity="0.18" />
  <g filter="url(#core-glow)">
    <path d="M22 17 H16 C13.8 17 12 18.8 12 21 V43 C12 45.2 13.8 47 16 47 H22" stroke="url(#plat-beam)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M42 17 H48 C50.2 17 52 18.8 52 21 V43 C52 45.2 50.2 47 48 47 H42" stroke="url(#plat-beam)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <circle cx="16" cy="21" r="1.5" fill="url(#gold-core)" />
    <circle cx="48" cy="21" r="1.5" fill="url(#gold-core)" />
    <circle cx="16" cy="43" r="1.5" fill="url(#gold-core)" />
    <circle cx="48" cy="43" r="1.5" fill="url(#gold-core)" />
    <path d="M15 32 H19" stroke="#EAAA00" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7" />
    <path d="M45 32 H49" stroke="#EAAA00" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7" />
    <circle cx="25" cy="32" r="7.5" stroke="url(#gold-core)" stroke-width="3.5" />
    <circle cx="25" cy="32" r="2.8" fill="url(#gold-core)" />
    <path d="M32.5 32 H48" stroke="url(#gold-core)" stroke-width="4.2" stroke-linecap="round" />
    <path d="M40 32 V38.5" stroke="url(#gold-core)" stroke-width="3.2" stroke-linecap="round" />
    <path d="M46 32 V39.5" stroke="url(#gold-core)" stroke-width="3.2" stroke-linecap="round" />
  </g>
</svg>`;
  fs.writeFileSync('public/favicon.svg', vectorFaviconSvg);
  fs.writeFileSync('public/assets/favicon.svg', vectorFaviconSvg);
  console.log('Saved public/favicon.svg and public/assets/favicon.svg (vector ~2KB)');

  // 6. Generate Master OpenGraph Image (1200x630) using the exact Concept 1 emblem
  const ogEmblem = await sharp(SOURCE_IMAGE)
    .resize(380, 380, { fit: 'cover' })
    .composite([
      {
        input: Buffer.from(`<svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="380" height="380" rx="60" fill="#ffffff" />
        </svg>`),
        blend: 'dest-in'
      },
      {
        input: Buffer.from(`<svg width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="376" height="376" rx="58" stroke="#EAAA00" stroke-width="4" stroke-opacity="0.6" />
        </svg>`),
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  const ogSvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#280824" />
        <stop offset="50%" stop-color="#3A0F34" />
        <stop offset="100%" stop-color="#190417" />
      </linearGradient>
      <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFE082" />
        <stop offset="50%" stop-color="#EAAA00" />
        <stop offset="100%" stop-color="#FFD54F" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#EAAA00" stroke-width="0.75" stroke-opacity="0.08" />
      </pattern>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bg)" />
    <rect width="1200" height="630" fill="url(#grid)" />

    <!-- Subtle Golden Ambient Glow -->
    <circle cx="260" cy="315" r="280" fill="#EAAA00" fill-opacity="0.12" filter="blur(60px)" />
    <circle cx="1000" cy="180" r="200" fill="#3A0F34" fill-opacity="0.3" filter="blur(80px)" />

    <!-- Brand Pill Tag -->
    <g transform="translate(540, 140)">
      <rect width="360" height="38" rx="19" fill="#EAAA00" fill-opacity="0.15" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.5" />
      <text x="180" y="24" fill="#FFE082" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="1.5" text-anchor="middle">OPEN-SOURCE DIRECTORY &amp; RE</text>
    </g>

    <!-- Main Title -->
    <text x="540" y="245" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="64" font-weight="900" letter-spacing="-1">
      Rev<tspan fill="url(#gold)">Kit</tspan><tspan fill="#DDD3EB" font-size="44" font-weight="600">.online</tspan>
    </text>

    <!-- Subtitle -->
    <text x="540" y="315" fill="#DDD3EB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="26" font-weight="500">
      The Verified Open-Source Alternative
    </text>
    <text x="540" y="355" fill="#DDD3EB" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="26" font-weight="500">
      &amp; Reverse Engineering Platform
    </text>

    <!-- Metrics Badges -->
    <g transform="translate(540, 420)">
      <!-- Badge 1: 740+ Tools -->
      <g>
        <rect width="160" height="52" rx="12" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
        <text x="80" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle">740+ Tools</text>
        <text x="80" y="42" fill="#EAAA00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">CURATED &amp; TESTED</text>
      </g>
      <!-- Badge 2: 100% Free -->
      <g transform="translate(175, 0)">
        <rect width="160" height="52" rx="12" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
        <text x="80" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle">100% Free</text>
        <text x="80" y="42" fill="#EAAA00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">ZERO SUBSCRIPTIONS</text>
      </g>
      <!-- Badge 3: Privacy First -->
      <g transform="translate(350, 0)">
        <rect width="160" height="52" rx="12" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.4" />
        <text x="80" y="26" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" text-anchor="middle">Local-First</text>
        <text x="80" y="42" fill="#EAAA00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle">PRIVATE &amp; OFFLINE</text>
      </g>
    </g>

    <!-- Footer URL -->
    <text x="540" y="530" fill="#EAAA00" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="700" letter-spacing="1">
      https://revkit.online
    </text>
  </svg>`;

  const ogComposite = await sharp(Buffer.from(ogSvg))
    .composite([
      { input: ogEmblem, left: 100, top: 125 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync('public/assets/og.png', ogComposite);
  console.log('Saved public/assets/og.png (1200x630)');

  console.log('--- ALL BRAND LOGO & FAVICON ASSETS SUCCESSFULLY DEPLOYED! ---');
}

main().catch(err => {
  console.error('Fatal error deploying logo:', err);
  process.exit(1);
});
