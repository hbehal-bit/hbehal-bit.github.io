// Watchdog Accounting — simulation.js
// Advanced interactive threat simulation for the Technology page.

(() => {
  const attackBtn = document.getElementById('simulateAttack');
  const consoleEl = document.getElementById('demoConsole');
  const attackFeed = document.getElementById('attackFeed');
  const statusEl = document.getElementById('consoleStatus');

  // Only run if elements exist
  if (!attackBtn || !consoleEl || !attackFeed) return;

  attackBtn.addEventListener('click', () => {
    // 1. Reset: Clean up previous reports if any
    const oldReport = consoleEl.querySelector('.report-panel');
    if(oldReport) oldReport.remove();

    // 2. Setup Threat Data
    const origins = [
      "Unverified Proxy (St. Petersburg)", 
      "Botnet Cluster (Shenzhen)", 
      "Compromised Data Center (Frankfurt)", 
      "Tor Exit Node (Relay #442)",
      "VPN Tunnel (Cayman Islands)",
      "Hijacked IoT Swarm (Sao Paulo)"
    ];
    const threatOrigin = origins[Math.floor(Math.random() * origins.length)];
    
    // 3. Enter Alert Mode
    consoleEl.classList.add('alert');
    statusEl.textContent = `ALERT: INTRUSION DETECTED [ORIGIN: ${threatOrigin.toUpperCase()}]`;
    attackBtn.disabled = true;
    attackBtn.textContent = "ENGAGING DEFENSES...";
    
    // 4. Initialize Tracking Metrics
    let count = 0;
    let totalValue = 0;
    let blockedIPs = 0;
    let frozenAccounts = Math.floor(Math.random() * 4) + 2; // Randomly freeze 2-5 accounts

    // 5. Start the Attack Loop
    const attackInterval = setInterval(() => {
      const li = document.createElement('li');
      li.className = 'risk-high';
      
      // Generate realistic dynamic data
      const val = Math.floor(Math.random() * 850000) + 15000; // Value between $15k - $865k
      totalValue += val;
      blockedIPs++;
      
      // Random IP Generator
      const ip = `${Math.floor(Math.random()*223) + 1}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`;
      
      li.innerHTML = `[CRITICAL] Invoice injection ($${val.toLocaleString()}) detected from IP ${ip}`;
      attackFeed.prepend(li);
      count++;

      // Stop after ~15 fake attacks
      if(count > 15) {
        clearInterval(attackInterval);
        endSimulation(totalValue, blockedIPs, frozenAccounts, threatOrigin);
      }
    }, 70); // 70ms scroll speed
  });

  function endSimulation(totalValue, blockedIPs, frozenAccounts, threatOrigin) {
    setTimeout(() => {
      // 1. Post Success Message
      const successLi = document.createElement('li');
      successLi.style.color = '#06b6d4'; 
      successLi.innerHTML = `<strong>[SUCCESS] Threat neutralized. All vectors sealed.</strong>`;
      attackFeed.prepend(successLi);
      
      // 2. Reset Console Visuals
      statusEl.textContent = "SYSTEM: SECURE // AWAITING INPUT";
      consoleEl.classList.remove('alert');
      attackBtn.disabled = false;
      attackBtn.textContent = "⚠ SIMULATE ATTACK";

      // 3. Generate the HTML Report
      const reportHTML = `
        <div class="report-panel">
          <div class="report-header">
            <span class="report-title">THREAT ANALYSIS REPORT</span>
            <span class="report-id">REF: ${threatOrigin}</span>
          </div>
          <div class="report-grid">
            <div class="report-stat">
              <span class="label">Total Exposure</span>
              <span class="value danger">$${totalValue.toLocaleString()}</span>
            </div>
            <div class="report-stat">
              <span class="label">Funds Secured</span>
              <span class="value secure">$${totalValue.toLocaleString()}</span>
            </div>
            <div class="report-stat">
              <span class="label">IPs Blocked</span>
              <span class="value">${blockedIPs}</span>
            </div>
            <div class="report-stat">
              <span class="label">Accts Frozen</span>
              <span class="value">${frozenAccounts}</span>
            </div>
          </div>
          <div class="sop-section">
            <h4>DEFENSE PROTOCOLS EXECUTED:</h4>
            <ul class="sop-list">
              <li>Vendor Master Data: <span>WRITE_LOCK ENGAGED</span></li>
              <li>SWIFT Batch 0x992A: <span>INTERCEPTED</span></li>
              <li>WORM Storage (Immutable): <span>SNAPSHOT WRITTEN</span></li>
              <li>HSM Key Rotation: <span>COMPLETED (2048-bit)</span></li>
              <li>Regulatory Filing (SAR): <span>AUTO-DRAFTED</span></li>
            </ul>
          </div>
        </div>
      `;
      
      // Inject Report
      consoleEl.insertAdjacentHTML('beforeend', reportHTML);
      
    }, 800);
  }

})();
