/**
 * ArcTech Interior LLP - Main JavaScript Logic
 * Precision CNC Manufacturing + Premium Interiors
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initBeforeAfterSlider();
  initProcessViewer();
  initShowcaseGallery();
  initPortfolio();
  initInquiryForm();
  initModal();
  initSmoothScroll();
});

/* ==========================================================================
   1. Navbar Scroll Effect
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const openBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!openBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Interactive Before / After Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('before-after-slider');
  if (!container) return;

  const overlay = container.querySelector('.ba-overlay');
  const handle = container.querySelector('.ba-handle');
  if (!overlay || !handle) return;

  let isDragging = false;

  const setPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const percent = (x / rect.width) * 100;

    overlay.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  };

  const syncImageWidth = () => {
    const innerImg = overlay.querySelector('.ba-image');
    if (innerImg) {
      innerImg.style.width = `${container.offsetWidth}px`;
    }
  };

  window.addEventListener('resize', syncImageWidth, { passive: true });
  syncImageWidth();

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setPosition(e.clientX);
  });

  // Touch Events for Mobile
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches.length > 0) setPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length === 0) return;
    setPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   4. CNC Process Viewer (5-Step Interactive Workflow)
   ========================================================================== */
function initProcessViewer() {
  const stepsContainer = document.getElementById('process-steps-container');
  const viewerContent = document.getElementById('process-viewer-content');
  if (!stepsContainer || !viewerContent || !window.ARCTECH_DATA) return;

  const steps = window.ARCTECH_DATA.cncProcessSteps;

  const renderSteps = () => {
    stepsContainer.innerHTML = steps.map((item, index) => `
      <div class="process-step-card ${index === 0 ? 'active' : ''}" data-step-index="${index}">
        <div class="step-num">${item.step}</div>
        <h4>${item.name}</h4>
        <div class="sub">${item.subtitle}</div>
        <span class="badge-tech" style="font-size: 0.68rem; padding: 0.2rem 0.5rem;">Phase ${item.step}</span>
      </div>
    `).join('');

    updateViewer(0);
  };

  const updateViewer = (index) => {
    const item = steps[index];
    if (!item) return;

    // Update active class on cards
    const cards = stepsContainer.querySelectorAll('.process-step-card');
    cards.forEach((c, idx) => {
      if (idx === index) c.classList.add('active');
      else c.classList.remove('active');
    });

    viewerContent.innerHTML = `
      <div>
        <div class="badge-tech" style="margin-bottom: 0.75rem;">STEP ${item.step} IN FOCUS</div>
        <h3 style="font-size: 1.85rem; margin-bottom: 0.5rem;">${item.name}</h3>
        <p style="color: var(--gold-light); font-family: var(--font-mono); font-size: 0.9rem; margin-bottom: 1.25rem;">
          ${item.subtitle}
        </p>
        <p style="color: var(--text-warm); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
          ${item.details}
        </p>
        <div style="background: rgba(197, 160, 89, 0.06); border-left: 3px solid var(--gold-primary); padding: 0.75rem 1rem; border-radius: 2px;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; display: block; margin-bottom: 0.25rem;">Technical Capabilities & Tooling</span>
          <span style="font-size: 0.88rem; color: var(--text-main);">${item.tooling}</span>
        </div>
      </div>
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border-gold); border-radius: 6px; padding: 1.75rem; text-align: center;">
        <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem; letter-spacing: 0.1em; text-transform: uppercase;">ArcTech Precision Protocol</div>
        <div style="width: 72px; height: 72px; border-radius: 50%; background: var(--gold-gradient); display: inline-flex; align-items: center; justify-content: center; color: #000; font-size: 1.8rem; font-weight: bold; margin-bottom: 1rem; box-shadow: 0 0 25px var(--gold-glow);">
          ${item.step}
        </div>
        <h4 style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 0.5rem;">Quality Benchmark</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">Inspected at our Jogeshwari West facility before dispatch to client site.</p>
        <a href="#inquiry" class="btn-secondary" style="margin-top: 1.25rem; font-size: 0.82rem; padding: 0.65rem 1rem; width: 100%;">Inquire About Step ${item.step} Specs</a>
      </div>
    `;
  };

  stepsContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.process-step-card');
    if (!card) return;
    const index = parseInt(card.dataset.stepIndex, 10);
    updateViewer(index);
  });

  renderSteps();
}

/* ==========================================================================
   5. CNC Visual Showcase Gallery
   ========================================================================== */
function initShowcaseGallery() {
  const container = document.getElementById('cnc-gallery-grid');
  const filterTabs = document.getElementById('cnc-filter-tabs');
  if (!container || !window.ARCTECH_DATA) return;

  const items = window.ARCTECH_DATA.showcaseGallery;

  const render = (category = 'all') => {
    const filtered = category === 'all' 
      ? items 
      : items.filter(item => item.category === category);

    container.innerHTML = filtered.map(item => `
      <div class="gallery-card" data-id="${item.id}">
        <div class="gallery-img-wrap" onclick="openShowcaseModal('${item.id}')">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="gallery-overlay-tag">${item.categoryLabel}</div>
        </div>
        <div class="gallery-info">
          <div>
            <h3>${item.title}</h3>
            <div class="spec-line">${item.material}</div>
            <p>${item.description}</p>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center;">
            <button onclick="openShowcaseModal('${item.id}')" class="btn-secondary" style="padding: 0.6rem 1rem; font-size: 0.82rem; flex-grow: 1;">
              View Details
            </button>
            <a href="https://wa.me/919820054321?text=Hi%20ArcTech,%20I%20am%20interested%20in%20custom%20CNC%20work%20similar%20to:%20${encodeURIComponent(item.title)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="padding: 0.6rem 0.85rem; font-size: 0.82rem;" title="Inquire on WhatsApp">
              💬
            </a>
          </div>
        </div>
      </div>
    `).join('');
  };

  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  }

  render('all');
}

/* ==========================================================================
   6. Selected Work / Portfolio
   ========================================================================== */
function initPortfolio() {
  const container = document.getElementById('portfolio-grid');
  const filterTabs = document.getElementById('portfolio-filter-tabs');
  if (!container || !window.ARCTECH_DATA) return;

  const projects = window.ARCTECH_DATA.projects;

  const render = (category = 'all') => {
    const filtered = category === 'all' 
      ? projects 
      : projects.filter(p => p.category === category);

    container.innerHTML = filtered.map(item => `
      <div class="gallery-card">
        <div class="gallery-img-wrap" onclick="openProjectModal('${item.id}')">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="gallery-overlay-tag">${item.categoryLabel}</div>
        </div>
        <div class="gallery-info">
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-light); margin-bottom: 0.25rem;">📍 ${item.location}</div>
            <h3>${item.title}</h3>
            <div class="spec-line" style="color: var(--text-warm); font-size: 0.82rem; margin-bottom: 0.5rem;"><strong>Scope:</strong> ${item.scope}</div>
            <p>${item.description}</p>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
            <button onclick="openProjectModal('${item.id}')" class="btn-secondary" style="padding: 0.6rem 1rem; font-size: 0.82rem; flex-grow: 1;">
              Project Specs
            </button>
            <a href="https://wa.me/919820054321?text=Hi%20ArcTech,%20I%20am%20inquiring%20about%20interior%20or%20CNC%20work%20like:%20${encodeURIComponent(item.title)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="padding: 0.6rem 0.85rem; font-size: 0.82rem;">
              💬 Inquire
            </a>
          </div>
        </div>
      </div>
    `).join('');
  };

  if (filterTabs) {
    filterTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      filterTabs.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  }

  render('all');
}

/* ==========================================================================
   7. Project Inquiry Form Handling & WhatsApp Trigger
   ========================================================================== */
function initInquiryForm() {
  const form = document.getElementById('project-inquiry-form');
  const directWaBtn = document.getElementById('form-direct-wa');
  const feedbackMsg = document.getElementById('form-feedback-msg');

  if (!form) return;

  const getFormData = () => {
    const name = form.querySelector('[name="name"]')?.value || '';
    const phone = form.querySelector('[name="phone"]')?.value || '';
    const email = form.querySelector('[name="email"]')?.value || '';
    const type = form.querySelector('[name="type"]')?.value || 'CNC + Interior';
    const location = form.querySelector('[name="location"]')?.value || 'Mumbai';
    const message = form.querySelector('[name="message"]')?.value || '';
    return { name, phone, email, type, location, message };
  };

  if (directWaBtn) {
    directWaBtn.addEventListener('click', () => {
      const data = getFormData();
      const text = encodeURIComponent(
        `Hi ArcTech Interior LLP,\nI would like to inquire about a project:\n• Name: ${data.name || 'Client'}\n• Phone: ${data.phone || 'Not provided'}\n• Project Type: ${data.type}\n• Location: ${data.location}\n• Details: ${data.message || 'Please consult on drawings and scope.'}`
      );
      window.open(`https://wa.me/919820054321?text=${text}`, '_blank');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = getFormData();

    if (!data.name || !data.phone) {
      if (feedbackMsg) {
        feedbackMsg.style.display = 'block';
        feedbackMsg.style.color = '#ff6b6b';
        feedbackMsg.innerText = 'Please provide at least your Name and Phone number.';
      }
      return;
    }

    if (feedbackMsg) {
      feedbackMsg.style.display = 'block';
      feedbackMsg.style.color = '#e2c27c';
      feedbackMsg.innerHTML = `
        <div style="padding: 1rem; background: rgba(197, 160, 89, 0.1); border: 1px solid var(--gold-primary); border-radius: 4px; margin-top: 1rem;">
          <strong>Thank you, ${data.name}!</strong><br/>
          Your project inquiry for <em>${data.type} (${data.location})</em> has been logged. Our technical team from Minar Tower, Jogeshwari West will contact you within 24 hours.
        </div>
      `;
    }

    form.reset();
  });
}

/* ==========================================================================
   9. Lightbox / Modal for Project & Showcase Zoom
   ========================================================================== */
function initModal() {
  const backdrop = document.getElementById('global-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!backdrop) return;

  const closeModal = () => {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Modal open helper on window
  window.openShowcaseModal = (id) => {
    const item = window.ARCTECH_DATA?.showcaseGallery.find(x => x.id === id);
    if (!item) return;

    const modalBody = document.getElementById('modal-dynamic-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div class="badge-tech" style="margin-bottom: 0.5rem;">${item.categoryLabel}</div>
        <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">${item.title}</h2>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-light);">
          Material: ${item.material} • Technique: ${item.technique}
        </div>
      </div>
      <div style="position: relative; height: 380px; border-radius: 6px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-gold);">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <p style="color: var(--text-warm); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${item.description}
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://wa.me/919820054321?text=Hi%20ArcTech,%20I%20want%20to%20order%20or%20inquire%20about:%20${encodeURIComponent(item.title)}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="flex-grow: 1;">
          💬 Inquire on WhatsApp
        </a>
        <a href="#inquiry" onclick="document.getElementById('global-modal').classList.remove('open')" class="btn-primary" style="flex-grow: 1;">
          Get Formal Quote
        </a>
      </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.openProjectModal = (id) => {
    const item = window.ARCTECH_DATA?.projects.find(x => x.id === id);
    if (!item) return;

    const modalBody = document.getElementById('modal-dynamic-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div class="badge-tech" style="margin-bottom: 0.5rem;">${item.categoryLabel}</div>
        <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">${item.title}</h2>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-light);">
          📍 ${item.location} • Scope: ${item.scope}
        </div>
      </div>
      <div style="position: relative; height: 380px; border-radius: 6px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-gold);">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div style="background: rgba(197, 160, 89, 0.06); border-left: 3px solid var(--gold-primary); padding: 0.85rem 1.25rem; border-radius: 2px; margin-bottom: 1.25rem;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; display: block;">Materials & Finishes</span>
        <span style="color: var(--text-main); font-size: 0.92rem;">${item.materials}</span>
      </div>
      <p style="color: var(--text-warm); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${item.description}
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://wa.me/919820054321?text=Hi%20ArcTech,%20I%20am%20interested%20in%20the%20${encodeURIComponent(item.title)}%20project%20execution." target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="flex-grow: 1;">
          💬 Inquire on WhatsApp
        </a>
        <a href="#inquiry" onclick="document.getElementById('global-modal').classList.remove('open')" class="btn-primary" style="flex-grow: 1;">
          Start Similar Project
        </a>
      </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
}

/* ==========================================================================
   10. Smooth Scroll on Anchor Links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}
