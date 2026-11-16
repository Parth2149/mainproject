import seed from '../../revkit-seed-data.json';
import config from '../../site.config.json';

export { seed, config };
export const slug = value => value === '.NET' ? 'dotnet' : value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const href = route => base + route;
export const canonical = route => config.url.replace(/\/$/, '') + href(route);
export const tools = seed.tools.filter(tool => tool.category !== 'Comparisons').map(tool => ({ ...tool, slug: slug(tool.name), categorySlug: slug(tool.category) }));
export const categories = [...new Set(tools.map(tool => tool.category))];
export const platforms = [...new Set(tools.flatMap(tool => tool.platforms))];
export const licenses = [...new Set(tools.map(tool => tool.license))].sort();
export const prices = [...new Set(tools.map(tool => tool.pricing))];

export const categoryTitles = {
  'Disassemblers & Decompilers': 'Best Decompilers & Disassemblers (2026) — Ghidra, IDA Free & Binary Ninja',
  'Debuggers': 'Best Reverse Engineering Debuggers (2026) — x64dbg, GDB & WinDbg',
  'Android': 'Best Android Reverse Engineering Tools (2026) — JADX, APKTool & Frida',
  '.NET': 'Best .NET Decompilers & C# RE Tools (2026) — dnSpyEx & ILSpy',
  'Analysis Utilities': 'Best Binary Analysis Utilities & Unpackers (2026) — 7-Zip, DiE & UPX',
  'Binary Analysis Frameworks': 'Best Binary Analysis Frameworks (2026) — Radare2, Angr & Capstone',
  'Firmware & Embedded': 'Best Firmware Reverse Engineering Tools (2026) — Binwalk & UEFITool',
  'Network': 'Best Network Reverse Engineering Tools (2026) — Wireshark & Burp Suite',
  'Distros & Environments': 'Best Malware Analysis Distros & Sandboxes (2026) — FLARE VM & REMnux',
  'Java': 'Best Java Decompilers & Bytecode Tools (2026) — Bytecode Viewer & CFR',
  'Game RE': 'Best Game Reverse Engineering Tools (2026) — Cheat Engine & Memory Scanners',
  'Software': 'Best Open Source Alternatives to Adobe & Commercial Software (2026)',
  'Audio': 'Best Open Source Audio Editors & Audacity Alternatives (2026)'
};

export const categoryDescriptions = {
  'Disassemblers & Decompilers': 'Top decompilers, disassemblers & online decompilers (Ghidra, IDA Pro free, Binary Ninja, Cutter) for x86, ARM, and binary reverse engineering.',
  'Debuggers': 'Top debuggers & dynamic binary analysis tools: x64dbg, GDB, WinDbg, OllyDbg 64-bit, and Python debuggers for memory inspection and vulnerability research.',
  'Android': 'Top Android APK decompilers, DEX disassemblers, Dalvik bytecode inspection, and dynamic instrumentation tools (JADX, APKTool, Frida Android, MobSF).',
  '.NET': 'Top open-source .NET decompilers, C# assembly editors, and deobfuscation utilities: dnSpyEx, ILSpy, and de4dot for managed binary analysis.',
  'Analysis Utilities': 'Essential binary analysis utilities: 7-Zip file extraction, Detect It Easy (DiE) packer detection, UPX executable unpacking, and PE/ELF inspectors.',
  'Binary Analysis Frameworks': 'Leading binary analysis frameworks for symbolic execution, intermediate representations (IR), disassembly, and automated analysis (Radare2, Angr, Capstone).',
  'Firmware & Embedded': 'Top firmware reverse engineering tools: Binwalk ROM extraction, UEFITool, FirmAE IoT emulation, and embedded hardware analysis utilities.',
  'Network': 'Top network packet sniffers, traffic interceptors, and API reverse engineering tools: Wireshark, Burp Suite Community, and mitmproxy.',
  'Distros & Environments': 'Top dedicated reverse engineering and malware analysis operating systems: FLARE VM, REMnux, Volatility memory forensics, and YARA rule sandboxes.',
  'Java': 'Top Java decompilers and bytecode inspection tools: Bytecode Viewer, CFR, Fernflower, and Procyon for decompiling compiled JAR and class files.',
  'Game RE': 'Top game reverse engineering tools, memory scanners, cheat engine tables, runtime struct inspection, and memory debuggers for research.',
  'Software': 'Top free open-source alternatives to Adobe Photoshop, Illustrator, Premiere, 1Password, and commercial software: Blender, GIMP, Krita, and Bitwarden.',
  'Audio': 'Top free open-source audio editors, digital audio workstations, and Audacity alternatives for multi-track sound recording, editing, and mixing.'
};

export const metaDescription = text => text.length <= 160 ? text : text.slice(0,157).replace(/\s+\S*$/, '') + '…';

export function getTargetBrand(tool) {
  if (tool.tag && tool.tag.endsWith(' Replacement')) {
    return tool.tag.replace(' Replacement', '').trim();
  }
  if (!tool.replaces) return null;
  let brand = tool.replaces.split('/')[0].split('(')[0].trim();
  brand = brand.replace(/ Conversational$/, '').replace(/ \(.*\)$/, '').trim();
  return brand;
}

export const catRoles = {
  'Disassemblers & Decompilers': 'Decompiler & Disassembler',
  'Debuggers': 'Debugger & Dynamic RE',
  'Android': 'Android APK Decompiler',
  '.NET': '.NET Decompiler',
  'Binary Analysis Frameworks': 'Binary Analysis Framework',
  'Analysis Utilities': 'Binary Analysis Utility',
  'Network': 'Packet Sniffer & Network RE',
  'Firmware & Embedded': 'Firmware Analysis & ROM RE',
  'Game RE': 'Memory Scanner & Game RE',
  'Distros & Environments': 'Malware Analysis Lab',
  'Java': 'Java Bytecode Decompiler',
  'Audio': 'Open Source Audio Editor',
  'Software': 'Open Source Software'
};

export const shortRoles = {
  'Disassemblers & Decompilers': 'Decompiler',
  'Debuggers': 'Debugger',
  'Android': 'APK Decompiler',
  '.NET': '.NET Decompiler',
  'Binary Analysis Frameworks': 'Binary Analysis',
  'Analysis Utilities': 'Analysis Utility',
  'Network': 'Packet Sniffer',
  'Firmware & Embedded': 'Firmware RE',
  'Game RE': 'Game RE Tool',
  'Distros & Environments': 'Malware Lab',
  'Java': 'Java Decompiler',
  'Audio': 'Audio Editor',
  'Software': 'Open Source Tool'
};

export const catKeywords = {
  'Disassemblers & Decompilers': 'decompiler & disassembler',
  'Debuggers': 'reverse engineering debugger',
  'Android': 'Android APK decompiler',
  '.NET': '.NET C# decompiler',
  'Binary Analysis Frameworks': 'binary analysis framework',
  'Analysis Utilities': 'binary analysis utility',
  'Network': 'packet sniffer & network RE tool',
  'Firmware & Embedded': 'firmware analysis & ROM RE tool',
  'Game RE': 'memory scanner & game RE tool',
  'Distros & Environments': 'malware analysis environment',
  'Java': 'Java bytecode decompiler',
  'Audio': 'open-source audio editor',
  'Software': 'open-source software replacement'
};

export function platShort(tool) {
  const p = tool.platforms;
  if (p.includes('Windows') && p.includes('macOS') && p.includes('Linux')) return 'Win/Mac/Linux';
  if (p.includes('Windows') && p.includes('Linux')) return 'Win/Linux';
  if (p.includes('Windows') && p.includes('macOS')) return 'Win/Mac';
  if (p.includes('Linux') && p.includes('macOS')) return 'Mac/Linux';
  if (p.includes('Windows')) return 'Windows';
  if (p.includes('Linux')) return 'Linux';
  if (p.includes('macOS')) return 'macOS';
  if (p.includes('Android')) return 'Android';
  return p.slice(0, 2).join('/');
}

export function platStr(tool) {
  if (tool.platforms.includes('Windows') && tool.platforms.includes('macOS') && tool.platforms.includes('Linux')) {
    return 'Windows, Mac & Linux';
  }
  return tool.platforms.join(', ');
}

export function getQuickStartSteps(tool) {
  const brand = getTargetBrand(tool);
  const repoName = tool.github ? new URL(tool.github).pathname.slice(1) : null;
  const platformStr = tool.platforms.length === 3 ? 'Windows, macOS, Linux' : tool.platforms.join(' / ');
  const cat = tool.category;
  const name = tool.name;

  if (cat === 'Disassemblers & Decompilers' || cat === 'Java' || cat === '.NET' || cat === 'Analysis Utilities' || cat === 'Binary Analysis Frameworks') {
    const prereq = (cat === 'Java' || name.toLowerCase().includes('ghidra')) ? 'Java JDK 17+ or 21+' : cat === '.NET' ? '.NET 8/9 Runtime' : 'Standard 64-bit OS';
    return [
      { step: '1', title: 'Download Release Archive', text: repoName ? `Go to the GitHub repository (${repoName}) releases section and download the latest zip/tarball for ${platformStr}.` : `Download the latest verified standalone package from the official project page for ${platformStr}.` },
      { step: '2', title: 'Verify Prerequisites & Extract', text: `Extract the archive into your security lab or workspace directory. Ensure ${prereq} is installed.` },
      { step: '3', title: 'Launch Standalone Binary', text: `Execute the main runner (${name} executable or launch script) with no cloud registration or telemetry.` },
      { step: '4', title: 'Import Target & Decompile', text: `Open or drag-and-drop your target binary, APK, or DLL to start automated analysis, disassembly, and C/C++ decompilation.` }
    ];
  }

  if (cat === 'Debuggers' || cat === 'Android' || cat === 'Game RE') {
    return [
      { step: '1', title: 'Get Verified Build', text: repoName ? `Download the latest binary release from GitHub (${repoName}) or your package manager.` : `Obtain the official installer for ${platformStr}.` },
      { step: '2', title: 'Unpack & Configure Drivers', text: `Extract to your portable tools folder. Ensure debugging permissions and kernel-level drivers (if needed) are active.` },
      { step: '3', title: 'Attach or Launch Process', text: `Open ${name} and either attach to an active process PID or spawn a new target under debugger supervision.` },
      { step: '4', title: 'Set Breakpoints & Inspect Memory', text: `Step through assembly instructions, examine register states, and inspect runtime memory structures with zero limits.` }
    ];
  }

  if (cat === 'Audio' || (tool.description && (tool.description.toLowerCase().includes('speech') || tool.description.toLowerCase().includes('model') || tool.description.toLowerCase().includes('voice') || tool.description.toLowerCase().includes('llm')))) {
    return [
      { step: '1', title: 'Access Repo & Releases', text: repoName ? `Visit the official GitHub repository (${repoName}) to clone the source or download pre-trained checkpoints.` : `Visit the official site to download the pre-compiled installer.` },
      { step: '2', title: 'Environment Setup', text: `Set up an isolated environment (e.g. Python virtualenv or Docker) and install dependencies (pip install -r requirements.txt).` },
      { step: '3', title: 'Start Local Server or UI', text: `Launch the local inference server or web UI. It runs 100% locally on localhost with zero data sent to external servers.` },
      { step: '4', title: 'Synthesize & Replace ' + (brand || 'Proprietary Cloud'), text: `Generate audio, clone voices, or run inference completely offline with zero API fees or character limits.` }
    ];
  }

  if (cat === 'Creative' || cat === 'Productivity' || cat === 'Business & CRM' || (tool.tag && tool.tag.includes('Replacement'))) {
    return [
      { step: '1', title: 'Download Installer / Image', text: repoName ? `Download the native installer for ${platformStr} or pull the self-hosted container from ${repoName}.` : `Download the installer directly from the official website for ${platformStr}.` },
      { step: '2', title: 'Quick Local Installation', text: `Run the setup wizard or launch the portable package. No compulsory cloud account or billing credentials needed.` },
      { step: '3', title: 'Open Local Workspace', text: `Launch ${name} and select your local storage folder. Import your existing projects, templates, or files seamlessly.` },
      { step: '4', title: 'Work with Full Data Sovereignty', text: `Enjoy unrestricted workflow speed, offline file handling, and export your work with zero subscription lock-in.` }
    ];
  }

  return [
    { step: '1', title: 'Obtain Official Package', text: repoName ? `Download the release binary or clone the repository from GitHub (${repoName}).` : `Download the official installer for ${platformStr}.` },
    { step: '2', title: 'Local Installation', text: `Extract the portable files or complete the standard installation on ${platformStr} without telemetry.` },
    { step: '3', title: 'Launch Application', text: `Launch ${name} natively to initialize your offline preferences and local data store.` },
    { step: '4', title: 'Operate with Zero Lock-in', text: `Execute your workflows freely, inspect internal formats, and replace costly proprietary ${brand || 'tools'} effortlessly.` }
  ];
}

export function toolTitle(tool) {
  const brand = getTargetBrand(tool);
  const plat = platShort(tool);
  const role = catRoles[tool.category] || 'RE Tool';
  const shortRole = shortRoles[tool.category] || 'RE Tool';

  const candidates = [];
  if (brand) {
    candidates.push(
      `${tool.name} — Free ${brand} Alternative (${plat})`,
      `${tool.name} — ${brand} Alternative (${plat})`,
      `${tool.name} — Free ${brand} Alternative`,
      `${tool.name} — ${brand} Alternative`,
      `${tool.name} — ${shortRole} (${plat})`,
      `${tool.name} — ${shortRole}`
    );
  } else {
    candidates.push(
      `${tool.name} — ${role} (${plat})`,
      `${tool.name} — ${shortRole} (${plat})`,
      `${tool.name} — ${role}`,
      `${tool.name} — ${shortRole}`
    );
  }

  for (const c of candidates) {
    if (c.length + 9 <= 60) return c;
  }
  return candidates[candidates.length - 1];
}

export function toolPageDescription(tool) {
  const brand = getTargetBrand(tool);
  const plat = platStr(tool);
  const catKw = catKeywords[tool.category] || 'reverse engineering tool';
  const lic = tool.license;

  const candidates = [];
  if (brand) {
    candidates.push(
      `Download ${tool.name}: free open-source ${brand} alternative and ${catKw} for ${plat}. ${lic} licensed with zero subscription fees.`,
      `Download ${tool.name}: the free ${brand} alternative & ${catKw} for ${plat}. Free open-source ${lic} software with zero fees.`,
      `${tool.name} is a free open-source ${brand} alternative & ${catKw} for ${plat}. Verified ${lic} license with zero fees.`,
      `Get ${tool.name}: free open-source ${brand} alternative & ${catKw} on ${plat}. ${lic} licensed with zero subscription fees.`,
      `${tool.name} is a free open-source ${brand} replacement and ${catKw} for ${plat}. ${lic} licensed with full offline privacy.`
    );
  } else {
    candidates.push(
      `Download ${tool.name}: open-source ${catKw} for ${plat}. ${tool.pricing} under ${lic} license for binary analysis and research.`,
      `${tool.name} is an open-source ${catKw} for ${plat}. Published under ${lic} license: ${tool.description}`,
      `Download ${tool.name}, the open-source ${catKw} for ${plat}. Free ${lic} software for reverse engineering and code analysis.`,
      `${tool.name} is an open-source ${catKw} for ${plat}. ${lic} licensed, free to download with full source code on GitHub.`,
      `Explore ${tool.name}: open-source ${catKw} for ${plat}. ${tool.pricing} under ${lic} license with complete privacy and control.`
    );
  }

  for (const c of candidates) {
    if (c.length >= 135 && c.length <= 155) return c;
  }
  for (const c of candidates) {
    if (c.length <= 155) return c;
  }
  let best = candidates[0];
  if (best.length > 155) {
    best = best.slice(0, 154).replace(/\s+\S*$/, '') + '.';
  }
  return best;
}

export const defaultKeywords = 'reverse engineering tools, open source alternatives, free decompiler, github reverse engineering, ai reverse engineering, github alternatives, open source chatgpt alternatives, opencode, open source software directory, ghidra, x64dbg, wireshark, cheat engine, jadx, dnspy, radare2, binwalk, audacity, gimp, blender, static analysis, dynamic analysis';

export function keywordsFor(page) {
  if (page.kind === 'tool' && page.tool) {
    const t = page.tool;
    const brand = getTargetBrand(t);
    const brandKws = brand ? `, ${brand.toLowerCase()} replacement, ${brand.toLowerCase()} alternative, reverse engineering ${brand.toLowerCase()}, free ${brand.toLowerCase()} replacement, open source ${brand.toLowerCase()}` : '';
    const tagKws = t.tag ? `, ${t.tag.toLowerCase()}` : '';
    const mcpKws = `, ${t.name.toLowerCase()} mcp, ai reverse engineering, ${t.name.toLowerCase()} headless, download ${t.name.toLowerCase()}`;
    return `${t.name}, download ${t.name}, ${t.name} github, ${t.name} alternative, ${t.name} reverse engineering, ${t.name} open source, ${t.category.toLowerCase()} tools, ${t.platforms.join(', ').toLowerCase()} reverse engineering, ${t.license}${brandKws}${tagKws}${mcpKws}`;
  }
  if (page.category) {
    const map = {
      'Disassemblers & Decompilers': 'ghidra, ghidra decompiler, download ghidra, github ghidra, decompiler, online decompiler, disassembler, ida pro free, ida pro price, ida pro 9.5, hex-rays decompiler, hopper disassembler, binary ninja decompiler, binary ninja mcp, x86 decompiler, arm decompiler',
      'Debuggers': 'debugger, what is a debugger, python debugger, gdb, online gdb, gdb compiler, x64dbg, x64dbg download, x64dbg tutorial, ollydbg 64 bit, ollydbg 1.10, ollydbg plugins, microsoft windbg, windbg download, windbg preview, windbg mcp, dynamic binary analysis',
      'Android': 'jadx, jadx github, jadx decompiler, jadx gui, jadx-headless-mcp, apk decompiler, android apk decompiler, apk decompiler online, decompile apk, dex decompiler, apktool, apktool android, apktool download, apktool github, frida android, mobsf',
      '.NET': 'dnspy, dnspyex, dnspy download github, how to use dnspy, ilspy, ilspy download, ilspycmd, .net decompiler, c# decompiler, de4dot, dotnet deobfuscator',
      'Java': 'java decompiler, best java decompiler, download java decompiler, class to java decompiler, java decompiler gui, bytecode viewer, dex2jar, cfr decompiler',
      'Network': 'wireshark, wireshark download, wireshark download for windows 11, wireshark filter, wireshark github, tshark, wireshark for android, packet sniffer, network packet sniffer, packet sniffer free, burp suite, portswigger burp suite, burp suite community, burp suite mcp, mitmproxy, mitmproxy android, mitmproxy https, mitmproxy github',
      'Game RE': 'cheat engine, download cheat engine, cheat engine table, cheat table, mod engine, cheat engine pc, game reverse engineering tools, memory scanner, reclassex',
      'Firmware & Embedded': 'firmware analysis, binwalk, binwalk extract, binwalk windows, binwalk command, uefi analysis, iot reverse engineering, uefitool, firmae',
      'Distros & Environments': 'malware analysis, malware analysis sandbox, malware analysis online, dynamic malware analysis, malware analysis training, remnux, volatility memory forensics, yara malware rules, flare vm',
      'Analysis Utilities': '7zip, 7zip download, 7zip for windows 11, 7zip download for windows, winrar free alternative, upx github, upx executable packer, pe elf binary inspection, detect it easy, die, bpftrace, bcc ebpf',
      'Binary Analysis Frameworks': 'radare2, radare2 windows, radare2 cutter, radare2 gui, radare2 tutorial, binary analysis framework, angr binary analysis, symbolic execution, capstone engine, keystone engine',
      'Software': 'adobe alternatives, alternatives to adobe, photoshop alternative, photoshop free, photoshop alternative free, opensource photoshop alternative, illustrator alternative, free illustrator alternative, adobe premiere pro alternative, alternatives to adobe acrobat, blender 3d, gimp download, gimp remove background, bitwarden password manager, bitwarden lite, 1password alternative, davinci resolve free, download davinci resolve, obs studio download, download obs studio for windows 11, how to use obs studio, krita download, krita ai, krita ai diffusion, download inkscape, inkscape free, inkscape trace bitmap, inkscape mac, vlc media player, penpot, libresprite, shortgpt, wan-video, ltx-video',
      'Audio': 'open source audio editor, audacity, audacity download, audacity free, audacity 4.0, free audio editor, digital audio workstation, lmms, ardour'
    };
    return map[page.category] || `${page.category.toLowerCase()} reverse engineering tools, binary analysis, security research`;
  }
  if (page.kind === 'comparison' && page.pair) {
    return `${page.pair[0].name} vs ${page.pair[1].name}, compare ${page.pair[0].name} ${page.pair[1].name}, ${page.pair[0].name} alternatives, ${page.pair[1].name} alternatives, reverse engineering tools comparison, free open source alternatives`;
  }
  return defaultKeywords;
}

export const homepageFaqs = [
  {
    question: 'Best reverse engineering tools & open source alternatives in 2026?',
    answer: 'Ghidra, IDA Free, and Binary Ninja for binary decompilation; x64dbg, GDB, and Frida for dynamic debugging; Wireshark and Burp Suite for network analysis; and open-source creative software like Blender, GIMP, Krita, and Bitwarden.'
  },
  {
    question: 'Are tools on RevKit completely free and open source?',
    answer: 'Yes. The vast majority of software indexed on RevKit is published under verified open-source licenses (GPL, MIT, Apache 2.0) with zero subscription fees, native local execution, and public GitHub repositories.'
  },
  {
    question: 'What is AI reverse engineering and MCP server integration?',
    answer: 'AI reverse engineering combines large language models with tools like Ghidra, JADX, and Radare2 via Model Context Protocol (MCP) servers or headless CLI scripts to automate function renaming, deobfuscation, and vulnerability analysis.'
  }
];

if (new Set(tools.map(tool => tool.slug)).size !== tools.length) throw new Error('Duplicate tool slug');
for (const tool of tools) {
  for (const field of ['name', 'description', 'category', 'license', 'pricing']) {
    if (!tool[field]) throw new Error(`${tool.name}: missing ${field}`);
  }
  if (!tool.platforms?.length) throw new Error(`${tool.name}: no platforms`);
  for (const field of ['url', 'github']) {
    if (tool[field] && new URL(tool[field]).protocol !== 'https:') throw new Error(`${tool.name}: HTTPS required`);
  }
  if (tool.github && !/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(tool.github)) throw new Error(`${tool.name}: invalid repository URL`);
}

export const pairs = config.comparisons.map(pair => pair.map(id => {
  const tool = tools.find(tool => tool.slug === id);
  if (!tool) throw new Error(`Unknown comparison tool: ${id}`);
  return tool;
}));
export const pairRoute = ([a, b]) => `/compare/${a.slug}-vs-${b.slug}/`;

export function alternatives(tool) {
  return tools.filter(item => item.slug !== tool.slug)
    .map(item => ({ tool: item, score: (item.category === tool.category ? 100 : 0) + item.platforms.filter(p => tool.platforms.includes(p)).length * 2 + (item.pricing === tool.pricing ? 1 : 0) }))
    .sort((a, b) => b.score - a.score).slice(0, 3).map(item => item.tool);
}

export const pages = [
  {
    route: '/',
    kind: 'directory',
    title: 'Top Reverse Engineering Tools & Open Source Software (2026)',
    description: 'Explore the curated directory of reverse engineering tools, free decompilers, debuggers, binary analysis suites, and open-source GitHub alternatives in 2026.'
  },
  {
    route: '/categories/',
    kind: 'categories',
    title: 'Reverse Engineering Tools by Category (2026)',
    description: 'Browse curated reverse engineering tools by category: Android, debuggers, decompilers, .NET, firmware, binary analysis frameworks, and game RE.'
  },
  ...categories.map(category => ({
    route: `/category/${slug(category)}/`,
    kind: 'directory',
    category,
    title: categoryTitles[category] || `${category} Reverse Engineering Tools (2026)`,
    description: categoryDescriptions[category] || `Explore top ${category} reverse engineering tools, platforms, open source licenses, and GitHub repositories.`
  })),
  ...tools.map(tool => ({
    route: `/tools/${tool.slug}/`,
    kind: 'tool',
    tool,
    title: toolTitle(tool),
    description: toolPageDescription(tool)
  })),
  {
    route: '/compare/',
    kind: 'comparisons',
    title: 'Compare Reverse Engineering Tools & Software (2026)',
    description: 'Compare reverse engineering software, decompilers, and debuggers by features, platforms, pricing, and licenses to pick the right tool for your workflow.'
  },
  ...pairs.map(pair => ({
    route: pairRoute(pair),
    kind: 'comparison',
    pair,
    title: `${pair[0].name} vs ${pair[1].name} — Tools Comparison`,
    description: metaDescription(`Compare ${pair[0].name} vs ${pair[1].name}: features, reverse engineering capabilities, platform support, pricing, and licenses.`)
  })),
  {
    route: '/submit/',
    kind: 'submit',
    title: 'Submit a Reverse Engineering Project (2026)',
    description: 'Submit an open-source or commercial reverse engineering tool to RevKit. Contribute via JSON and pull request to help the community.'
  },
  {
    route: '/about/',
    kind: 'about',
    title: 'About RevKit — Reverse Engineering Directory',
    description: 'Learn how RevKit curates reverse engineering tools, decompilers, debuggers, binary analysis software, and open-source GitHub repositories.'
  },
];

export function breadcrumbsFor(page) {
  const root = { name: 'Directory', route: '/' };
  if (page.route === '/' || page.kind === '404') return [];
  if (page.tool) return [root, { name: page.tool.category, route: `/category/${page.tool.categorySlug}/` }, { name: page.tool.name, route: page.route }];
  if (page.category) return [root, { name: 'All categories', route: '/categories/' }, { name: page.category, route: page.route }];
  if (page.pair) return [root, { name: 'Compare tools', route: '/compare/' }, { name: `${page.pair[0].name} vs ${page.pair[1].name}`, route: page.route }];
  const labels = { categories: 'All categories', comparisons: 'Compare tools', about: 'About RevKit', submit: 'Submit a tool' };
  return [root, { name: labels[page.kind] || page.title, route: page.route }];
}

export function schemaFor(page) {
  if (page.kind === '404') return null;
  const url = canonical(page.route);
  const websiteId = canonical('/') + '#website';
  const publisherId = canonical('/') + '#organization';
  const graph = [
    {
      '@type': 'Organization',
      '@id': publisherId,
      name: 'RevKit',
      url: canonical('/'),
      logo: {
        '@type': 'ImageObject',
        '@id': canonical('/') + '#logo',
        url: canonical('/icon-512.png'),
        contentUrl: canonical('/icon-512.png'),
        width: 512,
        height: 512,
        caption: 'RevKit Official Logo'
      },
      image: canonical('/icon-512.png')
    },
    { '@type': 'WebSite', '@id': websiteId, name: 'RevKit', url: canonical('/'), description: 'A curated directory of reverse engineering software, decompilers, debuggers, and GitHub repositories.', publisher: { '@id': publisherId }, inLanguage: 'en' },
  ];
  const crumbs = breadcrumbsFor(page);
  const webpage = {
    '@type': page.kind === 'directory' || page.kind === 'categories' || page.kind === 'comparisons' ? 'CollectionPage' : page.kind === 'about' ? 'AboutPage' : 'WebPage',
    '@id': url + '#webpage',
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'en',
    isPartOf: { '@id': websiteId },
    publisher: { '@id': publisherId },
    ...(crumbs.length ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {})
  };
  graph.push(webpage);
  if (crumbs.length) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': url + '#breadcrumb',
      itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i+1, name: crumb.name, item: canonical(crumb.route) }))
    });
  }
  if (page.kind === 'tool') {
    const tool = page.tool;
    const brand = getTargetBrand(tool);
    webpage.mainEntity = { '@id': url + '#software' };
    const software = {
      '@type': 'SoftwareApplication',
      '@id': url + '#software',
      name: tool.name,
      description: page.description,
      applicationCategory: 'DeveloperApplication, SecurityApplication',
      applicationSubCategory: brand ? `${brand} Replacement · Open Source Alternative` : `${tool.category} Software`,
      keywords: brand ? `${tool.name}, ${brand} replacement, ${brand} alternative, reverse engineering ${brand}, open source alternative, ${tool.category}` : `${tool.name}, reverse engineering tool, alternative, ${tool.category}`,
      operatingSystem: tool.platforms.join(', '),
      license: tool.license,
      url: tool.url || url,
      mainEntityOfPage: { '@id': url + '#webpage' },
      ...(tool.github ? { sameAs: tool.github } : {})
    };
    if (brand) {
      software.isSimilarTo = {
        '@type': 'SoftwareApplication',
        name: brand,
        description: `Commercial proprietary software replaced by open-source ${tool.name}`
      };
    }
    if (tool.pricing === 'Free') {
      software.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      };
    }
    graph.push(software);

    // Dynamic FAQPage for EVERY tool page
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: [
        {
          '@type': 'Question',
          name: `Is ${tool.name} free and open source?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Yes. ${tool.name} is ${tool.pricing === 'Free' ? 'completely free and open source' : tool.pricing} under the ${tool.license} license, with full source code available on GitHub.`
          }
        },
        {
          '@type': 'Question',
          name: `How to download ${tool.name} for ${platStr(tool)}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `You can download verified release packages of ${tool.name} for ${platStr(tool)} directly from its official site (${tool.url || 'project website'}) or official GitHub repository (${tool.github || 'releases'}).`
          }
        },
        {
          '@type': 'Question',
          name: `What is ${tool.name} an alternative to?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${tool.name} is a high-performance open-source alternative to ${brand ? `proprietary ${tool.replaces || brand}` : `commercial closed-source ${tool.category.toLowerCase()} software`}, offering full data privacy and zero subscription lock-in.`
          }
        }
      ]
    });

    const steps = getQuickStartSteps(tool);
    graph.push({
      '@type': 'HowTo',
      '@id': url + '#howto',
      name: `How to Install and Run ${tool.name}`,
      description: `Step-by-step setup and operational guide for ${tool.name}.`,
      step: steps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.title,
        text: s.text
      }))
    });
  }

  // Dynamic FAQPage for Comparison pages
  if (page.kind === 'comparison' && page.pair) {
    const [toolA, toolB] = page.pair;
    webpage.about = page.pair.map(tool => ({ '@type': 'SoftwareApplication', name: tool.name, '@id': canonical(`/tools/${tool.slug}/`) + '#software' }));
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: [
        {
          '@type': 'Question',
          name: `What are the key differences between ${toolA.name} and ${toolB.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${toolA.name} (${toolA.license}, ${toolA.pricing}) and ${toolB.name} (${toolB.license}, ${toolB.pricing}) serve distinct workflows. ${toolA.name} supports ${toolA.platforms.join(', ')}, while ${toolB.name} supports ${toolB.platforms.join(', ')}.`
          }
        },
        {
          '@type': 'Question',
          name: `Which tool is better: ${toolA.name} or ${toolB.name}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Choosing between ${toolA.name} and ${toolB.name} depends on platform requirements and technical use cases. Review our side-by-side feature matrix to pick the ideal tool for your pipeline.`
          }
        },
        {
          '@type': 'Question',
          name: `Are ${toolA.name} and ${toolB.name} free and open source?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${toolA.name} is ${toolA.pricing === 'Free' ? 'free' : toolA.pricing} under ${toolA.license}, and ${toolB.name} is ${toolB.pricing === 'Free' ? 'free' : toolB.pricing} under ${toolB.license}. Both offer local execution without cloud vendor lock-in.`
          }
        }
      ]
    });
  }

  if (page.route === '/') {
    graph.push({
      '@type': 'FAQPage',
      '@id': url + '#faq',
      isPartOf: { '@id': websiteId },
      mainEntity: homepageFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    });
  }

  let entries;
  if (page.kind === 'directory') entries = (page.category ? tools.filter(tool => tool.category === page.category) : tools.slice(0, 1)).map(tool => ({ name: tool.name, url: canonical(`/tools/${tool.slug}/`) }));
  if (page.kind === 'categories') entries = categories.map(category => ({ name: category, url: canonical(`/category/${slug(category)}/`) }));
  if (page.kind === 'comparisons') entries = pairs.map(pair => ({ name: `${pair[0].name} vs ${pair[1].name}`, url: canonical(pairRoute(pair)) }));
  if (entries) {
    webpage.mainEntity = { '@id': url + '#list' };
    graph.push({ '@type': 'ItemList', '@id': url + '#list', numberOfItems: entries.length, itemListElement: entries.map((entry,i) => ({ '@type': 'ListItem', position: i+1, name: entry.name, url: entry.url })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
