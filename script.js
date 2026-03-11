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
        <p>Software engineer with 3 years of professional experience, currently building backend services at Dealer.com / Cox Automotive. Day to day I work across the stack but lean toward backend on Spring apps and REST API development, AWS infrastructure, and internal tooling.</p>
        <p>Outside of work, I like building projects that let me explore something creative. I'm often drawn to audio-visual experiments and especially anything I could use in a creative musical context.</p>
        <p>Outside of work I enjoy producing music, playing guitar, running, or snowboarding.</p>
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
            <li>Develop and maintain Java Spring REST APIs powering dealer-facing products</li>
            <li>Deploy API endpoints as AWS Lambdas within an Nx monorepo</li>
            <li>Built a user permissions management tool end-to-end, from API design through React front end</li>
            <li>Designed a custom AI agent in Copilot Studio and Claude for product managers, incorporating user feedback through iterative prototyping</li>
          </ul>
          <div class="tech-tags">Typescript, AWS, Java, Terraform, MySQL, Claude Code</div>
        </div>

        <div class="job">
          <div class="job-header">
            <h2>Precision Bioassay</h2>
            <span class="job-role">Web Developer (Part Time)</span>
            <span class="job-date">Mar 2023 - Sep 2024</span>
          </div>
          <ul>
            <li>Sole developer responsible for full SDLC of Xymp, a web-based bioassay statistical analysis platform</li>
            <li>Strengthened platform security by refining login system and integrating Twilio API for email and SMS MFA</li>
            <li>Implemented robust filtering in assay browser with dynamically populated dropdowns and range selectors</li>
            <li>Improved UI and accessibility with Bootstrap CSS and responsive JavaScript features</li>
            <li>Debugged build, testing, and deployment automation using Perl and R</li>
            <li>Introduced Jira for project management and issue tracking</li>
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
          <p>Continuing Education Certificate in Computer Software: Cybersecurity</p>
          <ul>
            <li>Placed third in Computer Science fair with <a href="https://whatsthedata.com" target="_blank" rel="noopener">What's the Data?</a>, a neuroscience study resource web app built with AWS Lambda, DynamoDB, API Gateway, and HTML/JS/CSS</li>
          </ul>
        </div>
      `
    },
    projects: {
      title: 'PROJECTS',
      body: `
        <div class="project">
          <h2><a href="https://launchpadcurriculum.com" target="_blank" rel="noopener">Launchpad</a></h2>
          <p>A neurosurgery learning platform for residents at the University of Vermont.</p>
        </div>

        <div class="project">
          <h2><a href="https://github.com/joshbakervt?tab=repositories" target="_blank" rel="noopener">fallingnoise</a></h2>
          <p>An audio-visual library for displaying musical "rain."</p>
        </div>

        <div class="project">
          <h2><a href="https://whatsthedata.com" target="_blank" rel="noopener">What's the Data?</a></h2>
          <p>Streamlined access to 1,300+ PubMed studies for neuroscience students. Built with AWS S3, Lambda, DynamoDB, and API Gateway.</p>
        </div>

        <div class="project">
          <h2><a href="https://github.com/joshbakervt/clab" target="_blank" rel="noopener">clab</a></h2>
          <p>Centralized codebase for C programming projects, specializing in the audio domain.</p>
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
