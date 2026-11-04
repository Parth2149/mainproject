import React from 'react';
import { href } from '../lib/catalog';

export function Logo() {
  return <>
    <img src={href('/assets/logo.png')} alt="" width="32" height="32" className="brand-logo-img" />
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
