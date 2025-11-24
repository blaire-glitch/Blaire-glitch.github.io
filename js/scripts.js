// This file contains JavaScript code for interactivity on the website, including form submissions, animations, and dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission for the contact form
    const contactForm = document.querySelector('form');
    if (contactForm) {
        // Link the form to Formspree
        contactForm.action = 'https://formspree.io/f/movzqlvj';
        contactForm.method = 'POST';

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Gather form data
            const formData = new FormData(contactForm);
            const name = formData.get('name') || contactForm.querySelector('input[type="text"]')?.value;
            const email = formData.get('email') || contactForm.querySelector('input[type="email"]')?.value;
            const message = formData.get('message') || contactForm.querySelector('textarea')?.value;

            // Simple validation
            if (name && email && message) {
                // Submit to Formspree via fetch (returns JSON when Accept: application/json)
                fetch(contactForm.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        alert(`Thank you, ${name}! Your message has been sent.`);
                        contactForm.reset(); // Reset the form fields
                    } else {
                        return response.json().then(data => {
                            const err = (data && data.error) ? data.error : 'There was a problem sending your message.';
                            throw new Error(err);
                        });
                    }
                })
                .catch(error => {
                    console.error('Form submission error:', error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                });
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