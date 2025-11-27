/* ========================================
   PERFORMANCE OPTIMIZATIONS
   Preload, prefetch, and caching
   ======================================== */

// === Preload Critical Resources ===
(function preloadResources() {
  const criticalImages = [
    'assets/images/logo.jpg',
    'assets/images/slide1.jpg',
    'assets/images/slide2.jpg',
    'assets/images/slide3.jpg'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
})();

// === Prefetch Next Pages ===
(function prefetchPages() {
  const pagesToPrefetch = [
    'pages/events.html',
    'pages/band-members.html',
    'pages/gallery.html',
    'pages/fanwall.html'
  ];

  // Wait for page to load before prefetching
  window.addEventListener('load', function() {
    setTimeout(() => {
      pagesToPrefetch.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    }, 1000);
  });
})();

// === Lazy Load Images ===
(function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers without native lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      observer.observe(img);
    });
  }
})();

// === Cache External Resources ===
(function enableCaching() {
  // Service Worker for caching (if supported)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').then(
        function(registration) {
          console.log('ServiceWorker registration successful');
        },
        function(err) {
          console.log('ServiceWorker registration failed: ', err);
        }
      );
    });
  }
})();

// === Debounce Scroll Events ===
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// === Optimize Animation Performance ===
(function optimizeAnimations() {
  // Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduce-motion');
  }
})();

// === Defer Non-Critical Scripts ===
(function deferScripts() {
  window.addEventListener('load', function() {
    // Defer EmailJS initialization
    setTimeout(() => {
      if (typeof emailjs !== 'undefined') {
        emailjs.init({
          publicKey: "6VgmY-3Y1UWLQbkgR",
        });
      }
    }, 500);
  });
})();
