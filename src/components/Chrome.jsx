import React from 'react';
import { href } from '../lib/catalog';

export function Logo() {
  return <>
    <span className="logo-symbol" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="30" height="30" fill="none">
        <defs>
          <linearGradient id="rk-hdr-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1844" />
            <stop offset="60%" stopColor="#3A0F34" />
            <stop offset="100%" stopColor="#260822" />
          </linearGradient>
          <linearGradient id="rk-hdr-stem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E5DBEE" />
          </linearGradient>
          <linearGradient id="rk-hdr-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD452" />
            <stop offset="60%" stopColor="#EAAA00" />
            <stop offset="100%" stopColor="#C28700" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#rk-hdr-bg)" stroke="#EAAA00" strokeWidth="1.5" strokeOpacity="0.5" />
        <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.18" />
        <rect x="16" y="16" width="7" height="32" rx="3.5" fill="url(#rk-hdr-stem)" />
        <path d="M22 16 H35 C41.6 16 46 20.4 46 26 C46 31.6 41.6 36 35 36 H22" fill="none" stroke="url(#rk-hdr-stem)" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 33.5 L43.5 47" stroke="url(#rk-hdr-gold)" strokeWidth="6.5" strokeLinecap="round" />
        <circle cx="32" cy="26" r="3.2" fill="url(#rk-hdr-gold)" />
        <circle cx="32" cy="26" r="1.3" fill="#3A0F34" />
      </svg>
    </span>
    <span>Rev<span className="brand-kit">Kit</span><span className="brand-domain">.online</span></span>
  </>;
}

export function Header({ route }) {
  return <header><div className="shell nav"><a className="brand" aria-label="RevKit home" href={href('/')}><Logo/></a><nav aria-label="Main navigation"><a href={href('/')} aria-current={route === '/' || (route.startsWith('/category/') && !route.startsWith('/category/software/')) ? 'page' : undefined}>Directory</a><a href={href('/category/software/')} aria-current={route.startsWith('/category/software/') ? 'page' : undefined}>Software</a><a href={href('/compare/')} aria-current={route.startsWith('/compare/') ? 'page' : undefined}>Compare</a><a href={href('/about/')} className="nav-about" aria-current={route === '/about/' ? 'page' : undefined}>About</a><a className="nav-submit" href={href('/submit/')}>Submit a tool <span aria-hidden="true">↗</span></a></nav></div></header>;
}

export function Footer() {
  return <footer className="shell"><a className="brand" href={href('/')}><Logo/></a><p>Reverse engineering tools, in one place.</p><span>Curated for reverse engineering.</span><a href={href('/categories/')}>All categories ↗</a><a href={href('/about/')}>About & data ↗</a></footer>;
}

export function Background() {
  return <div className="ambient-background" aria-hidden="true">
    <div className="ambient-grid"/>
  </div>;
}
