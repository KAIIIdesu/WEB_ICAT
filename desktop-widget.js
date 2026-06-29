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
        <i class="fa-solid fa-terminal"></i>
        <span class="pulsing-halo"></span>
      </div>
      <span class="trigger-label">SYSTEM HUB</span>
    </div>

    <!-- Desktop Window Container -->
    <div id="icat-desktop-window" class="icat-window">
      <!-- Title Bar -->
      <div class="icat-title-bar">
        <div class="icat-title-left">
          <i class="fa-solid fa-network-wired"></i>
          <span class="system-title">ICAT OS v1.0</span>
        </div>
        <div class="icat-title-right">
          <span class="icat-system-time" id="system-clock">12:00:00</span>
          <button class="icat-win-btn icat-btn-minimize" id="icat-win-min" title="Minimize"><i class="fa-solid fa-minus"></i></button>
          <button class="icat-win-btn icat-btn-close" id="icat-win-close" title="Close"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>

      <!-- Search Area -->
      <div class="icat-search-bar-container">
        <div class="icat-search-wrapper">
          <i class="fa-solid fa-magnifying-glass search-icon"></i>
          <input type="text" id="icat-desktop-search" placeholder="Search files, telemetry..." autocomplete="off" />
          <button class="icat-search-clear" id="icat-search-clear" style="display: none;"><i class="fa-solid fa-xmark"></i></button>
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

        <!-- Desktop Grid View (Folders) -->
        <div class="icat-desktop-grid" id="icat-desktop-grid">
          <div class="icat-grid-item" data-folder="research" data-keywords="research papers doc case study carbon smart city xr vr cmu documents">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder-closed folder-main-icon"></i>
              <i class="fa-solid fa-folder-open folder-open-icon"></i>
              <span class="item-count">3</span>
            </div>
            <span class="icat-icon-label">Research Docs</span>
          </div>

          <div class="icat-grid-item" data-folder="telemetry" data-keywords="live telemetry system monitoring cpu gpu load iot status sensor stats performance">
            <div class="icat-icon-wrapper telemetry-wrapper">
              <i class="fa-solid fa-chart-line telemetry-main-icon"></i>
              <span class="status-pulse-dot"></span>
            </div>
            <span class="icat-icon-label">Live Telemetry</span>
          </div>

          <div class="icat-grid-item" data-folder="network" data-keywords="lab network directory staff contact email links camt cmu faculty">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-globe network-main-icon"></i>
            </div>
            <span class="icat-icon-label">Lab Network</span>
          </div>
        </div>

        <!-- Explorer Views (Containers for sub-folders) -->
        <div class="icat-explorer-view" id="icat-explorer-view" style="display: none;">
          
          <!-- SUB-VIEW 1: Research Files -->
          <div class="icat-sub-content" id="sub-research" style="display: none;">
            <div class="icat-file-list" id="research-file-list">
              <div class="icat-file-item" data-file="carbon" data-keywords="cmu carbon footprint index real-time 3d netzero erdi engineering study">
                <div class="file-icon"><i class="fa-solid fa-file-pdf"></i></div>
                <div class="file-details">
                  <div class="file-title">CMU Carbon Index Study</div>
                  <div class="file-meta">PDF • 1.2 MB • Published: June 2026</div>
                </div>
              </div>
              <div class="icat-file-item" data-file="xr" data-keywords="immersive reality xr vr virtual tour cmu camt case study interactive">
                <div class="file-icon"><i class="fa-solid fa-file-pdf"></i></div>
                <div class="file-details">
                  <div class="file-title">Immersive Reality (XR) Report</div>
                  <div class="file-meta">PDF • 2.5 MB • Published: April 2026</div>
                </div>
              </div>
              <div class="icat-file-item" data-file="smartcity" data-keywords="smart livable city urban planning thailand noise particulate pm2.5 gis">
                <div class="file-icon"><i class="fa-solid fa-file-pdf"></i></div>
                <div class="file-details">
                  <div class="file-title">Smart & Livable City Case</div>
                  <div class="file-meta">PDF • 1.8 MB • Published: Feb 2026</div>
                </div>
              </div>
            </div>

            <!-- Single File Content Viewer (Nested) -->
            <div class="icat-file-viewer" id="icat-file-viewer" style="display: none;">
              <button class="file-close-btn" id="file-close-btn"><i class="fa-solid fa-arrow-left"></i> Back to Documents</button>
              <div class="file-viewer-body" id="file-viewer-body">
                <!-- Dynamic Content Loaded Here -->
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
        <button class="taskbar-btn" id="taskbar-home-btn" title="Back to Desktop">
          <i class="fa-solid fa-house"></i>
        </button>
        <div class="taskbar-active-apps">
          <span class="taskbar-app-pill active" id="taskbar-app-indicator"><i class="fa-solid fa-border-all"></i> Desktop</span>
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
  const searchInput = document.getElementById('icat-desktop-search');
  const clearSearchBtn = document.getElementById('icat-search-clear');
  
  const breadcrumbContainer = document.getElementById('icat-breadcrumb-container');
  const backBtn = document.getElementById('icat-back-btn');
  const breadcrumbCurrent = document.getElementById('breadcrumb-current');
  const breadcrumbHome = document.getElementById('breadcrumb-home');

  const desktopGrid = document.getElementById('icat-desktop-grid');
  const explorerView = document.getElementById('icat-explorer-view');
  
  const subResearch = document.getElementById('sub-research');
  const subTelemetry = document.getElementById('sub-telemetry');
  const subNetwork = document.getElementById('sub-network');
  const subContents = [subResearch, subTelemetry, subNetwork];

  const taskbarHomeBtn = document.getElementById('taskbar-home-btn');
  const taskbarAppIndicator = document.getElementById('taskbar-app-indicator');

  const fileViewer = document.getElementById('icat-file-viewer');
  const fileViewerBody = document.getElementById('file-viewer-body');
  const fileViewerClose = document.getElementById('file-close-btn');
  const researchFileList = document.getElementById('research-file-list');

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
  let currentFolder = null; // null (Desktop), 'research', 'telemetry', 'network'
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
    
    if (folderName === 'research') {
      subResearch.style.display = 'block';
      breadcrumbCurrent.textContent = 'Research Docs';
      taskbarAppIndicator.innerHTML = '<i class="fa-solid fa-folder-open"></i> Research Docs';
      // Reset nested file viewer state
      closeFileViewer();
    } else if (folderName === 'telemetry') {
      subTelemetry.style.display = 'block';
      breadcrumbCurrent.textContent = 'Live Telemetry';
      taskbarAppIndicator.innerHTML = '<i class="fa-solid fa-chart-line"></i> Live Telemetry';
    } else if (folderName === 'network') {
      subNetwork.style.display = 'block';
      breadcrumbCurrent.textContent = 'Lab Network';
      taskbarAppIndicator.innerHTML = '<i class="fa-solid fa-globe"></i> Lab Network';
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
    taskbarAppIndicator.innerHTML = '<i class="fa-solid fa-border-all"></i> Desktop';
    
    // Reset search
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    filterDesktopGrid();
  }

  // Register folder clicks
  const folderItems = document.querySelectorAll('.icat-grid-item');
  folderItems.forEach(item => {
    item.addEventListener('click', () => {
      const folder = item.getAttribute('data-folder');
      navigateToFolder(folder);
    });
  });

  backBtn.addEventListener('click', () => {
    // If in research file viewer, go back to document list first
    if (currentFolder === 'research' && fileViewer.style.display === 'block') {
      closeFileViewer();
    } else {
      navigateToDesktop();
    }
  });
  
  breadcrumbHome.addEventListener('click', navigateToDesktop);
  taskbarHomeBtn.addEventListener('click', navigateToDesktop);

  // 8. File Viewer Details (Within Research Docs)
  const fileData = {
    carbon: {
      title: "CMU Carbon Index Study",
      subtitle: "Integrated Real-time ESG Campus Telemetry",
      meta: "PMU-C Grant-2025 • Collaborating Institution: ERDI-CMU",
      content: `
        <p><strong>Abstract:</strong> This research presents a virtual 3D carbon telemetry dashboard designed for the Chiang Mai University (CMU) campus. By networking smart meters and environmental sensors, the Digital Twin platform maps energy distributions and simulates green area offset quotients.</p>
        <div class="doc-highlights">
          <div class="highlight-stat">
            <span class="stat-number">12.4%</span>
            <span class="stat-lbl">Scope 1 Offset</span>
          </div>
          <div class="highlight-stat">
            <span class="stat-number">35 Nodes</span>
            <span class="stat-lbl">Sensing Grid</span>
          </div>
        </div>
        <p><strong>Key Results:</strong> The deployment resulted in a 12.4% efficiency increase in localized cooling allocations, saving approximately 4.8 tons of CO2 equivalent emissions monthly.</p>
        <a href="projects.html#carbon-footprint" class="doc-link-btn">Read Full Article in Projects <i class="fa-solid fa-arrow-right"></i></a>
      `
    },
    xr: {
      title: "Immersive Reality (XR) Report",
      subtitle: "Evaluating Spatial Mapping Accuracy in Virtual Heritage Tours",
      meta: "Faculty Funding Program • Collaborating Institution: CAMT",
      content: `
        <p><strong>Abstract:</strong> This case study explores standard deviations in spatial data scanning for immersive reality (XR/VR) training platforms. Tests were run in historical buildings in Phuket and botanical conservation chambers in Chiang Mai.</p>
        <div class="doc-highlights">
          <div class="highlight-stat">
            <span class="stat-number">±2.4mm</span>
            <span class="stat-lbl">Spatial Accuracy</span>
          </div>
          <div class="highlight-stat">
            <span class="stat-number">90 FPS</span>
            <span class="stat-lbl">Optimized Render</span>
          </div>
        </div>
        <p><strong>Key Results:</strong> Spatial tracking latency was reduced by 15% using quad-mesh optimizations in Unreal Engine 5.2, enabling fully responsive, motion-sickness-free VR setups.</p>
        <a href="unreal.html" class="doc-link-btn">View Unreal Projects <i class="fa-solid fa-arrow-right"></i></a>
      `
    },
    smartcity: {
      title: "Smart & Livable City Case Study",
      subtitle: "Urban GIS Grid Monitoring & Dust Index Analytics",
      meta: "CMU Research Foundation • Smart City Thailand Group",
      content: `
        <p><strong>Abstract:</strong> Investigating spatial noise contours and fine particulate matter (PM2.5) distributions in Northern Thailand. This GIS-integrated dashboard processes citizen-level reports alongside automated sensors to predict hazard zones.</p>
        <div class="doc-highlights">
          <div class="highlight-stat">
            <span class="stat-number">118 Nodes</span>
            <span class="stat-lbl">Active IoT Web</span>
          </div>
          <div class="highlight-stat">
            <span class="stat-number">88.5%</span>
            <span class="stat-lbl">Prediction Acc.</span>
          </div>
        </div>
        <p><strong>Key Results:</strong> Implemented noise-contour grids that helped municipal departments identify heavy-traffic noise hubs and enforce environmental zoning.</p>
        <a href="projects.html#smart-livable-city" class="doc-link-btn">Read Full Article in Projects <i class="fa-solid fa-arrow-right"></i></a>
      `
    }
  };

  const fileItems = document.querySelectorAll('.icat-file-item');
  fileItems.forEach(item => {
    item.addEventListener('click', () => {
      const fileId = item.getAttribute('data-file');
      openFileViewer(fileId);
    });
  });

  function openFileViewer(fileId) {
    const data = fileData[fileId];
    if (data) {
      fileViewerBody.innerHTML = `
        <h4 class="viewer-title">${data.title}</h4>
        <h5 class="viewer-subtitle">${data.subtitle}</h5>
        <div class="viewer-meta">${data.meta}</div>
        <div class="viewer-text">${data.content}</div>
      `;
      researchFileList.style.display = 'none';
      fileViewer.style.display = 'block';
      breadcrumbCurrent.textContent = data.title;
    }
  }

  function closeFileViewer() {
    fileViewer.style.display = 'none';
    researchFileList.style.display = 'block';
    breadcrumbCurrent.textContent = 'Research Docs';
  }

  fileViewerClose.addEventListener('click', closeFileViewer);

  // 9. Telemetry Simulation
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
      gpuBarFill.style.background = '#ef4444'; // Red for high temp
    } else if (gpuVal > 60) {
      gpuBarFill.style.background = '#f59e0b'; // Amber
    } else {
      gpuBarFill.style.background = '#0d9488'; // Teal/Default
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
      nodeCPing.style.color = '#10b981';
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
    gpuBarFill.style.background = '#0d9488';
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

  // 10. Search logic
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
    // If in Research view
    if (currentFolder === 'research') {
      const items = researchFileList.querySelectorAll('.icat-file-item');
      items.forEach(item => {
        const keywords = item.getAttribute('data-keywords') || '';
        const title = item.querySelector('.file-title').textContent.toLowerCase();
        if (keywords.includes(query) || title.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    } else if (currentFolder === 'telemetry') {
      // Filter the telemetry items (e.g. node names)
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
      // Filter network items
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
