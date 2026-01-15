// Watchdog Accounting — simulation_ceo.js
// The "God Mode" simulation: Market scanning, project creation, and auto-execution.

document.addEventListener('DOMContentLoaded', () => {

  const ceoBtn = document.getElementById('runCeo');
  const ceoConsole = document.getElementById('ceoConsole');
  const ceoFeed = document.getElementById('ceoFeed');
  const ceoStatus = document.getElementById('ceoStatus');

  if (ceoBtn && ceoConsole && ceoFeed) {
    ceoBtn.addEventListener('click', () => {
      // 1. Reset
      const oldReport = ceoConsole.querySelector('.report-panel');
      if(oldReport) oldReport.remove();
      ceoFeed.innerHTML = '';
      
      ceoStatus.textContent = "SCANNING GLOBAL MARKETS...";
      ceoBtn.disabled = true;
      ceoBtn.textContent = "SYNTHESIZING ALPHA...";

      // 2. Define Random Strategic Opportunities
      const strategies = [
        {
          sector: "ENERGY_ARBITRAGE",
          signal: "Grid instability detected in Sector 7 (Texas/ERCOT).",
          project: "Project: VIRTUAL_POWER_PLANT",
          input: "12.5M",
          output: "48.2M",
          confidence: "98.4%",
          hiring: ["Energy Trader (Algo)", "Grid Infrastructure Lead"]
        },
        {
          sector: "RARE_EARTH_METALS",
          signal: "Silver Scarcity detected. Industrial demand > Supply (+14%).",
          project: "Project: ARGENTUM_RESERVE",
          input: "1.9M",
          output: "22.4M",
          confidence: "99.1%",
          hiring: ["Commodities Logistics Head", "Mining Ops Director"]
        },
        {
          sector: "LOGISTICS_AI",
          signal: "Competitor 'GlobalShip' filing Chapter 11. Route vacuum opening.",
          project: "Project: ATLANTIC_BRIDGE",
          input: "55.0M",
          output: "180.0M",
          confidence: "94.2%",
          hiring: ["Fleet Acquisition Mgr", "Maritime Legal Counsel"]
        }
      ];

      const selected = strategies[Math.floor(Math.random() * strategies.length)];

      // 3. Phase 1: High Speed Scanning
      let scanCount = 0;
      const scanInterval = setInterval(() => {
        const tickers = ["LITH", "GOLD", "USD/EUR", "NVDA", "SILV", "BRENT", "CORN"];
        const randTicker = tickers[Math.floor(Math.random() * tickers.length)];
        const val = (Math.random() * 1000).toFixed(2);
        
        const li = document.createElement('li');
        li.style.color = '#64748b'; // Muted
        li.innerHTML = `[SCAN] ${randTicker} trading at ${val} // Volatility: Low`;
        ceoFeed.prepend(li);
        
        scanCount++;
        if(scanCount > 8) {
          clearInterval(scanInterval);
          triggerDetection(selected);
        }
      }, 150);

      // 4. Phase 2: Detection & Project Creation
      function triggerDetection(strategy) {
        setTimeout(() => {
          const li = document.createElement('li');
          li.style.color = '#fff';
          li.innerHTML = `<strong>[SIGNAL LOCK]</strong> ${strategy.signal}`;
          ceoFeed.prepend(li);
          
          ceoStatus.textContent = "OPPORTUNITY IDENTIFIED";
        }, 500);

        setTimeout(() => {
          const li = document.createElement('li');
          li.style.color = '#8b5cf6'; // Violet
          li.innerHTML = `<strong>[EXECUTION]</strong> Initiating ${strategy.project}...`;
          ceoFeed.prepend(li);
        }, 1200);

        setTimeout(() => {
          // Simulation of calculation
          const calcLi = document.createElement('li');
          calcLi.innerHTML = `[CALC] Monte Carlo Simulation (n=10,000): <span style="color:#10b981">Confidence ${strategy.confidence}</span>`;
          ceoFeed.prepend(calcLi);
        }, 2000);

        setTimeout(() => {
          triggerExecution(strategy);
        }, 3000);
      }

      // 5. Phase 3: Auto-Execution (Hiring & Goals)
      function triggerExecution(strategy) {
        ceoStatus.textContent = "DEPLOYING RESOURCES";

        // Create Jobs
        strategy.hiring.forEach((role, index) => {
          setTimeout(() => {
            const li = document.createElement('li');
            li.innerHTML = `[HR_AUTO] Generated Req #${Math.floor(Math.random()*9000)+1000}: <strong>${role}</strong>. Posting to LinkedIn/Indeed...`;
            ceoFeed.prepend(li);
          }, index * 800);
        });

        // Set Deadlines
        setTimeout(() => {
          const li = document.createElement('li');
          li.innerHTML = `[GOVERNANCE] Deadline set: Q3-2026. KPI: Net Margin > 40%.`;
          ceoFeed.prepend(li);
        }, 2000);

        // Final Executive Summary Card
        setTimeout(() => {
          ceoStatus.textContent = "PROJECT ACTIVE";
          ceoBtn.disabled = false;
          ceoBtn.textContent = "INITIATE STRATEGY";

          const reportHTML = `
            <div class="report-panel" style="border-top-color: #8b5cf6;">
              <div class="report-header">
                <span class="report-title" style="color:#8b5cf6">EXECUTIVE ORDER #99-A</span>
                <span class="report-id">AUTO-AUTHORIZED</span>
              </div>
              <div class="report-grid">
                <div class="report-stat"><span class="label">CapEx Input</span><span class="value">$${strategy.input}</span></div>
                <div class="report-stat"><span class="label">Proj. Return</span><span class="value secure">$${strategy.output}</span></div>
                <div class="report-stat"><span class="label">Confidence</span><span class="value secure">${strategy.confidence}</span></div>
                <div class="report-stat"><span class="label">Timeline</span><span class="value">18 Mo</span></div>
              </div>
              <div class="sop-section">
                <h4>AUTOMATED WORKFLOWS:</h4>
                <ul class="sop-list">
                  <li>Seed Capital Transferred: <span>CONFIRMED</span></li>
                  <li>Legal Entity (LLC) Formed: <span>DELAWARE</span></li>
                  <li>Recruitment Bots: <span>ACTIVE (Targeting Competitors)</span></li>
                  <li>Cloud Infrastructure: <span>PROVISIONED</span></li>
                </ul>
              </div>
            </div>
          `;
          ceoConsole.insertAdjacentHTML('beforeend', reportHTML);
        }, 3500);
      }
    });
  }
});
