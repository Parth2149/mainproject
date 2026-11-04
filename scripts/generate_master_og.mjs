import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SOURCE_IMAGE = 'C:\\Users\\parth\\.gemini\\antigravity\\brain\\d171bd32-f210-46b5-abc8-bfe991eb9f8c\\revkit_concept1_golden_key_vault_1793814181290.jpg';

async function generateOg() {
  console.log('Generating 1200x630 OpenGraph card with Concept 1 logo...');

  // 1. Process logo into 440x440 squircle with gold border
  const maskSvg = `<svg width="440" height="440" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="440" height="440" rx="100" fill="#ffffff" />
  </svg>`;

  const borderSvg = `<svg width="440" height="440" viewBox="0 0 440 440" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="424" height="424" rx="92" stroke="#EAAA00" stroke-width="12" stroke-opacity="0.65" />
    <rect x="18" y="18" width="404" height="404" rx="82" stroke="#ffffff" stroke-width="4" stroke-opacity="0.25" />
  </svg>`;

  const logo440 = await sharp(SOURCE_IMAGE)
    .resize(440, 440)
    .composite([
      { input: Buffer.from(maskSvg), blend: 'dest-in' },
      { input: Buffer.from(borderSvg), blend: 'over' }
    ])
    .png()
    .toBuffer();

  // 2. SVG overlay for typography & graphics (1200x630)
  const overlaySvg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Ambient Background Glows -->
    <rect width="1200" height="630" fill="#240720" />
    <circle cx="280" cy="315" r="300" fill="#4E1746" opacity="0.6" />
    <circle cx="900" cy="200" r="250" fill="#3A0F34" opacity="0.5" />
    <circle cx="1000" cy="500" r="200" fill="#EAAA00" opacity="0.08" />

    <!-- Outer Card Border -->
    <rect x="16" y="16" width="1168" height="598" rx="24" stroke="#EAAA00" stroke-width="2" stroke-opacity="0.3" />

    <!-- Right Side Typography -->
    <!-- Brand Kicker -->
    <text x="560" y="160" fill="#EAAA00" font-family="Inter, -apple-system, sans-serif" font-size="20" font-weight="800" letter-spacing="3">REVKIT.ONLINE</text>

    <!-- Headline -->
    <text x="560" y="240" fill="#FFFFFF" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">Your Next Discovery</text>
    <text x="560" y="305" fill="#EAAA00" font-family="Inter, -apple-system, sans-serif" font-size="52" font-weight="900" letter-spacing="-1.5">Starts With Open Source.</text>

    <!-- Subtitle / Tagline -->
    <text x="560" y="380" fill="#DDD3EB" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="500">746+ Curated Software Replacements, Decompilers,</text>
    <text x="560" y="415" fill="#DDD3EB" font-family="Inter, -apple-system, sans-serif" font-size="22" font-weight="500">&amp; Reverse Engineering Frameworks in 2026.</text>

    <!-- Feature Pill Tags -->
    <!-- Tag 1 -->
    <rect x="560" y="465" width="160" height="42" rx="21" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.5" />
    <text x="640" y="492" text-anchor="middle" fill="#EAAA00" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="700">100% Free &amp; OSS</text>

    <!-- Tag 2 -->
    <rect x="735" y="465" width="170" height="42" rx="21" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.5" />
    <text x="820" y="492" text-anchor="middle" fill="#EAAA00" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="700">Zero Subscriptions</text>

    <!-- Tag 3 -->
    <rect x="920" y="465" width="180" height="42" rx="21" fill="#3A0F34" stroke="#EAAA00" stroke-width="1.5" stroke-opacity="0.5" />
    <text x="1010" y="492" text-anchor="middle" fill="#EAAA00" font-family="Inter, -apple-system, sans-serif" font-size="15" font-weight="700">Verified GitHub Repos</text>
  </svg>`;

  const finalOg = await sharp(Buffer.from(overlaySvg))
    .composite([
      { input: logo440, left: 65, top: 95 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync('public/assets/og.png', finalOg);
  if (fs.existsSync('dist/assets')) {
    fs.writeFileSync('dist/assets/og.png', finalOg);
  }
  console.log('Successfully generated public/assets/og.png (1200x630)');
}

generateOg().catch(console.error);

