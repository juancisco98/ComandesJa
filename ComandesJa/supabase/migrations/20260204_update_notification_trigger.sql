-- Migration: Update notify_new_registration to call Edge Function
-- Description: Updates the database trigger function to call the send-registration-email Edge Function
-- This enables automatic email notifications when new business registrations are created

-- First, enable the pg_net extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Update the notify_new_registration function to call the Edge Function
CREATE OR REPLACE FUNCTION public.notify_new_registration()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  request_id bigint;
  payload jsonb;
  function_url text;
  service_role_key text;
BEGIN
  -- Get the service role key from vault (you'll need to set this)
  -- For now, we'll use a placeholder that needs to be configured
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- Build the Edge Function URL
  function_url := current_setting('app.settings.supabase_url', true) || '/functions/v1/send-registration-email';
  
  -- Prepare the payload with registration data
  payload := jsonb_build_object(
    'registration', jsonb_build_object(
      'id', NEW.id,
      'owner_name', NEW.owner_name,
      'business_name', NEW.business_name,
      'category', NEW.category,
      'email', NEW.email,
      'phone', NEW.phone,
      'selected_plan', NEW.selected_plan,
      'created_at', NEW.created_at
    )
  );
  
  -- Call the Edge Function via pg_net (async, non-blocking)
  IF service_role_key IS NOT NULL AND function_url IS NOT NULL THEN
    SELECT net.http_post(
      url := function_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_role_key
      ),
      body := payload
    ) INTO request_id;
    
    RAISE NOTICE 'Email notification queued for registration: % (request_id: %)', 
      NEW.business_name, 
      request_id;
  ELSE
    RAISE WARNING 'Edge Function not configured. Email not sent for registration: %', NEW.business_name;
  END IF;
  
  RETURN NEW;
END;
$function$;

-- Verify the trigger is still in place (it should be from previous migration)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_business_registration_created'
  ) THEN
    CREATE TRIGGER on_business_registration_created
      AFTER INSERT ON business_registrations
      FOR EACH ROW
      EXECUTE FUNCTION notify_new_registration();
  END IF;
END $$;
