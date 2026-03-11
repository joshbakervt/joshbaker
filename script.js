(() => {
  const cube = document.getElementById('cube');
  const cubeContainer = document.getElementById('cube-container');
  const pageContainer = document.getElementById('page-container');
  const pageTitle = document.getElementById('page-title');
  const pageBody = document.getElementById('page-body');
  const backBtn = document.getElementById('back-btn');

  // ── State ──
  let isDragging = false;
  let dragMoved = false;
  let pointerDownPos = { x: 0, y: 0 };
  let rotX = -15;
  let rotY = 30;
  let velX = 0;
  let velY = 0;
  let prevPointer = { x: 0, y: 0 };
  let inertiaId = null;
  let idleId = null;
  let isOnPage = false;
  let isNavigating = false;

  const DRAG_THRESHOLD = 5;

  // ── Page content (boilerplate) ──
  const pages = {
    about: {
      title: 'ABOUT',
      body: '<p>About page content goes here.</p>'
    },
    contact: {
      title: 'CONTACT',
      body: '<p>Contact page content goes here.</p>'
    },
    experience: {
      title: 'EXPERIENCE',
      body: '<p>Experience page content goes here.</p>'
    },
    projects: {
      title: 'PROJECTS',
      body: '<p>Projects page content goes here.</p>'
    },
    lab: {
      title: 'LAB',
      body: '<p>Lab page content goes here.</p>'
    },
    blog: {
      title: 'BLOG',
      body: '<p>Blog page content goes here.</p>'
    }
  };

  // ── Cube transform ──

  function updateCube() {
    cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  // ── Drag ──

  function onPointerDown(e) {
    if (isOnPage || isNavigating) return;
    isDragging = true;
    dragMoved = false;
    pointerDownPos = { x: e.clientX, y: e.clientY };
    prevPointer = { x: e.clientX, y: e.clientY };
    velX = 0;
    velY = 0;
    stopInertia();
    stopIdle();
  }

  function onPointerMove(e) {
    if (!isDragging) return;

    const dx = e.clientX - pointerDownPos.x;
    const dy = e.clientY - pointerDownPos.y;

    if (!dragMoved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) {
      return;
    }
    dragMoved = true;

    const moveX = e.clientX - prevPointer.x;
    const moveY = e.clientY - prevPointer.y;

    velX = moveX * 0.4;
    velY = moveY * 0.4;

    rotY += moveX * 0.4;
    rotX -= moveY * 0.4;
    updateCube();

    prevPointer = { x: e.clientX, y: e.clientY };
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;

    if (dragMoved && (Math.abs(velX) > 0.3 || Math.abs(velY) > 0.3)) {
      startInertia();
    } else {
      scheduleIdle();
    }
  }

  // ── Inertia ──

  function startInertia() {
    function step() {
      velX *= 0.95;
      velY *= 0.95;
      rotY += velX;
      rotX -= velY;
      updateCube();
      if (Math.abs(velX) > 0.05 || Math.abs(velY) > 0.05) {
        inertiaId = requestAnimationFrame(step);
      } else {
        inertiaId = null;
        scheduleIdle();
      }
    }
    step();
  }

  function stopInertia() {
    if (inertiaId) {
      cancelAnimationFrame(inertiaId);
      inertiaId = null;
    }
  }

  // ── Idle spin ──

  function startIdle() {
    function spin() {
      if (isDragging || isOnPage || isNavigating) {
        idleId = null;
        return;
      }
      rotY += 0.15;
      updateCube();
      idleId = requestAnimationFrame(spin);
    }
    spin();
  }

  function stopIdle() {
    if (idleId) {
      cancelAnimationFrame(idleId);
      idleId = null;
    }
  }

  function scheduleIdle() {
    setTimeout(() => {
      if (!isDragging && !isOnPage && !isNavigating && !idleId) {
        startIdle();
      }
    }, 2000);
  }

  // ── Face click → navigate ──

  function onFaceClick(e) {
    if (dragMoved || isNavigating) return;

    const face = e.target.closest('.cube-face');
    if (!face) return;

    const page = face.dataset.page;
    if (!page || !pages[page]) return;

    navigateToPage(page, face);
  }

  function navigateToPage(page, face) {
    const faceTargets = {
      front:  { x: 0, y: 0 },
      back:   { x: 0, y: 180 },
      right:  { x: 0, y: 90 },
      left:   { x: 0, y: -90 },
      top:    { x: -90, y: 0 },
      bottom: { x: 90, y: 0 }
    };

    const faceClass = [...face.classList].find(c => c !== 'cube-face');
    const target = faceTargets[faceClass];
    if (!target) return;

    isNavigating = true;
    stopIdle();
    stopInertia();

    // Snap to nearest equivalent angle
    rotY = nearestAngle(rotY, target.y);
    rotX = nearestAngle(rotX, target.x);

    cube.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    updateCube();

    setTimeout(() => {
      cube.style.transition = '';
      isNavigating = false;
      showPage(page);
    }, 650);
  }

  function nearestAngle(current, target) {
    const diff = ((target - current) % 360 + 540) % 360 - 180;
    return current + diff;
  }

  // ── Page transitions ──

  function showPage(page) {
    const data = pages[page];
    pageTitle.textContent = data.title;
    pageBody.innerHTML = data.body;
    isOnPage = true;
    cubeContainer.classList.add('hidden');
    pageContainer.classList.remove('hidden');
    history.pushState({ page }, '', `#${page}`);
  }

  function showCube() {
    isOnPage = false;
    pageContainer.classList.add('hidden');
    cubeContainer.classList.remove('hidden');
    history.pushState(null, '', window.location.pathname);
    scheduleIdle();
  }

  // ── Events ──

  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  cube.addEventListener('click', onFaceClick);
  backBtn.addEventListener('click', showCube);

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page && pages[e.state.page]) {
      const data = pages[e.state.page];
      pageTitle.textContent = data.title;
      pageBody.innerHTML = data.body;
      isOnPage = true;
      cubeContainer.classList.add('hidden');
      pageContainer.classList.remove('hidden');
    } else {
      showCube();
    }
  });

  // ── Init ──

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && pages[initialHash]) {
    // Directly show page without animation
    const data = pages[initialHash];
    pageTitle.textContent = data.title;
    pageBody.innerHTML = data.body;
    isOnPage = true;
    cubeContainer.classList.add('hidden');
    pageContainer.classList.remove('hidden');
  } else {
    startIdle();
  }
})();
