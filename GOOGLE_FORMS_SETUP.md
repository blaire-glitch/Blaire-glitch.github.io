# Google Forms RSVP Setup Guide

## Overview
Your RSVP forms have been converted to use Google Forms while maintaining the same dark theme styling with cyan and gold accents. The forms are embedded directly in your event pages.

## Step 1: Create Your Google Forms

### For Event 1 - Open Heaven Experience Concert

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form
3. Title: "RSVP - Open Heaven Experience Concert"
4. Add these questions:
   - **Full Name** (Short answer, Required)
   - **Email Address** (Short answer, Required, validate as email)
   - **Phone Number** (Short answer, Optional)
   - **Number of Guests** (Multiple choice: Just Me, 2 People, 3-5 People, 6-10 People, 11+ People)
   - **Transportation** (Multiple choice: Own Transport, Need Transport Info, Carpooling)
   - **Prayer Requests or Special Needs** (Paragraph, Optional)

### For Event 2 - Community Evening of Worship

1. Create a new form
2. Title: "RSVP - Community Evening of Worship"
3. Add these questions:
   - **Full Name** (Short answer, Required)
   - **Email Address** (Short answer, Required, validate as email)
   - **Phone Number** (Short answer, Optional)
   - **Number of Guests** (Multiple choice: Just Me, 2 People, 3 People, 4 People, 5+ People)
   - **Special Requests or Prayer Needs** (Paragraph, Optional)

### For Event 3 - Youth Praise Concert

1. Create a new form
2. Title: "RSVP - Youth Praise Concert"
3. Add these questions:
   - **Full Name** (Short answer, Required)
   - **Age Group** (Multiple choice: 13-17 years, 18-24 years, 25-30 years, 31+ years)
   - **Email Address** (Short answer, Required, validate as email)
   - **Phone Number** (Short answer, Optional)
   - **Church/Youth Group** (Short answer, Optional)
   - **Bringing Friends?** (Multiple choice: Just Me, 2-3 Friends, 4-6 Friends, 7+ Friends, Youth Group)
   - **Want to Showcase Your Talent?** (Paragraph, Optional)
   - **Prayer Requests or Questions** (Paragraph, Optional)

## Step 2: Get Form IDs

For each form:

1. Click **Send** button (top right)
2. Click the **< >** icon (Embed HTML)
3. You'll see code like this:
   ```html
   <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe...YOUR_FORM_ID.../viewform?embedded=true"...
   ```
4. Copy the entire form ID (the part between `/d/e/` and `/viewform`)

Example:
```
https://docs.google.com/forms/d/e/1FAIpQLSe-ABC123XYZ456-DEF789/viewform?embedded=true
                                     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                     This is your Form ID
```

## Step 3: Update Your Event Pages

### Event1.html
1. Open `pages/Event1.html`
2. Find: `YOUR_FORM_ID_HERE` (appears twice)
3. Replace both occurrences with your Event 1 form ID

### Event2.html
1. Open `pages/Event2.html`
2. Find: `YOUR_FORM_ID_HERE` (appears twice)
3. Replace both occurrences with your Event 2 form ID

### Event3.html
1. Open `pages/Event3.html`
2. Find: `YOUR_FORM_ID_HERE` (appears twice)
3. Replace both occurrences with your Event 3 form ID

## Step 4: Configure Form Settings (Optional but Recommended)

For each form:

1. Click on **Settings** (gear icon)
2. **General Tab:**
   - ✅ Limit to 1 response (if you want to prevent duplicate RSVPs)
   - ✅ Collect email addresses
   - ✅ Send respondent a copy of their response
3. **Presentation Tab:**
   - Set confirmation message: "Thank you for your RSVP! We look forward to seeing you at the event. Check your email for confirmation details."
   - ✅ Show progress bar
4. **Responses Tab:**
   - ✅ Get email notifications for new responses (so you're notified immediately)
   - Click **Create Spreadsheet** to automatically save responses to Google Sheets

## Step 5: Set Up Email Notifications (Optional)

To get notified every time someone RSVPs:

1. In your form, go to **Responses** tab
2. Click the three dots menu (⋮) in top right
3. Select **Get email notifications for new responses**
4. Or click **Select response destination** → Choose an existing spreadsheet or create new one

## Features Included

✅ **Same Styling** - Dark theme with cyan/gold accents maintained
✅ **Embedded Forms** - Forms appear directly on your page (no redirects)
✅ **Automatic Data Collection** - All responses saved in Google Sheets
✅ **Email Notifications** - Get notified for each RSVP
✅ **Backup Link** - If form doesn't load, users can open in new tab
✅ **Mobile Responsive** - Forms work perfectly on all devices
✅ **No Third-Party Services** - No Formspree or other services needed
✅ **Free Forever** - Google Forms is completely free

## Advantages Over Previous Setup

1. **Direct Google Integration** - No intermediary services
2. **Automatic Spreadsheet** - Easy to view, sort, and export data
3. **Email Confirmations** - Attendees get automatic confirmation emails
4. **Form Logic** - You can add conditional questions later
5. **File Uploads** - Can add file upload questions if needed
6. **Analytics** - Built-in response analytics and charts

## Troubleshooting

### Form not appearing?
- Make sure you replaced `YOUR_FORM_ID_HERE` with actual form ID
- Check that form sharing is set to "Anyone with the link"
- Try opening form in new tab using the backup link

### Form too tall/short?
- In the HTML, adjust `height="1200"` to a different value (e.g., 1000, 1500)
- Different forms may need different heights

### Want to customize form appearance more?
- In Google Forms, click the palette icon to change colors/theme
- Choose a theme that complements your site (darker colors recommended)

## Example Form ID Replacement

**Before:**
```html
<iframe src="https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/viewform?embedded=true"
```

**After:**
```html
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe-ABC123XYZ456-DEF789/viewform?embedded=true"
```

## Need Help?

If you need assistance:
1. Double-check the form ID is correct (no extra spaces)
2. Verify form sharing settings are public
3. Test the backup "Open in new tab" link
4. Check browser console for any errors (F12)

---

**Note:** The forms maintain your website's styling through the dark card container while the actual Google Form appears in a white iframe for best readability.
