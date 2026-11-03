import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const seed = JSON.parse(fs.readFileSync('revkit-seed-data.json', 'utf-8'));
const outDir = 'public/assets/tools';
const existing = new Set(fs.readdirSync(outDir));

function createIcon(name, category) {
  const width = 128;
  const height = 128;
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  // Derive distinct palette based on category or hash
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffffff;

  // Curated theme colors
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
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Check rounded corner distance
      const dx = Math.min(x, width - 1 - x);
      const dy = Math.min(y, height - 1 - y);

      let isInside = true;
      if (dx < radius && dy < radius) {
        const cornerDist = Math.hypot(radius - dx, radius - dy);
        if (cornerDist > radius) isInside = false;
      }

      if (!isInside) {
        // Transparent
        rawData[pxOffset] = 0;
        rawData[pxOffset + 1] = 0;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 0;
        continue;
      }

      // Border check (outer 3px border)
      const isBorder = (x < 3 || x >= width - 3 || y < 3 || y >= height - 3);

      // Inner badge shape: center diamond or circle
      const cx = width / 2;
      const cy = height / 2;
      const distFromCenter = Math.hypot(x - cx, y - cy);

      // Inner icon glyph
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
        // Subtle vertical gradient
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
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
    }
    return (crc ^ (-1)) >>> 0;
  }

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  return Buffer.concat([sig, makeChunk('IHDR', ihdr), makeChunk('IDAT', deflated), makeChunk('IEND', Buffer.alloc(0))]);
}

let generatedCount = 0;
for (const tool of seed.tools) {
  const slug = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const fileName = slug + '.png';
  if (!existing.has(fileName)) {
    const pngBuf = createIcon(tool.name, tool.category);
    fs.writeFileSync(path.join(outDir, fileName), pngBuf);
    existing.add(fileName);
    generatedCount++;
  }
}

console.log('Successfully generated missing icons:', generatedCount);

