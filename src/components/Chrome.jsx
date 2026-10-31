import React from 'react';
import { href } from '../lib/catalog';

export function Logo() {
  return <>
    <span className="logo-symbol" aria-hidden="true">
      <svg viewBox="0 0 128 128" width="28" height="28" fill="none">
        <rect x="26" y="26" width="15" height="76" rx="7" fill="#38bdf8"/>
        <path d="M41 34h33a20 20 0 0 1 0 40H41" stroke="#818cf8" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="m56 70 36 34" stroke="#34d399" strokeWidth="15" strokeLinecap="round"/>
        <path d="m56 70 30-28" stroke="#38bdf8" strokeWidth="11" strokeLinecap="round" opacity="0.95"/>
        <circle cx="33.5" cy="33.5" r="4.5" fill="#ffffff" opacity="0.95"/>
      </svg>
    </span>
    <span>Rev<span className="brand-kit">Kit</span><span className="brand-domain">.online</span></span>
  </>;
}

export function Header({ route }) {
  return <header><div className="shell nav"><a className="brand" aria-label="RevKit home" href={href('/')}><Logo/></a><nav aria-label="Main navigation"><a href={href('/')} aria-current={route === '/' || route.startsWith('/category/') ? 'page' : undefined}>Directory</a><a href={href('/compare/')} aria-current={route.startsWith('/compare/') ? 'page' : undefined}>Compare</a><a href={href('/about/')} className="nav-about" aria-current={route === '/about/' ? 'page' : undefined}>About</a><a className="nav-submit" href={href('/submit/')}>Submit a tool <span aria-hidden="true">↗</span></a></nav></div></header>;
}

export function Footer() {
  return <footer className="shell"><a className="brand" href={href('/')}><Logo/></a><p>Reverse engineering tools, in one place.</p><span>Built for the reverse engineering community.</span><a href={href('/categories/')}>All categories ↗</a><a href={href('/about/')}>About & data ↗</a></footer>;
}

export function Background() {
  return <div className="ambient-background reverse-background" aria-hidden="true">
    <div className="ambient-glow glow-blue"/><div className="ambient-glow glow-purple"/><div className="ambient-grid"/>
    <div className="hex-dump hex-left"><span>OFFSET    HEX BYTES</span><br/>00000000  7F 45 4C 46<br/>00000010  02 01 01 00<br/>00000020  48 8B 05 00<br/>00000030  48 85 C0 74<br/><span>ELF · PE · DEX · MACH-O</span></div>
    <div className="assembly-note"><span>; follow the instructions</span><br/><b>entry_point:</b><br/>&nbsp; push rbp<br/>&nbsp; mov&nbsp; rbp, rsp<br/>&nbsp; test rax, rax<br/>&nbsp; jz&nbsp;&nbsp; loc_004020<br/>&nbsp; ret</div>
    <svg className="control-flow" viewBox="0 0 360 440" fill="none">
      <g className="flow-lines"><path d="M180 72V116M180 182V214M180 214H72V260M180 214H288V260M72 314V355H180M288 314V355H180V390"/><path d="m176 107 4 9 4-9M68 251l4 9 4-9M284 251l4 9 4-9M176 381l4 9 4-9"/></g>
      <g className="flow-blocks"><rect x="117" y="26" width="126" height="46" rx="7"/><rect x="103" y="116" width="154" height="66" rx="7"/><rect x="15" y="260" width="114" height="54" rx="7"/><rect x="231" y="260" width="114" height="54" rx="7"/><rect x="131" y="390" width="98" height="38" rx="7"/></g>
      <g className="flow-labels"><text x="180" y="54">entry_point</text><text x="180" y="144">test rax, rax</text><text x="180" y="164">jz loc_004020</text><text x="72" y="291">loc_004010</text><text x="288" y="291">loc_004020</text><text x="180" y="414">return</text><text x="88" y="236">true</text><text x="265" y="236">false</text></g>
    </svg>
    <div className="binary-strip">01010010 01000101 01010110 &nbsp; // &nbsp; inspect · disassemble · understand</div>
  </div>;
}
