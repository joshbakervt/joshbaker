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

  // ── Page content ──
  const pages = {
    about: {
      title: 'ABOUT',
      body: `
        <p>Software engineer with 3 years of professional experience, currently focused on data and platform at Cox Automotive. Day-to-day I work across the stack but my primary focus is on Spring apps, REST APIs, AWS infrastructure, and React.</p>
        <p>As an engineer, I'm passionate about making sense of complexity and crafting useful, reliable products built around data. My work has maintained a consistent focus on systems that demand consistency, accuracy, and traceability.</p>
        <p>I enjoy end-to-end ownership and have strong experience working directly with clients, iterating to suit evolving needs.</p>
        <p>As a musician and someone who loves creative experimentation, I'm often drawn to audio software, especially anything I can use in a musical context.</p>
        <p>In my free time, I enjoy producing music, playing guitar, running, and snowboarding.</p>
      `
    },
    contact: {
      title: 'CONTACT',
      body: `
        <div class="contact-list">
          <div class="contact-item">
            <span class="contact-label">EMAIL</span>
            <a href="mailto:joshbakervt@gmail.com">joshbakervt@gmail.com</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">GITHUB</span>
            <a href="https://github.com/joshbakervt" target="_blank" rel="noopener">github.com/joshbakervt</a>
          </div>
          <div class="contact-item">
            <span class="contact-label">LINKEDIN</span>
            <a href="https://www.linkedin.com/in/joshbakervt/" target="_blank" rel="noopener">linkedin.com/in/joshbakervt</a>
          </div>
        </div>
      `
    },
    experience: {
      title: 'EXPERIENCE',
      body: `
        <div class="job">
          <div class="job-header">
            <h2>Dealer.com / Cox Automotive</h2>
            <span class="job-role">Software Engineer I</span>
            <span class="job-date">Sep 2023 - Present</span>
          </div>
          <ul>
            <li>Deliver a greenfield User Permissions Manager in Dealer Center as primary engineer: discovery, Java REST endpoints, Lambda integration, and React/TypeScript front-end</li>
            <li>Lead legacy modernization across multiple Spring Boot apps: ControlCenter Grails app into REST read/write endpoints, AWS SDK migrations, and JWT-authorizer Lambda refactors</li>
            <li>Build event-driven Java handlers consuming Common User Platform events via SQS, keeping user data consistent across application databases in real time</li>
            <li>Provision AWS and Kubernetes infrastructure with Terraform, maintain CI/CD pipelines in GitHub Actions, and own availability and incident response for production services</li>
            <li>Design, build, and maintain CC9-API, the central REST data-access layer for account and product data across multiple production applications</li>
          </ul>
          <div class="tech-tags">TypeScript, React, AWS, Java, Terraform, MySQL, Claude Code</div>
        </div>

        <div class="job">
          <div class="job-header">
            <h2>Precision Bioassay</h2>
            <span class="job-role">Web Developer (Part Time)</span>
            <span class="job-date">Mar 2023 - Sep 2024</span>
          </div>
          <ul>
            <li>Sole developer on a small team, owning the full software development lifecycle of Xymp, a web-based bioassay statistical analysis platform</li>
            <li>Hardened platform security by refining the authentication system and integrating the Twilio API for email and SMS multi-factor authentication</li>
            <li>Built a dynamic assay-data browser with dependent dropdown and range-based filtering, plus responsive front-end features across the app</li>
          </ul>
          <div class="tech-tags">JavaScript, PHP, Perl, MySQL, Python, Jira</div>
        </div>

        <div class="job">
          <div class="job-header">
            <h2>University of Vermont InfoSec</h2>
            <span class="job-role">Security Operations Specialist</span>
            <span class="job-date">Aug 2022 - Dec 2022</span>
          </div>
          <ul>
            <li>Built a front-end web interface for viewing and managing MySQL tables to optimize operations on network watchlist databases</li>
            <li>Introduced an intrusion detection solution for improving mailbox security and phish prevention</li>
          </ul>
          <div class="tech-tags">PHP, JavaScript, MySQL</div>
        </div>

        <div class="job">
          <div class="job-header">
            <h2>Northern Digital Inc.</h2>
            <span class="job-role">Software Engineer Intern</span>
            <span class="job-date">May 2022 - Aug 2022</span>
          </div>
          <ul>
            <li>Developed a Python automation system to analyze and manage data for 5,000+ medical imaging calibration tests, with SQLite for storage and querying</li>
            <li>Reduced an imaging calibration procedure from 3 days to under 4 hours through bash scripting and automation</li>
            <li>Collaborated with engineering team using agile methodologies and Jira</li>
          </ul>
          <div class="tech-tags">Python, SQLite, Jira, Bash</div>
        </div>

        <div class="section-divider"></div>

        <div class="job">
          <div class="job-header">
            <h2>University of Vermont</h2>
            <span class="job-role">B.S. in Computer Science</span>
            <span class="job-date">Aug 2019 - Dec 2022</span>
          </div>
        </div>
      `
    },
    projects: {
      title: 'PROJECTS',
      body: `
        <div class="project">
          <h2><a href="https://launchpadcurriculum.com" target="_blank" rel="noopener">Launchpad</a></h2>
          <ul>
            <li>Solo-designed, built, and deployed a structured online learning platform for UVM Medical Center Neurosurgery residents</li>
          </ul>
          <div class="tech-tags">Next.js, TypeScript, Node.js, AWS, PostgreSQL</div>
        </div>

        <div class="project">
          <h2><a href="https://whatsthedata.com" target="_blank" rel="noopener">What's the Data</a></h2>
          <ul>
            <li>Authored all backend serverless functions in Python (AWS Lambda): CSV ingestion, PDF extraction via Textract, and Bedrock LLM calls to structure medical-study text into JSON</li>
            <li>Built client-facing tools to parse, validate, and publish research data, persisting structured entries to DynamoDB</li>
          </ul>
          <div class="tech-tags">Python, AWS Lambda, Textract, Bedrock, DynamoDB, React</div>
        </div>

        <div class="project">
          <h2><a href="https://github.com/joshbakervt/fallingnoise" target="_blank" rel="noopener">fallingnoise</a></h2>
          <p>A configurable audio-visual React component for displaying musical rain.</p>
        </div>
      `
    },
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

  // The browser can claim a touch gesture mid-drag (e.g. as a scroll) and fire
  // pointercancel instead of pointerup. Without this, isDragging stays true and
  // the cube gets stuck. Clean up state and resume idle spin.
  function onPointerCancel() {
    if (!isDragging) return;
    isDragging = false;
    velX = 0;
    velY = 0;
    scheduleIdle();
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
    document.body.classList.add('page-open');
    cubeContainer.classList.add('hidden');
    pageContainer.classList.remove('hidden');
    history.pushState({ page }, '', `#${page}`);
  }

  function showCube() {
    isOnPage = false;
    document.body.classList.remove('page-open');
    pageContainer.classList.add('hidden');
    cubeContainer.classList.remove('hidden');
    history.pushState(null, '', window.location.pathname);
    scheduleIdle();
  }

  // ── Events ──

  document.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);
  document.addEventListener('pointercancel', onPointerCancel);
  cube.addEventListener('click', onFaceClick);
  backBtn.addEventListener('click', showCube);

  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page && pages[e.state.page]) {
      const data = pages[e.state.page];
      pageTitle.textContent = data.title;
      pageBody.innerHTML = data.body;
      isOnPage = true;
      document.body.classList.add('page-open');
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
    document.body.classList.add('page-open');
    cubeContainer.classList.add('hidden');
    pageContainer.classList.remove('hidden');
  } else {
    startIdle();
  }

  // ── Visit Counter ──

  const visitCounter = document.getElementById('visit-counter');
  const STORAGE_KEY = 'jb_visited';
  const cached = localStorage.getItem(STORAGE_KEY);

  if (cached) {
    visitCounter.textContent = `visitor #${cached}`;
  } else {
    fetch('https://hvkfuvwm9f.execute-api.us-east-1.amazonaws.com/default/addToDynamoDB')
      .then(r => r.ok ? r.json() : Promise.reject('fetch failed'))
      .then(count => {
        localStorage.setItem(STORAGE_KEY, count);
        visitCounter.textContent = `visitor #${count}`;
      })
      .catch(() => {});
  }
})();
