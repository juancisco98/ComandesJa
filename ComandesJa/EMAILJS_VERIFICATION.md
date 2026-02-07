# EmailJS Verification Guide

## 🎯 Objetivo
Verificar que EmailJS está correctamente configurado y funcionando para enviar notificaciones de registro.

## 📋 Checklist de Verificación

### 1. Verificar Dashboard de EmailJS

1. Ve a: https://dashboard.emailjs.com/admin
2. Inicia sesión con tu cuenta

#### Verificar Service (Gmail)
- [ ] Ve a "Email Services"
- [ ] Busca el servicio con ID: `service_bjbdp1i`
- [ ] Verifica que el estado sea **"Connected"** (verde)
- [ ] Verifica que esté conectado a `juan.sada98@gmail.com`
- [ ] Si no está conectado, haz clic en "Connect Account" y autoriza Gmail

#### Verificar Template
- [ ] Ve a "Email Templates"
- [ ] Busca el template con ID: `template_t9fswcf`
- [ ] Verifica que exista y esté activo
- [ ] Haz clic en el template para editarlo

#### Verificar Campos del Template
El template DEBE tener estos campos exactos (case-sensitive):

```
{{business_name}}
{{owner_name}}
{{category}}
{{email}}
{{phone}}
{{plan}}
{{to_email}}
```

**Configuración del Template:**
- **To Email**: `{{to_email}}` (esto permite enviar dinámicamente)
- **From Name**: `ComandesJA`
- **Subject**: `🎉 Nueva Solicitud: {{business_name}}`
- **Content**: Debe incluir todos los campos listados arriba

#### Verificar Public Key
- [ ] Ve a "Account" → "General"
- [ ] Verifica que la Public Key sea: `rfQWl-IXF8p7I4REu`
- [ ] Si es diferente, actualiza el código en `RegistrationModal.tsx`

### 2. Probar el Formulario

1. Abre la aplicación: http://localhost:5173
2. Abre DevTools (F12) → Console
3. Haz clic en "Registra tu Local"
4. Llena el formulario con datos de prueba:
   ```
   Nombre del Dueño: Test Owner
   Nombre del Local: Test Business
   Categoría: Restaurante
   Teléfono: 600000000
   Email: test@test.com
   Plan: Plan Mensual
   ```
5. Haz clic en "Enviar Solicitud"

### 3. Revisar Console Logs

Deberías ver estos mensajes en la consola:

✅ **Si funciona correctamente:**
```
📧 EmailJS Configuration: { serviceId: 'service_bjbdp1i', ... }
📤 Sending email with params: { business_name: 'Test Business', ... }
✅ Email sent successfully! { status: 200, text: 'OK' }
📬 Email should arrive at: juan.sada98@gmail.com
```

❌ **Si hay error:**
```
❌ EmailJS Error: [error object]
📋 Full error details: { message: '...', status: ... }
🔍 Troubleshooting steps: ...
```

### 4. Verificar Email Recibido

- [ ] Revisa la bandeja de entrada de `juan.sada98@gmail.com`
- [ ] Revisa la carpeta de Spam/Correo no deseado
- [ ] El email debe llegar en menos de 1 minuto

### 5. Verificar Logs de EmailJS

1. Ve a: https://dashboard.emailjs.com/admin/logs
2. Busca el email más reciente
3. Verifica el estado:
   - ✅ **Success**: El email se envió correctamente
   - ❌ **Failed**: Revisa el mensaje de error

## 🔧 Solución de Problemas Comunes

### Error: "Invalid public key"
**Solución**: 
1. Ve a Account → General en EmailJS
2. Copia la Public Key correcta
3. Actualiza `EMAILJS_PUBLIC_KEY` en `RegistrationModal.tsx`

### Error: "Template not found"
**Solución**:
1. Ve a Email Templates en EmailJS
2. Verifica que el template `template_t9fswcf` exista
3. Si no existe, créalo con los campos correctos
4. Actualiza `EMAILJS_TEMPLATE_ID` en el código

### Error: "Service not found"
**Solución**:
1. Ve a Email Services en EmailJS
2. Verifica que el servicio `service_bjbdp1i` exista
3. Reconecta Gmail si es necesario
4. Actualiza `EMAILJS_SERVICE_ID` en el código

### Email no llega pero no hay errores
**Posibles causas**:
1. **Filtro de spam**: Revisa la carpeta de spam
2. **Template mal configurado**: Verifica que el campo `To Email` sea `{{to_email}}`
3. **Límite de emails**: Verifica que no hayas excedido 200 emails/mes
4. **Cuenta de Gmail desconectada**: Reconecta en Email Services

### Error: "The public key is required"
**Solución**:
Verifica que la línea `emailjs.init('rfQWl-IXF8p7I4REu');` esté presente en la línea 8 de `RegistrationModal.tsx`

## 📊 Límites del Plan Gratuito

EmailJS Free Tier:
- ✅ 200 emails/mes
- ✅ 2 email services
- ✅ 2 email templates
- ✅ Soporte básico

Si necesitas más, considera actualizar a un plan de pago.

## 🎯 Próximos Pasos

Una vez que EmailJS funcione correctamente:
1. [ ] Documentar las credenciales en un lugar seguro
2. [ ] Considerar mover las credenciales a variables de entorno
3. [ ] Implementar rate limiting en el frontend
4. [ ] Agregar confirmación visual mejorada al usuario
