document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // CONTACT FORM HANDLING
    // =========================
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.action = 'https://formspree.io/f/movzqlvj';
        contactForm.method = 'POST';

        // Feedback element
        const feedback = document.createElement('div');
        feedback.className = 'form-feedback';
        contactForm.appendChild(feedback);

        function showFeedback(message, type) {
            feedback.textContent = message;
            feedback.style.color = type === 'success' ? 'green' : 'red';
        }

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                fetch(contactForm.action, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        showFeedback(`Thank you, ${name}! Your message has been sent.`, 'success');
                        contactForm.reset();
                    } else {
                        return response.json().then(data => {
                            const err = (data && data.error) ? data.error : 'There was a problem sending your message.';
                            throw new Error(err);
                        });
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    showFeedback('Sorry, there was an error sending your message. Please try again later.', 'error');
                });
            } else {
                showFeedback('Please fill in all fields.', 'error');
            }
        });
    }

    // =========================
    // SMOOTH SCROLLING
    // =========================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // =========================
    // SCROLL-TO-TOP BUTTON
    // =========================
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = "↑";
    scrollBtn.id = "scrollTopBtn";
    scrollBtn.style.position = "fixed";
    scrollBtn.style.bottom = "20px";
    scrollBtn.style.right = "20px";
    scrollBtn.style.display = "none";
    scrollBtn.style.padding = "10px 15px";
    scrollBtn.style.borderRadius = "50%";
    scrollBtn.style.border = "none";
    scrollBtn.style.background = "#4a148c";
    scrollBtn.style.color = "#fff";
    scrollBtn.style.cursor = "pointer";
    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================
    // REVEAL ANIMATIONS
    // =========================
    const revealElements = document.querySelectorAll('.reveal');
    function revealOnScroll() {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // run once on load

    // =========================
    // MOBILE MENU TOGGLE
    // =========================
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // =========================
    // LAZY LOADING IMAGES
    // =========================
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imgObserver.observe(img));
});