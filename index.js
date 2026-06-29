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
      images: ["Pic/CarbonFP_1.png", "Pic/CarbonFP_2.png"]
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
      images: ["Pic/CoralCollege.jpg"]
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
      images: ["Pic/SmartnLivableCity.png"]
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
      images: ["Pic/VisitLamphun.png"]
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
      images: ["Pic/EcervrainCMU.png"]
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
      images: ["Pic/bontanicgraden.png"]
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
      images: ["Pic/Muteru.png"]
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
      images: ["Pic/LetsFillCMU1.png", "Pic/LetsFillCMU2.png", "Pic/LetsFillCMU3.png"]
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
      images: ["Pic/ICAT Digital Twin1.png", "Pic/ICAT Digital Twin2.png"]
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
    
    // Reset slideshow interval
    if (window.projectSlideshowInterval) {
      clearInterval(window.projectSlideshowInterval);
      window.projectSlideshowInterval = null;
    }

    if (data.images && data.images.length > 0) {
      if (data.images.length === 1) {
        detailProjectPreview.innerHTML = `<img src="${data.images[0]}" alt="${data.title}" style="width: 100%; height: 100%; object-fit: cover; display:block;">`;
      } else {
        const slidesHtml = data.images.map(img => `
          <img src="${img}" class="slideshow-slide" style="width: ${100 / data.images.length}%;" />
        `).join('');
        
        detailProjectPreview.innerHTML = `
          <div class="slideshow-container">
            <div class="slideshow-track" style="width: ${data.images.length * 100}%;">
              ${slidesHtml}
            </div>
          </div>
        `;
        
        const track = detailProjectPreview.querySelector('.slideshow-track');
        let currentSlide = 0;
        
        window.projectSlideshowInterval = setInterval(() => {
          currentSlide = (currentSlide + 1) % data.images.length;
          const offset = currentSlide * (100 / data.images.length);
          track.style.transform = `translateX(-${offset}%)`;
        }, 3000);
      }
    } else {
      detailProjectPreview.innerHTML = '';
    }

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
