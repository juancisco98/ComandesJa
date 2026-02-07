
import { createClient } from '@supabase/supabase-js';

// Hardcoded for testing - normally reading from env
const supabaseUrl = 'https://zmysummtxziqsfmpzkiq.supabase.co';
const supabaseKey = 'sb_publishable_S6V7Bxt4H80kOUQJtD_Nyg_i7aU-Kkt';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
    const timestamp = Date.now();
    // Resend Sandbox only allows sending to the registered email.
    // Using a +alias to treat it as a new user but valid destination.
    const email = `juan.sada98+test${timestamp}@gmail.com`;
    const password = 'TestPassword123!';

    console.log(`\n=== COMMENCING SYSTEM TEST ===`);
    console.log(`Target: ${email}`);

    // 1. Try Registration
    console.log(`\n[1] Attempting Registration...`);
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: 'System Test User',
                role: 'TENANT',
                plan: 'Test Plan'
            }
        }
    });

    if (error) {
        console.error(`[FAIL] Registration failed: ${error.message}`);
        console.error(`Details: ${JSON.stringify(error, null, 2)}`);

        if (error.message.includes("confirmation email")) {
            console.log("\n>>> DIAGNOSIS: Supabase SMTP/Email Limit Reached.");
            console.log("ACTION: User needs to check Supabase Dashboard -> Auth -> Email Settings.");
        }
        // return; // Commented out to check if user exists anyway
    } else {
        console.log(`[SUCCESS] User created! ID: ${data.user?.id}`);
        console.log(`Identity linked: ${data.user?.identities?.length ? 'YES' : 'NO'}`);
    }

    // 2. Check Database Record (Locales)
    // Note: This step would fail in real app if step 1 failed, but checking if partial insert happened (unlikely)

    // 3. Try Login (Should fail if email not confirmed)
    console.log(`\n[2] Attempting Login (Pre-Approval)...`);
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (loginError) {
        console.log(`[EXPECTED] Login failed: ${loginError.message}`);
    } else {
        console.log(`[UNEXPECTED] Login successful! Session active.`);

        // 4. Check Approval Status
        // Mimic AuthContext logic
        const user = loginData.user;
        if (user) {
            console.log(`User Role: ${user.user_metadata.role}`);
            // We can't query locales table easily with RLS unless we are that user or admin
        }
    }
}

runTest();
