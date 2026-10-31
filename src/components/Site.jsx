import React from 'react';
import Directory from './Directory';
import ToolDetail from './ToolDetail';
import Comparisons from './Comparisons';
import Submission from './Submission';
import { tools, seed, href, categories, slug, categoryDescriptions } from '../lib/catalog';

export default function Site({ page }) {
  switch (page.kind) {
    case 'directory': return <Directory category={page.category}/>;
    case 'categories': return <><section className="page-intro"><div className="eyebrow">EXPLORE BY WORKFLOW</div><h1>Reverse engineering categories.<br/><span className="text-gradient">Decompilers, debuggers &amp; frameworks.</span></h1><p className="lead">Browse {categories.length} curated categories of reverse engineering software, binary analysis tools, and open-source GitHub repositories.</p></section><div className="category-grid">{categories.map(category => <article key={category} className="category-tile"><span className="eyebrow">{tools.filter(tool => tool.category === category).length} TOOLS</span><h2><a href={href(`/category/${slug(category)}/`)}>{category} ↗</a></h2><p>{categoryDescriptions[category]}</p><a className="text-link" href={href(`/category/${slug(category)}/`)}>Explore {category} tools →</a></article>)}</div></>;
    case 'tool': return <ToolDetail tool={page.tool}/>;
    case 'comparisons': case 'comparison': return <Comparisons pair={page.pair}/>;
    case 'submit': return <Submission/>;
    case 'about': return <section className="page-intro prose"><div className="eyebrow">HUMAN CURIOSITY. BETTER TOOLS.</div><h1>Curated reverse engineering <span className="text-gradient">toolkit.</span></h1><p className="lead">RevKit brings reverse engineering software, decompilers, debuggers, and GitHub projects into one searchable, curated directory.</p><h2>About this collection</h2><p>This directory indexes {tools.length} curated reverse engineering tools across 11 key disciplines, dated {seed.generated}. Whether analyzing x86/x64 binaries, Android APKs, .NET assemblies, or IoT firmware, RevKit provides a fast, unbiased reference for security researchers, malware analysts, and software engineers.</p><h2>Accuracy &amp; updates</h2><p>Descriptions, licenses, pricing, and platform support reflect verified project metadata. We recommend confirming upstream license terms and documentation on official repositories before deployment in production or commercial environments.</p><h2>Contribute</h2><p>Know an essential reverse engineering tool, decompiler, or debugger that should be listed? Submit it using our <a href={href('/submit/')}>contribution form</a>.</p></section>;
    default: return <section className="page-intro"><div className="eyebrow">ERROR / 404</div><h1>Unmapped <span className="text-gradient">territory.</span></h1><p className="lead">This address does not point to a tool.</p><a className="button" href={href('/')}>Back to the directory →</a></section>;
  }
}
