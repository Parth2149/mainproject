import React from 'react';
import { tools, categories, platforms, prices, licenses, seed, slug, href, categoryDescriptions, homepageFaqs } from '../lib/catalog';
import ToolCard from './ToolCard';

const options = values => values.map(value => <option key={value} value={value}>{value}</option>);

export default function Directory({ category }) {
  const list = category ? tools.filter(tool => tool.category === category) : tools;
  return <>
    <section className="hero">
      <span className="hero-badge"><span className="live-dot" aria-hidden="true"/>The 2026 Reverse Engineering Directory</span>
      <h1>{category ? <>{category}<br/><span className="text-gradient">Tools &amp; Decompilers.</span></> : <>Best Reverse Engineering Tools.<br/><span className="text-gradient">Decompilers, Debuggers &amp; Software.</span></>}</h1>
      <p>{category ? categoryDescriptions[category] : <>The curated directory of reverse engineering tools, binary analysis software, and open-source GitHub repositories.<br className="desktop"/> Search and compare 100+ decompilers, debuggers, disassemblers, and instrumentation frameworks.</>}</p>
      <div className="hero-stats"><span><b>{list.length}</b> curated tools</span><span><b>{category ? 1 : categories.length}</b> categories</span><span><b>100%</b> verified entries</span></div>
      <div className="hero-category-links" aria-label="Popular categories">{['Disassemblers & Decompilers','Debuggers','Android','.NET','Binary Analysis Frameworks'].map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name} <span aria-hidden="true">↗</span></a>)}</div>
    </section>
    <section aria-label="Tool directory" className="directory">
      <div className="directory-bar"><div><span className="eyebrow">THE DIRECTORY</span><h2>{category ? `Explore ${category} tools` : 'Build your reverse engineering toolkit'}</h2></div><span className="directory-note"><span className="live-dot"/>{list.length} tools, thoughtfully curated</span></div>
      <form className="filters" role="search" id="filters"><label className="search"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span className="sr-only">Search tools</span><input name="q" id="search" type="search" placeholder="Search decompilers, debuggers, tools, or GitHub repos…" autoComplete="off"/><kbd aria-hidden="true">/</kbd></label>
        <div className="filter-row"><label>Category<select name="category" aria-label="Category" defaultValue=""><option value="">All categories</option>{options(categories)}</select></label><label>Platform<select name="platform" aria-label="Platform" defaultValue=""><option value="">All platforms</option>{options(platforms)}</select></label><label>Pricing<select name="pricing" aria-label="Pricing" defaultValue=""><option value="">Free & paid</option>{options(prices)}</select></label><label>License<select name="license" aria-label="License" defaultValue=""><option value="">All licenses</option>{options(licenses)}</select></label><button type="reset" className="reset">Reset filters ↺</button></div>
      </form>
      <div className="results-bar"><p id="result-count" role="status" aria-live="polite">{list.length} tools to explore</p><span className="mono muted">Decompile. Disassemble. Debug. Understand.</span></div>
      <div className="tool-grid" id="tool-grid">{list.map(tool => <ToolCard key={tool.slug} tool={tool}/>)}</div>
      <div id="empty" className="empty" hidden><h3>No matching tools</h3><p>Try another search or reset your filters.</p><button id="empty-reset" className="button">Reset filters</button></div>
      <noscript><p>All tools are listed above. Enable JavaScript to use search and filters.</p></noscript>
      <p className="dataset-note">Collection updated {seed.generated}. Check official project documentation for current requirements.</p>
    </section>
    {!category && <section className="category-overview" aria-labelledby="category-heading"><div className="directory-bar"><div><span className="eyebrow">FIND YOUR WORKFLOW</span><h2 id="category-heading">Reverse engineering tools by category</h2></div><a className="text-link" href={href('/categories/')}>Browse all categories ↗</a></div><div className="category-chips">{categories.map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name}<span>{tools.filter(tool => tool.category === name).length}</span></a>)}</div></section>}
    {!category && <section className="seo-guide" aria-labelledby="guide-heading">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">ESSENTIAL KNOWLEDGE</span>
          <h2 id="guide-heading">The Complete Guide to Reverse Engineering Tools &amp; Workflows</h2>
        </div>
      </div>
      <div className="guide-grid">
        <div className="guide-card">
          <h3>Static Binary Analysis</h3>
          <p>Inspect code without execution. Decompilers and disassemblers like <strong>Ghidra</strong>, <strong>IDA Free</strong>, and <strong>Binary Ninja</strong> recover control-flow graphs and generate readable C/C++ pseudo-code across x86, ARM, and MIPS architectures.</p>
        </div>
        <div className="guide-card">
          <h3>Dynamic Runtime Analysis</h3>
          <p>Step through execution, inspect registers, and trace system calls. Tools like <strong>x64dbg</strong>, <strong>pwndbg</strong>, and <strong>GEF</strong> offer granular memory inspection, while <strong>Frida</strong> provides dynamic binary instrumentation and hooking.</p>
        </div>
        <div className="guide-card">
          <h3>Mobile &amp; Managed Binaries</h3>
          <p>Analyze runtimes including Android APK/DEX and .NET assemblies. Tools like <strong>jadx</strong>, <strong>apktool</strong>, <strong>MobSF</strong>, and <strong>dnSpyEx</strong> decode bytecode, unpack resources, and recover source code for security audits.</p>
        </div>
      </div>
    </section>}
    {!category && <section className="faq-section" aria-labelledby="faq-heading">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">FREQUENTLY ASKED QUESTIONS</span>
          <h2 id="faq-heading">Frequently Asked Questions About Reverse Engineering Tools</h2>
        </div>
      </div>
      <div className="faq-grid">
        {homepageFaqs.map(faq => (
          <article key={faq.question} className="faq-card">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>}
    {category && <section className="seo-guide" aria-labelledby="cat-guide-heading">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">WORKFLOW OVERVIEW</span>
          <h2 id="cat-guide-heading">Understanding {category} in Reverse Engineering</h2>
        </div>
      </div>
      <div className="guide-card single">
        <p>{categoryDescriptions[category]} RevKit curates verified open-source and commercial tools to support security researchers, malware analysts, and reverse engineers. Compare features, licenses, and supported platforms to choose the right software for your analysis pipeline.</p>
      </div>
    </section>}
    <section className="contribute"><div><span className="eyebrow">BETTER TOGETHER</span><h2>Great tools deserve to be discovered.</h2><p>Know a project we should include? Share it with the community.</p></div><a className="button" href={href('/submit/')}>Submit a tool ↗</a></section>
  </>;
}
