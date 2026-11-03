import React from 'react';
import { href } from '../lib/catalog';

export function Badges({ tool }) {
  return <div className="bdgs">{tool.tag && <span className={tool.tag.startsWith('Canva') ? 'canva-tag' : tool.tag.startsWith('Adobe') ? 'adobe-tag' : 'postman-tag'}>{tool.tag}</span>}<span className={tool.pricing === 'Free' ? 'free' : 'paid'}>{tool.pricing}</span><span className="plat">{tool.platforms.length === 3 ? 'Win · Mac · Linux' : tool.platforms.join(' · ')}</span></div>;
}

export default function ToolCard({ tool }) {
  const desc = tool.description.length > 76 ? tool.description.slice(0, 73).trimEnd() + '…' : tool.description;
  return <article className="tool-card" data-c={tool.category} data-p={tool.platforms.join('|')} data-pr={tool.pricing} data-l={tool.license}>
    <div className="c-top">
      <img src={href(`/assets/tools/${tool.slug}.png`)} alt=""/>
      <span className="lic">{tool.license}</span>
    </div>
    <a className="t-title" href={href(`/tools/${tool.slug}/`)}>{tool.name}</a>
    <span className="cat-lbl">{tool.category}</span>
    <p>{desc}</p>
    <Badges tool={tool}/>
  </article>;
}
