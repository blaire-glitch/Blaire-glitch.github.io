/* ========================================
   URL REDIRECT HANDLER
   Remove .html from URL bar
   ======================================== */

// Immediately remove .html from URL (runs before page loads)
(function() {
  if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace(/\.html$/, '');
    const newUrl = newPath + window.location.search + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }
})();

// Also run on DOMContentLoaded for safety
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace(/\.html$/, '');
    const newUrl = newPath + window.location.search + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }
  
  // Update all internal links to remove .html
  const links = document.querySelectorAll('a[href*=".html"]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('http') && !href.startsWith('//')) {
      // Update href to remove .html
      const cleanHref = href.replace(/\.html/g, '');
      link.setAttribute('href', cleanHref);
    }
  });
});

// Also run on full page load
window.addEventListener('load', function() {
  if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace(/\.html$/, '');
    const newUrl = newPath + window.location.search + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
  if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace(/\.html$/, '');
    const newUrl = newPath + window.location.search + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }
});
