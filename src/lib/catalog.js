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
export const categoryDescriptions = {
  'Disassemblers & Decompilers': 'Top decompilers and disassemblers (x86, x64, ARM, MIPS) for binary analysis, source code recovery, and reverse engineering.',
  'Debuggers': 'Best debuggers, dynamic analysis tools, and GDB extensions for stepping through binaries, memory inspection, and vulnerability research.',
  'Android': 'Top Android reverse engineering tools: APK decompilers, Dalvik DEX bytecode inspection, dynamic instrumentation, and app analysis.',
  '.NET': 'Best .NET decompilers, assembly editors, debuggers, and deobfuscation tools for analyzing C#, VB.NET, and managed PE binaries.',
  'Analysis Utilities': 'Essential reverse engineering utilities: executable file identification, PE and ELF packer detection, and binary inspection tools.',
  'Binary Analysis Frameworks': 'Leading binary analysis frameworks for symbolic execution, intermediate representations (IR), and automated disassembly.',
  'Firmware & Embedded': 'Top firmware reverse engineering tools for unpacking ROMs, inspecting UEFI images, hardware debugging, and IoT binary emulation.',
  'Network': 'Advanced network reverse engineering tools for inspecting protocols, intercepting HTTP/HTTPS traffic, and analyzing application APIs.',
  'Distros & Environments': 'Dedicated reverse engineering and malware analysis operating systems, virtual appliances, and cybersecurity lab environments.',
  'Java': 'Top Java reverse engineering tools: bytecode decompilers, class viewers, and analysis suites for compiled JAR and JVM applications.',
  'Game RE': 'Best game reverse engineering tools: memory scanners, runtime struct reconstruction, and process debugging for game binary research.',
};
export const metaDescription = text => text.length <= 160 ? text : text.slice(0,157).replace(/\s+\S*$/, '') + '…';

export const defaultKeywords = 'reverse engineering tools, best decompilers, disassemblers, debuggers, binary analysis software, malware analysis, ghidra, ida pro, binary ninja, x64dbg, frida, apk decompiler, open source reverse engineering, static analysis, dynamic analysis';

export function keywordsFor(page) {
  if (page.kind === 'tool' && page.tool) {
    return `${page.tool.name}, ${page.tool.name} reverse engineering, ${page.tool.name} download, ${page.tool.name} alternatives, ${page.tool.category.toLowerCase()} tools, ${page.tool.platforms.join(', ').toLowerCase()} reverse engineering, ${page.tool.license}`;
  }
  if (page.category) {
    const map = {
      'Disassemblers & Decompilers': 'best decompilers, free disassemblers, ghidra, ida free, binary ninja, cutter, radare2, x86 decompiler, arm decompiler, binary analysis',
      'Debuggers': 'reverse engineering debuggers, x64dbg, pwndbg, gef, gdb plugins, dynamic binary analysis, memory debugger, exploit development',
      'Android': 'android reverse engineering, apk decompiler, dex decompiler, jadx, apktool, frida android, mobsf, android malware analysis, smali',
      '.NET': 'dotnet decompiler, c# decompiler, dnspyex, ilspy, de4dot, dotnet deobfuscator, managed assembly editor, pe decompiler',
      'Analysis Utilities': 'packer detector, detect it easy, die, upx unpacker, trid file identifier, scyllahide, pe analysis tools',
      'Binary Analysis Frameworks': 'binary analysis frameworks, angr, capstone engine, lief pe elf, yara rules, symbolic execution, disassembly library',
      'Firmware & Embedded': 'firmware reverse engineering, binwalk, uefitool, firmae, rom extractor, iot firmware analysis, embedded security',
      'Network': 'network reverse engineering, mitmproxy, traffic inspection, api reverse engineering, packet capture, http proxy',
      'Distros & Environments': 'malware analysis distro, flare vm, remnux, reverse engineering lab, security virtual machine',
      'Java': 'java reverse engineering, bytecode viewer, dex2jar, java decompiler, jar inspection, jvm bytecode',
      'Game RE': 'game reverse engineering, cheat engine, reclassex, memory scanner, pointer scanner, game structure reconstruction'
    };
    return map[page.category] || `${page.category.toLowerCase()} reverse engineering tools, binary analysis, security research`;
  }
  if (page.kind === 'comparison' && page.pair) {
    return `${page.pair[0].name} vs ${page.pair[1].name}, compare ${page.pair[0].name} ${page.pair[1].name}, ${page.pair[0].name} alternatives, best decompiler, reverse engineering tools comparison`;
  }
  return defaultKeywords;
}

export const homepageFaqs = [
  {
    question: 'What are the best reverse engineering tools in 2026?',
    answer: 'The top reverse engineering tools include Ghidra (NSA open-source decompiler suite), IDA Free and Binary Ninja (binary disassembly and decompilation), x64dbg and GDB with pwndbg/GEF (dynamic debugging), Frida (dynamic binary instrumentation), and jadx (Android APK/DEX decompilation).'
  },
  {
    question: 'What is the difference between a decompiler and a disassembler?',
    answer: 'A disassembler translates compiled machine code (binary opcodes) into human-readable assembly instructions (like x86, x64, or ARM). A decompiler goes a step further by reconstructing high-level source code (such as C/C++ pseudo-code, Java, or C#) from the assembly or bytecode.'
  },
  {
    question: 'Which reverse engineering tools are free and open source on GitHub?',
    answer: 'Popular free and open-source tools include Ghidra (Apache-2.0), radare2 (LGPL-3.0), rizin and Cutter (LGPL-3.0), x64dbg (GPL-3.0), jadx (Apache-2.0), apktool (Apache-2.0), Frida (wxWindows), pwndbg and GEF (MIT), and binwalk (MIT).'
  },
  {
    question: 'What tools are best for Android reverse engineering and mobile malware analysis?',
    answer: 'For Android APK and DEX analysis, jadx decompiles APKs to Java source, apktool decodes resources and smali code, Frida provides real-time function hooking, and MobSF offers automated static and dynamic security analysis.'
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
    title: 'Best Reverse Engineering Tools, Software & Repositories (2026)',
    description: 'Explore the curated directory of reverse engineering tools, decompilers, debuggers, binary analysis frameworks, and open-source GitHub projects in 2026.'
  },
  {
    route: '/categories/',
    kind: 'categories',
    title: 'Reverse Engineering Tools by Category — Complete Directory',
    description: 'Browse curated reverse engineering tools by category: Android, debuggers, decompilers, .NET, firmware, binary analysis frameworks, and game RE.'
  },
  ...categories.map(category => ({
    route: `/category/${slug(category)}/`,
    kind: 'directory',
    category,
    title: `Best ${category} Tools for Reverse Engineering (2026)`,
    description: categoryDescriptions[category] || `Explore top ${category} reverse engineering tools, platforms, open source licenses, and GitHub repositories.`
  })),
  ...tools.map(tool => ({
    route: `/tools/${tool.slug}/`,
    kind: 'tool',
    tool,
    title: `${tool.name} — Reverse Engineering Tool, Features & Alternatives`,
    description: metaDescription(tool.description)
  })),
  {
    route: '/compare/',
    kind: 'comparisons',
    title: 'Compare Reverse Engineering Tools & Decompilers Side-by-Side',
    description: 'Compare reverse engineering software, decompilers, and debuggers by features, platforms, pricing, and licenses to pick the right tool for your workflow.'
  },
  ...pairs.map(pair => ({
    route: pairRoute(pair),
    kind: 'comparison',
    pair,
    title: `${pair[0].name} vs ${pair[1].name} — Reverse Engineering Tools Comparison`,
    description: metaDescription(`Compare ${pair[0].name} vs ${pair[1].name}: features, reverse engineering capabilities, platform support, pricing, and licenses.`)
  })),
  {
    route: '/submit/',
    kind: 'submit',
    title: 'Submit a Reverse Engineering Tool or GitHub Repository',
    description: 'Submit an open-source or commercial reverse engineering tool to RevKit. Contribute via JSON and pull request to help the community.'
  },
  {
    route: '/about/',
    kind: 'about',
    title: 'About RevKit — Curated Reverse Engineering Tools Directory',
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
    { '@type': 'Organization', '@id': publisherId, name: 'RevKit', url: canonical('/') },
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
    webpage.mainEntity = { '@id': url + '#software' };
    const software = {
      '@type': 'SoftwareApplication',
      '@id': url + '#software',
      name: tool.name,
      description: tool.description,
      applicationCategory: 'DeveloperApplication, SecurityApplication',
      operatingSystem: tool.platforms.join(', '),
      license: tool.license,
      url: tool.url || url,
      mainEntityOfPage: { '@id': url + '#webpage' },
      ...(tool.github ? { sameAs: tool.github } : {})
    };
    if (tool.pricing === 'Free') {
      software.offers = {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      };
    }
    graph.push(software);
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
  if (page.kind === 'directory') entries = (page.category ? tools.filter(tool => tool.category === page.category) : tools).map(tool => ({ name: tool.name, url: canonical(`/tools/${tool.slug}/`) }));
  if (page.kind === 'categories') entries = categories.map(category => ({ name: category, url: canonical(`/category/${slug(category)}/`) }));
  if (page.kind === 'comparisons') entries = pairs.map(pair => ({ name: `${pair[0].name} vs ${pair[1].name}`, url: canonical(pairRoute(pair)) }));
  if (page.kind === 'comparison') webpage.about = page.pair.map(tool => ({ '@type': 'SoftwareApplication', name: tool.name, '@id': canonical(`/tools/${tool.slug}/`) + '#software' }));
  if (entries) {
    webpage.mainEntity = { '@id': url + '#list' };
    graph.push({ '@type': 'ItemList', '@id': url + '#list', numberOfItems: entries.length, itemListElement: entries.map((entry,i) => ({ '@type': 'ListItem', position: i+1, name: entry.name, url: entry.url })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
