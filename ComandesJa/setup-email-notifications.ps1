# Quick Setup Script for Email Notifications

Write-Host "🚀 ComandesJA Email Notification Setup" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Configure Resend API Key
Write-Host "Step 1: Configure Resend API Key" -ForegroundColor Yellow
Write-Host "You need a Supabase Access Token from: https://supabase.com/dashboard/account/tokens" -ForegroundColor Gray
Write-Host ""

$accessToken = Read-Host "Enter your Supabase Access Token (or press Enter to skip)"

if ($accessToken) {
    $projectId = "zmysummtxziqsfmpzkiq"
    $apiKey = "re_2XSRKEMC_KFJ3uaTET9ppVm`$47443VcJG"
    
    $headers = @{
        "Authorization" = "Bearer $accessToken"
        "Content-Type" = "application/json"
    }
    
    $body = '[{"name":"RESEND_API_KEY","value":"' + $apiKey + '"}]'
    
    try {
        Write-Host "Configuring secret..." -ForegroundColor Gray
        $response = Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/$projectId/secrets" -Method PATCH -Headers $headers -Body $body
        Write-Host "✅ RESEND_API_KEY configured successfully!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Error configuring secret: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Alternative: Configure manually in Supabase Dashboard:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://supabase.com/dashboard/project/zmysummtxziqsfmpzkiq/settings/functions" -ForegroundColor Gray
        Write-Host "2. Add secret: RESEND_API_KEY = re_2XSRKEMC_KFJ3uaTET9ppVm`$47443VcJG" -ForegroundColor Gray
    }
} else {
    Write-Host "⚠️  Skipped. Configure manually in Supabase Dashboard:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://supabase.com/dashboard/project/zmysummtxziqsfmpzkiq/settings/functions" -ForegroundColor Gray
    Write-Host "2. Add secret: RESEND_API_KEY = re_2XSRKEMC_KFJ3uaTET9ppVm`$47443VcJG" -ForegroundColor Gray
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Test the registration form on your website" -ForegroundColor Gray
Write-Host "2. Check juan.sada98@gmail.com for the notification email" -ForegroundColor Gray
Write-Host "3. If no email arrives, check Supabase logs:" -ForegroundColor Gray
Write-Host "   https://supabase.com/dashboard/project/zmysummtxziqsfmpzkiq/logs/edge-functions" -ForegroundColor Gray
