import React from 'react';
import { href } from '../lib/catalog';

export function Logo() {
  return <>
    <span className="logo-symbol" aria-hidden="true">
      <svg viewBox="0 0 64 64" width="30" height="30" fill="none">
        <defs>
          <linearGradient id="v-bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E1746" />
            <stop offset="50%" stopColor="#3A0F34" />
            <stop offset="100%" stopColor="#240720" />
          </linearGradient>
          <linearGradient id="v-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE48A" />
            <stop offset="45%" stopColor="#EAAA00" />
            <stop offset="100%" stopColor="#B87D00" />
          </linearGradient>
          <linearGradient id="v-plat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D5C7E6" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="16" fill="url(#v-bg)" stroke="#EAAA00" strokeWidth="1.5" strokeOpacity="0.55" />
        <rect x="3.5" y="3.5" width="57" height="57" rx="14.5" stroke="#FFFFFF" strokeWidth="0.75" strokeOpacity="0.18" />
        <path d="M22 17 H16 C13.8 17 12 18.8 12 21 V43 C12 45.2 13.8 47 16 47 H22" stroke="url(#v-plat)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M42 17 H48 C50.2 17 52 18.8 52 21 V43 C52 45.2 50.2 47 48 47 H42" stroke="url(#v-plat)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="21" r="1.5" fill="url(#v-gold)" />
        <circle cx="48" cy="21" r="1.5" fill="url(#v-gold)" />
        <circle cx="16" cy="43" r="1.5" fill="url(#v-gold)" />
        <circle cx="48" cy="43" r="1.5" fill="url(#v-gold)" />
        <path d="M15 32 H19" stroke="#EAAA00" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        <path d="M45 32 H49" stroke="#EAAA00" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        <circle cx="25" cy="32" r="7.5" stroke="url(#v-gold)" strokeWidth="3.5" />
        <circle cx="25" cy="32" r="2.8" fill="url(#v-gold)" />
        <path d="M32.5 32 H48" stroke="url(#v-gold)" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M40 32 V38.5" stroke="url(#v-gold)" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M46 32 V39.5" stroke="url(#v-gold)" strokeWidth="3.2" strokeLinecap="round" />
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
