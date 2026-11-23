import React from 'react';
import { href, alternativeHubs } from '../lib/catalog';
import ToolCard from './ToolCard';
import SavingsCalculator from './SavingsCalculator';

export default function Alternatives({ target }) {
  if (!target) {
    // Index view of all proprietary software alternative hubs
    const list = Object.values(alternativeHubs).sort((a, b) => b.tools.length - a.tools.length);
    return (
      <>
        <section className="page-intro">
          <div className="eyebrow">ALTERNATIVES DIRECTORY (2026)</div>
          <h1>
            Free Open Source Alternatives<br />
            <span className="text-gradient">to Commercial Software.</span>
          </h1>
          <p className="lead">
            Eliminate recurring subscription fees. Browse {list.length}+ proprietary tools and switch to transparent, verified open-source and self-hosted alternatives with complete data ownership.
          </p>
        </section>

        <SavingsCalculator defaultSelected={['adobe', 'idapro', 'postman', 'notion', '1password']} />

        <div className="category-grid" style={{ marginBottom: '60px' }}>
          {list.map(hub => (
            <article key={hub.slug} className="category-tile">
              <span className="eyebrow">{hub.tools.length} ALTERNATIVES · {hub.category}</span>
              <h2>
                <a href={href(`/alternatives/${hub.slug}/`)}>
                  {hub.name} Alternatives ↗
                </a>
              </h2>
              <p>
                Save up to <strong>${hub.costUSD}/yr (₹{hub.costINR.toLocaleString('en-IN')}/yr)</strong>. Top open-source replacements: {hub.tools.slice(0, 3).map(t => t.name).join(', ')}.
              </p>
              <a className="text-link" href={href(`/alternatives/${hub.slug}/`)}>
                Explore {hub.name} Alternatives →
              </a>
            </article>
          ))}
        </div>
      </>
    );
  }

  // Detail view for a specific proprietary software replacement hub
  return (
    <>
      <section className="page-intro">
        <div className="eyebrow">OPEN SOURCE REPLACEMENTS · {target.category.toUpperCase()}</div>
        <h1>
          Best Free Open Source <br />
          <span className="text-gradient">{target.name} Alternatives (2026)</span>
        </h1>
        <p className="lead">
          Looking for a free, open-source replacement for <strong>{target.name}</strong>? Compare {target.tools.length} verified alternatives that run natively on {target.platforms} with zero subscription fees and full offline privacy.
        </p>

        {/* Cost Savings Banner */}
        <div className="savings-banner" style={{
          background: '#D5C8E6',
          border: '1.5px solid #3A0F34',
          borderRadius: '12px',
          padding: '18px 24px',
          margin: '24px 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B4D66' }}>
              ANNUAL COST SAVINGS PER SEAT
            </div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#3A0F34', marginTop: '2px' }}>
              Save approx. ${target.costUSD} / seat / year (₹{target.costINR.toLocaleString('en-IN')})
            </div>
          </div>
          <a className="button" href="#calculator">
            Calculate Team Savings 🧮
          </a>
        </div>
      </section>

      {/* Summary Comparison Table */}
      <div className="table-header-row">
        <h2>{target.name} vs Top Open Source Alternatives</h2>
      </div>

      <div className="comparison-table-desktop">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ width: '22%' }}>Tool</th>
                <th scope="col" style={{ width: '16%' }}>License</th>
                <th scope="col" style={{ width: '22%' }}>Supported Platforms</th>
                <th scope="col" style={{ width: '15%' }}>Popularity</th>
                <th scope="col" style={{ width: '25%' }}>Key Advantage</th>
              </tr>
            </thead>
            <tbody>
              {target.tools.map(tool => (
                <tr key={tool.slug}>
                  <td>
                    <strong>
                      <a href={href(`/tools/${tool.slug}/`)}>{tool.name} ↗</a>
                    </strong>
                  </td>
                  <td>
                    <span className="comparison-pill">{tool.license}</span>
                  </td>
                  <td>{tool.platforms.join(', ')}</td>
                  <td>{tool.stars ? `★ ${tool.stars.toLocaleString()} stars` : 'Freeware / Standalone'}</td>
                  <td>{tool.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Savings Calculator */}
      <section id="calculator" className="tool-section" style={{ marginTop: '40px' }}>
        <h2>Cost Savings Calculator: Switching from {target.name}</h2>
        <div className="highlight-card" style={{ padding: '24px' }}>
          <p style={{ margin: '0 0 16px', color: '#3A0F34', fontSize: '14px' }}>
            Calculate how much your engineering team or creative studio saves annually by transitioning to free open-source software:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#fff', border: '1.5px solid #C9B8DB', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6B4D66', fontWeight: 700 }}>Single Developer / Student</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#3A0F34', marginTop: '6px' }}>
                ${target.costUSD} <span style={{ fontSize: '14px', fontWeight: 600 }}>/ yr</span>
              </div>
              <div style={{ fontSize: '13px', color: '#047857', fontWeight: 700, marginTop: '2px' }}>
                ₹{target.costINR.toLocaleString('en-IN')} Saved
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #C9B8DB', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6B4D66', fontWeight: 700 }}>Small Team (5 Seats)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#3A0F34', marginTop: '6px' }}>
                ${(target.costUSD * 5).toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 600 }}>/ yr</span>
              </div>
              <div style={{ fontSize: '13px', color: '#047857', fontWeight: 700, marginTop: '2px' }}>
                ₹{(target.costINR * 5).toLocaleString('en-IN')} Saved
              </div>
            </div>
            <div style={{ background: '#fff', border: '1.5px solid #C9B8DB', borderRadius: '8px', padding: '16px' }}>
              <div style={{ fontSize: '12px', color: '#6B4D66', fontWeight: 700 }}>Department (25 Seats)</div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#3A0F34', marginTop: '6px' }}>
                ${(target.costUSD * 25).toLocaleString()} <span style={{ fontSize: '14px', fontWeight: 600 }}>/ yr</span>
              </div>
              <div style={{ fontSize: '13px', color: '#047857', fontWeight: 700, marginTop: '2px' }}>
                ₹{(target.costINR * 25).toLocaleString('en-IN')} Saved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Cards Grid */}
      <section className="tool-section">
        <h2>Explore {target.name} Alternatives</h2>
        <div className="tool-grid" style={{ marginTop: '20px' }}>
          {target.tools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Targeted FAQs */}
      <section className="faq-section" style={{ marginTop: '48px' }}>
        <div className="directory-bar">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions about {target.name} Alternatives</h2>
          </div>
        </div>
        <div className="faq-grid">
          {target.faqs.map(faq => (
            <article key={faq.question} className="faq-card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
