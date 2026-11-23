import React from 'react';
import { pairs, pairRoute, href, seed, getWorkflowUseCase } from '../lib/catalog';

export default function Comparisons({ pair }) {
  if (!pair) {
    return (
      <>
        <section className="page-intro">
          <div className="eyebrow">HEAD-TO-HEAD COMPARISONS (2026)</div>
          <h1>
            Compare reverse engineering tools &amp; software.<br />
            <span className="text-gradient">Find your perfect fit.</span>
          </h1>
          <p className="lead">
            In-depth side-by-side comparisons of 150+ top reverse engineering frameworks, decompilers, debuggers, local AI engines, and open-source software replacements. Compare features, platform compatibility, pricing, and open licenses.
          </p>
        </section>

        <div className="comparison-list">
          {pairs.map(([a, b]) => (
            <a key={a.slug + b.slug} className="comparison-card" href={href(pairRoute([a, b]))}>
              <div className="c-top" style={{ height: 'auto', marginBottom: '8px' }}>
                <span className="eyebrow" style={{ margin: 0 }}>{a.category}</span>
                {a.pricing === 'Free' && b.pricing === 'Free' ? (
                  <span className="comparison-pill gold">100% Free</span>
                ) : null}
              </div>
              <h2>
                {a.name} <span className="muted">vs</span> {b.name} ↗
              </h2>
              <p>
                Compare {a.name} and {b.name}: features, platform support, and open licensing.
              </p>
              <div className="comparison-meta-row">
                <span className="comparison-pill">{a.license}</span>
                <span className="comparison-pill">{b.license}</span>
                {a.replaces || b.replaces ? (
                  <span className="comparison-pill gold">
                    {a.replaces ? `${a.replaces} Alt` : `${b.replaces} Alt`}
                  </span>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </>
    );
  }

  const [a, b] = pair;
  const rows = [
    ['Category', a.category, b.category],
    ['Pricing & Access', a.pricing, b.pricing],
    ['License', a.license, b.license],
    ['Supported Platforms', a.platforms.join(', '), b.platforms.join(', ')],
    [
      'Replacement Target',
      a.replaces ? `Direct alternative to ${a.replaces}` : 'Independent open architecture',
      b.replaces ? `Direct alternative to ${b.replaces}` : 'Independent open architecture'
    ],
    [
      'Official Repository',
      a.github ? a.github.replace('https://github.com/', '') : 'Official Project Site',
      b.github ? b.github.replace('https://github.com/', '') : 'Official Project Site'
    ],
    ['Core Capabilities', a.description, b.description]
  ];

  return (
    <>
      <section className="page-intro">
        <div className="eyebrow">HEAD-TO-HEAD COMPARISON</div>
        <h1>
          {a.name} <span className="muted">vs</span><br />
          <span className="text-gradient">{b.name}</span>
        </h1>
        <p className="lead">
          Side-by-side software comparison: evaluate {a.name} and {b.name} across architectural capabilities, platform support, licensing, and workflow fit.
        </p>

        {/* TL;DR Direct Answer box for Google AI Overviews & Featured Snippets */}
        <div className="tldr-box" style={{
          background: '#D5C8E6',
          border: '1.5px solid #3A0F34',
          borderRadius: '12px',
          padding: '18px 22px',
          margin: '22px 0 24px',
          fontSize: '14px',
          lineHeight: '1.65',
          color: '#2D1228'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B4D66', marginBottom: '4px' }}>
            ⚡ TL;DR DIRECT ANSWER (2026 VERDICT)
          </div>
          <p style={{ margin: 0 }}>
            <strong>{a.name}</strong> is best when your primary requirement is {getWorkflowUseCase(a)} ({a.pricing === 'Free' ? '100% Free' : a.pricing}, {a.license}), supporting {a.platforms.join(', ')}. In contrast, <strong>{b.name}</strong> specializes in {getWorkflowUseCase(b)} ({b.pricing === 'Free' ? '100% Free' : b.pricing}, {b.license}) across {b.platforms.join(', ')}.
          </p>
        </div>
      </section>

      <div className="table-header-row">
        <h2>Side-by-Side Comparison</h2>
      </div>

      {/* Desktop Table View */}
      <div className="comparison-table-desktop">
        <div className="table-wrap">
          <table>
            <caption className="sr-only">{a.name} and {b.name} comparison</caption>
            <thead>
              <tr>
                <th scope="col" style={{ width: '22%' }}>Dimension</th>
                <th scope="col" style={{ width: '39%' }}>
                  <a href={href(`/tools/${a.slug}/`)}>{a.name} ↗</a>
                </th>
                <th scope="col" style={{ width: '39%' }}>
                  <a href={href(`/tools/${b.slug}/`)}>{b.name} ↗</a>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, left, right]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td>{left}</td>
                  <td>{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Fitted Comparison Cards (100% Fit, Zero Cut-off) */}
      <div className="comparison-cards-mobile">
        {rows.map(([label, left, right]) => (
          <div className="spec-card" key={label}>
            <div className="spec-card-factor">{label}</div>
            <div className="spec-card-rows">
              <div className="spec-card-row spec-row-tool">
                <span className="spec-lbl"><a href={href(`/tools/${a.slug}/`)}>{a.name} ↗</a></span>
                <span className="spec-val">{left}</span>
              </div>
              <div className="spec-card-row spec-row-brand">
                <span className="spec-lbl"><a href={href(`/tools/${b.slug}/`)}>{b.name} ↗</a></span>
                <span className="spec-val">{right}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-verdict">
        <h3>Quick Verdict &amp; Recommendation</h3>
        <div className="verdict-grid">
          <div className="verdict-card">
            <h4>When to choose {a.name}:</h4>
            <p>
              Choose <strong>{a.name}</strong> when your primary workflow requires {getWorkflowUseCase(a)}. It is published under the <strong>{a.license}</strong> license and runs natively on <strong>{a.platforms.join(', ')}</strong> with {a.pricing.toLowerCase()} access.
            </p>
          </div>
          <div className="verdict-card">
            <h4>When to choose {b.name}:</h4>
            <p>
              Choose <strong>{b.name}</strong> when your primary workflow requires {getWorkflowUseCase(b)}. It is published under the <strong>{b.license}</strong> license and runs natively on <strong>{b.platforms.join(', ')}</strong> with {b.pricing.toLowerCase()} access.
            </p>
          </div>
        </div>
      </div>

      <p className="small muted">
        Based on the {seed.generated} seed dataset. Verify current product terms, release updates, and capabilities with the official projects.
      </p>

      <div className="actions">
        <a className="button" href={href(`/tools/${a.slug}/`)}>
          Explore {a.name} Profile &amp; Quick Start ↗
        </a>
        <a className="button secondary" href={href(`/tools/${b.slug}/`)}>
          Explore {b.name} Profile &amp; Quick Start ↗
        </a>
      </div>
    </>
  );
}
