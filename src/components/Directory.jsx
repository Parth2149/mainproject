import React from 'react';
import { tools, categories, platforms, prices, licenses, seed, slug, href, categoryDescriptions, homepageFaqs } from '../lib/catalog';
import ToolCard from './ToolCard';
import SavingsCalculator from './SavingsCalculator';

const options = values => values.map(value => <option key={value} value={value}>{value}</option>);

export default function Directory({ category }) {
  const list = category ? tools.filter(tool => tool.category === category) : tools;
  const isSoftware = category === 'Software';
  const isAudio = category === 'Audio';

  return <>
    <section className="hero">
      <div className="hero-kicker">A curious mind deserves a great toolkit</div>
      <h1>
        {isSoftware ? (
          <>Best Free Open Source <br/><span className="text-gradient">Software Alternatives (2026).</span></>
        ) : isAudio ? (
          <>Best Open Source Audio Editors &amp; <br/><span className="text-gradient">DAWs (2026).</span></>
        ) : category ? (
          <>{category}<br/><span className="text-gradient">Tools &amp; Frameworks (2026).</span></>
        ) : (
          <>Reverse Engineering Tools &amp; <br/><span className="text-gradient">Open Source Alternatives.</span></>
        )}
      </h1>
      <p>{category ? categoryDescriptions[category] : <>Explore the curated directory of reverse engineering tools, open source alternatives, free decompilers, debuggers, and GitHub software in 2026.</>}</p>
      <div className="hero-stats"><span><b>{list.length}</b> curated tools</span><span><b>{category ? `1 of ${categories.length}` : categories.length}</b> {category ? 'category' : 'categories'}</span><span><b>One place.</b> More possibilities.</span></div>
      <div className="hero-category-links" aria-label="Popular categories">{['Disassemblers & Decompilers', 'Debuggers', 'Android', '.NET', 'Software', 'Binary Analysis Frameworks'].map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name} ↗</a>)}</div>
    </section>

    {isSoftware && <SavingsCalculator defaultSelected={['adobe', 'postman', 'notion', 'figma']} />}

    <section aria-label="Tool directory" className="directory">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">THE DIRECTORY</span>
          <h2>{category ? `Explore ${category} tools` : 'Find something worth exploring'}</h2>
        </div>
        <span className="directory-note"><span className="live-dot" />{list.length} tools, thoughtfully curated</span>
      </div>

      <form className="filters" role="search" id="filters">
        <label className="search">
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <span className="sr-only">Search tools</span>
          <input name="q" id="search" type="search" placeholder="Search decompilers, debuggers, packet sniffers, or tools…" autoComplete="off" />
        </label>
        <div className="filter-row">
          <label>Category<select name="category" aria-label="Category" defaultValue=""><option value="">All categories</option>{options(categories)}</select></label>
          <label>Platform<select name="platform" aria-label="Platform" defaultValue=""><option value="">All platforms</option>{options(platforms)}</select></label>
          <label>Pricing<select name="pricing" aria-label="Pricing" defaultValue=""><option value="">Free &amp; paid</option>{options(prices)}</select></label>
          <label>License<select name="license" aria-label="License" defaultValue=""><option value="">All licenses</option>{options(licenses)}</select></label>
          <button type="reset" className="reset">Reset filters ↺</button>
        </div>
      </form>
      <div className="results-bar"><p id="result-count" role="status" aria-live="polite">{list.length} tools to explore</p></div>
      <div className="tool-grid" id="tool-grid">{list.map(tool => <ToolCard key={tool.slug} tool={tool} />)}</div>
      <div id="empty" className="empty" hidden><h3>No matching tools</h3><p>Try another search or reset your filters.</p><button id="empty-reset" className="button">Reset filters</button></div>
      <noscript><p>All tools are listed above. Enable JavaScript to use search and filters.</p></noscript>
      <p className="dataset-note">Collection updated {seed.generated}. Check official documentation for details.</p>
    </section>

    {!category && <section className="category-overview" aria-labelledby="category-heading"><div className="directory-bar"><div><span className="eyebrow">WORKFLOWS</span><h2 id="category-heading">Tools by category</h2></div><a className="text-link" href={href('/categories/')}>Browse all categories ↗</a></div><div className="category-chips">{categories.map(name => <a key={name} href={href(`/category/${slug(name)}/`)}>{name}</a>)}</div></section>}
    {!category && <section className="seo-guide" aria-labelledby="guide-heading">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h2 id="guide-heading">Reverse Engineering &amp; Open Source Workflows</h2>
        </div>
      </div>
      <div className="guide-card single">
        <h3>Methodologies &amp; Modern Stacks</h3>
        <p>Static analysis with tools like <strong>Ghidra</strong>, <strong>JADX</strong>, and <strong>Radare2</strong> recovers source code and control-flow graphs without execution. Dynamic debugging with <strong>x64dbg</strong>, <strong>WinDbg</strong>, and <strong>Frida</strong> provides live memory inspection and API hooking, while modern workflows leverage open-source creative and software tools to eliminate proprietary subscription lock-in.</p>
      </div>
    </section>}
    {!category && <section className="faq-section" aria-labelledby="faq-heading">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 id="faq-heading">Frequently Asked Questions</h2>
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
          <h2 id="cat-guide-heading">
            {isSoftware ? 'Open Source Alternatives to Proprietary Commercial Software' :
             isAudio ? 'Open Source Audio Workstations & Sound Production' :
             `Understanding ${category} in Security & Analysis`}
          </h2>
        </div>
      </div>
      <div className="guide-card single">
        <p>{categoryDescriptions[category]} RevKit curates verified open-source and commercial tools to support security researchers, malware analysts, and developers. Compare features, licenses, and supported platforms to choose the right software for your analysis pipeline.</p>
      </div>
    </section>}
    <section className="contribute"><div><span className="eyebrow">BETTER TOGETHER</span><h2>Great tools deserve to be discovered.</h2><p>Know a project we should include? Share it with the community.</p></div><a className="button" href={href('/submit/')}>Submit a tool ↗</a></section>
  </>;
}
