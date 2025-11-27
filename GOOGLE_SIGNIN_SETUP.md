# Google Sign-In Setup Guide for Arise Band Website

## Overview
Google Sign-In has been integrated into the band member login system. This allows authorized band members to sign in using their Google accounts for a seamless authentication experience.

## Setup Instructions

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project: "Arise Band Website"
4. Click "Create"

### Step 2: Enable Google Sign-In API

1. In your project, go to "APIs & Services" → "Library"
2. Search for "Google Identity"
3. Click on "Google+ API" or "Identity Toolkit API"
4. Click "Enable"

### Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. If prompted, configure the OAuth consent screen:
   - User Type: External
   - App name: Arise Band Member Portal
   - User support email: Your band email
   - Developer contact: Your email
   - Add scopes: email, profile
   - Add test users: sam.tracy@ariseband.com, irene.merab@ariseband.com, becky@ariseband.com
4. Choose "Web application" as application type
5. Name: "Arise Band Website"
6. Add Authorized JavaScript origins:
   - `https://blaire-glitch.github.io`
   - `http://localhost` (for testing)
7. Add Authorized redirect URIs:
   - `https://blaire-glitch.github.io/pages/band-members.html`
   - `http://localhost/pages/band-members.html` (for testing)
8. Click "Create"
9. **Copy your Client ID** (looks like: `123456789-abcdefghijk.apps.googleusercontent.com`)

### Step 4: Update Your Website Files

Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` with your actual Client ID in two places:

#### File: `pages/band-members.html`

1. In the `<head>` section (around line 13):
```html
<meta name="google-signin-client_id" content="YOUR_CLIENT_ID_HERE.apps.googleusercontent.com">
```

2. In the login form (around line 262):
```html
<div id="g_id_onload"
     data-client_id="YOUR_CLIENT_ID_HERE.apps.googleusercontent.com"
     data-callback="handleGoogleSignIn"
     data-auto_prompt="false">
</div>
```

### Step 5: Configure Authorized Band Member Emails

Make sure your authorized band members use Gmail accounts or have Google accounts set up with their band emails:

**Current Authorized Members:**
- Sam Tracy: `sam.tracy@ariseband.com`
- Irene Merab: `irene.merab@ariseband.com`
- Becky: `becky@ariseband.com`

**Note:** The Google account email must exactly match the email in the `bandMembers` array for authentication to succeed.

### Step 6: Test the Integration

1. Open your website: `https://blaire-glitch.github.io/pages/band-members.html`
2. Click "Band Member Login"
3. You should see:
   - Email/Password fields
   - "OR" divider
   - Google Sign-In button
4. Click the Google Sign-In button
5. Select an authorized account
6. You should be redirected to the member dashboard

## How It Works

1. **User clicks Google Sign-In button** → Google OAuth popup appears
2. **User selects Google account** → Google returns a JWT token with user info
3. **Website validates token** → Extracts email, name, and profile picture
4. **Email checked against database** → Must match an authorized band member
5. **Access granted** → User redirected to dashboard with role and privileges
6. **Access denied** → If email not in authorized list, login fails

## Security Features

- ✅ Only pre-authorized emails can access the system
- ✅ Google handles password security
- ✅ JWT tokens are validated client-side
- ✅ Profile pictures loaded from Google
- ✅ Same role-based privileges as email/password login

## Troubleshooting

### "Access Denied" message
- Ensure the Google account email exactly matches an authorized band member email
- Check that the email is in the `bandMembers` array in `band-members.html`

### Google Sign-In button not showing
- Check that your Client ID is correctly entered in both places
- Verify that the Google Sign-In library is loading (check browser console)
- Ensure your domain is authorized in Google Cloud Console

### "Unauthorized JavaScript origin" error
- Add your domain to Authorized JavaScript origins in Google Cloud Console
- Include both `http://` and `https://` versions if needed

## Adding New Band Members

To add a new band member with Google Sign-In access:

1. Add them to the `bandMembers` array in `pages/band-members.html`
2. Include their Google account email
3. Set their role and privileges
4. Optionally add them as a test user in Google Cloud Console OAuth consent screen

Example:
```javascript
{
  name: 'New Member',
  email: 'newmember@ariseband.com',  // Must be their Google account email
  password: 'password2025',
  role: 'Vocalist',
  privileges: {
    canManageRehearsals: false,
    canEditSongs: false,
    canManageMembers: false,
    canAccessStudio: true,
    canViewAnalytics: false,
    canScheduleEvents: false,
    canApproveRecordings: false,
    accessLevel: 'member'
  }
}
```

## Production Checklist

Before going live:
- [ ] Replace `YOUR_GOOGLE_CLIENT_ID` with actual Client ID
- [ ] Add production domain to authorized origins
- [ ] Configure OAuth consent screen fully
- [ ] Test with all authorized band member accounts
- [ ] Set up proper error logging
- [ ] Consider adding backend validation for additional security

## Support

For Google Cloud Console issues: [Google Cloud Support](https://cloud.google.com/support)
For website issues: Contact your web developer

---

**Last Updated:** November 27, 2025
**Integrated by:** Arise Band Development Team
