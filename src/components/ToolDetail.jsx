import React from 'react';
import { alternatives, href, seed } from '../lib/catalog';
import ToolCard, { Badges } from './ToolCard';

export default function ToolDetail({ tool }) {
  const features = tool.features?.length ? tool.features : tool.description.split(/[:;.]\s+/).filter(Boolean);
  return <>
    <section className="detail">
      <div>
        <div className="eyebrow">{tool.category}</div>
        <h1>{tool.name}<span className="accent">.</span></h1>
        <p className="lead">{tool.description}</p>
        <Badges tool={tool}/>
        <div className="actions">
          {tool.url && <a className="button" href={tool.url} target="_blank" rel="noopener noreferrer">Official website ↗</a>}
          {tool.github && <a className="button secondary" href={tool.github} target="_blank" rel="noopener noreferrer">View on GitHub ↗</a>}
        </div>
        <div className="alt-highlight">
          <h3>{tool.tag ? `${tool.tag.replace(' Replacement', '')} Alternative & RE Profile` : 'Reverse Engineering & Alternative Profile'}</h3>
          <p>{tool.tag === 'Adobe Replacement' ? `${tool.name} is a free, open-source reverse engineering alternative to proprietary Adobe software, enabling inspection and recovery of native document formats without subscriptions.` : tool.tag === 'Canva Replacement' ? `${tool.name} is a free, open-source alternative to Canva Pro features, processing graphic design and media tasks locally with zero subscriptions and complete privacy.` : `${tool.name} provides powerful ${tool.category.toLowerCase()} capabilities as an open-source alternative for binary analysis, security audits, and reverse engineering.`}</p>
        </div>
        <h2>Features &amp; capabilities</h2>
        <ul className="feature-list">{features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <p className="small muted">Capabilities summarized from the supplied directory entry. Check the project documentation for current support and requirements.</p>
      </div>
      <aside className="metadata">
        <span className="eyebrow">TOOL AT A GLANCE</span>
        <dl>
          <dt>License</dt><dd>{tool.license}</dd>
          <dt>Pricing</dt><dd>{tool.pricing}</dd>
          <dt>Platforms</dt><dd>{tool.platforms.join(', ')}</dd>
          <dt>Repository</dt><dd>{tool.github ? <a href={tool.github} target="_blank" rel="noopener noreferrer">{new URL(tool.github).pathname.slice(1)} ↗</a> : 'Not listed in seed'}</dd>
          <dt>Dataset date</dt><dd>{seed.generated}</dd>
        </dl>
        <p className="small muted">Free to use and open source are different. Review the upstream license before use.</p>
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
