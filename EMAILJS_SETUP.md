# EmailJS Setup Guide - Direct Email Notifications

EmailJS allows you to send emails directly from your website without a backend server. This is the easiest way to receive attendance confirmations.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click **Sign Up** (it's FREE - 200 emails/month on free plan)
3. Sign up with your email or Google account
4. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended if you have Gmail)
   - **Outlook**
   - Or any other email service
4. For Gmail:
   - Click **Connect Account**
   - Sign in with `arisebandke@gmail.com`
   - Grant permissions
5. Click **Create Service**
6. **Copy the Service ID** (looks like: `service_xxxxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Replace the template content with this:

**Template Name:** `event_attendance_notification`

**Subject:**
```
New Event Attendance - {{event_name}}
```

**Content:**
```
🎉 New Attendance Confirmation Received!

EVENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Event: {{event_name}}
Date: {{event_date}}
Location: {{event_location}}

ATTENDEE INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Confirmed at: {{timestamp}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This is an automated notification from your website.
```

**Settings:**
- To Email: `{{to_email}}` (this will be dynamically set to arisebandke@gmail.com)
- From Name: `Arise Band Website`
- Reply To: `{{from_email}}` (attendee's email)

4. Click **Save**
5. **Copy the Template ID** (looks like: `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the dashboard
2. Find the **Public Key** section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxx`)

## Step 5: Update Your Website

Open `index.html` and replace these three values:

### 1. Public Key (around line 676):
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
```
Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key.

### 2. Service ID (around line 698):
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID',  // Replace with your service ID
```
Replace `YOUR_SERVICE_ID` with your service ID from Step 2.

### 3. Template ID (around line 699):
```javascript
  'YOUR_TEMPLATE_ID', // Replace with your template ID
```
Replace `YOUR_TEMPLATE_ID` with your template ID from Step 3.

### Example (with fake IDs):
```javascript
// Initialize EmailJS
emailjs.init('abc123xyz789');

// In sendEmailNotification function
const response = await emailjs.send(
  'service_abc1234',
  'template_xyz5678',
  templateParams
);
```

## Step 6: Test the System

1. Open your website in a browser
2. Wait for the event popup or click Learn More
3. Fill in the attendance form with test data:
   - Name: Test User
   - Email: your.email@example.com
   - Phone: 1234567890
4. Click "Yes, I'll Attend"
5. Check the inbox of `arisebandke@gmail.com`
6. You should receive an email within seconds!

## Troubleshooting

### Email not arriving?

**Check Spam Folder:**
- Sometimes the first emails go to spam
- Mark as "Not Spam" and future emails will arrive in inbox

**Verify EmailJS Dashboard:**
- Go to EmailJS dashboard → **Email History**
- Check if the email shows as "Sent"
- If it shows "Failed", check the error message

**Common Issues:**
- **Invalid Service ID**: Double-check you copied the correct service ID
- **Invalid Template ID**: Make sure template ID matches exactly
- **Public Key Wrong**: Verify the public key is correct
- **Gmail Permissions**: If using Gmail, ensure you granted all permissions

### Testing in EmailJS Dashboard

You can test your template directly:
1. Go to **Email Templates**
2. Click on your template
3. Click **Test It**
4. Fill in sample data
5. Click **Send Test Email**

### Rate Limits

Free plan includes:
- 200 emails per month
- 2 email services
- Unlimited templates

If you need more, upgrade to a paid plan ($7/month for 1,000 emails).

## Security Notes

✅ **Safe to Expose Public Key**: The public key is meant to be in your frontend code  
✅ **No Passwords Needed**: EmailJS handles authentication securely  
✅ **Spam Protection**: EmailJS has built-in rate limiting  
✅ **Email Privacy**: Attendee emails are only used for replies  

## Benefits of EmailJS

✅ **No Backend Required**: Works directly from frontend  
✅ **Instant Setup**: Working in 5 minutes  
✅ **Free Plan Available**: Perfect for small events  
✅ **Reliable Delivery**: Professional email service  
✅ **Detailed Logging**: Track all sent emails in dashboard  

## Alternative: Keep Google Sheets + EmailJS

You can use both systems together:
- **EmailJS**: Sends instant email notifications to the band
- **Google Sheets**: Keeps a record/database of all attendees

Both will work simultaneously when properly configured!

## Need Help?

- EmailJS Documentation: https://www.emailjs.com/docs/
- Email Status: Check EmailJS dashboard → Email History
- Support: support@emailjs.com
