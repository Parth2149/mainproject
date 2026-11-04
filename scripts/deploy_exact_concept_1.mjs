import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_IMAGE = 'C:\\Users\\parth\\.gemini\\antigravity\\brain\\d171bd32-f210-46b5-abc8-bfe991eb9f8c\\revkit_concept1_golden_key_vault_1793814181290.jpg';

async function main() {
  console.log('Processing exact Concept 1 image:', SOURCE_IMAGE);
  
  if (!fs.existsSync(SOURCE_IMAGE)) {
    throw new Error('Source image not found: ' + SOURCE_IMAGE);
  }

  // 1. Create masked squircle version with subtle luxury gold border
  const maskSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="1024" height="1024" rx="240" fill="#ffffff" />
  </svg>`;

  const borderSvg = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="16" y="16" width="992" height="992" rx="224" stroke="#EAAA00" stroke-width="24" stroke-opacity="0.6" />
    <rect x="36" y="36" width="952" height="952" rx="204" stroke="#ffffff" stroke-width="8" stroke-opacity="0.2" />
  </svg>`;

  const borderBuf = Buffer.from(borderSvg);

  // High-res masked PNG
  const masked1024 = await sharp(SOURCE_IMAGE)
    .resize(1024, 1024)
    .composite([
      { input: Buffer.from(maskSvg), blend: 'dest-in' },
      { input: borderBuf, blend: 'over' }
    ])
    .png()
    .toBuffer();

  // Save master logo asset
  fs.writeFileSync('public/assets/logo.png', await sharp(masked1024).resize(256, 256).png().toBuffer());
  fs.writeFileSync('public/assets/logo-raw.jpg', fs.readFileSync(SOURCE_IMAGE));
  console.log('Saved public/assets/logo.png (256x256)');

  // 2. Generate all icon resolutions
  const sizes = [
    { path: 'public/icon-512.png', size: 512 },
    { path: 'public/icon-192.png', size: 192 },
    { path: 'public/icon-96.png', size: 96 },
    { path: 'public/icon-48.png', size: 48 },
    { path: 'public/apple-touch-icon.png', size: 180 },
    { path: 'public/assets/favicon-32x32.png', size: 32 },
    { path: 'public/assets/favicon-48x48.png', size: 48 },
    { path: 'public/assets/icon-192.png', size: 192 },
    { path: 'public/assets/apple-touch-icon.png', size: 180 },
  ];

  for (const s of sizes) {
    const buf = await sharp(masked1024).resize(s.size, s.size).png().toBuffer();
    fs.writeFileSync(s.path, buf);
    console.log(`Generated ${s.path} (${s.size}x${s.size})`);
  }

  // 3. Multi-resolution ICO (16, 32, 48)
  const p16 = await sharp(masked1024).resize(16, 16).png().toBuffer();
  const p32 = await sharp(masked1024).resize(32, 32).png().toBuffer();
  const p48 = await sharp(masked1024).resize(48, 48).png().toBuffer();

  const numImages = 3;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(numImages, 4);

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
  console.log('Generated public/favicon.ico');

  // 4. Create embedded SVG favicon using base64 data URI
  const base64Png = (await sharp(masked1024).resize(128, 128).png().toBuffer()).toString('base64');
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,${base64Png}" width="128" height="128" />
</svg>`;
  fs.writeFileSync('public/favicon.svg', faviconSvg);
  fs.writeFileSync('public/assets/favicon.svg', faviconSvg);
  console.log('Generated public/favicon.svg (embedded)');

  // 5. Update Chrome.jsx Logo component
  const chromePath = 'src/components/Chrome.jsx';
  let chromeContent = fs.readFileSync(chromePath, 'utf8');

  // Replace Logo function with clean image tag rendering
  const newLogoComponent = `export function Logo() {
  return <>
    <img src={href('/assets/logo.png')} alt="" width="32" height="32" className="brand-logo-img" />
    <span>Rev<span className="brand-kit">Kit</span><span className="brand-domain">.online</span></span>
  </>;
}`;

  chromeContent = chromeContent.replace(/export function Logo\(\) \{[\s\S]*?\n\}/, newLogoComponent);
  fs.writeFileSync(chromePath, chromeContent);
  console.log('Updated src/components/Chrome.jsx Logo component');

  console.log('ALL ASSETS UPDATED TO EXACT CONCEPT 1 IMAGE!');
}

main().catch(console.error);
