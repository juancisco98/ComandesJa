
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zmysummtxziqsfmpzkiq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpteXN1bW10eHppcXNmbXB6a2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzQ2NDAsImV4cCI6MjA4NTY1MDY0MH0.jwg7BaQg8o8cWsKsOQd6gCowzH5xG7kTZR6nZ6Tphno';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testRegistration() {
    const email = 'juan.sada98@gmail.com'; // User's email from screenshot
    const password = 'testpassword123';

    console.log(`Attempting to register ${email}...`);

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name: 'Test Script User',
                role: 'CUSTOMER'
            }
        }
    });

    if (error) {
        console.error('Registration Error:', error.message);
        console.error('Full Error:', error);
    } else {
        console.log('Registration Successful!');
        console.log('User:', data.user);

        // Check if confirmation is required
        if (data.user && data.user.identities && data.user.identities.length === 0) {
            console.log('WARNING: User created but no identity linked. This usually means the user already exists.');
        } else if (data.session === null) {
            console.log('WARNING: Session is null. Email confirmation might be required.');
        }
    }
}

testRegistration();
