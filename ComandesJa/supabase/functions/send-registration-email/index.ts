import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Registration {
    id: string
    owner_name: string
    business_name: string
    category: string
    email: string
    phone: string
    selected_plan: string
    created_at: string
}

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { registration } = await req.json() as { registration: Registration }

        if (!RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY is not set')
        }

        // Format the email HTML
        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .content {
              background: #f9fafb;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .info-row {
              display: flex;
              padding: 12px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .info-label {
              font-weight: 600;
              color: #6b7280;
              width: 140px;
            }
            .info-value {
              color: #111827;
              font-weight: 500;
            }
            .plan-badge {
              display: inline-block;
              background: #10b981;
              color: white;
              padding: 8px 16px;
              border-radius: 20px;
              font-weight: 600;
              margin-top: 10px;
            }
            .footer {
              text-align: center;
              padding: 20px;
              color: #6b7280;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 28px;">🎉 Nueva Solicitud de Registro</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">ComandesJA</p>
          </div>
          <div class="content">
            <h2 style="color: #111827; margin-top: 0;">Información del Negocio</h2>
            
            <div class="info-row">
              <span class="info-label">🏪 Negocio:</span>
              <span class="info-value">${registration.business_name}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">👤 Dueño:</span>
              <span class="info-value">${registration.owner_name}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📂 Categoría:</span>
              <span class="info-value">${registration.category}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📧 Email:</span>
              <span class="info-value">${registration.email}</span>
            </div>
            
            <div class="info-row">
              <span class="info-label">📞 Teléfono:</span>
              <span class="info-value">${registration.phone}</span>
            </div>
            
            <div class="info-row" style="border-bottom: none;">
              <span class="info-label">📅 Fecha:</span>
              <span class="info-value">${new Date(registration.created_at).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}</span>
            </div>
            
            <div style="margin-top: 20px;">
              <strong>Plan Seleccionado:</strong>
              <div class="plan-badge">${registration.selected_plan}</div>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border-left: 4px solid #10b981;">
              <p style="margin: 0; color: #059669; font-weight: 600;">💡 Próximos Pasos:</p>
              <p style="margin: 10px 0 0 0; color: #6b7280;">
                Revisa esta solicitud en el panel de administración y contacta al cliente para activar su cuenta.
              </p>
            </div>
          </div>
          <div class="footer">
            <p>Este es un email automático de ComandesJA</p>
            <p style="margin: 5px 0 0 0;">ID de registro: ${registration.id}</p>
          </div>
        </body>
      </html>
    `

        // Send email via Resend
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'ComandesJA <onboarding@resend.dev>',
                to: ['juan.sada98@gmail.com'],
                subject: `🎉 Nueva Solicitud: ${registration.business_name} (${registration.category})`,
                html: emailHtml
            })
        })

        const data = await res.json()

        if (!res.ok) {
            throw new Error(`Resend API error: ${JSON.stringify(data)}`)
        }

        return new Response(
            JSON.stringify({ success: true, data }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200
            }
        )
    } catch (error) {
        console.error('Error sending email:', error)
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            }
        )
    }
})
