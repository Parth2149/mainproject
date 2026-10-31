/**
 * RevKit (revkit.online) - Coming Soon Interactions
 * Particle ambient canvas, interactive email subscription with storage & validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initFormHandler();
});

/* --------------------------------------------------------------------------
   Ambient Particle System
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.45 + 0.15;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 180, 252, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines if particles are close
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   Notify Form Handler
   -------------------------------------------------------------------------- */
function initFormHandler() {
  const form = document.getElementById('notify-form');
  const emailInput = document.getElementById('email-input');
  const submitBtn = document.getElementById('submit-btn');
  const successBox = document.getElementById('success-box');

  if (!form || !emailInput || !submitBtn || !successBox) return;

  // Check if user has already joined
  const storedEmail = localStorage.getItem('revkit_waitlist_email');
  if (storedEmail) {
    showSuccess(storedEmail);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      emailInput.style.borderColor = '#EF4444';
      emailInput.focus();
      highlightError(emailInput);
      return;
    }

    // Button loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Saving...</span>`;

    setTimeout(() => {
      // Save locally so the user gets persistent visual confirmation
      try {
        localStorage.setItem('revkit_waitlist_email', email);
        const waitlist = JSON.parse(localStorage.getItem('revkit_waitlist_all') || '[]');
        if (!waitlist.includes(email)) {
          waitlist.push(email);
          localStorage.setItem('revkit_waitlist_all', JSON.stringify(waitlist));
        }
      } catch (err) {
        console.warn('LocalStorage error:', err);
      }

      showSuccess(email);
    }, 600);
  });

  function showSuccess(email) {
    form.style.display = 'none';
    successBox.classList.remove('hidden');
    const emailMsg = successBox.querySelector('p');
    if (emailMsg) {
      emailMsg.textContent = `Confirmation saved for ${email}. We'll send your invite as soon as we open.`;
    }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function highlightError(element) {
    element.parentElement.style.borderColor = 'rgba(239, 68, 68, 0.7)';
    element.parentElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
    setTimeout(() => {
      element.parentElement.style.borderColor = '';
      element.parentElement.style.boxShadow = '';
    }, 2000);
  }
}

