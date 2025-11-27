/* ========================================
   URL REDIRECT HANDLER
   Remove .html from URL bar
   ======================================== */

(function removeHtmlExtension() {
  // Check if URL contains .html
  const currentUrl = window.location.href;
  
  if (currentUrl.includes('.html')) {
    // Remove .html extension from URL
    const newUrl = currentUrl.replace(/\.html$/, '');
    
    // Replace URL without reloading page
    window.history.replaceState(null, '', newUrl);
  }
  
  // Handle all internal links to remove .html
  document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href*=".html"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal links
        if (href && !href.startsWith('http') && !href.startsWith('//')) {
          e.preventDefault();
          
          // Remove .html from href
          const cleanHref = href.replace(/\.html$/, '');
          
          // Update URL without page reload
          window.history.pushState(null, '', cleanHref);
          
          // Load the page content
          window.location.href = href;
        }
      });
    });
  });
})();

// Remove .html from URL on page load
window.addEventListener('load', function() {
  if (window.location.pathname.endsWith('.html')) {
    const newPath = window.location.pathname.replace(/\.html$/, '');
    window.history.replaceState(null, '', newPath + window.location.search + window.location.hash);
  }
});
