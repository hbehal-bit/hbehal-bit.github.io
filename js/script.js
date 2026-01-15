// Watchdog Accounting — script.js
// Core site functionality: Navigation, Theme, Contact Form, Home Feed.

(() => {
  // 1. Auto-update Footer Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // Force display change for links when menu is open
    Array.from(nav.querySelectorAll('a')).forEach(a => {
      a.style.display = a.style.display === 'inline-block' ? '' : 'inline-block';
    });
  });

  // 3. Theme Toggle (Light/Dark)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
    themeToggle.textContent = current === 'light' ? '🌗' : '🌞';
  });

  // 4. Contact Form & Modal Logic
  const contactForm = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalOk = document.getElementById('modalOk');
  const resetForm = document.getElementById('resetForm');

  function showModal() {
    if (modal) modal.setAttribute('aria-hidden', 'false');
  }
  function hideModal() {
    if (modal) modal.setAttribute('aria-hidden', 'true');
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const form = new FormData(contactForm);
      // Simple validation
      if (!form.get('company') || !form.get('name') || !form.get('email')) {
        alert('Please fill required fields');
        return;
      }
      showModal();
      contactForm.reset();
    });
  }

  if (closeModal) closeModal.addEventListener('click', hideModal);
  if (modalOk) modalOk.addEventListener('click', hideModal);
  if (resetForm) resetForm.addEventListener('click', () => contactForm.reset());

  // Global: Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      if(modal && modal.getAttribute('aria-hidden') === 'false') hideModal();
    }
  });

  // 5. Home Page "Passive" Feed
  // Only runs if #feedList exists (i.e., on the homepage)
  const feedList = document.getElementById('feedList');
  const pauseBtn = document.getElementById('pauseFeed');
  const clearBtn = document.getElementById('clearFeed');

  if (feedList) {
    const messages = [
      {t:'PAID', m:'Auto-freeze: Vendor payment flagged — mismatch vendor bank hash.'},
      {t:'ALERT', m:'Predictive: Vendor insolvency risk increased to 82%.'},
      {t:'INFO', m:'Reconciliation: 142k transactions matched within 0.4s.'},
      {t:'BLOCK', m:'Flow frozen: Payroll transfer halted — behavioral deviation detected.'},
      {t:'METRIC', m:'Cash window opened: +$8.2M available for acquisition.'},
      {t:'AUDIT', m:'Immutable trail written for transaction 0xAFE23.'},
      {t:'FORECAST', m:'War-game scenario: 72% success on targeted vertical expansion.'}
    ];

    let running = true;
    let feedInterval;

    function addFeed(msg){
      const li = document.createElement('li');
      li.innerHTML = `<strong>[${msg.t}]</strong> ${msg.m} <span class="muted" style="float:right;font-size:.8rem;color:var(--muted)">now</span>`;
      feedList.prepend(li);
      while(feedList.children.length > 40) feedList.removeChild(feedList.lastChild);
    }

    function startFeed(){
      feedInterval = setInterval(() => {
        if(!running) return;
        const idx = Math.floor(Math.random()*messages.length);
        addFeed(messages[idx]);
      }, 1200 + Math.random()*2000);
    }
    
    // Seed initial messages
    for(let i=0;i<6;i++) addFeed(messages[i%messages.length]);
    startFeed();

    // Controls
    if(pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        running = !running;
        pauseBtn.textContent = running ? 'Pause' : 'Resume';
      });
    }
    if(clearBtn) {
      clearBtn.addEventListener('click', () => feedList.innerHTML = '');
    }
  }

})();
