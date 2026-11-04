import React from 'react';
import { alternatives, href, seed, getTargetBrand } from '../lib/catalog';
import ToolCard, { Badges } from './ToolCard';

export default function ToolDetail({ tool }) {
  const brand = getTargetBrand(tool);
  const isAdobe = brand === 'Adobe' || tool.tag === 'Adobe Replacement';
  const isCanva = brand === 'Canva' || tool.tag === 'Canva Replacement';
  const isPostman = brand === 'Postman' || tool.tag === 'Postman Replacement';

  const altTitle = brand
    ? `Free ${brand} Replacement & Open-Source RE Profile`
    : `${tool.category} Security & Reverse Engineering Profile`;

  const altSummary = brand
    ? `${tool.name} is a high-performance open-source alternative designed to replace proprietary ${tool.replaces || brand}. It delivers transparent code inspection, native protocol reverse engineering, offline execution, and unrestricted workflow control with zero subscriptions.`
    : `${tool.name} is a proven open-source standard for ${tool.category.toLowerCase()}, vulnerability research, protocol inspection, and binary reverse engineering.`;

  return <>
    <section className="detail">
      <div>
        <div className="tool-title-row">
          <img className="tool-hero-logo" src={href(`/assets/tools/${tool.slug}.png`)} alt={`${tool.name} logo`} width="52" height="52" />
          <div>
            <div className="eyebrow">{tool.category}</div>
            <h1>{tool.name}</h1>
          </div>
        </div>
        {tool.replaces && <div className="card-replaces detail-replaces">{tool.replaces}</div>}
        <p className="lead">{tool.description}</p>
        <Badges tool={tool}/>
        <div className="actions">
          {tool.url && <a className="button" href={tool.url} target="_blank" rel="noopener noreferrer">Official website ↗</a>}
          {tool.github && <a className="button secondary" href={tool.github} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>}
        </div>
        <div className="alt-highlight">
          <div className="alt-highlight-badge">{tool.tag || (brand ? `${brand} Replacement` : 'Verified Tool')}</div>
          <h3>{altTitle}</h3>
          <p>{altSummary}</p>
        </div>
        <div className="tool-section">
          <h2>Technical highlights &amp; architecture</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h4>Open format inspection</h4>
              <p>Directly inspect, decode, and extract data structures without proprietary software lock-in.</p>
            </div>
            <div className="highlight-card">
              <h4>Local-first privacy</h4>
              <p>Runs natively on {tool.platforms.join(', ')} with zero telemetry, data tracking, or cloud requirements.</p>
            </div>
            <div className="highlight-card">
              <h4>Zero subscription</h4>
              <p>Licensed under {tool.license} with 100% {tool.pricing.toLowerCase()} access for developers, artists, and analysts.</p>
            </div>
          </div>
        </div>
        <div className="tool-section">
          <h2>Features &amp; capabilities</h2>
          <ul className="feature-list">
            <li>{tool.description}</li>
            {brand && <li>Direct open-source replacement for {tool.replaces || brand} with full data sovereignty and zero vendor lock-in.</li>}
            {isAdobe && <li>Engineered for clean-room reverse engineering and native compatibility with standard document workflows.</li>}
            {isCanva && <li>Drag-and-drop canvas layout, rich layer manipulation, and vector/raster export pipelines.</li>}
            {isPostman && <li>Multi-protocol request testing (REST, GraphQL, WebSockets) with Git-friendly local directory storage.</li>}
            <li>Native cross-platform execution on {tool.platforms.join(', ')}.</li>
            <li>Fully verifiable open-source codebase licensed under {tool.license}.</li>
          </ul>
        </div>
        <div className="tool-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <article className="faq-card">
              <h3>Is {tool.name} completely free and open source?</h3>
              <p>Yes. {tool.name} is {tool.pricing === 'Free' ? 'completely free to use' : tool.pricing} and published under the open-source {tool.license} license. Source code and releases can be reviewed on GitHub.</p>
            </article>
            {brand && (
              <article className="faq-card">
                <h3>Can {tool.name} replace proprietary {brand}?</h3>
                <p>Yes. {tool.name} is an active open-source replacement for {tool.replaces || brand}. It eliminates monthly subscriptions, vendor lock-in, and cloud restrictions by running natively on {tool.platforms.join(', ')}.</p>
              </article>
            )}
            <article className="faq-card">
              <h3>How does {tool.name} support reverse engineering and analysis?</h3>
              <p>{tool.name} provides complete architectural transparency, empowering engineers to inspect source code, debug workflows, reverse engineer proprietary formats, and customize tooling without black-box restrictions.</p>
            </article>
          </div>
        </div>
      </div>
      <aside className="metadata">
        <span className="eyebrow">TOOL AT A GLANCE</span>
        <dl>
          <dt>License</dt><dd>{tool.license}</dd>
          <dt>Pricing</dt><dd>{tool.pricing}</dd>
          <dt>Platforms</dt><dd>{tool.platforms.join(', ')}</dd>
          <dt>Repository</dt><dd>{tool.github ? <a href={tool.github} target="_blank" rel="noopener noreferrer">{new URL(tool.github).pathname.slice(1)} ↗</a> : 'Not listed'}</dd>
          <dt>Dataset date</dt><dd>{seed.generated}</dd>
        </dl>
        <p className="small muted">Open source allows direct inspection, customization, and local execution. Review license terms for deployment.</p>
      </aside>
    </section>
    <section className="alternatives">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">COMPARE &amp; REPLACE</span>
          <h2>Explore alternatives to {tool.name}</h2>
        </div>
        <span className="muted small">Ranked by category, then platform overlap</span>
      </div>
      <div className="tool-grid">{alternatives(tool).map(item => <ToolCard key={item.slug} tool={item}/>)}</div>
    </section>
  </>;
}
