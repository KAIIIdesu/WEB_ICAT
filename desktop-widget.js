document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Stylesheet Link for FontAwesome and custom styles if not already present
  if (!document.getElementById('font-awesome-css')) {
    const faLink = document.createElement('link');
    faLink.id = 'font-awesome-css';
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(faLink);
  }

  // 2. HTML Markup to inject dynamically
  const widgetHTML = `
    <!-- Trigger Button -->
    <div id="icat-desktop-trigger" class="icat-trigger" title="Open ICAT System Hub">
      <div class="trigger-inner">
        <i class="fa-solid fa-folder-open"></i>
      </div>
      <span class="trigger-label">ICAT HUB</span>
    </div>

    <!-- Desktop Window Container -->
    <div id="icat-desktop-window" class="icat-window">
      <!-- Title Bar -->
      <div class="icat-title-bar">
        <div class="icat-title-left">
          <i class="fa-solid fa-computer"></i>
          <span class="system-title">ICAT Desktop HUD</span>
        </div>
        <div class="icat-title-right">
          <button class="icat-win-btn icat-btn-minimize" id="icat-win-min" title="Minimize"><i class="fa-solid fa-minus"></i></button>
          <button class="icat-win-btn icat-btn-close" id="icat-win-close" title="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="icat-content-area">
        <!-- Breadcrumb / Back Button -->
        <div class="icat-breadcrumb-container" id="icat-breadcrumb-container" style="display: none;">
          <button class="icat-back-btn" id="icat-back-btn"><i class="fa-solid fa-chevron-left"></i> Back</button>
          <div class="icat-breadcrumb">
            <span class="breadcrumb-item" id="breadcrumb-home">Desktop</span>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active" id="breadcrumb-current">Folder</span>
          </div>
        </div>

        <!-- Desktop Grid View (Folders & Direct Links) -->
        <div class="icat-desktop-grid" id="icat-desktop-grid">
          <!-- Folder 1: ICAT IoT (External link) -->
          <div class="icat-grid-item link-item" data-url="https://icat-iot.web.app" data-keywords="icat iot internet web app link external">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-cloud-arrow-up network-icon-blue"></i>
            </div>
            <span class="icat-icon-label">ICAT IoT</span>
          </div>

          <!-- Folder 2: Whisper Of Anima (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.youtube.com/watch?v=0dcG38iSdvw" data-keywords="whisper of anima youtube video clip presentation unreal game">
            <div class="icat-icon-wrapper">
              <i class="fa-brands fa-youtube youtube-icon-red"></i>
            </div>
            <span class="icat-icon-label">Whisper of Anima</span>
          </div>

          <!-- Folder 3: Presentation (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.canva.com/design/DAGPlUgsBmQ/UmNTxmGYy1dFL3yyzQ1hxA/view?embed#1" data-keywords="presentation slides canva design research layout info">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-file-powerpoint presentation-icon-orange"></i>
            </div>
            <span class="icat-icon-label">Presentation</span>
          </div>

          <!-- Folder 4: Summary (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.canva.com/design/DAHLl9Z4kwA/soJ1x_6d7ZyehRbo_o6QYg/view?embed" data-keywords="summary document canva overview sheet quick guide report">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-file-contract summary-icon-teal"></i>
            </div>
            <span class="icat-icon-label">Summary</span>
          </div>

          <!-- Folder 5: Turtle Project (Internal view) -->
          <div class="icat-grid-item folder-item" data-folder="turtle" data-keywords="icon turtle project conservation simulation green area">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-turtle turtle-icon-green"></i>
            </div>
            <span class="icat-icon-label">Turtle Project</span>
          </div>

          <!-- Folder 6: Live Telemetry (Internal view) -->
          <div class="icat-grid-item folder-item" data-folder="telemetry" data-keywords="live telemetry system monitoring cpu gpu load iot status sensor stats performance">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder folder-main-icon"></i>
              <i class="fa-solid fa-folder-open folder-open-icon"></i>
              <span class="telemetry-dot"></span>
            </div>
            <span class="icat-icon-label">Live Telemetry</span>
          </div>

          <!-- Folder 7: Lab Network (Internal view) -->
          <div class="icat-grid-item folder-item" data-folder="network" data-keywords="lab network directory staff contact email links camt cmu faculty">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder folder-main-icon"></i>
              <i class="fa-solid fa-folder-open folder-open-icon"></i>
            </div>
            <span class="icat-icon-label">Lab Network</span>
          </div>
        </div>

        <!-- Explorer Views (Containers for sub-folders) -->
        <div class="icat-explorer-view" id="icat-explorer-view" style="display: none;">
          
          <!-- SUB-VIEW 1: Turtle Project details -->
          <div class="icat-sub-content" id="sub-turtle" style="display: none;">
            <div class="turtle-project-panel">
              <div class="turtle-header">
                <i class="fa-solid fa-turtle turtle-panel-icon"></i>
                <div class="turtle-title-area">
                  <h4>Turtle Project</h4>
                  <p class="turtle-meta">Sea Turtle Conservation & Drone Mapping Integration</p>
                </div>
              </div>
              <div class="turtle-body">
                <p>This project uses advanced photogrammetry, smart sensors, and spatial database mapping (GIS) to monitor nesting sites and track sea turtle hatchling migration paths along Southern Thai coastlines.</p>
                <div class="turtle-status">
                  <span class="status-badge"><i class="fa-solid fa-circle-info"></i> Project Status</span>
                  <p>Details and simulation configurations are currently being updated by the ICAT team. Interactive telemetry widgets for drone tracking grids will be deployed in the next minor system release.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- SUB-VIEW 2: Live Telemetry HUD -->
          <div class="icat-sub-content" id="sub-telemetry" style="display: none;">
            <div class="telemetry-dashboard">
              <div class="telemetry-status-bar">
                <div class="telemetry-status-indicator">
                  <span class="status-led led-green"></span>
                  <span class="status-text text-green">OS STATUS: OPTIMAL</span>
                </div>
                <span class="system-uptime" id="uptime-display">Uptime: 00h 00m 00s</span>
              </div>

              <!-- Bar graphs for CPU / GPU / RAM -->
              <div class="telemetry-meters">
                <div class="meter-box">
                  <div class="meter-info">
                    <span class="meter-name"><i class="fa-solid fa-microchip"></i> Server CPU Load</span>
                    <span class="meter-val" id="cpu-percent">0%</span>
                  </div>
                  <div class="meter-track">
                    <div class="meter-fill fill-blue" id="cpu-bar-fill" style="width: 0%"></div>
                  </div>
                </div>

                <div class="meter-box">
                  <div class="meter-info">
                    <span class="meter-name"><i class="fa-solid fa-temperature-half"></i> GPU Core Temp</span>
                    <span class="meter-val" id="gpu-temp">0°C</span>
                  </div>
                  <div class="meter-track">
                    <div class="meter-fill fill-orange" id="gpu-bar-fill" style="width: 0%"></div>
                  </div>
                </div>

                <div class="meter-box">
                  <div class="meter-info">
                    <span class="meter-name"><i class="fa-solid fa-memory"></i> Memory Allocation</span>
                    <span class="meter-val" id="ram-usage">0.0 / 16.0 GB</span>
                  </div>
                  <div class="meter-track">
                    <div class="meter-fill fill-green" id="ram-bar-fill" style="width: 0%"></div>
                  </div>
                </div>
              </div>

              <!-- Node Mesh Status -->
              <div class="telemetry-nodes">
                <div class="nodes-title">IoT Campus Node Mesh</div>
                <div class="nodes-list">
                  <div class="node-item">
                    <span class="node-led online"></span>
                    <span class="node-name">Node-A (ERDI Canopy)</span>
                    <span class="node-ping">12ms</span>
                  </div>
                  <div class="node-item">
                    <span class="node-led online"></span>
                    <span class="node-name">Node-B (CAMT XR Lab)</span>
                    <span class="node-ping">8ms</span>
                  </div>
                  <div class="node-item">
                    <span class="node-led standby" id="node-c-led"></span>
                    <span class="node-name">Node-C (Mae Hia Twin)</span>
                    <span class="node-ping" id="node-c-ping">Standby</span>
                  </div>
                </div>
              </div>

              <!-- Interactive controls -->
              <div class="telemetry-actions">
                <button class="tel-action-btn" id="tel-reboot-btn"><i class="fa-solid fa-rotate"></i> Reboot Nodes</button>
                <button class="tel-action-btn primary" id="tel-boost-btn"><i class="fa-solid fa-bolt"></i> Boost CPU</button>
              </div>
            </div>
          </div>

          <!-- SUB-VIEW 3: Network & Contact -->
          <div class="icat-sub-content" id="sub-network" style="display: none;">
            <div class="network-container">
              <div class="network-description">Connect with ICAT Research Lab institutes and resources:</div>
              <div class="network-list">
                <a href="https://camt.cmu.ac.th" target="_blank" rel="noopener noreferrer" class="network-item">
                  <div class="network-icon-box"><i class="fa-solid fa-graduation-cap"></i></div>
                  <div class="network-text">
                    <span class="network-name">CAMT College Office</span>
                    <span class="network-desc">College of Arts, Media, and Technology, CMU</span>
                  </div>
                  <div class="network-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                </a>

                <a href="https://erdi.cmu.ac.th" target="_blank" rel="noopener noreferrer" class="network-item">
                  <div class="network-icon-box"><i class="fa-solid fa-solar-panel"></i></div>
                  <div class="network-text">
                    <span class="network-name">ERDI-CMU Portal</span>
                    <span class="network-desc">Energy Research and Development Institute</span>
                  </div>
                  <div class="network-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                </a>

                <a href="mailto:icat.lab@cmu.ac.th" class="network-item">
                  <div class="network-icon-box"><i class="fa-solid fa-envelope"></i></div>
                  <div class="network-text">
                    <span class="network-name">Direct Inquiries</span>
                    <span class="network-desc">icat.lab@cmu.ac.th (Faculty & Staff Coordinator)</span>
                  </div>
                  <div class="network-arrow"><i class="fa-solid fa-envelope-open-text"></i></div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- Taskbar / Dock at bottom of mini desktop -->
      <div class="icat-taskbar">
        <!-- Start / Home button -->
        <button class="taskbar-btn" id="taskbar-home-btn" title="Back to Desktop">
          <i class="fa-solid fa-house"></i>
        </button>

        <!-- Windows-like Search Box in Taskbar -->
        <div class="taskbar-search-wrapper">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="icat-desktop-search" placeholder="Type here to search..." autocomplete="off" />
          <button class="icat-search-clear" id="icat-search-clear" style="display: none;"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <!-- Clock & Status at Bottom-Right of Taskbar -->
        <div class="taskbar-status-area">
          <div class="system-icons">
            <i class="fa-solid fa-wifi" title="Network Connected"></i>
          </div>
          <span class="icat-system-time" id="system-clock">12:00:00</span>
        </div>
      </div>
    </div>
  `;

  // 3. Create container and append elements
  const widgetContainer = document.createElement('div');
  widgetContainer.id = 'icat-desktop-overlay-container';
  widgetContainer.innerHTML = widgetHTML;
  document.body.appendChild(widgetContainer);

  // 4. Cache DOM Elements
  const trigger = document.getElementById('icat-desktop-trigger');
  const windowEl = document.getElementById('icat-desktop-window');
  const closeBtn = document.getElementById('icat-win-close');
  const minimizeBtn = document.getElementById('icat-win-min');
  const searchInput = document.querySelector('.taskbar-search-wrapper input');
  const clearSearchBtn = document.getElementById('icat-search-clear');
  
  const breadcrumbContainer = document.getElementById('icat-breadcrumb-container');
  const backBtn = document.getElementById('icat-back-btn');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const breadcrumbHome = document.getElementById('breadcrumb-home');

  const desktopGrid = document.getElementById('icat-desktop-grid');
  const explorerView = document.getElementById('icat-explorer-view');
  
  const subTurtle = document.getElementById('sub-turtle');
  const subTelemetry = document.getElementById('sub-telemetry');
  const subNetwork = document.getElementById('sub-network');
  const subContents = [subTurtle, subTelemetry, subNetwork];

  const taskbarHomeBtn = document.getElementById('taskbar-home-btn');

  // Telemetry variables
  const cpuPercent = document.getElementById('cpu-percent');
  const cpuBarFill = document.getElementById('cpu-bar-fill');
  const gpuTemp = document.getElementById('gpu-temp');
  const gpuBarFill = document.getElementById('gpu-bar-fill');
  const ramUsage = document.getElementById('ram-usage');
  const ramBarFill = document.getElementById('ram-bar-fill');
  const uptimeDisplay = document.getElementById('uptime-display');
  const boostBtn = document.getElementById('tel-boost-btn');
  const rebootBtn = document.getElementById('tel-reboot-btn');
  const nodeCLed = document.getElementById('node-c-led');
  const nodeCPing = document.getElementById('node-c-ping');

  // Application State
  let currentFolder = null; // null (Desktop), 'turtle', 'telemetry', 'network'
  let systemUptimeSeconds = 51300; // Simulated starting uptime (approx 14h 15m)
  let isBoosted = false;
  let telemetryInterval = null;
  let uptimeInterval = null;

  // 5. Open/Close Logic
  function toggleWindow() {
    const isOpen = windowEl.classList.contains('active');
    if (isOpen) {
      closeWindow();
    } else {
      openWindow();
    }
  }

  function openWindow() {
    windowEl.classList.add('active');
    trigger.classList.add('minimized');
    searchInput.focus();
    startSimulations();
  }

  function closeWindow() {
    windowEl.classList.remove('active');
    trigger.classList.remove('minimized');
    stopSimulations();
  }

  trigger.addEventListener('click', toggleWindow);
  closeBtn.addEventListener('click', closeWindow);
  minimizeBtn.addEventListener('click', closeWindow);

  // 6. Clock logic (Taskbar clock updates seconds)
  function updateClock() {
    const clockEl = document.getElementById('system-clock');
    if (clockEl) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // 7. Navigation logic
  function navigateToFolder(folderName) {
    currentFolder = folderName;
    desktopGrid.style.display = 'none';
    explorerView.style.display = 'block';
    
    // Hide all sub-contents, show the active one
    subContents.forEach(content => {
      content.style.display = 'none';
    });

    breadcrumbContainer.style.display = 'flex';
    
    if (folderName === 'turtle') {
      subTurtle.style.display = 'block';
      breadcrumbCurrent.textContent = 'Turtle Project';
    } else if (folderName === 'telemetry') {
      subTelemetry.style.display = 'block';
      breadcrumbCurrent.textContent = 'Live Telemetry';
    } else if (folderName === 'network') {
      subNetwork.style.display = 'block';
      breadcrumbCurrent.textContent = 'Lab Network';
    }

    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    filterExplorerItems();
  }

  function navigateToDesktop() {
    currentFolder = null;
    desktopGrid.style.display = 'grid';
    explorerView.style.display = 'none';
    breadcrumbContainer.style.display = 'none';
    
    // Reset search
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    filterDesktopGrid();
  }

  // Register grid clicks (Link items and folder items)
  const gridItems = document.querySelectorAll('.icat-grid-item');
  gridItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('link-item')) {
        // Direct link
        const url = item.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      } else if (item.classList.contains('folder-item')) {
        // Sub-folder navigation
        const folder = item.getAttribute('data-folder');
        navigateToFolder(folder);
      }
    });
  });

  backBtn.addEventListener('click', navigateToDesktop);
  breadcrumbHome.addEventListener('click', navigateToDesktop);
  taskbarHomeBtn.addEventListener('click', navigateToDesktop);

  // 8. Telemetry Simulation
  function formatUptime(sec) {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const secs = String(sec % 60).padStart(2, '0');
    return `Uptime: ${hrs}h ${mins}m ${secs}s`;
  }

  function startSimulations() {
    // Uptime ticker
    if (uptimeInterval) clearInterval(uptimeInterval);
    uptimeInterval = setInterval(() => {
      systemUptimeSeconds++;
      uptimeDisplay.textContent = formatUptime(systemUptimeSeconds);
    }, 1000);

    // Live Telemetry updates
    updateTelemetryMeters();
    if (telemetryInterval) clearInterval(telemetryInterval);
    telemetryInterval = setInterval(updateTelemetryMeters, 1500);
  }

  function stopSimulations() {
    if (uptimeInterval) clearInterval(uptimeInterval);
    if (telemetryInterval) clearInterval(telemetryInterval);
  }

  function updateTelemetryMeters() {
    // Generate simulated CPU, GPU, RAM stats
    let cpuMin = isBoosted ? 70 : 25;
    let cpuMax = isBoosted ? 98 : 65;
    let cpuVal = Math.floor(Math.random() * (cpuMax - cpuMin + 1)) + cpuMin;

    let gpuMin = isBoosted ? 68 : 45;
    let gpuMax = isBoosted ? 85 : 62;
    let gpuVal = Math.floor(Math.random() * (gpuMax - gpuMin + 1)) + gpuMin;

    // RAM allocation
    let ramBase = isBoosted ? 12.4 : 7.8;
    let ramVar = Math.random() * 1.2;
    let ramVal = (ramBase + ramVar).toFixed(1);
    let ramPercent = Math.round((ramVal / 16.0) * 100);

    // Render in UI
    cpuPercent.textContent = `${cpuVal}%`;
    cpuBarFill.style.width = `${cpuVal}%`;

    gpuTemp.textContent = `${gpuVal}°C`;
    gpuBarFill.style.width = `${Math.min(100, (gpuVal / 100) * 100)}%`;
    if (gpuVal > 75) {
      gpuBarFill.style.background = '#0f3c5f'; // High temp styling to match academic blue
    } else {
      gpuBarFill.style.background = '#0f3c5f'; // Academic blue theme
    }

    ramUsage.textContent = `${ramVal} / 16.0 GB`;
    ramBarFill.style.width = `${ramPercent}%`;
  }

  // Interactive Buttons: Boost & Reboot
  boostBtn.addEventListener('click', () => {
    isBoosted = !isBoosted;
    if (isBoosted) {
      boostBtn.innerHTML = '<i class="fa-solid fa-bolt-lightning"></i> CPU Normal';
      boostBtn.classList.add('boosted');
      // Blink Node C green and set it online
      nodeCLed.className = 'node-led online';
      nodeCPing.textContent = '14ms';
      nodeCPing.style.color = '#0f3c5f';
      // Trigger instant update
      updateTelemetryMeters();
    } else {
      boostBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Boost CPU';
      boostBtn.classList.remove('boosted');
      // Return Node C to standby
      nodeCLed.className = 'node-led standby';
      nodeCPing.textContent = 'Standby';
      nodeCPing.style.color = '';
      updateTelemetryMeters();
    }
  });

  rebootBtn.addEventListener('click', () => {
    // Reboot animation
    rebootBtn.disabled = true;
    rebootBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Rebooting...';
    
    // Drop telemetry values
    cpuPercent.textContent = '1%';
    cpuBarFill.style.width = '1%';
    gpuTemp.textContent = '35°C';
    gpuBarFill.style.width = '35%';
    ramUsage.textContent = '1.2 / 16.0 GB';
    ramBarFill.style.width = '7%';

    // Disable LEDs
    const leds = document.querySelectorAll('.node-led');
    leds.forEach(led => {
      led.classList.add('offline');
    });

    setTimeout(() => {
      rebootBtn.disabled = false;
      rebootBtn.innerHTML = '<i class="fa-solid fa-rotate"></i> Reboot Nodes';
      
      // Reset LEDs
      leds.forEach(led => {
        led.classList.remove('offline');
      });
      // Ensure node C led maintains state
      if (!isBoosted) {
        nodeCLed.className = 'node-led standby';
        nodeCPing.textContent = 'Standby';
      } else {
        nodeCLed.className = 'node-led online';
        nodeCPing.textContent = '14ms';
      }

      updateTelemetryMeters();
    }, 2000);
  });

  // 9. Search logic
  searchInput.addEventListener('input', () => {
    const val = searchInput.value.toLowerCase().trim();
    if (val.length > 0) {
      clearSearchBtn.style.display = 'block';
    } else {
      clearSearchBtn.style.display = 'none';
    }

    if (currentFolder === null) {
      filterDesktopGrid(val);
    } else {
      filterExplorerItems(val);
    }
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    if (currentFolder === null) {
      filterDesktopGrid();
    } else {
      filterExplorerItems();
    }
    searchInput.focus();
  });

  function filterDesktopGrid(query = '') {
    const items = desktopGrid.querySelectorAll('.icat-grid-item');
    items.forEach(item => {
      const keywords = item.getAttribute('data-keywords') || '';
      const label = item.querySelector('.icat-icon-label').textContent.toLowerCase();
      if (keywords.includes(query) || label.includes(query)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  function filterExplorerItems(query = '') {
    if (currentFolder === 'telemetry') {
      const items = document.querySelectorAll('.node-item');
      items.forEach(item => {
        const name = item.querySelector('.node-name').textContent.toLowerCase();
        if (name.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    } else if (currentFolder === 'network') {
      const items = document.querySelectorAll('.network-item');
      items.forEach(item => {
        const name = item.querySelector('.network-name').textContent.toLowerCase();
        const desc = item.querySelector('.network-desc').textContent.toLowerCase();
        if (name.includes(query) || desc.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    }
  }
});
