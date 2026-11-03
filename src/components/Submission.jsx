import React from 'react';
import { categories } from '../lib/catalog';

export default function Submission() {
  return (
    <>
      <section className="page-intro">
        <div className="eyebrow">BUILD THE DIRECTORY WITH US</div>
        <h1>
          Submit a tool to <span className="text-gradient">RevKit.</span>
        </h1>
        <p className="lead">
          Know an open-source tool, decompiler, debugger, or software alternative? Share it directly with our team.
        </p>
      </section>

      <div className="submit-layout">
        <form id="submit-tool" className="submission">
          <label>
            Tool name *
            <input name="name" required maxLength="100" placeholder="e.g. Your favorite decompiler or utility" />
          </label>

          <label>
            What software does it replace or alternative to? (optional)
            <input name="replaces" maxLength="120" placeholder="e.g. Adobe Flash, IDA Pro, Postman, Figma" />
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
            <input name="license" required maxLength="80" placeholder="e.g. MIT, GPL-3.0, Apache-2.0, Commercial" />
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
              placeholder="Explain what the tool does (e.g. Crops and linearizes PDF documents, or Decompiles machine code into C/C++)."
            />
          </label>

          <label>
            Your name or contact email (optional)
            <input name="sender" maxLength="100" placeholder="e.g. yourname@example.com (if you'd like credit)" />
          </label>

          <button className="button" type="submit">
            Send Contribution ✉
          </button>

          <div id="submit-status" role="status" aria-live="polite" />
          <noscript>Please enable JavaScript to submit this form or email us directly at parthghoghari00@gmail.com.</noscript>
        </form>

        <aside className="metadata">
          <h2>How contributions work</h2>
          <ol className="steps">
            <li><strong>Fill out the form:</strong> Enter the project links, license, and what it does.</li>
            <li><strong>Send contribution:</strong> Click Send Contribution to email the details directly to our maintainer.</li>
            <li><strong>Verification &amp; Publication:</strong> We review the project for security, catalog it, and publish it live within 24–48 hours.</li>
          </ol>

          <div className="submit-email-box">
            <span className="email-lbl">Direct Submissions &amp; Contact</span>
            <a className="email-link" href="mailto:parthghoghari00@gmail.com?subject=RevKit%20Tool%20Submission">
              parthghoghari00@gmail.com ↗
            </a>
          </div>

          <p className="small muted">
            Every submission is reviewed against our curated directory criteria. We verify open-source repositories, platform support, and binary integrity before listing.
          </p>
        </aside>
      </div>
    </>
  );
}
