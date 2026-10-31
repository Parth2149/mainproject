import React from 'react';
import Directory from './Directory';
import ToolDetail from './ToolDetail';
import Comparisons from './Comparisons';
import Submission from './Submission';
import { tools, seed, href, categories, slug, categoryDescriptions } from '../lib/catalog';

export default function Site({ page }) {
  switch (page.kind) {
    case 'directory': return <Directory category={page.category}/>;
    case 'categories': return <><section className="page-intro"><div className="eyebrow">EXPLORE BY WORKFLOW</div><h1>Reverse engineering.<br/><span className="text-gradient">Every angle covered.</span></h1><p className="lead">Browse {categories.length} categories of reverse engineering products, free tools, and GitHub repositories.</p></section><div className="category-grid">{categories.map(category => <article key={category} className="category-tile"><span className="eyebrow">{tools.filter(tool => tool.category === category).length} TOOLS</span><h2><a href={href(`/category/${slug(category)}/`)}>{category} ↗</a></h2><p>{categoryDescriptions[category]}</p><a className="text-link" href={href(`/category/${slug(category)}/`)}>Explore {category} tools →</a></article>)}</div></>;
    case 'tool': return <ToolDetail tool={page.tool}/>;
    case 'comparisons': case 'comparison': return <Comparisons pair={page.pair}/>;
    case 'submit': return <Submission/>;
    case 'about': return <section className="page-intro prose"><div className="eyebrow">HUMAN CURIOSITY. BETTER TOOLS.</div><h1>Know your <span className="text-gradient">toolkit.</span></h1><p className="lead">RevKit brings reverse engineering products and GitHub projects into one searchable directory.</p><h2>About this collection</h2><p>This initial release contains {tools.length} tools from the supplied seed, dated {seed.generated}. It is a curated starting point, not an exhaustive or independently audited catalog. Repository presence does not imply an open-source license.</p><h2>Accuracy & updates</h2><p>Descriptions, licenses, pricing, and platform support reflect the seed dataset and may need upstream verification. Confirm requirements and legal terms on each official project before installation or purchase. No tools or repository URLs were invented to expand this release.</p><h2>Contribute</h2><p>Suggest corrections or new entries through the <a href={href('/submit/')}>contribution form</a>. Comparisons use the same dataset and do not declare a universal winner.</p></section>;
    default: return <section className="page-intro"><div className="eyebrow">ERROR / 404</div><h1>Unmapped <span className="text-gradient">territory.</span></h1><p className="lead">This address does not point to a tool.</p><a className="button" href={href('/')}>Back to the directory →</a></section>;
  }
}
