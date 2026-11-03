import fs from 'node:fs';

const seedPath = 'revkit-seed-data.json';
const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

const topFlagships = [
  // 1-10: The most famous, trusted, and prestigious tools in the world
  'Ghidra',
  'Wireshark',
  'Blender',
  'GIMP',
  'x64dbg',
  'Bitwarden',
  'Frida',
  '7-Zip',
  'Ollama',
  'LibreOffice',

  // 11-20: Major Creative, Video, Audio & RE standards
  'Audacity',
  'Inkscape',
  'JADX',
  'Kdenlive',
  'DaVinci Resolve',
  'Burp Suite',
  'OWASP ZAP',
  'IDA Free',
  'Radare2',
  'Cutter',

  // 21-30: Top Developer & Alternative Platforms
  'Penpot',
  'Hoppscotch',
  'Bruno',
  'RustDesk',
  'Tailscale',
  'WireGuard',
  'Obsidian',
  'AppFlowy',
  'Immich',
  'Nextcloud Hub',

  // 31-40: High-trust dev & reversing utilities
  'dnSpyEx',
  'ILSpy',
  'Apktool',
  'Binary Ninja',
  'Krita',
  'Photopea',
  'BleachBit',
  'Ventoy',
  'n8n',
  'Metabase',

  // 41-50: Popular security & productivity tools
  'Uptime Kuma',
  'Cap',
  'Cal.com',
  'Chatwoot',
  'OpenProject',
  'Cheat Engine',
  'Process Hacker',
  'Procmon',
  'PE-bear',
  'Angr',

  // 51-60: More top-tier community favorites
  'Detect It Easy (DiE)',
  'Bytecode Viewer',
  'Mitmproxy',
  'Charles Proxy',
  'De4dot',
  'Dex2jar',
  'Fiddler',
  'Binwalk',
  'GDB',
  'Pwndbg',

  // 61-70: Next wave of popular tools
  'GEF',
  'OnlyOffice',
  'Shotcut',
  'LMMS',
  'Darktable',
  'RawTherapee',
  'PDF24 Creator',
  'Stirling-PDF',
  'Excalidraw',
  'tldraw',

  // 71-80: Security & Automation favorites
  'LanguageTool',
  'Documenso',
  'Mattermost',
  'Zulip',
  'Jitsi Meet',
  'Revolt.chat',
  'Syncthing',
  'Umami',
  'Plausible Analytics',
  'KeePassXC',

  // 81-90
  'Vaultwarden',
  'Portmaster',
  'Wazuh',
  'OpenVAS',
  'Aegis Authenticator',
  'PeaZip',
  'ComfyUI',
  'Stable Diffusion WebUI',
  'Open WebUI',
  'Apache Superset'
];

// Map each tool to its rank priority
const rankMap = new Map();
topFlagships.forEach((name, index) => {
  rankMap.set(name.toLowerCase(), index);
});

// Sort tools: flagships first according to topFlagships order, then keep existing order for the rest
// Keep 'Comparisons' entries handled properly
const nonComparisons = seed.tools.filter(t => t.category !== 'Comparisons');
const comparisons = seed.tools.filter(t => t.category === 'Comparisons');

nonComparisons.sort((a, b) => {
  const rankA = rankMap.has(a.name.toLowerCase()) ? rankMap.get(a.name.toLowerCase()) : 9999;
  const rankB = rankMap.has(b.name.toLowerCase()) ? rankMap.get(b.name.toLowerCase()) : 9999;
  if (rankA !== rankB) return rankA - rankB;
  return 0; // preserve relative order for the rest
});

seed.tools = [...nonComparisons, ...comparisons];

fs.writeFileSync(seedPath, JSON.stringify(seed, null, 2), 'utf-8');

console.log('Reordered tools successfully! Top 12 tools on homepage will be:');
nonComparisons.slice(0, 12).forEach((t, i) => {
  console.log(`${i + 1}. ${t.name} (${t.category}) -> replaces: ${t.replaces}`);
});
