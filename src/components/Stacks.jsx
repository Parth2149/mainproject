import React from 'react';
import { href, starterStacks } from '../lib/catalog';
import ToolCard from './ToolCard';

export default function Stacks({ stack }) {
  if (!stack) {
    // Index view of all starter stacks
    return (
      <>
        <section className="page-intro">
          <div className="eyebrow">CURATED TOOLCHAINS (2026)</div>
          <h1>
            Curated Open Source Stacks.<br />
            <span className="text-gradient">Ready for Production &amp; Research.</span>
          </h1>
          <p className="lead">
            Hand-picked, battle-tested software suites for security analysts, reverse engineers, malware researchers, indie developers, and creators. Zero monthly subscription costs.
          </p>
        </section>

        <div className="category-grid" style={{ marginBottom: '60px' }}>
          {starterStacks.map(s => (
            <article key={s.slug} className="category-tile">
              <span className="eyebrow">{s.tools.length} TOOLS · {s.category}</span>
              <h2>
                <a href={href(`/stacks/${s.slug}/`)}>
                  {s.name} ↗
                </a>
              </h2>
              <p>{s.description}</p>
              <div style={{ margin: '12px 0 16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {s.tools.map(t => (
                  <span key={t.slug} className="comparison-pill" style={{ fontSize: '11px' }}>
                    {t.name}
                  </span>
                ))}
              </div>
              <a className="text-link" href={href(`/stacks/${s.slug}/`)}>
                Explore {s.name} →
              </a>
            </article>
          ))}
        </div>
      </>
    );
  }

  // Detail view for a specific stack
  return (
    <>
      <section className="page-intro">
        <div className="eyebrow">CURATED WORKFLOW STACK · {stack.category.toUpperCase()}</div>
        <h1>
          {stack.name}<br />
          <span className="text-gradient">Complete Open Source Setup (2026)</span>
        </h1>
        <p className="lead">
          {stack.description} Designed for <strong>{stack.whoFor}</strong> to deliver a complete, zero-cost workflow on {stack.platforms}.
        </p>
      </section>

      {/* Why Choose This Stack */}
      <section className="tool-section">
        <h2>Why Use the {stack.name}?</h2>
        <div className="highlights-grid">
          <div className="highlight-card">
            <h4>Zero Licensing Fees</h4>
            <p>Every tool in this stack is 100% free and open source, eliminating costly enterprise software licenses.</p>
          </div>
          <div className="highlight-card">
            <h4>End-to-End Interoperability</h4>
            <p>Tools in this bundle integrate smoothly with shared formats, standard protocols, and local file storage.</p>
          </div>
          <div className="highlight-card">
            <h4>Complete Data Privacy</h4>
            <p>Operate 100% offline without telemetry, cloud dependencies, or mandatory user accounts.</p>
          </div>
        </div>
      </section>

      {/* Tools Included */}
      <section className="tool-section">
        <div className="directory-bar">
          <div>
            <span className="eyebrow">STACK TOOLS</span>
            <h2>Tools Included in this Suite ({stack.tools.length})</h2>
          </div>
        </div>
        <div className="tool-grid" style={{ marginTop: '20px' }}>
          {stack.tools.map(tool => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Quick Setup Guide */}
      <section className="tool-section">
        <h2>How to Setup this Stack</h2>
        <ol className="quickstart-steps" style={{ marginTop: '16px' }}>
          <li className="quickstart-step">
            <div className="step-header">
              <span className="step-badge">1</span>
              <span className="step-name">Install Foundation Packages</span>
            </div>
            <p className="step-desc">
              Download the verified standalone packages or package manager releases for {stack.tools.map(t => t.name).join(', ')}.
            </p>
          </li>
          <li className="quickstart-step">
            <div className="step-header">
              <span className="step-badge">2</span>
              <span className="step-name">Configure Isolated Environment</span>
            </div>
            <p className="step-desc">
              Set up your local workspace, project directories, or hypervisor sandbox. Ensure execution permissions are active.
            </p>
          </li>
          <li className="quickstart-step">
            <div className="step-header">
              <span className="step-badge">3</span>
              <span className="step-name">Execute Analysis &amp; Production</span>
            </div>
            <p className="step-desc">
              Chain tools across your workflow with complete data sovereignty and zero vendor lock-in.
            </p>
          </li>
        </ol>
      </section>

      {/* FAQs */}
      <section className="faq-section" style={{ marginTop: '48px' }}>
        <div className="directory-bar">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Frequently Asked Questions about {stack.name}</h2>
          </div>
        </div>
        <div className="faq-grid">
          <article className="faq-card">
            <h3>Is this entire stack free for commercial use?</h3>
            <p>Yes. The tools in this stack are licensed under verified open-source licenses allowing commercial research and development.</p>
          </article>
          <article className="faq-card">
            <h3>Which operating systems are supported?</h3>
            <p>This stack runs natively across {stack.platforms}. Check each individual tool page for portable and package manager installation instructions.</p>
          </article>
          <article className="faq-card">
            <h3>Can I customize or replace individual tools in this stack?</h3>
            <p>Absolutely. RevKit curates open-architecture tools that can be swapped out with any compatible alternative from our directory.</p>
          </article>
        </div>
      </section>
    </>
  );
}
