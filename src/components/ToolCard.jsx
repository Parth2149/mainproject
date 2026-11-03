import React from 'react';
import { href } from '../lib/catalog';

export function Badges({ tool }) {
  const tagClass = tool.tag ? (tool.tag.startsWith('Canva') ? 'canva-tag' : tool.tag.startsWith('Adobe') ? 'adobe-tag' : tool.tag.startsWith('Postman') ? 'postman-tag' : 'alt-tag') : '';
  return <div className="bdgs">{tool.tag && <span className={tagClass}>{tool.tag}</span>}<span className={tool.pricing === 'Free' ? 'free' : 'paid'}>{tool.pricing}</span><span className="plat">{tool.platforms.length === 3 ? 'Win/Mac/Linux' : tool.platforms.join('/')}</span></div>;
}

export default function ToolCard({ tool }) {
  const desc = tool.description.length > 48 ? tool.description.slice(0, 45).trimEnd() + '…' : tool.description;
  return <article className="tool-card" data-c={tool.category} data-p={tool.platforms.length === 3 ? '*' : tool.platforms.join('|')} data-pr={tool.pricing} data-l={tool.license}>
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
