This is a perfect addition for the "Technology" page. It completes the narrative: **Defense (Red)** -> **Internal Audit (Amber)** -> **Compliance/Tax (Green)**.

I will create a simulation that visualizes the **"Continuous Close"**. Instead of a frantic attack, this one feels precise, heavy, and official. It will show the system aggregating data, optimizing tax liability, getting a "digital stamp" from an external auditor (the third-party review), and filing directly to the government.

### 1. Update `technology.html`

Add this new section **below** the Internal Audit section (but above the ROI table).

```html
    <section class="section alt">
      <div class="container">
        <h2>Automated Tax Sovereignty</h2>
        <p>The "Continuous Close" means tax season is non-existent. Watchdog aggregates global liability in real-time, optimizes carry-forward losses, and secures external cryptographic validation before submission.</p>
        
        <div class="demo-console" id="taxConsole" style="border-color: #10b981;">
          <div class="console-header" style="color: #10b981; border-bottom-color: #10b981;">
            <span>FISCAL_GATEWAY_V9 // AUTHORIZED</span>
            <button id="runTax" class="btn btn-outline small" style="color: #10b981; border-color: #10b981;">INITIATE FISCAL CLOSE</button>
          </div>
          <ul id="taxFeed" class="feed-list console-feed">
            <li>[SYSTEM] Connection established to IRS/HMRC Gateways.</li>
            <li>[SYSTEM] Ledger locked. Awaiting command.</li>
          </ul>
          <div class="console-status" id="taxStatus" style="color: #10b981;">STATUS: READY</div>
        </div>
      </div>
    </section>

```

### 2. Update `js/simulation.js` (Full File)

Here is the updated file with **all 3 simulations** included.

**New Features in Simulation 3:**

* **Tax Optimization:** It calculates a "Tax Savings" amount based on "Carry-forward Loss Application."
* **Third-Party Review:** It simulates an API handshake with a major firm (e.g., "PwC_Validator_Node") to verify the math before sending.
* **Official Filing:** It generates a submission hash and an acceptance token.

```javascript
// Watchdog Accounting — simulation.js
// Advanced interactive threat simulations for the Technology page.

(() => {
  // ==========================================
  // SIMULATION 1: EXTERNAL ATTACK (Red/Blue)
  // ==========================================
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
      const origins = [
        "Unverified Proxy (St. Petersburg)", 
        "Botnet Cluster (Shenzhen)", 
        "Compromised Data Center (Frankfurt)", 
        "Tor Exit Node (Relay #442)"
      ];
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

  // ==========================================
  // SIMULATION 2: INTERNAL AUDIT (Amber)
  // ==========================================
  const auditBtn = document.getElementById('runAudit');
  const auditConsole = document.getElementById('auditConsole');
  const auditFeed = document.getElementById('auditFeed');
  const auditStatus = document.getElementById('auditStatus');

  if (auditBtn && auditConsole && auditFeed) {
    auditBtn.addEventListener('click', () => {
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

      steps.forEach(step => {
        setTimeout(() => {
          const li = document.createElement('li');
          li.innerText = step.m;
          if(step.m.includes('⚠')) li.style.color = '#f59e0b'; 
          auditFeed.prepend(li);
        }, step.t);
      });

      setTimeout(() => {
        const suspectName = "Marcus J. Reynolds";
        const theftAmount = 4850.00;

        const hitLi = document.createElement('li');
        hitLi.innerHTML = `<span style="color:#ef4444">MATCH CONFIRMED:</span> Subject ${suspectName}`;
        auditFeed.prepend(hitLi);

        setTimeout(() => {
          hitLi.innerHTML = `<span style="color:#10b981">[PRIVACY SHIELD ACTIVE]</span> Subject REDACTED-HASH-0x992`;
          const anonLi = document.createElement('li');
          anonLi.innerText = "Applying PII Masking (Policy 44-B)...";
          auditFeed.prepend(anonLi);
        }, 800);

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

  // ==========================================
  // SIMULATION 3: TAX & REGULATORY (Green)
  // ==========================================
  const taxBtn = document.getElementById('runTax');
  const taxConsole = document.getElementById('taxConsole');
  const taxFeed = document.getElementById('taxFeed');
  const taxStatus = document.getElementById('taxStatus');

  if (taxBtn && taxConsole && taxFeed) {
    taxBtn.addEventListener('click', () => {
      // 1. Reset
      const oldReport = taxConsole.querySelector('.report-panel');
      if(oldReport) oldReport.remove();
      taxFeed.innerHTML = '';
      
      taxStatus.textContent = "AGGREGATING GLOBAL ENTITIES...";
      taxBtn.disabled = true;
      taxBtn.textContent = "CALCULATING LIABILITY...";

      // Simulation Steps
      const steps = [
        { t: 100, m: "Pulling Ledger: US_West (Subsid_04) - 100% Match" },
        { t: 400, m: "Pulling Ledger: EU_Frankfurt (Subsid_09) - 100% Match" },
        { t: 800, m: "Optimizing Carry-Forward Losses (SOP-Tax-99)..." },
        { t: 1500, m: "Applying Depreciation Schedules (MACRS)..." },
        { t: 2200, m: "Drafting Form 1120 & Schedule C..." },
      ];

      steps.forEach(step => {
        setTimeout(() => {
          const li = document.createElement('li');
          li.innerText = step.m;
          taxFeed.prepend(li);
        }, step.t);
      });

      // Third-Party Review Interaction
      setTimeout(() => {
        const reviewLi = document.createElement('li');
        reviewLi.style.color = '#10b981';
        reviewLi.innerHTML = `<strong>[EXT_AUDIT]</strong> Handshake: <span style="color:#fff">Deloitte_Digital_Node</span> connected.`;
        taxFeed.prepend(reviewLi);
        
        setTimeout(() => {
            const verifyLi = document.createElement('li');
            verifyLi.innerHTML = `<strong>[EXT_AUDIT]</strong> Verification hash: <span style="font-family:monospace; color:var(--muted)">0x77f2...a9d2</span> matched.`;
            taxFeed.prepend(verifyLi);
        }, 1200);

      }, 3000);

      // Final Submission & Report
      setTimeout(() => {
        taxStatus.textContent = "FILING ACCEPTED";
        taxBtn.disabled = false;
        taxBtn.textContent = "INITIATE FISCAL CLOSE";

        // Generate Random Tax Values
        const taxLiability = Math.floor(Math.random() * 2500000) + 1000000;
        const taxSaved = Math.floor(taxLiability * 0.12); // 12% savings found

        const reportHTML = `
          <div class="report-panel" style="border-top-color: #10b981;">
            <div class="report-header">
              <span class="report-title" style="color:#10b981">FISCAL TRANSMISSION RECEIPT</span>
              <span class="report-id">TOKEN: IRS-${Math.floor(Math.random()*100000)}</span>
            </div>
            <div class="report-grid">
              <div class="report-stat"><span class="label">Tax Liability</span><span class="value">$${taxLiability.toLocaleString()}</span></div>
              <div class="report-stat"><span class="label">Optimization</span><span class="value secure">-$${taxSaved.toLocaleString()}</span></div>
              <div class="report-stat"><span class="label">Eff. Rate</span><span class="value">21.0%</span></div>
              <div class="report-stat"><span class="label">Status</span><span class="value secure">ACCEPTED</span></div>
            </div>
            <div class="sop-section">
              <h4>CHAIN OF CUSTODY:</h4>
              <ul class="sop-list">
                <li>Internal Sign-off: <span>CFO_KEY_YUBI_44</span></li>
                <li>External Validation: <span>DELOITTE_DIGITAL_OK</span></li>
                <li>Transmission: <span>AES-256 ENCRYPTED</span></li>
                <li>Authority Ack: <span>RECEIVED (0.04s)</span></li>
              </ul>
            </div>
          </div>
        `;
        taxConsole.insertAdjacentHTML('beforeend', reportHTML);
      }, 5500);

    });
  }

})();

```
