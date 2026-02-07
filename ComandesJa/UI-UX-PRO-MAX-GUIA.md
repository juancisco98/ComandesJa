# 🎨 UI/UX Pro Max - Guía de Uso

## ✅ Instalación Completada

El skill **UI/UX Pro Max** ha sido instalado exitosamente en tu proyecto ComandesJA para Antigravity.

**Ubicación:** `.agent/skills/ui-ux-pro-max/`

## 🚀 ¿Qué incluye este skill?

- **67 Estilos UI** - Glassmorphism, Claymorphism, Minimalismo, Brutalismo, Neumorfismo, Bento Grid, Dark Mode, etc.
- **96 Paletas de Colores** - Específicas por industria (SaaS, E-commerce, Healthcare, Fintech, Beauty, etc.)
- **57 Combinaciones de Fuentes** - Pares de tipografías curadas con imports de Google Fonts
- **25 Tipos de Gráficos** - Recomendaciones para dashboards y analytics
- **100 Reglas de Razonamiento** - Generación de sistemas de diseño específicos por industria
- **99 Guías UX** - Mejores prácticas, anti-patrones y accesibilidad

## 🎯 Cómo Usar

### Modo Automático (Recomendado)
El skill se activa automáticamente cuando solicitas trabajo de UI/UX. Solo habla naturalmente:

```
"Construye una landing page para mi producto SaaS"
"Crea un dashboard para analytics de salud"
"Diseña un sitio web de portafolio con modo oscuro"
"Haz una UI de app móvil para e-commerce"
```

### Generación de Sistema de Diseño

Para generar un sistema de diseño completo con recomendaciones inteligentes:

```bash
python .agent/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness" --design-system -p "Serenity Spa"
```

Esto genera:
- ✅ Patrón de landing page
- ✅ Estilo UI recomendado
- ✅ Paleta de colores
- ✅ Combinación de tipografías
- ✅ Efectos clave
- ✅ Anti-patrones a evitar
- ✅ Checklist pre-entrega

### Búsquedas por Dominio

```bash
# Buscar estilos
python .agent/skills/ui-ux-pro-max/scripts/search.py "glassmorphism" --domain style

# Buscar tipografías
python .agent/skills/ui-ux-pro-max/scripts/search.py "elegant serif" --domain typography

# Buscar paletas de colores
python .agent/skills/ui-ux-pro-max/scripts/search.py "saas" --domain color

# Buscar patrones de landing
python .agent/skills/ui-ux-pro-max/scripts/search.py "hero social-proof" --domain landing

# Buscar tipos de gráficos
python .agent/skills/ui-ux-pro-max/scripts/search.py "dashboard" --domain chart

# Buscar guías UX
python .agent/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux
```

### Guías por Stack Tecnológico

```bash
# HTML + Tailwind (por defecto)
python .agent/skills/ui-ux-pro-max/scripts/search.py "responsive layout" --stack html-tailwind

# React
python .agent/skills/ui-ux-pro-max/scripts/search.py "form validation" --stack react

# Next.js
python .agent/skills/ui-ux-pro-max/scripts/search.py "routing" --stack nextjs

# Vue
python .agent/skills/ui-ux-pro-max/scripts/search.py "state management" --stack vue
```

**Stacks disponibles:** `html-tailwind`, `react`, `nextjs`, `vue`, `svelte`, `swiftui`, `react-native`, `flutter`, `shadcn`, `jetpack-compose`

## 💾 Persistir Sistema de Diseño

Para guardar el sistema de diseño y reutilizarlo en múltiples sesiones:

```bash
# Crear archivo MASTER.md con el sistema de diseño global
python .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp"

# Crear override específico para una página
python .agent/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard" --design-system --persist -p "MyApp" --page "dashboard"
```

Esto crea:
```
design-system/
├── MASTER.md           # Fuente de verdad global
└── pages/
    └── dashboard.md    # Overrides específicos de página
```

## 📋 Checklist Pre-Entrega

Antes de entregar código UI, verifica:

### ✅ Calidad Visual
- [ ] No usar emojis como iconos (usar SVG: Heroicons/Lucide)
- [ ] Todos los iconos del mismo set
- [ ] Logos de marca correctos (verificar en Simple Icons)
- [ ] Estados hover sin causar layout shift

### ✅ Interacción
- [ ] `cursor-pointer` en todos los elementos clickeables
- [ ] Estados hover con feedback visual claro
- [ ] Transiciones suaves (150-300ms)
- [ ] Estados de focus visibles para navegación por teclado

### ✅ Modo Claro/Oscuro
- [ ] Contraste de texto en modo claro (mínimo 4.5:1)
- [ ] Elementos glass/transparentes visibles en modo claro
- [ ] Bordes visibles en ambos modos
- [ ] Probar ambos modos antes de entregar

### ✅ Layout
- [ ] Elementos flotantes con espaciado adecuado
- [ ] Sin contenido oculto detrás de navbars fijos
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] Sin scroll horizontal en móvil

### ✅ Accesibilidad
- [ ] Todas las imágenes con alt text
- [ ] Inputs de formulario con labels
- [ ] Color no es el único indicador
- [ ] `prefers-reduced-motion` respetado

## 🎨 Reglas Comunes para UI Profesional

### ❌ NO Hacer
- Usar emojis como iconos (🎨 🚀 ⚙️)
- `bg-white/10` en modo claro (muy transparente)
- Usar `#94A3B8` para texto de cuerpo
- Navbar pegado a `top-0 left-0 right-0`
- Transiciones instantáneas o muy lentas (>500ms)

### ✅ SÍ Hacer
- Usar SVG icons (Heroicons, Lucide, Simple Icons)
- `bg-white/80` o mayor opacidad en modo claro
- Usar `#0F172A` (slate-900) para texto
- Navbar flotante con `top-4 left-4 right-4`
- Transiciones de 150-300ms

## 📚 Recursos

- **Documentación completa:** [GitHub](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
- **Archivo SKILL.md:** `.agent/skills/ui-ux-pro-max/SKILL.md`
- **Scripts:** `.agent/skills/ui-ux-pro-max/scripts/`
- **Datos:** `.agent/skills/ui-ux-pro-max/data/`

## 🎯 Ejemplo Completo

```bash
# 1. Generar sistema de diseño
python .agent/skills/ui-ux-pro-max/scripts/search.py "beauty spa wellness elegant" --design-system -p "Serenity Spa"

# 2. Obtener guías UX adicionales
python .agent/skills/ui-ux-pro-max/scripts/search.py "animation accessibility" --domain ux

# 3. Obtener guías del stack
python .agent/skills/ui-ux-pro-max/scripts/search.py "layout responsive" --stack html-tailwind

# 4. Implementar el diseño siguiendo las recomendaciones
```

---

**¡Listo para crear UIs profesionales! 🚀**
