# 📧 Email Notification Setup Guide

This guide will help you deploy the email notification system for ComandesJA.

## Prerequisites

- Supabase CLI installed
- Resend.com account (free tier available)
- Access to your Supabase project

## Step 1: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 2: Get Your Resend API Key

1. Go to https://resend.com and sign up (free)
2. Navigate to API Keys section
3. Create a new API key
4. Copy the key (starts with `re_`)

## Step 3: Login and Link Project

```bash
# Login to Supabase
supabase login

# Link to your ComandesJA project
supabase link --project-ref zmysummtxziqsfmpzkiq
```

## Step 4: Configure Secrets

```bash
# Set the Resend API key
supabase secrets set RESEND_API_KEY=re_your_actual_key_here
```

## Step 5: Deploy the Edge Function

```bash
# Deploy the email function
supabase functions deploy send-registration-email
```

## Step 6: Configure Database Settings

You need to set two configuration parameters in your Supabase database:

```sql
-- Set your Supabase URL
ALTER DATABASE postgres SET app.settings.supabase_url = 'https://zmysummtxziqsfmpzkiq.supabase.co';

-- Set your service role key (find this in Supabase Dashboard > Settings > API)
ALTER DATABASE postgres SET app.settings.service_role_key = 'your_service_role_key_here';
```

To run these commands:
1. Go to Supabase Dashboard
2. Navigate to SQL Editor
3. Paste and run the commands above (replace `your_service_role_key_here` with your actual service role key)

## Step 7: Apply Database Migration

```bash
# Apply the migration to update the trigger function
supabase db push
```

## Step 8: Test the System

1. Open your ComandesJA website
2. Click "Registra tu Local"
3. Fill out the registration form with test data
4. Submit the form
5. Check **juan.sada98@gmail.com** for the notification email

## Troubleshooting

### Email not received?

1. **Check Supabase Logs**:
   - Go to Supabase Dashboard > Logs > Edge Functions
   - Look for `send-registration-email` function calls
   - Check for any error messages

2. **Verify Resend API Key**:
   ```bash
   supabase secrets list
   ```
   Should show `RESEND_API_KEY` as set

3. **Check Database Logs**:
   - Go to Supabase Dashboard > Logs > Postgres
   - Look for NOTICE or WARNING messages from `notify_new_registration`

4. **Verify Edge Function is Deployed**:
   - Go to Supabase Dashboard > Edge Functions
   - `send-registration-email` should be listed

### Common Issues

- **"onboarding@resend.dev" not verified**: This is a Resend test email that works for testing. For production, you'll need to verify your own domain.
- **Service role key not set**: Make sure you ran the ALTER DATABASE commands in Step 6
- **pg_net extension error**: The migration should enable this automatically, but you can manually enable it in SQL Editor: `CREATE EXTENSION pg_net;`

## Production Considerations

For production use, you should:

1. **Verify your own domain** in Resend.com
2. **Update the `from` address** in `supabase/functions/send-registration-email/index.ts` to use your verified domain
3. **Redeploy** the Edge Function after making changes

Example:
```typescript
from: 'ComandesJA <notifications@yourdomain.com>',
```

## Need Help?

If you encounter any issues, check:
- Supabase Dashboard > Logs
- Resend Dashboard > Logs
- Browser Console for any frontend errors
