import React from 'react';
import { href } from '../lib/catalog';

export function Logo() {
  return <>
    <span className="logo-symbol" aria-hidden="true">
      <svg viewBox="0 0 128 128" width="28" height="28" fill="none">
        <rect x="26" y="26" width="14" height="20" rx="4" fill="#38bdf8"/>
        <rect x="26" y="50" width="14" height="26" rx="4" fill="#38bdf8"/>
        <rect x="26" y="80" width="14" height="22" rx="4" fill="#38bdf8"/>
        <path d="M40 33h35a18 18 0 0 1 0 36H40" stroke="#8b5cf6" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m54 69 36 33" stroke="#34d399" strokeWidth="14" strokeLinecap="round"/>
        <path d="M82 82l-14-3 3 14" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m58 45-6 6 6 6" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
        <circle cx="95" cy="51" r="5" fill="#38bdf8"/>
      </svg>
    </span>
    <span>Rev<span className="brand-kit">Kit</span><span className="brand-domain">.online</span></span>
  </>;
}

export function Header({ route }) {
  return <header><div className="shell nav"><a className="brand" aria-label="RevKit home" href={href('/')}><Logo/></a><nav aria-label="Main navigation"><a href={href('/')} aria-current={route === '/' || route.startsWith('/category/') ? 'page' : undefined}>Directory</a><a href={href('/compare/')} aria-current={route.startsWith('/compare/') ? 'page' : undefined}>Compare</a><a href={href('/about/')} className="nav-about" aria-current={route === '/about/' ? 'page' : undefined}>About</a><a className="nav-submit" href={href('/submit/')}>Submit a tool <span aria-hidden="true">↗</span></a></nav></div></header>;
}

export function Footer() {
  return <footer className="shell"><a className="brand" href={href('/')}><Logo/></a><p>Reverse engineering tools, in one place.</p><span>Curated for reverse engineering.</span><a href={href('/categories/')}>All categories ↗</a><a href={href('/about/')}>About & data ↗</a></footer>;
}

export function Background() {
  return <div className="ambient-background" aria-hidden="true">
    <div className="ambient-glow glow-blue"/>
    <div className="ambient-glow glow-purple"/>
    <div className="ambient-grid"/>
  </div>;
}
