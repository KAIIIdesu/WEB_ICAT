document.addEventListener('DOMContentLoaded', () => {
  
  /* ==========================================================================
     1. Carousel Slider Logic for Selected Projects (12 Projects)
     ========================================================================== */
  const track = document.getElementById('projects-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots-container');
  const cards = Array.from(track.children);
  const totalCards = cards.length;
  
  let currentIndex = 0;
  let cardsVisible = 4;
  let pageStops = [];

  // Determine how many cards are visible based on responsive CSS boundaries
  function getCardsVisible() {
    const width = window.innerWidth;
    if (width > 1024) return 4;
    if (width > 768) return 3;
    if (width > 480) return 2;
    return 1;
  }

  // Calculate distinct index stops for pages
  function calculatePageStops() {
    cardsVisible = getCardsVisible();
    const stops = [];
    for (let i = 0; i < totalCards; i += cardsVisible) {
      // Don't let the last page shift past the bounds of available cards
      stops.push(Math.min(i, totalCards - cardsVisible));
    }
    // Filter duplicates
    pageStops = [...new Set(stops)];
    
    // Adjust current index if it exceeds the new bounds
    const maxIndex = totalCards - cardsVisible;
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
  }

  // Build pagination dot elements
  function buildDots() {
    dotsContainer.innerHTML = '';
    pageStops.forEach((stopIndex, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (stopIndex === currentIndex) {
        dot.classList.add('active');
      }
      dot.addEventListener('click', () => {
        slideTo(stopIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }

  // Translate track to slide to target index
  function slideTo(index) {
    if (index < 0) index = 0;
    const maxIndex = totalCards - cardsVisible;
    if (index > maxIndex) index = maxIndex;
    
    currentIndex = index;
    
    const card = cards[0];
    const cardWidth = card.getBoundingClientRect().width;
    
    // Extract gap from computed style (1.5rem is 24px default, but let's grab it live)
    const trackStyle = window.getComputedStyle(track);
    const gap = parseFloat(trackStyle.gap) || 24;
    
    // Compute distance
    const offset = currentIndex * (cardWidth + gap);
    track.style.transform = `translateX(-${offset}px)`;
    
    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === maxIndex;
    
    // Update dots active state
    const dots = Array.from(dotsContainer.children);
    dots.forEach((dot, dotIdx) => {
      const stopIndex = pageStops[dotIdx];
      if (stopIndex === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  // Navigation handlers
  nextBtn.addEventListener('click', () => {
    // Find next stop index or shift by 1
    const nextStops = pageStops.filter(stop => stop > currentIndex);
    if (nextStops.length > 0) {
      slideTo(nextStops[0]);
    } else {
      slideTo(currentIndex + 1);
    }
  });

  prevBtn.addEventListener('click', () => {
    // Find previous stop index
    const prevStops = pageStops.filter(stop => stop < currentIndex);
    if (prevStops.length > 0) {
      slideTo(prevStops[prevStops.length - 1]);
    } else {
      slideTo(currentIndex - 1);
    }
  });

  // Setup/Refresh slider positioning
  function initCarousel() {
    calculatePageStops();
    buildDots();
    slideTo(currentIndex);
  }

  // Initial load
  initCarousel();

  // Handle window resizing
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initCarousel();
    }, 100);
  });


  /* ==========================================================================
     2. Smooth Scrolling with Details Integration
     ========================================================================== */
  const navbarLinks = document.querySelectorAll('.nav-item, .footer-nav-links a');
  const navbarHeight = 70; // Sync with CSS --navbar-height

  // Setup Projects Detailed Data
  const PROJECTS_DATA = [
    {
      tag: "01: CARBON INDEX",
      title: "CMU Carbon Footprint",
      authors: "ERDI-CMU, Faculty of Engineering",
      abstract: "A real-time 3D carbon emission monitoring dashboard designed for Chiang Mai University. Integrated with the IoT sensing grid and ESG metrics, it allows university planners to track net-zero targets and simulate carbon index fluctuations based on live campus operations.",
      tech: "WebGL / Three.js / IoT API",
      platform: "Web Dashboard",
      status: "Active Deployment",
      collab: "ERDI-CMU, Faculty of Engineering",
      link: "https://netzero-cmu-phase-2.vercel.app",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <path d="M20,100 L60,80 L100,90 L140,50 L180,60" fill="none" stroke="#0f3c5f" stroke-width="2"/>
              <circle cx="20" cy="100" r="4" fill="#0f3c5f"/>
              <circle cx="60" cy="80" r="4" fill="#0f3c5f"/>
              <circle cx="100" cy="90" r="4" fill="#0f3c5f"/>
              <circle cx="140" cy="50" r="4" fill="#0f3c5f"/>
              <circle cx="180" cy="60" r="4" fill="#0f3c5f"/>
              <text x="15" y="30" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">NETZERO-CMU 3D</text>
            </svg>`
    },
    {
      tag: "02: MARINE BIO",
      title: "Coral College",
      authors: "Marine Conservation Platform",
      abstract: "An interactive, game-based learning platform for marine biology and coral reef conservation. Built to educate school students about marine biodiversity, climate change impact, and reef recovery initiatives in Thailand, offering interactive quizzes and virtual 3D coral viewing.",
      tech: "React / Three.js / WebGL",
      platform: "Web Application",
      status: "Active Production",
      collab: "Marine Conservation Platform",
      link: "https://coralcollegethailand.org/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <path d="M100,100 C80,80 70,50 100,20 C130,50 120,80 100,100 Z" fill="none" stroke="#0284c7" stroke-width="2"/>
              <path d="M70,80 Q100,60 130,80" fill="none" stroke="#0f3c5f" stroke-width="1.5" stroke-dasharray="4 2"/>
              <text x="15" y="30" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">CORAL EDUCATION</text>
            </svg>`
    },
    {
      tag: "03: URBAN PLANNING",
      title: "Smart & Livable City",
      authors: "Smart City Thailand Development Group",
      abstract: "A comprehensive urban planning visualization suite compiling real-time environmental data, noise maps, particulate matter index (PM2.5), and citizen reporting to support municipal decision-making in Northern Thailand.",
      tech: "GIS Engine / Vue.js / Node.js",
      platform: "Web & Spatial Platform",
      status: "Active Deployment",
      collab: "Smart City Thailand Group",
      link: "https://smartlivablecityth.com/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <rect x="30" y="50" width="30" height="50" fill="none" stroke="#0f3c5f" stroke-width="1.5"/>
              <rect x="70" y="30" width="40" height="70" fill="none" stroke="#0f3c5f" stroke-width="1.5"/>
              <rect x="120" y="60" width="35" height="40" fill="none" stroke="#0f3c5f" stroke-width="1.5"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">URBAN MAPPING</text>
            </svg>`
    },
    {
      tag: "04: TOURISM MOBILE",
      title: "Visit Lamphun",
      authors: "Tourism Promotion Application",
      abstract: "An immersive mobile tourism portal showcasing the cultural heritage, travel routes, local landmarks, and faith tourism spots in the historic Lamphun province using geolocation and interactive maps.",
      tech: "Hybrid App / Firebase / Leaflet",
      platform: "Mobile Web Application",
      status: "Active Deployment",
      collab: "Tourism Authority of Thailand",
      link: "https://visit-lamphun.web.app/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <circle cx="100" cy="50" r="12" fill="none" stroke="#e11d48" stroke-width="2"/>
              <path d="M100,62 L100,85 M85,72 L115,72" stroke="#e11d48" stroke-width="1.5"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">LAMPHUN GUIDE</text>
            </svg>`
    },
    {
      tag: "05: CLINICAL XR",
      title: "Exerbrain CMU",
      authors: "Faculty of Associated Medical Sciences",
      abstract: "A gamified VR/XR clinical support system built in collaboration with the Faculty of Associated Medical Sciences to aid in the continuous cognitive and physical rehabilitation of chronic stroke patients.",
      tech: "Unity / Meta SDK / WebSockets",
      platform: "Clinical VR Simulator",
      status: "Active Clinical Trials",
      collab: "Faculty of Associated Medical Sciences",
      link: "https://exerbrain.ams.cmu.ac.th/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <path d="M10,60 Q50,20 100,60 T190,60" fill="none" stroke="#ef4444" stroke-width="2"/>
              <circle cx="100" cy="60" r="15" fill="none" stroke="#0f3c5f" stroke-dasharray="4 2"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">STROKE REHAB</text>
            </svg>`
    },
    {
      tag: "06: AR SIMULATION",
      title: "Botanic Garden",
      authors: "Queen Sirikit Botanic Research Group",
      abstract: "An augmented reality (AR) botanical exploration system developed for the Queen Sirikit Botanic Garden, allowing visitors to inspect rare tropical plant species and retrieve ecological data in real-time.",
      tech: "AR Foundation / WebXR / GIS",
      platform: "Mobile AR Viewport",
      status: "Active Deployment",
      collab: "Queen Sirikit Botanic Garden",
      link: "https://bontanicgraden-phase2.web.app/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <path d="M100,15 L125,50 L100,85 L75,50 Z" fill="none" stroke="#16a34a" stroke-width="2"/>
              <line x1="100" y1="15" x2="100" y2="85" stroke="#16a34a" stroke-width="1.5"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">QUEEN SIRIKIT BOTANIC</text>
            </svg>`
    },
    {
      tag: "07: CULTURE TRAVEL",
      title: "Muteru (มูเตลู)",
      authors: "CAMT Faith & Fortune Group",
      abstract: "A cultural faith-tourism platform utilizing smart guides and gamified check-ins to promote archaeological and spiritual tourism across temples in Chiang Mai and surrounding provinces.",
      tech: "Vue / Vuelidate / Firebase Auth",
      platform: "Web Application",
      status: "Active Deployment",
      collab: "CAMT Faith & Fortune Group",
      link: "https://camt-muteru.web.app/login",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <circle cx="100" cy="60" r="22" fill="none" stroke="#d97706" stroke-width="1.5"/>
              <polygon points="100,28 105,43 120,43 108,53 112,68 100,58 88,68 92,53 80,43 95,43" fill="#d97706" opacity="0.8"/>
              <text x="15" y="20" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">FAITH TOURISM</text>
            </svg>`
    },
    {
      tag: "08: GAME SIMULATOR",
      title: "Let's Fill CMU",
      authors: "Faculty of Dentistry, CMU",
      abstract: "A high-fidelity dental training simulator game developed for the Faculty of Dentistry, enabling dental students to practice clinical filling procedures and patient-treatment scenarios in a virtual environment.",
      tech: "Unreal Engine 4 / HTML5 WebGL",
      platform: "3D Web Training App",
      status: "Active Production",
      collab: "Faculty of Dentistry, CMU",
      link: "https://letfill-cmu.web.app/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <path d="M70,40 Q100,30 130,40 Q140,80 100,100 Q60,80 70,40 Z" fill="none" stroke="#0f3c5f" stroke-width="2"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">DENTAL TRAINER</text>
            </svg>`
    },
    {
      tag: "09: 3D DIGITAL TWIN",
      title: "ICAT Digital Twin",
      authors: "ICAT Research Lab Group",
      abstract: "The core research group's WebGL-based immersive 3D digital twin platform. It connects live campus IoT streams to an interactive web-based 3D workspace for real-time telemetry rendering.",
      tech: "Three.js / WebGL / IoT API Hub",
      platform: "Immersive Web Portal",
      status: "Active Live Feeds",
      collab: "ICAT Research Lab Group",
      link: "https://icat-iot.web.app/",
      svg: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
              <rect width="200" height="120" fill="#f3f4f6" />
              <ellipse cx="100" cy="60" rx="50" ry="20" fill="none" stroke="#0f3c5f" stroke-dasharray="4 2"/>
              <rect x="75" y="45" width="50" height="30" fill="#0f3c5f" opacity="0.3" stroke="#0f3c5f" stroke-width="1"/>
              <text x="15" y="25" font-family="Inter" font-size="10" fill="#6b7280" font-weight="bold">WEBGL VIEWPORT</text>
            </svg>`
    }
  ];

  const projectDetailsContainer = document.getElementById('project-details-container');
  const detailProjectTag = document.getElementById('detail-project-tag');
  const detailProjectTitle = document.getElementById('detail-project-title');
  const detailProjectAuthors = document.getElementById('detail-project-authors');
  const detailProjectAbstract = document.getElementById('detail-project-abstract');
  const detailProjectLink = document.getElementById('detail-project-link');
  const detailProjectPreview = document.getElementById('detail-project-preview');

  function showProjectDetails(idx) {
    const data = PROJECTS_DATA[idx];
    if (!data) return;

    detailProjectTag.textContent = data.tag;
    detailProjectTitle.textContent = data.title;
    detailProjectAuthors.textContent = data.authors;
    detailProjectAbstract.textContent = data.abstract;
    
    // Set technical specs dynamically
    document.getElementById('detail-spec-tech').textContent = data.tech;
    document.getElementById('detail-spec-platform').textContent = data.platform;
    document.getElementById('detail-spec-status').textContent = data.status;
    document.getElementById('detail-spec-collab').textContent = data.collab;

    detailProjectLink.setAttribute('href', data.link);
    detailProjectPreview.innerHTML = data.svg;

    projectDetailsContainer.classList.add('revealed');

    // Scroll to details
    setTimeout(() => {
      const offsetPosition = projectDetailsContainer.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }, 150);
  }

  // Attach card click handlers
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, idx) => {
    const linkWrapper = card.querySelector('.project-link-wrapper');
    if (linkWrapper) {
      linkWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        showProjectDetails(idx);
      });
    }
    const title = card.querySelector('.project-title');
    if (title) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', () => {
        showProjectDetails(idx);
      });
    }
  });

  const closeProjectDetailsBtn = document.getElementById('close-project-details');
  if (closeProjectDetailsBtn) {
    closeProjectDetailsBtn.addEventListener('click', () => {
      projectDetailsContainer.classList.remove('revealed');
      const targetElement = document.getElementById('projects');
      if (targetElement) {
        const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  // Smooth scroll links starting with #
  navbarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = targetPosition - navbarHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /* ==========================================================================
     3. Scroll Reveal Animation for Paper Content
     ========================================================================== */
  const revealElements = document.querySelectorAll(
    '.paper-section, .research-column, .project-card, .paper-figure-wrapper, .references-list'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(25px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    revealObserver.observe(el);
  });

  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(styleSheet);
  
});
