import React from 'react';
import { tools, categories, seed, href } from '../lib/catalog';

export default function About() {
  return (
    <article className="about-page">
      <section className="page-intro">
        <div className="eyebrow">MISSION &amp; MANIFESTO</div>
        <h1>
          Democratizing reverse engineering.<br />
          <span className="text-gradient">For a transparent digital world.</span>
        </h1>
        <p className="lead">
          RevKit is an independent, global reference portal indexing {tools.length}+ verified reverse engineering tools, 
          decompilers, network analyzers, and open-source software replacements across {categories.length} disciplines.
        </p>

        <div className="about-stats-row">
          <div className="about-stat-item">
            <span className="about-stat-number">{tools.length}+</span>
            <span className="about-stat-label">Curated Tools</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">{categories.length}</span>
            <span className="about-stat-label">Disciplines</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">196</span>
            <span className="about-stat-label">Countries Targeted</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">100%</span>
            <span className="about-stat-label">Free Reference</span>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="directory-bar">
          <div>
            <span className="eyebrow">OUR PHILOSOPHY</span>
            <h2>Why RevKit Exists</h2>
          </div>
        </div>
        <div className="about-pillars-grid">
          <div className="about-pillar-card">
            <div className="pillar-header">
              <span className="pillar-badge">01</span>
              <h3>Architectural Transparency</h3>
            </div>
            <p>
              Software should never be an impenetrable black box. We curate and document the tools that empower security researchers, 
              reverse engineers, and developers to inspect compiled binaries, audit network protocols, and verify digital safety.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-header">
              <span className="pillar-badge">02</span>
              <h3>Zero Vendor Lock-In</h3>
            </div>
            <p>
              Proprietary reverse engineering suites and scraping cloud platforms charge thousands of dollars in annual seat licenses. 
              RevKit champions open-source alternatives that run locally on your own hardware with zero telemetry and zero subscriptions.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-header">
              <span className="pillar-badge">03</span>
              <h3>Verified Provenance &amp; Trust</h3>
            </div>
            <p>
              Certified <strong>Minimal Risk</strong> by McAfee TrustedSource. Every listing directs users exclusively to official developer repositories 
              and authentic release archives. We never host third-party installers, run intrusive advertising, or track user browsing.
            </p>
          </div>

          <div className="about-pillar-card">
            <div className="pillar-header">
              <span className="pillar-badge">04</span>
              <h3>Global Accessibility</h3>
            </div>
            <p>
              Engineered with ultra-light static HTML and cold-load budgets under 100KB so students, hobbyists, and professionals in all 196 countries 
              can access vital technical tooling even on low-bandwidth connections.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="directory-bar">
          <div>
            <span className="eyebrow">CURATION &amp; SCOPE</span>
            <h2>What We Cover Across {categories.length} Disciplines</h2>
          </div>
          <a className="text-link" href={href('/categories/')}>Browse all categories ↗</a>
        </div>
        <div className="about-disciplines-list">
          <div className="about-discipline-item">
            <strong>Executable &amp; Binary Decompilation</strong>
            <p>Disassemblers, intermediate representation (IR) lifters, and decompilers for x86, x64, ARM, and MIPS binaries (Ghidra, IDA Free, radare2, Cutter).</p>
          </div>
          <div className="about-discipline-item">
            <strong>Dynamic Debugging &amp; Memory Inspection</strong>
            <p>User-mode and kernel debuggers, process memory scanners, and GDB enhancements (x64dbg, Cheat Engine, Pwndbg, GEF, HyperDbg).</p>
          </div>
          <div className="about-discipline-item">
            <strong>Mobile &amp; Android App Reversing</strong>
            <p>Dalvik bytecode decompilers, APK unpacking toolchains, and dynamic runtime instrumentation (jadx, apktool, Frida, Objection).</p>
          </div>
          <div className="about-discipline-item">
            <strong>Network, API &amp; Protocol Reverse Engineering</strong>
            <p>HTTPS traffic interception, private REST/GraphQL endpoint mapping, and scraping automation (mitmproxy, Burp Suite, Scrapy, Crawlee, Whistle).</p>
          </div>
          <div className="about-discipline-item">
            <strong>Firmware, Hardware &amp; Embedded Systems</strong>
            <p>ROM unpackers, UEFI inspection tools, JTAG/SWD hardware debuggers, and IoT emulation environments (Binwalk, OpenOCD, Flashrom).</p>
          </div>
          <div className="about-discipline-item">
            <strong>Clean-Room Open-Source Desktop Software</strong>
            <p>Independent, auditable creative and productive applications replacing closed-source vendor ecosystems (Blender, GIMP, Kdenlive, LibreOffice).</p>
          </div>
        </div>
      </section>

      <section className="about-section about-trust-box">
        <div className="directory-bar">
          <div>
            <span className="eyebrow">EDITORIAL RIGOR</span>
            <h2>Accuracy, Updates &amp; Community Contributions</h2>
          </div>
        </div>
        <div className="prose">
          <p>
            RevKit is continuously updated (latest dataset revision: <strong>{seed.generated}</strong>). Each tool profile undergoes 
            verification for license validity, active GitHub repository status, and malware-free provenance. We never accept compensation 
            to rank one tool above another.
          </p>
          <p>
            Have a project or discovered an essential open-source decompiler, debugger, or scraper that belongs in the catalog? 
            RevKit is community-driven and accepts pull requests and structured submissions.
          </p>
          <div className="actions" style={{ marginTop: '24px' }}>
            <a className="button" href={href('/submit/')}>Submit a tool for review ↗</a>
            <a className="button secondary" href={href('/')}>Explore the directory →</a>
            <a className="button secondary" href={href('/compare/')}>Compare tools side-by-side ↗</a>
          </div>
        </div>
      </section>
    </article>
  );
}

