import React from 'react';
import { href } from '../lib/catalog';

export function Badges({ tool }) {
  return <div className="badges"><span className={`price ${tool.pricing === 'Free' ? 'free' : ''}`}>{tool.pricing}</span>{tool.platforms.map(platform => <span key={platform}>{platform}</span>)}</div>;
}

export default function ToolCard({ tool }) {
  return <article className="tool-card" data-name={tool.name} data-category={tool.category} data-platforms={tool.platforms.join('|')} data-pricing={tool.pricing} data-license={tool.license}>
    <div className="card-top"><span className={`tool-mark mark-${tool.categorySlug}`} aria-hidden="true">{tool.name.slice(0,2).toUpperCase()}</span><span className="license">{tool.license}</span></div>
    <a className="tool-title" href={href(`/tools/${tool.slug}/`)}>{tool.name}<span aria-hidden="true">↗</span></a>
    <a className="category-label" href={href(`/category/${tool.categorySlug}/`)}>{tool.category}</a>
    <p>{tool.description}</p><Badges tool={tool}/>
  </article>;
}
