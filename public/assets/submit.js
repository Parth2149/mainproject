const form = document.querySelector('#submit-tool');
const status = document.querySelector('#submit-status');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const platforms = data.getAll('platform');

    if (!platforms.length) {
      status.innerHTML = '<div class="status-error">⚠️ Please select at least one supported platform.</div>';
      const firstCheck = form.querySelector('[name="platform"]');
      if (firstCheck) firstCheck.focus();
      return;
    }

    const name = (data.get('name') || '').trim();
    const replaces = (data.get('replaces') || '').trim();
    const url = (data.get('url') || '').trim();
    const github = (data.get('github') || '').trim();
    const category = data.get('category') || '';
    const pricing = data.get('pricing') || 'Free';
    const license = (data.get('license') || '').trim();
    const description = (data.get('description') || '').trim();
    const sender = (data.get('sender') || '').trim();

    if (url && !url.startsWith('https://')) {
      status.innerHTML = '<div class="status-error">⚠️ Please provide a valid HTTPS website URL (e.g. https://example.org).</div>';
      form.elements['url'].focus();
      return;
    }

    if (github && !github.startsWith('https://')) {
      status.innerHTML = '<div class="status-error">⚠️ Please provide a valid HTTPS GitHub URL.</div>';
      form.elements['github'].focus();
      return;
    }

    const subject = encodeURIComponent(`[RevKit Tool Submission] ${name}`);
    const bodyLines = [
      'Hi Parth,',
      '',
      'I would like to submit a new tool to RevKit (revkit.online):',
      '',
      `• Tool Name: ${name}`,
      replaces ? `• Replaces / Alternative To: ${replaces}` : '• Replaces / Alternative To: Developer / RE Tool',
      `• Official Website: ${url}`,
      `• GitHub Repository: ${github || 'N/A'}`,
      `• Category: ${category}`,
      `• Pricing: ${pricing}`,
      `• License: ${license}`,
      `• Supported Platforms: ${platforms.join(', ')}`,
      '',
      '• What it does (Description):',
      description,
      '',
      sender ? `• Submitted by: ${sender}` : '',
      '---',
      'Submitted via RevKit.online Tool Directory'
    ].filter(Boolean).join('\n');

    const mailtoUrl = `mailto:parthghoghari00@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyLines)}`;

    status.innerHTML = `
      <div class="submit-success">
        <div class="success-header">✉ Opening your email client to send contribution...</div>
        <p>If your email app does not open automatically, click the button below to send your submission directly to <strong>parthghoghari00@gmail.com</strong>:</p>
        <div class="email-fallback">
          <a class="button" href="${mailtoUrl}">Open Email App ↗</a>
          <a class="button secondary" href="mailto:parthghoghari00@gmail.com?subject=${subject}">Email parthghoghari00@gmail.com directly</a>
        </div>
      </div>
    `;

    // Trigger user's email client
    window.location.href = mailtoUrl;
  });
}
