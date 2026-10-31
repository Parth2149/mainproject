import React from 'react';
import { href } from '../lib/catalog';

export function Badges({ tool }) {
  return <div className="badges">{tool.tag && <span className={tool.tag.startsWith('Canva') ? 'canva-tag' : 'adobe-tag'}>{tool.tag}</span>}<span className={tool.pricing === 'Free' ? 'free' : 'paid'}>{tool.pricing}</span><span className="platform">{tool.platforms.length === 3 ? 'Win · Linux · Mac' : tool.platforms.join(' · ')}</span></div>;
}

export default function ToolCard({ tool }) {
  return <article className="tool-card" data-category={tool.category} data-platforms={tool.platforms.join('|')} data-pricing={tool.pricing} data-license={tool.license}>
    <div className="card-top">
      <img src={href(`/assets/tools/${tool.slug}.png`)} alt=""/>
      <span className="license">{tool.license}</span>
    </div>
    <a className="tool-title" href={href(`/tools/${tool.slug}/`)}>{tool.name}</a>
    <span className="category-label">{tool.category}</span>
    <p>{tool.description}</p>
    <Badges tool={tool}/>
  </article>;
}
