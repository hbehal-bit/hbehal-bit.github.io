// Watchdog Accounting — script.js
// Minimal interactive behavior: mobile nav toggle, theme toggle, contact form, modal, live feed simulation.

(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // when open, show links visually on small screens
    Array.from(nav.querySelectorAll('a')).forEach(a => {
      a.style.display = a.style.display === 'inline-block' ? '' : 'inline-block';
    });
  });

  // Theme toggle (light/dark) — toggles a data attribute for future extension
  const themeToggle = document.getElementById('themeToggle');
  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
    themeToggle.textContent = current === 'light' ? '🌗' : '🌞';
  });

  // Contact form handling (no network) - show modal
  const contactForm = document.getElementById('contactForm');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('closeModal');
  const modalOk = document.getElementById('modalOk');
  const resetForm = document.getElementById('resetForm');

  function showModal() {
    modal.setAttribute('aria-hidden', 'false');
  }
  function hideModal() {
    modal.setAttribute('aria-hidden', 'true');
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      // basic validation
      const form = new FormData(contactForm);
      if (!form.get('company') || !form.get('name') || !form.get('email')) {
        alert('Please fill required fields');
        return;
      }
      // Simulate send
      showModal();
      contactForm.reset();
    });
  }

  closeModal && closeModal.addEventListener('click', hideModal);
  modalOk && modalOk.addEventListener('click', hideModal);
  resetForm && resetForm.addEventListener('click', () => contactForm.reset());

  // Live Feed simulation — sample transaction anomalies
  const feedList = document.getElementById('feedList');
  const pauseBtn = document.getElementById('pauseFeed');
  const clearBtn = document.getElementById('clearFeed');

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
    if(!feedList) return;
    const li = document.createElement('li');
    li.innerHTML = `<strong>[${msg.t}]</strong> ${msg.m} <span class="muted" style="float:right;font-size:.8rem;color:var(--muted)">now</span>`;
    feedList.prepend(li);
    // keep list length sane
    while(feedList.children.length > 40) feedList.removeChild(feedList.lastChild);
  }

  function startFeed(){
    feedInterval = setInterval(() => {
      if(!running) return;
      const idx = Math.floor(Math.random()*messages.length);
      addFeed(messages[idx]);
    }, 1200 + Math.random()*2000);
  }
  function stopFeed(){ clearInterval(feedInterval); }

  pauseBtn && pauseBtn.addEventListener('click', () => {
    running = !running;
    pauseBtn.textContent = running ? 'Pause' : 'Resume';
    if(running) startFeed(); else stopFeed();
  });

  clearBtn && clearBtn.addEventListener('click', () => {
    if(feedList) feedList.innerHTML = '';
  });

  // seed
  for(let i=0;i<6;i++) addFeed(messages[i%messages.length]);
  startFeed();

  // small accessibility: trap Escape to close modal
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      if(modal && modal.getAttribute('aria-hidden') === 'false') hideModal();
    }
  });

})();
