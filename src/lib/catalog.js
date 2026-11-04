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
  'Disassemblers & Decompilers': 'Best Decompilers & Disassemblers (2026)',
  'Debuggers': 'Best Reverse Engineering Debuggers (2026)',
  'Android': 'Best Android Reverse Engineering Tools (2026)',
  '.NET': 'Best .NET Decompilers & RE Tools (2026)',
  'Analysis Utilities': 'Best Binary Analysis Utilities (2026)',
  'Binary Analysis Frameworks': 'Best Binary Analysis Frameworks (2026)',
  'Firmware & Embedded': 'Best Firmware Reverse Engineering Tools (2026)',
  'Network': 'Best Network Reverse Engineering Tools (2026)',
  'Distros & Environments': 'Best Malware Analysis Distros & Labs (2026)',
  'Java': 'Best Java Decompilers & RE Tools (2026)',
  'Game RE': 'Best Game Reverse Engineering Tools (2026)',
  'Software': 'Best Creative Software & Adobe Alternatives (2026)',
};

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
  'Software': 'Top open-source creative software, desktop suites, and clean-room Adobe Creative Cloud alternatives built in Rust.',
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

export function getQuickStartSteps(tool) {
  const brand = getTargetBrand(tool);
  const repoName = tool.github ? new URL(tool.github).pathname.slice(1) : null;
  const platStr = tool.platforms.length === 3 ? 'Windows, macOS, Linux' : tool.platforms.join(' / ');
  const cat = tool.category;
  const name = tool.name;

  if (cat === 'Disassemblers & Decompilers' || cat === 'Java' || cat === '.NET' || cat === 'Analysis Utilities' || cat === 'Binary Analysis Frameworks') {
    const prereq = (cat === 'Java' || name.toLowerCase().includes('ghidra')) ? 'Java JDK 17+ or 21+' : cat === '.NET' ? '.NET 8/9 Runtime' : 'Standard 64-bit OS';
    return [
      { step: '1', title: 'Download Release Archive', text: repoName ? `Go to the GitHub repository (${repoName}) releases section and download the latest zip/tarball for ${platStr}.` : `Download the latest verified standalone package from the official project page for ${platStr}.` },
      { step: '2', title: 'Verify Prerequisites & Extract', text: `Extract the archive into your security lab or workspace directory. Ensure ${prereq} is installed.` },
      { step: '3', title: 'Launch Standalone Binary', text: `Execute the main runner (${name} executable or launch script) with no cloud registration or telemetry.` },
      { step: '4', title: 'Import Target & Decompile', text: `Open or drag-and-drop your target binary, APK, or DLL to start automated analysis, disassembly, and C/C++ decompilation.` }
    ];
  }

  if (cat === 'Debuggers' || cat === 'Android' || cat === 'Game RE') {
    return [
      { step: '1', title: 'Get Verified Build', text: repoName ? `Download the latest binary release from GitHub (${repoName}) or your package manager.` : `Obtain the official installer for ${platStr}.` },
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
      { step: '1', title: 'Download Installer / Image', text: repoName ? `Download the native installer for ${platStr} or pull the self-hosted container from ${repoName}.` : `Download the installer directly from the official website for ${platStr}.` },
      { step: '2', title: 'Quick Local Installation', text: `Run the setup wizard or launch the portable package. No compulsory cloud account or billing credentials needed.` },
      { step: '3', title: 'Open Local Workspace', text: `Launch ${name} and select your local storage folder. Import your existing projects, templates, or files seamlessly.` },
      { step: '4', title: 'Work with Full Data Sovereignty', text: `Enjoy unrestricted workflow speed, offline file handling, and export your work with zero subscription lock-in.` }
    ];
  }

  return [
    { step: '1', title: 'Obtain Official Package', text: repoName ? `Download the release binary or clone the repository from GitHub (${repoName}).` : `Download the official installer for ${platStr}.` },
    { step: '2', title: 'Local Installation', text: `Extract the portable files or complete the standard installation on ${platStr} without telemetry.` },
    { step: '3', title: 'Launch Application', text: `Launch ${name} natively to initialize your offline preferences and local data store.` },
    { step: '4', title: 'Operate with Zero Lock-in', text: `Execute your workflows freely, inspect internal formats, and replace costly proprietary ${brand || 'tools'} effortlessly.` }
  ];
}

export function toolTitle(tool) {
  const brand = getTargetBrand(tool);
  const candidates = [];
  if (brand) {
    candidates.push(
      `${tool.name} — Free ${brand} Replacement & RE`,
      `${tool.name} — ${brand} Replacement & RE Tool`,
      `${tool.name} — Free ${brand} Replacement`,
      `${tool.name} — ${brand} Replacement & Tool`,
      `${tool.name} — Free ${brand} Alternative`,
      `${tool.name} — ${brand} Alternative & RE`,
      `${tool.name} — ${brand} Replacement`,
      `${tool.name} — ${brand} Alternative`
    );
  }
  candidates.push(
    `${tool.name} — Reverse Engineering Tool & Alternative`,
    `${tool.name} — RE Tool & Free Alternative`,
    `${tool.name} — RE Tool & Alternative`,
    `${tool.name} — Reverse Engineering Tool`,
    `${tool.name} — RE Software`
  );
  for (const c of candidates) {
    if (c.length + 9 <= 60) return c;
  }
  return `${tool.name} — RE Software`;
}

export function toolPageDescription(tool) {
  const brand = getTargetBrand(tool);
  let prefix = '';
  if (brand) {
    prefix = `Free ${brand} replacement & open-source RE alternative. ${tool.name}: `;
    if (prefix.length > 70) {
      prefix = `Free ${brand} replacement: ${tool.name} — `;
    }
  } else {
    prefix = `${tool.name} RE tool & alternative: `;
  }
  return metaDescription(prefix + tool.description);
}

export const defaultKeywords = 'reverse engineering tools, best decompilers, disassemblers, debuggers, binary analysis software, malware analysis, ghidra, ida pro, binary ninja, x64dbg, frida, apk decompiler, open source reverse engineering, static analysis, dynamic analysis';

export function keywordsFor(page) {
  if (page.kind === 'tool' && page.tool) {
    const t = page.tool;
    const brand = getTargetBrand(t);
    const brandKws = brand ? `, ${brand.toLowerCase()} replacement, ${brand.toLowerCase()} alternative, reverse engineering ${brand.toLowerCase()}, reverse engineering of ${brand.toLowerCase()}, free ${brand.toLowerCase()} replacement, open source ${brand.toLowerCase()}` : '';
    const tagKws = t.tag ? `, ${t.tag.toLowerCase()}` : '';
    return `${t.name}, ${t.name} alternative, ${t.name} reverse engineering, ${t.name} open source, ${t.category.toLowerCase()} tools, ${t.platforms.join(', ').toLowerCase()} reverse engineering, ${t.license}${brandKws}${tagKws}`;
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
      'Game RE': 'game reverse engineering, cheat engine, reclassex, memory scanner, pointer scanner, game structure reconstruction',
      'Software': 'creative software, open source software, free adobe alternatives, artcraft, photocraft, vectorcraft, filmcraft, lightcraft, rust software, creative cloud alternative'
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
    question: 'Best reverse engineering tools & alternatives in 2026?',
    answer: 'Ghidra, IDA Free, and Binary Ninja for decompilation; x64dbg and Frida for debugging; and open-source Adobe/Canva alternatives like JPEXS, Rembg, and Penpot.'
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
    title: 'Top Reverse Engineering Tools & Software (2026)',
    description: 'Explore the curated directory of reverse engineering tools, decompilers, debuggers, binary analysis frameworks, and open-source GitHub projects in 2026.'
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
    title: 'Compare Reverse Engineering Tools (2026)',
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
    { '@type': 'Organization', '@id': publisherId, name: 'RevKit', url: canonical('/'), logo: canonical('/icon-512.png') },
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
    if (brand) {
      graph.push({
        '@type': 'FAQPage',
        '@id': url + '#faq',
        isPartOf: { '@id': websiteId },
        mainEntity: [
          {
            '@type': 'Question',
            name: `What is the best free open-source replacement for ${brand}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${tool.name} is a top free, open-source replacement for ${brand}. It runs natively on ${tool.platforms.join(', ')} under the ${tool.license} license, offering zero-cost usage without proprietary subscriptions or cloud lock-in.`
            }
          },
          {
            '@type': 'Question',
            name: `Can ${tool.name} completely replace ${brand}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Yes. ${tool.name} provides direct functional equivalence to ${brand}, replacing proprietary cloud subscriptions with auditable local software, offline execution, and full protocol reverse engineering.`
            }
          },
          {
            '@type': 'Question',
            name: `How does ${tool.name} compare to ${brand} in privacy and pricing?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Unlike ${brand}, which requires recurring monthly fees and cloud processing, ${tool.name} is ${tool.pricing === 'Free' ? '100% free' : tool.pricing} and executes locally on your device with zero data tracking.`
            }
          }
        ]
      });
    }
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
  if (page.kind === 'comparison') webpage.about = page.pair.map(tool => ({ '@type': 'SoftwareApplication', name: tool.name, '@id': canonical(`/tools/${tool.slug}/`) + '#software' }));
  if (entries) {
    webpage.mainEntity = { '@id': url + '#list' };
    graph.push({ '@type': 'ItemList', '@id': url + '#list', numberOfItems: entries.length, itemListElement: entries.map((entry,i) => ({ '@type': 'ListItem', position: i+1, name: entry.name, url: entry.url })) });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}
