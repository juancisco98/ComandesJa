# Configure Resend API Key via Supabase Management API
# This requires a Supabase access token

$projectRef = "zmysummtxziqsfmpzkiq"
$secretName = "RESEND_API_KEY"
$secretValue = "re_2XSRKEMC_KFJ3uaTET9ppVm`$47443VcJG"

Write-Host "🔐 Configuring Resend API Key Secret" -ForegroundColor Cyan
Write-Host ""
Write-Host "You need to configure this secret manually in the Supabase Dashboard:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open this URL:" -ForegroundColor White
Write-Host "   https://supabase.com/dashboard/project/$projectRef/settings/functions" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Scroll down to the 'Secrets' section" -ForegroundColor White
Write-Host ""
Write-Host "3. Click the 'Add secret' button" -ForegroundColor White
Write-Host ""
Write-Host "4. Enter the following:" -ForegroundColor White
Write-Host "   Name:  $secretName" -ForegroundColor Green
Write-Host "   Value: $secretValue" -ForegroundColor Green
Write-Host ""
Write-Host "5. Click 'Save'" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  IMPORTANT: After saving, wait 10-15 seconds for the Edge Function to restart" -ForegroundColor Yellow
Write-Host ""
Write-Host "Then test again by registering a business!" -ForegroundColor Cyan
Write-Host ""

# Open the browser to the correct page
$url = "https://supabase.com/dashboard/project/$projectRef/settings/functions"
Write-Host "Opening browser..." -ForegroundColor Gray
Start-Process $url
