/* ========================================
   MAIN JAVASCRIPT - Arise Band_KE
   Interactive functionality
   ======================================== */

// === Page Loader ===
(function initPageLoader() {
  window.addEventListener('load', function() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 800); // Show loader for at least 800ms
    }
  });
})();

// === Scroll-triggered Animation for Elements ===
(function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate__animated');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate__fadeInUp');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  animatedElements.forEach(el => observer.observe(el));
})();

// === Vision/Mission Heading Gradient Effect ===
(function initVisionHeading() {
  const heading = document.getElementById('vmHeading');
  if (!heading) return;
  
  heading.classList.add('color-transition');
  setTimeout(() => heading.classList.add('blend'), 3000);
})();

// === Event Countdown Timer ===
(function initEventCountdown() {
  const targetDate = new Date(2025, 11, 15, 19, 0, 0);
  const el = document.getElementById('countdown-event1');
  if (!el) return;

  function format(n) {
    return n.toString().padStart(2, '0');
  }

  function updateCountdown() {
    const now = new Date();
    let diff = targetDate - now;
    
    if (diff <= 0) {
      el.textContent = 'Event started';
      clearInterval(countdownTimer);
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.textContent = `${days}d ${format(hours)}h ${format(minutes)}m ${format(seconds)}s`;
  }

  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);
})();

// === Event Logo Swap Animation ===
(function initEventLogoSwap() {
  const logoEl = document.getElementById('eventLogo');
  if (!logoEl) return;
  
  const sources = ['assets/images/event1.png', 'assets/images/logo.jpg'];
  let idx = 0;

  function swapLogo() {
    idx = (idx + 1) % sources.length;
    logoEl.style.opacity = 0;
    
    setTimeout(() => {
      logoEl.src = sources[idx];
      logoEl.alt = idx === 0 ? 'Event 1 Poster' : 'Arise Band Logo';
      
      // Restart CSS animation
      logoEl.classList.remove('event-logo');
      void logoEl.offsetWidth;
      logoEl.classList.add('event-logo');
      logoEl.style.opacity = 1;
    }, 400);
  }

  const swapTimer = setInterval(swapLogo, 2500);

  // Pause swapping when modal is open
  const modalEl = document.getElementById('event1Modal');
  if (modalEl) {
    modalEl.addEventListener('show.bs.modal', () => clearInterval(swapTimer));
  }
})();

// === Contact Form Handler ===
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('contactFeedback');
  
  if (!form || !feedback) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    feedback.style.display = 'block';
    form.reset();
    setTimeout(() => feedback.style.display = 'none', 5000);
  });
})();

// === Social Feed Toggle (if needed) ===
(function initSocialFeedToggle() {
  const showButton = document.getElementById('showSocialFeed');
  const feed = document.getElementById('social-feed');
  
  if (!showButton || !feed) return;

  showButton.addEventListener('click', function(e) {
    e.preventDefault();
    feed.style.display = 'block';
    feed.scrollIntoView({ behavior: 'smooth' });
  });
})();

// === Console Welcome Message ===
console.log('%c🎵 Welcome to Arise Band_KE! %c\n Gospel. Groove. Glory.', 
  'color: #00fff7; font-size: 20px; font-weight: bold;',
  'color: #fff; font-size: 14px;'
);
