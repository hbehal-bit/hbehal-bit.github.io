// Watchdog Accounting — simulation_ceo.js
// The "God Mode" simulation: Robust infinite loop version.

document.addEventListener('DOMContentLoaded', () => {

  const ceoBtn = document.getElementById('runCeo');
  const ceoConsole = document.getElementById('ceoConsole');
  const ceoFeed = document.getElementById('ceoFeed');
  const ceoStatus = document.getElementById('ceoStatus');
  
  let isRunning = false;

  // --- 1. UTILITIES ---
  
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  function maintainHygiene() {
    if (ceoFeed.children.length > 30) {
      // Remove oldest logs to keep DOM light
      while (ceoFeed.children.length > 25) {
        if(ceoFeed.lastChild) ceoFeed.removeChild(ceoFeed.lastChild);
      }
    }
  }

  function appendLog(html, color = '#94a3b8') {
    const li = document.createElement('li');
    li.style.color = color;
    li.innerHTML = html;
    ceoFeed.prepend(li);
    maintainHygiene();
  }

  // --- 2. DATA FETCHING (With Timeout Safety) ---

  async function fetchRandomTrend() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch('https://random-word-api.herokuapp.com/word?number=1', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      return data[0]; 
    } catch (error) {
      // Failover topics if API hangs or fails
      const fallbacks = ["logistics", "lithium", "coffee", "insurance", "pets", "gravel", "uranium", "water"];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  }

  function generateBusinessThesis(seedWord) {
    const topic = seedWord.charAt(0).toUpperCase() + seedWord.slice(1);
    const isB2B = Math.random() > 0.5;
    const b2bActions = ["Vertical Integration", "Supply Chain Optimization", "SaaS Platform", "AI Automation", "Wholesale Arbitrage"];
    const b2cActions = ["Direct-to-Consumer", "Subscription Box", "Luxury Branding", "Gig-Economy App", "Social Marketplace"];
    const action = isB2B 
      ? b2bActions[Math.floor(Math.random() * b2bActions.length)] 
      : b2cActions[Math.floor(Math.random() * b2cActions.length)];

    return {
      topic: topic,
      type: isB2B ? "B2B_ENTERPRISE" : "B2C_RETAIL",
      title: `${action} for ${topic}`,
      input: (Math.random() * 15 + 2).toFixed(1), // $M
      output: (Math.random() * 45 + 20).toFixed(1) // $M
    };
  }

  // --- 3. THE WORKFLOW STEPS ---

  async function performDeepWork(strategy) {
    if(!isRunning) return;

    // STEP 1: INITIAL ANALYSIS
    ceoStatus.textContent = `ANALYZING: ${strategy.topic.toUpperCase()}`;
    const terms = ["Market Density", "Regulatory Friction", "Competitor Cash Flow"];
    
    for(const term of terms) {
      if(!isRunning) return;
      await wait(2000); // Wait 2s
      const val = Math.floor(Math.random() * 850) + 150;
      appendLog(`[ANALYSIS] Measuring ${term}... <span style="float:right">${val} pts</span>`);
    }

    // STEP 2: HEADHUNTING
    if(!isRunning) return;
    ceoStatus.textContent = "ACQUIRING TALENT...";
    await wait(1500);
    appendLog(`<strong>[HR]</strong> Initiating executive search for ${strategy.title}...`, '#fff');
    
    const roles = ["Head of Product", "VP of Sales", "Chief Supply Officer", "Legal Counsel"];
    const names = ["J. Reynolds", "A. Chen", "S. Gupta", "M. Kowalski", "D. Silva", "K. West", "L. Chang"];
    
    // Hire 3 random roles
    for(let i=0; i<3; i++) {
      if(!isRunning) return;
      await wait(4000); // 4s per hire
      const role = roles[i];
      const name = names[Math.floor(Math.random() * names.length)];
      const salary = Math.floor(Math.random() * 120) + 180; 
      appendLog(`[HR_AUTO] Offer Accepted: <strong>${role}</strong> (${name}) @ $${salary}k/yr`, '#10b981');
    }

    // STEP 3: INFRASTRUCTURE
    if(!isRunning) return;
    ceoStatus.textContent = "PROVISIONING RESOURCES...";
    await wait(3000);
    appendLog(`[OPS] Registering LLC in Delaware...`);
    await wait(3000);
    appendLog(`[OPS] Leasing 40,000 sqft warehouse (Nevada)...`);
    await wait(3000);
    appendLog(`[TECH] Spinning up AWS Cluster (us-east-1)...`);

    // STEP 4: COST ANALYSIS
    if(!isRunning) return;
    ceoStatus.textContent = "CALCULATING UNIT ECONOMICS...";
    const costs = ["CAC", "LTV", "Churn Rate"];
    for(const cost of costs) {
      if(!isRunning) return;
      await wait(2500);
      appendLog(`[FINANCE] Optimizing ${cost}...`);
    }
    
    // STEP 5: EXECUTION REPORT
    if(!isRunning) return;
    
    // Clear old reports safely
    const oldReports = ceoConsole.querySelectorAll('.report-panel');
    oldReports.forEach(r => r.remove());

    const reportHTML = `
        <div class="report-panel" style="border-top-color: #8b5cf6; margin-bottom: 1rem;">
          <div class="report-header">
            <span class="report-title" style="color:#8b5cf6">${strategy.type}</span>
            <span class="report-id">DEPLOYED</span>
          </div>
          <div class="report-grid">
            <div class="report-stat" style="grid-column: span 2; border-bottom:1px solid rgba(255,255,255,0.1); margin-bottom:0.5rem; padding-bottom:0.5rem;">
               <span class="label">Venture</span>
               <span class="value" style="font-size:1rem;">${strategy.title}</span>
            </div>
            <div class="report-stat"><span class="label">Investment</span><span class="value">$${strategy.input}M</span></div>
            <div class="report-stat"><span class="label">Exp. ROI</span><span class="value secure">$${strategy.output}M</span></div>
          </div>
        </div>
    `;
    const div = document.createElement('li');
    div.innerHTML = reportHTML;
    ceoFeed.prepend(div);
    
    ceoStatus.textContent = "VENTURE ACTIVE.";
    await wait(3000);
  }

  // --- 4. THE MAIN ENGINE (Infinite Loop) ---

  async function startEngine() {
    // This is the forever loop
    while(isRunning) {
      try {
        ceoStatus.textContent = "SEARCHING FOR MARKET GAP...";
        
        // 1. Get Idea
        const seedWord = await fetchRandomTrend();
        const strategy = generateBusinessThesis(seedWord);
        
        appendLog(`<strong>[IDEA DETECTED]</strong> Disruption opportunity in: ${strategy.topic.toUpperCase()}`, '#fff');
        
        // 2. Do the work
        await performDeepWork(strategy);

        // 3. Pause briefly before next cycle (if still running)
        if(isRunning) {
           ceoStatus.textContent = "SCANNING FOR NEXT OPPORTUNITY...";
           await wait(4000); 
        }

      } catch (e) {
        console.error("Simulation Glitch:", e);
        appendLog(`[SYSTEM] Minor glitch detected. Rebooting strategy engine...`, '#ef4444');
        await wait(2000); // Just wait and try again, don't crash
      }
    }
  }

  // --- 5. BUTTON HANDLER ---

  if (ceoBtn && ceoConsole && ceoFeed) {
    ceoBtn.addEventListener('click', () => {
      if (isRunning) {
        // Stop
        isRunning = false;
        ceoStatus.textContent = "STATUS: PAUSED";
        ceoStatus.style.color = "#ef4444";
        ceoBtn.textContent = "RESUME AUTONOMY";
      } else {
        // Start
        isRunning = true;
        ceoBtn.textContent = "STOP OPERATION";
        ceoStatus.style.color = "#8b5cf6";
        startEngine(); // Kick off the while loop
      }
    });
  }

});
