// Google Form Embed Handler with Custom Styling
// Replace these URLs with your actual Google Form URLs for each event

const GOOGLE_FORM_URLS = {
    'Event1': 'YOUR_EVENT1_GOOGLE_FORM_URL_HERE',
    'Event2': 'YOUR_EVENT2_GOOGLE_FORM_URL_HERE',
    'Event3': 'YOUR_EVENT3_GOOGLE_FORM_URL_HERE'
};

document.addEventListener('DOMContentLoaded', function() {
    initializeGoogleFormEmbed();
});

function initializeGoogleFormEmbed() {
    const rsvpContainer = document.getElementById('google-form-container');
    if (!rsvpContainer) return;
    
    const eventName = rsvpContainer.dataset.event;
    const formUrl = GOOGLE_FORM_URLS[eventName];
    
    if (!formUrl || formUrl.includes('YOUR_EVENT')) {
        console.log('Google Form URL not configured yet');
        return;
    }
    
    // Convert regular Google Form URL to embed URL
    const embedUrl = formUrl.replace('/viewform', '/viewform?embedded=true');
    
    // Create iframe with custom styling
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl;
    iframe.width = '100%';
    iframe.height = '1200';
    iframe.frameBorder = '0';
    iframe.marginHeight = '0';
    iframe.marginWidth = '0';
    iframe.style.border = 'none';
    iframe.style.maxWidth = '100%';
    
    // Clear container and add iframe
    rsvpContainer.innerHTML = '';
    rsvpContainer.appendChild(iframe);
    
    // Add custom CSS to style the form area
    addCustomFormStyles();
}

function addCustomFormStyles() {
    const style = document.createElement('style');
    style.textContent = `
        #google-form-container {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            border: 2px solid #0dcaf0;
            border-radius: 0.375rem;
            padding: 1.5rem;
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        }
        
        #google-form-container iframe {
            border-radius: 0.25rem;
            background: white;
        }
        
        .form-header {
            color: #0dcaf0;
            font-weight: bold;
            font-size: 1.8rem;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
            margin-bottom: 1rem;
        }
        
        .form-description {
            color: #eaf9ff;
            font-size: 1.1rem;
            margin-bottom: 1.5rem;
        }
    `;
    document.head.appendChild(style);
}

// Fallback: Open Google Form in new tab if embed doesn't work
function openGoogleFormInNewTab(eventName) {
    const formUrl = GOOGLE_FORM_URLS[eventName];
    if (formUrl && !formUrl.includes('YOUR_EVENT')) {
        window.open(formUrl, '_blank');
    }
}
