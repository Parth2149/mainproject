import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const slugify = value => value === '.NET' ? 'dotnet' : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Backup original seed data
const seedPath = 'revkit-seed-data.json';
const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
fs.writeFileSync('revkit-seed-data.backup.json', JSON.stringify(seed, null, 2), 'utf-8');
console.log(`Backed up original seed data (${seed.tools.length} tools).`);

const newTools = JSON.parse(fs.readFileSync('scripts/top_500_trusted_tools.json', 'utf-8'));

function normalizePlatforms(plats) {
  const set = new Set();
  for (const p of plats) {
    const pl = p.toLowerCase();
    if (pl === 'win' || pl === 'windows') set.add('Windows');
    else if (pl === 'mac' || pl === 'macos') set.add('macOS');
    else if (pl === 'linux' || pl === 'debian' || pl === 'ubuntu' || pl === 'arch') set.add('Linux');
    else if (pl === 'android') set.add('Android');
    else if (pl === 'ios') set.add('iOS');
    else if (pl === 'freebsd' || pl === 'bsd') set.add('FreeBSD');
    else {
      set.add('Windows');
      set.add('Linux');
      set.add('macOS');
    }
  }
  if (set.size === 0) {
    set.add('Windows');
    set.add('Linux');
    set.add('macOS');
  }
  return Array.from(set);
}

const existingSlugs = new Set(seed.tools.map(t => slugify(t.name)));
const existingNames = new Set(seed.tools.map(t => t.name.toLowerCase().trim()));

const formattedNewTools = [];

for (const t of newTools) {
  let s = slugify(t.name);
  if (existingSlugs.has(s)) {
    let counter = 2;
    while (existingSlugs.has(`${s}-${counter}`)) counter++;
    s = `${s}-${counter}`;
  }
  existingSlugs.add(s);

  let gh = t.github.trim().replace(/\/$/, '');
  const parts = gh.replace('https://github.com/', '').split('/');
  if (parts.length > 2) {
    gh = `https://github.com/${parts[0]}/${parts[1]}`;
  }

  let url = t.website?.trim() || gh;
  if (!url.startsWith('https://')) {
    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://');
    } else {
      url = `https://${url}`;
    }
  }

  const platforms = normalizePlatforms(t.platforms);

  formattedNewTools.push({
    name: t.name,
    category: t.category || "Software",
    url: url,
    github: gh,
    license: t.license || "MIT",
    pricing: "Free",
    platforms: platforms,
    description: t.description,
    tag: `${t.replaces.split('/')[0].trim()} Replacement`,
    replaces: t.replaces
  });
}

// Append new tools
seed.tools.push(...formattedNewTools);
fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2), 'utf-8');
console.log(`Updated ${seedPath} — Total tools now: ${seed.tools.length}`);

// Generate missing icons
const outDir = 'public/assets/tools';
const existingIcons = new Set(fs.readdirSync(outDir));

function createIcon(name) {
  const width = 128;
  const height = 128;
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffff;

  const palettes = [
    { bg: [58, 15, 52], fg: [234, 170, 0] },     // Royal Purple & Gold
    { bg: [30, 41, 59], fg: [56, 189, 248] },    // Slate & Sky Blue
    { bg: [15, 23, 42], fg: [129, 140, 248] },   // Midnight & Indigo
    { bg: [17, 24, 39], fg: [52, 211, 153] },    // Dark & Emerald
    { bg: [45, 18, 40], fg: [251, 191, 36] },    // Deep Wine & Amber
    { bg: [31, 41, 55], fg: [248, 113, 113] },   // Charcoal & Coral
    { bg: [19, 78, 74], fg: [94, 234, 212] },    // Deep Teal & Mint
    { bg: [49, 46, 129], fg: [199, 210, 254] },  // Deep Indigo & Lavender
  ];

  const theme = palettes[Math.abs(hash) % palettes.length];
  const radius = 24;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0;

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = Math.min(x, width - 1 - x);
      const dy = Math.min(y, height - 1 - y);

      let isInside = true;
      if (dx < radius && dy < radius) {
        const cornerDist = Math.hypot(radius - dx, radius - dy);
        if (cornerDist > radius) isInside = false;
      }

      if (!isInside) {
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      const isBorder = (x < 3 || x >= width - 3 || y < 3 || y >= height - 3);
      const cx = width / 2;
      const cy = height / 2;
      const distFromCenter = Math.hypot(x - cx, y - cy);
      const isGlyph = (distFromCenter < 28 && distFromCenter > 18) || (Math.abs(x - cx) < 4 && Math.abs(y - cy) < 22) || (Math.abs(y - cy) < 4 && Math.abs(x - cx) < 22);

      if (isBorder) {
        rawData[pxOffset] = 201;
        rawData[pxOffset + 1] = 184;
        rawData[pxOffset + 2] = 219;
        rawData[pxOffset + 3] = 255;
      } else if (isGlyph) {
        rawData[pxOffset] = theme.fg[0];
        rawData[pxOffset + 1] = theme.fg[1];
        rawData[pxOffset + 2] = theme.fg[2];
        rawData[pxOffset + 3] = 255;
      } else {
        const grad = Math.floor((y / height) * 20);
        rawData[pxOffset] = Math.max(0, theme.bg[0] - grad);
        rawData[pxOffset + 1] = Math.max(0, theme.bg[1] - grad);
        rawData[pxOffset + 2] = Math.max(0, theme.bg[2] - grad);
        rawData[pxOffset + 3] = 255;
      }
    }
  }

  const deflated = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crc = Buffer.alloc(4);
    const crcVal = crc32(Buffer.concat([typeBuf, data]));
    crc.writeUInt32BE(crcVal, 0);
    return Buffer.concat([len, typeBuf, data, crc]);
  }

  function crc32(buf) {
    let table = crc32.table;
    if (!table) {
      table = crc32.table = new Int32Array(256);
      for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) c = (c & 1) ? (-306674912 ^ (c >>> 1)) : (c >>> 1);
        table[i] = c;
      }
    }
    let c = -1;
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ -1) >>> 0;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // 8 bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', deflated),
    makeChunk('IEND', Buffer.alloc(0))
  ]);
}

let generatedCount = 0;
for (const tool of seed.tools) {
  const s = slugify(tool.name);
  const filename = `${s}.png`;
  if (!existingIcons.has(filename)) {
    const png = createIcon(tool.name);
    fs.writeFileSync(path.join(outDir, filename), png);
    existingIcons.add(filename);
    generatedCount++;
  }
}
console.log(`Generated ${generatedCount} new PNG brand icons in ${outDir}. Total icons: ${existingIcons.size}`);
