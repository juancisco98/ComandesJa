# Supabase Edge Functions Configuration

This directory contains Supabase Edge Functions for the ComandesJA project.

## Functions

### send-registration-email

Sends email notifications to juan.sada98@gmail.com when a new business registration is submitted.

**Trigger**: Called by database trigger on INSERT to `business_registrations` table

**Environment Variables Required**:
- `RESEND_API_KEY`: API key from Resend.com

## Deployment

To deploy this function to Supabase:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref zmysummtxziqsfmpzkiq

# Set the Resend API key as a secret
supabase secrets set RESEND_API_KEY=re_your_api_key_here

# Deploy the function
supabase functions deploy send-registration-email
```

## Testing Locally

```bash
# Start Supabase functions locally
supabase functions serve send-registration-email

# Test with curl
curl -i --location --request POST 'http://localhost:54321/functions/v1/send-registration-email' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{"registration":{"id":"test-id","owner_name":"Test Owner","business_name":"Test Business","category":"Restaurante","email":"test@example.com","phone":"+34123456789","selected_plan":"Plan Mensual","created_at":"2024-01-01T00:00:00Z"}}'
```

## Integration with Database

The function is called automatically by the database trigger `on_business_registration_created`.

See migration `update_notification_trigger_with_edge_function` for the trigger implementation.
