# Arise Band_KE Website - Project Structure

## Overview
This project has been reorganized into a clean, maintainable folder structure with proper separation of concerns.

## Directory Structure

```
Blaire-glitch.github.io/
│
├── index.html              # Main landing page (root level for GitHub Pages)
├── CNAME                   # Custom domain configuration
├── README.md              # Project documentation
├── PROJECT_STRUCTURE.md   # This file
│
├── pages/                 # All secondary HTML pages
│   ├── band-members.html  # Band members overview
│   ├── dashboard.html     # Dashboard with events
│   ├── social-feed.html   # Social media feeds
│   ├── Event1.html        # Event detail pages
│   ├── Event2.html
│   ├── Event3.html
│   ├── member-irene.html  # Individual member profiles
│   └── member-tracy.html
│
├── assets/                # All media and static resources
│   └── images/           # Image files
│       ├── logo.jpg
│       ├── slide1.jpg, slide2.jpg, slide3.jpg
│       ├── vision.jpg, mission.jpg
│       ├── concert.jpg, outreach.jpg, rehearsal.jpg
│       ├── event1.png, event2.jpg, event3.jpg
│       ├── member1.jpg, member2.jpg, member3.jpg
│       └── qr-placeholder.png
│
├── styles/               # CSS files
│   └── styles.css       # Main stylesheet
│
└── scripts/             # JavaScript files
    └── scripts.js       # Main JavaScript file
```

## File Organization by Type

### HTML Files
- **Root Level**: `index.html` (required by GitHub Pages)
- **Pages Folder**: All other HTML pages organized in `/pages/`

### Assets
- **Images**: `/assets/images/` - All image files (logos, photos, events, etc.)
- **Future**: Can add `/assets/fonts/`, `/assets/videos/` as needed

### Styles
- **CSS**: `/styles/` - All stylesheets

### Scripts
- **JavaScript**: `/scripts/` - All JavaScript files

## Path References

### From Root Files (index.html)
- CSS: `styles/styles.css`
- JS: `scripts/scripts.js`
- Images: `assets/images/filename.jpg`
- Pages: `pages/page-name.html`

### From Pages Folder (pages/*.html)
- CSS: `../styles/styles.css`
- JS: `../scripts/scripts.js`
- Images: `../assets/images/filename.jpg`
- Back to home: `../index.html`

## Benefits of This Structure

1. **Clarity**: Files are organized by type and purpose
2. **Maintainability**: Easy to locate and update specific files
3. **Scalability**: Simple to add new pages, images, or assets
4. **Best Practices**: Follows standard web development conventions
5. **GitHub Pages Compatible**: Root index.html for proper deployment

## Next Steps

1. Ensure all links are working correctly
2. Test the website locally and on GitHub Pages
3. Add more images to `/assets/images/` as needed
4. Keep styles organized in `/styles/styles.css`
5. Add JavaScript functionality in `/scripts/scripts.js`

---

*Last Updated: November 26, 2025*
