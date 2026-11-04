import React from 'react';
import { pairs, pairRoute, href, seed } from '../lib/catalog';

export default function Comparisons({ pair }) {
  if (!pair) {
    return (
      <>
        <section className="page-intro">
          <div className="eyebrow">HEAD-TO-HEAD COMPARISONS</div>
          <h1>
            Compare reverse engineering tools &amp; software.<br />
            <span className="text-gradient">Find your perfect fit.</span>
          </h1>
          <p className="lead">
            In-depth side-by-side comparisons of 64+ top reverse engineering frameworks, decompilers, debuggers, local AI engines, and open-source software replacements. Compare features, platform compatibility, pricing, and open licenses.
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
                Compare {a.name} and {b.name}: architecture, platform support ({a.platforms.slice(0, 2).join('/')} vs {b.platforms.slice(0, 2).join('/')}), open licensing, and workflow capabilities.
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
      a.repository ? a.repository : 'Official Project Site',
      b.repository ? b.repository : 'Official Project Site'
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
      </section>

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

      <div className="comparison-verdict">
        <h3>Quick Verdict &amp; Recommendation</h3>
        <div className="verdict-grid">
          <div className="verdict-card">
            <h4>When to choose {a.name}:</h4>
            <p>
              Choose <strong>{a.name}</strong> if you need {a.description.toLowerCase().replace(/\.$/, '')}. It is published under the <strong>{a.license}</strong> license and runs on <strong>{a.platforms.join(', ')}</strong>.
            </p>
          </div>
          <div className="verdict-card">
            <h4>When to choose {b.name}:</h4>
            <p>
              Choose <strong>{b.name}</strong> if you need {b.description.toLowerCase().replace(/\.$/, '')}. It is published under the <strong>{b.license}</strong> license and runs on <strong>{b.platforms.join(', ')}</strong>.
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
