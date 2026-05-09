/* ========================================
   NEWSLETTER - Arise Band_KE
   Mailchimp/Brevo subscription handler
   ======================================== */

(function initNewsletter() {
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.arise-newsletter-form').forEach(form => {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const btn = form.querySelector('button[type="submit"]');
        const feedback = form.querySelector('.newsletter-feedback');
        const email = emailInput ? emailInput.value.trim() : '';

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          if (feedback) {
            feedback.textContent = 'Please enter a valid email address.';
            feedback.className = 'newsletter-feedback text-danger small mt-2';
          }
          return;
        }

        // Save locally as fallback
        const subs = JSON.parse(localStorage.getItem('ariseNewsletter') || '[]');
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem('ariseNewsletter', JSON.stringify(subs));
        }

        // Send via WhatsApp notification to band (fallback until Mailchimp set up)
        const msg = encodeURIComponent(`📧 New Newsletter Subscriber!\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`);
        // Only open WhatsApp on submit once to avoid spam
        // window.open(`https://wa.me/254722104985?text=${msg}`, '_blank');

        if (btn) {
          btn.disabled = true;
          btn.textContent = '✓ Subscribed!';
          btn.classList.replace('btn-info', 'btn-success');
        }
        if (feedback) {
          feedback.textContent = 'Thank you! You\'ll receive our updates soon. 🎵';
          feedback.className = 'newsletter-feedback text-success small mt-2';
        }
        if (emailInput) emailInput.value = '';

        setTimeout(() => {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'Subscribe';
            btn.classList.replace('btn-success', 'btn-info');
          }
        }, 5000);
      });
    });
  });
})();
