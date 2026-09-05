/**
 * ArcTech Interior LLP - Main JavaScript Logic
 * Precision CNC Manufacturing + Premium Interiors
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initBeforeAfterSlider();
  initProcessViewer();
  initDivisionHub();
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
   5. Dual Division Hub (CNC Manufacturing vs Architecture & Interiors)
   ========================================================================== */
function initDivisionHub() {
  const bannerContainer = document.getElementById('division-banner');
  const filterTabsContainer = document.getElementById('division-filter-tabs');
  const galleryGrid = document.getElementById('division-gallery-grid');

  if (!galleryGrid || !window.ARCTECH_DATA || !window.ARCTECH_DATA.divisions) return;

  let currentDivision = 'cnc';
  let currentFilter = 'all';

  const renderDivision = () => {
    const division = window.ARCTECH_DATA.divisions[currentDivision];
    if (!division) return;

    // Update folder tab active classes
    const cncTab = document.getElementById('folder-tab-cnc');
    const intTab = document.getElementById('folder-tab-interiors');
    if (cncTab && intTab) {
      if (currentDivision === 'cnc') {
        cncTab.classList.add('active');
        intTab.classList.remove('active');
      } else {
        intTab.classList.add('active');
        cncTab.classList.remove('active');
      }
    }

    // Update hero pills if present
    document.querySelectorAll('.hero-div-btn').forEach(btn => {
      if (btn.dataset.division === currentDivision) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Render Division Banner
    if (bannerContainer) {
      bannerContainer.innerHTML = `
        <div>
          <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; flex-wrap: wrap;">
            <span class="badge-tech">${division.badge}</span>
            <span style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--gold-light);">${division.subtitle}</span>
          </div>
          <h3 style="font-size: 1.75rem; margin-bottom: 0.4rem; color: var(--text-main);">${division.icon} ${division.title}</h3>
          <p style="color: var(--text-warm); font-size: 0.95rem; line-height: 1.6; max-width: 850px;">
            ${division.description}
          </p>
        </div>
        <div style="flex-shrink: 0;">
          <a href="#inquiry" class="btn-primary" style="padding: 0.75rem 1.35rem; font-size: 0.85rem; white-space: nowrap;">
            Inquire in This Division →
          </a>
        </div>
      `;
    }

    // Render Subcategory Filters
    if (filterTabsContainer) {
      filterTabsContainer.innerHTML = division.subcategories.map(sub => `
        <button class="filter-btn ${sub.id === currentFilter ? 'active' : ''}" data-filter="${sub.id}">
          ${sub.label}
        </button>
      `).join('');
    }

    // Filter Items
    const items = division.items;
    const filtered = currentFilter === 'all' 
      ? items 
      : items.filter(item => item.category === currentFilter);

    // Render Gallery Cards
    galleryGrid.innerHTML = filtered.map(item => `
      <div class="gallery-card" data-division="${currentDivision}" data-id="${item.id}">
        <div class="gallery-img-wrap" onclick="openDivisionModal('${currentDivision}', '${item.id}')">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="gallery-overlay-tag">${item.categoryLabel}</div>
        </div>
        <div class="gallery-info">
          <div>
            ${item.location ? `<div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-light); margin-bottom: 0.25rem;">📍 ${item.location}</div>` : ''}
            <h3>${item.title}</h3>
            ${item.material ? `<div class="spec-line">${item.material}</div>` : ''}
            ${item.scope ? `<div class="spec-line" style="color: var(--text-warm); font-size: 0.82rem; margin-bottom: 0.5rem;"><strong>Scope:</strong> ${item.scope}</div>` : ''}
            <p>${item.description}</p>
          </div>
          <div style="display: flex; gap: 0.75rem; align-items: center; margin-top: 1rem;">
            <button onclick="openDivisionModal('${currentDivision}', '${item.id}')" class="btn-secondary" style="padding: 0.6rem 1rem; font-size: 0.82rem; flex-grow: 1;">
              View Details & Specs
            </button>
            <a href="https://wa.me/918652223456?text=Hi%20ArcTech,%20I%20am%20interested%20in%20${encodeURIComponent(item.title)}%20(${division.title})" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="padding: 0.6rem 0.85rem; font-size: 0.82rem;" title="Inquire on WhatsApp">
              💬
            </a>
          </div>
        </div>
      </div>
    `).join('');
  };

  // Global switchDivision helper for buttons and navigation links
  window.switchDivision = (divisionId, scroll = true) => {
    if (!window.ARCTECH_DATA.divisions[divisionId]) return;
    currentDivision = divisionId;
    currentFilter = 'all';
    renderDivision();

    if (scroll) {
      const hub = document.getElementById('division-hub');
      if (hub) {
        const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
        const targetPos = hub.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  };

  // Sub-filter Click Listener
  if (filterTabsContainer) {
    filterTabsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      currentFilter = btn.dataset.filter;
      renderDivision();
    });
  }

  // Initial Render
  renderDivision();
}

/* ==========================================================================
   6. Project Inquiry Form Handling & WhatsApp Trigger
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
      window.open(`https://wa.me/918652223456?text=${text}`, '_blank');
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
          Your project inquiry for <em>${data.type} (${data.location})</em> has been logged. Our technical team from Jogeshwari West, Mumbai will contact you within 24 hours.
        </div>
      `;
    }

    form.reset();
  });
}

/* ==========================================================================
   7. Lightbox / Modal for Item Zoom & Technical Specs
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

  // Modal open helper for specific division items
  window.openDivisionModal = (divisionId, itemId) => {
    const division = window.ARCTECH_DATA?.divisions[divisionId];
    if (!division) return;
    const item = division.items.find(x => x.id === itemId);
    if (!item) return;

    const modalBody = document.getElementById('modal-dynamic-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
          <span class="badge-tech">${division.badge}</span>
          <span class="badge-tech" style="background: rgba(255,255,255,0.06); border-color: var(--border-subtle);">${item.categoryLabel}</span>
        </div>
        <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">${item.title}</h2>
        ${item.location ? `<div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-light); margin-bottom: 0.25rem;">📍 ${item.location}</div>` : ''}
        ${item.material ? `<div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-light);">Material: ${item.material} ${item.technique ? `• Technique: ${item.technique}` : ''}</div>` : ''}
        ${item.scope ? `<div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--gold-light);">Scope: ${item.scope}</div>` : ''}
      </div>
      <div style="position: relative; height: 380px; border-radius: 6px; overflow: hidden; margin-bottom: 1.5rem; border: 1px solid var(--border-gold);">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      ${item.materials ? `
        <div style="background: rgba(197, 160, 89, 0.06); border-left: 3px solid var(--gold-primary); padding: 0.85rem 1.25rem; border-radius: 2px; margin-bottom: 1.25rem;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--gold-light); text-transform: uppercase; display: block;">Specifications & Deliverables</span>
          <span style="color: var(--text-main); font-size: 0.92rem;">${item.materials}</span>
        </div>
      ` : ''}
      <p style="color: var(--text-warm); font-size: 1rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${item.description}
      </p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="https://wa.me/918652223456?text=Hi%20ArcTech,%20I%20want%20to%20inquire%20about:%20${encodeURIComponent(item.title)}%20(${division.title})" target="_blank" rel="noopener noreferrer" class="btn-whatsapp" style="flex-grow: 1;">
          💬 Inquire on WhatsApp
        </a>
        <a href="#inquiry" onclick="document.getElementById('global-modal').classList.remove('open')" class="btn-primary" style="flex-grow: 1;">
          Get Formal Consultation / Quote
        </a>
      </div>
    `;

    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Backward compatible helpers
  window.openShowcaseModal = (id) => window.openDivisionModal('cnc', id);
  window.openProjectModal = (id) => window.openDivisionModal('interiors', id);
}

/* ==========================================================================
   8. Smooth Scroll on Anchor Links
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
