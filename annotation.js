/* ===== GrafiGrow — Annotation & Segmentation Portal Interactive Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DAILY PROOFS & DELIVERABLES DATABASE
  // =========================================================================
  const DAILY_PROOFS = [
    {
      id: 'proof-v1',
      type: 'video',
      category: 'medical',
      title: 'Dental Radiography Sub-Pixel Polygon Masking',
      description: 'Meticulous polygon boundary delineation of dental anomalies (cavities, root canals, bone loss) from X-ray DICOM sequences for clinical AI diagnostic models.',
      date: 'Latest Production Batch',
      tool: 'CVAT • Polygons & Bounding Boxes',
      accuracy: '99.6% IoU',
      instances: '14,200 structures',
      videoId: 'wr3GlzDz-9c',
      thumbnail: 'https://img.youtube.com/vi/wr3GlzDz-9c/hqdefault.jpg'
    },
    {
      id: 'proof-v2',
      type: 'video',
      category: 'autonomous',
      title: 'Micro-Electrode Precision Robotic Mapping',
      description: 'High-density semantic segmentation for robotic pick-and-place assembly. Accurately maps irregular micro-electrodes distorted by glare and solder artifacts.',
      date: 'Daily Production Batch',
      tool: 'Labelme • Anaconda • Semantic',
      accuracy: '99.8% Pick Accuracy',
      instances: '15,000+ frames',
      videoId: '2zqnXJDFbuw',
      thumbnail: 'https://img.youtube.com/vi/2zqnXJDFbuw/hqdefault.jpg'
    },
    {
      id: 'proof-img1',
      type: 'image',
      category: 'autonomous',
      title: 'EgoScale Multi-Clip Video Annotation Workspace',
      description: 'Live production pipeline displaying multi-clip video task assignment, automated pre-label ingestion, and state injection runtime with sub-second task queuing.',
      date: 'Production Batch #104',
      tool: 'EgoScale • CVAT Cloud Core',
      accuracy: '99.8% QA Pass',
      instances: '4,850 video segments',
      imageSrc: '/proofs/proof_benchmark_autonomous.png'
    },
    {
      id: 'proof-v3',
      type: 'video',
      category: 'video',
      title: 'Human-in-the-Loop Active Learning QA Loop',
      description: 'Automated flagging of low-confidence model boundaries followed by senior human-in-the-loop micro-refinement, cutting false positives by 45%.',
      date: 'Production Sprint QA',
      tool: 'Custom Automated Scripts • Active Learning',
      accuracy: '45% Lower FP Rate',
      instances: 'Continuous Ingestion',
      videoId: 'xudGp0fGm5w',
      thumbnail: 'https://img.youtube.com/vi/xudGp0fGm5w/hqdefault.jpg'
    },
    {
      id: 'proof-img2',
      type: 'image',
      category: 'medical',
      title: 'Medical AI Cell Nuclei Segmentation Benchmark',
      description: 'Histology benchmark with sub-micron contour tracing and double-doctor consensus audits for clinical AI diagnostic models.',
      date: 'Production Batch #103',
      tool: 'CVAT • Multi-Class Polygon',
      accuracy: '99.88% Consistency',
      instances: '8,500 nuclei masks',
      imageSrc: '/proofs/proof_benchmark_medical.png'
    },
    {
      id: 'proof-v4',
      type: 'video',
      category: 'image',
      title: 'Microscopic PORE & Structural Defect Detection',
      description: 'Dense point-and-polygon micro-masking on 4K industrial wafer scans. Captures micro-fissures and material weaknesses invisible to the naked human eye.',
      date: 'Daily QA Batch',
      tool: 'CVAT • 4K Surface Imaging',
      accuracy: '99.7% Sub-pixel IoU',
      instances: '82,000 pore instances',
      videoId: '3wA4p3tTGCg',
      thumbnail: 'https://img.youtube.com/vi/3wA4p3tTGCg/hqdefault.jpg'
    },
    {
      id: 'proof-img3',
      type: 'image',
      category: 'autonomous',
      title: 'Industrial Micro-PCB Solder Defect QA Benchmark',
      description: 'High-resolution 4K surface scan defect detection. Micro-polygon delineation with zero false negatives for automated manufacturing QA.',
      date: 'Production Batch #102',
      tool: 'CVAT • Micro-Surface Defect',
      accuracy: '99.96% Defect Fit',
      instances: '12,400 joints',
      imageSrc: '/proofs/proof_benchmark_industrial.png'
    },
    {
      id: 'proof-v5',
      type: 'video',
      category: 'video',
      title: 'Agricultural Plant Phenotyping & Temporal VOS',
      description: 'Multi-frame video object segmentation tracking plant leaf area index, blights, and fruiting bodies across temporal drone sequences with permanent ID persistence.',
      date: 'Drone AI Batch',
      tool: 'CVAT • Temporal Object Tracking',
      accuracy: '94% Yield Prediction',
      instances: 'Temporal Sequences',
      videoId: '754iZGwEEmg',
      thumbnail: 'https://img.youtube.com/vi/754iZGwEEmg/hqdefault.jpg'
    },
    {
      id: 'proof-img4',
      type: 'image',
      category: 'video',
      title: 'Aerial Drone Temporal Video Object Tracking (VOS)',
      description: 'Persistent track ID retention with 0.00px drift across 500+ frames. Motion vector mapping and temporal consistency.',
      date: 'Drone AI Benchmark',
      tool: 'CVAT VOS • Meta SAM 2',
      accuracy: '99.91% Tracking SLA',
      instances: '24,000 frames',
      imageSrc: '/proofs/proof_benchmark_drone.png'
    },
    {
      id: 'proof-img5',
      type: 'image',
      category: 'image',
      title: 'High-Density Multi-Class Semantic Segmentation Dataset',
      description: 'Complete multi-class segmentation dataset packaging with COCO/YOLO annotations, pixel-level color masks, and verified ground-truth audit trails.',
      date: 'Archive Benchmark',
      tool: 'Labelme • Python QA Linting',
      accuracy: '99.8% Target IoU',
      instances: '50,000+ annotations',
      imageSrc: '/proofs/data_annotation_project.png'
    }
  ];

  // =========================================================================
  // 2. RENDER PROOFS & FILTERING
  // =========================================================================
  const proofsGrid = document.getElementById('proofsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProofs(filter = 'all') {
    if (!proofsGrid) return;
    proofsGrid.innerHTML = '';

    const filtered = DAILY_PROOFS.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'video') return item.type === 'video' || item.category === 'video';
      if (filter === 'image') return item.type === 'image' || item.category === 'image';
      return item.category === filter;
    });

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `proof-card reveal reveal-scale reveal-delay-${(index % 4) + 1}`;
      card.setAttribute('data-id', item.id);

      const isVideo = item.type === 'video';
      const mediaSrc = isVideo ? item.thumbnail : item.imageSrc;
      const typeLabel = isVideo ? 'Screen Record' : 'Workspace Screenshot';
      const typeClass = isVideo ? 'video' : '';

      card.innerHTML = `
        <div class="proof-media-wrapper" data-action="${isVideo ? 'play-video' : 'zoom-image'}" data-item-id="${item.id}">
          <img src="${mediaSrc}" alt="${item.title}" loading="lazy">
          <div class="proof-badge-date">
            <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${item.date}
          </div>
          <div class="proof-badge-type ${typeClass}">${typeLabel}</div>
          <div class="${isVideo ? 'media-play-overlay' : 'media-zoom-overlay'}">
            ${isVideo 
              ? `<div class="play-circle"><svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>`
              : `<div class="play-circle" style="background:rgba(255,255,255,0.2);"><svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg></div>`
            }
          </div>
        </div>
        <div class="proof-content">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
          <div class="proof-meta-row">
            <span class="proof-tool">${item.tool}</span>
            <span class="proof-accuracy">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              ${item.accuracy}
            </span>
          </div>
        </div>
      `;
      proofsGrid.appendChild(card);

      // Trigger visibility so newly filtered items never stay hidden at opacity: 0
      requestAnimationFrame(() => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 40);
      });
    });

    // Re-bind dynamic interactive card effects
    bindCardRaycast();
    bindCardTilt();
  }

  // Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProofs(filter);
    });
  });

  renderProofs('all');

  // =========================================================================
  // 3. VIDEO & LIGHTBOX MODAL HANDLERS FOR DAILY PROOFS GRID
  // =========================================================================
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const videoTitle = document.getElementById('videoModalTitle');
  const videoClose = document.getElementById('videoModalClose');

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxTool = document.getElementById('lightboxTool');
  const lightboxAccuracy = document.getElementById('lightboxAccuracy');
  const lightboxInstances = document.getElementById('lightboxInstances');
  const lightboxBatch = document.getElementById('lightboxBatch');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxWhatsappBtn = document.getElementById('lightboxWhatsappBtn');

  if (proofsGrid) {
    proofsGrid.addEventListener('click', e => {
      const mediaWrapper = e.target.closest('.proof-media-wrapper');
      if (!mediaWrapper) return;
      e.stopPropagation();

      const itemId = mediaWrapper.getAttribute('data-item-id');
      const item = DAILY_PROOFS.find(p => p.id === itemId);
      if (!item) return;

      if (item.type === 'video') {
        if (videoTitle) videoTitle.textContent = item.title;
        if (videoIframe) videoIframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`;
        if (videoModal) {
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      } else {
        if (lightboxTitle) lightboxTitle.textContent = item.title;
        if (lightboxImg) {
          lightboxImg.src = item.imageSrc;
          lightboxImg.alt = item.title;
        }
        if (lightboxTool) lightboxTool.textContent = item.tool;
        if (lightboxAccuracy) lightboxAccuracy.textContent = item.accuracy;
        if (lightboxInstances) lightboxInstances.textContent = item.instances;
        if (lightboxBatch) lightboxBatch.textContent = item.date;
        
        if (lightboxWhatsappBtn) {
          const waMsg = encodeURIComponent(`Hi GrafiGrow, I am inquiring about the dataset from your proof: "${item.title}" (${item.tool}). I need similar annotation.`);
          lightboxWhatsappBtn.href = `https://wa.me/8801952767958?text=${waMsg}`;
        }

        if (lightboxModal) {
          lightboxModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    if (videoIframe) videoIframe.src = '';
    document.body.style.overflow = '';
  }

  function closeLightboxModal() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  if (videoClose) videoClose.addEventListener('click', closeVideoModal);
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightboxModal);
  if (videoModal) videoModal.addEventListener('click', e => { if (e.target === videoModal) closeVideoModal(); });
  if (lightboxModal) lightboxModal.addEventListener('click', e => { if (e.target === lightboxModal) closeLightboxModal(); });

  // =========================================================================
  // 4. TOP PRODUCTION BENCHMARK GALLERY LIGHTBOX (SEPARATE OVERLAY)
  // =========================================================================
  const proofGalleryCards = document.querySelectorAll('#proofGalleryGrid .proof-card');
  const proofLightbox = document.getElementById('proofLightbox');
  const proofLightboxImg = document.getElementById('proofLightboxImg');
  const proofLightboxClose = document.getElementById('proofLightboxClose');

  function closeProofLightbox() {
    if (!proofLightbox) return;
    proofLightbox.classList.remove('active');
    if (proofLightboxImg) proofLightboxImg.src = '';
    document.body.style.overflow = '';
  }

  proofGalleryCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = card.querySelector('img');
      if (img && proofLightbox && proofLightboxImg) {
        proofLightboxImg.src = img.src;
        proofLightboxImg.alt = img.alt || 'Full-size proof screenshot';
        proofLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (proofLightboxClose) proofLightboxClose.addEventListener('click', closeProofLightbox);
  if (proofLightbox) {
    proofLightbox.addEventListener('click', (e) => {
      if (e.target === proofLightbox) closeProofLightbox();
    });
  }

  // Global ESC Key Closes Any Active Modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeLightboxModal();
      closeProofLightbox();
    }
  });

  // =========================================================================
  // 5. INTERACTIVE BEFORE & AFTER SEGMENTATION SLIDER
  // =========================================================================
  const comparisonBox = document.getElementById('comparisonBox');
  const sliderHandle = document.getElementById('sliderHandle');
  const rawLayer = document.getElementById('rawLayer');
  const rawInner = document.getElementById('rawInner');

  if (comparisonBox && sliderHandle && rawLayer && rawInner) {
    let isDragging = false;

    function updateSlider(clientX) {
      const rect = comparisonBox.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      sliderHandle.style.left = `${percentage}%`;
      rawLayer.style.width = `${percentage}%`;
      rawInner.style.width = `${rect.width}px`;
    }

    function syncInnerWidth() {
      const w = comparisonBox.clientWidth || comparisonBox.offsetWidth;
      if (w > 0) {
        rawInner.style.width = `${w}px`;
      }
    }

    // Keep pixel-perfect inner image width on load, resize & orientation
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => syncInnerWidth());
      ro.observe(comparisonBox);
    } else {
      window.addEventListener('resize', syncInnerWidth);
    }
    syncInnerWidth();

    function onPointerDown(e) {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      if (clientX !== undefined) {
        if (e.cancelable && e.touches) {
          e.preventDefault();
        }
        updateSlider(clientX);
      }
    }

    function onPointerUp() {
      isDragging = false;
    }

    comparisonBox.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    comparisonBox.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }

  // =========================================================================
  // 6. OFFICIAL GRAFIGROW COMMERCIAL AD CONTROLLER
  // =========================================================================
  const adVideo = document.getElementById('grafiGrowAdVideo');
  const adVideoWrapper = document.getElementById('adVideoWrapper');
  const adPlayOrbBtn = document.getElementById('adPlayOrbBtn');

  function toggleAdPlayback() {
    if (!adVideo) return;
    if (adVideo.paused) {
      adVideo.play().then(() => {
        adVideo.controls = true;
        if (adVideoWrapper) adVideoWrapper.classList.add('playing');
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    } else {
      adVideo.pause();
      adVideo.controls = false;
      if (adVideoWrapper) adVideoWrapper.classList.remove('playing');
    }
  }

  if (adPlayOrbBtn) {
    adPlayOrbBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAdPlayback();
    });
  }

  if (adVideo) {
    adVideo.addEventListener('click', () => {
      toggleAdPlayback();
    });
    adVideo.addEventListener('play', () => {
      adVideo.controls = true;
      if (adVideoWrapper) adVideoWrapper.classList.add('playing');
    });
    adVideo.addEventListener('pause', () => {
      adVideo.controls = false;
      if (adVideoWrapper) adVideoWrapper.classList.remove('playing');
    });
    adVideo.addEventListener('ended', () => {
      adVideo.controls = false;
      if (adVideoWrapper) adVideoWrapper.classList.remove('playing');
    });
  }

  // =========================================================================
  // 7. KINETIC TYPOGRAPHY: ROTATING HEADLINE
  // =========================================================================
  const kineticWords = [
    'Segmentation',
    'Semantic Masks',
    'SAM 2 Video Tracking',
    'Instance Polygons',
    '3D LiDAR Cuboids',
    'Microscopic Defect QA'
  ];
  let wordIndex = 0;
  const kineticWordEl = document.getElementById('kineticWord');

  if (kineticWordEl) {
    setInterval(() => {
      kineticWordEl.classList.add('flip-out');
      setTimeout(() => {
        wordIndex = (wordIndex + 1) % kineticWords.length;
        kineticWordEl.textContent = kineticWords[wordIndex];
        kineticWordEl.classList.remove('flip-out');
        kineticWordEl.classList.add('flip-in');
        setTimeout(() => {
          kineticWordEl.classList.remove('flip-in');
        }, 50);
      }, 420);
    }, 2800);
  }

  // =========================================================================
  // 8. MOTION GRAPHICS: POINTER SPOTLIGHT & CARD SPECULAR BORDER LIGHTING
  // =========================================================================
  const spotlight = document.getElementById('cursorSpotlight');
  window.addEventListener('mousemove', e => {
    if (spotlight) {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
  });

  function bindCardRaycast() {
    const interactiveCards = document.querySelectorAll('.cap-card, .metric-card, .proof-card, .checklist-card, .qa-step');
    interactiveCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const cardX = e.clientX - rect.left;
        const cardY = e.clientY - rect.top;
        card.style.setProperty('--card-x', `${cardX}px`);
        card.style.setProperty('--card-y', `${cardY}px`);
      });
    });
  }
  bindCardRaycast();

  // Kinetic Click Ripple Shockwave
  window.addEventListener('click', e => {
    if (e.target.closest('input, textarea, .modal-close, button, a')) return;
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });

  // =========================================================================
  // 9. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!questionBtn || !answer) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAns = faqItems[0].querySelector('.faq-answer');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }

  // =========================================================================
  // 10. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => observer.observe(el));

  // =========================================================================
  // 11. RE-ENGINEERED ROBUST MOBILE HAMBURGER CONTROLLER
  // =========================================================================
  const hamburger = document.getElementById('hamburger');
  const navCenterMenu = document.getElementById('navCenterMenu');
  if (hamburger && navCenterMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const isOpen = navCenterMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
    });

    // Close when clicking any link
    navCenterMenu.querySelectorAll('.nav-link-item').forEach(link => {
      link.addEventListener('click', () => {
        navCenterMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navCenterMenu.classList.contains('open') && !navCenterMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navCenterMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navCenterMenu.classList.contains('open')) {
        navCenterMenu.classList.remove('open');
        hamburger.classList.remove('active');
      }
    });
  }

  // =========================================================================
  // 12. ACTIVE NAV SCROLL TRACKING
  // =========================================================================
  const trackedSections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  let navTicking = false;

  window.addEventListener('scroll', () => {
    if (!navTicking) {
      window.requestAnimationFrame(() => {
        let currentSectionId = '';
        const scrollY = window.scrollY;

        trackedSections.forEach(sec => {
          if (scrollY >= sec.offsetTop - 140) {
            currentSectionId = sec.id;
          }
        });

        navLinkItems.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + currentSectionId) {
            link.classList.add('active');
          } else if (href && href.startsWith('#')) {
            link.classList.remove('active');
          }
        });

        navTicking = false;
      });
      navTicking = true;
    }
  }, { passive: true });

  // =========================================================================
  // 13. KINETIC MAGNETIC CURSOR (EXCLUDING ABSOLUTE CENTER BUTTONS)
  // =========================================================================
  const magneticEls = document.querySelectorAll('.btn-whatsapp-hero, .nav-whatsapp-pill, .btn-primary, .btn-secondary');
  magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px) scale(1.02)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  // =========================================================================
  // 14. 60FPS 3D PERSPECTIVE TILT ENGINE
  // =========================================================================
  function bindCardTilt() {
    const tiltCards = document.querySelectorAll('.proof-card, .cap-card, .metric-card, .checklist-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)';
        card.style.transform = '';
      });
    });
  }
  bindCardTilt();

});
