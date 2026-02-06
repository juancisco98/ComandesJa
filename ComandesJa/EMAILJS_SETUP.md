# EmailJS Setup Guide - ComandesJA

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to: https://www.emailjs.com/
2. Click "Sign Up" (free account)
3. Verify your email

### Step 2: Add Email Service

1. Go to "Email Services" in dashboard
2. Click "Add New Service"
3. Select "Gmail"
4. Click "Connect Account"
5. Sign in with **juan.sada98@gmail.com**
6. Allow EmailJS permissions
7. Copy the **Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Template Name: `new_registration`
4. **Subject**: `🎉 Nueva Solicitud: {{business_name}}`
5. **Content**:

```
Nueva Solicitud de Registro - ComandesJA

🏪 Negocio: {{business_name}}
👤 Dueño: {{owner_name}}
📂 Categoría: {{category}}
📧 Email: {{email}}
📞 Teléfono: {{phone}}
💰 Plan: {{plan}}

---
ComandesJA - Sistema de Gestión
```

6. **To Email**: `{{to_email}}`
7. Click "Save"
8. Copy the **Template ID** (looks like: `template_xyz789`)

### Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find "Public Key"
3. Copy it (looks like: `AbCdEfGhIjKlMnOp`)

### Step 5: Update Code

Open `d:\ComandesJA\ComandesJa\components\RegistrationModal.tsx`

Find these lines (around line 62-64):

```typescript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

Replace with your actual values:

```typescript
const EMAILJS_SERVICE_ID = 'service_abc123';  // Your Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your Template ID
const EMAILJS_PUBLIC_KEY = 'AbCdEfGhIjKlMnOp'; // Your Public Key
```

Save the file.

### Step 6: Test

1. Run your development server: `npm run dev`
2. Open the website
3. Click "Registra tu Local"
4. Fill the form and submit
5. Check **juan.sada98@gmail.com** inbox

## Expected Result

You should receive an email within seconds with all the registration details.

## Troubleshooting

### Email not received?

1. **Check EmailJS Dashboard**:
   - Go to "Logs" section
   - Look for recent email sends
   - Check for errors

2. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for EmailJS errors
   - Common issue: Invalid credentials

3. **Verify Gmail Connection**:
   - Go to Email Services
   - Make sure Gmail is connected
   - Try reconnecting if needed

### Common Errors

- **"Invalid public key"**: Double-check you copied the Public Key correctly
- **"Template not found"**: Verify Template ID is correct
- **"Service not found"**: Verify Service ID is correct

## Free Tier Limits

EmailJS free tier includes:
- ✅ 200 emails/month
- ✅ 2 email services
- ✅ 2 email templates

This is more than enough for your registration notifications!
