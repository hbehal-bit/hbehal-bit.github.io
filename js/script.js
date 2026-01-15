// Watchdog Accounting — script.js
// Minimal interactive behavior: mobile nav toggle, theme toggle, contact form, modal, live feed simulation.

(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 1. Mobile nav toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    // when open, show links visually on small screens
    Array.from(nav.querySelectorAll('a')).forEach(a => {
      a.style.display = a.style.display === 'inline-block' ? '' : 'inline-block';
    });
  });

  // 2. Theme toggle (light/dark)
  const themeToggle = document.getElementById('themeToggle');
  themeToggle && themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
    themeToggle.textContent = current === 'light' ? '🌗' : '🌞';
  });

  // 3. Contact form handling (Home Page)
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
      if (!form.get('company') || !form.get('name') || !form.get('email')) {
        alert('Please fill required fields');
        return;
      }
      showModal();
      contactForm.reset();
    });
  }

  closeModal && closeModal.addEventListener('click', hideModal);
  modalOk && modalOk.addEventListener('click', hideModal);
  resetForm && resetForm.addEventListener('click', () => contactForm.reset());

  // 4. Live Feed simulation (Home Page)
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
    function stopFeed(){ clearInterval(feedInterval); }

    pauseBtn && pauseBtn.addEventListener('click', () => {
      running = !running;
      pauseBtn.textContent = running ? 'Pause' : 'Resume';
      if(running) startFeed(); else stopFeed();
    });

    clearBtn && clearBtn.addEventListener('click', () => {
      feedList.innerHTML = '';
    });

    // Seed initial messages
    for(let i=0;i<6;i++) addFeed(messages[i%messages.length]);
    startFeed();
  }

  // 5. Tech Page: Attack Simulation
  const attackBtn = document.getElementById('simulateAttack');
  const consoleEl = document.getElementById('demoConsole');
  const attackFeed = document.getElementById('attackFeed');
  const statusEl = document.getElementById('consoleStatus');

  if (attackBtn && consoleEl && attackFeed) {
    attackBtn.addEventListener('click', () => {
      // Enter Alert Mode
      consoleEl.classList.add('alert');
      statusEl.textContent = "SYSTEM: THREAT DETECTED";
      attackBtn.disabled = true;
      attackBtn.textContent = "MITIGATING...";
      
      // Flood feed with errors
      let count = 0;
      const attackInterval = setInterval(() => {
        const li = document.createElement('li');
        li.className = 'risk-high';
        // Generate random IPs for realism
        const r1 = Math.floor(Math.random()*255);
        const r2 = Math.floor(Math.random()*255);
        li.innerHTML = `[CRITICAL] Invoice injection detected from IP 192.168.${r1}.${r2}`;
        attackFeed.prepend(li);
        count++;

        if(count > 15) {
          // Resolve Attack
          clearInterval(attackInterval);
          setTimeout(() => {
            const successLi = document.createElement('li');
            successLi.style.color = '#06b6d4'; // Cyan
            successLi.innerHTML = `<strong>[SUCCESS] Threat neutralized. Source blocked.</strong>`;
            attackFeed.prepend(successLi);
            
            statusEl.textContent = "SYSTEM: SECURE";
            consoleEl.classList.remove('alert');
            attackBtn.disabled = false;
            attackBtn.textContent = "⚠ SIMULATE ATTACK";
          }, 800);
        }
      }, 80); // Fast burst speed (80ms)
    });
  }

  // Global: Escape key to close modal
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      if(modal && modal.getAttribute('aria-hidden') === 'false') hideModal();
    }
  });

})();
