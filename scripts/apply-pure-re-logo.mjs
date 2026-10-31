import fs from 'node:fs';
import sharp from 'sharp';

const pureSvg = fs.readFileSync('public/assets/logos/pure-reverse-engineering.svg', 'utf8');

fs.writeFileSync('public/assets/favicon.svg', pureSvg);
fs.writeFileSync('public/favicon.svg', pureSvg);

const png32 = await sharp(Buffer.from(pureSvg)).resize(32, 32).png().toBuffer();
const png48 = await sharp(Buffer.from(pureSvg)).resize(48, 48).png().toBuffer();
const png180 = await sharp(Buffer.from(pureSvg)).resize(180, 180).png().toBuffer();
const png192 = await sharp(Buffer.from(pureSvg)).resize(192, 192).png().toBuffer();

fs.writeFileSync('public/assets/favicon-32x32.png', png32);
fs.writeFileSync('public/assets/favicon-48x48.png', png48);
fs.writeFileSync('public/assets/apple-touch-icon.png', png180);
fs.writeFileSync('public/assets/icon-192.png', png192);

// Generate ICO
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(2, 4);

const offset0 = 38;
const offset1 = offset0 + png32.length;

const entry0 = Buffer.alloc(16);
entry0.writeUInt8(32, 0);
entry0.writeUInt8(32, 1);
entry0.writeUInt8(0, 2);
entry0.writeUInt8(0, 3);
entry0.writeUInt16LE(1, 4);
entry0.writeUInt16LE(32, 6);
entry0.writeUInt32LE(png32.length, 8);
entry0.writeUInt32LE(offset0, 12);

const entry1 = Buffer.alloc(16);
entry1.writeUInt8(48, 0);
entry1.writeUInt8(48, 1);
entry1.writeUInt8(0, 2);
entry1.writeUInt8(0, 3);
entry1.writeUInt16LE(1, 4);
entry1.writeUInt16LE(32, 6);
entry1.writeUInt32LE(png48.length, 8);
entry1.writeUInt32LE(offset1, 12);

const ico = Buffer.concat([header, entry0, entry1, png32, png48]);
fs.writeFileSync('public/favicon.ico', ico);
fs.writeFileSync('public/assets/favicon.ico', ico);

console.log('SUCCESS: Applied Pure Reverse Engineering mark to all site icons!');
