import React from 'react';
import { categories } from '../lib/catalog';

export default function Submission() {
  return (
    <>
      <section className="page-intro">
        <div className="eyebrow">CONTRIBUTE TO REVKIT (2026)</div>
        <h1>
          Submit a tool to <span className="text-gradient">RevKit.</span>
        </h1>
        <p className="lead">
          Know an open-source tool, decompiler, debugger, or software alternative that deserves to be indexed? Submit it directly for editorial review.
        </p>
      </section>

      {/* Contribution Guidelines Box */}
      <section className="savings-banner" style={{
        background: '#D5C8E6',
        border: '1.5px solid #3A0F34',
        borderRadius: '12px',
        padding: '20px 24px',
        margin: '0 auto 32px',
        maxWidth: '760px'
      }}>
        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B4D66' }}>
          EDITORIAL VERIFICATION CRITERIA
        </div>
        <h3 style={{ margin: '6px 0 8px', fontSize: '16px', color: '#3A0F34' }}>
          Submission Guidelines &amp; Quality Standards
        </h3>
        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13.5px', lineHeight: '1.7', color: '#2D1228' }}>
          <li><strong>Verified License:</strong> The project must have a recognized open-source or permissive license (e.g. MIT, Apache-2.0, GPL, BSD).</li>
          <li><strong>Security &amp; Privacy:</strong> Software must be free of unwanted telemetry, crypto-miners, bundleware, or adware.</li>
          <li><strong>Secure URLs:</strong> Official website and GitHub repository links must use valid HTTPS.</li>
          <li><strong>Functional Releases:</strong> Projects must have functional binaries or build instructions for at least one desktop or mobile OS.</li>
        </ul>
      </section>

      {/* Quick Submission CTA Buttons (GitHub Issue & Mailto) */}
      <div style={{
        maxWidth: '760px',
        margin: '0 auto 28px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        justifyContent: 'center'
      }}>
        <a
          className="button"
          href="https://github.com/Parth2149/revkit-submissions/issues/new?title=%5BNew+Tool+Submission%5D+&body=Tool+Name%3A%0AWebsite%3A%0AGitHub%3A%0ACategory%3A%0APlatforms%3A%0ALicense%3A%0ADescription%3A"
          target="_blank"
          rel="noopener noreferrer"
        >
          Submit via GitHub Issue ↗
        </a>
        <a
          className="button secondary"
          href="mailto:submit@revkit.online?subject=RevKit%20Tool%20Submission&body=Tool%20Name%3A%0AWebsite%3A%0AGitHub%3A%0ACategory%3A%0APlatforms%3A%0ALicense%3A%0ADescription%3A"
        >
          Email Submission Directly ✉
        </a>
      </div>

      <div className="submit-layout">
        <form
          id="submit-tool"
          className="submission"
          action="mailto:submit@revkit.online"
          method="GET"
          encType="text/plain"
          aria-label="Tool submission form"
        >
          <label>
            Tool name *
            <input name="name" required maxLength="100" placeholder="e.g. Your favorite decompiler, debugger or utility" />
          </label>

          <label>
            What software does it replace or alternative to? (optional)
            <input name="replaces" maxLength="120" placeholder="e.g. IDA Pro, Adobe Photoshop, Postman, Figma, Notion" />
          </label>

          <div className="two-col">
            <label>
              Official website *
              <input name="url" type="url" required placeholder="https://example.org" />
            </label>

            <label>
              GitHub repository (optional)
              <input name="github" type="url" placeholder="https://github.com/owner/repository" />
            </label>
          </div>

          <div className="two-col">
            <label>
              Category *
              <select name="category" aria-label="Category">
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>

            <label>
              Pricing *
              <select name="pricing" aria-label="Pricing">
                {['Free', 'Paid', 'Freemium', 'Commercial'].map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
          </div>

          <label>
            License *
            <input name="license" required maxLength="80" placeholder="e.g. MIT, GPL-3.0, Apache-2.0, BSD-3-Clause" />
          </label>

          <fieldset>
            <legend>Supported platforms (select at least one) *</legend>
            {['Windows', 'Linux', 'macOS', 'Android', 'iOS'].map(platform => (
              <label key={platform} className="check">
                <input type="checkbox" name="platform" value={platform} />
                {platform}
              </label>
            ))}
          </fieldset>

          <label>
            What does the tool do? (Description) *
            <textarea
              name="description"
              required
              minLength="20"
              maxLength="500"
              rows="4"
              placeholder="Explain the tool's core capabilities (e.g. Decompiles Dalvik bytecode into Java source code, or Edits vector graphics with layers and SVG export)."
            />
          </label>

          <label>
            Your name or contact email (optional)
            <input name="sender" maxLength="100" placeholder="e.g. maintainer@example.com (if you'd like credit)" />
          </label>

          <button className="button" type="submit">
            Send Tool Submission ✉
          </button>

          <div id="submit-status" role="status" aria-live="polite" />
          <noscript>
            <p style={{ marginTop: '12px', fontSize: '13px' }}>
              Please enable JavaScript or send submissions directly via email to <strong>submit@revkit.online</strong>.
            </p>
          </noscript>
        </form>
      </div>
    </>
  );
}
