document.addEventListener('DOMContentLoaded', function () {
    // Helper: safe query
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    // Get header height to offset smooth scroll for fixed headers
    const header = $('header');
    function getHeaderOffset() {
        if (!header) return 0;
        const style = getComputedStyle(header);
        // Only apply offset if header is fixed or sticky
        if (['fixed', 'sticky'].includes(style.position)) {
            return header.getBoundingClientRect().height;
        }
        return 0;
    }

    // =========================
    // CONTACT FORM HANDLING
    // =========================
    const contactForm = $('form');
    if (contactForm) {
        contactForm.action = contactForm.action || 'https://formspree.io/f/movzqlvj';
        contactForm.method = 'POST';

        // Accessible feedback area
        let feedback = $('.form-feedback', contactForm);
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'form-feedback';
            feedback.setAttribute('role', 'status');
            feedback.setAttribute('aria-live', 'polite');
            contactForm.appendChild(feedback);
        }

        function showFeedback(message, type = 'info') {
            feedback.textContent = message;
            feedback.dataset.type = type;
        }

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
        }

        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const submitBtn = contactForm.querySelector('[type="submit"]');
            const formData = new FormData(contactForm);
            const name = formData.get('name')?.trim();
            const email = formData.get('email')?.trim();
            const message = formData.get('message')?.trim();

            if (!name || !email || !message) {
                showFeedback('Please fill in all fields.', 'error');
                return;
            }
            if (!validateEmail(email)) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }

            // disable while sending
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.dataset.orig = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
            }

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
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.orig || 'Send';
                    delete submitBtn.dataset.orig;
                }
            });
        });
    }

    // =========================
    // SMOOTH SCROLLING WITH OFFSET
    // =========================
    document.addEventListener('click', function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        const href = link.getAttribute('href');
        if (href === '#' || href === '#0') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const offset = getHeaderOffset();
        const rect = target.getBoundingClientRect();
        const targetY = window.scrollY + rect.top - offset - 10; // small extra gap
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });

        // Close mobile menu if open
        const navMenu = $('#nav-menu');
        if (navMenu && navMenu.classList.contains('open')) navMenu.classList.remove('open');
    });

    // =========================
    // ACTIVE NAV LINK ON SCROLL
    // =========================
    const navLinks = $$('a[href^="#"]').filter(l => l.hash);
    const sections = navLinks
        .map(l => document.getElementById(l.hash.replace('#', '')))
        .filter(Boolean);

    function updateActiveLink() {
        const offset = getHeaderOffset() + 60;
        const fromTop = window.scrollY + offset;
        let current = null;
        for (let i = 0; i < sections.length; i++) {
            const s = sections[i];
            if (s.offsetTop <= fromTop && (s.offsetTop + s.offsetHeight) > fromTop) {
                current = s;
                break;
            }
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', current && link.hash === `#${current.id}`);
        });
    }

    // =========================
    // SCROLL-TO-TOP BUTTON (performant)
    // =========================
    const scrollBtn = $('#scrollTopBtn') || document.createElement('button');
    if (!scrollBtn.id) {
        scrollBtn.textContent = '↑';
        scrollBtn.id = 'scrollTopBtn';
        scrollBtn.className = 'scroll-top-btn';
        scrollBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollBtn);
    }
    // initial styles can be in CSS; toggle class for show/hide

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // =========================
    // REVEAL ANIMATIONS (IntersectionObserver)
    // =========================
    const revealElements = $$('.reveal');
    if (revealElements.length) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // =========================
    // LAZY LOADING IMAGES (IntersectionObserver)
    // =========================
    const lazyImages = $$('img[data-src]');
    if (lazyImages.length) {
        const imgObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const img = entry.target;
                if (img.dataset.src) img.src = img.dataset.src;
                if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                img.onload = () => img.classList.add('loaded');
                img.setAttribute('loading', 'lazy');
                obs.unobserve(img);
            });
        }, { rootMargin: '0px 0px 200px 0px', threshold: 0.01 });
        lazyImages.forEach(img => imgObserver.observe(img));
    }

    // =========================
    // MOBILE MENU TOGGLE & ACCESSIBILITY
    // =========================
    const menuToggle = $('#menu-toggle');
    const navMenu = $('#nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const open = navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(open));
        });

        // Close menu on link click inside nav
        navMenu.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;
            navMenu.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    }

    // =========================
    // PERFORMANT SCROLL HANDLING (rAF)
    // =========================
    let ticking = false;
    function onScrollTick() {
        ticking = false;
        // show/hide scroll button
        const show = window.scrollY > 300;
        scrollBtn.classList.toggle('visible', show);

        // update active link
        updateActiveLink();
    }
    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(onScrollTick);
            ticking = true;
        }
    }, { passive: true });

    // run once
    onScrollTick();
    // ensure reveal initialization run above (IntersectionObserver warmed)

    // =========================
    // SMALL UX ENHANCEMENTS
    // =========================
    // close mobile nav when resizing to desktop widths
    let lastWidth = window.innerWidth;
    window.addEventListener('resize', () => {
        if (window.innerWidth !== lastWidth && window.innerWidth > 900) {
            if (navMenu && navMenu.classList.contains('open')) navMenu.classList.remove('open');
        }
        lastWidth = window.innerWidth;
    }, { passive: true });
});