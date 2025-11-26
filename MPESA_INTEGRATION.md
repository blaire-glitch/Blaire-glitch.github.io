# M-Pesa Payment Integration Guide

## Overview
This guide explains the M-Pesa STK Push integration implemented in the pledge section of the Arise Band KE website. Users can make pledges by entering an amount and phone number, then completing payment directly from their phone.

---

## Features Implemented

### 1. **Quick Pledge Form**
- **Location:** Main page pledge section
- **Fields:**
  - `pledgeAmount` - Amount in KES (required, min: 1)
  - `pledgePhone` - Phone number in 07XXXXXXXX format (required)
  - `pledgeNote` - Optional note/message
- **Button:** "Prepare M-Pesa Payment" opens the payment modal

### 2. **4-Step Payment Modal**

#### **Step 1: Payment Confirmation**
- Shows payment summary (amount, phone, note)
- Payment will be sent to M-Pesa number: **0790190578**
- M-Pesa logo animation
- Information alert about STK Push
- "Send Payment Prompt" button

#### **Step 2: Processing**
- Spinner animation
- Phone vibrate icon with shake animation
- Instructions to check phone for prompt
- Shows the phone number receiving the prompt

#### **Step 3: Success**
- Green checkmark with pop animation
- Transaction ID display
- Receipt box with payment details
- SMS confirmation notice

#### **Step 4: Error Handling**
- Red X icon with shake animation
- Error message display
- Troubleshooting tips:
  - Insufficient M-Pesa balance
  - Wrong PIN entered
  - Request timeout/cancelled
  - Phone number not registered
- "Try Again" button to restart

---

## Technical Implementation

### Files Modified

1. **index.html**
   - Lines 305-334: Quick Pledge Form
   - Lines 335-437: M-Pesa Payment Modal
   - Lines 618-820: M-Pesa JavaScript logic

2. **styles/components.css**
   - Lines 790-1020: M-Pesa modal styling
   - Animations: pulse, shake, successPop, errorShake

### JavaScript Functions

```javascript
// Main Functions
showMpesaStep(step)           // Controls which modal step is visible
initiateSTKPush()             // Starts the payment process
sendMpesaRequest(details)     // Sends request to backend API
sendPledgeNotification()      // Notifies band via EmailJS
```

### Phone Number Formatting
The system automatically formats phone numbers to Safaricom's required format:
- Input: `0712345678` → Output: `254712345678`
- Input: `+254712345678` → Output: `254712345678`
- Input: `712345678` → Output: `254712345678`

---

## Current Status: DEMO MODE

⚠️ **Important:** The current implementation uses **simulated payments** for testing.

### What Works Now:
- ✅ Form validation
- ✅ Modal step transitions
- ✅ Payment confirmation UI
- ✅ Success/error states
- ✅ Transaction ID generation
- ✅ EmailJS notification to band

### What's Simulated:
- ❌ Actual STK Push to phone (80% success rate for demo)
- ❌ Real M-Pesa API integration
- ❌ Payment status verification

---

## Production Setup Required

To enable **real M-Pesa payments**, you need:

### 1. **Safaricom Daraja API Credentials**

#### Sign up for Daraja API:
1. Go to https://developer.safaricom.co.ke
2. Create an account
3. Create a new app
4. Get your credentials:
   - Consumer Key
   - Consumer Secret
   - Passkey
   - Business Shortcode

#### Choose Your Environment:
- **Sandbox** (Testing): `https://sandbox.safaricom.co.ke`
- **Production** (Live): `https://api.safaricom.co.ke`

### 2. **Backend API Setup**

⚠️ **Critical:** M-Pesa API **cannot** be called directly from the browser due to:
- CORS restrictions
- Security concerns (exposing API keys)
- Need for server-side OAuth token management

#### You Need a Backend Server That:
1. Generates OAuth tokens
2. Initiates STK Push requests
3. Handles callback responses
4. Verifies payment status

#### Backend Options:
- **Node.js/Express** (Recommended)
- **Python/Flask or Django**
- **PHP**
- **Serverless Functions** (AWS Lambda, Azure Functions, Vercel)

### 3. **Backend API Endpoints Needed**

Your backend should provide these endpoints:

```
POST /api/mpesa/stkpush
- Initiates STK Push to user's phone
- Request body: { phone, amount, accountReference, transactionDesc }
- Returns: { CheckoutRequestID, ResponseCode, ResponseDescription }

GET /api/mpesa/query/:checkoutRequestId
- Checks payment status
- Returns: { ResultCode, ResultDesc, TransactionID }
```

### 4. **Update Frontend Configuration**

In `index.html` around line 625, update:

```javascript
// M-Pesa Configuration
const MPESA_API_URL = 'https://your-backend-domain.com/api/mpesa'; // YOUR BACKEND URL
const MPESA_BUSINESS_SHORTCODE = '174379'; // YOUR ACTUAL PAYBILL/TILL NUMBER
```

### 5. **Uncomment Production Code**

In `index.html` around line 770, replace the simulated code with:

```javascript
async function sendMpesaRequest(details) {
  try {
    const response = await fetch(MPESA_API_URL + '/stkpush', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: details.phone,
        amount: details.amount,
        accountReference: 'PLEDGE',
        transactionDesc: details.note
      })
    });
    
    const data = await response.json();
    
    if (data.ResponseCode === '0') {
      // Start polling for payment status
      const checkoutRequestId = data.CheckoutRequestID;
      return await pollPaymentStatus(checkoutRequestId);
    } else {
      return {
        success: false,
        message: data.ResponseDescription || 'Payment request failed'
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

async function pollPaymentStatus(checkoutRequestId) {
  // Poll every 2 seconds for up to 30 seconds
  for (let i = 0; i < 15; i++) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const response = await fetch(`${MPESA_API_URL}/query/${checkoutRequestId}`);
    const data = await response.json();
    
    if (data.ResultCode === '0') {
      return {
        success: true,
        transactionId: data.TransactionID,
        message: 'Payment completed successfully'
      };
    } else if (data.ResultCode === '1032') {
      return {
        success: false,
        message: 'Payment cancelled by user'
      };
    } else if (data.ResultCode === '1') {
      return {
        success: false,
        message: 'Insufficient balance'
      };
    }
  }
  
  return {
    success: false,
    message: 'Payment timeout. Please try again.'
  };
}
```

---

## Testing Guide

### Demo Mode Testing (Current):
1. Open the website
2. Scroll to the pledge section
3. Enter any amount (e.g., 100)
4. Enter phone number (e.g., 0712345678)
5. Click "Prepare M-Pesa Payment"
6. Click "Send Payment Prompt"
7. Wait 3 seconds - you'll see success (80% chance) or error (20% chance)

### Production Testing Checklist:
- [ ] Backend API is deployed and accessible
- [ ] Daraja API credentials configured
- [ ] Test in Sandbox environment first
- [ ] Try successful payment (with balance)
- [ ] Try cancelled payment (cancel prompt)
- [ ] Try insufficient balance scenario
- [ ] Try wrong PIN (3 attempts)
- [ ] Verify transaction IDs are unique
- [ ] Check EmailJS notifications arrive
- [ ] Test on mobile device (actual STK Push)

---

## Backend Reference Code

### Node.js/Express Example

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// M-Pesa Configuration
const CONSUMER_KEY = 'your_consumer_key';
const CONSUMER_SECRET = 'your_consumer_secret';
const PASSKEY = 'your_passkey';
const SHORTCODE = '174379';
const CALLBACK_URL = 'https://your-domain.com/api/mpesa/callback';

// Generate OAuth Token
async function getAccessToken() {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  const response = await axios.get(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
}

// STK Push Endpoint
app.post('/api/mpesa/stkpush', async (req, res) => {
  try {
    const { phone, amount, accountReference, transactionDesc } = req.body;
    const token = await getAccessToken();
    
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
    
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Callback Endpoint
app.post('/api/mpesa/callback', (req, res) => {
  console.log('M-Pesa Callback:', JSON.stringify(req.body, null, 2));
  // Store transaction details in database
  res.json({ ResultCode: 0, ResultDesc: 'Success' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

## Security Best Practices

1. **Never expose API credentials in frontend code**
2. **Always use HTTPS for production**
3. **Validate phone numbers server-side**
4. **Verify callback requests are from Safaricom**
5. **Store transaction logs in database**
6. **Implement rate limiting on API endpoints**
7. **Use environment variables for sensitive data**

---

## Payment Flow Diagram

```
User
  ↓ (1) Enters amount & phone
Form Validation
  ↓ (2) Opens modal, shows confirmation
User Clicks "Send Payment Prompt"
  ↓ (3) Frontend → Backend API
Backend
  ↓ (4) Backend → Safaricom Daraja API
Safaricom
  ↓ (5) STK Push → User's Phone
User Enters PIN on Phone
  ↓ (6) Payment processed
Safaricom → Backend (Callback)
  ↓ (7) Backend stores transaction
Backend → Frontend (Status)
  ↓ (8) Show success/error
Frontend displays receipt
```

---

## Troubleshooting

### Common Issues:

**Issue:** "Payment Failed" immediately
- **Cause:** Backend API not configured
- **Solution:** Set up backend server first

**Issue:** Stuck on "Processing Payment..."
- **Cause:** No response from backend
- **Solution:** Check backend logs, verify API endpoint URL

**Issue:** Phone doesn't receive prompt
- **Cause:** Phone number format incorrect or not M-Pesa registered
- **Solution:** Ensure number is 254XXXXXXXXX format, confirm M-Pesa registration

**Issue:** Payment succeeds but notification not sent
- **Cause:** EmailJS template configuration
- **Solution:** See EMAILJS_FIX.md

---

## Support Resources

- **Safaricom Daraja API Docs:** https://developer.safaricom.co.ke/Documentation
- **M-Pesa API Reference:** https://developer.safaricom.co.ke/APIs/MpesaExpressAPI
- **Test Credentials:** Available in Daraja sandbox environment
- **Community:** Daraja API Slack channel

---

## Next Steps

1. ✅ Frontend UI implemented (COMPLETE)
2. ✅ Demo mode working (COMPLETE)
3. ⏳ Set up backend server
4. ⏳ Register for Daraja API
5. ⏳ Test in Sandbox environment
6. ⏳ Go live with production credentials
7. ⏳ Monitor transactions and logs

---

## Contact
For questions about this integration, contact the Arise Band KE team at arisebandke@gmail.com
