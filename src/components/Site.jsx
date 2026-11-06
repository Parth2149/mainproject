import React from 'react';
import Directory from './Directory';
import ToolDetail from './ToolDetail';
import Comparisons from './Comparisons';
import Submission from './Submission';
import About from './About';
import { tools, seed, href, categories, slug, categoryDescriptions } from '../lib/catalog';

export default function Site({ page }) {
  switch (page.kind) {
    case 'directory': return <Directory category={page.category}/>;
    case 'categories': return <><section className="page-intro"><div className="eyebrow">EXPLORE BY WORKFLOW</div><h1>Reverse engineering categories.<br/><span className="text-gradient">Decompilers, debuggers &amp; frameworks.</span></h1><p className="lead">Browse {categories.length} curated categories of reverse engineering software, binary analysis tools, and open-source GitHub repositories.</p></section><div className="category-grid">{categories.map(category => <article key={category} className="category-tile"><span className="eyebrow">{tools.filter(tool => tool.category === category).length} TOOLS</span><h2><a href={href(`/category/${slug(category)}/`)}>{category} ↗</a></h2><p>{categoryDescriptions[category]}</p><a className="text-link" href={href(`/category/${slug(category)}/`)}>Explore {category} tools →</a></article>)}</div></>;
    case 'tool': return <ToolDetail tool={page.tool}/>;
    case 'comparisons': case 'comparison': return <Comparisons pair={page.pair}/>;
    case 'submit': return <Submission/>;
    case 'about': return <About/>;
    default: return <section className="page-intro"><div className="eyebrow">ERROR / 404</div><h1>Unmapped <span className="text-gradient">territory.</span></h1><p className="lead">This address does not point to a tool.</p><a className="button" href={href('/')}>Back to the directory →</a></section>;
  }
}
