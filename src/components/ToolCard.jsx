import React from 'react';
import { href } from '../lib/catalog';

export function Badges({ tool }) {
  return <div className="badges">{tool.tag && <span className={tool.tag.startsWith('Canva') ? 'canva-tag' : 'adobe-tag'}>{tool.tag}</span>}<span className={tool.pricing === 'Free' ? 'free' : 'paid'}>{tool.pricing}</span><span className="platform">{tool.platforms.length === 3 ? 'Win · Linux · Mac' : tool.platforms.join(' · ')}</span></div>;
}

export default function ToolCard({ tool }) {
  return <article className="tool-card" data-c={tool.category} data-p={tool.platforms.join('|')} data-pr={tool.pricing} data-l={tool.license}>
    <div className="card-top">
      <img src={href(`/assets/tools/${tool.slug}.png`)} alt=""/>
      <span className="license">{tool.license}</span>
    </div>
    <a className="tool-title" href={href(`/tools/${tool.slug}/`)}>{tool.name}</a>
    <span className="cat-lbl">{tool.category}</span>
    <p>{tool.description}</p>
    <Badges tool={tool}/>
  </article>;
}
