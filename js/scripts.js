// This file contains JavaScript code for interactivity on the website, including form submissions, animations, and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for the contact form
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            // Simple validation
            if (name && email && message) {
                // Simulate sending the message (you can replace this with actual AJAX call)
                alert(`Thank you, ${name}! Your message has been sent.`);
                contactForm.reset(); // Reset the form fields
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Add smooth scrolling for navigation links
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
});