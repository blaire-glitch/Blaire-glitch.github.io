# Google Sheets Integration Setup Guide

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Event Attendance - Open Heaven Experience"
3. In the first row, add these headers:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Email`
   - Column D: `Phone`
   - Column E: `Event`
   - Column F: `Event Date`
   - Column G: `Location`

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row with attendance data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.event,
      data.eventDate,
      data.location
    ]);
    
    // Automatically send email notification to band
    MailApp.sendEmail({
      to: 'arisebandke@gmail.com',
      subject: 'New Event Attendance Confirmation - Open Heaven Experience',
      body: `🎉 New Attendance Confirmation Received!\n\n` +
            `EVENT DETAILS:\n` +
            `Event: ${data.event}\n` +
            `Date: ${data.eventDate}\n` +
            `Location: ${data.location}\n\n` +
            `ATTENDEE INFORMATION:\n` +
            `Name: ${data.name}\n` +
            `Email: ${data.email}\n` +
            `Phone: ${data.phone || 'Not provided'}\n\n` +
            `Confirmed at: ${new Date(data.timestamp).toLocaleString()}\n\n` +
            `---\n` +
            `This is an automated notification from your website.`
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Attendance recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → Choose **Web app**
3. Configure settings:
   - **Description**: "Event Attendance API"
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/ABC.../exec`)
6. Click **Done**

## Step 4: Update Your Website

1. Open `index.html` in your code editor
2. Find this line:
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with your actual Web app URL
4. Update the email address if needed:
   ```javascript
   const BAND_EMAIL = 'arisebandke@gmail.com';
   ```

## Step 5: Test the Integration

1. Open your website in a browser
2. Wait for the event popup to appear (or click Learn More on an event)
3. Fill in the attendance form with test data
4. Click "Yes, I'll Attend"
5. Check your Google Sheet - a new row should appear with the data
6. Check your email for the notification

## Troubleshooting

### Data not appearing in Google Sheet?
- Make sure the Web app URL is correct in `index.html`
- Check that the script deployment is set to "Anyone" can access
- Open the browser console (F12) to check for errors

### Email not sending?
- Verify the email address in both `index.html` and the Apps Script
- Check your spam folder
- Make sure the MailApp.sendEmail code is included in the script

### Script permission issues?
- When deploying, you may need to authorize the script
- Click "Review Permissions" and allow access
- Choose your Google account and click "Allow"

## Features

✅ **Automatic Data Collection**: All attendance confirmations are automatically saved to Google Sheets  
✅ **Automatic Email Notifications**: Band receives email for each confirmation automatically (via Apps Script)  
✅ **No User Action Required**: Email is sent in the background without prompting the user  
✅ **Local Storage**: Data is also saved in browser for backup  
✅ **Real-time Updates**: Data appears in sheet immediately after submission  
✅ **Error Handling**: Graceful fallback if Google Sheets is unavailable

## Data Privacy Note

Attendee information is:
- Stored in your private Google Sheet (only you can access)
- Sent to the band's email address
- Stored locally in the user's browser
- Not shared with third parties
