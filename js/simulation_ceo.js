// Watchdog Accounting — simulation_ceo.js
// The "God Mode" simulation: Fetches random topics from the web to generate B2B/B2C strategies.

document.addEventListener('DOMContentLoaded', () => {

  const ceoBtn = document.getElementById('runCeo');
  const ceoConsole = document.getElementById('ceoConsole');
  const ceoFeed = document.getElementById('ceoFeed');
  const ceoStatus = document.getElementById('ceoStatus');
  
  let isRunning = false;
  let loopId = null;

  // --- 1. THE WEB FETCHING ENGINE ---
  
  // Fetches a random noun/topic from the public web
  async function fetchRandomTrend() {
    try {
      // Fetch 1 random word to serve as the "Seed" for the business idea
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
      if (!response.ok) throw new Error("API Limit");
      const data = await response.json();
      return data[0]; // Returns a string like "bicycle", "isotope", "curtain"
    } catch (error) {
      // Fallback if offline
      const fallbacks = ["logistics", "graphene", "coffee", "insurance", "pets", "gravel"];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  }

  // --- 2. THE STRATEGY SYNTHESIZER ---

  function generateBusinessThesis(seedWord) {
    // Capitalize the seed word
    const topic = seedWord.charAt(0).toUpperCase() + seedWord.slice(1);
    
    // 50% chance of B2B vs B2C
    const isB2B = Math.random() > 0.5;

    const b2bActions = ["Vertical Integration", "Supply Chain Optimization", "SaaS Platform", "AI Automation", "Wholesale Arbitrage"];
    const b2cActions = ["Direct-to-Consumer", "Subscription Box", "Luxury Branding", "Gig-Economy App", "Social Marketplace"];
    
    const action = isB2B 
      ? b2bActions[Math.floor(Math.random() * b2bActions.length)] 
      : b2cActions[Math.floor(Math.random() * b2cActions.length)];

    const title = `${action} for ${topic}`;
    const type = isB2B ? "B2B_ENTERPRISE" : "B2C_RETAIL";

    // Generate big money numbers
    const inputVal = (Math.random() * 15 + 2).toFixed(1); // $2M - $17M
    const outputVal = (parseFloat(inputVal) * (Math.random() * 2.5 + 1.5)).toFixed(1); // High ROI

    return {
      topic: topic,
      type: type,
      title: title,
      signal: `Market Gap detected in global <strong style="color:#fff">${topic}</strong> demand.`,
      input: `${inputVal}M`,
      output: `${outputVal}M`,
      confidence: `${(Math.random() * 12 + 87).toFixed(1)}%` // 87-99% confidence
    };
  }

  // --- 3. DOM HELPERS ---

  function maintainHygiene() {
    // Keep list short to prevent scrolling issues
    if (ceoFeed.children.length > 20) {
      for (let i = 0; i < 3; i++) {
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

  // --- 4. THE LOOP ---

  if (ceoBtn && ceoConsole && ceoFeed) {
    
    ceoBtn.addEventListener('click', () => {
      if (isRunning) {
        // Stop Logic
        isRunning = false;
        clearTimeout(loopId);
        ceoStatus.textContent = "STATUS: PAUSED";
        ceoStatus.style.color = "#ef4444";
        ceoBtn.textContent = "RESUME AUTONOMY";
        return;
      }

      // Start Logic
      isRunning = true;
      ceoBtn.textContent = "HALT EXECUTION";
      ceoStatus.style.color = "#8b5cf6";
      runCycle();
    });

    async function runCycle() {
      if (!isRunning) return;

      ceoStatus.textContent = "SCANNING WEB FOR TRENDS...";
      
      // 1. Fetch real random topic
      const seedWord = await fetchRandomTrend();
      
      // 2. Synthesize the Business Idea
      const strategy = generateBusinessThesis(seedWord);
      
      // 3. Scanning Visuals (Searching related terms)
      let scanCount = 0;
      const scanInterval = setInterval(() => {
        if (!isRunning) { clearInterval(scanInterval); return; }

        const relatedTerms = ["Search Volume", "CPC Cost", "Competitor Density", "Regulatory Risk"];
        const term = relatedTerms[scanCount % relatedTerms.length];
        const val = Math.floor(Math.random() * 900) + 100;
        
        appendLog(`[MARKET_DATA] Analyzing "${strategy.topic}" :: ${term}: ${val}`);
        
        scanCount++;
        if(scanCount >= 3) {
          clearInterval(scanInterval);
          if(isRunning) triggerDecision(strategy);
        }
      }, 500); 
    }

    function triggerDecision(strategy) {
      if (!isRunning) return;

      setTimeout(() => {
        if (!isRunning) return;
        appendLog(`<strong>[IDEA LOCKED]</strong> ${strategy.signal}`, '#fff');
        ceoStatus.textContent = "GENERATING BUSINESS PLAN...";
      }, 200);

      setTimeout(() => {
        if (!isRunning) return;
        
        // Clear old reports
        const oldReports = ceoConsole.querySelectorAll('.report-panel');
        oldReports.forEach(r => r.remove());

        // Create new Report
        const reportHTML = `
            <div class="report-panel" style="border-top-color: #8b5cf6; margin-bottom: 1rem;">
              <div class="report-header">
                <span class="report-title" style="color:#8b5cf6">${strategy.type}</span>
                <span class="report-id">NEW VENTURE</span>
              </div>
              <div class="report-grid">
                <div class="report-stat" style="grid-column: span 2; border-bottom:1px solid rgba(255,255,255,0.1); margin-bottom:0.5rem; padding-bottom:0.5rem;">
                   <span class="label">Strategy</span>
                   <span class="value" style="font-size:1rem;">${strategy.title}</span>
                </div>
                <div class="report-stat"><span class="label">CapEx</span><span class="value">$${strategy.input}</span></div>
                <div class="report-stat"><span class="label">Proj. Rev</span><span class="value secure">$${strategy.output}</span></div>
              </div>
            </div>
        `;
        const div = document.createElement('li');
        div.innerHTML = reportHTML;
        ceoFeed.prepend(div);
        
        ceoStatus.textContent = `LAUNCHING: ${strategy.topic.toUpperCase()} DIVISION`;
        
        // RECURSION:
        loopId = setTimeout(() => {
          runCycle();
        }, 4000); // Wait 4 seconds before the next idea

      }, 1800);
    }
  }
});
