import React from 'react';
import {
  alternatives,
  href,
  seed,
  getTargetBrand,
  getQuickStartSteps,
  catRoles,
  catKeywords,
  platStr,
  pairs,
  pairRoute,
  getCategorySpecs,
  getCategoryAltTitle,
  getCategoryAltSummary,
  getInstallCommands,
  alternativeHubs,
  starterStacks,
  slug
} from '../lib/catalog';
import ToolCard, { Badges } from './ToolCard';

export default function ToolDetail({ tool }) {
  const brand = getTargetBrand(tool);
  const steps = getQuickStartSteps(tool);
  const platforms = platStr(tool);
  const catRole = catRoles[tool.category] || tool.category;
  const catKw = catKeywords[tool.category] || 'software';
  const h1Title = brand ? `${tool.name} — Free ${brand} Alternative` : `${tool.name} — ${catRole}`;

  const specs = getCategorySpecs(tool);
  const altTitle = getCategoryAltTitle(tool);
  const altSummary = getCategoryAltSummary(tool);
  const installCmds = getInstallCommands(tool);

  const brandSlug = brand ? slug(brand) : null;
  const hub = brandSlug && alternativeHubs[brandSlug] ? alternativeHubs[brandSlug] : null;
  const matchingStacks = starterStacks.filter(s => s.tools.some(t => t.slug === tool.slug));

  // Find related comparisons for internal linking
  const relatedComparisons = pairs.filter(p => p[0].slug === tool.slug || p[1].slug === tool.slug);

  return <>
    <section className="detail">
      <div>
        <div className="tool-title-row">
          <img className="tool-hero-logo" src={href(`/assets/tools/${tool.slug}.png`)} alt={`${tool.name} logo`} width="52" height="52" />
          <div>
            <div className="eyebrow">
              {tool.category}
              {tool.stars ? ` · ★ ${tool.stars.toLocaleString()} STARS` : ''}
              {tool.stars && tool.status ? ` · ${tool.status.toUpperCase()}` : ''}
              {tool.stars && tool.lastCommitFormatted ? ` · UPDATED ${tool.lastCommitFormatted.toUpperCase()}` : ''}
            </div>
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
          <div className="alt-highlight-badge">{tool.tag || (brand ? `${brand} Replacement` : 'Verified Open Source')}</div>
          <h3>{altTitle}</h3>
          <p>{altSummary}</p>
        </div>

        {/* Section 1: Intent-Driven Download & Package Manager Heading */}
        <div className="tool-section">
          <h2>Download &amp; Install {tool.name} ({platforms})</h2>
          <p className="section-intro">
            Official binaries, release archives, and source code for {tool.name} are available for <strong>{platforms}</strong> under the <strong>{tool.license}</strong> license. Download or install via verified channels:
          </p>

          {/* Quick Install Snippet - ONLY rendered if verified install command exists */}
          {installCmds && installCmds.length > 0 && (
            <div className="install-snippet-box" style={{
              background: '#2D1228',
              color: '#E8DFF2',
              borderRadius: '10px',
              padding: '14px 20px',
              margin: '16px 0',
              fontFamily: 'monospace',
              fontSize: '13.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              boxShadow: '0 2px 10px rgba(45,18,40,0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflowX: 'auto' }}>
                <span style={{ color: '#EAAA00', userSelect: 'none' }}>$</span>
                <code>{installCmds[0].cmd}</code>
              </div>
              <span style={{ fontSize: '11px', color: '#EAAA00', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', flexShrink: 0 }}>
                {installCmds[0].manager}
              </span>
            </div>
          )}

          <div className="download-cta-box">
            <div className="download-cta-details">
              <strong>{tool.name} ({tool.pricing})</strong>
              <span>License: {tool.license} · Architecture: {platforms} · Offline Privacy Guaranteed</span>
              <span style={{ display: 'block', fontSize: '11px', color: '#6B4D66', marginTop: '4px' }}>
                Global 196-Country Access · Zero Telemetry · Free from Geoblocking
              </span>
            </div>
            <div className="download-cta-actions">
              {tool.url && <a className="button" href={tool.url} target="_blank" rel="noopener noreferrer">Download Official ↗</a>}
              {tool.github && <a className="button secondary" href={tool.github} target="_blank" rel="noopener noreferrer">GitHub Releases ↗</a>}
            </div>
          </div>
        </div>

        {/* Section 2: Intent-Driven Category-Aware Why Use Heading */}
        <div className="tool-section">
          <h2>Why Use {tool.name} for {catKw}?</h2>
          <div className="highlights-grid">
            {specs.isRE ? (
              <>
                <div className="highlight-card">
                  <h4>Architectures &amp; Formats</h4>
                  <p>Analyzes {specs.architectures} binaries and {specs.formats} formats.</p>
                </div>
                <div className="highlight-card">
                  <h4>Local-first privacy</h4>
                  <p>Runs natively on {platforms} with zero telemetry, data tracking, or mandatory cloud accounts.</p>
                </div>
                <div className="highlight-card">
                  <h4>Zero subscription fees</h4>
                  <p>Licensed under {tool.license} with 100% {tool.pricing.toLowerCase()} access for security analysts and developers.</p>
                </div>
              </>
            ) : (
              <>
                {specs.formats ? (
                  <div className="highlight-card">
                    <h4>Open standards &amp; file compatibility</h4>
                    <p>Works natively with {specs.formats} with zero vendor lock-in or proprietary paywalls.</p>
                  </div>
                ) : (
                  <div className="highlight-card">
                    <h4>Open standards &amp; data privacy</h4>
                    <p>Works natively with open industry standards with complete local control and zero vendor lock-in.</p>
                  </div>
                )}
                <div className="highlight-card">
                  <h4>Local-first privacy</h4>
                  <p>Runs natively on {platforms} with zero telemetry, tracking scripts, or compulsory cloud accounts.</p>
                </div>
                <div className="highlight-card">
                  <h4>Zero subscription fees</h4>
                  <p>Licensed under {tool.license} with 100% {tool.pricing.toLowerCase()} access for developers, creators, and teams.</p>
                </div>
              </>
            )}
          </div>
          <ul className="feature-list" style={{ marginTop: '1.25rem' }}>
            <li>{tool.description}</li>
            {brand && <li>Direct open-source replacement for {tool.replaces || brand} with full data sovereignty and zero vendor lock-in.</li>}
            {specs.isRE ? (
              <>
                <li>Supported CPU architectures: {specs.architectures}.</li>
                <li>Supported file formats: {specs.formats}.</li>
                <li>Primary capability: {specs.focus}.</li>
              </>
            ) : (
              <>
                <li>Supported document &amp; media formats: {specs.formats}.</li>
                <li>Primary workflow advantage: {specs.focus}.</li>
              </>
            )}
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
                      <th scope="col" style={{ width: '25%' }}>Comparison Factor</th>
                      <th scope="col" style={{ width: '38%' }}>{tool.name} (Open Source)</th>
                      <th scope="col" style={{ width: '37%' }}>{brand} (Commercial)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><strong>Cost &amp; Pricing</strong></th>
                      <td>{tool.pricing === 'Free' ? '100% Free' : tool.pricing} ({tool.license})</td>
                      <td>Paid Subscription / Per-Seat Fees</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>Data Privacy &amp; Hosting</strong></th>
                      <td>100% Local ({platforms})</td>
                      <td>Cloud Hosted / Proprietary Servers</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>Source Code &amp; Auditing</strong></th>
                      <td>Fully Auditable on GitHub</td>
                      <td>Closed Proprietary Black Box</td>
                    </tr>
                    <tr>
                      <th scope="row"><strong>Workflow &amp; Formats</strong></th>
                      <td>Open standards with zero lock-in</td>
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
            </div>

            {hub && (
              <p style={{ marginTop: '16px' }}>
                <a className="text-link" href={href(`/alternatives/${hub.slug}/`)}>
                  View all {hub.tools.length} open-source alternatives to {brand} →
                </a>
              </p>
            )}
          </div>
        )}

        {/* Section 4: Only render CLI / MCP / Automation if tool actually supports it */}
        {(tool.has_mcp || tool.has_cli) && (
          <div className="tool-section">
            <h2>{tool.name} CLI &amp; Headless Automation</h2>
            <p className="section-intro">
              Integrate <strong>{tool.name}</strong> into automated terminal workflows, scripting environments, and continuous inspection:
            </p>
            <div className="highlights-grid">
              {tool.has_cli && (
                <div className="highlight-card">
                  <h4>Headless CLI Execution</h4>
                  <p>Execute batch operations and non-interactive scripts directly from terminal or CI/CD pipelines.</p>
                </div>
              )}
              {tool.has_mcp && (
                <div className="highlight-card">
                  <h4>Model Context Protocol (MCP)</h4>
                  <p>Connect {tool.name} with AI assistants and autonomous coding agents for automated inspection.</p>
                </div>
              )}
              <div className="highlight-card">
                <h4>Extensible APIs &amp; Scripting</h4>
                <p>Extend {tool.name} functionality with custom scripts and plugins for specialized analysis.</p>
              </div>
            </div>
          </div>
        )}

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
            {tool.stars ? <>
              <dt>GitHub Stars</dt><dd style={{ color: '#EAAA00', fontWeight: 700 }}>★ {tool.stars.toLocaleString()}</dd>
              <dt>Status</dt><dd><span className="comparison-pill gold">{tool.status || 'Active'}</span></dd>
              {tool.lastCommitFormatted && <>
                <dt>Last Commit</dt><dd>{tool.lastCommitFormatted}</dd>
              </>}
            </> : null}
            <dt>Repository</dt><dd>{tool.github ? <a href={tool.github} target="_blank" rel="noopener noreferrer">{new URL(tool.github).pathname.slice(1)} ↗</a> : 'Not listed'}</dd>
            <dt>Dataset date</dt><dd>{seed.generated}</dd>
          </dl>
          <p className="small muted">Open source allows direct inspection, customization, and local execution. Review license terms for deployment.</p>
        </div>

        {matchingStacks.length > 0 && (
          <div className="quickstart-box" style={{ marginBottom: '1.25rem' }}>
            <span className="eyebrow">FEATURED IN STARTER STACKS</span>
            <h3 className="quickstart-title">Curated Workflows</h3>
            <ul className="comparison-quicklinks">
              {matchingStacks.map(s => (
                <li key={s.slug}>
                  <a className="text-link" href={href(`/stacks/${s.slug}/`)}>
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

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
