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
  'Disassemblers & Decompilers': 'Explore disassemblers and decompilers for inspecting binaries, understanding program structure, and recovering higher-level code.',
  'Debuggers': 'Explore debuggers and debugger extensions for stepping through programs, inspecting memory, and studying runtime behavior.',
  'Android': 'Discover Android reverse engineering tools for APK and DEX inspection, resource decoding, instrumentation, and mobile app analysis.',
  '.NET': 'Find .NET decompilers, assembly editors, debuggers, and deobfuscation tools for understanding managed applications.',
  'Analysis Utilities': 'Find utilities for identifying file types, inspecting executable packers, and supporting a reverse engineering workflow.',
  'Binary Analysis Frameworks': 'Explore libraries and frameworks for disassembly, symbolic execution, executable parsing, and pattern-based binary analysis.',
  'Firmware & Embedded': 'Discover firmware and embedded analysis tools for extracting images, inspecting UEFI structures, and exploring emulation workflows.',
  'Network': 'Explore network analysis tools for inspecting application traffic and understanding how software communicates.',
  'Distros & Environments': 'Find prepared reverse engineering and malware analysis environments for Windows and Linux workflows.',
  'Java': 'Discover Java reverse engineering tools for inspecting bytecode, comparing decompilation output, and understanding compiled applications.',
  'Game RE': 'Explore tools for studying process memory, debugging applications, and reconstructing runtime data structures.',
};
export const metaDescription = text => text.length <= 160 ? text : text.slice(0,157).replace(/\s+\S*$/, '') + '…';

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
  { route: '/', kind: 'directory', title: 'Reverse Engineering Tools & GitHub Repositories', description: 'Discover reverse engineering tools, free GitHub repositories, and commercial software. Compare decompilers, debuggers, Android tools, licenses, and platforms.' },
  { route: '/categories/', kind: 'categories', title: 'Browse Reverse Engineering Tool Categories', description: 'Browse reverse engineering tools by category: Android, debuggers, decompilers, .NET, firmware, binary analysis, Java, and more.' },
  ...categories.map(category => ({ route: `/category/${slug(category)}/`, kind: 'directory', category, title: `${category} Tools for Reverse Engineering`, description: categoryDescriptions[category] || `Explore ${category} tools, platforms, licenses, and GitHub repositories.` })),
  ...tools.map(tool => ({ route: `/tools/${tool.slug}/`, kind: 'tool', tool, title: `${tool.name} — features, license & alternatives`, description: tool.description })),
  { route: '/compare/', kind: 'comparisons', title: 'Compare reverse engineering tools', description: 'Compare reverse engineering software by capabilities, platform, pricing, and license.' },
  ...pairs.map(pair => ({ route: pairRoute(pair), kind: 'comparison', pair, title: `${pair[0].name} vs ${pair[1].name}`, description: `Compare ${pair[0].name} and ${pair[1].name}: capabilities, platforms, pricing, and licenses.` })),
  { route: '/submit/', kind: 'submit', title: 'Submit a tool', description: 'Suggest a reverse engineering tool with a JSON contribution and GitHub pull request.' },
  { route: '/about/', kind: 'about', title: 'About RevKit & the data', description: 'Learn how RevKit curates reverse engineering tools, products, and GitHub repositories.' },
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
    { '@type': 'WebSite', '@id': websiteId, name: 'RevKit', url: canonical('/'), description: 'A curated directory of reverse engineering software and GitHub repositories.', publisher: { '@id': publisherId }, inLanguage: 'en' },
  ];
  const crumbs = breadcrumbsFor(page);
  const webpage = { '@type': page.kind === 'directory' || page.kind === 'categories' || page.kind === 'comparisons' ? 'CollectionPage' : page.kind === 'about' ? 'AboutPage' : 'WebPage', '@id': url + '#webpage', url, name: page.title, description: page.description, inLanguage: 'en', isPartOf: { '@id': websiteId }, publisher: { '@id': publisherId }, ...(crumbs.length ? { breadcrumb: { '@id': url + '#breadcrumb' } } : {}) };
  graph.push(webpage);
  if (crumbs.length) graph.push({ '@type': 'BreadcrumbList', '@id': url + '#breadcrumb', itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i+1, name: crumb.name, item: canonical(crumb.route) })) });
  if (page.kind === 'tool') {
    const tool = page.tool;
    webpage.mainEntity = { '@id': url + '#software' };
    graph.push({ '@type': 'SoftwareApplication', '@id': url + '#software', name: tool.name, description: tool.description, applicationCategory: 'DeveloperApplication', operatingSystem: tool.platforms.join(', '), license: tool.license, url: tool.url || url, mainEntityOfPage: { '@id': url + '#webpage' }, ...(tool.github ? { sameAs: tool.github } : {}) });
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
