# 🧪 Prueba EmailJS en Producción

## 🌐 URL de Producción
**https://comandes-ja.vercel.app/**

---

## Instrucciones Paso a Paso

### 1. Abre tu Sitio en Producción
1. Abre tu navegador (Chrome, Firefox, Edge, etc.)
2. Ve a: **https://comandes-ja.vercel.app/**

### 2. Abre la Consola del Navegador
- **Windows/Linux**: Presiona `F12` o `Ctrl + Shift + I`
- **Mac**: Presiona `Cmd + Option + I`
- Ve a la pestaña **"Console"**
- Mantén la consola abierta durante toda la prueba

### 3. Limpia la Consola (Opcional)
- Haz clic derecho en la consola
- Selecciona "Clear console" o presiona `Ctrl + L`
- Esto te ayudará a ver solo los logs del registro

### 4. Prueba el Formulario de Registro

1. En la página principal, busca y haz clic en el botón **"Registra tu Local"**
2. Se abrirá un modal con el formulario
3. Llena el formulario con estos **datos de prueba**:

```
Nombre del Dueño: Juan Test
Nombre del Local: Restaurante Test
Categoría: Restaurante
Teléfono: 600123456
Email: test@example.com
Plan: Plan Mensual
```

4. Haz clic en **"Enviar Solicitud"**

### 5. Observa la Consola Inmediatamente

La consola mostrará una serie de logs. **Copia TODO el contenido** de la consola.

---

## 📊 Qué Buscar en la Consola

### ✅ CASO 1: Si TODO funciona correctamente

Deberías ver algo como esto:

```
Registration successful: [Object]
📧 EmailJS Configuration: {serviceId: 'service_bjbdp1i', templateId: 'template_t9fswcf', publicKey: 'rfQWl-IX...'}
📤 Sending email with params: {business_name: 'Restaurante Test', owner_name: 'Juan Test', ...}
✅ Email sent successfully! {status: 200, text: 'OK'}
📬 Email should arrive at: juan.sada98@gmail.com
```

**Si ves esto:**
1. ✅ El sistema está funcionando
2. ✅ El email fue enviado
3. ✅ Revisa tu bandeja de entrada en `juan.sada98@gmail.com`
4. ✅ El email debería llegar en menos de 1 minuto

---

### ❌ CASO 2: Si hay un ERROR de EmailJS

Verás algo como esto:

```
Registration successful: [Object]
📧 EmailJS Configuration: {serviceId: 'service_bjbdp1i', ...}
📤 Sending email with params: {business_name: 'Restaurante Test', ...}
❌ EmailJS Error: Error: ...
📋 Full error details: {
  message: "The public key is required",
  text: "...",
  status: 400,
  name: "Error"
}
🔍 Troubleshooting steps:
1. Check EmailJS Dashboard: https://dashboard.emailjs.com/admin
2. Verify Service ID is active
3. Verify Template ID exists
4. Check template parameters match: (7) ['business_name', 'owner_name', ...]
```

**Si ves esto:**
1. ❌ Hay un error en la configuración de EmailJS
2. 📋 Copia el mensaje de error completo
3. 🔍 Sigue los pasos de troubleshooting que aparecen

---

### 🔴 CASO 3: Si NO aparece NADA relacionado con EmailJS

Si solo ves:
```
Registration successful: [Object]
```

Y NO ves los logs de EmailJS (`📧`, `📤`, `✅` o `❌`), significa que:
- ❌ El código de EmailJS no se está ejecutando
- ❌ Puede haber un error de JavaScript que detiene la ejecución
- 🔍 Busca errores en rojo en la consola

---

## 📝 Qué Hacer Después de la Prueba

### Si funcionó (✅):
1. Revisa tu email `juan.sada98@gmail.com`
2. Confirma que recibiste el email
3. ¡Listo! El sistema está funcionando

### Si hubo error (❌):
1. **Copia TODO el contenido de la consola** (incluyendo los errores)
2. **Toma una captura de pantalla** de la consola
3. Comparte:
   - El error completo de la consola
   - La captura de pantalla
   - Qué mensaje apareció en el modal (¿éxito o error?)

### Si no aparecieron logs de EmailJS (🔴):
1. **Busca errores en rojo** en la consola
2. **Copia esos errores**
3. Puede ser un problema de build o deployment en Vercel

---

## 🔍 Verificación Adicional en EmailJS Dashboard

Independientemente del resultado, también puedes verificar en EmailJS:

1. Ve a: **https://dashboard.emailjs.com/admin/logs**
2. Inicia sesión con tu cuenta
3. Busca el email más reciente
4. Verifica:
   - ✅ **Success** (verde): El email se envió
   - ❌ **Failed** (rojo): Hubo un error (haz clic para ver detalles)

---

## 🎯 Próximos Pasos

Una vez que hayas probado, comparte:
1. ✅ ¿Funcionó? ¿Recibiste el email?
2. ❌ ¿Hubo error? ¿Cuál fue el mensaje?
3. 📋 El contenido completo de la consola

Con esa información podré ayudarte a resolver cualquier problema que encuentres.

---

## 💡 Notas Importantes

- El formulario guarda los datos en Supabase **independientemente** de si el email funciona
- Si el email falla, el registro NO falla (esto es intencional)
- Los emails pueden tardar hasta 1 minuto en llegar
- Revisa también la carpeta de **Spam/Correo no deseado**
- Plan gratuito de EmailJS: 200 emails/mes
