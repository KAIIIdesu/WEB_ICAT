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
              <i class="fa-solid fa-folder folder-main-icon network-icon-blue"></i>
              <i class="fa-solid fa-folder-open folder-open-icon network-icon-blue"></i>
            </div>
            <span class="icat-icon-label">ICAT IoT</span>
          </div>

          <!-- Folder 2: Whisper Of Anima (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.youtube.com/watch?v=0dcG38iSdvw" data-keywords="whisper of anima youtube video clip presentation unreal game">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder folder-main-icon youtube-icon-red"></i>
              <i class="fa-solid fa-folder-open folder-open-icon youtube-icon-red"></i>
            </div>
            <span class="icat-icon-label">Whisper of Anima</span>
          </div>

          <!-- Folder 3: Presentation (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.canva.com/design/DAGPlUgsBmQ/UmNTxmGYy1dFL3yyzQ1hxA/view?embed#1" data-keywords="presentation slides canva design research layout info">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder folder-main-icon presentation-icon-orange"></i>
              <i class="fa-solid fa-folder-open folder-open-icon presentation-icon-orange"></i>
            </div>
            <span class="icat-icon-label">Presentation</span>
          </div>

          <!-- Folder 4: Summary (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.canva.com/design/DAHLl9Z4kwA/soJ1x_6d7ZyehRbo_o6QYg/view?embed" data-keywords="summary document canva overview sheet quick guide report">
            <div class="icat-icon-wrapper">
              <i class="fa-solid fa-folder folder-main-icon summary-icon-teal"></i>
              <i class="fa-solid fa-folder-open folder-open-icon summary-icon-teal"></i>
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

          <!-- Folder 6: Facebook (External link) -->
          <div class="icat-grid-item link-item" data-url="https://www.facebook.com/profile.php?id=61572306429989" data-keywords="facebook page social profile group link contact">
            <div class="icat-icon-wrapper">
              <i class="fa-brands fa-facebook" style="font-size: 2.2rem; color: #1877F2;"></i>
            </div>
            <span class="icat-icon-label">Facebook</span>
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

  // 3. Dynamic Mobile Hamburger Navigation Menu Toggle
  function initMobileNav() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;

    // Check if toggle already exists
    if (navContainer.querySelector('.mobile-nav-toggle')) return;

    const navLinks = navContainer.querySelector('.nav-links');
    if (!navLinks) return;

    // Create hamburger toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'mobile-nav-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle Navigation');
    toggleButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    
    // Append to navContainer
    navContainer.appendChild(toggleButton);

    // Toggle menu state on click
    toggleButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('mobile-menu-open');
      
      // Toggle icon between bars and X
      const icon = toggleButton.querySelector('i');
      if (navLinks.classList.contains('mobile-menu-open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('mobile-menu-open') && !navLinks.contains(e.target) && !toggleButton.contains(e.target)) {
        navLinks.classList.remove('mobile-menu-open');
        toggleButton.querySelector('i').className = 'fa-solid fa-bars';
      }
    });
  }

  initMobileNav();

  // 10. Global Site Search Bar logic
  function initSiteSearch() {
    const searchToggleBtn = document.getElementById('search-toggle-btn');
    const searchInputWrapper = document.getElementById('search-input-wrapper');
    const siteSearchInput = document.getElementById('site-search-input');
    const searchClearBtn = document.getElementById('search-clear-btn');

    if (!searchToggleBtn || !searchInputWrapper || !siteSearchInput || !searchClearBtn) return;

    // Toggle search input
    searchToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchToggleBtn.style.display = 'none';
      searchInputWrapper.classList.remove('hidden');
      siteSearchInput.focus();
    });

    // Close search input when clicking clear button (X) if input is empty, otherwise clear text
    searchClearBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (siteSearchInput.value.trim() === '') {
        closeSearch();
      } else {
        siteSearchInput.value = '';
        performPageSearch('');
        siteSearchInput.focus();
      }
    });

    // Helper to close search bar
    function closeSearch() {
      siteSearchInput.value = '';
      performPageSearch('');
      searchInputWrapper.classList.add('hidden');
      searchToggleBtn.style.display = 'flex';
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInputWrapper.contains(e.target) && e.target !== searchToggleBtn && !searchToggleBtn.contains(e.target)) {
        if (siteSearchInput.value.trim() === '') {
          closeSearch();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearch();
      }
    });

    // Handle typing in input
    let searchDebounceTimeout;
    siteSearchInput.addEventListener('input', () => {
      clearTimeout(searchDebounceTimeout);
      searchDebounceTimeout = setTimeout(() => {
        performPageSearch(siteSearchInput.value);
      }, 200);
    });

    // Handle Enter key to jump to results
    siteSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        clearTimeout(searchDebounceTimeout);
        performPageSearch(siteSearchInput.value);

        // Scroll to the first highlighted match
        const firstHighlight = document.querySelector('mark.search-highlight');
        if (firstHighlight) {
          const offset = 90;
          const elementPosition = firstHighlight.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback: scroll to first visible matching card
          const visibleCard = Array.from(document.querySelectorAll('.staff-dir-card, .game-portfolio-card, .project-card'))
            .find(card => card.style.display !== 'none' && siteSearchInput.value.trim() !== '');
          if (visibleCard) {
            const offset = 90;
            const elementPosition = visibleCard.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    });

    // Page search implementation (filters elements and highlights text nodes)
    let highlightedNodes = [];

    function performPageSearch(query) {
      const queryClean = query.toLowerCase().trim();

      // A. Filter lists (cards) on specific pages if they exist

      // 1. Staff directory cards (staff.html)
      const staffCards = document.querySelectorAll('.staff-dir-card');
      staffCards.forEach(card => {
        if (!queryClean || card.textContent.toLowerCase().includes(queryClean)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // 2. Projects & events dossier cards (projects.html, events.html)
      const portfolioCards = document.querySelectorAll('.game-portfolio-card');
      portfolioCards.forEach(card => {
        if (!queryClean || card.textContent.toLowerCase().includes(queryClean)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // 3. Home projects carousel cards (index.html)
      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        if (!queryClean || card.textContent.toLowerCase().includes(queryClean)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      // B. Highlighting text matches in static text nodes
      removeHighlights();
      if (queryClean.length >= 2) {
        highlightTextInElement(document.querySelector('main.paper-layout') || document.body, queryClean);
      }
    }

    function highlightTextInElement(element, query) {
      if (!element) return;
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        const parent = node.parentNode;
        if (parent) {
          const tag = parent.tagName.toUpperCase();
          const skipSelector = 'a, button, .project-card, .game-portfolio-card, .staff-dir-card, .close-details-btn-round, script, style, input, textarea, .journal-search-container, .research-modal-overlay';
          if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'BUTTON' && tag !== 'MARK' && !parent.closest(skipSelector)) {
            textNodes.push(node);
          }
        }
      }

      textNodes.forEach(node => {
        const text = node.nodeValue;
        const lowerText = text.toLowerCase();
        let index = lowerText.indexOf(query);
        if (index !== -1) {
          const parent = node.parentNode;
          if (!parent) return;

          const fragment = document.createDocumentFragment();
          let lastIdx = 0;
          while (index !== -1) {
            // Add prefix text
            if (index > lastIdx) {
              fragment.appendChild(document.createTextNode(text.substring(lastIdx, index)));
            }
            // Add highlighted text
            const mark = document.createElement('mark');
            mark.className = 'search-highlight';
            mark.textContent = text.substring(index, index + query.length);
            fragment.appendChild(mark);

            lastIdx = index + query.length;
            index = lowerText.indexOf(query, lastIdx);
          }
          // Add suffix text
          if (lastIdx < text.length) {
            fragment.appendChild(document.createTextNode(text.substring(lastIdx)));
          }

          // Replace text node with our fragment
          parent.replaceChild(fragment, node);
          highlightedNodes.push(parent);
        }
      });
    }

    function removeHighlights() {
      const marks = document.querySelectorAll('mark.search-highlight');
      marks.forEach(mark => {
        const parent = mark.parentNode;
        if (parent) {
          parent.replaceChild(document.createTextNode(mark.textContent), mark);
        }
      });
      // Normalize parents to merge adjacent text nodes
      highlightedNodes.forEach(parent => {
        if (parent) {
          parent.normalize();
        }
      });
      highlightedNodes = [];
    }
  }

  initSiteSearch();
});
