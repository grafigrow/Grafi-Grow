/* ===== GrafiGrow — Annotation & Segmentation Portal Interactive Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DAILY PROOFS & DELIVERABLES DATABASE (ORGANIZED BY REAL PROJECTS)
  // =========================================================================
  const DAILY_PROOFS = [
    // --- 1. ARCHITECTURAL CAD & FLOOR PLANS (cad) ---
    {
      id: 'proof-cad-1',
      type: 'image',
      category: 'cad',
      title: 'Architectural CAD Floor Plan Vectorization',
      description: 'Multi-floor CAD blueprint vectorization. Delineates load-bearing walls, partitions, door swing radiuses, and window openings with sub-pixel rectangle precision.',
      date: 'Batch #79-02 • CAD QA',
      tool: 'CVAT • Wall Rectangles & Partitions',
      accuracy: '99.9% Vector Adherence',
      instances: '122 structural objects / frame',
      imageSrc: '/proofs/proof_cad_floorplan.png'
    },
    {
      id: 'proof-cad-2',
      type: 'image',
      category: 'cad',
      title: 'Commercial Office Blueprint Icon & Symbol Recognition',
      description: 'Automated detection and labeling of commercial floor plan icons: L-shaped desks, workstations, conference seating, doors, and structural pillars.',
      date: 'IconRecognition Suite #28',
      tool: 'CVAT • Blueprint Symbol Detection',
      accuracy: '99.8% Icon Precision',
      instances: '41 detected symbols / sheet',
      imageSrc: '/proofs/proof_cad_symbols.png'
    },
    {
      id: 'proof-cad-3',
      type: 'image',
      category: 'cad',
      title: 'Complete Architectural Room Boundary & Area Indexing',
      description: 'Full architectural room boundaries, area square-meter indexing (177.0 m²), boundary lines, construction notes, and scale calibration (1:100 / 1:200).',
      date: 'CAD Enterprise Deliverable',
      tool: 'CVAT & Roboflow • Multi-Engine CAD',
      accuracy: 'Sub-Millimeter Scale SLA',
      instances: 'Multi-Room Vector Sheets',
      imageSrc: '/proofs/proof_cad_showcase.jpg'
    },

    // --- 2. SPORTS AI & POSE ESTIMATION (sports) ---
    {
      id: 'proof-sports-1',
      type: 'image',
      category: 'sports',
      title: 'Olympic Wrestling 17-Point Skeletal Pose Estimation',
      description: 'High-speed grappling and combat sports motion tracking. 17-point skeletal joints (ankles, knees, hips, shoulders, elbows, wrists) with anonymized facial landmarks.',
      date: 'SportsBiomechanics #399',
      tool: 'CVAT • Skeletal Keypoint Tracking',
      accuracy: '99.7% Keypoint Locality',
      instances: 'Athletic Motion Frames',
      imageSrc: '/proofs/proof_sports_wrestling_pose.png'
    },
    {
      id: 'proof-sports-2',
      type: 'image',
      category: 'sports',
      title: 'Golf Ball Spin & Launch Trajectory Multi-Point Tracking',
      description: 'Sub-pixel landmark tracking on high-speed monochrome camera feeds (1,000+ fps) capturing golf ball dimple spin velocity and launch angles for launch monitors.',
      date: 'Golf Track Analytics #14',
      tool: 'CVAT • Multi-Point Landmark Shape',
      accuracy: '0.02px Landmark Variance',
      instances: '106 dimple tracking points',
      imageSrc: '/proofs/proof_sports_golf_spin.png'
    },
    {
      id: 'proof-sports-3',
      type: 'image',
      category: 'sports',
      title: 'Broadcast Sports AI: Football Player & Ball Bounding Boxes',
      description: 'Tactical match analysis bounding boxes delineating home/away team players, match referees, and ball tracking across broadcast television feeds.',
      date: 'Premier League Analytics #03',
      tool: 'Roboflow • Real-Time Broadcast Tracking',
      accuracy: '99.6% Detection Precision',
      instances: '12 track IDs / frame',
      imageSrc: '/proofs/proof_sports_football_tracking.png'
    },

    // --- 3. SMART AGRICULTURE & ROBOTICS (agri) ---
    {
      id: 'proof-agri-1',
      type: 'image',
      category: 'agri',
      title: 'Autonomous SpotSprayer Robotic Crop Seedling Tracking',
      description: 'High-speed video tracking of crop seedlings (Salat) across temporal camera frames for autonomous agricultural robots with micro-dose precision spray nozzles.',
      date: 'SpotSprayer Production #60',
      tool: 'CVAT • Temporal Video Tracking',
      accuracy: '99.8% Spray Target Fit',
      instances: 'Robotic Weeding Sequences',
      imageSrc: '/proofs/proof_agri_spotsprayer.png'
    },
    {
      id: 'proof-agri-2',
      type: 'image',
      category: 'agri',
      title: 'Greenhouse Floral Blossom & Fruit Yield Counting',
      description: 'Dense automated botanical classification and counting: Bud, Flower, Open bud, and Plant across high-resolution greenhouse canopies for yield forecasting.',
      date: 'Botany Harvest Calibration #12',
      tool: 'Roboflow • Multi-Class Dense Detection',
      accuracy: '99.5% Counting Recall',
      instances: '400+ blossoms / frame',
      imageSrc: '/proofs/proof_agri_horticulture_counting.jpg'
    },
    {
      id: 'proof-agri-3',
      type: 'video',
      category: 'agri',
      title: 'Agricultural Plant Phenotyping & Drone VOS Tracking',
      description: 'Multi-frame video object segmentation tracking plant leaf area index, blights, and fruiting bodies across temporal drone sequences with permanent ID persistence.',
      date: 'Drone Agro Batch #44',
      tool: 'CVAT • Video Object Segmentation',
      accuracy: '94% Yield Prediction',
      instances: 'Temporal Drone Sequences',
      videoId: '754iZGwEEmg',
      thumbnail: 'https://img.youtube.com/vi/754iZGwEEmg/hqdefault.jpg'
    },

    // --- 4. MEDICAL AI & CLINICAL DIAGNOSTICS (medical) ---
    {
      id: 'proof-med-1',
      type: 'image',
      category: 'medical',
      title: 'Dental Radiography Sub-Pixel Tooth & Enamel Polygon Masking',
      description: 'Meticulous sub-pixel polygon boundary delineation separating tooth enamel from underlying dentin and root structures from dental X-ray sequences for diagnostic models.',
      date: 'Dental AI Batch #164',
      tool: 'CVAT • DICOM & X-Ray Segmentation',
      accuracy: '99.6% Boundary Fidelity',
      instances: 'Enamel & Tooth Polygon Masks',
      imageSrc: '/proofs/proof_medical_dental_radiography.png'
    },
    {
      id: 'proof-med-2',
      type: 'image',
      category: 'medical',
      title: 'Medical AI Cell Nuclei Segmentation Benchmark',
      description: 'Histology benchmark with sub-micron contour tracing and double-doctor consensus audits for clinical AI oncology diagnostic models.',
      date: 'Histology Benchmark #103',
      tool: 'CVAT • Multi-Class Polygon',
      accuracy: '99.88% Consistency',
      instances: '8,500 nuclei masks',
      imageSrc: '/proofs/proof_benchmark_medical.png'
    },
    {
      id: 'proof-med-3',
      type: 'video',
      category: 'medical',
      title: 'Dental Radiography Sub-Pixel Polygon Masking QA Stream',
      description: 'Meticulous polygon boundary delineation of dental anomalies (cavities, root canals, bone loss) from X-ray DICOM sequences for clinical AI diagnostic models.',
      date: 'Clinical Radiography Log',
      tool: 'CVAT • Polygons & Bounding Boxes',
      accuracy: '99.6% IoU',
      instances: '14,200 structures',
      videoId: 'wr3GlzDz-9c',
      thumbnail: 'https://img.youtube.com/vi/wr3GlzDz-9c/hqdefault.jpg'
    },

    // --- 5. AUTOMOTIVE & TRAFFIC SURVEILLANCE (auto) ---
    {
      id: 'proof-auto-1',
      type: 'image',
      category: 'auto',
      title: 'Ferrari Supercar Rim, Windshield & Window Polygon Masking',
      description: 'Sub-pixel curvature fitting for Ferrari 488 rims, front windshield, and aerodynamic side glazing. Sanitized for automotive configurator & ADAS datasets.',
      date: 'Automotive Studio #304',
      tool: 'CVAT • Sub-Pixel Polygon Masks',
      accuracy: '99.9% Curvature Adherence',
      instances: 'Multi-Class Automotive Parts',
      imageSrc: '/proofs/proof_auto_supercar_ferrari.png'
    },
    {
      id: 'proof-auto-2',
      type: 'image',
      category: 'auto',
      title: 'Tesla Model 3 Aero Rim & Panoramic Glass Segmentation',
      description: 'High-precision polygon segmentation on Tesla Model 3 exterior components: aero rims, multi-pane glass roof, and side quarter windows for automated manufacturing QA.',
      date: 'EV Production #319',
      tool: 'CVAT • Polygon & Contour QA',
      accuracy: '99.85% Mask Accuracy',
      instances: 'Aero Rims & Panoramic Glass',
      imageSrc: '/proofs/proof_auto_tesla_segmentation.png'
    },
    {
      id: 'proof-auto-3',
      type: 'image',
      category: 'auto',
      title: 'Night-Vision Traffic Surveillance & Severe Occlusion Tagging',
      description: 'High-density urban traffic surveillance annotation. Multimodal metadata labeling (Car/Truck/Van, Occlusion: True, Rain/Greyscale) with sanitized GPS.',
      date: 'Urban Traffic 20K Dataset',
      tool: 'Supervisely • Surveillance Metadata Suite',
      accuracy: '99.7% Occlusion Tagging SLA',
      instances: 'Vehicles, Trucks & Vans',
      imageSrc: '/proofs/proof_auto_traffic_surveillance.jpg'
    },
    {
      id: 'proof-auto-4',
      type: 'image',
      category: 'auto',
      title: 'Cityscapes Urban Autonomous Driving Polygon Benchmark',
      description: 'Cityscapes VOS standard multi-class polygon masking displaying multi-clip video task assignment, automated pre-label ingestion, and sub-second queuing.',
      date: 'Production Batch #104',
      tool: 'EgoScale • CVAT Cloud Core',
      accuracy: '99.92% IoU Pass',
      instances: '4,850 video segments',
      imageSrc: '/proofs/proof_benchmark_autonomous.png'
    },

    // --- 6. HUMAN BIOMETRICS & SIZING AI (biometrics) ---
    {
      id: 'proof-bio-1',
      type: 'image',
      category: 'biometrics',
      title: 'Pediatric Full-Body Anthropometric Pose Segmentation',
      description: 'Multi-segment anatomical contouring (chest, head, hips, foot, lower leg, neck) for pediatric sizing, biometric growth analysis, and posture evaluation. Facial region blurred for privacy.',
      date: 'Anthropometric Batch #14',
      tool: 'Roboflow • Multi-Segment Polygon Masking',
      accuracy: '99.8% Anatomical Alignment',
      instances: '21 segmented anatomical parts',
      imageSrc: '/proofs/proof_biometric_child_measurement.png'
    },
    {
      id: 'proof-bio-2',
      type: 'image',
      category: 'biometrics',
      title: 'Adult Biometric Sizing & Virtual Try-On Modeling',
      description: 'Fine polygon masking for 3D digital apparel sizing and virtual fitting rooms. Traces body contours under varied garments with sub-pixel silhouette boundary isolation.',
      date: 'Virtual Try-On Batch #01',
      tool: 'Roboflow • 3D Fit & Sizing Segmentation',
      accuracy: '99.9% Contour Fit',
      instances: 'Full Sizing Schema (21 Classes)',
      imageSrc: '/proofs/proof_biometric_adult_measurement.png'
    },

    // --- 7. DOCUMENT AI & SCIENTIFIC OCR (document) ---
    {
      id: 'proof-doc-1',
      type: 'image',
      category: 'document',
      title: 'Academic CVPR Research Paper Complex Layout & Formula Parsing',
      description: 'Dense bounding box parsing for LLM training and multimodal document retrieval. Isolates Title, Authors, Abstract, Section Headings, Sub-Headings, Paragraphs, Inline Math, Standalone LaTeX formulas, and Figure Captions.',
      date: 'Scientific Paper Layout #01',
      tool: 'Document AI • Multi-Class Layout Suite',
      accuracy: '99.9% Layout Parsing SLA',
      instances: 'Title, Math, Headings, Captions',
      imageSrc: '/proofs/proof_document_cvpr_parsing.png'
    },

    // --- 8. E-COMMERCE, RETAIL & HOSPITALITY (ecommerce) ---
    {
      id: 'proof-ecom-1',
      type: 'image',
      category: 'ecommerce',
      title: 'Interior Design Furniture & Room Layout Polygon Segmentation',
      description: 'Pixel-level furniture polygon segmentation for AR catalog preview, interior staging, and retail e-commerce engines. Tight boundary fitting around textured corner sofas and tables.',
      date: 'Furniture Catalog #13',
      tool: 'Roboflow • Multi-Class Polygon Masking',
      accuracy: '99.8% Pixel Adherence',
      instances: 'Sofas, Tables, Chairs, Stools',
      imageSrc: '/proofs/proof_ecommerce_furniture.png'
    },
    {
      id: 'proof-ecom-2',
      type: 'image',
      category: 'ecommerce',
      title: 'Trading Card Booster Pack & Collectibles Bounding Box QA',
      description: 'Automated retail grading and collectibles identification. High-precision bounding boxes for booster pack packaging, scale weight verification, and blister pack inventory counting.',
      date: 'Collectibles Pack #1313',
      tool: 'CVAT • Retail Object Detection',
      accuracy: '99.9% Packaging Boundary',
      instances: 'Booster Pack Detection',
      imageSrc: '/proofs/proof_retail_pokemon_pack.png'
    },
    {
      id: 'proof-ecom-3',
      type: 'video_local',
      category: 'ecommerce',
      title: 'Vacation Rental & Hospitality Amenity Audit (Video Screen Record)',
      description: 'Live screen recording of hotel room amenity auditing. Automated inspection of vacation rental turnover compliance (remotes, robes, bath towels, accent pillows).',
      date: 'Hospitality Audit Sprint',
      tool: 'Roboflow • Hospitality AI Suite',
      accuracy: '99.8% Amenity Detection',
      instances: 'Remotes, Robes, Towels, Pillows',
      videoSrc: '/proofs/proof_video_hotel_audit.mp4',
      thumbnail: '/proofs/proof_ecommerce_furniture.png'
    },

    // --- 9. INDUSTRIAL DEFECT QA & MATERIAL SCIENCE (industrial) ---
    {
      id: 'proof-ind-1',
      type: 'image',
      category: 'industrial',
      title: 'Microscopic Wafer Pore & Semiconductor Structural Defect QA',
      description: 'Dense micro-polygon defect detection on 4K semiconductor wafer cross-sections. Delineates material rails and hundreds of sub-micron pore vacancies invisible to standard optical inspection.',
      date: 'Wafer Defect QA #15',
      tool: 'CVAT • 4K Surface Micro-Masking',
      accuracy: '99.7% Sub-Pixel IoU',
      instances: '327 micro-defects & material rails',
      imageSrc: '/proofs/proof_industrial_wafer_pores.png'
    },
    {
      id: 'proof-ind-2',
      type: 'image',
      category: 'industrial',
      title: 'Industrial Micro-Electrode Radiographic Defect Contouring',
      description: 'High-density polygon contouring on industrial radiographic scans. Delineates micro-electrodes and classifies acceptable (io) vs non-compliant (nio) structural defects with sanitized filepaths.',
      date: 'Industrial Radiography Sprint',
      tool: 'LabelMe • EfficientSAM Integration',
      accuracy: '99.85% Defect Classification',
      instances: 'Sub-Micron Radiographic Contours',
      imageSrc: '/proofs/proof_industrial_micro_electrode.png'
    },
    {
      id: 'proof-ind-3',
      type: 'image',
      category: 'industrial',
      title: 'Industrial Micro-PCB Solder Defect QA Benchmark',
      description: 'High-resolution 4K surface scan defect detection. Micro-polygon delineation with zero false negatives for automated manufacturing QA.',
      date: 'Production Batch #102',
      tool: 'CVAT • Micro-Surface Defect',
      accuracy: '99.96% Defect Fit',
      instances: '12,400 joints',
      imageSrc: '/proofs/proof_benchmark_industrial.png'
    },
    {
      id: 'proof-ind-4',
      type: 'video',
      category: 'industrial',
      title: 'Micro-Electrode Precision Robotic Mapping (Video Log)',
      description: 'High-density semantic segmentation for robotic pick-and-place assembly. Accurately maps irregular micro-electrodes distorted by glare and solder artifacts.',
      date: 'Daily Production Batch',
      tool: 'Labelme • Anaconda • Semantic',
      accuracy: '99.8% Pick Accuracy',
      instances: '15,000+ frames',
      videoId: '2zqnXJDFbuw',
      thumbnail: 'https://img.youtube.com/vi/2zqnXJDFbuw/hqdefault.jpg'
    },

    // --- 10. SCREEN RECORDINGS & PRODUCTION SESSIONS (video) ---
    {
      id: 'proof-v-pokemon',
      type: 'video_local',
      category: 'ecommerce',
      title: 'Collectibles Packaging CVAT Live Annotation Session (5 min)',
      description: 'Unedited 5-minute production screen recording of a senior annotator completing tight bounding boxes, frame scrubbing, and QA validation inside CVAT.',
      date: 'CVAT Session #1756811',
      tool: 'CVAT • 5-Minute Production Recording',
      accuracy: '100% Real-Time QA',
      instances: 'Continuous Video Stream',
      videoSrc: '/proofs/proof_video_pokemon_qa.mp4',
      thumbnail: '/proofs/proof_retail_pokemon_pack.png'
    },
    {
      id: 'proof-v-traffic',
      type: 'video_local',
      category: 'auto',
      title: 'Urban Surveillance Multi-Vehicle Occlusion Tagging (Supervisely)',
      description: 'Complete live workflow recording showing multi-attribute vehicle tagging, occlusion checkboxes, weather tagging, and submit job pipeline inside Supervisely.',
      date: 'Supervisely Sprint #58422',
      tool: 'Supervisely • Surveillance Workflow Recording',
      accuracy: '99.7% Attribution Accuracy',
      instances: 'Continuous Workflow Stream',
      videoSrc: '/proofs/proof_video_traffic_surveillance.mp4',
      thumbnail: '/proofs/proof_auto_traffic_surveillance.jpg'
    },
    {
      id: 'proof-v-activelearning',
      type: 'video',
      category: 'auto',
      title: 'Human-in-the-Loop Active Learning QA Loop (Video)',
      description: 'Automated flagging of low-confidence model boundaries followed by senior human-in-the-loop micro-refinement, cutting false positives by 45%.',
      date: 'Production Sprint QA',
      tool: 'Custom Automated Scripts • Active Learning',
      accuracy: '45% Lower FP Rate',
      instances: 'Continuous Ingestion',
      videoId: 'xudGp0fGm5w',
      thumbnail: 'https://img.youtube.com/vi/xudGp0fGm5w/hqdefault.jpg'
    }
  ];

  // =========================================================================
  // 2. RENDER PROOFS & FILTERING (WITH ZERO MIX-UP)
  // =========================================================================
  const proofsGrid = document.getElementById('proofsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProofs(filter = 'all') {
    if (!proofsGrid) return;
    proofsGrid.innerHTML = '';

    const filtered = DAILY_PROOFS.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'video') return item.type === 'video' || item.type === 'video_local';
      return item.category === filter;
    });

    filtered.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = `proof-card reveal reveal-scale reveal-delay-${(index % 4) + 1}`;
      card.setAttribute('data-id', item.id);

      const isVideo = item.type === 'video' || item.type === 'video_local';
      const mediaSrc = isVideo ? (item.thumbnail || item.imageSrc) : item.imageSrc;
      const typeLabel = isVideo ? 'Live Screen Record' : 'Workspace Screenshot';
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
        }, index * 30);
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
  const videoLocalPlayer = document.getElementById('videoLocalPlayer');
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

      if (item.type === 'video_local') {
        if (videoTitle) videoTitle.textContent = item.title;
        if (videoIframe) {
          videoIframe.style.display = 'none';
          videoIframe.src = '';
        }
        if (videoLocalPlayer) {
          videoLocalPlayer.style.display = 'block';
          videoLocalPlayer.src = item.videoSrc;
          videoLocalPlayer.currentTime = 0;
          videoLocalPlayer.play().catch(() => {});
        }
        if (videoModal) {
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      } else if (item.type === 'video') {
        if (videoTitle) videoTitle.textContent = item.title;
        if (videoLocalPlayer) {
          videoLocalPlayer.pause();
          videoLocalPlayer.style.display = 'none';
          videoLocalPlayer.src = '';
        }
        if (videoIframe) {
          videoIframe.style.display = 'block';
          videoIframe.src = `https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1`;
        }
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
          const waMsg = encodeURIComponent(`Hi GrafiGrow, I am inquiring about your verified project: "${item.title}" (${item.tool}). I need similar high-precision annotation.`);
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
    if (videoIframe) {
      videoIframe.src = '';
      videoIframe.style.display = 'none';
    }
    if (videoLocalPlayer) {
      videoLocalPlayer.pause();
      videoLocalPlayer.src = '';
      videoLocalPlayer.style.display = 'none';
    }
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
  // 7. CARD RAYCAST MOUSE LIGHTING & 3D TILT
  // =========================================================================
  function bindCardRaycast() {
    const cards = document.querySelectorAll('.proof-card, .metric-card, .cap-card, .checklist-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  function bindCardTilt() {
    const tiltCards = document.querySelectorAll('.proof-card, .cap-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  bindCardRaycast();
  bindCardTilt();

  // =========================================================================
  // 8. FAQ ACCORDION
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        faqItems.forEach(f => f.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // =========================================================================
  // 9. SCROLL REVEAL OBSERVER
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

});
