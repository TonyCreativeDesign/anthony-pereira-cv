/* ============================================================
   TONY CREATIVE DESIGN — CV / PORTFOLIO
   v2 · Editorial · Award-grade
   Interactive layer
   ============================================================ */

(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initRevealSystem();
    initModeSwitcher();
    initNavToggle();
    initSmoothScroll();
    initTopbarScroll();
    initScrollSpy();
    if (!isCoarse && !reduced) {
      initCursorLight();
      initMagneticButtons();
      initParallax();
    }
    initStaggerReveal();
  });

  /* ============================================================
     1. MODE SWITCHER — pill movement + content swap + text crossfade
     ============================================================ */
  function initModeSwitcher() {
    const buttons = document.querySelectorAll('.mode-btn');
    const pill = document.querySelector('.mode-pill');
    const root = document.body;
    const html = document.documentElement;

    const modeMap = {
      creative: {
        heroTitle: "Directeur artistique digital · Webdesigner · Designer augmenté par l'IA",
        heroDesc:  "Identité visuelle, webdesign, UX/UI, interfaces no-code, automatisations et prototypage assisté par IA. Bordeaux.",
        badge: 'Profil créatif',
        projectsEm: 'créatifs &amp; digitaux',
        projectsLead: 'Sélection de projets créatifs, artistiques et digitaux — branding, sites, interfaces et œuvres sur mesure.'
      },
      business: {
        heroTitle: 'Studio indépendant · Marque mère de Graphikly &amp; IA-CreativeDesign',
        heroDesc:  "Tony Creative Design porte deux offres B2B : Graphikly pour le design graphique en abonnement, et IA-CreativeDesign pour les robots métier, assistants IA et automatisations no-code.",
        badge: 'Business',
        projectsEm: 'B2B · Graphikly &amp; IACD',
        projectsLead: "Deux offres B2B portées par le studio : Graphikly (design en abonnement) et IA-CreativeDesign (IA appliquée aux métiers)."
      },
      collab: {
        heroTitle: 'Créatif · Co-constructeur · Explorateur digital',
        heroDesc:  "Ouvert aux collaborations, aux projets communs et aux idées ambitieuses autour du design, du web et de l'IA. Transformons une vision en réalité digitale.",
        badge: 'Collaboration',
        projectsEm: 'co-créés &amp; exploratoires',
        projectsLead: 'Projets collaboratifs, exploratoires et artistiques — co-créations et aventures partagées.'
      }
    };

    const ctaMap = {
      creative: [
        { text: 'Voir mon parcours',     href: '#experience', cls: 'btn btn-primary', arrow: true },
        { text: 'Découvrir mes projets', href: '#projects',   cls: 'btn btn-ghost' },
        { text: 'Me contacter',          href: '#contact',    cls: 'btn btn-ghost' }
      ],
      business: [
        { text: 'Découvrir Graphikly',   href: 'https://graphikly.fr/',           cls: 'btn btn-primary', arrow: true, external: true },
        { text: 'Découvrir IACD',        href: 'https://www.ia-creativedesign.fr/', cls: 'btn btn-ghost', arrow: true, external: true },
        { text: 'Demander un échange',   href: '#contact', cls: 'btn btn-ghost' }
      ],
      collab: [
        { text: 'Proposer une collaboration', href: '#contact', cls: 'btn btn-primary', arrow: true },
        { text: 'Échanger par email',         href: 'mailto:tony_creativedesign@icloud.com', cls: 'btn btn-ghost' }
      ]
    };

    function positionPill(activeBtn) {
      if (!pill || !activeBtn) return;
      const parent = activeBtn.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      // For grid-based switcher: use translate, percent-based for grid
      const isStacked = window.matchMedia('(max-width: 900px)').matches;
      if (isStacked) {
        const top = btnRect.top - parentRect.top - 6;
        pill.style.transform = `translateY(${top}px)`;
        pill.style.left = '6px';
        pill.style.width = 'calc(100% - 12px)';
      } else {
        const left = btnRect.left - parentRect.left - 6;
        pill.style.transform = `translateX(${left}px)`;
        pill.style.left = '6px';
        pill.style.width = btnRect.width + 'px';
      }
    }

    function setActiveButton(mode) {
      buttons.forEach(b => {
        const active = b.dataset.modeBtn === mode;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      const activeBtn = document.querySelector(`[data-mode-btn="${mode}"]`);
      requestAnimationFrame(() => positionPill(activeBtn));
    }

    function fadeOut(el) {
      return new Promise(resolve => {
        if (!el) return resolve();
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        el.style.opacity = '0';
        el.style.transform = 'translateY(6px)';
        setTimeout(resolve, 230);
      });
    }
    function fadeIn(el) {
      if (!el) return;
      requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s ease, transform 0.4s var(--ease-out, cubic-bezier(.16,1,.3,1))';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }

    async function setHeroText(mode) {
      const data = modeMap[mode];
      if (!data) return;
      const titleEl = document.getElementById('hero-title');
      const descEl  = document.getElementById('hero-desc');
      const badgeEl = document.querySelector('#hero-badge .hero-eyebrow-text');
      const projectsEm   = document.getElementById('projects-em');
      const projectsLead = document.getElementById('projects-lead');

      await Promise.all([fadeOut(titleEl), fadeOut(descEl), fadeOut(badgeEl), fadeOut(projectsEm), fadeOut(projectsLead)]);

      if (titleEl) titleEl.innerHTML = data.heroTitle;
      if (descEl)  descEl.textContent  = data.heroDesc;
      if (badgeEl) badgeEl.textContent = data.badge;
      if (projectsEm)   projectsEm.innerHTML   = data.projectsEm;
      if (projectsLead) projectsLead.textContent = data.projectsLead;

      fadeIn(titleEl); fadeIn(descEl); fadeIn(badgeEl); fadeIn(projectsEm); fadeIn(projectsLead);
    }

    async function setCTAs(mode) {
      const wrap = document.getElementById('hero-ctas');
      if (!wrap) return;
      await fadeOut(wrap);
      wrap.innerHTML = '';
      (ctaMap[mode] || []).forEach(c => {
        const a = document.createElement('a');
        a.href = c.href;
        a.className = c.cls;
        a.setAttribute('data-magnetic', '');
        if (c.external) {
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
        }
        const label = document.createElement('span');
        label.className = 'btn-label';
        label.textContent = c.text;
        a.appendChild(label);
        if (c.arrow) {
          const arrow = document.createElement('span');
          arrow.className = 'btn-arrow';
          arrow.setAttribute('aria-hidden', 'true');
          arrow.textContent = '↗';
          a.appendChild(arrow);
        }
        wrap.appendChild(a);
      });
      fadeIn(wrap);
      // Re-bind magnetic effect on new CTAs
      bindMagneticButtons(wrap.querySelectorAll('[data-magnetic]'));
    }

    function forceRevealVisiblePanels(mode) {
      // When a hidden panel becomes visible, its IntersectionObserver may
      // have already fired (or never fired), leaving cards stuck at opacity 0.
      // Force-reveal everything inside the newly visible panels.
      document.querySelectorAll(`.show-${mode} .reveal, .show-${mode} .reveal-stagger`).forEach(el => {
        el.classList.add('is-visible');
      });
    }

    async function setMode(mode) {
      if (root.dataset.mode === mode) {
        setActiveButton(mode);
        forceRevealVisiblePanels(mode);
        return;
      }
      root.classList.add('is-mode-transitioning');
      root.dataset.mode = mode;
      html.dataset.mode = mode;
      setActiveButton(mode);
      await Promise.all([setHeroText(mode), setCTAs(mode)]);
      forceRevealVisiblePanels(mode);
      setTimeout(() => root.classList.remove('is-mode-transitioning'), 350);
    }

    buttons.forEach(b => {
      b.addEventListener('click', () => setMode(b.dataset.modeBtn));
    });

    // Initialize pill position immediately (avoid first-paint flash on slow devices)
    const initial = root.dataset.mode || 'creative';
    const initialBtn = document.querySelector(`[data-mode-btn="${initial}"]`);
    if (initialBtn) {
      // Skip pill transition on first paint to avoid an animated slide-in from origin
      if (pill) pill.style.transition = 'none';
      setActiveButton(initial);
      requestAnimationFrame(() => {
        positionPill(initialBtn);
        requestAnimationFrame(() => {
          if (pill) pill.style.transition = '';
        });
      });
    }

    window.addEventListener('resize', () => {
      const active = document.querySelector('.mode-btn.active');
      requestAnimationFrame(() => positionPill(active));
    });
  }

  /* ============================================================
     2. SCROLL REVEAL — IntersectionObserver
     ============================================================ */
  function initRevealSystem() {
    if (reduced) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Auto-add reveal class to common elements
    const targets = [
      '.section-head',
      '.about-grid > *',
      '.brand-card',
      '.collab-block > *',
      '.timeline-item',
      '.education',
      '.edu-card',
      '.skills-marquee',
      '.tools-section-head',
      '.tools-cluster',
      '.project-card',
      '.contact-block > *',
      '.section-lead'
    ];
    targets.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -80px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  /* ============================================================
     2b. STAGGER REVEAL (project grids, brand grids)
     ============================================================ */
  function initStaggerReveal() {
    if (reduced) return;
    const groups = document.querySelectorAll('.projects-grid, .brand-grid, .edu-grid');
    groups.forEach(g => g.classList.add('reveal-stagger'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    groups.forEach(g => observer.observe(g));
  }

  /* ============================================================
     3. MOBILE NAV TOGGLE
     ============================================================ */
  function initNavToggle() {
    const burger = document.querySelector('.nav-burger');
    const nav = document.querySelector('.topnav');
    if (!burger || !nav) return;
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ============================================================
     4. SMOOTH SCROLL
     ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        if (id === '#' || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 90;
        window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  /* ============================================================
     5. TOPBAR SCROLL — hide on scroll-down, show on scroll-up
     ============================================================ */
  function initTopbarScroll() {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;
    let lastY = window.pageYOffset;
    let ticking = false;

    function update() {
      const y = window.pageYOffset;
      const delta = y - lastY;
      if (y < 80) {
        topbar.classList.remove('is-hidden');
      } else if (delta > 6) {
        topbar.classList.add('is-hidden');
      } else if (delta < -6) {
        topbar.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================================
     6. SCROLL SPY — active nav link
     ============================================================ */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.topnav a');
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => {
            const matches = a.getAttribute('href') === '#' + id;
            a.classList.toggle('is-active', matches);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s));
  }

  /* ============================================================
     7. CURSOR LIGHT — radial gradient follow
     ============================================================ */
  function initCursorLight() {
    const light = document.getElementById('cursorLight');
    if (!light) return;
    let mx = 0, my = 0, lx = 0, ly = 0;
    let raf;

    document.addEventListener('mousemove', e => {
      mx = e.clientX;
      my = e.clientY;
      light.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(loop);
    });
    document.addEventListener('mouseleave', () => {
      light.style.opacity = '0';
    });

    function loop() {
      lx += (mx - lx) * 0.12;
      ly += (my - ly) * 0.12;
      light.style.left = lx + 'px';
      light.style.top  = ly + 'px';
      if (Math.abs(mx - lx) > 0.1 || Math.abs(my - ly) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = null;
      }
    }
  }

  /* ============================================================
     8. MAGNETIC BUTTONS — subtle cursor attraction
     ============================================================ */
  function initMagneticButtons() {
    bindMagneticButtons(document.querySelectorAll('[data-magnetic]'));
  }

  function bindMagneticButtons(nodes) {
    if (reduced || isCoarse) return;
    nodes.forEach(el => {
      if (el.dataset.magneticBound === '1') return;
      el.dataset.magneticBound = '1';
      const strength = 0.18;
      const max = 14;

      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        const tx = Math.max(Math.min(x * strength, max), -max);
        const ty = Math.max(Math.min(y * strength, max), -max);
        el.style.transform = `translate(${tx}px, ${ty}px)`;
        // Inner label nudge
        const label = el.querySelector('.btn-label, .contact-primary-email, .collab-cta span:not(.collab-cta-arrow)');
        if (label) label.style.transform = `translate(${tx * 0.4}px, ${ty * 0.4}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
        const label = el.querySelector('.btn-label, .contact-primary-email, .collab-cta span:not(.collab-cta-arrow)');
        if (label) label.style.transform = '';
      });
    });
  }

  /* ============================================================
     9. PARALLAX — subtle hero glow on scroll, photo lift on mouse
     ============================================================ */
  function initParallax() {
    const photo = document.querySelector('.hero-photo');
    const glowA = document.querySelector('.ambient-glow--a');
    const glowB = document.querySelector('.ambient-glow--b');

    // Mouse-driven photo tilt
    if (photo) {
      const hero = photo.closest('.hero');
      if (hero) {
        hero.addEventListener('mousemove', e => {
          const r = hero.getBoundingClientRect();
          const cx = (e.clientX - r.left) / r.width - 0.5;
          const cy = (e.clientY - r.top) / r.height - 0.5;
          photo.style.transform = `translate3d(${cx * 12}px, ${cy * 8}px, 0)`;
        });
        hero.addEventListener('mouseleave', () => {
          photo.style.transform = '';
        });
      }
    }

    // Scroll-driven background drift
    let ticking = false;
    function onScroll() {
      const y = window.pageYOffset;
      if (glowA) glowA.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
      if (glowB) glowB.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  // Expose for debugging if needed
  window.__tcd = { reduced, isCoarse };
})();
