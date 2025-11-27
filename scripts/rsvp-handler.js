// RSVP Form Handler with Google Sheets Integration
// Update this URL with your Google Apps Script Web App URL
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
const BAND_EMAIL = 'arisebandke@gmail.com';

// Initialize RSVP forms
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForms = document.querySelectorAll('form[action*="formspree"]');
    
    rsvpForms.forEach(form => {
        form.addEventListener('submit', handleRSVPSubmit);
    });
});

async function handleRSVPSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    // Get form data
    const formData = new FormData(form);
    const data = {
        timestamp: new Date().toISOString(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        guests: formData.get('guests') || 'Just Me',
        transport: formData.get('transport') || 'Not specified',
        message: formData.get('message') || 'None',
        event: getEventName(),
        eventDate: getEventDate(),
        location: getEventLocation()
    };
    
    try {
        // Send to Google Sheets
        if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
            await sendToGoogleSheets(data);
            
            // Show success message
            showSuccessMessage(form, 'Thank you! Your RSVP has been confirmed. Check your email for details.');
        } else {
            // Fallback: Send via Formspree (original method)
            await form.submit();
            showSuccessMessage(form, 'Thank you! Your RSVP has been received.');
        }
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('RSVP submission error:', error);
        
        // Try fallback to Formspree
        try {
            form.removeEventListener('submit', handleRSVPSubmit);
            form.submit();
        } catch (fallbackError) {
            showErrorMessage(form, 'Sorry, there was an error submitting your RSVP. Please try again or contact us directly.');
        }
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

async function sendToGoogleSheets(data) {
    const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    // Note: no-cors mode means we can't read the response, but the request will go through
    return response;
}

function getEventName() {
    const heading = document.querySelector('h1');
    return heading ? heading.textContent.trim() : 'Event';
}

function getEventDate() {
    const dateElement = document.querySelector('strong:contains("Date:")');
    if (dateElement && dateElement.nextSibling) {
        return dateElement.nextSibling.textContent.trim();
    }
    
    // Try alternative method
    const allStrong = Array.from(document.querySelectorAll('strong'));
    const dateStrong = allStrong.find(el => el.textContent.includes('Date:'));
    if (dateStrong && dateStrong.parentElement) {
        return dateStrong.parentElement.textContent.replace('Date:', '').trim();
    }
    
    return 'Not specified';
}

function getEventLocation() {
    const venueElement = document.querySelector('strong:contains("Venue:")');
    if (venueElement && venueElement.nextSibling) {
        return venueElement.nextSibling.textContent.trim();
    }
    
    // Try alternative method
    const allStrong = Array.from(document.querySelectorAll('strong'));
    const venueStrong = allStrong.find(el => el.textContent.includes('Venue:'));
    if (venueStrong && venueStrong.parentElement) {
        return venueStrong.parentElement.textContent.replace('Venue:', '').trim();
    }
    
    return 'Not specified';
}

function showSuccessMessage(form, message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.innerHTML = `
        <strong>✓ Success!</strong> ${message}
    `;
    
    form.parentElement.insertBefore(successDiv, form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
    
    // Scroll to message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.innerHTML = `
        <strong>✗ Error!</strong> ${message}
    `;
    
    form.parentElement.insertBefore(errorDiv, form.nextSibling);
    
    // Remove message after 8 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 8000);
    
    // Scroll to message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
