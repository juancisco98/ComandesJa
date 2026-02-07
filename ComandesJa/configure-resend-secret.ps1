# Configure Resend API Key Secret

# This script configures the RESEND_API_KEY secret for the Edge Function

$projectId = "zmysummtxziqsfmpzkiq"
$apiKey = "re_2XSRKEMC_KFJ3uaTET9ppVm`$47443VcJG"

# You need to get your Supabase access token from:
# https://supabase.com/dashboard/account/tokens

$accessToken = Read-Host "Enter your Supabase Access Token"

$headers = @{
    "Authorization" = "Bearer $accessToken"
    "Content-Type" = "application/json"
}

$body = @(
    @{
        name = "RESEND_API_KEY"
        value = $apiKey
    }
) | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.supabase.com/v1/projects/$projectId/secrets" -Method PATCH -Headers $headers -Body "[$body]"
    Write-Host "✅ RESEND_API_KEY configured successfully!" -ForegroundColor Green
    Write-Host $response
} catch {
    Write-Host "❌ Error configuring secret:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
