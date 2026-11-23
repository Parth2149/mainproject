import React, { useState } from 'react';
import { href } from '../lib/catalog';

const PAID_TOOLS = [
  {
    id: 'adobe',
    name: 'Adobe Creative Cloud',
    costUSD: 600,
    costINR: 54000,
    replacements: [
      { name: 'GIMP', slug: 'gimp' },
      { name: 'Krita', slug: 'krita' },
      { name: 'Blender', slug: 'blender' },
      { name: 'Kdenlive', slug: 'kdenlive' }
    ]
  },
  {
    id: 'idapro',
    name: 'IDA Pro Commercial',
    costUSD: 1900,
    costINR: 170000,
    replacements: [
      { name: 'Ghidra', slug: 'ghidra' },
      { name: 'Cutter', slug: 'cutter' },
      { name: 'Radare2', slug: 'radare2' }
    ]
  },
  {
    id: 'postman',
    name: 'Postman Team',
    costUSD: 360,
    costINR: 32000,
    replacements: [
      { name: 'Bruno', slug: 'bruno' },
      { name: 'Hoppscotch', slug: 'hoppscotch' }
    ]
  },
  {
    id: 'notion',
    name: 'Notion Plus / Team',
    costUSD: 120,
    costINR: 11000,
    replacements: [
      { name: 'Obsidian', slug: 'obsidian' },
      { name: 'AppFlowy', slug: 'appflowy' }
    ]
  },
  {
    id: 'figma',
    name: 'Figma Professional',
    costUSD: 180,
    costINR: 16000,
    replacements: [
      { name: 'Penpot', slug: 'penpot' }
    ]
  },
  {
    id: 'zapier',
    name: 'Zapier Starter',
    costUSD: 240,
    costINR: 21000,
    replacements: [
      { name: 'n8n', slug: 'n8n' }
    ]
  },
  {
    id: '1password',
    name: '1Password Business',
    costUSD: 240,
    costINR: 21000,
    replacements: [
      { name: 'Bitwarden', slug: 'bitwarden' },
      { name: 'KeePassXC', slug: 'keepassxc' }
    ]
  },
  {
    id: 'm365',
    name: 'Microsoft 365',
    costUSD: 100,
    costINR: 9000,
    replacements: [
      { name: 'LibreOffice', slug: 'libreoffice' }
    ]
  }
];

export default function SavingsCalculator({ defaultSelected = ['adobe', 'postman', 'notion'] }) {
  const [selected, setSelected] = useState(new Set(defaultSelected));

  const toggleTool = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedTools = PAID_TOOLS.filter(t => selected.has(t.id));
  const totalUSD = selectedTools.reduce((sum, t) => sum + t.costUSD, 0);
  const totalINR = selectedTools.reduce((sum, t) => sum + t.costINR, 0);

  return (
    <section className="savings-banner" style={{
      background: '#D5C8E6',
      border: '1.5px solid #3A0F34',
      borderRadius: '12px',
      padding: '22px 24px',
      margin: '0 auto 36px',
      maxWidth: '1260px'
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6B4D66' }}>
            🧮 INTERACTIVE ANNUAL COST SAVINGS CALCULATOR
          </div>
          <h3 style={{ margin: '4px 0 6px', fontSize: '18px', color: '#3A0F34', fontWeight: 800 }}>
            Calculate Your Savings: Switch from Proprietary Subscriptions to Open Source
          </h3>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#2D1228' }}>
            Check off the commercial software your team or studio pays for to see total annual budget reclaimed:
          </p>
        </div>

        <div style={{
          background: '#3A0F34',
          color: '#F4EFF9',
          borderRadius: '10px',
          padding: '12px 20px',
          textAlign: 'right',
          flexShrink: 0
        }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#EAAA00', fontWeight: 800 }}>
            Estimated Annual Savings ({selected.size} tool{selected.size === 1 ? '' : 's'})
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: '#fff', marginTop: '2px' }}>
            ${totalUSD.toLocaleString()} <span style={{ fontSize: '15px', fontWeight: 600, color: '#EAAA00' }}>/ yr</span>
          </div>
          <div style={{ fontSize: '13px', color: '#6EE7B7', fontWeight: 700 }}>
            ≈ ₹{totalINR.toLocaleString('en-IN')} / seat / year
          </div>
        </div>
      </div>

      {/* Tool Checkbox Selector Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '10px',
        marginBottom: '18px'
      }}>
        {PAID_TOOLS.map(tool => {
          const isChecked = selected.has(tool.id);
          return (
            <label
              key={tool.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: isChecked ? '#fff' : 'rgba(255,255,255,0.5)',
                border: isChecked ? '1.5px solid #3A0F34' : '1px solid #C9B8DB',
                borderRadius: '8px',
                padding: '10px 14px',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleTool(tool.id)}
                style={{ accentColor: '#3A0F34', cursor: 'pointer', width: '16px', height: '16px' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#3A0F34' }}>{tool.name}</div>
                <div style={{ fontSize: '11px', color: '#6B4D66' }}>
                  ${tool.costUSD}/yr (₹{tool.costINR.toLocaleString('en-IN')})
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Recommended Open Source Replacements for Selected Tools */}
      {selectedTools.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '13px',
          color: '#2D1228',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px'
        }}>
          <strong style={{ color: '#3A0F34' }}>Your 100% Free Replacements on RevKit:</strong>
          {selectedTools.map(tool => (
            <span key={tool.id} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ color: '#6B4D66' }}>{tool.name}:</span>
              {tool.replacements.map((r, i) => (
                <React.Fragment key={r.slug}>
                  <a
                    href={href(`/tools/${r.slug}/`)}
                    style={{ color: '#3A0F34', fontWeight: 700, textDecoration: 'underline' }}
                  >
                    {r.name}
                  </a>
                  {i < tool.replacements.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
              <span style={{ color: '#C9B8DB', margin: '0 4px' }}>•</span>
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
