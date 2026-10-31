import React from 'react';
import { tools, categories, platforms, prices, licenses, seed, slug, href, categoryDescriptions } from '../lib/catalog';
import ToolCard from './ToolCard';

const options = values => values.map(value => <option key={value} value={value}>{value}</option>);

export default function Directory({ category }) {
  const list = category ? tools.filter(tool => tool.category === category) : tools;
  return <>
    <section className="hero">
      <h1>{category ? <>{category}<br/><span className="text-gradient">Reverse engineering tools.</span></> : <>Reverse engineering tools.<br/><span className="text-gradient">Go beneath the surface.</span></>}</h1>
      <p>{category ? categoryDescriptions[category] : <>Find decompilers, debuggers, and binary analysis software.<br className="desktop"/> Explore free GitHub repositories and commercial reverse engineering products.</>}</p>
      <div className="hero-stats"><span><b>{list.length}</b> curated tools</span><span><b>{category ? 1 : categories.length}</b> categories</span><span><b>100%</b> curiosity</span></div>
      <div className="hero-category-links" aria-label="Popular categories">{['Android','Debuggers','Disassemblers & Decompilers','.NET'].map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name} <span aria-hidden="true">↗</span></a>)}</div>
    </section>
    <section aria-label="Tool directory" className="directory">
      <div className="directory-bar"><div><span className="eyebrow">THE DIRECTORY</span><h2>{category ? 'Explore this category' : 'Build your reverse engineering toolkit'}</h2></div><span className="directory-note"><span className="live-dot"/>{list.length} tools, thoughtfully curated</span></div>
      <form className="filters" role="search" id="filters"><label className="search"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span className="sr-only">Search tools</span><input name="q" id="search" type="search" placeholder="Search tools, capabilities, or your next workflow…" autoComplete="off"/><kbd aria-hidden="true">/</kbd></label>
        <div className="filter-row"><label>Category<select name="category" aria-label="Category" defaultValue=""><option value="">All categories</option>{options(categories)}</select></label><label>Platform<select name="platform" aria-label="Platform" defaultValue=""><option value="">All platforms</option>{options(platforms)}</select></label><label>Pricing<select name="pricing" aria-label="Pricing" defaultValue=""><option value="">Free & paid</option>{options(prices)}</select></label><label>License<select name="license" aria-label="License" defaultValue=""><option value="">All licenses</option>{options(licenses)}</select></label><button type="reset" className="reset">Reset filters ↺</button></div>
      </form>
      <div className="results-bar"><p id="result-count" role="status" aria-live="polite">{list.length} tools to explore</p><span className="mono muted">Discover. Analyze. Understand.</span></div>
      <div className="tool-grid" id="tool-grid">{list.map(tool => <ToolCard key={tool.slug} tool={tool}/>)}</div>
      <div id="empty" className="empty" hidden><h3>No matching tools</h3><p>Try another search or reset your filters.</p><button id="empty-reset" className="button">Reset filters</button></div>
      <noscript><p>All tools are listed above. Enable JavaScript to use search and filters.</p></noscript>
      <p className="dataset-note">Collection updated {seed.generated}. Check official project documentation for current requirements.</p>
    </section>
    {!category && <section className="category-overview" aria-labelledby="category-heading"><div className="directory-bar"><div><span className="eyebrow">FIND YOUR WORKFLOW</span><h2 id="category-heading">Reverse engineering tools by category</h2></div><a className="text-link" href={href('/categories/')}>Browse all categories ↗</a></div><div className="category-chips">{categories.map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name}<span>{tools.filter(tool => tool.category === name).length}</span></a>)}</div></section>}
    <section className="contribute"><div><span className="eyebrow">BETTER TOGETHER</span><h2>Great tools deserve to be discovered.</h2><p>Know a project we should include? Share it with the community.</p></div><a className="button" href={href('/submit/')}>Submit a tool ↗</a></section>
  </>;
}
