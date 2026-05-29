# MOCKUP_SPEC — TuGiro Bolivia Landing Page

## 1. Viewport aproximado
- Desktop: ~1280–1440px de ancho
- Diseño de columnas de 12 o flexible con max-width ~1200px

---

## 2. Estructura general
```
Navbar (sticky, fondo blanco)
Hero (2 columnas: contenido izq + dashboard visual der)
  └─ floating card "Transferencia encriptada"
Features Bar (3 items centrados)
Stats Bar (card con borde, icono building + 4 stats)
Services (layout 2 cols: intro izq + 3 cards der)
Virtual Accounts (2 cols: texto izq + app mockup der)
Speed / Destinations (2 cols: texto izq + mapa + 4 dest-cards der)
Compliance (dark bg: escudo izq + checks + nota seguridad)
Testimonials (2 cols: título+flechas izq + 2 cards der)
CTA Banner (full-width purple gradient)
Partners (centered, carousel de logos)
Footer (5 cols en dark bg)
```

---

## 3. Secciones principales

| Sección | Descripción |
|---|---|
| Navbar | Logo izq, links centro, btn CTA der |
| Hero | H1 giant + 2 CTAs | Dashboard con datos bancarios |
| Features Bar | 3 iconos con texto |
| Stats | 1 card horizontal: building icon + 4 métricas + dividers |
| Services | Tag + H2 + descripción | 3 cards (importadores, exportadores, personas) |
| Virtual Accounts | Checklist izq + App dashboard mockup der |
| Speed | Texto + link orange izq | Mapa + 4 dest-cards |
| Compliance | Dark bg | Escudo SVG + lista 2 col + card de texto |
| Testimonials | Label + H2 + flechas izq | 2 testimonial cards der |
| CTA Banner | Purple gradient | H2 + texto + 2 botones |
| Partners | Icono handshake + título + desc + carousel arrows |
| Footer | TUGIRO Bolivia + socials | 4 cols de links | bottom bar |

---

## 4. Colores detectados

| Token | Valor | Uso |
|---|---|---|
| `--purple` | `#3D0FA3` | CTA primario, links activos, bullets |
| `--purple-mid` | `#5B21B6` | Gradientes |
| `--purple-dark` | `#1A0533` | Sidebar app |
| `--purple-deeper` | `#0D0326` | Footer bg, panel dashboard |
| `--orange` | `#FF5500` | Tags, stat numbers, subtítulos de cards, iconos featured |
| `--purple-light` | `#F5F0FF` | Fondos icon, account cards |
| `--text` | `#1A0533` | Texto principal |
| `--text-muted` | `#6B7280` | Texto secundario, labels |
| `--border` | `#E5E7EB` | Bordes de cards |
| Compliance bg | Gradiente oscuro purple-indigo | Sección compliance |
| Stats positive | `#34D399` | Movimientos positivos |
| Stats negative | `#F87171` | Movimientos negativos |

---

## 5. Tipografía

- **Familia**: Outfit (Google Fonts) — usado en todo el sitio
- **Fallback**: sans-serif

| Elemento | Tamaño | Peso |
|---|---|---|
| H1 hero | 34–52px (clamp) | 900 |
| H2 secciones | 26–36px (clamp) | 700 |
| Navbar links | 15px | 500/600 |
| Tags | 11px | 700 |
| Body text | 14–15px | 400 |
| Stat numbers | 22–32px (clamp) | 900 |
| Botones | 15px | 600 |
| Label muted | 10–12px | 400–600 |

---

## 6. Espaciados clave

| Contexto | Valor |
|---|---|
| Section padding vertical | 64–80px |
| Container padding lateral | 24px |
| Gap entre columnas hero | 48px |
| Gap cards services | 20px |
| Navbar height | 72px |
| Hero padding top | 72px |

---

## 7. Radios

| Elemento | Radio |
|---|---|
| Cards generales | 12px |
| Cards grandes / banner | 20–24px |
| Botones (pills) | 50px |
| Tags | 50px |
| Icon boxes | 10–12px |
| Badges (status) | 20px |

---

## 8. Sombras

| Elemento | Sombra |
|---|---|
| Hero dashboard | `drop-shadow(0 20px 40px rgba(61,15,163,0.12))` |
| App mockup | `0 20px 60px rgba(61,15,163,0.15)` |
| CTA encriptada | `0 4px 20px rgba(0,0,0,0.06)` |
| Service cards hover | `0 8px 32px rgba(61,15,163,0.1)` |

---

## 9. Botones

| Tipo | Descripción |
|---|---|
| `btn--primary` | Fondo purple, texto blanco, pill 50px, 12/28px padding |
| `btn--outline` | Borde purple, texto purple, bg transparente |
| `btn--white` | Fondo blanco, texto purple (dentro de banners dark) |
| `btn--outline-white` | Borde blanco semitransparente, texto blanco |
| Navbar CTA | `btn--primary` con icono chat |

---

## 10. Cards

| Card | Descripción |
|---|---|
| Dashboard (dash__main) | White bg, border 1.5px, radius 20px, padding 22px |
| Dashboard panel | Dark bg (`#0D0326`) + texture, texto blanco |
| Service cards | White bg, border 1.5px, radius 20px, padding 28/24px |
| Service card featured | Border naranja, shadow naranja |
| Testimonial | Fondo `#F5F0FF`, radius 20px, padding 32/28px |
| Dest-cards (speed) | White bg, border, radius 12px |
| App account cards | Fondo `#F5F0FF`, radius 12px |

---

## 11. Iconos

- Todos son SVG inline de 16–40px
- Icon boxes: cuadrados con fondo `--purple-light` o `#FFF0E6` (naranja)
- Checkmarks en bullets: SVG embebido en background-image CSS
- Shield compliance: SVG custom con capas de transparencia

---

## 12. Estados visuales

- **Active nav link**: color `--purple`, font-weight 600, underline de 30px abajo
- **Hover buttons**: ligero oscurecimiento
- **Featured service card**: borde naranja permanente, shadow naranja
- **Partner logos**: grayscale 60% en reposo, a color en hover
- **Testimonial dots**: activo = purple, inactivo = border color

---

## 13. Diferencias desktop/mobile

| Elemento | Desktop | Mobile (<768px) |
|---|---|---|
| Navbar | Logo + links + CTA | Solo logo + hamburger |
| Hero | 2 columnas | 1 columna, visual oculto |
| Services | intro + 3 cards | 1 columna |
| Stats | fila horizontal | 2x2 grid |
| Virtual accounts | 2 cols | 1 col |
| Speed | 2 cols | 1 col |
| Compliance | 3 cols (escudo+content+note) | 1 col |
| Testimonials | 2 cols | 1 col |
| Footer | 5 cols | 2 cols → 1 col |

---

## DIFERENCIAS DETECTADAS (código actual vs mockup)

### CRÍTICAS
1. **Stat numbers color**: En el mockup son claramente NARANJA (`#FF5500`). En el CSS actual están en `var(--purple)`. → CAMBIAR a `var(--orange)`

2. **Partners section icon**: En el mockup el ícono sobre "Empresas que operan con nosotros" es un **handshake** (apretón de manos). En el código actual hay un ícono de personas/usuarios. → CAMBIAR SVG

### MENORES
3. El ícono de "Operaciones con contrato y factura" en el features bar debería ser un documento/contrato (ya está correcto en el código)
4. El ícono de "Procesos KYC/KYB" debería ser persona con checkmark (ya correcto)
