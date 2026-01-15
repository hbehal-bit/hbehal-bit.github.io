// Watchdog Accounting — simulation.js
// Advanced interactive threat simulations for the Technology page.

(() => {
  // --- SIMULATION 1: EXTERNAL ATTACK (Red/Blue) ---
  const attackBtn = document.getElementById('simulateAttack');
  const consoleEl = document.getElementById('demoConsole');
  const attackFeed = document.getElementById('attackFeed');
  const statusEl = document.getElementById('consoleStatus');

  if (attackBtn && consoleEl && attackFeed) {
    attackBtn.addEventListener('click', () => {
      // 1. Reset
      const oldReport = consoleEl.querySelector('.report-panel');
      if(oldReport) oldReport.remove();

      // 2. Setup
      const origins = ["Unverified Proxy (St. Petersburg)", "Botnet Cluster (Shenzhen)", "Compromised Data Center (Frankfurt)", "Tor Exit Node (Relay #442)"];
      const threatOrigin = origins[Math.floor(Math.random() * origins.length)];
      
      consoleEl.classList.add('alert');
      statusEl.textContent = `ALERT: INTRUSION DETECTED [ORIGIN: ${threatOrigin.toUpperCase()}]`;
      attackBtn.disabled = true;
      attackBtn.textContent = "ENGAGING DEFENSES...";
      
      let count = 0;
      let totalValue = 0;
      let blockedIPs = 0;
      let frozenAccounts = Math.floor(Math.random() * 4) + 2;

      // 3. Loop
      const attackInterval = setInterval(() => {
        const li = document.createElement('li');
        li.className = 'risk-high';
        const val = Math.floor(Math.random() * 850000) + 15000;
        totalValue += val;
        blockedIPs++;
        const ip = `${Math.floor(Math.random()*223)+1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
        
        li.innerHTML = `[CRITICAL] Invoice injection ($${val.toLocaleString()}) detected from IP ${ip}`;
        attackFeed.prepend(li);
        count++;

        if(count > 15) {
          clearInterval(attackInterval);
          setTimeout(() => {
            const successLi = document.createElement('li');
            successLi.style.color = '#06b6d4'; 
            successLi.innerHTML = `<strong>[SUCCESS] Threat neutralized. All vectors sealed.</strong>`;
            attackFeed.prepend(successLi);
            
            statusEl.textContent = "SYSTEM: SECURE // AWAITING INPUT";
            consoleEl.classList.remove('alert');
            attackBtn.disabled = false;
            attackBtn.textContent = "⚠ SIMULATE ATTACK";

            const reportHTML = `
              <div class="report-panel">
                <div class="report-header">
                  <span class="report-title">THREAT ANALYSIS REPORT</span>
                  <span class="report-id">REF: ${threatOrigin}</span>
                </div>
                <div class="report-grid">
                  <div class="report-stat"><span class="label">Total Exposure</span><span class="value danger">$${totalValue.toLocaleString()}</span></div>
                  <div class="report-stat"><span class="label">Funds Secured</span><span class="value secure">$${totalValue.toLocaleString()}</span></div>
                  <div class="report-stat"><span class="label">IPs Blocked</span><span class="value">${blockedIPs}</span></div>
                  <div class="report-stat"><span class="label">Accts Frozen</span><span class="value">${frozenAccounts}</span></div>
                </div>
                <div class="sop-section">
                  <h4>DEFENSE PROTOCOLS EXECUTED:</h4>
                  <ul class="sop-list">
                    <li>Vendor Master Data: <span>WRITE_LOCK ENGAGED</span></li>
                    <li>SWIFT Batch 0x992A: <span>INTERCEPTED</span></li>
                    <li>WORM Storage (Immutable): <span>SNAPSHOT WRITTEN</span></li>
                    <li>Regulatory Filing (SAR): <span>AUTO-DRAFTED</span></li>
                  </ul>
                </div>
              </div>
            `;
            consoleEl.insertAdjacentHTML('beforeend', reportHTML);
          }, 800);
        }
      }, 70);
    });
  }

  // --- SIMULATION 2: INTERNAL AUDIT (Amber/Orange) ---
  const auditBtn = document.getElementById('runAudit');
  const auditConsole = document.getElementById('auditConsole');
  const auditFeed = document.getElementById('auditFeed');
  const auditStatus = document.getElementById('auditStatus');

  if (auditBtn && auditConsole && auditFeed) {
    auditBtn.addEventListener('click', () => {
      // 1. Reset
      const oldReport = auditConsole.querySelector('.report-panel');
      if(oldReport) oldReport.remove();
      auditFeed.innerHTML = '';
      
      auditStatus.textContent = "SCANNING INTERNAL LEDGERS...";
      auditBtn.disabled = true;
      auditBtn.textContent = "AUDITING...";

      const steps = [
        { t: 100, m: "Loading T&E datasets (14,202 records)..." },
        { t: 400, m: "Cross-referencing GPS metadata with receipts..." },
        { t: 800, m: "Analyzing payroll vs. vendor address matches..." },
        { t: 1200, m: "⚠ ANOMALY DETECTED: Weekend expense pattern identified." },
        { t: 1600, m: "⚠ ANOMALY DETECTED: Duplicate invoice hash #88219." },
      ];

      // Play through initial scan steps
      steps.forEach(step => {
        setTimeout(() => {
          const li = document.createElement('li');
          li.innerText = step.m;
          if(step.m.includes('⚠')) li.style.color = '#f59e0b'; // Amber
          auditFeed.prepend(li);
        }, step.t);
      });

      // The "Hit" and Anonymization Logic
      setTimeout(() => {
        const suspectName = "Marcus J. Reynolds";
        const theftType = "Expense Padding / Ghost Cab Rides";
        const theftAmount = 4850.00;

        // 1. Reveal Suspect
        const hitLi = document.createElement('li');
        hitLi.innerHTML = `<span style="color:#ef4444">MATCH CONFIRMED:</span> Subject ${suspectName}`;
        auditFeed.prepend(hitLi);

        // 2. Anonymize immediately
        setTimeout(() => {
          hitLi.innerHTML = `<span style="color:#10b981">[PRIVACY SHIELD ACTIVE]</span> Subject REDACTED-HASH-0x992`;
          const anonLi = document.createElement('li');
          anonLi.innerText = "Applying PII Masking (Policy 44-B)...";
          auditFeed.prepend(anonLi);
        }, 800);

        // 3. Final Report
        setTimeout(() => {
          auditStatus.textContent = "CASE FILE GENERATED";
          auditBtn.disabled = false;
          auditBtn.textContent = "RUN DEEP SCAN";

          const reportHTML = `
            <div class="report-panel" style="border-top-color: #f59e0b;">
              <div class="report-header">
                <span class="report-title" style="color:#f59e0b">HR CONFIDENTIAL MEMO</span>
                <span class="report-id">CASE: #INT-4921</span>
              </div>
              <div class="report-grid">
                <div class="report-stat"><span class="label">Discrepancy</span><span class="value danger">$${theftAmount.toLocaleString()}</span></div>
                <div class="report-stat"><span class="label">Confidence</span><span class="value">99.8%</span></div>
                <div class="report-stat"><span class="label">Subject ID</span><span class="value">******</span></div>
                <div class="report-stat"><span class="label">Policy</span><span class="value">Violated</span></div>
              </div>
              <div class="sop-section">
                <h4>AUTOMATED ACTIONS:</h4>
                <ul class="sop-list">
                  <li>Evidence Packaged (PDF): <span>ENCRYPTED</span></li>
                  <li>Direct Line to HR Director: <span>SENT</span></li>
                  <li>Corporate Card: <span>SUSPENDED</span></li>
                  <li>Manager Notification: <span>HELD (Pending HR Review)</span></li>
                </ul>
              </div>
            </div>
          `;
          auditConsole.insertAdjacentHTML('beforeend', reportHTML);
        }, 2000);

      }, 2500);
    });
  }

})();
