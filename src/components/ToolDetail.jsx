import React from 'react';
import { alternatives, href, seed, getTargetBrand, getQuickStartSteps, catRoles, catKeywords, platStr, pairs, pairRoute } from '../lib/catalog';
import ToolCard, { Badges } from './ToolCard';

export default function ToolDetail({ tool }) {
  const brand = getTargetBrand(tool);
  const steps = getQuickStartSteps(tool);
  const platforms = platStr(tool);
  const catRole = catRoles[tool.category] || tool.category;
  const catKw = catKeywords[tool.category] || 'reverse engineering';
  const h1Title = brand ? `${tool.name} — Free ${brand} Alternative` : `${tool.name} — ${catRole}`;

  const isAdobe = brand === 'Adobe' || tool.tag === 'Adobe Replacement';
  const isCanva = brand === 'Canva' || tool.tag === 'Canva Replacement';
  const isPostman = brand === 'Postman' || tool.tag === 'Postman Replacement';

  const altTitle = brand
    ? `Free ${brand} Replacement & Open-Source RE Profile`
    : `${tool.category} Security & Reverse Engineering Profile`;

  const altSummary = brand
    ? `${tool.name} is a high-performance open-source alternative designed to replace proprietary ${tool.replaces || brand}. It delivers transparent code inspection, native protocol reverse engineering, offline execution, and unrestricted workflow control with zero subscriptions.`
    : `${tool.name} is a proven open-source standard for ${tool.category.toLowerCase()}, vulnerability research, protocol inspection, and binary reverse engineering.`;

  // Find related comparisons for internal linking
  const relatedComparisons = pairs.filter(p => p[0].slug === tool.slug || p[1].slug === tool.slug);

  return <>
    <section className="detail">
      <div>
        <div className="tool-title-row">
          <img className="tool-hero-logo" src={href(`/assets/tools/${tool.slug}.png`)} alt={`${tool.name} logo`} width="52" height="52" />
          <div>
            <div className="eyebrow">{tool.category}</div>
            <h1>{h1Title}</h1>
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

        {/* Section 1: Intent-Driven Download Heading */}
        <div className="tool-section">
          <h2>Download {tool.name} ({platforms}) — Official &amp; GitHub</h2>
          <p className="section-intro">
            Official binaries and verified source code for {tool.name} are available for <strong>{platforms}</strong> under the <strong>{tool.license}</strong> license. Download releases directly from the primary project channels:
          </p>
          <div className="download-cta-box">
            <div className="download-cta-details">
              <strong>{tool.name} ({tool.pricing})</strong>
              <span>License: {tool.license} · Architecture: {platforms} · Offline Privacy Guaranteed</span>
            </div>
            <div className="download-cta-actions">
              {tool.url && <a className="button" href={tool.url} target="_blank" rel="noopener noreferrer">Download Official ↗</a>}
              {tool.github && <a className="button secondary" href={tool.github} target="_blank" rel="noopener noreferrer">GitHub Releases ↗</a>}
            </div>
          </div>
        </div>

        {/* Section 2: Intent-Driven Why Use Heading */}
        <div className="tool-section">
          <h2>Why Use {tool.name} for {catKw}?</h2>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h4>Open format &amp; binary inspection</h4>
              <p>Directly inspect, decode, and extract data structures without proprietary software lock-in.</p>
            </div>
            <div className="highlight-card">
              <h4>Local-first privacy</h4>
              <p>Runs natively on {platforms} with zero telemetry, data tracking, or mandatory cloud accounts.</p>
            </div>
            <div className="highlight-card">
              <h4>Zero subscription fees</h4>
              <p>Licensed under {tool.license} with 100% {tool.pricing.toLowerCase()} access for security analysts, developers, and creators.</p>
            </div>
          </div>
          <ul className="feature-list" style={{ marginTop: '1.25rem' }}>
            <li>{tool.description}</li>
            {brand && <li>Direct open-source replacement for {tool.replaces || brand} with full data sovereignty and zero vendor lock-in.</li>}
            {isAdobe && <li>Engineered for clean-room reverse engineering and native compatibility with standard document workflows.</li>}
            {isCanva && <li>Drag-and-drop canvas layout, rich layer manipulation, and vector/raster export pipelines.</li>}
            {isPostman && <li>Multi-protocol request testing (REST, GraphQL, WebSockets) with Git-friendly local directory storage.</li>}
            <li>Native cross-platform execution on {platforms}.</li>
            <li>Fully verifiable open-source codebase licensed under {tool.license}.</li>
          </ul>
        </div>

        {/* Section 3: Brand Comparison Table (if brand exists) */}
        {brand && (
          <div className="tool-section">
            <div className="table-header-row">
              <h2>{tool.name} vs {brand} — Quick Comparison</h2>
            </div>

            {/* Desktop Full Table View */}
            <div className="comparison-table-desktop">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Comparison Factor</th>
                      <th>{tool.name} (Open Source)</th>
                      <th>{brand} (Commercial)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Cost &amp; Pricing</strong></td>
                      <td>{tool.pricing === 'Free' ? '100% Free' : tool.pricing} ({tool.license})</td>
                      <td>Paid Subscription / Per-Seat Fees</td>
                    </tr>
                    <tr>
                      <td><strong>Data Privacy &amp; Hosting</strong></td>
                      <td>100% Local ({platforms})</td>
                      <td>Cloud Hosted / Proprietary Servers</td>
                    </tr>
                    <tr>
                      <td><strong>Source Code &amp; Auditing</strong></td>
                      <td>Fully Auditable on GitHub</td>
                      <td>Closed Proprietary Black Box</td>
                    </tr>
                    <tr>
                      <td><strong>Reverse Engineering</strong></td>
                      <td>Unrestricted protocol &amp; format inspection</td>
                      <td>Strict Vendor Lock-in &amp; API Limits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Fitted Comparison Cards */}
            <div className="comparison-cards-mobile">
              <div className="spec-card">
                <div className="spec-card-factor">Cost &amp; Pricing</div>
                <div className="spec-card-rows">
                  <div className="spec-card-row spec-row-tool">
                    <span className="spec-lbl">{tool.name}</span>
                    <span className="spec-val">{tool.pricing === 'Free' ? '100% Free' : tool.pricing} ({tool.license})</span>
                  </div>
                  <div className="spec-card-row spec-row-brand">
                    <span className="spec-lbl">{brand}</span>
                    <span className="spec-val">Paid Subscription / Per-Seat</span>
                  </div>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-card-factor">Data Privacy &amp; Hosting</div>
                <div className="spec-card-rows">
                  <div className="spec-card-row spec-row-tool">
                    <span className="spec-lbl">{tool.name}</span>
                    <span className="spec-val">100% Local ({platforms})</span>
                  </div>
                  <div className="spec-card-row spec-row-brand">
                    <span className="spec-lbl">{brand}</span>
                    <span className="spec-val">Cloud Hosted / Remote Servers</span>
                  </div>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-card-factor">Source Code &amp; Auditing</div>
                <div className="spec-card-rows">
                  <div className="spec-card-row spec-row-tool">
                    <span className="spec-lbl">{tool.name}</span>
                    <span className="spec-val">Fully Auditable on GitHub</span>
                  </div>
                  <div className="spec-card-row spec-row-brand">
                    <span className="spec-lbl">{brand}</span>
                    <span className="spec-val">Closed Proprietary Black Box</span>
                  </div>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-card-factor">Reverse Engineering</div>
                <div className="spec-card-rows">
                  <div className="spec-card-row spec-row-tool">
                    <span className="spec-lbl">{tool.name}</span>
                    <span className="spec-val">Unrestricted format inspection</span>
                  </div>
                  <div className="spec-card-row spec-row-brand">
                    <span className="spec-lbl">{brand}</span>
                    <span className="spec-val">Strict Vendor Lock-in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Intent-Driven AI & MCP Integration Heading */}
        <div className="tool-section">
          <h2>{tool.name} AI &amp; MCP Integration / Headless CLI</h2>
          <p className="section-intro">
            Modern reverse engineering workflows combine <strong>{tool.name}</strong> with AI-assisted decompilation, autonomous agents, and Model Context Protocol (MCP) servers:
          </p>
          <div className="highlights-grid">
            <div className="highlight-card">
              <h4>Model Context Protocol (MCP)</h4>
              <p>Connect {tool.name} to AI assistants for automated symbol resolution, disassembly explanation, and decompiled code summarization.</p>
            </div>
            <div className="highlight-card">
              <h4>Headless CLI &amp; batch automation</h4>
              <p>Execute non-interactive batch analysis, binary scanning, and data extraction pipelines in headless CI/CD environments.</p>
            </div>
            <div className="highlight-card">
              <h4>Extensible API &amp; scripting</h4>
              <p>Extend {tool.name} functionality with custom Python, Rust, or native plugins for specialized reverse engineering and research.</p>
            </div>
          </div>
        </div>

        {/* Section 5: Intent-Driven FAQs */}
        <div className="tool-section">
          <h2>Frequently Asked Questions about {tool.name}</h2>
          <div className="faq-grid">
            <article className="faq-card">
              <h3>Is {tool.name} completely free and open source?</h3>
              <p>Yes. {tool.name} is {tool.pricing === 'Free' ? 'completely free to use' : tool.pricing} and published under the open-source {tool.license} license. Source code and releases can be reviewed on GitHub.</p>
            </article>
            <article className="faq-card">
              <h3>How to download {tool.name} for {platforms}?</h3>
              <p>You can download verified release packages of {tool.name} for {platforms} directly from its official site or GitHub repository. Portable binaries and package manager scripts are supported.</p>
            </article>
            <article className="faq-card">
              <h3>What is {tool.name} an alternative to?</h3>
              <p>{tool.name} is an active open-source alternative to {brand ? `proprietary ${tool.replaces || brand}` : `commercial closed-source ${tool.category.toLowerCase()} software`}. It eliminates monthly subscriptions and vendor lock-in with native local execution.</p>
            </article>
          </div>
        </div>
      </div>

      <aside className="detail-sidebar">
        <div className="metadata">
          <span className="eyebrow">TOOL AT A GLANCE</span>
          <dl>
            <dt>License</dt><dd>{tool.license}</dd>
            <dt>Pricing</dt><dd>{tool.pricing}</dd>
            <dt>Platforms</dt><dd>{platforms}</dd>
            <dt>Repository</dt><dd>{tool.github ? <a href={tool.github} target="_blank" rel="noopener noreferrer">{new URL(tool.github).pathname.slice(1)} ↗</a> : 'Not listed'}</dd>
            <dt>Dataset date</dt><dd>{seed.generated}</dd>
          </dl>
          <p className="small muted">Open source allows direct inspection, customization, and local execution. Review license terms for deployment.</p>
        </div>

        {relatedComparisons.length > 0 && (
          <div className="quickstart-box" style={{ marginBottom: '1.25rem' }}>
            <span className="eyebrow">SIDE-BY-SIDE COMPARISONS</span>
            <h3 className="quickstart-title">Compare {tool.name}</h3>
            <ul className="comparison-quicklinks">
              {relatedComparisons.slice(0, 4).map(pair => {
                const other = pair[0].slug === tool.slug ? pair[1] : pair[0];
                return (
                  <li key={pairRoute(pair)}>
                    <a className="text-link" href={href(pairRoute(pair))}>
                      {tool.name} vs {other.name} ↗
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="quickstart-box">
          <span className="eyebrow">QUICK START GUIDE</span>
          <h3 className="quickstart-title">How to Install &amp; Run {tool.name}</h3>
          <ol className="quickstart-steps">
            {steps.map(s => (
              <li key={s.step} className="quickstart-step">
                <div className="step-header">
                  <span className="step-badge">{s.step}</span>
                  <span className="step-name">{s.title}</span>
                </div>
                <p className="step-desc">{s.text}</p>
              </li>
            ))}
          </ol>
          {tool.github && (
            <a className="quickstart-link" href={tool.github} target="_blank" rel="noopener noreferrer">
              <span>View repo &amp; releases</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </aside>
    </section>

    {/* Section 6: Intent-Driven Alternatives Heading */}
    <section className="alternatives">
      <div className="directory-bar">
        <div>
          <span className="eyebrow">COMPARE &amp; REPLACE</span>
          <h2>{tool.name} vs Alternatives</h2>
        </div>
        <span className="muted small">Ranked by category, then platform overlap</span>
      </div>
      <div className="tool-grid">{alternatives(tool).map(item => <ToolCard key={item.slug} tool={item}/>)}</div>
    </section>
  </>;
}
