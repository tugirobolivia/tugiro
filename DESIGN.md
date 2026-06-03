# DESIGN.md — Design System Lock

## Objetivo visual
La interfaz debe replicar los mockups proporcionados. El estilo visual debe mantenerse consistente en todas las pantallas.

## Personalidad visual
- Moderna
- Limpia
- Profesional
- Con jerarquía clara
- Sin adornos innecesarios
- No usar estilo genérico si el mockup muestra una identidad concreta

## Tokens de diseño

### Colores
Extraer colores directamente del mockup cuando sea posible.

- Background principal: usar el color dominante del mockup.
- Surface/Card: usar el color de tarjetas o paneles del mockup.
- Texto principal: color del texto más importante.
- Texto secundario: color del texto de apoyo.
- Borde: color de líneas/divisores.
- Acción primaria: color del botón principal.
- Acción secundaria: color de botones secundarios o estados hover.

### Tipografía
- Identificar si el mockup usa fuente geométrica, humanista, grotesca o similar.
- Si no se conoce la fuente exacta, elegir la fuente web más cercana.
- Mantener pesos, tamaños y line-height según jerarquía visual.

### Espaciado
Usar escala consistente:
- 4px
- 8px
- 12px
- 16px
- 24px
- 32px
- 48px
- 64px

No usar espacios aleatorios.

### Bordes y radios
- Medir visualmente el radio de cards, inputs y botones.
- Mantener el mismo radio en componentes equivalentes.

### Sombras
- Usar sombras solo si existen en el mockup.
- No agregar glow, blur, glassmorphism o degradados si no están en la referencia.

### Iconografía
- Usar íconos equivalentes al mockup.
- Mantener tamaño, grosor y posición.
- No cambiar el significado visual del ícono.

## Regla de consistencia
Si una pantalla ya definió un patrón visual, las nuevas pantallas deben reutilizarlo.

## Actualización 2026-06-03
- El mockup financiero del hero debe conservarse en móvil, apilado debajo del contenido y sin overflow horizontal.
- Las referencias de alcance global deben usar `+100` / `más de 100 países`.
- El footer debe comunicar copyright desde 2026.
- La sección "El equipo" en Nosotros debe usar fotografías reales dentro de las tarjetas existentes, manteniendo cards blancas, borde sutil, radio amplio y jerarquía actual.
- Todo CTA textual "Abrir cuenta" debe dirigir al formulario de apertura: `https://forms.gle/eRLY9yRAp9YX1Z5z8`.

## Actualización legal 2026-06-03
- Los enlaces "Términos y condiciones" y "Política de privacidad" deben abrir una ventana emergente simple con texto legal plano.
- No se agrega diseño visual elaborado a estos modales; solo estructura mínima de lectura y cierre.
- Los modales legales deben verse profesionales y ser legibles en móvil: ancho máximo desktop, altura con scroll interno, backdrop discreto, botón de cierre claro y padding reducido en pantallas pequeñas.
